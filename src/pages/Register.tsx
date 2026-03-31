import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { NotebookPen } from 'lucide-react';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      alert("Conta criada com sucesso 🎉!");
      navigate('/login');
    } catch (error) {
      alert("Erro ao criar conta.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-indigo-600 p-4 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-indigo-100 p-4 rounded-2xl text-indigo-600">
            <NotebookPen size={32} />
          </div>
          <h1 className="text-3xl font-black text-indigo-700 italic tracking-tighter">StudyFlow</h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Criar Conta</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nome Completo" value={name} onChange={e => setName(e.target.value)} required className="w-full p-4 border rounded-xl outline-indigo-500 bg-gray-50 focus:bg-white transition-all" />
          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-4 border rounded-xl outline-indigo-500 bg-gray-50 focus:bg-white transition-all" />
          <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-4 border rounded-xl outline-indigo-500 bg-gray-50 focus:bg-white transition-all" />
          <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition uppercase shadow-lg">Cadastrar</button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Já tem uma conta? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Fazer Login</Link>
        </p>
      </div>
    </div>
  );
}