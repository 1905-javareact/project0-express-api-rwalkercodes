import express from 'express'
import { submitReimService, findUserByStatusService, findUserByUserService, updateReimService, getAllReimbursementsService } from '../dao/service/reim-service'
import { authorization } from '../middleware/auth-middleware'

export const reimRouter = express.Router();

// finance managers & admins are authorized to get all reimbursements
reimRouter.get('/reimbursements', async(req, res)=>{
    let checkAuth = req.session.user.role
    if((checkAuth == 2) || (checkAuth == 3)){
        let reims = await getAllReimbursementsService()
        if(typeof(reims) === 'string'){
            res.status(400).send('Bad Request')
        } else {
            res.status(200).send(reims)
        }
    } else {
        res.status(401).send('User not authorized')
    }
})

// anyone employee, fin man, or admin can post a reimbursement
reimRouter.post('/reimbursements/submit', async (req, res)=>{
    const {amount, description, type} = req.body
    if(req.session.user){
        let submission = await submitReimService(req, amount, description, type)
        if(typeof(submission) === 'string'){
            res.status(400).send('Bad Request')
        } else {
            if(submission == false){
                res.status(404).send('Submission Failed')
            } else{
                res.status(201).send('Reimbursement Submitted')
            }
        }
    } else {
        res.status(401).send('Must be logged in')
    }
})

// finance managers can find reim but status id
reimRouter.get('/reimbursements/status/:statusId', [authorization(2), async (req, res)=>{
    let id = +req.params.statusId
    let findStatus = await findUserByStatusService(id)
    if(typeof(findStatus) === 'boolean'){
        res.status(404).send('Status Does Not Exist')
    } else{
        if(typeof(findStatus) === 'string'){
            res.status(400).send('Bad Request')
        } else{
            res.status(200).send(findStatus)
        }
    }
}])

//finance managers can find reim but user id
reimRouter.get('/reimbursements/author/userId/:userId', [authorization(2), async (req, res)=>{
    let author = +req.params.userId
    let findUser = await findUserByUserService(author)
    if(findUser == 'false'){
        res.status(400).send('User Does Not Exist')
    } else{
        if(typeof(findUser) === 'string'){
            res.status(400).send('Bad Request')
        } else{
            res.status(200).send(findUser)
        }
    }
}])

// finance managers can update a reimbursement
reimRouter.patch('/reimbursements/update/:id', [authorization(2), async (req, res)=>{
    const{amount, description, status, type} = req.body
    let id = +req.params.id
    if(req.session.user){
        let submission = await updateReimService(req, id, amount, description, status, type)
        if(typeof(submission) === 'string'){
            res.status(400).send('Bad Request')
        } else {
            if(submission == false){
                res.status(404).send('Update Failed')
            } else{
                res.status(202).send('Update Submitted')
            }
        }
    } else {
        res.status(401).send('Must be logged in')
    }
}])