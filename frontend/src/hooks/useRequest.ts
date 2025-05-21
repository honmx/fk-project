import { useEffect, useState } from "react";

export const useRequest = <T>(requestFn: () => Promise<T>, defaultValue: T, deps: any[], stopCondition?: () => boolean) => {
  
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (stopCondition?.()) return;

    (async () => {
      try {
        setIsLoading(true);
        const data = await requestFn();
        setData(data);

      } catch (error: any) {
        setError(error.message)
      } finally {
        setIsLoading(false);
      }
    })();
  }, deps);

  return { data, setData, isLoading, error };
}