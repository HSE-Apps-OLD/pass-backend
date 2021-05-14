const { Int32 } = require('bson');
const mongoose = require('mongoose');

const PassSchema = mongoose.Schema({
    student_name: {
        type: String,
        required: true
    },
    teacher_name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    for_time: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('passes', PassSchema)