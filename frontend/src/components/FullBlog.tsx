import { Blog } from "../hooks/index"
export const FullBlog = ({ blog }: { blog : Blog }) => {
    return <div className="grid grid-cols-12 gap-5 px-10 mt-10">
        <div className="col-span-12 md:col-span-8 px-10">
            <div className="font-extrabold text-4xl mb-3">
                {blog.title}
            </div>
            <div className="font-normal text-md text-slate-400 mb-5">
                Posted on 2nd Decemeber 2023
            </div>
            <div className="text-slate-600 font-medium text-md">
                {blog.content}
            </div>
        </div>
        <div className="col-span-12 md:col-span-4 px-10">
            <div className="font-medium mb-4">
                Author
            </div>
            <div className="flex">
                <div>
                    <div className="bg-slate-500 text-white font-semibold w-8 h-8 grid place-content-center rounded-full mr-3">
                        {blog.author.name ? blog.author.name[0] : "A"}
                    </div>
                </div>
                <div>
                    <div className="font-bold text-xl mb-2">
                        {blog.author.name || "Anonymous"}
                    </div>
                    <div className="text-slate-500">
                        Random catch phrase about the author to catch the user's attention
                    </div>
                </div>
            </div>
            
        </div>
    </div>
}