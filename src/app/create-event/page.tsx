'use client';
import EventDetail, { EventDetailFormData, EventDetailRef } from "@/components/createEvent/EventDetail";
import { ArrowBack } from "@/components/icons/Icon";
import { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import EventBanner, { EventBannerRef } from "@/components/createEvent/EventBanner";
import EventTicketing, { EventTicketingFormData, EventTicketingRef } from "@/components/createEvent/EventTicketing";
import ReviewEvent from "@/components/createEvent/ReviewEvent";
import { apiRequest } from "@/utils/apiHelper";
import { useRouter } from "next/navigation";

const steps = ["Edit", "Banner", "Ticketing", "Review"];
export type CreateEventState = {
    eventDetail: EventDetailFormData | {};
    bannerImage: File | null;
    eventTicketingData: EventTicketingFormData
};
const CreateEvent = () => {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1);

    const [data, setData] = useState<CreateEventState>({
        eventDetail: {},
        bannerImage: null,
        eventTicketingData: {
            isFree: false,
            eventTickets: [{ name: "", price: 0 }]
        },
    });

    const eventDetailRef = useRef<EventDetailRef>(null);
    const eventBannerRef = useRef<EventBannerRef>(null);
    const eventTicketingRef = useRef<EventTicketingRef>(null);

    const handleNextStep = () => {
        if (currentStep === 1 && eventDetailRef.current) {
            const eventDetailData = eventDetailRef.current.getData();
            setData((prev) => ({
                ...prev,
                eventDetail: eventDetailData,
            }));
        } else if (currentStep === 2 && eventBannerRef.current) {
            const eventBannerData = eventBannerRef.current.getData();
            setData((prev) => ({
                ...prev,
                bannerImage: eventBannerData,
            }));
        }
        else if (currentStep === 3 && eventTicketingRef.current) {
            const eventTicketingData = eventTicketingRef.current.getData();
            setData((prev) => ({
                ...prev,
                eventTicketingData: eventTicketingData,
            }));
        }

        if (currentStep !== steps.length) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleStepBack = () => {
        if (currentStep !== 1) {
            setCurrentStep((prev) => prev - 1);
        }
    }

    const handlePostData = async () => {
        const PATH = `${process.env.NEXT_PUBLIC_CREATE_EVENT}`;
        const formData = new FormData();

        // Append bannerImage (if exists)
        if (data.bannerImage) {
            formData.append("bannerImage", data.bannerImage);
        }

        // Append eventDetail fields
        if (data.eventDetail && typeof data.eventDetail === 'object') {
            Object.entries(data.eventDetail).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            });
        }

        // Append ticketing data
        if (data.eventTicketingData) {
            formData.append("isFree", String(data.eventTicketingData.isFree));

            // Append tickets as JSON string
            formData.append("eventTickets", JSON.stringify(data.eventTicketingData.eventTickets));
        }

        // Send the formData via fetch or your custom API wrapper
        try {
            const res = await apiRequest("post", PATH, formData)
            if (res.data.success) {
                router.push("/");
            } else {
                console.error("Upload failed", res);
            }
        } catch (error) {
            console.error("Error uploading event", error);
        }
    };


    const stepComponent = (() => {
        switch (currentStep) {
            case 1:
                return <EventDetail ref={eventDetailRef} initialData={data.eventDetail as EventDetailFormData} />;
            case 2:
                return <EventBanner ref={eventBannerRef} initialImage={data.bannerImage} />;
            case 3:
                return <EventTicketing ref={eventTicketingRef} initialData={data.eventTicketingData as EventTicketingFormData} />
            case 4:
                return <ReviewEvent data={data as CreateEventState} />
            default:
                return null;
        }
    })();

    const stepButton = (() => {
        switch (currentStep) {
            case 4:
                return { text: "Publish Events", action: handlePostData };
            default:
                return { text: "Save & Continue", action: handleNextStep };
        }
    })();

    return (
        <section>
            <div className="wraperDiv py-6 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <button>
                        <ArrowBack />
                    </button>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-dark-blue-gray">
                        Create a New Event
                    </h1>
                </div>

                {/* Stepper */}
                <div className="relative flex items-center justify-between mb-10">
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200 z-0" />

                    <div
                        className="absolute top-1/2 h-[2px] bg-red-700 z-30 transition-all duration-300"
                        style={{
                            left: `${(0 / (steps.length * 2)) * 100}%`,
                            width: `${(currentStep / (steps.length - 1)) * (100 - (100 / steps.length))}%`,
                        }}
                    />

                    {steps.map((label, index) => {
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;

                        return (
                            <div key={label} className="relative z-20 flex flex-col items-center flex-1">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-4 h-4 rounded-full border-2 ${isCompleted
                                            ? "bg-dark-blue-gray border-dark-blue-gray"
                                            : isActive
                                                ? "bg-white border-dark-blue-gray"
                                                : "bg-white border-gray-300"
                                            }`}
                                    />
                                    <span
                                        className={`text-xs sm:text-sm mt-2 text-center ${isActive || isCompleted
                                            ? "text-dark-blue-gray font-medium"
                                            : "text-gray-400"
                                            }`}
                                    >
                                        {label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Step Content */}
                {stepComponent}
                <div className="w-full flex justify-end gap-3 py-3 mt-4">
                    {
                        currentStep !== 1 && (
                            <button
                                onClick={handleStepBack}
                                className="bg-yellow py-3 px-7 flex items-center gap-2 rounded-md text-foreground font-medium"
                            >
                                <ArrowLeft />
                                Go Back
                            </button>
                        )
                    }
                    <button
                        onClick={stepButton.action}
                        className="bg-dark-blue-gray py-3 px-7 rounded-md text-background font-medium"
                    >
                        {stepButton.text}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CreateEvent;
