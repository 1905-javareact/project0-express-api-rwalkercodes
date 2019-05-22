import { connectionPool } from '.'
import { PoolClient } from 'pg'
import { sqlUserToJSUser } from '../util/user-converter'

export async function getAllUsers(){
    let client:PoolClient

    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project0_user')
        //console.log(result.rows.map(sqlUserToJSUser))
        return result.rows.map(sqlUserToJSUser)
    } catch(err){
        console.log(err);
        return 'Internal Server Error'
    } finally{
        client && client.release()
    }
}


//  login
export async function getUserByUsernameAndPassword(username:string, password:string){
    let client:PoolClient

    try{
        client = await connectionPool.connect()
        //let query = 'SELECT * FROM project0_user WHERE user_name = $1 AND user_password = $2'
        let result = await client.query('SELECT * FROM project0_user WHERE user_name = $1 AND user_password = $2', [username, password])
        // let result = await client.query(query, [username, password])
        if(!result.rows[0]){
            return 'User not found'
        }
        return sqlUserToJSUser(result.rows[0])
    } catch(err){
        console.log(err);
        return 'Internal Server Error'
    } finally{
        client && client.release()
    }
}

export async function getUserById(userId:number){
    let client:PoolClient

    try {
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project0_user WHERE user_id = $1', [userId])
        return sqlUserToJSUser(result.rows[0])
    } catch(err){
        console.log(err);
        return 'Internal Server Error'
    } finally {
        client && client.release()
    }
}

export async function updateUser(userId:number, username:string, password:string, firstName:string, lastName:string, email:string, role:number){
    let client:PoolClient
    try {
        client = await connectionPool.connect()
        let updateQuery = `UPDATE project0_user SET user_name = $1, user_password = $2, user_first_name = $3, user_last_name = $4, user_email = $5, user_role = $6  WHERE user_id = $7`
        await client.query(updateQuery, [username, password, firstName, lastName, email, role, userId])
        let result = await client.query('SELECT * FROM project0_user WHERE user_id = $1', [userId])
        return sqlUserToJSUser(result.rows[0])
    } catch(err){
        console.log(err);
        return 'Internal Server Error'
    } finally {
        client && client.release()
    }
}