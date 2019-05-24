export class Reimbursement {
    reimId: number // primary key
    author: number // foreign key -> User, not null
    amount: number // not null
    dateSubmitted: string // not null
    dateResolved: string // not null
    description: string // not null
    resolver: number // foreign key -> User
    status: number // foreign key -> ReimbursementStatus, not null
    type: number // foreign key -> ReimbursmentType
    constructor(id: number, author:number, amount:number, dateSubmitted:string, dateResolved:string, description:string, resolver: number, status: number, type: number){
        this.reimId = id || 0
        this.author = author || 0
        this.amount = amount || 0
        this.dateSubmitted = dateSubmitted || ''
        this.dateResolved = dateResolved || ''
        this.description = description || ''
        this.resolver = resolver || 0
        this.status = status || 0
        this.type = type || 0
    }
}