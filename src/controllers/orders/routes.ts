import { Router } from "express";
import { CreateOrderController } from "./CreateOrderController";
import { IsAuthenticated } from "../../middlewares/isAuthenticated";
import { RemoveOrderController } from "./RemoveOrderController";
import { AddItemController } from "./AddItemController";

const OrderRouter = Router()

OrderRouter.post('/order', IsAuthenticated, new CreateOrderController().handle)

OrderRouter.delete('/order', IsAuthenticated, new RemoveOrderController().handle)

OrderRouter.post('/order/add', IsAuthenticated, new AddItemController().handle)

export { OrderRouter }