import { Router } from "express";
import { CreateCategoryController } from "./CreateCategoryController";
import { IsAuthenticated } from "../../middlewares/isAuthenticated";
import { ListCategoryController } from "./ListCategoryController";

const CategoryRouter = Router()

CategoryRouter.post('/category', IsAuthenticated, new CreateCategoryController().handle)

CategoryRouter.get('/category', IsAuthenticated, new ListCategoryController().handle)

export {CategoryRouter}