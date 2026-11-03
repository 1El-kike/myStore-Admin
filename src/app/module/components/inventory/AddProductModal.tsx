import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Chip,
  Image,
  ScrollShadow,
} from "@nextui-org/react";
import { FiPackage, FiSearch, FiPlus } from "react-icons/fi";
import { port } from "../../../../config/env";

interface CatalogProduct {
  id: number;
  name: string | null;
  price: number | null;
  image: string | null;
  sku: string | null;
  tipo: string | null;
  inventoryStatus?: string | null;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  storeId: number;
  productsInStore: { id: number }[];
  loading?: boolean;
  error?: string | null;
  onConfirm: (payload: {
    productoId: number;
    quantity: number;
    minStock?: number;
  }) => Promise<boolean>;
}

export const AddProductModal: React.FC<Props> = ({
  isOpen,
  onClose,
  productsInStore,
  loading,
  error,
  onConfirm,
}) => {
  const [catalog, setCatalog] = useState<CatalogProduct[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [quantity, setQuantity] = useState("10");
  const [minStock, setMinStock] = useState("5");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSubmitting(false);
    setSearch("");
    setSelected(null);
    setQuantity("10");
    setMinStock("5");
    const token = localStorage.getItem("token");
    setCatalogLoading(true);
    axios
      .get(`${port}allProducts`)
      .then((res) => setCatalog(res.data || []))
      .catch(() => setCatalog([]))
      .finally(() => setCatalogLoading(false));
  }, [isOpen]);

  const inStoreIds = useMemo(
    () => new Set(productsInStore.map((p) => p.id)),
    [productsInStore],
  );

  const available = useMemo(() => {
    const q = search.trim().toLowerCase();
    return catalog.filter(
      (p) =>
        !inStoreIds.has(p.id) &&
        (!q ||
          p.name?.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q) ||
          p.tipo?.toLowerCase().includes(q)),
    );
  }, [catalog, inStoreIds, search]);

  const handleConfirm = async () => {
    if (!selected) return;
    setSubmitting(true);
    const ok = await onConfirm({
      productoId: selected,
      quantity: Number(quantity || 0),
      minStock: Number(minStock || 0),
    });
    setSubmitting(false);
    if (ok) onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="2xl"
      backdrop="blur"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FiPackage className="text-indigo-500" />
            Añadir producto al inventario
          </h2>
          <p className="text-sm font-normal text-gray-500">
            Selecciona un producto del catálogo para vincularlo a esta tienda.
          </p>
        </ModalHeader>
        <ModalBody className="gap-4 py-6">
          <Input
            placeholder="Buscar por nombre, SKU o tipo..."
            value={search}
            onValueChange={setSearch}
            startContent={<FiSearch className="text-gray-400" />}
            size="sm"
          />

          {catalogLoading ? (
            <div className="flex justify-center py-10">
              <Spinner color="primary" label="Cargando catálogo..." />
            </div>
          ) : available.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <FiPackage className="text-4xl mx-auto mb-2 text-gray-300" />
              No hay productos disponibles para añadir
            </div>
          ) : (
            <ScrollShadow className="max-h-64">
              <div className="flex flex-col gap-2">
                {available.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelected(p.id)}
                    className={`cursor-pointer flex items-center gap-3 rounded-xl border px-3 py-2 text-left transition-colors duration-200 ${selected === p.id
                      ? "border-indigo-500 bg-indigo-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50"
                      }`}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {p.image ? (
                        <Image
                          src={`${port}${p.image}`}
                          alt={p.name || "Producto"}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiPackage className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{p.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Chip size="sm" variant="flat" color="secondary">
                          {p.tipo || "General"}
                        </Chip>
                        {p.sku && (
                          <span className="text-xs text-gray-400 font-mono">
                            {p.sku}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-semibold text-gray-700 whitespace-nowrap">
                      ${p.price?.toFixed(2) || "0.00"}
                    </span>
                  </button>
                ))}
              </div>
            </ScrollShadow>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              min={0}
              label="Stock inicial"
              value={quantity}
              onValueChange={setQuantity}
              endContent={
                <span className="text-sm text-gray-400">unid.</span>
              }
            />
            <Input
              type="number"
              min={0}
              label="Stock mínimo"
              value={minStock}
              onValueChange={setMinStock}
            />
          </div>

          {error && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3">
              {error}
            </div>
          )}
        </ModalBody>
        <ModalFooter className="border-t border-gray-100">
          <Button color="default" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            className="bg-gradient-to-r from-indigo-500 to-purple-600"
            isDisabled={!selected || submitting || loading}
            onPress={handleConfirm}
            startContent={<FiPlus />}
          >
            {submitting || loading ? <Spinner size="sm" color="white" /> : "Añadir"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;