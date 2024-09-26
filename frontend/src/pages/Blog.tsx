// atomFamaily or selectorFamily
import { useBlog } from "../hooks"
import { Appbar } from "../components/Appbar"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useParams } from "react-router-dom"
import { FullBlog } from "../components/FullBlog";


export const Blog = () => {
    const { id } = useParams<string>();
    const { blog, loading } = useBlog({
        id: id || ""
    })

    if (loading || !blog) {
        return <div>
            <Appbar title={""} />
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    )
}