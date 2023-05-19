import { Request,Response } from "express"
import { DataBase } from "../dataBase/dataBase";
import { Comment } from "../models/Comment";

export class CommentsController{
    constructor(
        public db : DataBase
    ){
        this.db = db;
        
    }
    // async view(req:Request,res:Response){
       
    //     try {
    //         let article = await Article.getById(req.params['id']);
    //         return article ?
    //          res.render('article',{
    //             name:await article.getName(),
    //             text:await article.getText(),
    //             author:(await article.getAuthor()).getNickname()
    //            })
    //            :
    //         res.status(404).render('404')

    //     } catch (error) {
    //         throw new Error('Article error ' + error)
           
    //     }

           
    // }

    async edit(req:Request,res:Response){
        try {
            let comment = await Comment.getById(req.params['id']);
            if(comment){
                return res.render('commentEdit',{
                    text:await comment.getText(),
                    author:(await comment.getAuthor()).getNickname()
                   })
            }
            throw new Error('Comment not found')
        } catch (error) {
            console.log(error)
            return res.status(404).render('404')
           
           
        }
    }
    async save(req:Request,res:Response){
        try {
            let comment = await Comment.getById(req.params['id']);
            if(comment){
                const {text} = req.body;
                comment['text'] = text;
                await comment.update();
                return  res.status(200).json({text:'Запись обновлена'})
            }   
           
            throw new Error('Comment not found')

        } catch (error) {
            console.log(error)
            return res.status(404).render('404')
           
        }
    }
    async delete(req:Request,res:Response){
        try {
            let comment = await Comment.getById(req.params['id']);
            if(comment){
                await comment.delete();
                return res.status(200).json({text:'Запись удалена'})
            }
           
            throw new Error('Comment not found')

        } catch (error) {
            console.log(error)
            return res.status(404).render('404')
           
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
