import { useRef, useEffect } from 'react';

const useDragScroll = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        const handleMouseDown = (e: MouseEvent) => {
            isDown = true;
            el.classList.add('cursor-grabbing');
            startX = e.pageX;
            scrollLeft = el.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            el.classList.remove('cursor-grabbing');
        };

        const handleMouseUp = () => {
            isDown = false;
            el.classList.remove('cursor-grabbing');
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX;
            const walk = (x - startX) * 1.5; // drag speed
            el.scrollLeft = scrollLeft - walk;
        };

        el.addEventListener('mousedown', handleMouseDown);
        el.addEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseup', handleMouseUp);
        el.addEventListener('mousemove', handleMouseMove);

        return () => {
            el.removeEventListener('mousedown', handleMouseDown);
            el.removeEventListener('mouseleave', handleMouseLeave);
            el.removeEventListener('mouseup', handleMouseUp);
            el.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return ref;
};

export default useDragScroll;
