import { Router } from "express";
import { ArticlesController } from "../controllers/ArticlesController";
import { CommentsController } from "../controllers/CommentsControllers";
import { DataBase } from "../dataBase/dataBase";

const router = Router();




const articlesController = new ArticlesController(new DataBase());
const commentsController = new CommentsController(new DataBase());



router.get(/\/add/,(req,res) => articlesController.add(req,res));

router.get("/:id",(req,res) => articlesController.view(req,res));

router.get("/:id/edit",(req,res) => articlesController.edit(req,res));

router.put("/:id/save",(req,res) => articlesController.save(req,res));

router.delete("/:id/delete",(req,res) => articlesController.delete(req,res));

router.post("/:id/comments",(req,res) => commentsController.add(req,res));

export default router