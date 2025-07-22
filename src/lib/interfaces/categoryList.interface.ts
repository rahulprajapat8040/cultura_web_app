export interface CategoryListInterface {
    data: CategoryListData[]
    pageInfo: PageInfo
}

export interface CategoryListData {
    id: string
    name: string
    image: string
    createdAt: string
    updatedAt: string
    deletedAt: any
}

export interface PageInfo {
    total: number
    currentPage: number
    totalPage: number
}
