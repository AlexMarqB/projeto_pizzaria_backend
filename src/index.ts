import express, { NextFunction, Request, Response, json } from "express";
import 'express-async-errors'
import { app } from "./app";
import { ErrorHandler } from "./middlewares/errorHandler";
import cors from 'cors'
import path from "path";
import { UserRouter } from "./controllers/user/routes";
import { CategoryRouter } from "./controllers/category/routes";
import { ProductRouter } from "./controllers/products/routes";
import { OrderRouter } from "./controllers/orders/routes";

app.use(json())
app.use(cors())

app.use(UserRouter)
app.use(CategoryRouter)
app.use(ProductRouter)
app.use(OrderRouter)

//rota statica que resgata fotos da pasta tmp permitindo uso no front end -> a rota se torna /files/""
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp'))) 

//caso seja preciso retornar um throw error ele será tratado sem crashar a applicação
app.use((err:Error, req:Request, res:Response, next:NextFunction) => ErrorHandler(err, req, res, next))
app.listen(3333, () => {
    console.log("Server up and running 🚀🚀")
})