// components/CategorySelect.tsx
import { CategoryListData, CategoryListInterface, PageInfo } from "@/lib/interfaces/categoryList.interface";
import { apiRequest } from "@/utils/apiHelper";
import { Helper } from "@/utils/helper/helper";
import React, { useEffect, useState } from "react";

type CategorySelectProps = {
    value: string;
    onChange: (value: string) => void;
};

const CategorySelect: React.FC<CategorySelectProps> = React.memo(({ value, onChange }) => {
    const [categoryData, setCategoryData] = useState<CategoryListData[]>([])
    const [pageInfo, setPageInfo] = useState<PageInfo>()

    const handleFetchData = async () => {
        try {
            const PATH = `${process.env.NEXT_PUBLIC_FETCH_CATEGORIES}`
            const res = await apiRequest("get", PATH)
            if (res.data.success) {
                const data: CategoryListInterface = res.data.data
                setCategoryData(data.data)
                setPageInfo(data.pageInfo)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        handleFetchData()
    }, [])

    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border-gray-400 text-light-gray font-medium px-3 rounded-md border outline-none py-2.5 w-full max-w-2xl"
        >
            <option value="">Select a category</option>
            {categoryData.map((category) => (
                <option
                    key={category.id}
                    value={category.id}
                    className=" capitalize"
                >
                    {Helper.toTitleCase(category.name)}
                </option>
            ))}
        </select>
    );
});

export default CategorySelect;