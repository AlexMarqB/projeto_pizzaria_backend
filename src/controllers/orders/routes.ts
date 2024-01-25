import { Router } from "express";
import { CreateOrderController } from "./CreateOrderController";
import { IsAuthenticated } from "../../middlewares/isAuthenticated";
import { RemoveOrderController } from "./RemoveOrderController";
import { AddItemController } from "./AddItemController";
import { RemoveItemController } from "./RemoveItemController";
import { SendOrderController } from "./SendOrderController";
import { ListOrderController } from "./ListOrderController";
import { ListFinishedByTableController } from "./ListFinishedByTableController";
import { DetailOrderController } from "./DetailOrderController";
import { FinishOrderController } from "./FinishOrderController";

const OrderRouter = Router()

OrderRouter.post('/order', IsAuthenticated, new CreateOrderController().handle)

OrderRouter.delete('/order', IsAuthenticated, new RemoveOrderController().handle)

OrderRouter.post('/order/add', IsAuthenticated, new AddItemController().handle)

OrderRouter.delete('/order/remove', IsAuthenticated, new RemoveItemController().handle)

OrderRouter.put('/order/send', IsAuthenticated, new SendOrderController().handle)

OrderRouter.get('/order', IsAuthenticated, new ListOrderController().handle)

OrderRouter.get('/order/table', IsAuthenticated, new ListFinishedByTableController().handle)

OrderRouter.get('/order/detail', IsAuthenticated, new DetailOrderController().handle)

OrderRouter.put('/order/finish', IsAuthenticated, new FinishOrderController().handle)


export { OrderRouter }