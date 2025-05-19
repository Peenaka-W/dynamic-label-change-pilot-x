import { useState, useEffect } from 'react';
import type { Label, ScreenName, TenantId, ModuleName } from '../types';
import { fetchLabels, mockFetchLabels } from '../api/labelService';

const useLabels = (
  moduleName: ModuleName,
  tenantId: TenantId,
  screenName: ScreenName
) => {
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLabels = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // For development, use the mock service
        // In production, use the actual service:
        const data = await fetchLabels(moduleName, tenantId, screenName);
        // const data = await mockFetchLabels(moduleName, tenantId, screenName);
        setLabels(data);
      } catch (err) {
        setError('Failed to load labels. Please try again later.');
        console.error('Error loading labels:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadLabels();
  }, [moduleName, tenantId, screenName]);

  const updateLabel = (updatedLabel: Label) => {
    setLabels((prevLabels) =>
      prevLabels.map((label) =>
        label.key === updatedLabel.key ? { ...label, name: updatedLabel.name } : label
      )
    );
  };

  return { labels, loading, error, updateLabel };
};

export default useLabels;