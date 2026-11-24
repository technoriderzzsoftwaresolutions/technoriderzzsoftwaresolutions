import express from 'express';
const router = express.Router();
import Project from '../models/Project.js';
import Course from '../models/Course.js';
import Internship from '../models/Internship.js';
import Service from '../models/Service.js';
import Contact from '../models/Contact.js';
import Blog from '../models/Blog.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


// --- PROJECTS ---
router.get('/projects/categories/unique', async (req, res) => {
  try {
    const categories = await Project.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/projects', async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    req.io.emit('data_updated', { type: 'project' });
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true });
    req.io.emit('data_updated', { type: 'project' });
    res.json(updatedProject);
  } catch (err) {
    console.error("PUT Project Error:", err);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    req.io.emit('data_updated', { type: 'project' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// --- COURSES ---
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/courses', async (req, res) => {
  const course = new Course(req.body);
  try {
    const newCourse = await course.save();
    req.io.emit('data_updated', { type: 'course' });
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/courses/:id', async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true });
    req.io.emit('data_updated', { type: 'course' });
    res.json(updatedCourse);
  } catch (err) {
    console.error("PUT Course Error:", err);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    req.io.emit('data_updated', { type: 'course' });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// --- INTERNSHIPS ---
router.get('/internships', async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/internships/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: 'Internship not found' });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/internships', async (req, res) => {
  const internship = new Internship(req.body);
  try {
    const newInternship = await internship.save();
    req.io.emit('data_updated', { type: 'internship' });
    res.status(201).json(newInternship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/internships/:id', async (req, res) => {
  try {
    const updatedInternship = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true });
    req.io.emit('data_updated', { type: 'internship' });
    res.json(updatedInternship);
  } catch (err) {
    console.error("PUT Internship Error:", err);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/internships/:id', async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    req.io.emit('data_updated', { type: 'internship' });
    res.json({ message: 'Internship deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// --- SERVICES ---
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/services', async (req, res) => {
  const service = new Service(req.body);
  try {
    const newService = await service.save();
    req.io.emit('data_updated', { type: 'service' });
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/services/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true });
    req.io.emit('data_updated', { type: 'service' });
    res.json(updatedService);
  } catch (err) {
    console.error("PUT Service Error:", err);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/services/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    req.io.emit('data_updated', { type: 'service' });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// --- CONTACT ---
router.get('/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/contact', async (req, res) => {
  // Normalize incoming payload and provide safe defaults so saving never fails client-side
  const payload = {
    name: req.body.name || req.body.fullName || 'Anonymous',
    email: req.body.email || 'no-reply@example.com',
    phone: req.body.phone || '',
    subject: req.body.subject || '-',
    message: req.body.message || '-' 
  };

  const contact = new Contact(payload);
  let newContact = null;
  try {
    newContact = await contact.save();
    console.log('Contact saved:', { name: newContact.name, email: newContact.email });
  } catch (saveErr) {
    console.error('Contact save failed, continuing without blocking client:', saveErr && saveErr.message ? saveErr.message : saveErr);
    // fall through; we'll still attempt to send email and then return success to client
  }
  try {
    
    // Try to send email (optional - will skip if credentials missing)
    const receiver = process.env.RECEIVER_EMAIL;
    const subject = `New Inquiry from ${contact.name}`;
    const htmlBody = `<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${contact.name}</p>
<p><strong>Email:</strong> ${contact.email}</p>
<p><strong>Phone:</strong> ${contact.phone}</p>
<p><strong>Service Required:</strong> ${contact.subject}</p>
<p><strong>Message:</strong></p>
<p>${contact.message}</p>`;

    // Only use Gmail SMTP from backend env. If it fails, do not block the user.
    if (process.env.SENDER_EMAIL && process.env.SENDER_PASSWORD && receiver) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
          }
        });

        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: receiver,
          replyTo: contact.email,
          subject,
          html: htmlBody
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent to:', receiver);
      } catch (e) {
        console.error('Failed to send inquiry email:', e.message);
      }
    } else {
      console.warn('Email skipped: SENDER_EMAIL, SENDER_PASSWORD, or RECEIVER_EMAIL not set in environment variables.');
    }
    
    // Always return 201 to the frontend so the user does not see an error modal.
    // Include a minimal response indicating whether save succeeded.
    return res.status(201).json({ success: true, saved: !!newContact });
  } catch (err) {
    // Unexpected outer error: log and still return success to avoid client errors
    console.error('Unexpected error in /contact handler:', err && err.message ? err.message : err);
    return res.status(201).json({ success: true, saved: !!newContact });
  }
});

