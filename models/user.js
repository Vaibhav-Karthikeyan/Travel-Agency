const mongoose = require('mongoose');
const plane = require('./plane');
const train = require('./train');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    cabBookings:{
        bookings:[
            {
                cabId:{type: Schema.Types.ObjectId,
                    required:true,
                    ref:'cab'
                },
                start:{type:String},
                end: { type: String},
                price: { type: Number, required: true },
            }
        ]

    },
    trainBookings:{
        bookings:[
            {
                trainId:{type: Schema.Types.ObjectId,
                    required:true,
                    ref:'train'
                },
                seats:{type:Number,required:true},
                price:{type:Number,required:true}   
            }
        ]
    },
    planeBookings:{
        bookings:[
            {
                planeId:{type: Schema.Types.ObjectId,
                    required:true,
                    ref:'plane'
                },
                seats:{type:Number,required:true},
                price:{type:Number,required:true}
            }
        ]
    }
});

userSchema.methods.bookPlane= function(id,newSeats,price) {
    const booking={bookings:[{planeId:id,seats: newSeats,price:price}]};
    this.planeBookings=booking;
    return this.save();
};

userSchema.methods.bookTrain= function(id,newSeats,price) {
    const booking={bookings:[{trainId:id,seats: newSeats,price:price}]};
    this.trainBookings=booking;
    return this.save();
};

userSchema.methods.bookCab = function (id, start,end,price) {
    const booking = { bookings: [{ cabId: id, start: start, end: end,price: price }] };
    this.cabBookings = booking;
    return this.save();
};


module.exports=mongoose.model('user',userSchema);
