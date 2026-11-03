import React, { useEffect, useState } from "react";
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
  Textarea,
  Spinner,
} from "@nextui-org/react";
import { FiTrendingUp, FiTrendingDown, FiSettings } from "react-icons/fi";
import { StockOperation } from "../../../hooks/useInventory";

export interface ProductInventoryRow {
  id: number;
  name: string | null;
  image: string | null;
  price: number | null;
  quantity: number;
  minStock: number | null;
  maxStock: number | null;
  inventoryStatus: string | null;
  sku: string | null;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  storeId: number;
  product: ProductInventoryRow | null;
  loading?: boolean;
  error?: string | null;
  onConfirm: (payload: {
    productoId: number;
    operation: StockOperation;
    quantity: number;
    reason?: string;
  }) => Promise<boolean>;
}

const operations = [
  { key: "ADD", label: "Ingresar stock", icon: <FiTrendingUp />, color: "text-emerald-600" },
  { key: "REMOVE", label: "Retirar stock", icon: <FiTrendingDown />, color: "text-rose-600" },
  { key: "SET", label: "Ajustar a un valor", icon: <FiSettings />, color: "text-indigo-600" },
  { key: "PURCHASE", label: "Compra / recepción", icon: <FiTrendingUp />, color: "text-sky-600" },
  { key: "SALE", label: "Salida por venta", icon: <FiTrendingDown />, color: "text-amber-600" },
];

export const StockAdjustModal: React.FC<Props> = ({
  isOpen,
  onClose,
  storeId,
  product,
  loading,
  error,
  onConfirm,
}) => {
  const [operation, setOperation] = useState<string>("ADD");
  const [quantity, setQuantity] = useState("1");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOperation("ADD");
      setQuantity("1");
      setReason("");
      setSubmitting(false);
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (!product) return;
    setSubmitting(true);
    const ok = await onConfirm({
      productoId: product.id,
      operation: operation as StockOperation,
      quantity: Number(quantity),
      reason: reason.trim() || undefined,
    });
    setSubmitting(false);
    if (ok) onClose();
  };

  const netEffect =
    operation === "ADD" || operation === "PURCHASE"
      ? (product?.quantity || 0) + Number(quantity || 0)
      : operation === "REMOVE" || operation === "SALE"
        ? (product?.quantity || 0) - Number(quantity || 0)
        : Number(quantity || 0);

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="lg" backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Ajustar stock</h2>
          <p className="text-sm font-normal text-gray-500">
            {product?.name} · Disponible:{" "}
            <span className="font-semibold text-indigo-600">
              {product?.quantity ?? 0}
            </span>{" "}
            unidades
          </p>
        </ModalHeader>
        <ModalBody className="gap-4 py-6">
          <Select
            label="Tipo de operación"
            placeholder="Selecciona una operación"
            selectedKeys={[operation]}
            onSelectionChange={(keys) =>
              setOperation((Array.from(keys)[0] as string) || "ADD")
            }
            startContent={
              <span className="text-gray-400 pointer-events-none text-lg">
                {operations.find((o) => o.key === operation)?.icon}
              </span>
            }
          >
            {operations.map((op) => (
              <SelectItem key={op.key} value={op.key}>
                <span className={`flex items-center gap-2 ${op.color}`}>
                  {op.icon}
                  {op.label}
                </span>
              </SelectItem>
            ))}
          </Select>

          <Input
            type="number"
            min={0}
            label="Cantidad"
            value={quantity}
            onValueChange={(v) => setQuantity(v)}
            endContent={
              <span className="text-sm text-gray-400 pointer-events-none">
                unid.
              </span>
            }
          />

          <div className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
            <span className="text-sm text-gray-600">Stock resultante</span>
            <span
              className={`text-lg font-bold ${netEffect <= 0
                ? "text-rose-600"
                : netEffect < (product?.minStock || 0)
                  ? "text-amber-600"
                  : "text-emerald-600"
                }`}
            >
              {netEffect}
            </span>
          </div>

          <Textarea
            label="Motivo (opcional)"
            placeholder="Ej. reposición de mercancía, merma, transferencia..."
            value={reason}
            onValueChange={setReason}
            minRows={2}
          />

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
            isDisabled={!quantity || Number(quantity) < 0 || submitting || loading}
            onPress={handleConfirm}
          >
            {submitting || loading ? <Spinner size="sm" color="white" /> : "Guardar"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StockAdjustModal;