export interface User {
    id?: string
    username: string
    email: string
}

export interface UserWithPassword extends User {
    password: string
}