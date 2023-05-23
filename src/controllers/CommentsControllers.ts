import { NextFunction, Request,Response } from "express"
import { DataBase } from "../dataBase/dataBase";
import { Comment } from "../models/Comment";
import { User } from "../models/User";

export class CommentsController{
    constructor(
        public db : DataBase
    ){
        this.db = db;
        
    }
    

    async edit(req:Request,res:Response,next:NextFunction){
        try {
            let comment = await Comment.getById(req.params['id']);
            let author = await comment.getAuthor();
            let users = (await User.findAll()).filter(e => e.id != author.id);
            users.unshift(author)
            if(comment){
                return res.render('commentEdit',{
                    text:comment.getText(),
                    users:users
                   })
            }
            throw new Error('Comment not found')
        } catch (error) {
            console.log(error)
            next()
           
           
        }
    }
    async save(req:Request,res:Response,next:NextFunction){
        try {
            let comment = await Comment.getById(req.params['id']);
            if(comment){
                const {text,authorId} = req.body;
                comment['text'] = text;
                comment['authorId'] = Number(authorId)
                await comment.update();
                return  res.status(200).json({text:'Запись обновлена'})
            }   
           
            throw new Error('Comment not found')

        } catch (error) {
            console.log(error)
            next()
           
        }
    }
    async delete(req:Request,res:Response,next:NextFunction){
        try {
            let comment = await Comment.getById(req.params['id']);
            if(comment){
                await comment.delete();
                return res.status(200).json({text:'Запись удалена'})
            }
           
            throw new Error('Comment not found')

        } catch (error) {
            console.log(error)
            next()
           
        }
    }
    async add(req:Request,res:Response){
        try {
            let id = await Comment.getLastId()+1
            const comment = new Comment({
                id:id,
                articleId:Number(req['body']['articleId']),
                authorId:2,
                createdAt:new Date(),
                text:req['body']['text']
            })
            console.log(comment)
            await comment.insert()
            return res.json({id:id,text:`Комментарий добавлен в базу. ID комментария ${comment.getId()}`})

        } catch (error) {
            throw new Error('Comment inserting ' + error)
           
        }
    }
}
