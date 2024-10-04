export const BlogSkeleton = () => {
    return <div role="status" className="w-full mx-auto animate-pulse mb-10">
        <div className="flex items-center">
            <div className="h-7 w-7 rounded-full bg-gray-200 mb-4"></div>
            <div className="ml-5 h-2.5 bg-gray-200 rounded-full w-32 mb-4"></div>
            <div className="ml-5 h-2.5 bg-gray-200 rounded-full w-32 mb-4"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full w-24 mb-2.5"></div>
        <span className="sr-only">Loading...</span>
    </div>
}

{/* <div>
<div className="flex items-center">
<div className="font-medium bg-slate-300 mr-4 rounded-full h-7 w-7 text-xs grid place-content-center">
    {authorName[0]}
</div>
<div className="flex">
    <div className="text-md mr-3 font-medium">
        {authorName}
    </div>
    <div className="text-slate-400 flex items-center">
        <div className="h-1 w-1 rounded-full bg-slate-300 mx-2">

        </div>
        <div>
            {publishedDate}
        </div>
    </div>
</div>
</div>
</div>
<div className="mt-3">
<div className="font-bold text-2xl mb-3">
    {title}
</div>
<div className="text-lg">
    {content.length > 100 ? (content.slice(0, 100) + "...") : content}
</div>
</div>
<div className="mt-2">
{Math.ceil(contentWordLength / 200)} minute(s) Read
</div> */}