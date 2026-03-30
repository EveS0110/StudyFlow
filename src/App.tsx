import { useMemo, useState } from 'react';
import { useSummaries } from './hooks/useSummaries';
import { useAuth } from './contexts/AuthContext';
import SummaryCard from './components/SummaryCard';

export default function App() {
  const { data, loading, addSummary, deleteSummary, fetchData } = useSummaries();
  const { user, logout } = useAuth();
  const [limit, setLimit] = useState(120);

  
  const totalConcluido = data
    .filter(i => i.completed)
    .reduce((acc, curr) => acc + curr.estimatedTime, 0);
  
  const metaBatida = totalConcluido >= limit;

  
  const schedule = useMemo(() => {
    let date = new Date(); 
    let used = 0;
    return data.map(i => {
      if (used + i.estimatedTime > limit) { 
        date.setDate(date.getDate() + 1); 
        used = 0; 
      }
      used += i.estimatedTime;
      return { ...i, studyDate: date.toLocaleDateString('pt-BR') };
    });
  }, [data, limit]);

  if (loading) return <p className="p-10 text-center text-indigo-600 font-bold">Carregando StudyFlow...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans antialiased">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10 bg-white p-6 rounded-2xl shadow-md gap-4 border-b-4 border-indigo-500">
        <h1 className="text-xl md:text-2xl font-black text-indigo-700 italic tracking-tighter flex items-center gap-2">
          StudyFlow 📝
        </h1>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 items-center">
          <span className="font-bold text-gray-700 text-sm md:text-base">Olá, {user?.name}</span>
          <button 
            onClick={logout} 
            className="text-red-500 font-black hover:bg-red-50 px-4 py-2 rounded-xl transition text-xs uppercase border border-red-100 shadow-sm"
          >
            SAIR
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* COLUNA FORMULÁRIO */}
        <div className="order-1 md:order-none">
          <form onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const linkName = f.get('ln') as string;
            const linkUrl = f.get('lu') as string;

            addSummary({
              title: f.get('t') as string,
              subject: f.get('s') as string,
              difficulty: f.get('d') as any,
              estimatedTime: Number(f.get('m')),
              content: f.get('c') as string,
              links: linkName && linkUrl 
                ? [{ id: Date.now().toString(), name: linkName, url: linkUrl }] 
                : [],
              completed: false,
            });
            e.currentTarget.reset();
          }} className="bg-white p-6 rounded-3xl shadow-sm space-y-4 border border-gray-100 sticky top-6">
            <h2 className="font-black text-gray-700 border-b pb-3 text-lg uppercase tracking-tight">Novo Estudo</h2>
            
            <input name="t" placeholder="Título" required className="w-full p-4 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-gray-50" />
            <input name="s" placeholder="Matéria" required className="w-full p-4 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-gray-50" />
            
            <div className="grid grid-cols-2 gap-3">
              <input name="m" type="number" placeholder="Minutos" required className="w-full p-4 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-gray-50" />
              <select name="d" className="w-full p-4 border border-gray-100 rounded-2xl bg-gray-50 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium">
                <option value="Easy">Fácil</option>
                <option value="Medium">Médio</option>
                <option value="Hard">Difícil</option>
              </select>
            </div>
            
            <textarea name="c" placeholder="Resumo..." className="w-full p-4 border border-gray-100 rounded-2xl h-32 focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm bg-gray-50" />

            <div className="pt-2 space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Links Úteis</label>
              <div className="grid grid-cols-1 gap-2">
                <input name="ln" placeholder="Nome do link" className="w-full p-3 border border-gray-50 rounded-xl text-xs bg-gray-50" />
                <input name="lu" type="url" placeholder="URL" className="w-full p-3 border border-gray-50 rounded-xl text-xs bg-gray-50" />
              </div>
            </div>

            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-700 transition shadow-xl uppercase tracking-widest text-xs">
              ADICIONAR MATÉRIA
            </button>
          </form>
        </div>

        {/* COLUNA CARDS E META */}
        <div className="md:col-span-2 space-y-6 order-2 md:order-none">
          <div className={`p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 shadow-lg transition-all duration-700 border-b-8 ${
            metaBatida ? 'bg-green-500 text-white border-green-700 scale-[1.02]' : 'bg-white text-indigo-900 border-indigo-200'
          }`}>
            <div className="text-center sm:text-left">
              <span className="font-black block text-xl uppercase tracking-tighter">Meta Diária</span>
              <p className={`text-sm font-medium mt-1 ${metaBatida ? 'text-green-50' : 'text-gray-400'}`}>
                Progresso: <strong className="text-lg">{totalConcluido} min</strong> / {limit} min
              </p>
            </div>
            <div className="flex items-center gap-4 bg-black/5 p-4 rounded-2xl">
               <input type="number" value={limit} onChange={e => setLimit(Number(e.target.value))} className="w-20 p-2 rounded-xl text-center text-gray-900 font-bold border-none outline-none" />
               <span className={`text-3xl ${metaBatida ? 'animate-bounce' : 'animate-pulse'}`}>{metaBatida ? '✅' : '🎯'}</span>
            </div>
          </div>

          <div className="grid gap-6">
            {schedule.map(i => (
              <SummaryCard key={i.id} summary={i} onUpdate={fetchData} onDelete={deleteSummary} />
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-12 pb-8 border-t border-gray-200 pt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <a href="https://www.linkedin.com/in/evelysdev/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-600 transition-all transform hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://github.com/EveS0110" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-all transform hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
        </div>
        <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
          Criado por <span className="text-indigo-600">Evely Sena</span>
        </p>
      </footer>
    </div>
  );
}