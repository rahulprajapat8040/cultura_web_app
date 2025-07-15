export interface FindingArtistEventsListInterface {
    data: FindingArtistEventsInterface[]
    pageInfo: PageInfo
}

export interface FindingArtistEventsInterface {
    id: string
    slug: string
    evenetName: string
    description: string
    proposal: string
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
    organizer: Organizer
    mediaFiles: MediaFiles
}

export interface Organizer {
    id: string
    fullName: string
    email: string
    phoneNo: string
    countryCode: string
    dob: string
    aboutYou: any
    gender: string
    profilePhoto: string
    createdAt: string
    updatedAt: string
    deletedAt: any
}

export interface MediaFiles {
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