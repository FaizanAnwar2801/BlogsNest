import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogsCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useMyBlogs } from "../hooks";

export const UserBlog = () => {
    const { loading, userBlogs } = useMyBlogs();

    if (loading) {
        return <div>
            <Appbar title={""} /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar title={"My Blogs"} />
        <div  className="flex justify-center">
            <div>
                {userBlogs.map(blog => <BlogCard 
                key= {blog.id}
                authorName={blog.author.name} 
                title={blog.title} 
                content={blog.content} 
                publishedDate={"22nd September"} 
                id={blog.id}/>)}
            </div>
        </div>
    </div>
}