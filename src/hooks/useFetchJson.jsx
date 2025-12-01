import { useState, useEffect, useCallback } from "react";

export const useFetchJson = (endpoint) => {
  const [requestState, setRequestState] = useState({
    payload: null,
    isBusy: false,
    errorMsg: null,
  });

  const executeRequest = useCallback(async () => {
    if (!endpoint) {
      setRequestState({ payload: null, isBusy: false, errorMsg: null });

      return;
    }

    const controller = new AbortController();
    setRequestState((prev) => ({ ...prev, isBusy: true, errorMsg: null }));

    try {
      const response = await fetch(endpoint, { signal: controller.signal });

      if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
      }

      const jsonData = await response.json();

      if (jsonData.cod && Number(jsonData.cod) !== 200) {
        throw new Error(jsonData.message || "Remote API Error");
      }

      setRequestState({
        payload: jsonData,
        isBusy: false,
        errorMsg: null,
      });
    } catch (err) {
      if (err.name !== "AbortError") {
        setRequestState({
          payload: null,
          isBusy: false,
          errorMsg: err.message || "Unknown Error",
        });
      }
    }
  }, [endpoint]);

  useEffect(() => {
    executeRequest();
  }, [executeRequest]);

  return {
    data: requestState.payload,
    loading: requestState.isBusy,
    error: requestState.errorMsg,
    refetch: executeRequest,
  };
};
