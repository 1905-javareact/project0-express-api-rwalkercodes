import { submitReim, findReimByStatus, findReimByUser, updateReim, getAllReimbursements } from '../reim-dao'
import { Request } from 'express';

export async function getAllReimbursementsService(){
    return await getAllReimbursements()
}

export async function submitReimService(req:Request, amount:number, description:string, type:number){

    return await submitReim(req, amount, description, type)
}

export async function findUserByStatusService(status:number){
    return await findReimByStatus(status)
}

export async function findUserByUserService(author:number){
    return await findReimByUser(author)
}

export async function updateReimService(req:Request, id:number, amount:number, description:string, status:number, type:number){
    return await updateReim(req, id, amount, description, status, type)
}