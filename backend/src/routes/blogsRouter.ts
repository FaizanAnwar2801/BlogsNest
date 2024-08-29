import { Hono } from "hono";
import { 
    createBlog,
    updateBlog,
    getBlog,
    getUserBlog,
    deleteBlog,
    getAllBlog
} from "../controllers/blogsController";


export const blogRouter = new Hono();

blogRouter.post('/create-blog', createBlog);
blogRouter.put('/update-blog/:id', updateBlog);
blogRouter.get('/blog/:id', getBlog);
blogRouter.get('/user-blog', getUserBlog);
blogRouter.delete('/post/:id', deleteBlog);
blogRouter.get('/all-blog', getAllBlog);









