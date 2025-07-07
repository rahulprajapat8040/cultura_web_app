'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { UploadCloud, MapPin, Users, DollarSign, FileText, Camera, X } from 'lucide-react';
import { apiRequest } from '@/utils/apiHelper';
import { useRouter } from 'next/navigation';

type VenueFormValues = {
    name: string;
    location: string;
    latitude: number;
    longitude: number;
    capacity: number;
    price: number;
    description: string;
    images: FileList | null;
};

const AddVenue: React.FC = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<VenueFormValues>({
        defaultValues: {
            name: '',
            location: '',
            latitude: 0,
            longitude: 0,
            capacity: 0,
            price: 0,
            description: '',
            images: null,
        }
    });

    const images = watch('images');
    const location = watch('location');
    const [isGeoLoading, setIsGeoLoading] = useState(false);
    const [geoError, setGeoError] = useState<string | null>(null);

    const handleGetCoordinates = async () => {
        if (!location || location.trim() === '') {
            setGeoError('Please enter a valid location.');
            return;
        }

        setIsGeoLoading(true);
        setGeoError(null);

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
            );
            console.log('ress is', res)
            const data = await res.json();
            if (data.length) {
                const { lat, lon } = data[0];
                setValue('latitude', parseFloat(lat));
                setValue('longitude', parseFloat(lon));
            } else {
                setGeoError('No coordinates found for this location.');
            }
        } catch (err) {
            setGeoError('Failed to fetch coordinates.');
        } finally {
            setIsGeoLoading(false);
        }
    };

    const onSubmit = async (data: VenueFormValues): Promise<void> => {
        try {
            const Base_Url = process.env.NEXT_PUBLIC_BASE_URL
            const API_END_POINT = process.env.NEXT_PUBLIC_ADD_VENUE
            const PATH = `${Base_Url}${API_END_POINT}`
            const formData = new FormData();
            (Object.entries(data) as [keyof VenueFormValues, any][]).forEach(([key, value]) => {
                if (key === 'images' && value instanceof FileList) {
                    Array.from(value).forEach((file: File) => formData.append('images', file));
                } else if (value !== null && value !== undefined) {
                    formData.append(key, String(value));
                }
            });

            const res = await apiRequest('post', PATH, data)
            if (res.data.success) {
                router.push('/venue/venues')
            }
        } catch (error) {

        }
    };

    const removeImage = (indexToRemove: number): void => {
        if (images) {
            const dt = new DataTransfer();
            Array.from(images).forEach((file, index) => {
                if (index !== indexToRemove) {
                    dt.items.add(file);
                }
            });
            setValue('images', dt.files);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Venue</h1>
                    <p className="text-gray-600">Create a stunning venue listing to attract more bookings</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-background-secondary px-8 py-6">
                        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                            <MapPin className="w-6 h-6" />
                            Venue Details
                        </h2>
                    </div>

                    <div className="p-8 space-y-6">
                        {/* Venue Name */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <FileText className="w-4 h-4" />
                                Venue Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Neon District Club"
                                className={`w-full px-4 py-3 border rounded-xl ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                {...register('name', {
                                    required: 'Venue name is required',
                                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                                })}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 flex items-center gap-1">
                                    <X className="w-4 h-4" />
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <MapPin className="w-4 h-4" />
                                Location
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Shibuya, Tokyo"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                {...register('location')}
                            />
                            <div className="flex items-center gap-4 mt-2">
                                <button
                                    type="button"
                                    onClick={handleGetCoordinates}
                                    disabled={isGeoLoading}
                                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
                                >
                                    {isGeoLoading ? 'Fetching...' : 'Get Coordinates'}
                                </button>
                                {geoError && <p className="text-sm text-red-500">{geoError}</p>}
                            </div>
                        </div>

                        {/* Coordinates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Latitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="e.g. 35.6762"
                                    className={`w-full px-4 py-3 border rounded-xl ${errors.latitude ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                    {...register('latitude', {
                                        required: 'Latitude is required',
                                        valueAsNumber: true,
                                        min: { value: -90, message: 'Latitude must be between -90 and 90' },
                                        max: { value: 90, message: 'Latitude must be between -90 and 90' }
                                    })}
                                />
                                {errors.latitude && <p className="text-sm text-red-600">{errors.latitude.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Longitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="e.g. 139.6503"
                                    className={`w-full px-4 py-3 border rounded-xl ${errors.longitude ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                    {...register('longitude', {
                                        required: 'Longitude is required',
                                        valueAsNumber: true,
                                        min: { value: -180, message: 'Longitude must be between -180 and 180' },
                                        max: { value: 180, message: 'Longitude must be between -180 and 180' }
                                    })}
                                />
                                {errors.longitude && <p className="text-sm text-red-600">{errors.longitude.message}</p>}
                            </div>
                        </div>

                        {/* Capacity, Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Users className="w-4 h-4" />
                                    Capacity
                                </label>
                                <input
                                    type="number"
                                    placeholder="e.g. 150"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    {...register('capacity', {
                                        valueAsNumber: true,
                                        min: { value: 1, message: 'Capacity must be at least 1' }
                                    })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <DollarSign className="w-4 h-4" />
                                    Price (per day in $)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="e.g. 50000"
                                    className={`w-full px-4 py-3 border rounded-xl ${errors.price ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                                    {...register('price', {
                                        required: 'Price is required',
                                        valueAsNumber: true,
                                        min: { value: 0, message: 'Price must be positive' }
                                    })}
                                />
                                {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Description</label>
                            <textarea
                                rows={4}
                                placeholder="Describe your venue..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                {...register('description')}
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Camera className="w-4 h-4" />
                                Upload Images
                                <span className="text-xs text-gray-500 font-normal">(First image is thumbnail)</span>
                            </label>
                            <Controller
                                name="images"
                                control={control}
                                render={({ field }) => (
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                                        <input
                                            type="file"
                                            multiple
                                            onChange={(e) => field.onChange(e.target.files)}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload" className="cursor-pointer">
                                            <UploadCloud className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                                            <p className="text-gray-600">Click to upload images</p>
                                            <p className="text-sm text-gray-500 mt-1">PNG, JPG, JPEG up to 10MB each</p>
                                        </label>
                                    </div>
                                )}
                            />
                            {images && images.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {Array.from(images).map((img: File, idx: number) => (
                                        <div key={idx} className="relative group">
                                            <div className="w-full h-32 overflow-hidden rounded-lg border-2 border-gray-200">
                                                <img
                                                    src={URL.createObjectURL(img)}
                                                    alt={`preview-${idx}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                            {idx === 0 && (
                                                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                                    Thumbnail
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="pt-6 w-fit">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                onClick={handleSubmit(onSubmit)}
                                className="w-full bg-background-secondary text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Submitting...
                                    </div>
                                ) : (
                                    'Create Venue Listing'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddVenue;
