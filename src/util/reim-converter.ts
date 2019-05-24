import { Reimbursement } from '../models/reimbursement'
import { reimDTO } from '../dto/reim-dto'

export function sqlReimtoJSReim(sqlReim:reimDTO):Reimbursement{
    return new Reimbursement(sqlReim.reim_id, sqlReim.reim_author, sqlReim.reim_amount, sqlReim.reim_date_submitted, sqlReim.reim_date_resolved, sqlReim.reim_description, sqlReim.reim_resolver, sqlReim.reim_status, sqlReim.reim_type)
}