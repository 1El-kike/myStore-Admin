import { Selection, SortDescriptor } from '@nextui-org/react';
import { useCallback, useMemo, useState ,FC, useEffect} from 'react'

interface TypeFilter  {
    datos:any;
}

export const filtertableandSearch = ({datos}:TypeFilter) => {
  
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
      column: "age",
      direction: "ascending",
    });
    const cantlength  =  datos?.length || 5;
    const pages = Math.ceil(cantlength / rowsPerPage) ;
    const hasSearchFilter = Boolean(filterValue);
    type Datos = (typeof datos)[0];
    
    const filteredItems = useMemo(() => {
      let filteredUsers = [...datos] ;
  
      if (hasSearchFilter) {
        filteredUsers = filteredUsers.filter((data) => {
          const productName = data.order.productName ;
          const productorder = data.customer.customerName || "";
          return (
            productName.toLowerCase().includes(filterValue.toLowerCase()) ||
            productorder.toLowerCase().includes(filterValue.toLowerCase())
          );
        });
      }
  
      return filteredUsers;
    }, [datos, filterValue]);
  
    
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
        page,
        pages,
        setPage,
        sortDescriptor,
        setSortDescriptor,
    }
}
