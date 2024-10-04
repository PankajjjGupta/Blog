import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@pankajgupta029/medium-common";

const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string;
        JWT_SECRET : string;
    }
}>();

userRouter.post("/signup", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success) {
      c.status(400);
      return c.json({
        error : 'Inputs formats are incorrect'
      })
    }
    try {
        const user = await prisma.user.create({
        data : {
            email : body.email,
            password : body.password,
            name : body?.name
        }
        });
        const token = await sign({id : user.id}, c.env.JWT_SECRET);
        return c.json({
        msg : 'User created successfully',  
        jwt : token
        })
    } catch(e) {
        c.status(403);
        return c.json({
        msg : 'User already exists with the email'
        })
    }
});
  
userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success) {
      c.status(400);
      return c.json({
        error : 'Inputs formats are incorrect'
      })
    }
    try {
      const user = await prisma.user.findFirst({
        where : {
          email : body.email,
          password : body.password
        }
      });
      console.log(user)
      if(!user) {
        c.status(403);
        return c.json({
          msg : 'Invalid credentials'
        })
      }
      const token = await sign({id : user.id}, c.env.JWT_SECRET);
      return c.json({
        msg : 'User signed in successfully',
        jwt : token
      })
    }catch(e) {
      console.log(e);
      c.status(411);
      c.json({
        msg : 'Invalid'
      })
    }
});

userRouter.get("/me", async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());
  try {
    const reqToken = c.req.header("Authorization")?.split(" ")[1] || "";
    const user: any = await verify(reqToken, c.env.JWT_SECRET);
    const userDetails = await prisma.user.findUnique({
      where : {
        id : user.id
      }
    })
    return c.json({
      userDetails
    })
  }catch(e) {
    console.log(e);
    c.status(403);
    return c.json({
      msg : "You are not logged in"
    })
  }
})

export default userRouter;