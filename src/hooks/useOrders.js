import { useState, useEffect, useCallback, useRef } from "react";
import { orderService } from "../services/orderService";
import { toOrderStatusKey } from "../utils/orderStatuses";

function normalizeStatusCounts(counts = {}) {
  return Object.entries(counts).reduce((acc, [status, count]) => {
    const key = status === "all" ? "all" : toOrderStatusKey(status);
    acc[key] = (acc[key] || 0) + Number(count || 0);
    return acc;
  }, {});
}

export function useOrders({ status, search, fromDate, toDate, assignedEmployeeId, page, limit = 20 }) {
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 20 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchOrders = useCallback(async ({ silent = false } = {}) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (!silent) setLoading(true);
    setError(null);
    try {
      const res = await orderService.getOrders({
        status: status && status !== "all" ? status : undefined,
        search: search || undefined,
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
        assignedEmployeeId: assignedEmployeeId && assignedEmployeeId !== "all" ? assignedEmployeeId : undefined,
        page: page || 1,
        limit,
        sortBy: "Id",
        sortOrder: "DESC",
      });
      if (controller.signal.aborted) return;
      setOrders(res.data || []);
      setMeta(res.meta || { total: 0, page: 1, limit });
    } catch (err) {
      if (!controller.signal.aborted && err.name !== "AbortError" && !silent) setError(err.message);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [status, search, fromDate, toDate, assignedEmployeeId, page, limit]);

  useEffect(() => {
    const initialFetch = setTimeout(() => fetchOrders(), 0);
    const refresh = () => {
      if (document.visibilityState === "visible") fetchOrders({ silent: true });
    };
    const timer = setInterval(refresh, 60000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      clearTimeout(initialFetch);
      clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
      abortRef.current?.abort();
    };
  }, [fetchOrders]);

  return { orders, meta, loading, error, refetch: fetchOrders };
}

export function useOrderStatusCounts(isAuthenticated = true) {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchCounts = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await orderService.getStatusCounts();
      setCounts(normalizeStatusCounts(res.data || {}));
    } catch {
      // silent fail — sidebar badge will just show 0
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const initialFetch = setTimeout(() => fetchCounts(), 0);
    const refresh = () => {
      if (document.visibilityState === "visible") fetchCounts();
    };
    const timer = setInterval(refresh, 60000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      clearTimeout(initialFetch);
      clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [fetchCounts, isAuthenticated]);

  return { counts, loading, refetch: fetchCounts };
}
