import { User } from '../models/user'
import { UserDTO } from '../dto/user-dto'

export function sqlUserToJSUser(sqlUser:UserDTO):User{
    return new User(sqlUser.user_id, sqlUser.user_name, sqlUser.user_password, sqlUser.user_first_name, sqlUser.user_last_name, sqlUser.user_email, sqlUser.user_role)
}