const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    link: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false,
    },
    vacancies: [
        {
            type: Schema.Types.ObjectId,
            ref:'Vacancies'
        }
    ],
}, { autoIndex: false, versionKey: false, timestamps:true });

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
