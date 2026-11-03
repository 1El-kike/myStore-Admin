import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { port } from "../../config/env";

interface StoreInventory {
  storeId: number;
  storeName: string;
  storeImage: string | null;
  storeCover: string | null;
  address: string | null;
  phone: string | null;
  isOpen: boolean;
  rating: number;
  totalProducts: number;
  totalQuantity: number;
  inStockCount?: number;
  lowStockCount?: number;
  outOfStockCount?: number;
}

interface ProductInventory {
  id: number;
  name: string | null;
  image: string | null;
  price: number | null;
  catalogQuantity: number | null;
  quantity: number;
  minStock: number | null;
  maxStock: number | null;
  inventoryStatus: string | null;
  tipo: string | null;
  category: string | null;
  sku: string | null;
}

interface StoreInventoryDetail extends StoreInventory {
  products: ProductInventory[];
}

export type StockOperation =
  | "ADD"
  | "REMOVE"
  | "SET"
  | "SALE"
  | "PURCHASE"
  | "TRANSFER";

interface UseInventoryResult {
  stores: StoreInventory[];
  selectedInventory: StoreInventoryDetail | null;
  isLoading: boolean;
  isLoadingDetail: boolean;
  error: string | null;
  mutationLoading: boolean;
  mutationError: string | null;
  fetchStores: () => Promise<void>;
  fetchStoreInventory: (storeId: number) => Promise<void>;
  clearSelectedInventory: () => void;
  clearMutationError: () => void;
  adjustStock: (
    storeId: number,
    payload: {
      productoId: number;
      operation: StockOperation;
      quantity: number;
      reason?: string;
    },
  ) => Promise<boolean>;
  setThreshold: (
    storeId: number,
    payload: { productoId: number; minStock: number; maxStock?: number | null },
  ) => Promise<boolean>;
  addProductToStore: (
    storeId: number,
    payload: { productoId: number; quantity: number; minStock?: number },
  ) => Promise<boolean>;
  removeProductFromStore: (storeId: number, productoId: number) => Promise<boolean>;
  fetchMovements: (storeId: number, productoId?: number) => Promise<any[]>;
}

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const useInventory = (): UseInventoryResult => {
  const [stores, setStores] = useState<StoreInventory[]>([]);
  const [selectedInventory, setSelectedInventory] =
    useState<StoreInventoryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [mutationLoading, setMutationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const base = port;

  const fetchStores = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${base}allProducts/inventory`, {
        headers: authHeaders(),
      });
      setStores(response.data);
    } catch (err: any) {
      setError("Error al cargar las tiendas");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [base]);

  const fetchStoreInventory = useCallback(
    async (storeId: number) => {
      setIsLoadingDetail(true);
      setError(null);
      try {
        const response = await axios.get(
          `${base}allProducts/inventory/${storeId}`,
          { headers: authHeaders() },
        );
        setSelectedInventory(response.data);
      } catch (err: any) {
        setError("Error al cargar el inventario");
        console.error(err);
      } finally {
        setIsLoadingDetail(false);
      }
    },
    [base],
  );

  const clearSelectedInventory = useCallback(() => {
    setSelectedInventory(null);
  }, []);

  const clearMutationError = useCallback(() => {
    setMutationError(null);
  }, []);

  // Ejecuta una mutación y refresca el inventario seleccionado
  const runMutation = useCallback(
    async (
      promiseFactory: (storeId: number) => Promise<any>,
      storeId: number,
      refresh = true,
    ) => {
      setMutationLoading(true);
      setMutationError(null);
      try {
        await promiseFactory(storeId);
        if (refresh && selectedInventory) {
          await fetchStoreInventory(storeId);
        }
        return true;
      } catch (err: any) {
        setMutationError(
          err?.response?.data?.message || "Error al realizar la operación",
        );
        return false;
      } finally {
        setMutationLoading(false);
      }
    },
    [selectedInventory, fetchStoreInventory],
  );

  const adjustStock = useCallback<UseInventoryResult["adjustStock"]>(
    (storeId, payload) =>
      runMutation(
        (id) =>
          axios.put(
            `${base}allProducts/inventory/${id}/stock`,
            payload,
            { headers: authHeaders() },
          ),
        storeId,
      ),
    [base, runMutation],
  );

  const setThreshold = useCallback<UseInventoryResult["setThreshold"]>(
    (storeId, payload) =>
      runMutation(
        (id) =>
          axios.put(
            `${base}allProducts/inventory/${id}/threshold`,
            payload,
            { headers: authHeaders() },
          ),
        storeId,
      ),
    [base, runMutation],
  );

  const addProductToStore = useCallback<
    UseInventoryResult["addProductToStore"]
  >(
    (storeId, payload) =>
      runMutation(
        (id) =>
          axios.post(
            `${base}allProducts/inventory/${id}/products`,
            payload,
            { headers: authHeaders() },
          ),
        storeId,
      ),
    [base, runMutation],
  );

  const removeProductFromStore = useCallback<
    UseInventoryResult["removeProductFromStore"]
  >(
    (storeId, productoId) =>
      runMutation(
        (id) =>
          axios.delete(
            `${base}allProducts/inventory/${id}/products/${productoId}`,
            { headers: authHeaders() },
          ),
        storeId,
      ),
    [base, runMutation],
  );

  const fetchMovements = useCallback(
    async (storeId: number, productoId?: number) => {
      setMutationError(null);
      try {
        const url = productoId
          ? `${base}allProducts/inventory/${storeId}/movements/${productoId}`
          : `${base}allProducts/inventory/${storeId}/movements`;
        const response = await axios.get(url, { headers: authHeaders() });
        return response.data;
      } catch (err: any) {
        setMutationError(
          err?.response?.data?.message || "Error al obtener movimientos",
        );
        return [];
      }
    },
    [base],
  );

  return {
    stores,
    selectedInventory,
    isLoading,
    isLoadingDetail,
    error,
    mutationLoading,
    mutationError,
    fetchStores,
    fetchStoreInventory,
    clearSelectedInventory,
    clearMutationError,
    adjustStock,
    setThreshold,
    addProductToStore,
    removeProductFromStore,
    fetchMovements,
  };
};

export default useInventory;