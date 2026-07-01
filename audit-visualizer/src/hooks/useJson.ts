import { useEffect, useState } from "react";

type JsonState<T> = {
  data: T | null;
  error: string | null;
};

export function useJson<T>(url: string): JsonState<T> {
  const [state, setState] = useState<JsonState<T>>({
    data: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.json() as Promise<T>;
      })
      .then((data) => {
        if (!cancelled) setState({ data, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}
