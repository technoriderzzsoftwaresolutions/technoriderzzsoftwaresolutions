import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Clock, Share2, Tag, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  thumbnail: string;
  tags: string[];

  createdAt: string;
}

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    
    // Fetch current blog
    fetch(`${API_URL}/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog details:", err);
        setLoading(false);
      });

    // Fetch popular blogs for sidebar
    fetch(`${API_URL}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        setPopularBlogs(data.slice(0, 5));
      })
      .catch(err => console.error(err));

  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
          <Link to="/blogs" className="text-primary hover:underline">Back to Blogs</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h1 className="text-2xl md:text-4xl font-bold mb-2 uppercase tracking-wide">
             {blog.title}
           </h1>
           <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold">
             Market Analysis
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 lg:flex gap-12">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <div className="rounded-xl overflow-hidden mb-8 shadow-lg">
            <img
              src={blog.thumbnail || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80"}
              alt={blog.title}

              className="w-full h-auto"
            />
          </div>

          <div className="prose prose-slate max-w-none">
            <div 
              className="text-gray-700 leading-relaxed text-base space-y-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              {blog.tags.map((tag, i) => (
                <span key={i} className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium">#{tag}</span>
              ))}
            </div>
            <div className="flex gap-4">
              <button className="text-gray-400 hover:text-primary transition-colors"><Share2 size={20} /></button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 mt-12 lg:mt-0">
          <div className="sticky top-24">
            <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h3 className="font-bold text-gray-800 uppercase text-sm tracking-widest">Popular Posts</h3>
              </div>
              <div className="divide-y">
                {popularBlogs.map((pBlog) => (
                  <Link 
                    key={pBlog._id} 
                    to={`/blogs/${pBlog._id}`}
                    className="flex gap-4 p-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                       <img src={pBlog.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>

                    <div className="flex-1">
                       <h4 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-primary transition-colors">{pBlog.title}</h4>
                       <p className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">{new Date(pBlog.createdAt).toLocaleDateString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Banner Placeholder */}
            <div className="mt-8 rounded-xl overflow-hidden relative group cursor-pointer shadow-md">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" alt="Ad" className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                <div className="text-white">
                   <h4 className="font-bold mb-2">Join Our Training</h4>
                   <p className="text-sm mb-4">Master Full Stack Development with Industry Experts</p>
                   <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">Apply Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

const Button = ({ children, className, variant, size, ...props }: any) => (
  <button 
    className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${
      variant === 'outline' ? 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/90'
    } ${size === 'sm' ? 'h-9 px-3 text-xs' : 'h-10 px-4 py-2'} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default BlogDetails;
