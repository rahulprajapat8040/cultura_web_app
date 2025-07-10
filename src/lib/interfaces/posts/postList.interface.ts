export interface PostsListInterface {
    data: PostsInterface[]
    pageInfo: PageInfo
}

export interface PostsInterface {
    id: string
    content: string
    viewCount: number
    authorId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
    postHashtags: PostHashtagInterface[]
    mediaFiles: MediaFile[]
    author: Author
}

export interface PostHashtagInterface {
    id: string
    hashtagId: string
    postId: string
    createdAt: string
    updatedAt: string
    deletedAt: any
    hashtag: Hashtag
}

export interface Hashtag {
    id: string
    tag: string
    createdAt: string
    updatedAt: string
    deletedAt: any
}

export interface Author {
    id: string
    fullName: string
    email: string
    phoneNo: string
    countryCode: string
    dob: string
    aboutYou: any
    gender: string
    profilePhoto: any
    createdAt: string
    updatedAt: string
    deletedAt: any
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
