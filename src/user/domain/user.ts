export interface UserData {
    username: string
    email: string
}


export interface User extends UserData {
    id: string
}

export interface UserWithPassword extends User {
    password: string
}