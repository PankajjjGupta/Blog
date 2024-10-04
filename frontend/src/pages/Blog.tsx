import { Appbar } from "../components/Appbar"
import { FullBlog } from "../components/FullBlog"
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({id : id || ""});
    if(loading) {
        return <FullBlogSkeleton />
    }
    return <div>
        <Appbar />
        {
            blog ? 
            <FullBlog blog={blog}/> :
            null
        }
    </div>
}