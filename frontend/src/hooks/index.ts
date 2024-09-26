import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL
export interface Blog {
    "id": string,
    "title": string,
    "content": string,
    "author": {
        "name": string,
        "id": string
    }
}

/********************************************* Hook for blog by id ****************************************************/


export const useBlog = ({ id }: { id: string }) => {

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        try {
            axios.get(`${BACKEND_URL}/api/v1/blog/get-blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(response => {
                setBlog(response.data.blog)
                setLoading(false)
            })
        } catch (e) {
            console.error('Error fetching data:', e);
        }

    }, [id])

    return {
        loading,
        blog
    }
}

/***************************************** Hook for all blogs and loading **********************************************/

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [allBlog, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        try {
            axios.get(`${BACKEND_URL}/api/v1/blog/get-all-blog`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(response => {
                setBlogs(response.data.allBlog)
                setLoading(false)
            })
        } catch (e) {
            console.error('Error fetching data:', e);
        }

    }, [])

    return {
        loading,
        allBlog
    }
}

/***************************************** Hook for user blogs and loading ************************************************/

export const useMyBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [userBlogs, setuserBlogs] = useState<Blog[]>([])

    useEffect(() => {
        try {
            axios.get(`${BACKEND_URL}/api/v1/blog/user-blog`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(response => {
                setuserBlogs(response.data.userBlog)
                setLoading(false)
            })
        } catch (e) {
            console.error('Error fetching data:', e);
        }

    }, [])

    return {
        loading,
        userBlogs
    }
}
