import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { sign } from "hono/jwt";

enum StatusCode {
    BADREQ = 400,
    NOTFOUND = 404,
    NOTPERMISSION = 403,
}

export async function signup(c: Context) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try{
        const user = prisma.user.create({
            data:{
                email: body.email,
                password: body.password
            }
        });
        const jwt = await sign({id: user.id},c.env.JWT_SECRET);
        return c.json({jwt});
    }
    catch(e){
        c.status(StatusCode.NOTPERMISSION)
        return c.json({error:"eroor while signing up"});
    }
}

export async function signin(c: Context) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	});

	if (!user) {
		c.status(StatusCode.NOTFOUND);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
}