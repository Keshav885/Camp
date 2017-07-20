var express =require("express"),
    app = express(),
    bodyParser =require("body-parser"),
    mongoose =require("mongoose");
    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/Camp", { useMongoClient: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.get("/", function(req, res){
    res.render("landing");
});


//SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
    name: "String",
    image: "String"
});

var Campground = mongoose.model("Campground", campgroundSchema);


app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name=  req.body.name;
    var image= req.body.image;
    var newCamp = {name: name, image:image};
    //Create a new campground and add it to db
    Campground.create(newCamp, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }        
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping app started");
});