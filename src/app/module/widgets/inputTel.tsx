import { Select, SelectItem, Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Flag from 'react-world-flags';


export const PhoneInput = () => {
    const [countryCodes, setCountryCodes] = useState<{ code: string; name: string; countryCode: any }[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState(''); // Valor por defecto para Cuba

    const { register, setValue, watch, control, formState: { errors } } = useFormContext();
    const countryValue = watch('country');

    // Obtener códigos telefónicos de la API
    useEffect(() => {
        const fetchCountryCodes = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,cca2');
                const data = await response.json();

                const formattedCodes = data
                    .filter((country: any) => country.idd?.root)
                    .map((country: any) => ({
                        code: country.idd.root + (country.idd.suffixes?.[0] || ''),
                        name: country.name.common,
                        countryCode: country.cca2.toLowerCase()
                    }))
                    .sort((a: any, b: any) => a.name.localeCompare(b.name));

                setCountryCodes(formattedCodes);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching country codes:', error);
                // Datos de respaldo en caso de error
                setCountryCodes([
                    { code: '+53', name: 'Cuba', countryCode: 'cu' },
                    { code: '+1', name: 'United States', countryCode: 'us' }
                ]);
                setLoading(false);
            }
        };

        fetchCountryCodes();
    }, []);

    // Actualizar el valor del formulario cuando cambia la selección
    useEffect(() => {
        if (countryValue) {
            setSelectedCountry(countryValue);
        }
    }, [countryValue]);

    const handleCountryChange = (value: string) => {
        setSelectedCountry(value);
        setValue('country', value);
    };

    return (
        <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
            </label>

            <div className="flex ">
                {/* Selector de código de país */}
                <div className="relative flex-shrink-0 w-32">
                    <Controller
                        name={'country'} // Nombre del campo en el formulario
                        control={control}
                        rules={{
                            required: "This field is required",
                            validate: {
                                fileType: (value) => {
                                    if (!value || value.length === 0)
                                        return "La imagen es requerida";
                                },
                            },
                        }}
                        render={() => (
                            <Select
                                label="Country"
                                selectedKeys={[selectedCountry]}
                                color='default'
                                onChange={(value: any) => handleCountryChange(value.target.value)}
                                className="w-full"
                                size="sm"
                                variant="flat"
                                isLoading={loading}
                                selectorIcon={loading ? <Spinner size="sm" /> : undefined}
                                renderValue={(items: any) => {
                                    if (!items[0] || loading) {
                                        return <div>Select country</div>;
                                    }
                                    const country: any = countryCodes.find(c => c.code === items[0].key);
                                    return (
                                        <div className="flex items-center gap-2">
                                            {country && country.countryCode && (
                                                <Flag
                                                    code={country.countryCode}
                                                    className="w-5 h-5 rounded-sm"
                                                    fallback={<span>🌐</span>}
                                                />
                                            )}
                                            <span>{items[0].key}</span>
                                        </div>
                                    );
                                }}
                            >
                                {countryCodes.map((country) => (
                                    <SelectItem
                                        key={country.code}
                                        value={country.code}
                                        startContent={
                                            <Flag
                                                code={country.countryCode}
                                                className="w-6 h-6 rounded-sm"
                                                fallback={<span>🌐</span>}
                                            />
                                        }
                                        textValue={`${country.code} ${country.name}`}
                                    >
                                        <div className="flex  items-center gap-5">
                                            <span className="font-semibold">{country.code}</span>
                                            {/*   <span>{country.name}</span> */}
                                        </div>
                                    </SelectItem>
                                ))}
                            </Select>
                        )}
                    />
                </div>


                {/* Campo de número telefónico */}
                <input
                    type="tel"
                    {...register('iphone', {
                        required: 'El número es obligatorio',
                        minLength: {
                            value: 8,
                            message: 'El número no es valido'
                        },
                        maxLength: {
                            value: 8,
                            message: 'El número no es valido'
                        },
                        pattern: {
                            value: /^[0-9\s]*$/,
                            message: 'Solo se permiten números y espacios'
                        }
                    })}
                    className={`w-full px-4 py-2 border ${errors.iphone ? 'border-red-500' : 'border-gray-300'
                        } rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    placeholder="55 1234 5678"
                />
            </div>

            <div className='flex gap-5'>
                {errors.country && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.country.message}
                    </p>
                )}
                {errors.iphone && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.iphone.message}
                    </p>
                )}
            </div>
        </div>
    );
};
