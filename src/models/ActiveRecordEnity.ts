import mongoose,{ Schema } from "mongoose"
import { User } from "./User"
import { Article } from "./Article"

const schemes : any = {
    "User":new Schema(
        {
            id:{
                type:Number,
                required:true
            },
            nickname:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            isConfirmed:{
                type:Boolean,
                required:true
            },
            role:{
                type:String,
                required:true,
                enum:['admin','user']
            },
            passwordHash:{
                type:String,
                required:true,
            },
            authToken:{
                type:String,
                required:true,
            },
            createdAt:{
                type:Date,
                required:true
            }
    
    }, 
    {versionKey: false}),

    "Article":new Schema(
        {
            id:{
                type:Number,
                required:true
            },
            name:{
                type:String,
                required:true
            },
            text:{
                type:String,
                required:true
            },
            authorId:{
                type:Number,
                required:true
            },
            createdAt:{
                type:Date,
                required:true
            }
    
    }, 
    {versionKey: false})
}

// const models = {
//     "User":mongoose.model("User", schemes["User"]),
//     "Article":mongoose.model("Article", schemes["Article"])
// }

export abstract class ActiveRecordEntity{


    protected id: number;
    protected createdAt : Date;

    public getId(){
        return this.id
    }
    
    public getData(){
        return this.createdAt
    }


    public static async findAll(){
        let res =  (await mongoose.model(this.name, schemes[this.name]).find()).map(e => Reflect.construct(this,[e]))
        return res
        
      }
    public static async getById(id:number){
        let res =  Reflect.construct(this,[(await mongoose.model(this.name, schemes[this.name]).findOne({id:id}))],this);
        return res
    }
    public getProps(){
       let arr =  Reflect.ownKeys(this).map(e => [e,Reflect.get(this,e)]);
       //@ts-ignore
        return Object.fromEntries(arr)
    }
    public async update(){
        return await mongoose.model(this.constructor.name, schemes[this.constructor.name]).updateOne({id:this.id},this.getProps())
    }
    public async insert(){
        return await mongoose.model(this.constructor.name, schemes[this.constructor.name]).create(this.getProps())
    }

    public  static async getLastId() :  Promise<number>{
        let id = (await this.findAll()).map(e => e['id']).sort( (a,b) => b - a )[0]
        return id
    }
}

