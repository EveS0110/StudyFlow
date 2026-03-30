import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const savedUser = localStorage.getItem('@StudyFlow:user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

 
  const login = async (email: string, password: string) => {
    try {
     
      const { data } = await api.get<User[]>('/users');

      
      const foundUser = data.find(
        (u: any) => 
          u.email.trim().toLowerCase() === email.trim().toLowerCase() && 
          String(u.password) === String(password)
      );

      if (foundUser) {
       
        const { password: _, ...userWithoutPassword } = foundUser;
        
        setUser(userWithoutPassword as User);
        
       
        localStorage.setItem('@StudyFlow:user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('@StudyFlow:token', foundUser.token);
      } else {
        throw new Error("E-mail ou senha incorretos!");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("E-mail ou senha incorretos!");
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const newUser = {
        id: crypto.randomUUID(), // Gera um ID único
        name,
        email,
        password,
        token: `fake-jwt-${Date.now()}`
      };
      
      await api.post('/users', newUser);
      alert("Conta criada com sucesso! 🎉");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao criar conta. Tente novamente.");
      throw error;
    }
  };

  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('@StudyFlow:user');
    localStorage.removeItem('@StudyFlow:token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);