import { apiRequest } from "@/utils/apiHelper";
import { Heart, MessageCircle, ScanEye, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

interface PostActionProp {
    view: number,
    postId: string
}

const PostAction = ({ view = 0, postId }: PostActionProp) => {
    const [states, setStates] = useState({
        likes: 0,
        comments: 20,
        isLiked: false
    })

    const getLikesAndComments = async () => {
        try {
            const res = await apiRequest("get", `/users/get-likes-and-comments?postId=${postId}`)
            if (res.data.success) {
                console.log('rs is', res.data.data.like)
                setStates((prev) => ({
                    ...prev,
                    likes: res.data.data.like.likes,
                    isLiked: res.data.data.like.isLiked
                }))
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (postId) {
            getLikesAndComments()
        }
    }, [])

    const handleClickLikeButton = async () => {
        try {
            const res = await apiRequest("post", "/users/like-post", { postId })
            if (res.data.success) {
                getLikesAndComments()
            }
        } catch (error) {

        }
    }

    return (
        < div className="flex justify-between items-center text-gray-600 text-sm" >
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 hover:text-green-600 transition">
                    <ScanEye className="w-4 h-4" />
                    {/* {post.likes} */}
                    {view}
                </button>
                <button
                    onClick={handleClickLikeButton}
                    className={`flex items-center gap-1 ${states.isLiked ? 'text-red-500' : ''} hover:text-red-500 transition`}>
                    <Heart className="w-4 h-4" />
                    {/* {post.likes} */}
                    {states.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500 transition">
                    <MessageCircle className="w-4 h-4" />
                    {/* {post.comments} */}
                    20
                </button>
            </div>
            <button className="flex items-center gap-1 hover:text-green-600 transition">
                <Share2 className="w-4 h-4" />
                Share
            </button>
        </div >
    )
}

export default PostAction;