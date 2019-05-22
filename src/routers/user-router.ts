import express from 'express'
//import { User } from '../models/user'
import { getAllUsersService, getUserByUsernameAndPasswordService, getUserByIdService, updateUserService } from '../user-service';
import { authorization } from '../middleware/auth-middleware';

export const userRouter = express.Router();

// for logging in...must be logged in to do anything
userRouter.post('/login', async (req, res)=>{
    const {username, password} = req.body
    let user = await getUserByUsernameAndPasswordService(req, username, password)
    if(typeof(user) === 'string'){
        res.status(400).send('Invalid Credentials')
    } else{
        console.log(req.session.user)
        res.send(user)
    }
})

// finance managers are authorized to get all users
userRouter.get('/users', [authorization(2), async (req, res)=>{
    res.json(await getAllUsersService())
}])



// find user by id
userRouter.get('/users/:id', async (req, res)=>{
    let id = +req.params.id
    let currentUser = req.session.user.userId
    let checkAuth = req.session.user.role

    if((checkAuth == 2) || (currentUser == id)){
        res.json(await getUserByIdService(id))
    } else{
        res.status(403).send('User not authorized')
    }
})

userRouter.patch('/users', [authorization(3), async (req, res)=>{
    const {userId, username, password, firstName, lastName, email, role} = req.body
    
    if(userId == 6){
        res.status(400).send('Admin cannot update themselves')
    } else {
        if(userId <=0){
            res.status(400).send('UserId cannot be Less Than or Equal to 0')
        } else {
            if(role > 3 || role <= 0){
                res.status(400).send('Role has to be Greater Than 0 and Less Than or Equal to 3')
            } else {
                let user = await updateUserService(req, userId, username, password, firstName, lastName, email, role)
                if(typeof(user) === 'string'){
                    res.status(400).send('Fields must be unique and cannot be null')
                } else {
                        res.send(user)
                } 
            }
        }
    }
}])

userRouter.get('/reimbursements', (req, res)=>{
    //const {reimbursementId, author, amount, dateSubmittted, dateResolved, description, resolver, status, type} = req.body
})



