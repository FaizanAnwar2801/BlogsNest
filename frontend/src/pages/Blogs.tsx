import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogsCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, allBlog } = useBlogs();

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
        <Appbar title={"Explore"} />
        <div  className="flex justify-center">
            <div>
                {allBlog.map(blog => <BlogCard 
                key= {blog.id}
                authorName={blog.author.name} 
                title={blog.title} 
                content={blog.content} 
                publishedDate={new Date(blog.date).toDateString()} 
                id={blog.id}/>)}
            </div>
        </div>
    </div>
}