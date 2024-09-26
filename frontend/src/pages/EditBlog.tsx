import { Appbar } from "../components/Appbar"
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL

export const EditBlog = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const { id } = useParams<string>()

    useEffect(() => {

        const fetchData = () => {

            try {
                axios.get(`${BACKEND_URL}/api/v1/blog/get-blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }).then(response => {
                    setTitle(response.data.blog.title)
                    setDescription(response.data.blog.content)
                })
            } catch (e) {
                console.error('Error fetching data:', e);
            }
        }

        fetchData();

    }, [id])

    async function onDelete() {
        const useConfirmed = window.confirm("Delete Post.")
        if (useConfirmed) {
            await axios.delete(`${BACKEND_URL}/api/v1/blog/delete-blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/user-blogs`)
        } else {
            console.log("user denied.")
            navigate(`/edit-blog/${id}`);
        }
    }


    return <div>
        <Appbar title={"Edit Blog"} />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }} type="text" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Title" />

                <TextEditor value={description} onChange={(e) => {
                    setDescription(e.target.value)
                }} />
                <div className="flex space-x-5">
                    <button onClick={async () => {
                        const response = await axios.put(`${BACKEND_URL}/api/v1/blog/update-blog/${id}`, {
                            title,
                            content: description
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        });
                        navigate(`/get-blog/${response.data.id}`)
                    }} type="submit"
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Update post
                    </button>
                    <button onClick={onDelete}
                        type="submit"
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800 hover:bg-red-700 ">
                        Delete post
                    </button>
                </div>
            </div>
        </div>
    </div>
}


function TextEditor({ value, onChange }: { value: (string), onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
                <div className="my-2 bg-white rounded-b-lg w-full">
                    <label className="sr-only">Publish post</label>
                    <textarea value={value}
                        onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
                </div>
            </div>
        </div>
    </div>

}