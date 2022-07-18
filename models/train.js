const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trainSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    noOfSeats:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    startingLocation:{
        type: String,
        required: true
    },
    endingLocation:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

module.exports=mongoose.model('train',trainSchema);