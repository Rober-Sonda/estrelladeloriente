import React, { useState, useEffect, useRef } from 'react';
import { Send, Settings2 } from 'lucide-react';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIAssistant: React.FC = () => {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: apiKey 
        ? '¡Hola! Soy tu Asistente de Negocio IA. Estoy conectado a tus datos y a la API de Gemini.'
        : '¡Hola! Soy tu Asistente de Negocio IA. (Nota: Modo de demostración activo hasta configurar API Key).' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchBusinessData = async (intent: string) => {
    try {
      if (intent === 'pedidos_pendientes') {
        const q = query(collection(db, 'orders'), where('status', '==', 'pending'));
        const snap = await getDocs(q);
        return `Actualmente tienes ${snap.size} pedidos pendientes.`;
      }
      if (intent === 'stock_insumos') {
        const snap = await getDocs(collection(db, 'materials'));
        const lowStock = snap.docs.filter(doc => doc.data().stock < 10);
        if (lowStock.length > 0) {
          const items = lowStock.map(d => `${d.data().name} (${d.data().stock} restantes)`).join(', ');
          return `Tienes poco stock en los siguientes insumos: ${items}. Te sugiero reponer pronto.`;
        }
        return `El stock de todos tus insumos parece estar en niveles saludables (por encima de 10 unidades).`;
      }
      if (intent === 'clientes') {
        const snap = await getDocs(collection(db, 'users'));
        return `Actualmente tienes ${snap.size} clientes registrados en tu plataforma.`;
      }
    } catch (e) {
      console.error(e);
      return 'Hubo un error al consultar la base de datos.';
    }
    return 'Lo siento, no comprendí bien qué dato necesitas.';
  };

  const processMessage = async (text: string) => {
    setIsTyping(true);
    
    try {
      const apiKey = import.meta.env.VITE_AI_API_KEY;
      
      if (!apiKey) {
        // Fallback to Mock NLP if no API Key is provided
        const lower = text.toLowerCase();
        let reply = '';
        if (lower.includes('pedido') && (lower.includes('pendiente') || lower.includes('cuanto') || lower.includes('hay'))) {
          reply = await fetchBusinessData('pedidos_pendientes');
        } else if (lower.includes('stock') || lower.includes('insumo') || lower.includes('falta') || lower.includes('material')) {
          reply = await fetchBusinessData('stock_insumos');
        } else if (lower.includes('cliente') || lower.includes('usuario')) {
          reply = await fetchBusinessData('clientes');
        } else if (lower.includes('cambiar') || lower.includes('editar') || lower.includes('actualizar')) {
          reply = 'Para modificar datos necesitarás integrar tu API Key de IA en el archivo .env. Por ahora, debes hacerlo manualmente en el panel.';
        } else {
          reply = 'No tienes la API Key configurada. Solo puedo responder de forma limitada sobre "pedidos pendientes", "stock" o "clientes".';
        }
        
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
          setIsTyping(false);
        }, 1000);
        return;
      }

      // 1. Fetch Context from Firestore
      const ordersSnap = await getDocs(collection(db, 'orders'));
      const pendingOrders = ordersSnap.docs.filter(d => d.data().status === 'pending').length;
      
      const materialsSnap = await getDocs(collection(db, 'materials'));
      const materials = materialsSnap.docs.map(d => `${d.data().name}: ${d.data().stock} ${d.data().unit}`).join(', ');
      
      const usersSnap = await getDocs(collection(db, 'users'));
      const totalClients = usersSnap.size;

      // 2. Prepare Prompt for Gemini
      const systemContext = `
      Eres el Asistente de Negocio IA del sistema ERP "Estrella del Oriente".
      
      Contexto actual de tu base de datos:
      - Pedidos Pendientes actuales: ${pendingOrders}
      - Total de Clientes Registrados: ${totalClients}
      - Inventario de Insumos: ${materials || 'Sin insumos registrados'}
      
      Responde a la pregunta del dueño de manera concisa, útil y profesional basándote en los datos anteriores.
      
      Pregunta del dueño: ${text}
      `;

      // 3. Call Gemini API
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(systemContext);
      const reply = result.response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      let errorMsg = 'Hubo un error desconocido.';
      if (error instanceof Error) {
        errorMsg = error.message;
      } else if (typeof error === 'string') {
        errorMsg = error;
      }
      setMessages(prev => [...prev, { role: 'assistant', content: `Hubo un error al procesar tu consulta. Detalles técnicos: ${errorMsg}` }]);
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
                <img src="/logo-transparent.png" alt="Bot" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>Asistente de Negocio</h3>
            </div>
            <button className="icon-btn" title="Configurar API Key (Próximamente)"><Settings2 size={18}/></button>
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
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                backgroundColor: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-bg)',
                color: msg.role === 'user' ? 'white' : 'var(--color-text)',
                padding: '0.8rem 1rem',
                borderRadius: msg.role === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                border: msg.role === 'assistant' ? '1px solid var(--color-border)' : 'none',
                fontSize: '0.9rem',
                lineHeight: 1.4
              }}>
                {msg.content}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', backgroundColor: 'var(--color-bg)', padding: '0.8rem 1rem', borderRadius: '18px 18px 18px 0', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Pensando...</span>
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
              placeholder="Pregúntame algo..."
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
