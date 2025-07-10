'use client';

import { Controller, useForm, useWatch } from 'react-hook-form';
import { UploadCloud, X } from 'lucide-react';
import { apiRequest } from '@/utils/apiHelper';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Venues } from '@/lib/interfaces/venue_owner/allVenueList.interface';
import { SelectVenueDropdown } from '@/components/common/events/SelectVenue';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


type EventFormValues = {
    evenetName: string;
    description: string;
    maxTickets: number;
    ticketPrice: number;
    startDate: string;
    endDate: string;
    isFree: boolean;
    images: FileList;
    venueId: string;
    proposal: string
};

const CreateEvent = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm<EventFormValues>();

    const images = watch('images');
    const isFreeWatch = watch('isFree');
    const router = useRouter();
    const [venues, setVenues] = useState<Venues[]>([]);
    const fetchVenues = async () => {
        try {
            const res = await apiRequest('get', '/users/get-all-venues');
            if (res?.data?.success) {
                setVenues(res.data.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch venues:', error);
        }
    };
    useEffect(() => {
        fetchVenues();
    }, []);

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

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-') // replace spaces/specials with -
            .replace(/^-+|-+$/g, ''); // trim dashes
    };

    const onSubmit = async (data: EventFormValues) => {
        const formData = new FormData();
        formData.append('slug', generateSlug(data.evenetName));
        formData.append('evenetName', data.evenetName);
        formData.append('description', data.description);
        formData.append('maxTickets', String(data.maxTickets));
        formData.append('ticketPrice', String(isFreeWatch ? 0 : data.ticketPrice));
        formData.append('startDate', data.startDate);
        formData.append('endDate', data.endDate);
        formData.append('isFree', String(data.isFree));
        formData.append('venueId', data.venueId);
        if (data.images && data.images.length > 0) {
            Array.from(data.images).forEach((img) => {
                formData.append('images', img); // backend must handle array uploads
            });
        }

        try {
            const PATH = `${process.env.NEXT_PUBLIC_CREATE_EVNE}`;
            const res = await apiRequest('post', PATH, formData);
            if (res.data.success) {
                router.push('/');
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Event</h1>
                    <p className="text-gray-600">List your event under one of your venues</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded shadow-lg">
                    <SelectVenueDropdown
                        control={control}
                        setValue={setValue}
                        register={register}
                        errors={errors}
                    />

                    {/* Event Name */}
                    <div>
                        <label className="block font-medium mb-1">Event Name</label>
                        <input
                            type="text"
                            placeholder='Enter the name for your event...'
                            {...register('evenetName', { required: 'Event name is required' })}
                            className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                        />
                        {errors.evenetName && <p className="text-red-500 text-sm">{errors.evenetName.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium mb-1">Description</label>
                        <textarea
                            placeholder='Give a breif description about this event'
                            {...register('description', { required: 'Description is required' })}
                            className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                            rows={5}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    {/* Proposal */}
                    <div>
                        <label className="block font-medium mb-1">Proposal</label>
                        <textarea
                            placeholder='Write a Proposal, it will help to get approve from the venue owner'
                            {...register('proposal', { required: 'Description is required' })}
                            className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                            rows={5}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block font-medium mb-2">Event Banner</label>
                        <Controller
                            name="images"
                            control={control}
                            rules={{ required: 'Image is required' }}
                            render={({ field }) => (
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(e) => field.onChange(e.target.files)}
                                        className="hidden"
                                        id="images-upload"
                                    />
                                    <label htmlFor="images-upload" className="cursor-pointer">
                                        <UploadCloud className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                                        <p className="text-gray-600">Click to upload images</p>
                                        <p className="text-sm text-gray-500 mt-1">PNG, JPG, JPEG up to 10MB each</p>
                                    </label>
                                </div>
                            )}
                        />
                        {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
                        {images && images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
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

                    {/* Date & Time */}
                    <div className="flex gap-4">
                        <div className="flex-1 w-full">
                            <label className="block font-medium mb-1">Start Date</label>
                            <Controller
                                name="startDate"
                                control={control}
                                rules={{ required: 'Start date is required' }}
                                render={({ field }) => (
                                    <DatePicker
                                        selected={field.value ? new Date(field.value) : null}
                                        onChange={(date) => field.onChange(date?.toISOString())}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        placeholderText="Select start date and time"
                                        className="w-sm outline-none border rounded px-3 py-2"
                                    />
                                )}
                            />
                            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}

                        </div>
                        <div className="flex-1">
                            <label className="block font-medium mb-1">End Date</label>
                            <Controller
                                name="endDate"
                                control={control}
                                rules={{ required: 'End date is required' }}
                                render={({ field }) => (
                                    <DatePicker
                                        selected={field.value ? new Date(field.value) : null}
                                        onChange={(date) => field.onChange(date?.toISOString())}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        placeholderText="Select start date and time"
                                        className="w-sm outline-none border rounded px-3 py-2"
                                    />
                                )}
                            />
                            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}

                        </div>
                    </div>

                    {/* Is Free + Ticket Price + Max Tickets */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register('isFree')}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setValue('isFree', checked);
                                if (checked) setValue('ticketPrice', 0);
                            }}
                        />
                        <label className="font-medium">This is a free event</label>
                    </div>

                    <div className="flex gap-4">
                        {!isFreeWatch && (
                            <div className="w-full">
                                <label className="block font-medium mb-1">Ticket Price (USD)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register('ticketPrice', { required: 'Ticket price is required', min: 0 })}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.ticketPrice && <p className="text-red-500 text-sm">{errors.ticketPrice.message}</p>}
                            </div>
                        )}
                        <div className="w-full">
                            <label className="block font-medium mb-1">Max Tickets</label>
                            <input
                                type="number"
                                {...register('maxTickets', { required: 'Max tickets are required', min: 1 })}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.maxTickets && <p className="text-red-500 text-sm">{errors.maxTickets.message}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 w-full flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-fit bg-background-secondary text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Submitting...
                                </div>
                            ) : (
                                'Create Event'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CreateEvent;
