export class UserDTO{
    user_id: number // primary key
    user_name: string // not null, unique
    user_password: string // not null, unique
    user_first_name: string // not null
    user_last_name: string // not null
    user_email: string // not null
    user_role: number // not null
}