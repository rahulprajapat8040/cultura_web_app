export interface ArtistInfoInterface {
    artist: ArtistInterface
    followers: number
    posts: number
    isFollowed: boolean
}

export interface ArtistInterface {
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
