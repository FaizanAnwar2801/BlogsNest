import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogsCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 pl-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-9">
                    <div className="text-5xl font-bold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd December 2023
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-3">
                    <div className=" flex justify-around text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className=" pt-3 pr-4 flex flex-col justify-start">
                            <Avatar size= "small" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-lg font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="flex justify-between pt-2 text-m text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
}