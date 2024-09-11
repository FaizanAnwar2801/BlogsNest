import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { verify } from "hono/jwt";

export async function authCheck(c:Context , next:any){
    const authHeader = c.req.header("authorization")||"";
    const user = await verify(authHeader,c.env.JWT_SECRET);
    if(user){
        c.set("userId", user.id)
        next();
    }
}

export async function createBlog(c: Context) {
    const body = await c.req.json();
    const authorId = c.get("userId")

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId
        }
    })
    return c.json({
        id:blog.id
    })
}

export async function updateBlog(c: Context) {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content,
        }
    })

    return c.json({
        id:blog.id
    })
}

export async function getBlog(c: Context) {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.post.findFirst({
            where:{
                id:body.id
            }
        })
        return c.json({
        blog
        })
    }catch(e){
        c.status(400);
        return c.json({
        message:"Error while fetching blogpost."
    })
}
}

// pagenation to be added.

export async function getAllBlog(c: Context) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const allBlog = await prisma.post.findMany();

    return c.json({
        allBlog
    })
}

// pagenation to be added.

export async function getUserBlog(c: Context) {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const userBlog = await prisma.post.findMany({
            where:{
                id:body.id
            }
        })
        return c.json({
            userBlog
        })
    }catch(e){
        c.status(400);
        return c.json({
            message: "Error while fetching user-blogs."
        })
    }
}

// Route to be improved.

export async function deleteBlog(c: Context) {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const deleteBlog = prisma.post.delete({
        where:{
            id:body.id
        }
    })
}