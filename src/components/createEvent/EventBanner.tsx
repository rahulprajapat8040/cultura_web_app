import { forwardRef, useImperativeHandle, useState } from "react";

export type EventBannerRef = {
    getData: () => File | null;
};

type Props = {
    initialImage?: File | null;
};

const EventBanner = forwardRef<EventBannerRef, Props>(({ initialImage }, ref) => {
    const [bannerImage, setBannerImage] = useState<File | null>(initialImage ?? null);
    const [previewURL, setPreviewURL] = useState<string | null>(
        initialImage ? URL.createObjectURL(initialImage) : null
    );
    useImperativeHandle(ref, () => ({
        getData: () => bannerImage,
    }));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBannerImage(file);
            setPreviewURL(URL.createObjectURL(file));
        }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-4">
                <label
                    htmlFor="banner"
                    className="text-base sm:text-3xl font-medium text-dark-blue-gray flex gap-1"
                >
                    Upload Image
                </label>
                <input
                    id="banner"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    onChange={handleFileChange}
                    className="flex-1 border-gray-400 text-light-gray font-medium px-3 rounded-md border outline-none py-2 w-full max-w-2xl"
                />
                <p className="text-lg text-light-gray">
                    Feature Image must be at least 1170px wide by 504px high.
                    <br />
                    Accepted formats: JPG, PNG, GIF.
                </p>
            </div>
        </div>
    );
});

EventBanner.displayName = "EventBanner";
export default EventBanner;
