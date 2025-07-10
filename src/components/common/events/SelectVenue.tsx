'use client';

import { useEffect, useState } from 'react';
import { useWatch, FieldErrors, UseFormRegister, UseFormSetValue, Control } from 'react-hook-form';
import { ChevronDown, MapPin, Star, Sparkles, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Venues } from '@/lib/interfaces/venue_owner/allVenueList.interface';
import { apiRequest } from '@/utils/apiHelper';

interface Props {
    control: Control<any>;
    setValue: UseFormSetValue<any>;
    register: UseFormRegister<any>;
    errors: FieldErrors;
}

export const SelectVenueDropdown = ({ control, register, setValue, errors }: Props) => {
    const selectedVenueId = useWatch({ control, name: 'venueId' });
    const [venues, setVenues] = useState<Venues[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredVenue, setHoveredVenue] = useState<string | null>(null);

    const selectedVenue = venues.find((v) => v.id.toString() === selectedVenueId);

    const filteredVenues = venues.filter(venue =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const res = await apiRequest('get', '/users/get-all-venues');
                if (res?.data?.success) {
                    setVenues(res.data.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch venues:', err);
            }
        };
        fetchVenues();
    }, []);

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            y: -20,
            scale: 0.95,
            filter: "blur(4px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3
            }
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            filter: "blur(4px)",
            transition: {
                duration: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.05,
                type: "spring",
                damping: 25,
                stiffness: 400
            }
        })
    };

    return (
        <div className="relative w-full">
            {/* Floating Label */}
            <motion.label
                className="block font-bold mb-3 text-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Sparkles className="inline w-5 h-5 mr-2 " />
                Select Your Perfect Venue
            </motion.label>

            {/* Main Dropdown Button */}
            <motion.div
                className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 
                     ${errors.venueId ? 'ring-2 ring-red-400' : 'ring-1 ring-gray-200 hover:ring-purple-300'
                    }`}
                onClick={() => setIsOpen((prev) => !prev)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 opacity-60" />

                {/* Animated Border */}
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-2xl transition-all duration-300 ${isOpen ? 'opacity-20' : 'opacity-0'
                    }`} />

                <div className="relative bg-white/90 backdrop-blur-sm px-6 py-4 flex justify-between items-center">
                    <div className="flex-1">
                        {selectedVenue ? (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center space-x-3"
                            >
                                <div className="w-12 h-12 bg-background-secondary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {selectedVenue.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{selectedVenue.name}</h3>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 mr-1 text-purple-500" />
                                        {selectedVenue.location}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="flex items-center space-x-3"
                                initial={{ opacity: 0.7 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                                    <Search className="w-6 h-6 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-gray-500 font-medium">Choose your venue</p>
                                    <p className="text-sm text-gray-400">Browse our premium locations</p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        className="ml-4"
                    >
                        <ChevronDown className="w-6 h-6 text-gray-600" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Hidden Input for Validation */}
            <input
                type="hidden"
                {...register('venueId', { required: 'Venue is required' })}
            />

            {/* Error Message */}
            <AnimatePresence>
                {errors.venueId && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-2 flex items-center"
                    >
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {errors.venueId.message}
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute z-50 mt-3 w-full bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl max-h-96 overflow-hidden"
                    >
                        {/* Search Bar */}
                        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search venues..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-200 outline-none"
                                />
                            </div>
                        </div>

                        {/* Venues List */}
                        <div className="overflow-y-auto max-h-80">
                            {filteredVenues.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">
                                    <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                    <p>No venues found matching your search</p>
                                </div>
                            ) : (
                                filteredVenues.map((venue, index) => (
                                    <motion.div
                                        key={venue.id}
                                        custom={index}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className={`relative px-6 py-4 cursor-pointer transition-all duration-200 border-b border-gray-50 last:border-b-0 hover:bg-gradient-to-r hover:from-gray-50 hover:to-background-secondary/10`}
                                        onClick={() => {
                                            setValue('venueId', venue.id.toString(), { shouldValidate: true });
                                            setIsOpen(false);
                                            setSearchTerm('');
                                        }}
                                        onHoverStart={() => setHoveredVenue(venue.id.toString())}
                                        onHoverEnd={() => setHoveredVenue(null)}
                                        whileHover={{ x: 4 }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <motion.div
                                                    className="w-14 h-14 bg-background-secondary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                >
                                                    {venue.name.charAt(0)}
                                                </motion.div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800 text-lg">{venue.name}</h4>
                                                    <div className="flex items-center text-sm text-gray-600 mt-1">
                                                        <MapPin className="w-4 h-4 mr-1 text-purple-500" />
                                                        {venue.location}
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                        <span className="text-sm text-gray-600 ml-1">4.8</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <motion.div
                                                className="text-right"
                                                animate={{
                                                    scale: hoveredVenue === venue.id.toString() ? 1.05 : 1,
                                                    x: hoveredVenue === venue.id.toString() ? -5 : 0
                                                }}
                                            >
                                                <span className="text-2xl font-bold ">
                                                    ₹{venue.price}
                                                </span>
                                                <p className="text-sm text-gray-500">per day</p>
                                            </motion.div>
                                        </div>

                                        {/* Hover Effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-background/10 to-background-secondary-400/10 rounded-lg"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{
                                                opacity: hoveredVenue === venue.id.toString() ? 1 : 0,
                                                scale: hoveredVenue === venue.id.toString() ? 1 : 0.8
                                            }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div >
                )}
            </AnimatePresence >
        </div >
    );
};