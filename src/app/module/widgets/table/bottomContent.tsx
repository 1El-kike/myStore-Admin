// BottomContent.js
import { Button, Pagination } from '@nextui-org/react';
import React, { useMemo } from 'react';
import { updateTable } from '../../core/filtertableandSearch';

/* interface BottomContentProps {
    selectedKeys: "all" | Set<any>; // Puede ser "all" o un conjunto de claves seleccionadas
    filteredItems: any[]; // Lista de elementos filtrados
    page: number; // Página actual
    pages: number; // Total de páginas
    setPage: (page: number) => void; // Función para cambiar la página
    onPreviousPage: () => void; // Función para ir a la página anterior
    onNextPage: () => void; // Función para ir a la página siguiente
  } */

const BottomContent:React.FC = () => {
 

  const {
    onNextPage,
    onPreviousPage,
    page,
    limit,
    selectedKeys,
    setPage,
    datosTable
  } =updateTable()


    const content = useMemo(() => { 
        
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${datosTable.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="danger"
          page={page}
          total={limit}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={limit === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={limit === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, datosTable.length, page, limit]);

  return content;
};

export default BottomContent;
