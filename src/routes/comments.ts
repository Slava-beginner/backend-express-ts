import { Router } from "express";
import { CommentsController } from "../controllers/CommentsControllers";
import { DataBase } from "../dataBase/dataBase";

const router = Router();

const commentsController = new CommentsController(new DataBase());


router.get("/:id/edit",(req,res) => commentsController.edit(req,res))
router.put("/:id/save",(req,res) => commentsController.save(req,res))
router.delete("/:id/delete",(req,res) => commentsController.delete(req,res))

export default router