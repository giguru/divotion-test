type UUID = string;

export interface ProductModel {
    id: UUID,
    name: string
    description: string
}

export interface UserModel {
    id: UUID,
    name: string
}
