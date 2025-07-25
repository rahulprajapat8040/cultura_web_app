import EventSearchInput from "@/components/common/EventSearchInput";
import EventGridCard from "@/components/event/EvendGridCard";
import EventFilters from "@/components/event/EventFilters";
import { apiCall } from "../apiCall";
import qs from 'qs'
import { EventListInterface } from "@/lib/interfaces/EventList.interface";
import Link from "next/link";

interface SearchParamsProp {
    categoryId: string
    page: string
    isFree: string
    dateFilter: string
}

const Events = async ({
    searchParams,
}: {
    searchParams: Promise<SearchParamsProp>;
}) => {
    const { page, categoryId, isFree, dateFilter } = await searchParams

    const queryString = qs.stringify({
        page: page || 1,
        filter: {
            categoryId,
            isFree: isFree,
        },
    });
    const eventsData: EventListInterface = await apiCall(
        `${process.env.NEXT_PUBLIC_FETCH_ALL_EVENTS}?${queryString}&limit=10`,
    )

    return (
        <>
            <section className="bg-gradient-to-br h-96 from-dark-blue-gray to-dark-blue-gray/90 text-background">
                <div className="max-w-6xl mx-auto text-center flex flex-col justify-center items-center h-full w-full gap-10">
                    <h1 className="text-5xl font-semibold">
                        Explore a world of events. Find what excites you!
                    </h1>
                    <EventSearchInput />
                </div>
            </section>
            <div className="flex max-w-7xl mx-auto gap-6 px-4 py-6">
                {/* Sticky Sidebar */}
                <aside className="w-64 sticky top-24 self-start h-fit">
                    <EventFilters />
                </aside>
                <section className="flex-1">
                    {
                        eventsData.data.length ? (
                            <div className="grid grid-cols-2 place-items-center gap-6 space-y-3">
                                {eventsData.data.map((item, idx) => {
                                    return (
                                        <Link
                                            key={idx}
                                            href={`/event-detail?eventId=${item.id}`}
                                        >
                                            <EventGridCard eventCardData={item} />
                                        </Link>
                                    )
                                })
                                }
                            </div>
                        ) : (
                            <>
                                <div className="w-full h-full flex flex-col items-center justify-center text-center py-10 text-dark-gray">
                                    <p className="text-xl font-medium">No events found</p>
                                    <p className="text-sm mt-1">Try adjusting your filters or search terms.</p>
                                </div>
                            </>
                        )
                    }
                </section >
            </div >
            <div className="flex items-center justify-end gap-4 mt-6 py-3">
                {
                    eventsData.pageInfo.totalPage > 1 && (
                        <>
                            {eventsData.pageInfo.currentPage > 1 && (
                                <Link
                                    href={`/events?page=${eventsData.pageInfo.currentPage - 1}`}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-dark-blue-gray font-medium shadow-sm"
                                >
                                    ← Prev
                                </Link>
                            )}

                            <span className="px-4 py-2 text-sm text-gray-600">
                                Page {eventsData.pageInfo.currentPage} of {eventsData.pageInfo.totalPage}
                            </span>

                            {eventsData.pageInfo.currentPage < eventsData.pageInfo.totalPage && (
                                <Link
                                    href={`/events?page=${eventsData.pageInfo.currentPage + 1}`}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-dark-blue-gray font-medium shadow-sm"
                                >
                                    Next →
                                </Link>
                            )}
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Events;