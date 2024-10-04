import { Link } from "react-router-dom";

interface BlogProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogProps) => {
  const contentWordLength = content.split(" ").length;

  return (
    <Link to={`/blog/${id}`} className="block w-full">
      <div className="max-w-full mb-10 pb-10 px-4 border-b-2 cursor-pointer transition-transform duration-300 hover:scale-105">
        <div className="flex items-center">
          <div className="font-medium bg-slate-300 mr-4 rounded-full h-7 w-7 text-xs grid place-content-center">
            {authorName[0]}
          </div>
          <div className="flex">
            <div className="text-md mr-3 font-medium">{authorName}</div>
            <div className="text-slate-400 flex items-center">
              <div className="h-1 w-1 rounded-full bg-slate-300 mx-2"></div>
              <div>{publishedDate}</div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="font-bold text-xl md:text-2xl mb-3">{title}</div>
          <div className="text-sm md:text-lg">
            {content.length > 100 ? content.slice(0, 100) + "..." : content}
          </div>
        </div>

        <div className="mt-2 text-sm md:text-base">
          {Math.ceil(contentWordLength / 200)} minute(s) Read
        </div>
      </div>
    </Link>
  );
};
