'use client'

import { useState } from "react";
import { ArrowBack, CloseIcon } from "@/components/icons/Icon";
import userInterestsData from '@/lib/data/userInterests.json';

const ShareInterest = () => {
    const [selectedInterests, setSelectedInterests] = useState<Record<string, string[]>>({});
    console.log(selectedInterests)

    const toggleInterest = (category: string, interest: string) => {
        setSelectedInterests((prev) => {
            const current = prev[category] || [];
            const isSelected = current.includes(interest);

            const updatedCategoryInterests = isSelected
                ? current.filter(i => i !== interest) // remove
                : [...current, interest]; // add

            return {
                ...prev,
                [category]: updatedCategoryInterests
            };
        });
    };

    const isSelected = (category: string, interest: string) => {
        return selectedInterests[category]?.includes(interest);
    };

    return (
        <section>
            <div className="wraperDiv py-3">
                <div className="flex items-start gap-4 py-4">
                    <button className="mt-1">
                        <ArrowBack />
                    </button>
                    <div className="space-y-3 text-dark-blue-gray">
                        <h1 className="text-3xl font-semibold">
                            Share your interests with us
                        </h1>
                        <p className="text-lg">
                            Choose your interests below to get personalized event suggestions.
                        </p>
                    </div>
                </div>

                <div className="space-y-6 mt-6">
                    {userInterestsData.map((item, index) => (
                        <div key={index}>
                            <h2 className="text-2xl font-bold capitalize mb-2">{item.key}</h2>
                            <ul className="flex flex-wrap pb-12 border-b border-gray-300 items-center gap-3 capitalize text-gray-700">
                                {item.value.map((interest, idx) => (
                                    <li
                                        key={idx}
                                        onClick={() => toggleInterest(item.key, interest)}
                                        className={`border px-4 py-1 cursor-pointer rounded-full ${isSelected(item.key, interest)
                                            ? "bg-yellow text-foreground border-foreground flex items-center gap-1 font-medium"
                                            : "border-gray-300"
                                            }`}
                                    >
                                        {interest}
                                        {
                                            isSelected(item.key, interest) ? <CloseIcon size={20} /> : null
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end items-center h-32">
                    <button className="bg-dark-blue-gray h-fit text-background py-3 px-5 rounded-md font-medium">
                        Save my Interests
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ShareInterest;
