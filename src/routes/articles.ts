import { Router } from "express";
import { ArticlesController } from "../controllers/ArticlesController";
import { CommentsController } from "../controllers/CommentsControllers";
import { DataBase } from "../dataBase/dataBase";

const router = Router();




const articlesController = new ArticlesController(new DataBase());
const commentsController = new CommentsController(new DataBase());



router.get(/\/add/,(req,res) => articlesController.add(req,res));

router.get("/:id",(req,res,next) => articlesController.view(req,res,next));

router.get("/:id/edit",(req,res,next) => articlesController.edit(req,res,next));

router.put("/:id/save",(req,res,next) => articlesController.save(req,res,next));

router.delete("/:id/delete",(req,res,next) => articlesController.delete(req,res,next));

router.post("/:id/comments",(req,res) => commentsController.add(req,res));


export default router