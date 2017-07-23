var express         =require("express"),
    app             = express(),
    bodyParser      =require("body-parser"),
    mongoose        =require("mongoose"),
    Campground      =require("./models/campground"),
    seedDB          = require("./seeds");
    
    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/Camp", { useMongoClient: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// CLEAN DB
seedDB();


// //CREATE ROUTES

app.get("/", function(req, res){
    res.render("landing");
});


app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name=  req.body.name;
    var image= req.body.image;
    var desc = req.body.description;
    var newCamp = {name: name, image:image, description:desc};
    //Create a new campground and add it to db
    Campground.create(newCamp, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }        
    });
});

//FORM

app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", {campground: foundCampground}); 
        }
    });
});


//==================
// COMMENT ROUTES
//==================

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       }else{
           res.render("comments/new", {campground: campground});
       } 
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping app started");
});