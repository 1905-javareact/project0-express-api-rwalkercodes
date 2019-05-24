export class reimDTO{
    reim_id: number // primary key
    reim_author: number // foreign key -> User, not null
    reim_amount: number // not null
    reim_date_submitted: string // not null
    reim_date_resolved: string // not null
    reim_description: string // not null
    reim_resolver: number // foreign key -> User
    reim_status: number // foreign key -> ReimbursementStatus, not null
    reim_type: number
}