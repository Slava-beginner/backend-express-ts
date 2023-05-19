require('dotenv').config()
import express, {
    Application,
    Errback,
    json,
    NextFunction,
    Request,
    Response,
    urlencoded
} from "express";
import exphb from "express-handlebars";
import hbs from 'hbs'
import path from 'path'
import routesAPI from "./routes/routes";



import { MainController } from "./controllers/mainController";
import { DataBase } from "./dataBase/dataBase";
import { getRandomId } from "./utils/utils";
import { ArticlesController } from "./controllers/ArticlesController";
const backend = 'backend'
const  {MongoClient}  = require('mongodb')

import mongoose,{Schema} from "mongoose";
import { CommentsController } from "./controllers/CommentsControllers";

const app: Application = express();

let db! : DataBase;
const PORT: string | number = process.env.PORT || 8080;

async function connect() {
    try{
        await mongoose.connect(process.env.mongoUrl)
        const client = await MongoClient.connect(process.env.mongoUrl)
        db = new DataBase(client.db(backend));
        // console.log(await db.DB("articles").clearAll())
        // console.log(await db.DB("users").clearAll())
        // await db.DB("users").add({
        //     id:1,
        //     nickname:"admin",
        //     email:"admin@gmail.com",
        //     is_confirmed:false,
        //     role:"admin",
        //     password_hash:123,
        //     auth_token:123,
        //     created_at:new Date()
        // });
        // await db.DB("users").add({
        //     id:2,
        //     nickname:"user",
        //     email:"user@gmail.com",
        //     is_confirmed:false,
        //     role:"user",
        //     password_hash:123,
        //     auth_token:123,
        //     created_at:new Date()
        // });
        // await db.DB("articles").add({
        //     id:1,
        //     author_id:1,
        //     name:"Статья № 1",
        //     text:'Можно взять что-то вроде Lorem Ipsum',
        //     created_at:new Date()
        // })
        // await db.DB("articles").add({
        //     id:2,
        //     author_id:2,
        //     name:"Статья № 2",
        //     text:'Можно взять что-то вроде Lorem Ipsum',
        //     created_at:new Date()
        // })
        // console.log(await db.DB("users").getAll())
        // console.log(await db.DB("articles").getAll())
        return db
    }
    catch(e){
        throw new Error('Connect error: ' + e)
    }
}






async function App(){

await connect();

// Set Template engine to handlebars
const exphbs = exphb.create({
    layoutsDir:"views/layouts",
    defaultLayout:"layout",
    extname:"hbs",
})
app.engine("hbs",exphbs.engine)
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");


// Middleware
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

const articlesController = new ArticlesController(db);
const mainController = new MainController(db);
const commentsController = new CommentsController(db);


app.get("/",(res,req) => mainController.main(res,req))

app.get(/articles\/add/,(req,res) => articlesController.add(req,res))
app.get("/articles/:id",(req,res) => articlesController.view(req,res))
app.get("/articles/:id/edit",(req,res) => articlesController.edit(req,res))
app.put("/articles/:id/save",(req,res) => articlesController.save(req,res))
app.delete("/articles/:id/delete",(req,res) => articlesController.delete(req,res))

app.post("/articles/:id/comments",(req,res) => commentsController.add(req,res))
app.get("/comments/:id/edit",(req,res) => commentsController.edit(req,res))
app.put("/comments/:id/save",(req,res) => commentsController.save(req,res))
app.delete("/comments/:id/delete",(req,res) => commentsController.delete(req,res))


// app.get("/bye/:name",MainController.sayBye)
// Router V1
// app.use("/api", routesAPI);

// Init Express
app.use((error:Error, req:Request, res:Response, next:NextFunction) => {
    console.log(error)
    // Ошибка, выдаваемая в ответ на неправильно сформированный запрос
    res.status(400)
    res.json({text:'error'})
  })

}
App()
.then(() =>{

    app.listen(PORT, () => console.log('\x1b[33m%s\x1b[0m',`Server started on port ${PORT}\nLink - http://localhost:${PORT}`));

})