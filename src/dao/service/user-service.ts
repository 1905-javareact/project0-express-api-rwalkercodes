import { Request } from 'express'
import { getAllUsers, getUserByUsernameAndPassword, getUserById, updateUser } from '../user-dao'

export async function getAllUsersService(){
    return await getAllUsers()
}

export async function getUserByUsernameAndPasswordService(req:Request, username:string, password:string){
    let user = await getUserByUsernameAndPassword(username, password)
    if(typeof(user) === 'string'){//if its an error pass it up the line
        return user
    } else { //else add it to our session
        req.session.user = user
        return user
    }
}

export async function getUserByIdService(userId:number){
    return await getUserById(userId)
}

export async function updateUserService(req:Request, userId:number, username:string, password:string, firstName:string, lastName:string, email:string, role:number){
    let user = await updateUser(userId, username, password, firstName, lastName, email, role)
    if(typeof(user) === 'string'){
        return user
    } else {
        req.session.user = user
        return user
    }
}
