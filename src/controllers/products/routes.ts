import { Router } from "express";
import { IsAuthenticated } from "../../middlewares/isAuthenticated";
import { CreateProductController } from "./CreateProductController";

import uploadConfig from '../../config/multer'
import multer from "multer";
import { ListByCategoryController } from "./ListByCategoryController";

const ProductRouter = Router()

const upload = multer(uploadConfig.upload("./tmp"))

ProductRouter.post('/product', IsAuthenticated, upload.single("file"), new CreateProductController().handle)

ProductRouter.get('/category/product', IsAuthenticated, new ListByCategoryController().handle)

export {ProductRouter}