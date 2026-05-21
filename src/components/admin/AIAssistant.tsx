import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, XCircle } from 'lucide-react';
import { db } from '../../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ProposedAction {
  tipo: string;
  coleccion: string;
  docId: string;
  datosActualizar: Record<string, any>;
  resumenConfirmacion: string;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  proposedAction?: ProposedAction;
  actionStatus?: 'pending' | 'confirmed' | 'cancelled';
}

export const AIAssistant: React.FC = () => {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: apiKey 
        ? '¡Hola! Soy tu Asistente de Negocio IA. Estoy a tu disposición para brindarte información de ventas, inventario y modificar datos si me lo solicitas. ¿En qué te puedo ayudar hoy?'
        : '¡Hola! Soy tu Asistente de Negocio IA. (Nota: Modo de demostración activo hasta configurar API Key).' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const processMessage = async (text: string) => {
    setIsTyping(true);
    
    try {
      if (!apiKey) {
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'No tienes la API Key configurada. Por favor configúrala para usar esta función.' }]);
          setIsTyping(false);
        }, 1000);
        return;
      }

      // 1. Fetch Context from Firestore
      const ordersSnap = await getDocs(collection(db, 'orders'));
      const ordersInfo = ordersSnap.docs.filter(d => d.data().status !== 'completed' && d.data().status !== 'cancelled').map(d => {
        const data = d.data();
        return `ID: ${d.id}, Cliente: ${data.customerName || 'N/A'}, Estado actual: ${data.status}`;
      }).join('; ');
      
      const materialsSnap = await getDocs(collection(db, 'materials'));
      const materialsInfo = materialsSnap.docs.map(d => {
        const data = d.data();
        return `ID: ${d.id}, Nombre: ${data.name}, Stock actual: ${data.stock}, Stock mínimo (alerta): ${data.minStock || 10}`;
      }).join('; ');
      
      const productsSnap = await getDocs(collection(db, 'products'));
      const productsInfo = productsSnap.docs.map(d => {
        const data = d.data();
        return `ID: ${d.id}, Nombre: ${data.name}, Stock actual: ${data.stock || 0}, Stock mínimo (alerta): ${data.minStock || 5}`;
      }).join('; ');

      // 2. Prepare Prompt for Gemini
      const systemContext = `
      Eres el Asistente de Negocio IA del sistema ERP "Estrella del Oriente".
      
      Reglas OBLIGATORIAS:
      1. Responde SIEMPRE de forma extremadamente educada, formal (tratando de "usted") y servicial.
      2. NUNCA uses caracteres especiales como asteriscos (*), numerales (#), emojis, o formato markdown. Responde solo con texto plano natural.
      3. DEBES devolver SIEMPRE un objeto JSON válido, no texto suelto.
      
      Datos en la base de datos (copia estos IDs si vas a modificar algo):
      PEDIDOS PENDIENTES O EN PROCESO: [ ${ordersInfo || 'Ninguno'} ]
      INSUMOS: [ ${materialsInfo || 'Ninguno'} ]
      PRODUCTOS: [ ${productsInfo || 'Ninguno'} ]
      
      Esquemas para CREAR nuevos registros (usa estos campos obligatoriamente):
      - orders (pedidos): { "customerName": "...", "customerEmail": "...", "status": "pending", "total": 0, "items": [{"productId": "...", "name": "...", "quantity": 1, "price": 0}] }
      - products (productos): { "name": "...", "description": "...", "price": 0, "stock": 0, "minStock": 5, "image": "/logo-transparent.png", "categories": [] }
      - materials (insumos): { "name": "...", "unit": "unidades", "stock": 0, "minStock": 10, "cost": 0 }
      - categories (categorías): { "name": "...", "slug": "...", "subCategories": [] }
      
      El usuario ha dicho: "${text}"
      
      Estructura de tu respuesta JSON:
      {
        "respuesta": "Tu mensaje para el usuario en texto plano y educado.",
        "accionPropuesta": null // Usar null si solo respondes una pregunta.
      }
      
      Si el usuario te pide MODIFICAR, ACTUALIZAR o ELIMINAR, usa:
      {
        "tipo": "UPDATE_DOC",
        "coleccion": "orders" | "materials" | "products" | "categories",
        "docId": "ID exacto del documento que sacaste de los datos",
        "datosActualizar": { ... }, // Campos FINALES a guardar
        "resumenConfirmacion": "Breve frase (ej. 'Cambiar estado del pedido a Enviado')"
      }
      
      Si el usuario te pide CREAR o AGREGAR (un pedido nuevo, producto, insumo, etc), usa:
      {
        "tipo": "CREATE_DOC",
        "coleccion": "orders" | "materials" | "products" | "categories",
        "docId": "nuevo",
        "datosActualizar": { ... }, // Los campos respetando el esquema mencionado arriba
        "resumenConfirmacion": "Breve frase (ej. 'Crear nuevo pedido para Juan Pérez')"
      }
      `;

      // 3. Call Gemini API
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: systemContext }] }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      });
      const responseText = result.response.text();
      
      const parsed = JSON.parse(responseText);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: parsed.respuesta,
        proposedAction: parsed.accionPropuesta,
        actionStatus: parsed.accionPropuesta ? 'pending' : undefined
      }]);
      
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      let errorMsg = 'Hubo un error desconocido.';
      if (error instanceof Error) {
        errorMsg = error.message;
      }
      setMessages(prev => [...prev, { role: 'system', content: `Hubo un error de conexión con la IA. Detalles: ${errorMsg}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    
    await processMessage(userMsg);
  };

  const handleConfirmAction = async (msgIndex: number, action: ProposedAction) => {
    try {
      if (action.tipo === 'UPDATE_DOC') {
        const docRef = doc(db, action.coleccion, action.docId);
        await updateDoc(docRef, action.datosActualizar);
      } else if (action.tipo === 'CREATE_DOC') {
        const { addDoc, collection } = await import('firebase/firestore');
        await addDoc(collection(db, action.coleccion), {
          ...action.datosActualizar,
          createdAt: new Date().toISOString()
        });
      }
      
      setMessages(prev => {
        const newMsg = [...prev];
        newMsg[msgIndex] = { ...newMsg[msgIndex], actionStatus: 'confirmed' };
        newMsg.push({ role: 'system', content: `✅ Acción ejecutada con éxito en la base de datos.` });
        return newMsg;
      });
    } catch (error) {
      console.error("Error executing action:", error);
      setMessages(prev => [...prev, { role: 'system', content: `❌ Error al ejecutar la acción. Verifique los permisos o el ID.` }]);
    }
  };

  const handleCancelAction = (msgIndex: number) => {
    setMessages(prev => {
      const newMsg = [...prev];
      newMsg[msgIndex] = { ...newMsg[msgIndex], actionStatus: 'cancelled' };
      newMsg.push({ role: 'system', content: `Acción cancelada por el usuario.` });
      return newMsg;
    });
  };

  return (
    <div className="ai-chat-inline glass-panel" style={{
      width: '100%',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--color-border)'
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem',
        backgroundColor: 'var(--color-bg-alt)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: 'var(--color-primary)', padding: '0.3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.2rem' }}>✨</span>
          </div>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>Asistente de Negocio Inteligente</h3>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : (msg.role === 'system' ? 'center' : 'flex-start'),
            maxWidth: msg.role === 'system' ? '90%' : '85%',
            backgroundColor: msg.role === 'user' ? 'var(--color-primary)' : (msg.role === 'system' ? 'transparent' : 'var(--color-bg)'),
            color: msg.role === 'user' ? 'white' : (msg.role === 'system' ? 'var(--color-text-muted)' : 'var(--color-text)'),
            padding: msg.role === 'system' ? '0.5rem' : '0.8rem 1rem',
            borderRadius: msg.role === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
            border: msg.role === 'assistant' ? '1px solid var(--color-border)' : 'none',
            fontSize: msg.role === 'system' ? '0.8rem' : '0.9rem',
            lineHeight: 1.4,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem'
          }}>
            <div>{msg.content}</div>
            
            {msg.proposedAction && msg.actionStatus === 'pending' && (
              <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-primary)', borderRadius: '8px', padding: '1rem', marginTop: '0.5rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Acción Propuesta:</strong>
                <p style={{ margin: '0 0 1rem 0' }}>{msg.proposedAction.resumenConfirmacion}</p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleConfirmAction(idx, msg.proposedAction!)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    <CheckCircle size={16} /> Confirmar
                  </button>
                  <button onClick={() => handleCancelAction(idx)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem', background: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}>
                    <XCircle size={16} /> Cancelar
                  </button>
                </div>
              </div>
            )}
            
            {msg.proposedAction && msg.actionStatus === 'confirmed' && (
              <div style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle size={14} /> Acción confirmada y ejecutada
              </div>
            )}
            {msg.proposedAction && msg.actionStatus === 'cancelled' && (
              <div style={{ fontSize: '0.8rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <XCircle size={14} /> Acción cancelada
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div style={{ alignSelf: 'flex-start', backgroundColor: 'var(--color-bg)', padding: '0.8rem 1rem', borderRadius: '18px 18px 18px 0', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Procesando solicitud...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} style={{
        padding: '1rem',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        gap: '0.5rem',
        backgroundColor: 'var(--color-bg-alt)'
      }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ej: Cambiar el pedido de Juan a estado Enviado..."
          style={{
            flex: 1,
            padding: '0.8rem 1rem',
            borderRadius: '20px',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            outline: 'none'
          }}
        />
        <button 
          type="submit"
          disabled={!input.trim() || isTyping}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: input.trim() && !isTyping ? 'var(--color-primary)' : 'var(--color-bg)',
            color: input.trim() && !isTyping ? 'white' : 'var(--color-text-muted)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: input.trim() && !isTyping ? 'pointer' : 'default',
            transition: 'all 0.2s'
          }}
        >
          <Send size={18} style={{ marginLeft: '2px' }} />
        </button>
      </form>
    </div>
  );
};
