import React, { useState } from 'react';
import { User } from '../../types';

interface AdminUtilisateursProps {
  users: User[];
  currentUser: User | null;
}

export const AdminUtilisateurs: React.FC<AdminUtilisateursProps> = ({ users, currentUser }) => {
  const [userList, setUserList] = useState<User[]>(users);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'EDITOR' as 'ADMIN' | 'EDITOR' | 'VIEWER'
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      lastLogin: 'Jamais'
    };
    setUserList([newUser, ...userList]);
    setShowAddModal(false);
    setNewUserData({ name: '', email: '', role: 'EDITOR' });
  };

  const handleRoleChange = (id: string, newRole: 'ADMIN' | 'EDITOR' | 'VIEWER') => {
    setUserList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="marker-triangle"></span>
            <span className="font-mono text-xs uppercase text-[#0B6E78] tracking-widest font-semibold">
              SYSTÈME · SÉCURITÉ &amp; DROITS D'ACCÈS
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[#10272F]">
            Gestion des Utilisateurs &amp; Rôles
          </h1>
          <p className="text-sm text-[#4B6168] mt-2">
            Administrez les habilitations des collaborateurs d’InfraCité Ingénierie (ADMIN, EDITOR, VIEWER).
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>+ Ajouter un utilisateur</span>
        </button>
      </header>

      {/* Users table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#f1f4f4] text-[#4B6168] font-mono text-[10px] uppercase">
              <th className="py-3 px-4">Utilisateur</th>
              <th className="py-3 px-4">E-mail professionnel</th>
              <th className="py-3 px-4">Rôle &amp; Permissions</th>
              <th className="py-3 px-4">Dernière connexion</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[#10272F]">
            {userList.map((user) => {
              const isCurrent = currentUser?.email === user.email;
              return (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0B6E78] text-white flex items-center justify-center font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-[#10272F]">{user.name}</span>
                        {isCurrent && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[9px] font-bold">
                            Vous
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs">{user.email}</td>
                  <td className="py-3.5 px-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[11px] font-bold text-[#0B6E78]"
                    >
                      <option value="ADMIN">ADMIN (Accès total)</option>
                      <option value="EDITOR">EDITOR (Édition contenus)</option>
                      <option value="VIEWER">VIEWER (Lecture seule)</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#4B6168]">{user.lastLogin}</td>
                  <td className="py-3.5 px-4 text-right">
                    {!isCurrent && (
                      <button
                        type="button"
                        onClick={() => setUserList(userList.filter((u) => u.id !== user.id))}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Supprimer l'accès"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-display font-bold text-lg text-[#10272F]">
                Nouvel utilisateur back-office
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-[#10272F]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-[#4B6168] block mb-1">Nom complet *</label>
                <input
                  type="text"
                  required
                  placeholder="ex. Émilie Martin"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#0B6E78]"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-[#4B6168] block mb-1">Adresse e-mail professionnelle *</label>
                <input
                  type="email"
                  required
                  placeholder="e.martin@infracite-ing.fr"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#0B6E78]"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-[#4B6168] block mb-1">Rôle initial</label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as any })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none"
                >
                  <option value="EDITOR">EDITOR — Édition de contenus &amp; Bannières</option>
                  <option value="ADMIN">ADMIN — Accès total &amp; Paramètres</option>
                  <option value="VIEWER">VIEWER — Consultation seule</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full text-xs text-[#4B6168]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#0B6E78] text-white text-xs font-semibold shadow-sm"
                >
                  Créer l'utilisateur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
