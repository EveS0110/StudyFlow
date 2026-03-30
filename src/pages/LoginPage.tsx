import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, pass);
      navigate('/');
    } catch {
      alert("E-mail ou senha incorretos!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-indigo-600 p-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-sm space-y-6">
        <h1 className="text-3xl font-black text-indigo-600 text-center italic tracking-tighter">StudyFlow</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 border rounded-xl outline-indigo-500" required />
          <input type="password" placeholder="Senha" value={pass} onChange={e => setPass(e.target.value)} className="w-full p-4 border rounded-xl outline-indigo-500" required />
          <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition uppercase shadow-lg">Entrar</button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Não tem uma conta? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}