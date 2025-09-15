import { Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const PhoneInput = () => {
    const [countryCodes, setCountryCodes] = useState([{ code: '+53', name: 'Cuba' }, { code: "+1", name: "EEUU" }]);
    const [loading, setLoading] = useState(true);

    const { register, formState: { errors } } = useFormContext();

    // Obtener códigos telefónicos de la API
    useEffect(() => {
        const fetchCountryCodes = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd');
                const data = await response.json();

                const formattedCodes = data
                    .filter((country: any) => country.idd?.root)
                    .map((country: any) => ({
                        code: country.idd.root + (country.idd.suffixes?.[0] || ''),
                        name: country.name.common
                    }))
                    .sort((a: any, b: any) => a.name.localeCompare(b.name));

                setCountryCodes(formattedCodes);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching country codes:', error);
                setLoading(false);
            }
        };

        fetchCountryCodes();
    }, []);

    return (
        <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
            </label>

            <div className="flex ">
                {/* Selector de código de país */}
                <div className="relative flex-shrink-0 w-32">
                    {loading ? (
                        <div className="h-full flex items-center justify-center bg-gray-50 rounded-l-lg">
                            <Spinner
                                labelColor="danger"
                                color="danger"
                            />
                        </div>
                    ) : (
                        <>
                            <select
                                {...register('country', { required: true })}
                                className="w-full h-full py-2 pl-3 pr-10 text-sm bg-gray-50 border-none rounded-l-lg"
                            >
                                {countryCodes.map((country: any) => (
                                    <option key={country.code} value={country.code}>
                                        ({country.code}) {country.name}
                                    </option>
                                ))}
                            </select>

                        </>
                    )}
                </div>

                {/* Campo de número telefónico */}
                <input
                    type="tel"
                    {...register('iphone', {
                        required: 'El número es obligatorio',
                        minLength: {
                            value: 6,
                            message: 'El número debe tener al menos 6 dígitos'
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

            {errors.iphone && (
                <p className="mt-1 text-sm text-red-600">
                    {errors.iphone.message}
                </p>
            )}
        </div>
    );
};
