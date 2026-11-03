import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spinner,
} from "@nextui-org/react";
import { FiSliders } from "react-icons/fi";
import { ProductInventoryRow } from "./StockAdjustModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: ProductInventoryRow | null;
  loading?: boolean;
  error?: string | null;
  onConfirm: (payload: {
    productoId: number;
    minStock: number;
    maxStock?: number | null;
  }) => Promise<boolean>;
}

export const ThresholdModal: React.FC<Props> = ({
  isOpen,
  onClose,
  product,
  loading,
  error,
  onConfirm,
}) => {
  const [minStock, setMinStock] = useState("5");
  const [maxStock, setMaxStock] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      setMinStock(String(product.minStock ?? 5));
      setMaxStock(product.maxStock != null ? String(product.maxStock) : "");
      setSubmitting(false);
    }
  }, [isOpen, product]);

  const handleConfirm = async () => {
    if (!product) return;
    setSubmitting(true);
    const ok = await onConfirm({
      productoId: product.id,
      minStock: Number(minStock),
      maxStock: maxStock.trim() ? Number(maxStock) : null,
    });
    setSubmitting(false);
    if (ok) onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="md" backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FiSliders className="text-indigo-500" />
            Umbral de stock
          </h2>
          <p className="text-sm font-normal text-gray-500">
            {product?.name} · Stock actual: {product?.quantity ?? 0}
          </p>
        </ModalHeader>
        <ModalBody className="gap-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="number"
              min={0}
              label="Stock mínimo"
              description="Alerta de stock bajo cuando se alcance"
              value={minStock}
              onValueChange={setMinStock}
            />
            <Input
              type="number"
              min={0}
              label="Stock máximo (opcional)"
              description="Limite de reposición sugerido"
              placeholder="Sin límite"
              value={maxStock}
              onValueChange={setMaxStock}
            />
          </div>

          <div className="rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm px-4 py-3 flex items-start gap-2">
            <span className="mt-0.5">El estado del producto se recalcula automáticamente
              frente a este umbral.</span>
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
            isDisabled={submitting || loading || Number(minStock) < 0}
            onPress={handleConfirm}
          >
            {submitting || loading ? <Spinner size="sm" color="white" /> : "Guardar"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ThresholdModal;