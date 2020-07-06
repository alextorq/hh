const mongoose = require('mongoose');

const { Schema } = mongoose;

const VacancySchema = new Schema({
  link: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  company: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  specialization: {
    type: Schema.Types.ObjectId,
    ref: 'Specialization',
  },
}, { autoIndex: false, versionKey: false, timestamps: true });

const Vacancy = mongoose.model('Vacancy', VacancySchema, 'vacancies');
module.exports = Vacancy;
