import { Router } from "express";
import { CreateUserController } from "./CreateUserController";
import { AuthUserController } from "./AuthUserController";
import { DetailUserController } from "./DetailUserController";
import { IsAuthenticated } from "../../middlewares/isAuthenticated";

const UserRouter = Router()

UserRouter.post('/users', new CreateUserController().handle)

UserRouter.post('/auth', new AuthUserController().handle)

UserRouter.get('/me', IsAuthenticated, new DetailUserController().handle)

export {UserRouter}