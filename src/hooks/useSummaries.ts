import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Summary, SummaryInput } from '../types';

export function useSummaries() {
  const { user } = useAuth();
  const [data, setData] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;
    try {
      const res = await api.get<Summary[]>(`/summaries?userId=${user.id}`);
      setData(res.data);
    } finally { setLoading(false); }
  }, [user]);

  const addSummary = async (input: SummaryInput) => {
    if (!user) return;
    const res = await api.post('/summaries', { ...input, userId: user.id });
    setData(prev => [...prev, res.data]);
  };

  const deleteSummary = async (id: string) => {
    await api.delete(`/summaries/${id}`);
    setData(prev => prev.filter(i => i.id !== id));
  };

  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, addSummary, deleteSummary, fetchData };
}