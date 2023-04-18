import { Request,Response } from "express"

export const  MainController =  {
    sayBye(req:Request,res:Response){
        
       return res.render('main',{
        title:req.params['name']
       })
    },
    main(req:Request,res:Response){
        const articles = [
            {'name':'Статья 1', 'text':'Текст статьи 1'},
            {'name':'Статья 4', 'text':'Текст статьи 2'},
        ]
        return res.render('main',{
            title:'sosat sui moi',
            articles:articles
           })
    }
}



 