import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogsCard"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import axios from "axios"

export const FullBlog = ({ blog }: { blog: Blog }) => {
    const navigate = useNavigate();

    function getUserId() {
        const token = localStorage.getItem("token")
        if (!token) return null

        try {
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) return null
            const payload = tokenParts[1];
            const Decoded = JSON.parse(atob(payload))

            return Decoded.id || null;
        } catch (e) {
            console.log("failed to parse token.", e)
            return null
        }
    }

    async function onDelete() {
        const useConfirmed = window.confirm("Delete Post.")
        if (useConfirmed) {
            await axios.delete(`${BACKEND_URL}/api/v1/blog/delete-blog/${blog.id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/user-blogs`)
        } else {
            console.log("user denied.")
            navigate(`/user-blogs`);
        }
    }

    const authorVal = blog.author.id;
    const userVal = getUserId() || "";
    console.log(userVal)


    return <div>
        <Appbar title={""} />
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
                            <Avatar size="small" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-lg font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="flex justify-between pt-2 text-m text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                            {authorVal === userVal && (
                                <div className="flex justify-items-center pt-10">
                                    <Link to={`/edit-blog/${blog.id}`}>
                                        <button type="button"
                                            className="mr-4 text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                                            Edit
                                        </button>
                                    </Link>
                                    <button onClick={onDelete} className="mr-4 text-white bg-rose-600 hover:bg-red-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


