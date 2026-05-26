import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Tag, X, Phone, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface Blog {

  _id: string;
  title: string;
  content: string;
  author: string;
  thumbnail: string;
  tags: string[];

  createdAt: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "", email: "", phone: "", subject: "General Enquiry", message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);



  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    fetch(`${API_URL}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });

    // Popup logic: Show every 5 seconds if not already shown
    const interval = setInterval(() => {
      setShowPopup((prev) => {
        if (prev) return prev; // If already shown, don't do anything
        return true;
      });
    }, 10000);


    return () => clearInterval(interval);
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-slate-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1920&q=80" 
          alt="Blog Hero" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
            Our Latest Blogs
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Insights, Stories & Updates
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-20">
        {blogs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <p className="text-gray-500 text-xl font-medium">No blogs published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <div
                key={blog._id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={blog.thumbnail || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"}
                    alt={blog.title}

                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    {blog.tags && blog.tags[0] && (
                      <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                        {blog.tags[0]}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-black/70 backdrop-blur-sm text-white text-[10px] p-2 rounded flex flex-col items-center leading-none">
                       <span className="font-bold">{new Date(blog.createdAt).getDate()}</span>
                       <span className="uppercase text-[8px]">{new Date(blog.createdAt).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-lg font-bold mb-3 text-slate-800 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {blog.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {blog.content.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
                    >
                      READ MORE <ArrowRight size={14} strokeWidth={3} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recurring Enquiry Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 transition-colors"
            >
              <X size={18} strokeWidth={3} />
            </button>

            {/* Left Side: Image & Text */}
            <div className="md:w-5/12 bg-primary relative overflow-hidden flex flex-col justify-end p-8 min-h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                alt="Enquiry" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-60"
              />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  Become Future Ready <br /> 
                  <span className="text-white">Software Developer</span> <br />
                  with <span className="bg-white text-primary px-2 py-1 rounded inline-block mt-1">AI Skills</span>
                </h3>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="md:w-7/12 p-8 md:p-12">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 uppercase tracking-tight">
                Send us a <span className="text-primary">Message</span>
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form 
                className="space-y-4" 
                onSubmit={async (e) => { 
                  e.preventDefault(); 
                  setIsSubmitting(true);
                  try {
                    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
                    const res = await fetch(`${API_URL}/contact`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(enquiryForm),
                    });
                    if (res.ok) {
                      toast.success("Message sent! We will contact you soon.");
                      setShowPopup(false);
                      setEnquiryForm({ name: "", email: "", phone: "", subject: "General Enquiry", message: "" });
                    }
                  } catch (err) {
                    toast.error("Failed to send message.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Pooja Mishra" 
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({...enquiryForm, name: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="name@company.com" 
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({...enquiryForm, email: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 83408 19112" 
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({...enquiryForm, phone: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Service Required</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Full Stack Project" 
                      value={enquiryForm.subject}
                      onChange={(e) => setEnquiryForm({...enquiryForm, subject: e.target.value})}
                      className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Your Message</label>
                  <textarea 
                    placeholder="Tell us about your requirements or questions..." 
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({...enquiryForm, message: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm min-h-[100px]"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#f1b400] hover:bg-[#d49e00] text-slate-900 font-bold py-3.5 rounded-lg shadow-lg transition-all mt-4 uppercase tracking-wider text-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry Now"}
                </button>
              </form>
            </div>


          </div>
        </div>
      )}

    </div>
  );
};


export default Blogs;
