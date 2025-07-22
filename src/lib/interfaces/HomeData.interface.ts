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
    category: Category2
}

export interface Category2 {
    name: string
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
}
