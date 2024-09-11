import { Hono } from "hono";
import {verify } from "hono/jwt";
import { 
    createBlog,
    updateBlog,
    getBlog,
    getUserBlog,
    deleteBlog,
    getAllBlog,
    authCheck
} from "../controllers/blogsController";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }, 
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", authCheck);

blogRouter.post('/create-blog', createBlog);
blogRouter.put('/update-blog/:id', updateBlog);
blogRouter.get('/blog/:id', getBlog);
blogRouter.get('/user-blog', getUserBlog);
blogRouter.delete('/post/:id', deleteBlog);
blogRouter.get('/all-blog', getAllBlog);









