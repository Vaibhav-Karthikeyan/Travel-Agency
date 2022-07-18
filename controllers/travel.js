const Plane=require('../models/plane');
const Train=require('../models/train');
const Cab=require('../models/cab');
const stripe = require('stripe')('sk_test_51JzpSZSC4iIFjK1x5sEAT9rxv0suCQF4emc7J9Ntr6zLNl0OKW6Lm1rj1BYhQ6BR9VAAvIe6g8bzTNNmaStxZoiW00cb4tJDom');
const nodemailer = require('nodemailer');
const sendgrindTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgrindTransport({
    auth:{
        api_key:'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'
    }
}));
exports.getHome = (req,res,next)=>{
    res.render('travel/home',{
        pageTitle:'home page',
        path:'/'
    });
};

exports.getType=(req,res,next)=>{
    Cab.find()
    .then(cab=>{
        res.render('travel/book-cab',{
            cab:cab,
            pageTitle:'Book A cab',
            path:'/book-cab'
        });
    })
    .catch(err=>{
        console.log(err);
    });
};

exports.getPlane=(req,res,next)=>{
    Plane.find().
    then(plane=>{
        res.render('travel/book-plane',{
            plane:plane,
            pageTitle:'Book planes',
            path:'/book-plane'
        });
    })
    .catch(err=>console.log(err));
};


exports.getTrain=(req,res,next)=>{
    Train.find().
    then(train=>{
        res.render('travel/book-train',{
            train:train,
            pageTitle:'Book train',
            path:'/book-train'
        });
    })
    .catch(err=>console.log(err));
};

exports.getBookPlane=(req,res,next)=>{
    const id = req.params.id;
    Plane.findById(id)
    .then(plane=>{
        if(!plane){
            res.redirect('/');
        }
        res.render('travel/plane-bookings',{
            pageTitle:'Plane bookings',
            path:'/plane-bookings',
            plane:plane
        })
    })
    .catch(err=>
        console.log(err));
};

exports.postBookPlane=(req,res,next)=>{
    const id=req.body.id;
    const seats=req.body.seats;
    Plane.findById(id)
    .then(plane=>{
        plane.noOfSeats-=seats;
        const price=seats*plane.price;
        req.user.bookPlane(id,seats,price);
        return plane.save();
    })
    .then(result=>{
        console.log('Booking succsesful');
        res.redirect('/plane-payments');
    })
    .catch(err=>console.log(err));
};

exports.getBookTrain=(req,res,next)=>{
    const id = req.params.id;
    Train.findById(id)
    .then(train=>{
        if(!train){
            res.redirect('/');
        }
        res.render('travel/train-bookings',{
            pageTitle:'train bookings',
            path:'/train-bookings',
            train:train
        })
    })
    .catch(err=>
        console.log(err));
};

exports.postBookTrain=(req,res,next)=>{
    const id=req.body.id;
    const seats=req.body.seats;
    Train.findById(id)
    .then(train=>{
        train.noOfSeats-=seats;
        const price=train.price*seats;
        req.user.bookTrain(id,seats,price);
        return train.save();
    })
    .then(result=>{
        console.log('Booking succsesful');
        res.redirect('/train-payments');
    })
    .catch(err=>console.log(err));
};

exports.getPlanePayments=(req,res,next)=>{
    res.render('travel/plane-payments',{
        pageTitle:'payment',
        path:'/payment',
        user:req.user
    });
};

exports.getTrainPayments=(req,res,next)=>{
    res.render('travel/train-payments',{
        pageTitle:'payment',
        path:'/payment',
        user:req.user
    });
};


exports.getCabBookings = (req, res, next) => {
    const id = req.params.id;
    Cab.findById(id)
    .then(cab => {
        if (!cab) {
            res.redirect('/');
        }
        res.render('travel/map', {
            pageTitle: 'cab-bookings',
            path: '/cab-bookings',
            cab:cab
        })
    })
    .catch(err =>
        console.log(err));
};

exports.postBookCab = (req, res, next) => {
    const id = req.body.id;
    const start = req.body.start;
    const end = req.body.end;
    const distance=req.body.distance;
    Cab.findById(id)
        .then(cab => {
            const Totalprice=cab.price*distance
            req.user.bookCab(id,start,end,Totalprice);
            return cab.save();
        })
        .then(result => {
            console.log('Booking succsesful');
            res.redirect('/cab-payments');
        })
        .catch(err => console.log(err));
};

exports.getCabPayments = (req, res, next) => {
    res.render('travel/cab-payments', {
        pageTitle: 'payment',
        path: '/payment',
        user: req.user
    });
};

exports.postCabPayments = (req, res, next) => {

    const token = req.body.stripeToken;
    let sum=0;
    req.user
    .populate('cabBookings.bookings.cabId')
    .then(user=>{
        sum=user.cabBookings.bookings[0].price
    })
    .then(result=>{
        const charge = stripe.charges.create({
        amount: sum * 100,
        currency: 'inr',
        description: 'Demo Order',
        source: token
    });
    })
    .then(()=>{
        res.redirect('/confirmation');
    })
        .catch(err => console.log(err));
};

exports.postPlanePayments = (req, res, next) => {

    const token = req.body.stripeToken;
    let sum = 0;
    req.user
        .populate('planeBookings.bookings.planeId')
        .then(user => {
            sum = user.planeBookings.bookings[0].price
        })
        .then(result => {
            const charge = stripe.charges.create({
                amount: sum * 100,
                currency: 'inr',
                description: 'Demo Order',
                source: token
            });
        })
        .then(() => {
            res.redirect('/confirmation');
        })
        .catch(err => console.log(err));
};

exports.postTrainPayments = (req, res, next) => {

    const token = req.body.stripeToken;
    let sum = 0;
    req.user
        .populate('trainBookings.bookings.trainId')
        .then(user => {
            sum = user.trainBookings.bookings[0].price
        })
        .then(result => {
            const charge = stripe.charges.create({
                amount: sum * 100,
                currency: 'inr',
                description: 'Demo Order',
                source: token
            });
        })
        .then(() => {
            res.redirect('/confirmation');
        })
        .catch(err => console.log(err));
};

exports.getConfirmation = (req, res, next) => {
    res.render('travel/confirmation', {
        pageTitle: 'Confirmation',
        path: '/confirmation'
    });
};

exports.getFeedback = (req, res, next) => {
    res.render('travel/feedback', {
        pageTitle: 'Feedback',
        path: '/feedback'
    });
};

exports.postFeedback = (req, res, next) => {
    email=req.body.email;
    subscribe=Boolean(req.body.subscribe);
    if(subscribe){
    transporter.sendMail({
        to: email,
        from: 'vaibhavkarthikeyan@gmail.com',
        subject:'Subcription',
        html:'<p>Thank You for the feedback</p><p>We will keep you updated</p>'
    });
    }
    res.redirect('/');
};