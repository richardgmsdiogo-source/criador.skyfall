// Design Philosophy: Neogótico Contemplativo
// Hook para carregar e gerenciar os dados do Skyfall RPG

import { useEffect, useState } from 'react';
import { SkyfalDataSet } from '@/types/character';

export function useSkyfalData() {
  const [data, setData] = useState<SkyfalDataSet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/skyfall_data.json');
        if (!response.ok) {
          throw new Error('Falha ao carregar dados do Skyfall');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { data, loading, error };
}
