import { ArrowBack } from "@/components/icons/Icon";

const CreateEvent = () => {
    return (
        <section>
            <div className="wraperDiv py-4">
                <div className="flex items-center gap-3">
                    <button>
                        <ArrowBack />
                    </button>
                    <h1 className="text-3xl font-semibold text-dark-blue-gray">
                        Create a New Event
                    </h1>
                </div>
                <div>
                    
                </div>
            </div>
        </section>
    )
}

export default CreateEvent;