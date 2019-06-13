import express from 'express'
import { getAllUsersService, getUserByUsernameAndPasswordService, getUserByIdService, updateUserService } from '../dao/service/user-service';
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
        res.status(200).send(user)
    }
})

// finance managers & admins are authorized to get all users
userRouter.get('/users', async (req, res)=>{
    let checkAuth = req.session.user.role
    if((checkAuth == 2) || (checkAuth == 3)){
        let users = await getAllUsersService()
        if(typeof(users) === 'string'){
            res.status(400).send('Bad Request')
        } else {
            res.status(200).send(users)
        }
    } else {
        res.status(401).send('User not authorized')
    }
    
})



// finance managers can find user by id
userRouter.get('/users/:id', async (req, res)=>{
    let id = +req.params.id
    let currentUser = req.session.user.userId
    let checkAuth = req.session.user.role
    if((checkAuth == 2) || (checkAuth == 3) || (currentUser == id)){
        let user = await getUserByIdService(id)
        if(typeof(user) === 'string'){
            res.status(400).send('Bad Request')
        } else{
            res.status(200).send(user)
        }
    } else{
        res.status(401).send('User not authorized')
    }
})

// admins can update users
userRouter.patch('/users/edit/:id', [authorization(3), async (req, res)=>{
    let id = +req.params.id
    const {username, password, firstName, lastName, email, role} = req.body
    if(id == 6){
        res.status(400).send('Admin cannot update themselves')
    } else {
        if(id <=0){
            res.status(400).send('UserId cannot be Less Than or Equal to 0')
        } else {
            if(role > 3 || role <= 0){
                res.status(400).send('Role has to be Greater Than 0 and Less Than or Equal to 3')
            } else {
                let user = await updateUserService(req, id, username, password, firstName, lastName, email, role)
                if(typeof(user) === 'string'){
                    res.status(400).send('Fields must be unique and cannot be null')
                } else {
                    res.status(202).send(user)
                } 
            }
        }
    }
}])



