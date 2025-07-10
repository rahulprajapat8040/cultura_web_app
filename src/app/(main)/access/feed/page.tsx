
import React from 'react';
import Posts from './Posts';
import { apiCall } from '@/app/callApi';
import { PostsListInterface } from '@/lib/interfaces/posts/postList.interface';

const Feed = async () => {
    const res: PostsListInterface = await apiCall("/users/get-all-posts")
    return (
        <Posts initialData={res.data} />
    );
};

export default Feed;
