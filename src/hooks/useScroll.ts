import { useCallback, useEffect, useRef } from "react";

interface UseScrollProp {
    hasMore: boolean;
    onLoadMore: () => void
    rootMargin?: string
}

const useScroll = ({ hasMore, onLoadMore, rootMargin = '200px' }: UseScrollProp) => {
    const loadRef = useRef<HTMLDivElement | null>(null)
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore) {
            onLoadMore()
        }
    }, [hasMore, onLoadMore])

    useEffect(() => {
        const option = {
            root: null,
            rootMargin,
            threshhold: 0
        }
        const observer = new IntersectionObserver(handleObserver, option)
        if (loadRef.current) observer.observe(loadRef.current);
        return () => observer.disconnect()
    }, [handleObserver, rootMargin])
    return loadRef
}

export default useScroll;