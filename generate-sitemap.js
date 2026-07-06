import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/technoriderzz';
const SITE_URL = 'https://technoriderzz.com';

async function generateSitemap() {
  try {
    let connected = false;
    try {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
      console.log('Connected to MongoDB.');
      connected = true;
    } catch (dbErr) {
      console.warn('WARNING: Could not connect to MongoDB. Sitemap will only contain static routes.');
    }

    // Fetch dynamic database collections (fail-safe if collections do not exist yet)
    let projects = [];
    let courses = [];
    let internships = [];
    let blogs = [];

    if (connected) {
      const db = mongoose.connection.db;
      try { projects = await db.collection('projects').find({}).toArray(); } catch (e) { console.log('projects collection empty or not found'); }
      try { courses = await db.collection('courses').find({}).toArray(); } catch (e) { console.log('courses collection empty or not found'); }
      try { internships = await db.collection('internships').find({}).toArray(); } catch (e) { console.log('internships collection empty or not found'); }
      try { blogs = await db.collection('blogs').find({}).toArray(); } catch (e) { console.log('blogs collection empty or not found'); }
    }

    const staticRoutes = [
      '',
      '/about',
      '/contact',
      '/courses',
      '/internships',
      '/blogs'
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Add static routes
    const today = new Date().toISOString().split('T')[0];
    staticRoutes.forEach(route => {
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}${route}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Add dynamic project pages
    projects.forEach(p => {
      const id = p._id ? p._id.toString() : p.id;
      if (id) {
        xml += `  <url>\n`;
        xml += `    <loc>${SITE_URL}/project/${id}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }
    });

    // Add dynamic course pages
    courses.forEach(c => {
      const id = c._id ? c._id.toString() : c.id;
      if (id) {
        xml += `  <url>\n`;
        xml += `    <loc>${SITE_URL}/courses/${id}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }
    });

    // Add dynamic internship pages
    internships.forEach(i => {
      const id = i._id ? i._id.toString() : i.id;
      if (id) {
        xml += `  <url>\n`;
        xml += `    <loc>${SITE_URL}/internships/${id}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }
    });

    // Add dynamic blog pages
    blogs.forEach(b => {
      const id = b._id ? b._id.toString() : b.id;
      if (id) {
        xml += `  <url>\n`;
        xml += `    <loc>${SITE_URL}/blogs/${id}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }
    });

    xml += `</urlset>\n`;

    const publicDir = path.resolve('public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
    
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
    console.log('Sitemap generated successfully in public/sitemap.xml');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB.');
    }
  }
}

generateSitemap();
