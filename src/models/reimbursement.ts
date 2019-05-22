export class Reimbursement {
    reimbursementId: number // primary key
    author: number // foreign key -> User, not null
    amount: number // not null
    dateSubmittted: number // not null
    dateResolved: number // not null
    description: string // not null
    resolver: number // foreign key -> User
    status: number // foreign key -> ReimbursementStatus, not null
    type: number // foreign key -> ReimbursmentType
    constructor(id: number, author:number, amount:number, dateSubmitted:number, dateResolved:number, description:string, resolver: number, status: number, type: number){
        this.reimbursementId = id || 0
        this.author = author || 0
        this.amount = amount || 0
        this.dateSubmittted = dateSubmitted || 0
        this.dateResolved = dateResolved || 0
        this.description = description || ''
        this.resolver = resolver || 0
        this.status = status || 0
        this.type = type || 0
    }
}