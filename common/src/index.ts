import z from "zod";

export const signupInput = z.object({
    email : z.string().email(),
    password : z.string().min(6, 'Password must be of minimum 6 length'),
    name : z.string().optional()
})

export const signinInput = z.object({
    email : z.string().email('Provide valid email'),
    password : z.string().min(6, 'Password must be of minimum 6 length')
});

export const createBlogInput = z.object({
    title : z.string(),
    content : z.string(),
})

export const updateBlogInput = z.object({
    title : z.string(),
    content : z.string(),
    published : z.boolean().optional(),
    id : z.string()
});

export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>;

