export interface VenueListInterface {
    data: Venues[]
    pageInfo: PageInfo
  }
  
  export interface Venues {
    id: string
    name: string
    location: string
    latitude: number
    longitude: number
    capacity: number
    price: number
    description: string
    ownerId: string
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
  