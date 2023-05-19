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
            if(article){
                return res.render('article',{
                    name:await article.getName(),
                    text:await article.getText(),
                    author:(await article.getAuthor()).getNickname(),
                    id:await article.getId(),
                    comments:await article.getComments()
                   })
            }
            throw new Error('Can`t find an article')

        } catch (error) {
            console.log(error)
            res.status(404).render('404')
        }

           
    }

    async edit(req:Request,res:Response){
        try {
            let article = await Article.getById(req.params['id']);
            if(article){
                return res.render('articleEdit',{
                    name:await article.getName(),
                    text:await article.getText(),
                    author:(await article.getAuthor()).getNickname(),
                    comments:await article.getComments()
                   })
            }
            throw new Error('Can`t find an article')

        } catch (error) {
            console.log(error)
            res.status(404).render('404')
        }
    }
    async save(req:Request,res:Response){
        try {
            let article = await Article.getById(req.params['id']);
            if(article){
                const {name,text} = req.body;
                article['name'] = name;
                article['text'] = text;
                await article.update();
                return  res.status(200).json({text:'Запись обновлена'})
            }
            throw new Error('Can`t find an article')

        } catch (error) {
            console.log(error)
            res.status(404).render('404')
            
           
        }
    }
    async delete(req:Request,res:Response){
        try {
            let article = await Article.getById(req.params['id']);
            if(article){
                await article.delete();
                return res.status(200).json({text:'Запись удалена'})
            }
            throw new Error('Can`t find an article')

        } catch (error) {
            console.log(error)
            res.status(404).render('404')
           
        }
    }
    async add(req:Request,res:Response){
        try {
            const article = new Article({
                id:await Article.getLastId()+1,
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
