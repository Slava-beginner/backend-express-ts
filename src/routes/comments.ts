import { Router } from "express";
import { CommentsController } from "../controllers/CommentsControllers";
import { DataBase } from "../dataBase/dataBase";

const router = Router();

const commentsController = new CommentsController(new DataBase());


router.get("/:id/edit",(req,res,next) => commentsController.edit(req,res,next))
router.put("/:id/save",(req,res,next) => commentsController.save(req,res,next))
router.delete("/:id/delete",(req,res,next) => commentsController.delete(req,res,next))

export default router