import { NextFunction, Request,Response } from "express"
import { DataBase } from "../dataBase/dataBase";
import { Article } from "../models/Article";
import { User } from "../models/User";
export class ArticlesController{
    constructor(
        public db : DataBase
    ){
        this.db = db;
        
    }
    async view(req:Request,res:Response,next:NextFunction){
       
        try {
            let article = await Article.getById(req.params['id']);
            if(article){
                return res.render('article',{
                    name:article.getName(),
                    text:article.getText(),
                    author:(await article.getAuthor()).getNickname(),
                    id:article.getId(),
                    comments:await article.getComments()
                   })
            }
            throw new Error('Can`t find an article')

        } catch (error) {
            console.log(error)
            next()
        }

           
    }

    async edit(req:Request,res:Response,next:NextFunction){
        try {
            let article = await Article.getById(req.params['id']);
            let author = await article.getAuthor();
            let users = (await User.findAll()).filter(e => e.id != author.id);
            users.unshift(author)
            if(article){
                return res.render('articleEdit',{
                    name:article.getName(),
                    text:article.getText(),
                    users:users
                   })
            }
            throw new Error('Can`t find an article')

        } catch (error) {
            console.log(error)
            next()
        }
    }
    async save(req:Request,res:Response,next:NextFunction){
        try {
            let article = await Article.getById(req.params['id']);
            if(article){
                const {name,text,authorId} = req.body;
                article['name'] = name;
                article['text'] = text;
                article['authorId'] = Number(authorId)
                await article.update();
                return  res.status(200).json({text:'Запись обновлена'})
            }
            throw new Error('Can`t find an article')

        } catch (error) {
            console.log(error)
            next()
            
           
        }
    }
    async delete(req:Request,res:Response,next:NextFunction){
        try {
            let article = await Article.getById(req.params['id']);
            if(article){
                await article.delete();
                return res.status(200).json({text:'Запись удалена'})
            }
            throw new Error('Can`t find an article')

        } catch (error) {
            console.log(error)
            next()
           
        }
    }
    async add(req:Request,res:Response){
        try {
            if(!req.query.authorId){
                return res.send('Передайте id автора!')
            }
            if(!await User.getById(Number(req.query['authorId']))){
                return res.send('Юзера с таким id не существует')
            }
            const article = new Article({
                id:await Article.getLastId()+1,
                text:'Новый текст',
                authorId:2,
                createdAt:new Date(),
                name:'Статья новая'
            })
            await article.insert()
            return res.json({text:`Запись добавлена в базу. ID новой статьи ${article.getId()}`})

        } catch (error) {
            throw new Error('Article adding ' + error)
           
        }
    }
}
