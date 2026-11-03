import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  Chip,
  ScrollShadow,
} from "@nextui-org/react";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiSettings,
  FiShoppingCart,
  FiRepeat,
  FiActivity,
} from "react-icons/fi";
import { port } from "../../../../config/env";
import { ProductInventoryRow } from "./StockAdjustModal";

interface Movement {
  id: number;
  type: string;
  quantity: number;
  before: number;
  after: number;
  reason: string | null;
  reference: string | null;
  createdAt: string;
  createdBy: number | null;
  product?: { name: string | null; image: string | null; sku: string | null };
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  storeId: number;
  product: ProductInventoryRow | null;
  error?: string | null;
}

const typeMeta: Record<string, { label: string; icon: any; color: string }> = {
  ADD: { label: "Ingreso", icon: <FiTrendingUp />, color: "text-emerald-600" },
  PURCHASE: { label: "Compra", icon: <FiShoppingCart />, color: "text-sky-600" },
  REMOVE: { label: "Retiro", icon: <FiTrendingDown />, color: "text-rose-600" },
  SALE: { label: "Venta", icon: <FiShoppingCart />, color: "text-amber-600" },
  SET: { label: "Ajuste", icon: <FiSettings />, color: "text-indigo-600" },
  TRANSFER: { label: "Transferencia", icon: <FiRepeat />, color: "text-violet-600" },
};

const emptyState = (
  <div className="text-center py-10 text-gray-500">
    <FiActivity className="text-4xl mx-auto mb-2 text-gray-300" />
    Sin movimientos registrados
  </div>
);

export const MovementsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  storeId,
  product,
  error,
}) => {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !product) return;
    setLoading(true);
    axios
      .get(`${port}allProducts/inventory/${storeId}/movements/${product.id}`)
      .then((res) => setMovements(res.data || []))
      .catch(() => setMovements([]))
      .finally(() => setLoading(false));
  }, [isOpen, storeId, product]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="lg" backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Historial de movimientos</h2>
          <p className="text-sm font-normal text-gray-500 truncate">
            {product?.name} · {movements.length} registros
          </p>
        </ModalHeader>
        <ModalBody className="py-6">
          {error && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 mb-3">
              {error}
            </div>
          )}
          {loading ? (
            <div className="flex justify-center py-10">
              <Spinner color="primary" label="Cargando movimientos..." />
            </div>
          ) : movements.length === 0 ? (
            emptyState
          ) : (
            <ScrollShadow className="max-h-96">
              <div className="relative flex flex-col gap-1">
                {movements.map((m, i) => {
                  const meta = typeMeta[m.type] || {
                    label: m.type,
                    icon: <FiActivity />,
                    color: "text-gray-500",
                  };
                  const isLast = i === movements.length - 1;
                  return (
                    <div key={m.id} className="relative flex gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className={`w-2 h-2 rounded-full mt-1.5 ${m.type === "REMOVE" || m.type === "SALE"
                            ? "bg-rose-400"
                            : "bg-emerald-400"
                            }`}
                        />
                        {!isLast && (
                          <span className="w-px bg-gray-200 flex-1 my-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`font-medium capitalize flex items-center gap-1 ${meta.color}`}>
                            {meta.icon}
                            {meta.label}
                          </span>
                          <Chip size="sm" variant="flat" color="default">
                            {dayjs(m.createdAt).format("DD/MM/YYYY HH:mm")}
                          </Chip>
                          {m.reference && (
                            <Chip size="sm" variant="flat" color="secondary">
                              {m.reference}
                            </Chip>
                          )}
                        </div>
                        <p className="text-gray-600 mt-1 text-sm">
                          {m.before} →{" "}
                          <span className="font-semibold text-gray-800">{m.after}</span>{" "}
                          unidades
                          {m.type !== "SET" && ` (${m.type === "REMOVE" || m.type === "SALE" ? "-" : "+"}${m.quantity})`}
                        </p>
                        {m.reason && (
                          <p className="text-xs text-gray-500 mt-0.5 italic">{m.reason}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollShadow>
          )}
        </ModalBody>
        <ModalFooter className="border-t border-gray-100">
          <Button color="default" variant="light" onPress={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MovementsModal;