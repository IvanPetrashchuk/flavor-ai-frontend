import { useState, useEffect,useCallback } from "react";
import { fetchRequest } from "../api/apiUtils";


export const useFetchData = (url, method = "GET", body = null, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchRequest({ URL: url, method, body });
      setData(result);
    } catch (err) {
      console.error(`Error downloading from ${url}:`, err);
      setError(err.message || "We can`t download data.");
    } finally {
      setLoading(false);
    }
  }, [url, method, body]); 

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]); 

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};
