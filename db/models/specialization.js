const mongoose = require('mongoose');

const { Schema } = mongoose;

const SpecializationSchema = new Schema({
  link: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  amountVacancies: {
    type: Number,
    required: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
}, { autoIndex: false, versionKey: false, timestamps: true });

const Specialization = mongoose.model('Specialization', SpecializationSchema, 'specializations');
module.exports = Specialization;
