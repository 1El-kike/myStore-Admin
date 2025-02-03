import { Selection, SortDescriptor } from "@nextui-org/react";
import dayjs from "dayjs";
import {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";

interface TypeFilter {
  children: React.ReactNode;
}

const UpdateTable = createContext<any>({
  page: 1,
  limit: 1,
  setlimit:()=>{},
  filtertimeEnd: new Date(),
  filtertimeStart: new Date(),
  include: "all",
  onSearchChange: () => {},
  rowsPerPage:5,
  onRowsPerPageChange: () => {},
  onPreviousPage: () => {},
  onNextPage: () => {},
  sortedItems: [],
  selectedKeys: new Set([]),
  setSelectedKeys: () => {},
  filterValue: "",
  hasSearchFilter: true,
  filterTimeStart: dayjs(),
  filterTimeEnd: dayjs(),
  datosTable: [],
  setdatosTable: () => {},
  handleDatechangeEnd: () => {},
  setPage: () => {},
  handleDatechange: () => {},
  sortDescriptor: {
    column: "age",
    direction: "ascending",
  },
  setSortDescriptor: () => {},
  clearDate: () => {},
});

export const FiltertableandSearch = ({ children }: TypeFilter) => {
  const [filterValue, setFilterValue] = useState("");
  const [datosTable, setdatosTable] = useState([]);
  const [limit, setlimit] = useState(1)
  const [filterTimeStart, setfilterTimeStart] = useState<dayjs.Dayjs | null>(
    dayjs()
  );
  const [filterTimeEnd, setfilterTimeEnd] = useState<dayjs.Dayjs | null>(
    dayjs()
  );
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
    const startOfDay = today.startOf("day");
    const endOfDay = today.endOf("day");
    // Establece el estado con la fecha actual
    setfilterTimeStart(startOfDay);
    setfilterTimeEnd(endOfDay);
  }, []);

  const handleDatechange = (newValue: dayjs.Dayjs) => {
    setfilterTimeStart(newValue.startOf("day"));
    setPage(1);
  };
  const handleDatechangeEnd = (newValue: dayjs.Dayjs) => {
    setfilterTimeEnd(newValue.endOf("day"));
    setPage(1);
  };

  const clearDate = () => {
    setfilterTimeEnd(null);
    setfilterTimeStart(null);
  };

  const hasSearchFilter = Boolean(filterValue);
  type DatosTable = (typeof datosTable)[0];

  //  const cantlength = filteredItems?.length || 5;
  //const pages = Math.ceil(cantlength / rowsPerPage);
  
  const sortedItems = useMemo(() => {
    return [...datosTable].sort((a: DatosTable, b: DatosTable) => {
      const first = a[sortDescriptor.column as keyof DatosTable] as number;
      const second = b[sortDescriptor.column as keyof DatosTable] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, datosTable]);

  const onNextPage = useCallback(() => {
    if (page < limit) {
      setPage(page + 1);
    }
  }, [page, limit]);

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

  return (
    <UpdateTable.Provider
      value={{
        onClear,
        onSearchChange,
        rowsPerPage,
        onRowsPerPageChange,
        onPreviousPage,
        onNextPage,
        sortedItems,
        selectedKeys,
        setSelectedKeys,
        filterValue,
        hasSearchFilter,
        filterTimeStart,
        filterTimeEnd,
        page,
        datosTable,
        setdatosTable,
        handleDatechangeEnd,
        limit,
        setlimit,
        setPage,
        handleDatechange,
        sortDescriptor,
        setSortDescriptor,
        clearDate,
      }}
    >
      {children}
    </UpdateTable.Provider>
  );
  {
  }
};

export const updateTable = () => useContext(UpdateTable);
