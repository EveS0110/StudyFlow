import { useState, useEffect } from 'react';
import { Summary } from '../types';
import { api } from '../services/api';
import { Trash2, Link as LinkIcon, CheckCircle, Edit3, Save, X, Play, Pause, RotateCcw } from 'lucide-react';

interface SummaryCardProps {
  summary: Summary;
  onUpdate: () => void;
  onDelete: (id: string) => void;
}

export default function SummaryCard({ summary, onUpdate, onDelete }: SummaryCardProps) {
  const [seconds, setSeconds] = useState(summary.estimatedTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(summary.completed);
  
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(summary.content);

  const safeLinks = summary.links || [];
 
  const docId = summary.id || summary.id;

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (seconds === 0 && !isCompleted) {
      handleFinish();
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, isCompleted]);

  const handleFinish = async () => {
    setIsActive(false);
    setIsCompleted(true);
    try {
      await api.patch(`/summaries/${docId}`, { completed: true });
      onUpdate(); 
    } catch (error) {
      console.error('Erro ao finalizar:', error);
      setIsCompleted(summary.completed); 
    }
  };

  const handleSaveEdit = async () => {
    try {
      await api.patch(`/summaries/${docId}`, { content: editedContent });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Erro ao salvar edição (Erro 500 no Backend?):', error);
    }
  };

  const handleReset = () => {
    setSeconds(summary.estimatedTime * 60);
    setIsActive(false);
    if (isCompleted) {
      setIsCompleted(false);
      api.patch(`/summaries/${docId}`, { completed: false }).then(() => onUpdate());
    }
  };

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className={`p-6 rounded-3xl shadow-sm border-l-[12px] transition-all duration-500 hover:shadow-md ${
      isCompleted ? 'bg-green-50 border-green-500' : 'bg-white border-indigo-500'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-black text-gray-800 tracking-tight">{summary.title}</h3>
            <span className={`text-[10px] uppercase px-3 py-1 rounded-full font-black tracking-widest ${
              summary.difficulty === 'Hard' ? 'bg-red-100 text-red-600' : 
              summary.difficulty === 'Medium' ? 'bg-orange-100 text-orange-600' : 
              'bg-green-100 text-green-600'
            }`}>
              {summary.difficulty === 'Easy' ? 'Fácil' : 
                summary.difficulty === 'Medium' ? 'Médio' : 'Difícil'}
            </span>
          </div>
          <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">{summary.subject}</p>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="text-gray-300 hover:text-indigo-500 transition-colors p-2 rounded-xl hover:bg-gray-50"
          >
            {isEditing ? <X size={18} /> : <Edit3 size={18} />}
          </button>

          <button 
            onClick={() => onDelete(docId)} 
            className="text-gray-300 hover:text-red-500 transition-colors p-2 rounded-xl hover:bg-gray-50"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="mb-4 space-y-3">
          <textarea 
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-4 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-32 resize-none bg-gray-50"
          />
          <button 
            onClick={handleSaveEdit}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 uppercase"
          >
            <Save size={14} /> Salvar Alterações
          </button>
        </div>
      ) : (
        <p className="text-gray-600 text-sm mb-5 leading-relaxed font-medium">{summary.content}</p>
      )}

      {/* LINKS ÚTEIS */}
      {safeLinks.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {safeLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 text-[10px] font-black uppercase bg-white border border-gray-100 text-indigo-600 px-3 py-1.5 rounded-xl hover:border-indigo-200 transition shadow-sm"
            >
              <LinkIcon size={12} /> {link.name}
            </a>
          ))}
        </div>
      )}

      {/* TIMER E CONTROLES */}
      <div className="bg-gray-50 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-100">
        <div className="flex items-center gap-3">
           <div className={`p-2 rounded-lg ${isCompleted ? 'text-green-500' : 'text-indigo-600'}`}>
             {isCompleted ? <CheckCircle size={24} /> : <Play size={24} className={isActive ? 'hidden' : 'block'} />}
             {isActive && !isCompleted && <Pause size={24} className="animate-pulse" />}
           </div>
           <span className="text-2xl font-black font-mono text-gray-700 tracking-tighter">
             {formatTime(seconds)}
           </span>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {!isCompleted && (
            <button 
              onClick={() => setIsActive(!isActive)} 
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-black text-xs uppercase transition tracking-widest ${
                isActive 
                ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100'
              }`}
            >
              {isActive ? 'Pausar' : 'Iniciar'}
            </button>
          )}
          
          <button 
            onClick={handleReset} 
            className={`px-4 py-2.5 rounded-xl font-black text-xs uppercase transition bg-white border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 ${isCompleted ? 'w-full' : 'flex-none'}`}
            title="Reiniciar timer"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}