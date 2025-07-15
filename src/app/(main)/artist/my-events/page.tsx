'use server'
import { Clock, Users, Sparkles, Award } from "lucide-react";
import EventCard from "@/components/ui/EventCard";
import { apiCall } from "@/app/callApi.server";
import { FindingArtistEventsListInterface } from "@/lib/interfaces/events/FindingArtistEvent.interface";

const MyEvents = async ({ searchParams }: { searchParams: Promise<{ page: number }> }) => {
    const { page } = await searchParams
    const PATH = process.env.NEXT_PUBLIC_FINDING_ARTIST_EVENTS
    const activeTab = "available"

    const events: FindingArtistEventsListInterface = await apiCall(`${PATH}?page${page}`)

    const tabs = [
        { id: "available", label: "Available", icon: Sparkles, color: "from-blue-500 to-cyan-500", },
        { id: "applied", label: "Applied", icon: Clock, color: "from-yellow-500 to-orange-500", },
        { id: "assigned", label: "Assigned", icon: Award, color: "from-green-500 to-emerald-500", }
    ];

    const EmptyState = ({ title, description }: { title: string; description: string }) => (
        <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-500 max-w-md mx-auto">{description}</p>
        </div>
    );

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header with animation */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold bg-background-secondary bg-clip-text text-transparent mb-4">
                        🎭 My Events
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover amazing events, track your applications, and manage your assignments
                    </p>
                </div>

                {/* Enhanced Tab Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="flex bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/20">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    // onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab.id
                                        ? `text-white bg-gradient-to-r ${tab.color} shadow-lg transform scale-105`
                                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{tab.label}</span>
                                    {/* {tab.count > 0 && (
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${activeTab === tab.id ? "bg-white/20" : "bg-gray-200 text-gray-700"
                                            }`}>
                                            {tab.count}
                                        </span>
                                    )} */}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Area */}
                <div className="relative">
                    {/* Tab Content */}
                    {activeTab === "available" && (
                        <div className="animate-fade-in">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex items-center gap-2 px-4 py-2 bg-background-secondary/20 text-background-secondary rounded-full">
                                    <Sparkles className="w-5 h-5" />
                                    <span className="font-semibold">Available Events</span>
                                </div>
                                <div className="h-px bg-gradient-to-r from-blue-200 to-transparent flex-1"></div>
                            </div>

                            {
                                events.data.length === 0 ? (
                                    <EmptyState
                                        title="No Events Available"
                                        description="Check back later for exciting new events to apply for!"
                                    />
                                ) :
                                    (
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                            {events.data.map((event, index) => (
                                                <div
                                                    key={event.id}
                                                    className="animate-fade-in-up"
                                                    style={{ animationDelay: `${index * 0.1}s` }}
                                                >
                                                    <EventCard event={event} showApply />
                                                </div>
                                            ))}
                                        </div>
                                    )
                            }
                        </div>
                    )}

                    {/* {activeTab === "assigned" && (
                        <div className="animate-fade-in">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                                    <Award className="w-5 h-5" />
                                    <span className="font-semibold">Assigned Events</span>
                                </div>
                                <div className="h-px bg-gradient-to-r from-green-200 to-transparent flex-1"></div>
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
        </section>
    );
};

export default MyEvents;