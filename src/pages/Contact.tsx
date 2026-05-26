import React, { useState } from "react"; // Added useState
import Layout from "@/components/layout/Layout";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  // --- GOOGLE SHEETS LOGIC ---
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Splitting Full Name into First and Last for your Google Script
    const nameParts = formData.fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "-";

    const payload = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    };

    try {
      // 1. Send to local backend
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const backendRes = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(err => {
        throw new Error("Backend server is not running on port 5000. Please start your backend server.");
      });

      if (backendRes && !backendRes.ok) {
        throw new Error("Backend server returned an error: " + backendRes.statusText);
      }

      // 2. Send to Google Sheets (Original logic)
      const googlePayload = {
        firstName: formData.fullName.split(" ")[0],
        lastName: formData.fullName.split(" ").slice(1).join(" ") || "-",
        ...payload
      };
      
      await fetch("https://script.google.com/macros/s/AKfycby9imzdvLD7MKOSs6zeBTJnhAxuoyCeGIFdj5FqxAlhIrjArzm1AGWTFNIlb8yEIAYr/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(googlePayload),
      }).catch(err => {
        throw new Error("Failed to send data to Google Sheets.");
      });

      alert("Thank you! Your message has been sent successfully.");
      setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      alert(`Error submitting form: ${error.message}`);
    } finally {

      setIsSubmitting(false);
    }
  };
  // --- END LOGIC ---

  const contactInfo = [
    { 
      icon: MapPin, 
      label: "Our Office", 
      value: "16-11-469/27, Beside State Bank of India, SBI Colony, Moosarambagh, Hyderabad - 500036, Telangana" 
    },
    { 
      icon: Phone, 
      label: "Call Us", 
      value: "+91 83408 19112" 
    },
    { 
      icon: Mail, 
      label: "Email Us", 
      value: "technoriderzzsoftwaresolutions@gmail.com" 
    },
    { 
      icon: Clock, 
      label: "Working Hours", 
      value: "Mon - Sat: 9:00 AM - 7:00 PM" 
    },
  ];

  const socials = [
    { icon: Instagram, label: "Instagram", link: "#", handle: "techno_riderzz" },
    { icon: Facebook, label: "Facebook", link: "#", handle: "Technoriderzz Software Solutions" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Connect</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Ready to start your journey with Techno Riderzz? Reach out for projects, training, or consultations.
          </p>
        </div>
      </div>

      <div className="container py-16 md:-mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{item.label}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t">
                <h3 className="font-bold text-slate-900 mb-4">Follow Our Updates</h3>
                <div className="flex flex-col gap-3">
                  {socials.map((social, idx) => (
                    <a 
                      key={idx} 
                      href={social.link} 
                      className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors"
                    >
                      <social.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{social.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Map Embed */}
            <div className="rounded-2xl overflow-hidden border h-80 shadow-sm">
              <iframe
                title="Techno Riderzz Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.8285519391515!2d78.508535!3d17.371991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb984186000001%3A0x6a0a0972c83f3e0c!2sMoosarambagh%2C%20Hyderabad%2C%20Telangana%20500036!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white border rounded-2xl p-8 md:p-12 shadow-xl order-1 lg:order-2">
            <h2 className="text-3xl font-bold mb-2">Send us a Message</h2>
            <p className="text-slate-500 mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                <Input 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Pooja Mishra" 
                  className="rounded-lg border-slate-200 focus:ring-primary" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                <Input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@company.com" 
                  className="rounded-lg border-slate-200" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                <Input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 83408 19112" 
                  className="rounded-lg border-slate-200" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Service Required</label>
                <Input 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Project" 
                  className="rounded-lg border-slate-200" 
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Your Message</label>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements or questions..."
                  className="rounded-lg border-slate-200 min-h-[150px]"
                />
              </div>
              <div className="md:col-span-2">
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry Now"}
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Contact;