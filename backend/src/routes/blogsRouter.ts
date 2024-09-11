import { Hono } from "hono";
import { verify } from "hono/jwt";
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

blogRouter.post('/create-blog', createBlog);  // working
blogRouter.put('/update-blog', updateBlog);  // working
blogRouter.get('/get-blog/:id', getBlog);   // working
blogRouter.get('/user-blog', getUserBlog); //working
blogRouter.delete('/delete-blog/:id', deleteBlog); // logic is fine , deleteion not working.
blogRouter.get('/get-all-blog', getAllBlog); // working









