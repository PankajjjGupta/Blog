import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
  const {loading, blogs} = useBlogs();

  if (loading) {
    return (
      <>
        <Appbar />
        <div className="flex justify-center mt-10">
          <div className="md:w-5/6 lg:w-2/5 mx-auto">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="md:w-5/6 lg:w-2/5 mx-auto">
        <div className="mx-auto mt-10 grid grid-cols-1 md:grid-cols-1 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              authorName={blog.author.name || "Anonymous"}
              publishedDate="Dec 3, 2023"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
