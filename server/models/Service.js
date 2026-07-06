import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  iconName: { type: String }, // Name of the Lucide icon to use
  badge: { type: String },
  features: [{ type: String }],
  color: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Service', ServiceSchema);
