import { ActiveRecordEntity } from "./ActiveRecordEnity";

export class User extends ActiveRecordEntity{
    protected nickname : string;
    protected email : string;
    protected isConfirmed : boolean;
    protected role : 'admin' | 'user';
    protected  passwordHash :  string;
    protected authToken : string;
    constructor(
        {
        id,
        nickname,
        email,
        role,
        createdAt,
        authToken,
        passwordHash,
        isConfirmed
        } : {id: number,email:string, nickname: string,role:'admin'|'user',createdAt:Date,isConfirmed:boolean,passwordHash:string,authToken:string}
        
    ){
        super();
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
        this.authToken = authToken;
        this.passwordHash = passwordHash;
        this.isConfirmed = isConfirmed
    }

    public getNickname(){
        return this.nickname
    }

   
   

   
}


