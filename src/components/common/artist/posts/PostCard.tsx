'use client'
import useViewObserver from '@/hooks/useViewObserver';

const PostCard = ({
    onView,
    children
}: {
    onView: () => void;
    children: React.ReactNode;
}) => {
    const ref = useViewObserver(onView);

    return (
        <div ref={ref}>
            {children}
        </div>
    );
};

export default PostCard;
