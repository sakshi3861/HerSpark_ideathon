import { useEffect, useState } from 'react';

// Short simulated fetch so pages show skeletons on navigation.
export default function useLoading(ms = 650) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), ms + Math.random() * 250);
    return () => window.clearTimeout(id);
  }, [ms]);
  return loading;
}
