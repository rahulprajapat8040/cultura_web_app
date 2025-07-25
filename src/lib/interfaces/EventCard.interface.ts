export interface EventCardInterface {
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
    distance?: number
    interestedCount: number
    category: CategoryInterface
    eventTickets: EventTicketInterface[]
}

export interface CategoryInterface {
    name: string
}

export interface EventTicketInterface {
    id: string
    name: string
    price: number
    eventId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
}