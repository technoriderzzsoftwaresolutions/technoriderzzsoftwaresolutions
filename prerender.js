import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/technoriderzz';
const SITE_URL = 'https://technoriderzz.com';

async function prerender() {
  try {
    console.log('Connecting to MongoDB for pre-rendering...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    const db = mongoose.connection.db;

    // Load compiled template
    const templatePath = path.resolve('dist/index.html');
    if (!fs.existsSync(templatePath)) {
      throw new Error('Vite production build template dist/index.html not found! Run npm run build first.');
    }
    const template = fs.readFileSync(templatePath, 'utf8');

    // Fetch database items
    let projects = [];
    let courses = [];
    let internships = [];
    let blogs = [];

    try { projects = await db.collection('projects').find({}).toArray(); } catch (e) { console.log('projects collection empty or not found'); }
    try { courses = await db.collection('courses').find({}).toArray(); } catch (e) { console.log('courses collection empty or not found'); }
    try { internships = await db.collection('internships').find({}).toArray(); } catch (e) { console.log('internships collection empty or not found'); }
    try { blogs = await db.collection('blogs').find({}).toArray(); } catch (e) { console.log('blogs collection empty or not found'); }

    // Helper to replace meta tags and inject pre-rendered HTML content
    const generateHtml = (item, type) => {
      let title = '';
      let desc = '';
      let image = '/BrandLogo.jpeg';
      let bodyHtml = '';

      if (type === 'project') {
        title = `${item.title} | Academic Project with Source Code`;
        desc = item.description || `Explore the academic project ${item.title} at Techno Riderzz. Includes source code, installation help, and IEEE research guidelines.`;
        image = item.thumbnail || '/BrandLogo.jpeg';
        bodyHtml = `
          <div style="padding: 40px; font-family: sans-serif; max-width: 800px; margin: auto;">
            <h1>${item.title}</h1>
            <p><strong>Category:</strong> ${item.category} | <strong>Language:</strong> ${item.language} | <strong>Type:</strong> ${item.applicationType}</p>
            <hr />
            <p>${desc}</p>
            <h3>Technical Stack Details:</h3>
            <ul>
              <li>Framework: ${item.techStack?.framework || 'Not specified'}</li>
              <li>Database: ${item.techStack?.database || 'Not specified'}</li>
              <li>IDE: ${item.techStack?.ide || 'Not specified'}</li>
            </ul>
          </div>
        `;
      } else if (type === 'course') {
        title = `${item.title} | certified Training Course`;
        desc = item.description || `Enroll in ${item.title} at Techno Riderzz. Dynamic practical training with verified credentials and expert placement guidance.`;
        image = item.thumbnail || '/BrandLogo.jpeg';
        bodyHtml = `
          <div style="padding: 40px; font-family: sans-serif; max-width: 800px; margin: auto;">
            <h1>${item.title}</h1>
            <p><strong>Category:</strong> ${item.category} | <strong>Level:</strong> ${item.level} | <strong>Duration:</strong> ${item.duration}</p>
            <hr />
            <p>${desc}</p>
          </div>
        `;
      } else if (type === 'internship') {
        title = `${item.title} | Certified Internship Program`;
        desc = item.description || `Apply for the ${item.title} internship at Techno Riderzz. Practical industrial training, real-time tasks, and ISO certification.`;
        bodyHtml = `
          <div style="padding: 40px; font-family: sans-serif; max-width: 800px; margin: auto;">
            <h1>${item.title}</h1>
            <p><strong>Institution:</strong> ${item.institution} | <strong>Type:</strong> ${item.internshipType} | <strong>Duration:</strong> ${item.duration}</p>
            <hr />
            <p>${desc}</p>
          </div>
        `;
      } else if (type === 'blog') {
        title = `${item.title} | Techno Riderzz Tech Blog`;
        desc = item.description || `Read ${item.title} on the Techno Riderzz technical news feed. Career tips, engineering workshops, and project updates.`;
        bodyHtml = `
          <div style="padding: 40px; font-family: sans-serif; max-width: 800px; margin: auto;">
            <h1>${item.title}</h1>
            <p><strong>Category:</strong> ${item.category || 'Technology'}</p>
            <hr />
            <p>${desc}</p>
          </div>
        `;
      }

      // Replace head meta tags
      let output = template
        .replace(/<title>[^<]*<\/title>/g, `<title>${title}</title>`)
        .replace(/<meta name="description" content="[^"]*"/g, `<meta name="description" content="${desc.replace(/"/g, '&quot;')}"`)
        .replace(/<meta property="og:title" content="[^"]*"/g, `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}"`)
        .replace(/<meta property="og:description" content="[^"]*"/g, `<meta property="og:description" content="${desc.replace(/"/g, '&quot;')}"`)
        .replace(/<meta property="og:image" content="[^"]*"/g, `<meta property="og:image" content="${image}"`)
        .replace(/<meta name="twitter:image" content="[^"]*"/g, `<meta name="twitter:image" content="${image}"`);

      // Inject structured content inside root div for SEO crawlers (will be hydrated by React inside browser)
      output = output.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
      
      return output;
    };

    const saveHtml = (htmlContent, relativePath) => {
      const targetPath = path.join('dist', relativePath, 'index.html');
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.writeFileSync(targetPath, htmlContent, 'utf8');
    };

    // Pre-render Dynamic Projects
    console.log(`Pre-rendering ${projects.length} project pages...`);
    projects.forEach(p => {
      const id = p._id ? p._id.toString() : p.id;
      if (id) {
        const html = generateHtml(p, 'project');
        saveHtml(html, `project/${id}`);
      }
    });

    // Pre-render Dynamic Courses
    console.log(`Pre-rendering ${courses.length} course pages...`);
    courses.forEach(c => {
      const id = c._id ? c._id.toString() : c.id;
      if (id) {
        const html = generateHtml(c, 'course');
        saveHtml(html, `courses/${id}`);
      }
    });

    // Pre-render Dynamic Internships
    console.log(`Pre-rendering ${internships.length} internship pages...`);
    internships.forEach(i => {
      const id = i._id ? i._id.toString() : i.id;
      if (id) {
        const html = generateHtml(i, 'internship');
        saveHtml(html, `internships/${id}`);
      }
    });

    // Pre-render Dynamic Blogs
    console.log(`Pre-rendering ${blogs.length} blog pages...`);
    blogs.forEach(b => {
      const id = b._id ? b._id.toString() : b.id;
      if (id) {
        const html = generateHtml(b, 'blog');
        saveHtml(html, `blogs/${id}`);
      }
    });

    // Pre-render Static Pages to make them instant-load too!
    const staticPages = ['about', 'contact', 'courses', 'internships', 'blogs'];
    console.log('Pre-rendering static routes...');
    staticPages.forEach(page => {
      let title = `Techno Riderzz | ${page.charAt(0).toUpperCase() + page.slice(1)}`;
      let desc = `Explore Techno Riderzz ${page}. Dynamic practical learning, certified academic projects, internships, and engineering workshop tutorials in one ecosystem.`;
      
      let html = template
        .replace(/<title>[^<]*<\/title>/g, `<title>${title}</title>`)
        .replace(/<meta name="description" content="[^"]*"/g, `<meta name="description" content="${desc}"`)
        .replace(/<meta property="og:title" content="[^"]*"/g, `<meta property="og:title" content="${title}"`)
        .replace(/<meta property="og:description" content="[^"]*"/g, `<meta property="og:description" content="${desc}"`);
      
      saveHtml(html, page);
    });

    console.log('Pre-rendering completed! Crawler-ready static HTML files deployed to dist/ folder.');
  } catch (error) {
    console.error('Pre-rendering execution error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

prerender();
