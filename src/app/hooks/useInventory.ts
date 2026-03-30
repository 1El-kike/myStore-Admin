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
}

interface ProductInventory {
  id: number;
  name: string | null;
  image: string | null;
  price: number | null;
  quantity_total: number | null;
  quantity_user: number | null;
  inventoryStatus: string | null;
  tipo: string | null;
  category: string | null;
  sku: string | null;
}

interface StoreInventoryDetail extends StoreInventory {
  products: ProductInventory[];
}

interface UseInventoryResult {
  stores: StoreInventory[];
  selectedInventory: StoreInventoryDetail | null;
  isLoading: boolean;
  isLoadingDetail: boolean;
  error: string | null;
  fetchStores: () => Promise<void>;
  fetchStoreInventory: (storeId: number) => Promise<void>;
  clearSelectedInventory: () => void;
}

export const useInventory = (): UseInventoryResult => {
  const [stores, setStores] = useState<StoreInventory[]>([]);
  const [selectedInventory, setSelectedInventory] =
    useState<StoreInventoryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const base = port;

  const fetchStores = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${base}allProducts/inventory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${base}allProducts/inventory/${storeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
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

  return {
    stores,
    selectedInventory,
    isLoading,
    isLoadingDetail,
    error,
    fetchStores,
    fetchStoreInventory,
    clearSelectedInventory,
  };
};

export default useInventory;
