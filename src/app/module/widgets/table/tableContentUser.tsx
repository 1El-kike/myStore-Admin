import { Button, cn, DropdownItem, DropdownSection, Input, ScrollShadow, Spinner } from "@nextui-org/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { DeleteIcon, SearchIcon } from "../../../utils/icons";
import { FaArrowRight, FaFilter, FaPlus } from "react-icons/fa";
import { updateTable } from "../../core/filtertableandSearch";
import { FiFilter } from "react-icons/fi";
import { Modal_Component } from "../modal";
import useBack from "../../../hooks/useBack";
import { PhoneInput } from "../inputTel";
import { useEjecut } from "../../../hooks/useEjecut";
import { Form_user } from "../../../../model/type_user";
import {
    FormProvider,
    useForm,
} from "react-hook-form";
import { useAuth } from "../../auth/core/Auth";
import StoreSelector from "../SelectStore";
import { DeleteDocumentIcon, DropdownComponent } from "../Dropdown";
import { iconClasses } from "@mui/material";
import { FaCircleXmark } from "react-icons/fa6";
import { useFilter } from "../../../hooks/useFillterUser";

interface topContent {
    datos: any;
}

interface Store {
    id: number;
    name: string;
}



const TopContentUser: React.FC<topContent> = ({
    datos
}) => {
    const {
        onClear,
        onRowsPerPageChange,
        onSearchChangeUser,
        filterValueUser,
        hasSearchFilter,
        setPage
    } = updateTable();

    const submitFormRef = useRef<() => void | null>();
    const pendingActionRef = useRef<(() => void) | null>(null);
    const [issuccess, setissuccess] = useState(false)
    const { currentUser } = useAuth();


    useEffect(() => {
        if (issuccess) {
            setTimeout(() => {
                if (pendingActionRef.current) {
                    pendingActionRef.current();
                    pendingActionRef.current = null;
                }
            }, 500);
        }
    }, [issuccess]);

    const createUser = (closeModal: () => void) => {
        pendingActionRef.current = closeModal;
        submitFormRef.current?.();
    };

    const isRole: boolean = currentUser?.permission.includes('READ_ALL') ? true : false

    const rolesOptions = isRole ? [
        { id: 'SUPER_ADMIN', label: 'Acceso completo al sistema' },
        { id: 'ADMIN', label: 'Administrador de tienda' },
        { id: 'EMPLOYEE', label: 'Empleado de tienda' },
    ] : [
        { id: 'ADMIN', label: 'Administrador de tienda' },
        { id: 'EMPLOYEE', label: 'Empleado de tienda' },
    ];


    const CreateUserModal = () => {
        const [preview, setPreview] = useState<string | null>(null);
        const methods = useForm(Form_user);
        methods.setValue('role', currentUser?.role as string)

        const { onSubmit, error, success: issuccess, isLoading, result } = useBack<FormData>({
            url: `user/create`,
            reset: methods.reset,
        });


        useEffect(() => {
            if (result) {
                window.location.reload()
            }
        }, [result])


        const { data, isLoadingData, errors: ErrorStore } = useEjecut({
            url: 'stores/',
        });

        // Convertir datos de tiendas al formato esperado
        const stores: Store[] = useMemo(() => {
            return data?.map((item: { id: number, name: string }) => ({
                id: item.id,
                name: item.name,
            })) || [];
        }, [data]);

        const [selectedStoreIds, setSelectedStoreIds] = useState<number[]>([]);


        useEffect(() => {
            setissuccess(issuccess);
            if (issuccess) {
                methods.reset();
                setPreview(null);
            }
        }, [issuccess]);

        const handleFormSubmit: any = (data: FormData) => {
            onSubmit(data);
        };

        useEffect(() => {
            submitFormRef.current = () => methods.handleSubmit(handleFormSubmit)() as any;
            return () => {
                submitFormRef.current = null as any;
            };
        }, [methods.handleSubmit]);

        const roleValue = methods.watch('roleName');


        const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files && files.length > 0) {
                const file = files[0];
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
                methods.setValue('image', Array.from(files));
                methods.trigger('image');
            }
        };

        return (
            <ScrollShadow>
                <div className="p-4 z-50 md:p-6">
                    <FormProvider {...methods}>

                        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                            {/* Campo Foto */}
                            <div className="mb-6 z-50 flex flex-col items-center">
                                <div className="relative mb-3">
                                    <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden">
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-gray-500 text-4xl">+</span>
                                        )}
                                    </div>
                                    <label
                                        htmlFor="photo-upload"
                                        className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer shadow-md"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
                                    </label>
                                    <input
                                        id="photo-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        {...methods.register('image', {
                                            validate: (fileList) =>
                                                fileList.length > 0 ? true : 'La imagen es requerida'
                                        })}
                                        onChange={handlePhotoChange}
                                    />
                                </div>
                                <span className="text-sm text-gray-500">Subir foto</span>
                                {methods.formState.errors.image && (
                                    <p className="mt-1 text-sm text-red-600 text-center">
                                        {methods.formState.errors.image.message}
                                    </p>
                                )}
                            </div>

                            {/* Campo Nombre */}
                            <div className="mb-5 ">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre completo
                                </label>
                                <input
                                    type="text"
                                    {...methods.register('name', {
                                        required: 'El nombre es obligatorio',
                                        minLength: {
                                            value: 3,
                                            message: 'El nombre debe tener al menos 3 caracteres'
                                        }
                                    })}
                                    className={`w-full px-4 py-2 border ${methods.formState.errors.name ? 'border-red-500' : 'border-gray-300'
                                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                    placeholder="Juan Pérez"
                                />
                                {methods.formState.errors?.name && (
                                    <p className="mt-1 text-sm text-red-600">{methods.formState.errors?.name.message}</p>
                                )}
                            </div>
                            {/* Campo Password */}
                            <div className="mb-5 ">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    {...methods.register('password', {
                                        required: 'El nombre es obligatorio',
                                        minLength: {
                                            value: 4,
                                            message: 'El password debe tener al menos 4 caracteres'
                                        }
                                    })}
                                    className={`w-full px-4 py-2 border ${methods.formState.errors.password ? 'border-red-500' : 'border-gray-300'
                                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                    placeholder="Juan Pérez"
                                />
                                {methods.formState.errors?.password && (
                                    <p className="mt-1 text-sm text-red-600">{methods.formState.errors?.password.message}</p>
                                )}
                            </div>
                            {/* Campo iphone */}
                            <PhoneInput />

                            {/* Campo Email */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    {...methods.register('email', {
                                        required: 'El correo es obligatorio',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Correo electrónico inválido'
                                        }
                                    })}
                                    className={`w-full px-4 py-2 border ${methods.formState.errors.email ? 'border-red-500' : 'border-gray-300'
                                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                    placeholder="usuario@empresa.com"
                                />
                                {methods.formState.errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{methods.formState.errors.email.message}</p>
                                )}
                            </div>
                            {/* Campo seleccion de tienda */}
                            {isLoadingData ?
                                <Spinner labelColor="danger" color="danger" label="Loading..." />
                                :
                                <StoreSelector
                                    stores={stores}
                                    selectedStoreIds={selectedStoreIds}
                                    onStoresChange={setSelectedStoreIds}
                                    error={methods.formState.errors.storeId?.message || ErrorStore as string}
                                />
                            }

                            {/* Campo Roles (ahora selección única) */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rol
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {rolesOptions.map((role) => (
                                        <div key={role.id} className="flex items-center">
                                            <input
                                                id={`role-${role.id}`}
                                                type="radio"
                                                value={role.id}
                                                checked={roleValue === role.id}
                                                {...methods.register('roleName', {
                                                    required: 'Debe seleccionar un rol'
                                                })}
                                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <label
                                                htmlFor={`role-${role.id}`}
                                                className="ml-2 text-sm text-gray-700"
                                            >
                                                {role.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {methods.formState.errors.role && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {methods.formState.errors.role.message}
                                    </p>
                                )}
                            </div>

                            {error && <div className="bg-red-400/20 px-4 py-2 text-rose-800">
                                {error}
                            </div>}
                            {issuccess && <div className="bg-green-400/20 px-4 py-2 text-green-600">
                                New user add successfull
                            </div>}
                            {
                                isLoading && <div>Loading </div>
                            }
                        </form>
                    </FormProvider>

                </div>
            </ScrollShadow>

        );
    };

    const { role: dataRole, setRole, store, setStore } = useFilter()

    console.log(dataRole)

    const FilterRole = () => {

        const handleSizeChange = (event: any) => {
            setRole(event.target.value);
            setPage(1);
        };

        return (
            <>
                {rolesOptions.map((role) => (
                    <div key={role.id} className="flex items-center">
                        <input
                            id={`role-${role.id}`}
                            type="radio"
                            value={role.id}
                            onChange={handleSizeChange}
                            checked={dataRole === role.id}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                            htmlFor={`role-${role.id}`}
                            className="ml-2 text-sm text-gray-700"
                        >
                            {role.label}
                        </label>
                    </div>
                ))}
            </>
        )

    }

    const [input, setInput] = useState('');

    const FilterStore = () => {
        const [inputFilter, setInputFilter] = useState(input);

        const handlefilter = () => {
            if (inputFilter) {
                setStore(inputFilter);
                setInput(inputFilter);
            }
            setPage(1);

        }

        return <div className="my-2 md:w-96 gap-3 md:gap-10 flex flex-col md:flex-row justify-between">
            <input type='text' value={inputFilter} onChange={(e) => setInputFilter(e.target.value)} className="w-full" />
            <Button
                onPress={handlefilter}
                color="danger"
            >
                Apli <FaFilter />
            </Button>
        </div>
    }

    // setStore(event.target.value)
    const Content = useMemo(() => {
        return (
            <div className="flex flex-col gap-2">
                <div className="flex w-full flex-wrap justify-between gap-3 items-start ">
                    <Input
                        size="lg"
                        className="w-full basis-60 border-none  sm:max-w-[44%]"
                        color="default"
                        placeholder="Search User"
                        startContent={<SearchIcon />}
                        value={filterValueUser}
                        //onClear={() => onClear()}
                        onValueChange={onSearchChangeUser}
                    />
                    <div className="md:mx-4 mx-2 text-sm flex gap-2">
                        <DropdownComponent
                            variant="ghost"
                            size="md"
                            className=" text-xs md:px-2  text-teal-700"
                            endContent={<FiFilter />} text={"FILTER"}>

                            <DropdownSection hideSelectedIcon={true} showDivider title="Actions">
                                <DropdownItem
                                    key="role"
                                    isReadOnly={true}
                                    description="Filter for role"
                                >
                                    Find Role
                                    <div className="my-2">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <FilterRole />
                                        </div>

                                    </div>
                                </DropdownItem>
                                <DropdownItem
                                    key="store"
                                    isReadOnly={true}
                                    description="filter for store"
                                    className=""
                                >
                                    Select Store
                                    <FilterStore />
                                </DropdownItem>

                            </DropdownSection>
                            <DropdownSection title="Danger zone">
                                <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    description="Permanently delete the file"
                                    shortcut="⌘⇧D"
                                    onPress={() => {
                                        setRole('');
                                        setStore('');
                                    }}
                                    startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
                                >
                                    Delete filter
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownComponent>

                        <Modal_Component
                            component={
                                <CreateUserModal />
                            }
                            //  isAlert="yes"
                            title={"Add User"}
                            size="lg"
                            onActionChange={(closeModal) => createUser(closeModal)}
                            className=""
                            scroll="outside"
                        >
                            <Button onPress={(e: any) => e.preventDefault()} variant="solid" size="md" className="" endContent={<FaPlus />} color="danger">Add User</Button>
                        </Modal_Component>
                    </div>
                </div>
                <div className="flex w-full mt-5 justify-start gap-3">
                    {filterValueUser && <div className="flex justify-center animate-appearance-in border px-3 rounded-2xl  items-center">
                        <p className="font-bold">User:</p>
                        <p className="bg-gradient-to-t flex gap-2 items-center from-slate-100 to-slate-200 rounded-2xl ml-2 py-1 px-2" > {filterValueUser}
                            <span onClick={onClear} className="cursor-pointer transition-all duration-300 hover:bg-rose-300 rounded-full p-1">
                                <FaCircleXmark />
                            </span>
                        </p>
                    </div>
                    }
                    {dataRole ? <div className="flex border animate-appearance-in px-3 rounded-2xl justify-center items-center">

                        <p className="font-bold">Role: </p>
                        <p className="bg-gradient-to-t flex gap-2 items-center from-slate-100 to-slate-200 rounded-2xl ml-2 py-1 px-2">
                            {rolesOptions.find(e => e.id == dataRole)?.label}
                            <span onClick={() => setRole('')} className="cursor-pointer transition-all duration-300 hover:bg-rose-300 rounded-full p-1">
                                <FaCircleXmark />
                            </span>
                        </p>{" "}
                    </div> : <span></span>}

                    {store ? <div className="flex border animate-appearance-in px-3 rounded-2xl justify-center items-center">

                        <p className="font-bold">Store: </p>
                        <p className="bg-gradient-to-t flex gap-2 items-center from-slate-100 to-slate-200 rounded-2xl ml-2 py-1 px-2">
                            {store}
                            <span onClick={() => setStore('')} className="cursor-pointer transition-all duration-300 hover:bg-rose-300 rounded-full p-1">
                                <FaCircleXmark />
                            </span>
                        </p>{" "}
                    </div> : <span></span>}


                    {(dataRole || store || filterValueUser) ?
                        <div onClick={() => {
                            onClear();
                            setRole('');
                            setStore('');
                        }} className="text-2xl animate-appearance-in flex justify-center items-center cursor-pointer p-2 hover:scale-110  ml-3 text-red-500">
                            <DeleteIcon /> <span className="text-base font-bold ml-2">Clear</span>
                        </div>
                        : ''
                    }
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Total {datos.length} users
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent border-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValueUser,
        store,
        dataRole,
        onSearchChangeUser,
        onRowsPerPageChange,
        datos.length,
        hasSearchFilter,
    ]);
    return Content;
};

export default TopContentUser;