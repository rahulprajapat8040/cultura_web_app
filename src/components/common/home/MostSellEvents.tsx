'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import EventCard from './EventCard';

const MostSalledEvents = ({ events }: { events: any[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);

    useEffect(() => {
        const updateItemsPerView = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerView(2);
            } else if (window.innerWidth >= 768) {
                setItemsPerView(2);
            } else {
                setItemsPerView(1);
            }
        };

        updateItemsPerView();
        window.addEventListener('resize', updateItemsPerView);
        return () => window.removeEventListener('resize', updateItemsPerView);
    }, []);

    const maxIndex = Math.max(0, events.length - itemsPerView);

    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [itemsPerView, events.length, currentIndex]);

    const nextSlide = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const getItemWidth = () => {
        if (itemsPerView === 3) return 'w-1/3';
        if (itemsPerView === 2) return 'w-1/2';
        return 'w-full';
    };

    const getTransformPercentage = () => {
        return (currentIndex * 100) / itemsPerView;
    };


    return (
        <>
            {maxIndex > 0 && (
                <div className="flex items-center justify-end gap-2 sm:gap-4 mb-4">
                    <button
                        onClick={prevSlide}
                        className={`${currentIndex === 0 ? 'bg-white border border-gray-300' : 'bg-background-secondary'
                            } w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all hover:scale-105`}
                        disabled={currentIndex === 0}
                    >
                        <ArrowLeft
                            color={currentIndex === 0 ? '#1e1e2f' : 'white'}
                            size={16}
                            className="sm:w-5 sm:h-5"
                        />
                    </button>
                    <button
                        onClick={nextSlide}
                        className={`${currentIndex === maxIndex ? 'bg-white border border-gray-300' : 'bg-background-secondary'
                            } w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all hover:scale-105`}
                        disabled={currentIndex === maxIndex}
                    >
                        <ArrowRight
                            color={currentIndex === maxIndex ? '#1e1e2f' : 'white'}
                            size={16}
                            className="sm:w-5 sm:h-5"
                        />
                    </button>
                </div>
            )}

            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${getTransformPercentage()}%)`
                    }}
                >
                    {events.map((event, idx) => (
                        <div key={idx}
                            className={`px-1 sm:px-2 lg:px-3 flex-shrink-0 ${getItemWidth()} group`}
                        >
                            <EventCard />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MostSalledEvents;
