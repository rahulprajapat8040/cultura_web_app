export interface HomeDataInterface {
    categories: Category[]
    locationEvents: LocationEvent[]
    onlineEvents: OnlineEvent[]
    trendingEvents: TrendingEvent[]
}

export interface Category {
    id: string
    name: string
    image: string
    createdAt: string
    updatedAt: string
    deletedAt: any
}

export interface LocationEvent {
    id: string
    title: string
    startDate: string
    startTime: string
    endDate: string
    endTime: string
    location: string
    latitude: string
    longitude: string
    description: string
    bannerImage: string
    isFree: boolean
    isOnline: boolean
    hostedById: string
    categoryId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
    distance: number
    interestedCount: number
    category: Category2
    eventTickets: EventTicket[]
}

export interface Category2 {
    name: string
}

export interface EventTicket {
    id: string
    name: string
    price: number
    eventId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
}

export interface OnlineEvent {
    id: string
    title: string
    startDate: string
    startTime: string
    endDate: string
    endTime: string
    location: any
    latitude: any
    longitude: any
    description: string
    bannerImage: string
    isFree: boolean
    isOnline: boolean
    hostedById: string
    categoryId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
    interestedCount: number
    category: Category3
    eventTickets: EventTicket2[]
}

export interface Category3 {
    name: string
}

export interface EventTicket2 {
    id: string
    name: string
    price: number
    eventId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
}

export interface TrendingEvent {
    id: string
    title: string
    startDate: string
    startTime: string
    endDate: string
    endTime: string
    location?: string
    latitude?: string
    longitude?: string
    description: string
    bannerImage: string
    isFree: boolean
    isOnline: boolean
    hostedById: string
    categoryId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
    interestedCount: number
    category: Category4
    eventTickets: EventTicket3[]
}

export interface Category4 {
    name: string
}

export interface EventTicket3 {
    id: string
    name: string
    price: number
    eventId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
}
