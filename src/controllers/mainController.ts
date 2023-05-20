import { Request,Response } from "express"
import { DataBase } from "../dataBase/dataBase";
import { Article } from "../models/Article";
export class MainController{
    constructor(
        private db : DataBase
    ){
        this.db = db;

    }
    sayBye(req:Request,res:Response){
            
               return res.render('main',{
                title:req.params['name']
               })
    }
    async main(req:Request,res:Response){
        const articles = await Article.findAll();
                return res.render('main',{
                    title:'main',
                    articles:articles
                   })
            }
   
  

}



 