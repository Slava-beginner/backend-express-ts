require('dotenv').config()
import express, {
    Application,
    json,
    urlencoded
} from "express";

import exphb from "express-handlebars";
import hbs from 'hbs'
import path from 'path'

// Роутеры
import articlesRouter from './routes/articles';
import commentsRouter from './routes/comments';

// Контроллеры
import { MainController } from "./controllers/mainController";
import { UserController } from "./controllers/UserController";

// Класс для БД
import { DataBase } from "./dataBase/dataBase";


// Монга
const backend = 'backend'
const  {MongoClient}  = require('mongodb')

import mongoose from "mongoose";


const app: Application = express();

let db : DataBase; // поправил !
const PORT: string | number = process.env.PORT || 8080;

async function connect() {
    try{
        await mongoose.connect(process.env.mongoUrl)
        const client = await MongoClient.connect(process.env.mongoUrl)
        db = new DataBase(client.db(backend));

        // singleton check
        // let t = new DataBase(); 
        // console.log(t === db)

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


const mainController = new MainController(db);
const userController = new UserController(db);


app.get("/",(res,req) => mainController.main(res,req))

/**
 * Роуты для статей
 */
app.use('/articles',articlesRouter)


/**
 * Роуты для комментариев
 */
app.use('/comments',commentsRouter)



/**
 * Роуты для юзеров
 */
app.get("/users/register",(req,res) => userController.signUp(req,res))
app.post("/users/register",(req,res) => UserController.signUp(req,res))




}
App()
.then(() =>{

    app.listen(PORT, () => console.log('\x1b[33m%s\x1b[0m',`Server started on port ${PORT}\nLink - http://localhost:${PORT}`));

})