import { Request,Response } from "express"
import { DataBase } from "../dataBase/dataBase";
import { User } from "../models/User";
export class UserController{
    constructor(
        public db : DataBase
    ){
        this.db = db;
        
    }
    async signUp(req:Request,res:Response){
        return res.render('registration')
    }
    public static async signUp(req:Request,res:Response){
        console.log(req['body'])
        const {nickname,email,password} = req.body;
        console.log(nickname)
        if(await User.getBy("email",email)){
            return res.status(200).json({text:'Такой email уже занят!'})
        }
        if(await User.getBy("nickname",nickname)){
            return res.status(200).json({text:'Такой nickanme уже занят!'})
        }
        return res.status(200).json({text:'Пользователь создан'})
    }
    // async edit(req:Request,res:Response){
    //     try {
    //         let article = await Article.getById(req.params['id']);
    //         if(article){
    //             return res.render('articleEdit',{
    //                 name:await article.getName(),
    //                 text:await article.getText(),
    //                 author:(await article.getAuthor()).getNickname(),
    //                 comments:await article.getComments()
    //                })
    //         }
    //         throw new Error('Can`t find an article')

    //     } catch (error) {
    //         console.log(error)
    //         res.status(404).render('404')
    //     }
    // }
    // async save(req:Request,res:Response){
    //     try {
    //         let article = await Article.getById(req.params['id']);
    //         if(article){
    //             const {name,text} = req.body;
    //             article['name'] = name;
    //             article['text'] = text;
    //             await article.update();
    //             return  res.status(200).json({text:'Запись обновлена'})
    //         }
    //         throw new Error('Can`t find an article')

    //     } catch (error) {
    //         console.log(error)
    //         res.status(404).render('404')
            
           
    //     }
    // }
    // async delete(req:Request,res:Response){
    //     try {
    //         let article = await Article.getById(req.params['id']);
    //         if(article){
    //             await article.delete();
    //             return res.status(200).json({text:'Запись удалена'})
    //         }
    //         throw new Error('Can`t find an article')

    //     } catch (error) {
    //         console.log(error)
    //         res.status(404).render('404')
           
    //     }
    // }
    // async add(req:Request,res:Response){
    //     try {
    //         const article = new Article({
    //             id:await Article.getLastId()+1,
    //             text:'Новый текст',
    //             authorId:3,
    //             createdAt:new Date(),
    //             name:'Статья новая'
    //         })
    //         await article.insert()
    //         return res.json({text:`Запись добавлена в базу. ID новой статьи ${article.getId()}`})

    //     } catch (error) {
    //         throw new Error('Article update ' + error)
           
    //     }
    // }
}
