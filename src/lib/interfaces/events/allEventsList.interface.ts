export interface EventsListInterface {
    data: EventProp[]
    pageInfo: PageInfo
}

export interface EventProp {
    id: string
    slug: string
    evenetName: string
    description: string
    maxTickets: number
    ticketPrice: number
    startDate: string
    endDate: string
    status: string
    isFree: boolean
    organizerId: string
    venueId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
    mediaFiles: MediaFile[]
}

export interface MediaFile {
    id: string
    mediaUrl: string
    mediaType: string
    usage: string
    relatedId: string
    isThumbnail: boolean
    order: number
    altText: any
    uploadedById: any
    createdAt: string
    updatedAt: string
    deletedAt: any
}

export interface PageInfo {
    total: number
    currentPage: number
    totalPage: number
}
