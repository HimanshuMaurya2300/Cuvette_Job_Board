const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    title: String,
    description: String,
    experienceLevel: String,
    endDate: Date,
    candidates: [String],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
});

module.exports = mongoose.model('Interview', InterviewSchema);
