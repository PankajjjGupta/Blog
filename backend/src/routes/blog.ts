import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/utils/jwt/jwt";
import { createCssJsxDomObjects } from "hono/jsx/dom/css";
import { createBlogInput, updateBlogInput } from "@pankajgupta029/medium-common";

const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string;
        JWT_SECRET : string;
    },
    Variables : {
        userId : string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const header = c.req.header("authorization") || "";
    try {
        const token = header?.split(" ")[1];
        const user = await verify(token, c.env.JWT_SECRET);
        const userId: any = user.id;
        if(user) {
            c.set("userId", userId)
            await next()
        } else {
            c.status(403);
            return c.json({
                msg : "You are not logged in"
            })
        }
    } catch(e) {
        console.log(e);
        c.status(403);
        return c.json({
            msg : "You are not logged in"
        })
    }
})

blogRouter.post("/", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success) {
        c.status(400);
        return c.json({
            error : 'Input formats are incorrect'
        })
    }
    const authorId = c.get("userId");
    try {
        const post = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                authorId : authorId
            }
        })
        return c.json({
            msg : 'Blog posted successfully',
            blogId : post.id
        })
    }catch(e) {
        console.log(e);
        c.status(411);
        return c.json({
            error : 'Error while publishing the blog post'
        })
    }
});

blogRouter.put("/", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success) {
        c.status(400);
        return c.json({
            error : 'Input formats are incorrect'
        })
    }
    try {
        const post = await prisma.post.update({
            where : {
                id : body.id
            },
            data : {
                title : body.title,
                content : body.content,
                published : body.published
            }
        })
        return c.json({
            msg : 'Blog updated successfully',
            blogId : post.id
        })
    }catch(e) {
        console.log(e);
        c.status(411);
        return c.json({
            error : 'Error while updating the blog post'
        })
    }
});

blogRouter.get("/bulk", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.findMany({
            select : {
                title : true,
                content : true,
                id : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })
        return c.json({
            msg : 'Blogs fetched succesfully',
            blogs : post
        })
    }catch(e) {
        console.log(e);
        c.status(411);
        return c.json({
            error : 'Error while fetching the blog post'
        })
    }
});

blogRouter.get("/:id", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const id = c.req.param("id") || "";
    try {
        const post = await prisma.post.findFirst({
            where : {
                id
            },
            select : {
                title : true,
                content : true,
                id : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })
        if(!post) {
            c.status(404)
            return c.json({
                message : 'Blog not found'
            })
        }
        return c.json({
            message : 'Blog fetched successfully',
            blog : post
        })
    } catch(e) {
        console.log(e);
        c.status(411)
        return c.json({
            error : "Error while fetching the blog"
        })
    }
});



export default blogRouter;