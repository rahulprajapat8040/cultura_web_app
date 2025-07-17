import { DropDownIcon, LocationIcon, SearchIcon } from "../icons/Icon";

const EventSearchInput = () => {
    return (
        <div className="bg-background text-dark-gray h-14 w-2xl rounded-xl px-3 flex items-center gap-3">
            <SearchIcon />
            <input
                type="text"
                placeholder="Search Events, Categories, Location..."
                className="h-full outline-none w-full font-light"
            />
            <div className="flex items-center gap-10 border-l h-full ps-2 cursor-pointer">
                <div className="flex items-center gap-2">
                    <LocationIcon />
                    <span>
                        Mumbai
                    </span>
                </div>
                <DropDownIcon />
            </div>
        </div>
    )
}

export default EventSearchInput;