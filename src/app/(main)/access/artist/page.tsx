export const dynamic = 'force-dynamic';
import { apiCall, Base_Url } from "@/app/callApi.server";
import ProfileAction from "@/components/common/artist/profile/ProfileAction";
import { ArtistInfoInterface } from "@/lib/interfaces/artist/artistInfo.interface";
import Image from "next/image";

const Artist = async ({ searchParams }: { searchParams: Promise<{ artistId: string }> }) => {
    const { artistId } = await searchParams;
    const res: ArtistInfoInterface = await apiCall(
        `${process.env.NEXT_PUBLIC_GET_ARTIST_INFO}?artistId=${artistId}`
    );
    const { artist, followers, posts, isFollowed } = res;

    return (
        <section className="min-h-screen px-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="relative bg-background-secondary text-white px-8 py-3">
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-white rounded-full blur opacity-50 group-hover:opacity-100 transition-all duration-1000"></div>
                                <Image
                                    src={`${Base_Url}/${artist.profilePhoto}`}
                                    alt={artist.fullName}
                                    width={2000}
                                    height={2000}
                                    className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-white/30 shadow-xl"
                                />
                            </div>

                            <div className="text-center lg:text-left flex-1">
                                <h1 className="text-4xl lg:text-5xl font-bold mb-2 tracking-widest text-shadow-2xl text-shadow-amber-500">
                                    {artist.fullName}
                                </h1>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4  /80 mb-6">
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium border border-white/20">
                                        {artist.gender}
                                    </span>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium border border-white/20">
                                        {new Date(artist.dob).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>

                                <div className="flex justify-center lg:justify-start gap-8">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold   mb-1">
                                            {followers.toLocaleString()}
                                        </div>
                                        <div className="text-sm  /70 font-medium tracking-wide">
                                            FOLLOWERS
                                        </div>
                                    </div>
                                    <div className="w-px bg-white/20"></div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold   mb-1">
                                            {posts.toLocaleString()}
                                        </div>
                                        <div className="text-sm  /70 font-medium tracking-wide">
                                            POSTS
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-8">
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <h3 className="text-2xl font-bold   mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-background-secondary rounded-full"></span>
                                    About
                                </h3>
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                    <p className=" /90 leading-relaxed text-lg">
                                        {artist.aboutYou || "This artist hasn't shared their story yet. Stay tuned for updates about their journey and creative process."}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                    <h4 className="text-lg font-semibold   mb-3">Profile Stats</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className=" /70">Member Since</span>
                                            <span className="font-medium">
                                                {new Date(artist.createdAt).getFullYear()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <ProfileAction
                                    artistId={res.artist.id}
                                    isFollowed={isFollowed}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Artist;