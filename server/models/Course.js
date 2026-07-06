import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  title: { type: String, required: true },
  category: { type: String, default: "python" },
  description: { type: String, required: true },
  thumbnail: { type: String, default: "" },
  rating: { type: Number, default: 4.5 },
  studentsEnrolled: { type: Number, default: 0 },
  duration: { type: String, default: "10 Days" },
  effort: { type: String, default: "2 hours/day" },
  institution: { type: String, default: "Techno Riderzz Academy" },
  subject: { type: String, default: "Technology" },
  level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
  language: { type: String, default: "English" },
  hasCertificate: { type: Boolean, default: true },
  hasQuizzes: { type: Boolean, default: true },
  price: { type: Number, default: 0 },
  whatYouLearn: [{ type: String }],
  requirements: [{ type: String }],
  syllabus: [{
    module: String,
    topics: [String],
    duration: String
  }],
  extendedDescription: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Course', CourseSchema);
