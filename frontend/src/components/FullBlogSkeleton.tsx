import { Appbar } from "./Appbar"

export const FullBlogSkeleton = () => {
    return <div>
        <Appbar />
        <div className="grid grid-cols-12 px-10 mt-10 gap-4">
        <div className="col-span-12 md:col-span-8 px-10">
            <div className="font-extrabold text-4xl mb-3">
                 <div className="h-2.5 bg-gray-200 rounded-full w-full md:w-3/4 mb-4"></div>
                 <div className="h-2.5 bg-gray-200 rounded-full w-full md:w-3/4 mb-4"></div>
            </div>
            <div className="font-normal text-md text-slate-400 mb-5">
            <div className="h-2.5 bg-gray-200 rounded- mb-4 w-1/4"></div>
            </div>
            <div className="text-slate-600 font-medium text-md mt-10">
                <div className="h-2.5 bg-gray-200 rounded-full w-full md:w-4/3 mb-4"></div>
                <div className="h-2.5 bg-gray-200 rounded-full w-full md:w-4/3 mb-4"></div>
                <div className="h-2.5 bg-gray-200 rounded-full w-full md:w-4/3 mb-4"></div>
                <div className="h-2.5 bg-gray-200 rounded-full w-full md:w-4/3 mb-4"></div>
                <div className="h-2.5 bg-gray-200 rounded-full w-full md:w-4/3 mb-4"></div>
                <div className="h-2.5 bg-gray-200 rounded-full w-full md:w-4/3 mb-4"></div>
                <div className="h-2.5 bg-gray-200 rounded-full w-full md:w-4/3 mb-4"></div>
                <div className="h-2.5 bg-gray-200 rounded-full w-full md:w-4/3 mb-4"></div>
                <div className="h-2.5 bg-gray-200 rounded-full w-full md:w-4/3 mb-4"></div>
            </div>
        </div>
        <div className="col-span-12 md:col-span-4 px-10">
            <div className="font-medium mb-4">
                <div className="h-2.5 bg-gray-200 rounded-full w-1/3 mb-4"></div>
            </div>
            <div className="flex">
                <div>
                    <div className="h-7 bg-gray-200 rounded-full w-7 mb-4"></div>
                </div>
                <div className="ml-5">
                    <div className="font-bold text-xl mb-2 ">
                        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                    </div>
                    <div className="text-slate-500">
                        <div className="h-2.5 bg-gray-200 rounded-full w-80 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full w-80 mb-4"></div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

    {/* Tailwind Skeleton */}
    
    {/* <div role="status" class="max-w-sm animate-pulse">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span class="sr-only">Loading...</span>
    </div> */}


</div>
}