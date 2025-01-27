import { Selection, SortDescriptor } from "@nextui-org/react";
import dayjs from "dayjs";
import { useCallback, useMemo, useState, FC, useEffect } from "react";

interface TypeFilter {
  datos: any;
}

export const filtertableandSearch = ({ datos }: TypeFilter) => {
  const [filterValue, setFilterValue] = useState("");
  const [filterTimeStart, setfilterTimeStart] = useState(dayjs());
  const [filterTimeEnd, setfilterTimeEnd] = useState(dayjs());
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  // Efecto para establecer la fecha actual al montar el componente
  useEffect(() => {
    const today = dayjs();
    const startOfDay = today.startOf('day');
    const endOfDay = today.endOf('day');
    // Establece el estado con la fecha actual
    setfilterTimeStart(startOfDay);
    setfilterTimeEnd(endOfDay);
  }, []);

  const handleDatechange = (newValue: dayjs.Dayjs) => {
    setfilterTimeStart(newValue.startOf('day'));
  };
  const handleDatechangeEnd = (newValue: dayjs.Dayjs) => {
    setfilterTimeEnd(newValue.endOf('day'));
  };

  
  const hasSearchFilter = Boolean(filterValue);
  type Datos = (typeof datos)[0];

  const filteredItems = useMemo(() => {
    return datos.filter((data: any) => {
      // Filtrado por nombre y orden
      const productName = data.order.productName.toLowerCase();
      const productOrder = (data.customer.customerName || "").toLowerCase();
      const matchesSearchFilter =
        productName.includes(filterValue.toLowerCase()) ||
        productOrder.includes(filterValue.toLowerCase());  
        // Filtrado por fecha
        let matchesDateFilter = true; // Por defecto, coincide si no hay filtro de tiempo     
        // Convierte la fecha del pedido a un objeto Date
        const productTime = new Date(data.order.fechaOrder);     
        // Si se proporcionan fechas de inicio y fin, usa esas fechas
        const searchDateStart = filterTimeStart.toDate(); // Convierte a Date
        const searchDateEnd =  filterTimeEnd.toDate() ; // Convierte a Date        
        matchesDateFilter =
        productTime >= searchDateStart && productTime <= searchDateEnd;  
       
      // Retorna verdadero si coincide con el filtro de nombre/orden y el filtro de fecha (si aplica)
      return (
        (hasSearchFilter ? matchesSearchFilter : true) && matchesDateFilter
      );
    });
  }, [
    datos,
    filterValue,
    filterTimeStart,
    filterTimeEnd,
    hasSearchFilter,
  ]);

  const cantlength = filteredItems?.length || 5;
  const pages = Math.ceil(cantlength / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Datos, b: Datos) => {
      const first = a[sortDescriptor.column as keyof Datos] as number;
      const second = b[sortDescriptor.column as keyof Datos] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  return {
    onClear,
    onSearchChange,
    onRowsPerPageChange,
    onPreviousPage,
    onNextPage,
    sortedItems,
    selectedKeys,
    setSelectedKeys,
    filterValue,
    hasSearchFilter,
    filteredItems,
    filterTimeStart,
    filterTimeEnd,
    page,
    handleDatechangeEnd,
    pages,
    setPage,
    handleDatechange,
    sortDescriptor,
    setSortDescriptor,
  };
};
