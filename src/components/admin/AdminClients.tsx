import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, getDocs, where } from 'firebase/firestore';
import { Users, Mail, Clock, ShoppingBag } from 'lucide-react';
import { AdminPagination } from './AdminPagination';

export const AdminClients: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('lastLoginAt', 'desc'));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // For each user, fetch their total order count to display in the list
      const enrichedUsers = await Promise.all(usersData.map(async (user) => {
        try {
          const ordersQuery = query(collection(db, 'orders'), where('userId', '==', user.id));
          const ordersSnap = await getDocs(ordersQuery);
          const totalSpent = ordersSnap.docs.reduce((acc, doc) => acc + (doc.data().total || 0), 0);
          return {
            ...user,
            orderCount: ordersSnap.size,
            totalSpent
          };
        } catch (e) {
          return { ...user, orderCount: 0, totalSpent: 0 };
        }
      }));

      setClients(enrichedUsers);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const paginatedClients = clients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={24} /> Lista de Clientes
        </h2>
      </div>

      <div style={{ overflowX: 'auto' }}>
        {loading ? (
          <p>Cargando clientes...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '1rem' }}>Cliente</th>
                <th style={{ padding: '1rem' }}>Email</th>
                <th style={{ padding: '1rem' }}>Último Acceso</th>
                <th style={{ padding: '1rem' }}>Pedidos Realizados</th>
                <th style={{ padding: '1rem' }}>Total Gastado</th>
              </tr>
            </thead>
            <tbody>
              {paginatedClients.map(client => (
                <tr key={client.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {client.photoURL ? (
                      <img src={client.photoURL} alt={client.displayName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Users size={20} color="var(--color-text-muted)" />
                      </div>
                    )}
                    <span style={{ fontWeight: 'bold' }}>{client.displayName || 'Sin Nombre'}</span>
                  </td>
                  
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Mail size={16} color="var(--color-text-muted)" />
                      {client.email}
                    </div>
                  </td>
                  
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
                      <Clock size={16} />
                      {client.lastLoginAt ? new Date(client.lastLoginAt).toLocaleDateString() : 'Desconocido'}
                    </div>
                  </td>
                  
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ShoppingBag size={16} color="var(--color-primary)" />
                      <span style={{ fontWeight: 'bold' }}>{client.orderCount}</span>
                    </div>
                  </td>

                  <td style={{ padding: '1rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                    ${client.totalSpent?.toLocaleString('es-AR') || 0}
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No hay clientes registrados aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <AdminPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
