import { useEffect, useRef } from 'react';

const useViewObserver = (onView: () => void) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onView();
                    observer.disconnect(); // Only trigger once
                }
            },
            { threshold: 0.5 } // 50% visible
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref.current]);

    return ref;
};

export default useViewObserver;