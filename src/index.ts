import express, {
    Application,
    json,
    Request,
    Response,
    urlencoded
} from "express";
import exphb from "express-handlebars";
import hbs from 'hbs'
import path from 'path'
import routesAPI from "./api/routes";



import { MainController } from "./controllers/mainController";
import { DataBase } from "./dataBase";
import { getRandomId } from "./utils/utils";

const  {MongoClient}  = require('mongodb')

const app: Application = express();

async function start() {
    try{
        const client = await MongoClient.connect("mongodb+srv://slava:break2015@cluster0.6mcua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
       const db = new DataBase(client.db('backend').collection('users'))
        console.log(await db.getDb())
       
    }
    catch(e){
        throw new Error('Connect error: ' + e)
    }
}


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
// Check API Health / Ping
// app.get("/", (req: Request, res: Response) => {
//     return res.send("OK");
// });
app.get("/",MainController.main)

// app.get("/home", (req: Request, res: Response) => {
//     return res.render("home", {
//         contohText: "Lorem Ipsum mas bro",
//         title: "Express Typescript",
//         link:"home"
//     });
// });

// app.get("/bye/:name",MainController.sayBye)
// Router V1
app.use("/api", routesAPI);

// Init Express
const PORT: string | number = process.env.PORT || 8080;
start()
.then(() =>{

    app.listen(PORT, () => console.log('\x1b[33m%s\x1b[0m',`Server started on port ${PORT}\nLink - http://localhost:${PORT}`));

})


