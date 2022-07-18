const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cabSchema= new Schema({
    carType:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

module.exports= mongoose.model('cab',cabSchema);