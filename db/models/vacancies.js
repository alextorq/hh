const mongoose = require('mongoose');

const { Schema } = mongoose;

const VacancysSchema = new Schema({
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
}, { autoIndex: false, versionKey: false, timestamps: true });

const Vacancy = mongoose.model('Vacancy', VacancysSchema, 'vacancies');
module.exports = Vacancy;
