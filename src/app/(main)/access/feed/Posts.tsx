'use client'
import React, { useEffect, useState } from 'react';
import { PostsInterface } from '@/lib/interfaces/posts/postList.interface';
import { apiRequest } from '@/utils/apiHelper';
import { PageInfo } from '@/lib/interfaces/events/allEventsList.interface';
import useScroll from '@/hooks/useScroll';
import MediaCarousel from '@/components/common/artist/posts/MediaCarousel';
import Image from 'next/image';
import { Helper } from '@/utils/helper/helper';
import PostCard from '@/components/common/artist/posts/PostCard';
import PostAction from '@/components/common/artist/posts/PostAction';
import Link from 'next/link';

const Posts = ({ initialData }: { initialData: PostsInterface[] }) => {
    const [viewedPostIds, setViewedPostIds] = useState<Set<string>>(new Set());
    const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you');
    const [page, setPage] = useState(2);
    const [states, setStates] = useState<{
        pageInfo: PageInfo; data: PostsInterface[];
    }>({
        pageInfo: {
            total: 0,
            currentPage: 1,
            totalPage: 1
        },
        data: initialData
    });
    const hasMore = page < (states.pageInfo.totalPage)

    const getPosts = async () => {
        const res = await apiRequest('get', `${process.env.NEXT_PUBLIC_GET_FOR_YOU_POSTS}?page=${page}`);
        if (res.data.success) {
            const { data, pageInfo } = res.data.data;
            setStates(prev => ({
                pageInfo,
                data: page === 1 ? data : [...prev.data, ...data]
            }));
        }
    };

    useEffect(() => {
        getPosts();
    }, [page]);

    const handleView = async (postId: string) => {
        if (viewedPostIds.has(postId)) return;

        try {
            await apiRequest('post', `/users/post-view-increase`, { postId });
            setViewedPostIds(prev => new Set(prev).add(postId));
        } catch (error) {
            console.error('Failed to register post view', error);
        }
    };

    const loadRef = useScroll({
        hasMore,
        onLoadMore: () => setPage(prev => prev + 1)
    })

    return (
        <section className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 px-4">
            <div className="max-w-3xl relative mx-auto border">
                {/* Tabs */}
                <div className="sticky top-0 z-20 flex items-center justify-center w-full h-14 bg-white/80 border-b ">                    <button
                    onClick={() => setActiveTab('for-you')}
                    className={`w-full h-fit font-medium transition ${activeTab === 'for-you'
                        ? 'bg-text-background-secondary underline underline-offset-8 decoration-[3px]'
                        : 'text-gray-700'
                        }`}
                >
                    For You
                </button>
                    <button
                        onClick={() => setActiveTab('following')}
                        className={`h-fit w-full font-medium transition ${activeTab === 'following'
                            ? 'bg-text-background-secondary underline underline-offset-8 decoration-[3px]'
                            : ' text-gray-700'
                            }`}
                    >
                        Following
                    </button>
                </div>

                {/* Posts */}
                {states.data.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">No posts yet.</p>
                ) : (
                    states.data.map((post) => {
                        return (
                            <PostCard
                                key={post.id}
                                onView={() => handleView(post.id)}
                            >
                                <div
                                    className="bg-white shadow-sm border-t border-gray-200 p-5 hover:shadow-md transition"
                                >
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-3">
                                        {/* Uncomment when using actual avatar */}
                                        <Link
                                            href={`/access/artist?artistId=${post.authorId}`}
                                        >
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${post.author.profilePhoto}`}
                                                alt={post.author.fullName}
                                                width={1000}
                                                height={1000}
                                                className="rounded-full w-12 h-12 object-cover"
                                            />
                                        </Link>
                                        <div>
                                            <h3 className="font-medium text-slate-800">{post.author.fullName}</h3>
                                            <span className="text-sm text-gray-500">{Helper.timeHelper(post.createdAt)}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <p className="text-slate-700 mb-3 whitespace-pre-line">{post.content}</p>
                                    {post.mediaFiles.length > 0 && (
                                        <MediaCarousel mediaFiles={post.mediaFiles} />
                                    )}
                                    <PostAction
                                        view={post.viewCount}
                                        postId={post.id}
                                    />
                                </div>
                            </PostCard>
                        )
                    })
                )}
            </div>
            <div ref={loadRef} className="h- flex items-center justify-center">
                {/* Optional loading spinner can go here */}
            </div>
        </section >
    )
}

export default Posts;