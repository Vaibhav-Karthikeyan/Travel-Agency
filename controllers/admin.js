const Plane=require('../models/plane');
const Train=require('../models/train');
const Cab=require('../models/cab');

exports.getAdmin = (req,res,next)=>{
    res.render('admin/home',{
        pageTitle:'Admin home',
        path:'/admin/'
    });
};

exports.getAddPlane = (req,res,next)=>{
    res.render('admin/edit-plane',{
        pageTitle:'Add Plane',
        path: '/admin/add-plane',
        editing: false
    });
};

exports.postAddPlane=(req,res,next)=>{
    const name=req.body.name;
    const seats=req.body.seats;
    const starting=req.body.starting;
    const ending=req.body.ending;
    const price=req.body.price;
    Plane.create({
        name: name,
        noOfSeats:seats,
        startingLocation:starting,
        endingLocation:ending,
        price: price,
        userId: req.user
    })
    .then(result=>{
        console.log('Plane added');
        res.redirect('/admin/plane');
    })
    .catch(err=>{
        console.log(err);
    });
};

exports.getAddTrain = (req,res,next)=>{
    res.render('admin/edit-train',{
        pageTitle:'Add train',
        path:'/admin/add-train',
        editing:false
    });
};

exports.postAddTrain=(req,res,next)=>{
    const name=req.body.name;
    const seats=req.body.seats;
    const starting=req.body.starting;
    const ending=req.body.ending;
    const price=req.body.price;
    Train.create({
        name: name,
        noOfSeats:seats,
        startingLocation:starting,
        endingLocation:ending,
        price: price,
        userId: req.user
    })
    .then(result=>{
        console.log('Train added');
        res.redirect('/admin/train');
    })
    .catch(err=>{
        console.log(err);
    });
};

exports.getAddType=(req,res,next)=>{
    res.render('admin/edit-type',{
        pageTitle:'Add Cab Type',
        path:'/admin/add-type',
        editing: false
    });
};

exports.postAddType=(req,res,next)=>{
    const type=req.body.type;
    const image=req.body.imageUrl;
    const price=req.body.price;
    const cab = new Cab({
        carType:type,
        price:price,
        imageUrl:image,
        userId: req.user
    });
    cab
    .save()
    .then(result=>{
        console.log('Cab type added');
        res.redirect('/admin/');
    })
    .catch(err=>{
        console.log(err);
    });
};

exports.getCab=(req,res,next)=>{
    Cab.find().
    then(cab=>{
        res.render('admin/cars',{
            cab:cab,
            pageTitle:'Types of cabs',
            path:'/admin/type'
        });
    })
    .catch(err=>console.log(err));
};

exports.getPlane=(req,res,next)=>{
    Plane.find().
    then(plane=>{
        res.render('admin/plane',{
            plane:plane,
            pageTitle:'All planes',
            path:'/admin/plane'
        });
    })
    .catch(err=>console.log(err));
};

exports.getTrain=(req,res,next)=>{
    Train.find().
    then(train=>{
        res.render('admin/train',{
            train:train,
            pageTitle:'All train',
            path:'/admin/train'
        });
    })
    .catch(err=>console.log(err));
};

exports.getEditType = (req,res,next)=>{
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/admin/');
    }
    const id = req.params.id;
    Cab.findById(id)
        .then(cab=>{
            if(!cab){
                res.redirect('/');
            }
            res.render('admin/edit-type',{
                pageTitle:'Edit cab',
                path:'/admin/edit-type',
                editing: editMode,
                cab: cab
            });
        })
        .catch(err=>
            console.log(err));
};

exports.postEditType=(req,res,next)=>{
    const id=req.body.id;
    const updatedType=req.body.type;
    const updatedImage=req.body.imageUrl;
    const updatedPrice=req.body.price;
    Cab.findById(id)
        .then(cab=>{
            cab.carType=updatedType,
            cab.imageUrl=updatedImage,
            cab.price=updatedPrice
            return cab.save();
        })
        .then(result=>{
            console.log('updated cab');
            res.redirect('/admin/type');
        })
        .catch(err=>console.log(err));
};

exports.getEditPlane = (req,res,next)=>{
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/admin/');
    }
    const id = req.params.id;
    Plane.findById(id)
        .then(plane=>{
            if(!plane){
                res.redirect('/');
            }
            res.render('admin/edit-plane',{
                pageTitle:'Edit plane',
                path:'/admin/edit-plane',
                editing: editMode,
                plane: plane
            });
        })
        .catch(err=>
            console.log(err));
};

exports.postEditPlane=(req,res,next)=>{
    const id=req.body.id;
    const updatedName=req.body.name;
    const updatedSeats=req.body.seats;
    const updatedStarting=req.body.starting;
    const updatedEnding=req.body.ending;
    const updatePrice=req.body.price;
    Plane.findById(id)
        .then(plane=>{
            plane.name=updatedName;
            plane.noOfSeats=updatedSeats;
            plane.startingLocation=updatedStarting;
            plane.endingLocation=updatedEnding;
            plane.price=updatePrice;
            return plane.save();
        })
        .then(result=>{
            console.log('updated plane');
            res.redirect('/admin/plane');
        })
        .catch(err=>console.log(err));
};

exports.getEditTrain = (req,res,next)=>{
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const id = req.params.id;
    Train.findById(id)
        .then(train=>{
            if(!train){
                res.redirect('/admin/');
            }
            res.render('admin/edit-train',{
                pageTitle:'Edit train',
                path:'/admin/edit-train',
                editing: editMode,
                train: train
            });
        })
        .catch(err=>
            console.log(err));
};

exports.postEditTrain=(req,res,next)=>{
    const id=req.body.id;
    const updatedName=req.body.name;
    const updatedSeats=req.body.seats;
    const updatedStarting=req.body.starting;
    const updatedEnding=req.body.ending;
    const updatePrice=req.body.price;
    Train.findById(id)
        .then(train=>{
            train.name=updatedName;
            train.noOfSeats=updatedSeats;
            train.startingLocation=updatedStarting;
            train.endingLocation=updatedEnding;
            train.price=updatePrice;
            return train.save();
        })
        .then(result=>{
            console.log('updated train');
            res.redirect('/admin/train');
        })
        .catch(err=>console.log(err));
};

exports.postDeletePlane=(req,res,next)=>{
    const id=req.body.id;
    Plane.findByIdAndRemove(id)
    .then(result=>{
        console.log('plane destroyed');
        res.redirect('/admin/plane');
    })
    .catch(err=>console.log(err));
};

exports.postDeleteTrain=(req,res,next)=>{
    const id=req.body.id;
    Train.findByIdAndRemove(id)
    .then(result=>{
        console.log('train destroyed');
        res.redirect('/admin/train')
    })
    .catch(err=>console.log(err));
};

exports.postDeleteType=(req,res,next)=>{
    const id=req.body.id;
    Cab.findByIdAndRemove(id)
    .then(result=>{
        console.log('type destroyed');
        res.redirect('/admin/type');
    })
    .catch(err=>console.log(err));
};
