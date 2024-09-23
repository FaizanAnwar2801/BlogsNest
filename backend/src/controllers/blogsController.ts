import { createBlogInput, updateBlogInput } from "@faizancodes2808/blogsnest-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { verify } from "hono/jwt";

export async function authCheck(c: Context, next: any) {
    const authHeader = c.req.header("authorization") || "";
    try{
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id)
            await next();
        }
    }catch(e){
        c.status(403);
        return c.json({
            message: "User not logged in."
        })
    }
}

export async function createBlog(c: Context) {
    const body = await c.req.json();
    
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Incorrect Inputs."
        })
    }
    const authorId = c.get("userId")

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })
    return c.json({
        id: blog.id
    })
}

export async function updateBlog(c: Context) {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Incorrect Inputs."
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id
    })
}

export async function getBlog(c: Context) {
    const id = c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select:{
                id:true,
                title:true,
                content: true,
                author:{select:{
                    name:true,
                }
            }
        }
        })
        return c.json({
            blog
        })
    } catch (e) {
        c.status(400);
        return c.json({
            message: "Error while fetching blogpost."
        })
    }
}

// pagenation to be added.

export async function getAllBlog(c: Context) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const allBlog = await prisma.post.findMany({
        select:{
            id:true,
            title:true,
            content: true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

    return c.json({
        allBlog
    })
}

// pagenation to be added. // route not working 

export async function getUserBlog(c: Context) {
    const authorId = c.get("userId")

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const userBlog = await prisma.post.findMany({
            where: {
                authorId: authorId
            }
        })
        return c.json({
            userBlog,
        })
    } catch (e) {
        c.status(400);
        return c.json({
            message: "Error while fetching user-blogs."
        })
    }
}


export async function deleteBlog(c: Context) {
    const id = c.req.param("id");
    const authorId = c.get("userId")

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const deleteBlog = await prisma.post.delete({
            where: {
                id: id,
                authorId: authorId
            }
        })
        return c.json({
            message: "blog deleted."
        })
    } catch (e) {
        c.status(400);
        return c.json({
            message: "Error while deleting the blog."
        })
    }
}