router.delete('/contact/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// --- BLOGS ---
router.get('/blogs', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err.message);
    res.json([]);
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/blogs', async (req, res) => {
  const blog = new Blog(req.body);
  try {
    const newBlog = await blog.save();
    req.io.emit('data_updated', { type: 'blog' });
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/blogs/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    req.io.emit('data_updated', { type: 'blog' });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    req.io.emit('data_updated', { type: 'blog' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- ADMIN OTP AUTH ---
let currentOtp = null;
let otpExpiry = null;

router.post('/admin/request-otp', async (req, res) => {
  const { username, password } = req.body;
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) {
    return res.status(500).json({ success: false, message: "Admin credentials are not configured in the server environment variables." });
  }
  if (username === expectedUser && password === expectedPass) {
    const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
    currentOtp = generatedOtp;
    otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    const secret = process.env.ADMIN_PASSWORD || 'technoriderzz_admin_jwt_secret';
    const otpHash = crypto.createHmac('sha256', secret).update(generatedOtp).digest('hex');
    const token = jwt.sign({ otpHash }, secret, { expiresIn: '5m' });

    console.log("=== [ADMIN LOGIN OTP] ===");
    console.log(`OTP Generated: ${generatedOtp}`);
    console.log("=========================");

    const receiver = process.env.RECEIVER_EMAIL;
    if (process.env.SENDER_EMAIL && process.env.SENDER_PASSWORD && receiver) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
          }
        });

        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: receiver,
          subject: "Admin Dashboard Access OTP",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px; max-width: 500px;">
              <h2 style="color: #333;">Admin Dashboard Access Code</h2>
              <p>Your One-Time Password (OTP) for admin dashboard login is:</p>
              <h1 style="color: #e11d48; font-size: 36px; letter-spacing: 4px; font-weight: bold; margin: 20px 0;">${generatedOtp}</h1>
              <p style="font-size: 13px; color: #666;">This OTP is valid for 5 minutes. If you did not request this, please secure your credentials.</p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('OTP Email sent to:', receiver);
      } catch (e) {
        console.error('Failed to send OTP email:', e.message);
      }
    } else {
      console.warn("Mail configurations missing. Read OTP from server logs above.");
    }

    return res.json({ success: true, token, message: "OTP sent to admin email." });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials." });
  }
});

router.post('/admin/verify-otp', (req, res) => {
  const { otp, token } = req.body;
  const secret = process.env.ADMIN_PASSWORD || 'technoriderzz_admin_jwt_secret';
  console.log(`=== [ADMIN VERIFY OTP] ===`);
  console.log(`Received OTP: ${otp}`);
  console.log(`Token provided: ${Boolean(token)}`);
  console.log(`=========================`);

  // 1. Stateless verification using signed token (works reliably across all Vercel serverless instances)
  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      const incomingHash = crypto.createHmac('sha256', secret).update(String(otp).trim()).digest('hex');
      if (decoded && decoded.otpHash === incomingHash) {
        currentOtp = null;
        otpExpiry = null;
        return res.json({ success: true, message: "OTP verified successfully." });
      } else {
        return res.status(400).json({ success: false, message: "Invalid OTP. Please check your email." });
      }
    } catch (jwtErr) {
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new code." });
    }
  }

  // 2. Fallback to in-memory check (for local development or backwards compatibility)
  if (!currentOtp || !otpExpiry || Date.now() > otpExpiry) {
    return res.status(400).json({ success: false, message: "OTP has expired or was not requested. Please try again." });
  }
  if (String(otp).trim() === String(currentOtp).trim()) {
    currentOtp = null;
    otpExpiry = null;
    return res.json({ success: true, message: "OTP verified successfully." });
  } else {
    return res.status(400).json({ success: false, message: "Invalid OTP. Please try again." });
  }
});

export default router;

