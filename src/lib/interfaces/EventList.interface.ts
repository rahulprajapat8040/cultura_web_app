export interface EventListInterface {
    data: EventListDataInterface[]
    pageInfo: PageInfo
}

export interface EventListDataInterface {
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
    eventTickets: EventTicket[]
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

export interface PageInfo {
    total: number
    currentPage: number
    totalPage: number
}
