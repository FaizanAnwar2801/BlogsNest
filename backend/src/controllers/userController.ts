import { signupInput, signinInput } from "@faizancodes2808/blogsnest-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { jwt, sign } from "hono/jwt";




/********************************************Sign-up Route***************************************************/

export async function signup(c: Context) {
    const body = await c.req.json();

    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Incorrect Inputs."
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,

            }
        })
        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET);

        return c.text(jwt)
    } catch (e) {
        console.log(e);
        c.status(411);
        return c.text('Invalid')
    }
}

/********************************************Sign-in Route***************************************************/

export async function signin(c: Context) {
    const body = await c.req.json();

    const { success } = signinInput.safeParse(body);
    if (!success) {
        console.log("zod error")
        c.status(411);
        return c.json({
            message: "Incorrect inputs."
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password,
            }
        })
        if (!user) {
            c.status(403);
            return c.json({
                message: "Incorrect credentials"
            })
        }
        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET);

        return c.text(jwt)
    } catch (e) {
        console.log(e);
        c.status(411);
        return c.text('Invalid')
    }
}

/******************************************************************************************************************/

export async function getUserData(c: Context) {
    const userId = c.get("userId")

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const userData = await prisma.user.findUnique({
            where:{
                id : userId
            },select:{
                id:true,
                name:true,
                email:true
            }
        })
        
        return c.json({
            userData
        })
    }catch(e){
        c.status(400);
        return c.json({
            message: "Error while fetching user data."
        })
    }
}
