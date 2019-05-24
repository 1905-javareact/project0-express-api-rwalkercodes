import express from 'express'
import { submitReimService, findUserByStatusService, findUserByUserService, updateReimService } from '../dao/service/reim-service'
import { authorization } from '../middleware/auth-middleware'

export const reimRouter = express.Router();

reimRouter.post('/reimbursements', async (req, res)=>{
    const {amount, description, type} = req.body
    if(req.session.user){
        let submission = await submitReimService(req, amount, description, type)
        if(typeof(submission) === 'string'){
            res.status(400).send('Something went wrong')
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

reimRouter.get('/reimbursements/status/:statusId', [authorization(2), async (req, res)=>{
    let id = +req.params.statusId
    let findStatus = await findUserByStatusService(id)
    if(typeof(findStatus) === 'boolean'){
        res.status(400).send('Status Does Not Exist')
    } else{
        if(typeof(findStatus) === 'string'){
            res.status(400).send('Bad Request')
        } else{
            res.send(findStatus)
        }
    }
}])

reimRouter.get('/reimbursements/author/userId/:userId', [authorization(2), async (req, res)=>{
    let author = +req.params.userId
    let findUser = await findUserByUserService(author)
    if(findUser == 'false'){
        res.status(400).send('User Does Not Exist')
    } else{
        if(typeof(findUser) === 'string'){
            res.status(400).send('Bad Request')
        } else{
            res.send(findUser)
        }
    }
}])

reimRouter.patch('/reimbursements', [authorization(2), async (req, res)=>{
    const{id, author, amount, description, status, type} = req.body
    if(req.session.user){
        let submission = await updateReimService(req, id, author, amount, description, status, type)
        if(typeof(submission) === 'string'){
            res.status(400).send('Something went wrong')
        } else {
            if(submission == false){
                res.status(404).send('Update Failed')
            } else{
                res.status(201).send('Update Submitted')
            }
        }
    } else {
        res.status(401).send('Must be logged in')
    }
}])