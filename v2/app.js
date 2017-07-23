var express =require("express"),
    app = express(),
    bodyParser =require("body-parser"),
    mongoose =require("mongoose");
    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/Camp", { useMongoClient: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
    name        : "String",
    image       : "String",
    description : "String"
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Salmon Creek",
//         image: "https://c2.staticflickr.com/4/3344/4576893185_8561c860d0_b.jpg",
//         description: "This is perfect place for a hangout"
//     },
//     function(err, campground){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("Newly added camp grpund");
//             console.log(campground);
//         }
//     });

//CREATE ROUTE

app.get("/", function(req, res){
    res.render("landing");
});


app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds: allCampgrounds});
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
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {campground: foundCampground}); 
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping app started");
});