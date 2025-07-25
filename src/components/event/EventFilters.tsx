'use client'

import { Category } from '@/lib/interfaces/HomeData.interface';
import { apiRequest } from '@/utils/apiHelper';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const dateOptions = ['today', 'tomorrow', 'this_week', 'weekend'];

const EventFilters = () => {
    const router = useRouter();
    const [filter, setFilter] = useState<{
        isFree?: boolean;
        categoryId?: string;
    }>({});
    const [dateFilter, setDateFilter] = useState<string | undefined>();
    const [categories, setCategories] = useState<Category[]>([])


    const navigateWithFilters = (updated: {
        isFree?: boolean;
        categoryId?: string;
        dateFilter?: string;
    }) => {
        const searchParams = new URLSearchParams();

        if (updated.isFree !== undefined) searchParams.set('isFree', String(updated.isFree));;
        if (updated.categoryId) searchParams.set('categoryId', updated.categoryId);
        if (updated.dateFilter) searchParams.set('dateFilter', updated.dateFilter);

        router.push(`/events?${searchParams.toString()}`);
    };


    const handleFetchCategories = async () => {
        const PATH = `${process.env.NEXT_PUBLIC_FETCH_CATEGORIES}?limit=100`
        const res = await apiRequest("get", PATH)
        if (res.data.success) {
            setCategories(res.data.data.data)
        }
    }

    useEffect(() => {
        handleFetchCategories()
    }, [])

    // Handle Free/Paid
    const handlePriceChange = (type: 'free' | 'paid') => {
        const isFree = type === 'free';
        const newVal = filter.isFree === isFree ? undefined : isFree;
        setFilter((prev) => ({ ...prev, isFree: newVal }));
        navigateWithFilters({ ...filter, isFree: newVal, dateFilter });
    };

    // Handle date selection (single selection)
    const handleDateChange = (value: string) => {
        const newVal = dateFilter === value ? undefined : value;
        setDateFilter(newVal);
        navigateWithFilters({ ...filter, dateFilter: value });
    };

    // Handle category selection (single)
    const handleCategoryChange = (val: string) => {
        const newVal = filter.categoryId === val ? undefined : val;
        setFilter((prev) => ({ ...prev, categoryId: newVal }));
        navigateWithFilters({ ...filter, categoryId: newVal, dateFilter });
    };

    return (
        <div className="space-y-6">
            {/* Price Filter */}
            <div>
                <h5 className="text-2xl font-medium mb-2">Price</h5>
                <div className="flex flex-col gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={filter.isFree === true}
                            onChange={() => handlePriceChange('free')}
                        />
                        Free
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={filter.isFree === false}
                            onChange={() => handlePriceChange('paid')}
                        />
                        Paid
                    </label>
                </div>
            </div>

            {/* Date Filter */}
            <div>
                <h5 className="text-2xl font-medium mb-2">Date</h5>
                <div className="flex flex-col gap-4">
                    {dateOptions.map((val) => (
                        <label key={val} className="flex items-center gap-2 capitalize">
                            <input
                                type="checkbox"
                                checked={dateFilter === val}
                                onChange={() => handleDateChange(val)}
                            />
                            {val === 'this_week'
                                ? 'This Week'
                                : val === 'weekend'
                                    ? 'This Weekend'
                                    : val === 'custom'
                                        ? 'Pick a Date'
                                        : val}
                        </label>
                    ))}
                </div>
            </div>

            {/* Category Filter */}
            <div>
                <h5 className="text-2xl font-medium mb-2">Category</h5>
                <div className="flex flex-col gap-4">
                    {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center gap-2 capitalize">
                            <input
                                type="checkbox"
                                checked={filter.categoryId === cat.id}
                                onChange={() => handleCategoryChange(cat.id)}
                            />
                            {cat.name}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventFilters;
