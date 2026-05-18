import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, doc, setDoc, deleteDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';
import { AdminPagination } from './AdminPagination';
import { useToast } from '../../ToastContext';
import { ConfirmModal } from '../ConfirmModal';

export interface Material {
  id: string;
  name: string;
  unit: string; // e.g. 'unidades', 'gramos', 'kilos'
  stock: number;
  cost: number;
}

export const AdminMaterials: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Material>({ id: '', name: '', unit: 'unidades', stock: 0, cost: 0 });
  const [confirmDialog, setConfirmDialog] = useState<{ message: string, title: string, onConfirm: () => void } | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const q = query(collection(db, 'materials'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Material));
      setMaterials(data);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const idToSave = formData.id || formData.name.toLowerCase().replace(/\s+/g, '-');
      await setDoc(doc(db, 'materials', idToSave), {
        name: formData.name,
        unit: formData.unit,
        stock: Number(formData.stock),
        cost: Number(formData.cost)
      });
      setIsEditing(false);
      setFormData({ id: '', name: '', unit: 'unidades', stock: 0, cost: 0 });
      showToast(formData.id ? "Insumo actualizado" : "Insumo creado", "success");
    } catch (error) {
      console.error("Error saving material:", error);
      showToast("Error al guardar el insumo.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    setConfirmDialog({
      title: "Eliminar Insumo",
      message: "¿Seguro que deseas eliminar este insumo permanentemente?",
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'materials', id));
          showToast("Insumo eliminado", "success");
        } catch (error) {
          console.error("Error deleting material:", error);
          showToast("Error al eliminar el insumo", "error");
        }
      }
    });
  };

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(materials.length / itemsPerPage);
  const paginatedMaterials = materials.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', margin: 0 }}>Materias Primas e Insumos</h2>
        <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
          <Plus size={20} style={{ marginRight: '0.5rem' }} /> Nuevo Insumo
        </button>
      </div>

      {isEditing && (
        <div style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--color-border)' }}>
          <h3 style={{ marginTop: 0 }}>{formData.id ? 'Editar Insumo' : 'Crear Insumo'}</h3>
          <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Nombre del Insumo (ej. Bolsas kraft grandes, Hilo de algodón, Té Negro)</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-control" />
            </div>
            <div className="form-group">
              <label>Unidad de Medida</label>
              <select value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="form-control">
                <option value="unidades">Unidades</option>
                <option value="gramos">Gramos</option>
                <option value="kilos">Kilos</option>
                <option value="metros">Metros</option>
              </select>
            </div>
            <div className="form-group">
              <label>Stock Disponible</label>
              <input required type="number" step="0.01" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} className="form-control" />
            </div>
            <div className="form-group">
              <label>Costo Unitario ($)</label>
              <input required type="number" step="0.01" value={formData.cost} onChange={e => setFormData({...formData, cost: Number(e.target.value)})} className="form-control" />
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Guardar Insumo</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {materials.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>No hay insumos registrados. Añade uno para comenzar a llevar el control de inventario.</p>
        ) : (
          paginatedMaterials.map(mat => (
            <div key={mat.id} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Package size={18} color="var(--color-primary)" /> {mat.name}
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="icon-btn" onClick={() => { setFormData(mat); setIsEditing(true); }}><Edit2 size={16}/></button>
                  <button className="icon-btn" style={{ color: '#ef4444' }} onClick={() => handleDelete(mat.id)}><Trash2 size={16}/></button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                <span>Stock: <strong style={{ color: mat.stock < 10 ? '#ef4444' : 'inherit' }}>{mat.stock} {mat.unit}</strong></span>
                <span>Costo: ${mat.cost} c/u</span>
              </div>
            </div>
          ))
        )}
      </div>

      <AdminPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ConfirmModal
        isOpen={!!confirmDialog}
        title={confirmDialog?.title || ''}
        message={confirmDialog?.message || ''}
        onConfirm={() => {
          if (confirmDialog) confirmDialog.onConfirm();
          setConfirmDialog(null);
        }}
        onCancel={() => setConfirmDialog(null)}
      />
    </div>
  );
};
