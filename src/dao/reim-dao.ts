import { connectionPool } from '.'
import { Request } from 'express'
import { PoolClient } from 'pg'
import { sqlReimtoJSReim } from '../util/reim-converter';

export async function submitReim(req:Request, amount:number, description:string, type:number){
    let client:PoolClient
    let didSubmit = false;
    let author = req.session.user.userId
    try{
        client = await connectionPool.connect()
        // let newDate = await client.query(`SELECT to_char(now(), 'Mon dd, yyyy')`)
        // console.log(newDate)
        let query = 'INSERT INTO project0_reimbursement (reim_author, reim_amount, reim_date_submitted, reim_description, reim_status, reim_type) VALUES($1, $2, now(), $3, 1, $4)'
        await client.query(query, [author, amount, description, type])
        //console.log(result.rows[0])
        let result = await client.query('SELECT * FROM project0_reimbursement')
        if(result){
            console.log(sqlReimtoJSReim(result.rows[0]))
            didSubmit = true
        }
        return didSubmit
        //return sqlReimtoJSReim(result.rows[0])
    } catch(err){
        console.log(err);
        return 'Internal Server Error'
    } finally{
        client && client.release()
    }
}

export async function findReimByStatus(status:number){
    let client:PoolClient
    let hasContent = true
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project0_reimbursement WHERE reim_status = $1 ORDER BY reim_date_submitted ASC', [status])
        if(result.rows[0]){
            return result.rows.map(sqlReimtoJSReim)

        } else{
            hasContent = false
            return hasContent
        }    
    } catch(err){
        console.log(err)
        return 'Internal Server Error'
    } finally {
        client && client.release()
    }
}

export async function findReimByUser(author:number){
    let client:PoolClient
    let hasContent = true
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project0_reimbursement WHERE reim_author = $1 ORDER BY reim_date_submitted ASC', [author])
        console.log(result.rows[0])
        if(result.rows[0]){
            return result.rows.map(sqlReimtoJSReim)
            
        } else {
            hasContent = false
            return hasContent
        }
    } catch(err){
        console.log(err)
        return 'Internal Server Error'
    } finally {
        client && client.release()
    }
}

export async function updateReim(req:Request, id:number, author:number, amount:number, description:string, status:number, type:number){
    let client:PoolClient
    let finman = req.session.user.userId
    let didUpdate = false
    try{
        client = await connectionPool.connect()
        //let newDate = await client.query(`SELECT to_char(now(), 'Mon dd, yyyy')`)
        let updateQ = 'UPDATE project0_reimbursement SET reim_author = $1, reim_amount = $2, reim_date_resolved = now(), reim_description = $3, reim_resolver = $4, reim_status = $5, reim_type = $6 WHERE reim_id = $7'
        await client.query(updateQ, [author, amount, description, finman, status, type, id])
        let result = await client.query('SELECT * FROM project0_reimbursement WHERE reim_id = $1', [id])
        if(result){
            console.log(sqlReimtoJSReim(result.rows[0]))
            didUpdate = true
        }
        return didUpdate
        //return sqlReimtoJSReim(result.rows[0])
    } catch(err){
        console.log(err);
        return 'Internal Server Error'
    } finally {
        client && client.release()
    }
}