export interface EventInfoInterface {
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
    eventTickets: EventTickets[]
    hostedBy: HostedBy
}

export interface EventTickets {
    id: string
    name: string
    price: number
    eventId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
}

export interface HostedBy {
    id: string
    name: string
    email: string
    password: string
    profilePic: any
    websiteName: any
    company: any
    phone: any
    address: any
    city: any
    country: any
    pinCode: any
    createdAt: string
    updatedAt: string
    deletedAt: any
}
