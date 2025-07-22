import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import CategorySelect from "./categorySelect";
import dynamic from "next/dynamic";

const MapSelector = dynamic(() => import("../common/MapSelector"), {
    ssr: false,
});

export type EventDetailFormData = {
    title: string;
    categoryId: string;
    isOnline: boolean;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    latitude: string;
    longitude: string;
    location: string;
    description: string
};

export type EventDetailRef = {
    getData: () => EventDetailFormData;
};

type Props = {
    initialData?: EventDetailFormData;
};

const EventDetail = forwardRef<EventDetailRef, Props>(({ initialData }, ref) => {
    const [states, setStates] = useState<EventDetailFormData>(
        initialData ?? {
            title: "",
            categoryId: "",
            isOnline: false,
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
            latitude: "",
            longitude: "",
            description: "",
            location: ""
        }
    );

    useEffect(() => {
        if (initialData) {
            setStates(initialData);
        }
    }, [initialData]);

    const handleSetState = (key: string, value: any) => {
        setStates((prev) => ({ ...prev, [key]: value }));
    };

    // 👇 expose method to parent
    useImperativeHandle(ref, () => ({
        getData: () => states,
    }));

    return (
        <>
            {/* Step-1 Content */}
            <div className="space-y-6 max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <label
                        htmlFor="title"
                        className="w-full sm:w-48 text-base sm:text-lg font-semibold text-dark-blue-gray flex gap-1"
                    >
                        Event Title <span className="text-danger">*</span>
                    </label>
                    <input
                        id="title"
                        value={states.title ?? ""}
                        onChange={(e) => handleSetState("title", e.target.value)}
                        type="text"
                        placeholder="Enter the name of your event"
                        className="flex-1 border-gray-400 text-light-gray font-medium px-3 rounded-md border outline-none py-2 w-full max-w-2xl"
                    />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <label
                        htmlFor="category"
                        className="w-full sm:w-48 text-base sm:text-lg font-semibold text-dark-blue-gray flex gap-1"
                    >
                        Event Category <span className="text-danger">*</span>
                    </label>
                    <CategorySelect
                        value={states.categoryId}
                        onChange={(value) => handleSetState("categoryId", value)}
                    />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <label
                        htmlFor="isOnline"
                        className="w-full sm:w-48 text-base sm:text-lg font-semibold text-dark-blue-gray flex gap-1"
                    >
                        Event Type <span className="text-danger">*</span>
                    </label>

                    <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="eventType"
                                value="true"
                                checked={states.isOnline === true}
                                onChange={(e) => handleSetState("isOnline", e.target.value === "true")}
                            />
                            Online
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="eventType"
                                value="false"
                                checked={states.isOnline === false}
                                onChange={(e) => handleSetState("isOnline", e.target.value === "true")}
                            />
                            Offline
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Start Date */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="startDate" className="font-semibold text-dark-blue-gray">
                            Start Date <span className="text-danger">*</span>
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            value={states.startDate}
                            onChange={(e) => handleSetState("startDate", e.target.value)}
                            className="border-gray-400 text-light-gray font-medium px-3 rounded-md border outline-none py-2"
                        />
                    </div>

                    {/* Start Time */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="startTime" className="font-semibold text-dark-blue-gray">
                            Start Time <span className="text-danger">*</span>
                        </label>
                        <input
                            type="time"
                            id="startTime"
                            value={states.startTime}
                            onChange={(e) => handleSetState("startTime", e.target.value)}
                            className="border-gray-400 text-light-gray font-medium px-3 rounded-md border outline-none py-2"
                        />
                    </div>

                    {/* End Date */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="endDate" className="font-semibold text-dark-blue-gray">
                            End Date <span className="text-danger">*</span>
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            value={states.endDate}
                            onChange={(e) => handleSetState("endDate", e.target.value)}
                            className="border-gray-400 text-light-gray font-medium px-3 rounded-md border outline-none py-2"
                        />
                    </div>

                    {/* End Time */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="endTime" className="font-semibold text-dark-blue-gray">
                            End Time <span className="text-danger">*</span>
                        </label>
                        <input
                            type="time"
                            id="endTime"
                            value={states.endTime}
                            onChange={(e) => handleSetState("endTime", e.target.value)}
                            className="border-gray-400 text-light-gray font-medium px-3 rounded-md border outline-none py-2"
                        />
                    </div>
                </div>
                {
                    !states.isOnline && (
                        <MapSelector
                            onLocationSelect={(lat, lng, address) => {
                                handleSetState("latitude", lat.toString());
                                handleSetState("longitude", lng.toString());
                                handleSetState("location", address)
                            }}
                        />
                    )
                }
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    <label
                        htmlFor="description"
                        className="w-full sm:w-48 text-base sm:text-lg font-semibold text-dark-blue-gray flex gap-1"
                    >
                        Event Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                        id="description"
                        value={states.description}
                        onChange={(e) => handleSetState("description", e.target.value)}
                        placeholder="Describe what's special about your event & other important details."
                        rows={6}
                        className="flex-1 border-gray-400 text-light-gray font-medium px-3 rounded-md border outline-none py-2 w-full max-w-2xl"
                    />
                </div>
            </div>
        </>
    )
})

export default EventDetail;