import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  title: { type: String, required: true },
  code: { type: String, required: true },
  category: { type: String, required: true },
  domain: { type: String, default: "General" },
  language: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  applicationType: { type: String, enum: ["Web App", "Desktop App", "Mobile App"], default: "Web App" },
  thumbnail: { type: String },
  images: [{ type: String }],
  description: { type: String, required: true },
  techStack: {
    api: { type: String, default: "" },
    framework: { type: String, default: "" },
    ide: { type: String, default: "" },
    database: { type: String, default: "" },
    hasDFD: { type: Boolean, default: false },
    hasVideos: { type: Boolean, default: false },
    hasERDiagram: { type: Boolean, default: false },
    hasUML: { type: Boolean, default: false },
    hasPPT: { type: Boolean, default: false },
    hasSRS: { type: Boolean, default: false },
  },
  metaTags: [{ type: String }],
  documentation: { type: String },
  videoFiles: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Project', ProjectSchema);
