import { Request,Response } from "express"
import { DataBase } from "../dataBase/dataBase";
import { Article } from "../models/Article";
export class ArticlesController{
    constructor(
        public db : DataBase
    ){
        this.db = db;
        
    }
    async view(req:Request,res:Response){
       
        try {
            let article = await Article.getById(req.params['id']);
            return article ?
             res.render('article',{
                name:await article.getName(),
                text:await article.getText(),
                author:(await article.getAuthor()).getNickname()
               })
               :
            res.status(404).render('404')

        } catch (error) {
            throw new Error('Article error ' + error)
           
        }

           
    }

    async edit(req:Request,res:Response){
        try {
            let article = await Article.getById(req.params['id']);
            article['text'] = 'bananan'
            article.update()
            return article ?
             res.render('article',{
                name:await article.getName(),
                text:await article.getText(),
                author:(await article.getAuthor()).getNickname()
               })
               :
            res.status(404).render('404')

        } catch (error) {
            throw new Error('Article update ' + error)
           
        }
    }
    async add(req:Request,res:Response){
        try {
            const article = new Article({
                id:await Article.getLastId(),
                text:'Новый текст',
                authorId:3,
                createdAt:new Date(),
                name:'Статья новая'
            })
            await article.insert()
            return res.json({text:`Запись добавлена в базу. ID новой статьи ${article.getId()}`})

        } catch (error) {
            throw new Error('Article update ' + error)
           
        }
    }
}
