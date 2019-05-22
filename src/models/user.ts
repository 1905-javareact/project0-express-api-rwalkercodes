 
export class User {
    userId: number // primary key
    username: string // not null, unique
    password: string // not null, unique
    firstName: string // not null
    lastName: string // not null
    email: string // not null
    role: number // not null
    constructor(id: number, username:string,  password:string, firstname:string, lastname:string, email: string, role: number){
         this.userId = id || 0
         this.username = username || ''
         this.password = password || ''
         this.firstName = firstname|| ''
         this.lastName = lastname || ''
         this.email = email || ''
         this.role = role || 0
    }
}