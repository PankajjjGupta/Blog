import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton";
export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    if(loading) {
        return <>
            <Appbar />
            <div className="flex justify-center mt-10">
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </div>
        </>
    }
    return <div>
        <Appbar />
        <div className="w-5/6 mx-auto">
        <div className="mx-auto w-fit mt-10">
            {blogs.map((blog) => <BlogCard 
            id={blog.id}
            title={blog.title}
            content={blog.content}
            authorName={blog.author.name || "Anonymous"}
            publishedDate="Dec 3, 2023"
            />)}

            {/* <BlogCard 
            title="How an ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing"
            content="No need to create a fancy and modern websites with hundred of pages to make money online. - Making money online is dream for a man"
            
            publishedDate="Dec 3, 2023"
            /> */}
        </div>
    </div>
    </div>
}