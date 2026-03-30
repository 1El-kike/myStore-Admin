import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../module/auth/core/Auth";
import { getRole } from "../../utils/getRoles";
import useInventory from "../../hooks/useInventory";
import { port, PUBLIC_URL } from "../../../config/env";
import {
    FiPackage,
    FiShoppingBag,
    FiMapPin,
    FiPhone,
    FiArrowRight,
    FiBox,
    FiAlertCircle,
    FiCheckCircle,
    FiXCircle,
    FiSearch,
    FiFilter
} from "react-icons/fi";
import { FaStore, FaWarehouse } from "react-icons/fa";
import { Progress, Select, SelectItem, Input, Image } from "@nextui-org/react";

export const InventoryPage: React.FC = () => {
    const { currentUser } = useAuth();
    const roles = getRole(currentUser);

    const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");

    const {
        stores,
        selectedInventory,
        isLoading,
        isLoadingDetail,
        error,
        fetchStores,
        fetchStoreInventory,
        clearSelectedInventory
    } = useInventory();

    // Fetch stores on mount
    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    // Auto-select single store if not super admin
    useEffect(() => {
        if (stores.length === 1 && !roles.super_admin && !selectedStoreId) {
            setSelectedStoreId(stores[0].storeId);
        }
    }, [stores, roles.super_admin, selectedStoreId]);

    // Fetch inventory when store is selected
    useEffect(() => {
        if (selectedStoreId) {
            fetchStoreInventory(selectedStoreId);
        } else {
            clearSelectedInventory();
        }
    }, [selectedStoreId, fetchStoreInventory, clearSelectedInventory]);

    // Filter products
    const filteredProducts = useMemo(() => {
        if (!selectedInventory?.products) return [];

        return selectedInventory.products.filter((product) => {
            const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus === "all" || product.inventoryStatus === filterStatus;
            const matchesCategory = filterCategory === "all" || product.tipo === filterCategory;

            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [selectedInventory?.products, searchTerm, filterStatus, filterCategory]);

    // Get unique categories for filter
    const categories = useMemo((): string[] => {
        if (!selectedInventory?.products) return [];
        const cats = new Set(
            selectedInventory.products
                .map(p => p.tipo || "")
                .filter((c) => c !== "")
        );
        return Array.from(cats);
    }, [selectedInventory?.products]);

    const getStatusColor = (status: string | null) => {
        switch (status) {
            case "INSTOCK":
                return "text-green-500";
            case "LOWSTOCK":
                return "text-yellow-500";
            case "OUTOFSTOCK":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    const getStatusIcon = (status: string | null) => {
        switch (status) {
            case "INSTOCK":
                return <FiCheckCircle className="text-green-500" />;
            case "LOWSTOCK":
                return <FiAlertCircle className="text-yellow-500" />;
            case "OUTOFSTOCK":
                return <FiXCircle className="text-red-500" />;
            default:
                return <FiBox className="text-gray-500" />;
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Progress
                        isIndeterminate
                        color="primary"
                        size="lg"
                        className="max-w-md"
                    />
                    <p className="mt-4 text-gray-500">Cargando inventario...</p>
                </div>
            </div>
        );
    }

    // Selection View: Show stores if user has more than 1 store or is Super Admin
    const showStoreSelection = roles.super_admin || stores.length > 1;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
            {/* Header */}
            <div className="mb-8 animate-fade-in">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                        <FaWarehouse className="text-2xl text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Inventario
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {roles.super_admin ? "Gestiona el inventario de todas las tiendas" : "Gestiona el inventario de tu tienda"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Store Selection */}
            {showStoreSelection && !selectedStoreId && (
                <div className="animate-fade-in-up">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <FaStore className="text-indigo-500" />
                        Selecciona una tienda
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {stores.map((store, index) => (
                            <div
                                key={store.storeId}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-indigo-200"
                                onClick={() => setSelectedStoreId(store.storeId)}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: `fade-in-up 0.5s ease forwards`
                                }}
                            >
                                {/* Cover Image */}
                                <div className="h-32 overflow-hidden">
                                    {store.storeCover ? (
                                        <Image
                                            src={`${port}${store.storeCover}`}
                                            alt={store.storeName}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                                            <FaStore className="text-5xl text-white/50" />
                                        </div>
                                    )}
                                </div>

                                {/* Store Info */}
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors">
                                            {store.storeName}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${store.isOpen
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}>
                                            {store.isOpen ? "Abierta" : "Cerrada"}
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-500">
                                        {store.address && (
                                            <div className="flex items-center gap-2">
                                                <FiMapPin className="text-indigo-400" />
                                                <span className="truncate">{store.address}</span>
                                            </div>
                                        )}
                                        {store.phone && (
                                            <div className="flex items-center gap-2">
                                                <FiPhone className="text-indigo-400" />
                                                <span>{store.phone}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Stats */}
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <FiPackage className="text-purple-500" />
                                            <span className="font-semibold text-gray-700">{store.totalProducts}</span>
                                            <span className="text-gray-400 text-sm">productos</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FiShoppingBag className="text-indigo-500" />
                                            <span className="font-semibold text-gray-700">{store.totalQuantity}</span>
                                            <span className="text-gray-400 text-sm">unidades</span>
                                        </div>
                                    </div>

                                    {/* Hover Arrow */}
                                    <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                        <div className="bg-indigo-500 p-2 rounded-full">
                                            <FiArrowRight className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Card */}
                    <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white text-xl font-bold">Resumen General</h3>
                                <p className="text-indigo-100">{stores.length} tiendas</p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-white">
                                    {stores.reduce((acc, s) => acc + s.totalProducts, 0)}
                                </div>
                                <p className="text-indigo-100">Total productos</p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-white">
                                    {stores.reduce((acc, s) => acc + s.totalQuantity, 0).toLocaleString()}
                                </div>
                                <p className="text-indigo-100">Total unidades</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Single Store Mode - Direct to Inventory */}
            {!showStoreSelection && stores.length === 1 && !selectedStoreId && (
                <div className="animate-fade-in">
                    <div
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300"
                        onClick={() => setSelectedStoreId(stores[0].storeId)}
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                                {stores[0].storeImage ? (
                                    <Image
                                        src={`${port}${stores[0].storeImage}` || '$#'}
                                        alt={stores[0].storeName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FaStore className="text-4xl text-white" />
                                )}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-800">{stores[0].storeName}</h2>
                                <p className="text-gray-500">{stores[0].address}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="flex items-center gap-1 text-sm text-gray-500">
                                        <FiPackage className="text-purple-500" />
                                        {stores[0].totalProducts} productos
                                    </span>
                                    <span className="flex items-center gap-1 text-sm text-gray-500">
                                        <FiShoppingBag className="text-indigo-500" />
                                        {stores[0].totalQuantity} unidades
                                    </span>
                                </div>
                            </div>
                            <div className="bg-indigo-100 p-4 rounded-xl">
                                <FiArrowRight className="text-2xl text-indigo-600" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Selected Store Inventory Detail */}
            {selectedStoreId && selectedInventory && (
                <div className="animate-fade-in">
                    {/* Back Button & Store Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div
                            className="flex items-center gap-3 cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={() => setSelectedStoreId(null)}
                        >
                            <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
                                <FiArrowRight className="rotate-180 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{selectedInventory.storeName}</h2>
                                <p className="text-sm text-gray-500">{selectedInventory.address}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {roles.super_admin && stores.length > 1 && (
                                <button
                                    onClick={() => setSelectedStoreId(null)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                                >
                                    <FaStore />
                                    Cambiar tienda
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <FiPackage className="text-xl text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Productos</p>
                                    <p className="text-2xl font-bold text-gray-800">{selectedInventory.totalProducts}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <FiShoppingBag className="text-xl text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Unidades</p>
                                    <p className="text-2xl font-bold text-gray-800">{selectedInventory.totalQuantity}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-yellow-100 rounded-xl">
                                    <FiAlertCircle className="text-xl text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Stock Bajo</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {selectedInventory.products.filter(p => p.inventoryStatus === "LOWSTOCK").length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-red-100 rounded-xl">
                                    <FiXCircle className="text-xl text-red-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Agotados</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {selectedInventory.products.filter(p => p.inventoryStatus === "OUTOFSTOCK").length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <Input
                                type="text"
                                placeholder="Buscar producto..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                startContent={<FiSearch className="text-gray-400" />}
                                className="flex-1 min-w-[200px]"
                                size="sm"
                            />

                            <Select
                                placeholder="Estado"
                                selectedKeys={[filterStatus]}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-40"
                                size="sm"
                                startContent={<FiFilter className="text-gray-400" />}
                            >
                                <SelectItem key="all" value="all">Todos</SelectItem>
                                <SelectItem key="INSTOCK" value="INSTOCK">En Stock</SelectItem>
                                <SelectItem key="LOWSTOCK" value="LOWSTOCK">Stock Bajo</SelectItem>
                                <SelectItem key="OUTOFSTOCK" value="OUTOFSTOCK">Agotado</SelectItem>
                            </Select>

                            <Select
                                placeholder="Categoría"
                                selectedKeys={[filterCategory]}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-40"
                                size="sm"
                                items={categories.map((cat) => ({ key: cat, label: cat }))}
                            >
                                {(item) => (
                                    <SelectItem key={item.key}>{item.label}</SelectItem>
                                )}
                            </Select>

                            <div className="text-sm text-gray-500">
                                {filteredProducts.length} productos
                            </div>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Producto</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">SKU</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Categoría</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Precio</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Cantidad</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {isLoadingDetail ? (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center">
                                                <Progress isIndeterminate color="primary" className="max-w-md mx-auto" />
                                            </td>
                                        </tr>
                                    ) : filteredProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                                <FiPackage className="text-4xl mx-auto mb-2 text-gray-300" />
                                                <p>No se encontraron productos</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredProducts.map((product, index) => (
                                            <tr
                                                key={product.id}
                                                className="hover:bg-gray-50 transition-colors"
                                                style={{
                                                    animation: `fade-in-row 0.3s ease ${index * 50}ms forwards`,
                                                    opacity: 0
                                                }}
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                            {product.image ? (
                                                                <Image
                                                                    src={`${port}${product.image}`}
                                                                    alt={product.name || "Producto"}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center">
                                                                    <FiPackage className="text-gray-400" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-800">{product.name}</p>
                                                            <p className="text-xs text-gray-400">{product.category}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="text-sm text-gray-500 font-mono">{product.sku || "-"}</span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                                                        {product.tipo || "-"}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="font-medium text-gray-800">
                                                        ${product.price?.toFixed(2) || "0.00"}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`font-bold ${product.quantity_total === 0 ? "text-red-500" :
                                                            product.quantity_total && product.quantity_total < 10 ? "text-yellow-500" :
                                                                "text-green-500"
                                                            }`}>
                                                            {product.quantity_total || 0}
                                                        </span>
                                                        <span className="text-xs text-gray-400">
                                                            / {product.quantity_user || 0}
                                                        </span>
                                                    </div>
                                                    {/* Stock Bar */}
                                                    <div className="w-20 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${product.quantity_total === 0 ? "bg-red-500" :
                                                                product.quantity_total && product.quantity_total < 10 ? "bg-yellow-500" :
                                                                    "bg-green-500"
                                                                }`}
                                                            style={{
                                                                width: `${Math.min(100, ((product.quantity_total || 0) / (product.quantity_user || 1)) * 100)}%`
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(product.inventoryStatus)}
                                                        <span className={`text-sm font-medium ${getStatusColor(product.inventoryStatus)}`}>
                                                            {product.inventoryStatus === "INSTOCK" && "En Stock"}
                                                            {product.inventoryStatus === "LOWSTOCK" && "Stock Bajo"}
                                                            {product.inventoryStatus === "OUTOFSTOCK" && "Agotado"}
                                                            {!product.inventoryStatus && "Sin estado"}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
                    <FiAlertCircle className="text-xl" />
                    <span>{error}</span>
                    <button
                        onClick={() => error}
                        className="ml-2 hover:bg-red-100 p-1 rounded"
                    >
                        ×
                    </button>
                </div>
            )}

            <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-row {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease forwards;
        }
      `}</style>
        </div>
    );
};

export default InventoryPage;