// components/StoreSelector.tsx
import { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

interface Store {
    id: number;
    name: string;
}

interface StoreSelectorProps {
    stores: Store[];
    selectedStoreIds: number[];
    onStoresChange: (storeIds: number[]) => void;
    error?: string;
}

const StoreSelector: React.FC<StoreSelectorProps> = ({
    stores,
    selectedStoreIds,
    onStoresChange,
    error
}) => {
    const [storeSearch, setStoreSearch] = useState("");
    const [showStoreSuggestions, setShowStoreSuggestions] = useState(false);
    const storeSearchRef = useRef<HTMLDivElement>(null);

    // Cerrar sugerencias al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (storeSearchRef.current && !storeSearchRef.current.contains(event.target as Node)) {
                setShowStoreSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Manejar la selección de una tienda
    const handleStoreSelect = (storeId: number) => {
        if (!selectedStoreIds.includes(storeId)) {
            onStoresChange([...selectedStoreIds, storeId]);
        }
        setStoreSearch("");
        setShowStoreSuggestions(false);
    };

    // Eliminar una tienda seleccionada
    const removeStore = (storeId: number) => {
        onStoresChange(selectedStoreIds.filter(id => id !== storeId));
    };

    // Filtrar tiendas según la búsqueda
    const filteredStores = stores.filter(store =>
        store.name.toLowerCase().includes(storeSearch.toLowerCase()) &&
        !selectedStoreIds.includes(store.id)
    );

    const { setValue } = useFormContext();


    useEffect(() => {

        if (selectedStoreIds) {
            setValue('storeId', selectedStoreIds)
        }
        console.log(selectedStoreIds)
    }, [selectedStoreIds])


    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiendas asignadas
            </label>

            {/* Input de búsqueda de tiendas */}
            <div className="relative mb-3" ref={storeSearchRef}>
                <input
                    type="text"
                    value={storeSearch}
                    onChange={(e) => {
                        setStoreSearch(e.target.value);
                        setShowStoreSuggestions(true);
                    }}
                    onFocus={() => setShowStoreSuggestions(true)}
                    className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    placeholder="Buscar tiendas..."
                />

                {/* Sugerencias de tiendas */}
                {showStoreSuggestions && storeSearch && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredStores.length > 0 ? (
                            filteredStores.map((store) => (
                                <div
                                    key={store.id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                                    onClick={() => handleStoreSelect(store.id)}
                                >
                                    {store.name}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-500">
                                No se encontraron tiendas
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Tiendas seleccionadas */}
            <div className="flex flex-wrap gap-2">
                {selectedStoreIds.map(storeId => {
                    const store = stores.find(s => s.id === storeId);
                    return (
                        <div key={storeId} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                            <span className="text-sm">{store?.name || `Tienda ${storeId}`}</span>
                            <button
                                type="button"
                                onClick={() => removeStore(storeId)}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                                <FaTimes size={12} />
                            </button>
                        </div>
                    );
                })}
            </div>

            {selectedStoreIds.length === 0 && (
                <p className="text-sm text-gray-500 mt-1">
                    No se han seleccionado tiendas. Busque y seleccione al menos una.
                </p>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default StoreSelector;