import { Hono } from "hono";
import { signup , signin, getUserData } from "../controllers/userController";
import { authCheck } from "../controllers/blogsController";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.get('/get-user', authCheck , getUserData)

