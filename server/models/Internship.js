import mongoose from 'mongoose';

const InternshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: "mern" },
  description: { type: String, required: true },
  thumbnail: { type: String, default: "" },
  rating: { type: Number, default: 4.5 },
  studentsEnrolled: { type: Number, default: 0 },
  duration: { type: String, default: "3 Months" },
  institution: { type: String, default: "Techno Riderzz Academy" },
  internshipType: { type: String, default: "Remote" },
  hasRealTimeProjects: { type: Boolean, default: true },
  hasJobOpportunity: { type: Boolean, default: true },
  hasCertification: { type: Boolean, default: true },
  eligibility: { type: String, default: "Any Graduate/Student" },
  whatYouLearn: [{ type: String }],
  requirements: [{ type: String }],
  whoThisIsFor: [{ type: String }],
  price: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Internship', InternshipSchema);
