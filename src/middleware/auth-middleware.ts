export function authorization(authRoles:number){
    //the function we return is the middleware
    return (req, res, next) => {
        let isAuth = false
        //make sure user is logged in, otherwise user will be undefined
        if(!req.session.user){
            res.status(401).send('User must log in')
        }
        /* each user must be logged in to perform any task in the project
        each user must have a role
        if the authorization parameter passed equals the role of the user
        grant authorization. 
        if timed out, send the expired msg back. If not logged in, send log in msg back
        */
        if(authRoles == req.session.user.role){
                isAuth = true
        }
        if(isAuth){
            next()
        } else {
            res.status(401).send("The incoming token has expired")
        }
    }
}