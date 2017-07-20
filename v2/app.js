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

Campground.create(
    {
        name: "Salmon Creek", 
        image:"https://c2.staticflickr.com/4/3344/4576893185_8561c860d0_b.jpg"
    }, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            console.log("Newly created");
            console.log(campground);
        }
    }
    
);

var campgrounds =[
    {name: "Salmon Creek", image:"https://c2.staticflickr.com/4/3344/4576893185_8561c860d0_b.jpg"},
    {name:"Galapagus", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz5nZMMmnTxqmLfspsmxVsp50ObmEXWlpxZGHielnzhu1chfG79A"},
    {name: "Green Mont", image:"http://bustedwallet.com/wp-content/uploads/2014/05/Camping-Near-The-Lake-Background-Wallpaper.jpg"},
    {name: "Salmon Creek", image:"https://c2.staticflickr.com/4/3344/4576893185_8561c860d0_b.jpg"},
    {name:"Galapagus", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz5nZMMmnTxqmLfspsmxVsp50ObmEXWlpxZGHielnzhu1chfG79A"},
    {name: "Green Mont", image:"http://bustedwallet.com/wp-content/uploads/2014/05/Camping-Near-The-Lake-Background-Wallpaper.jpg"},
    {name: "Salmon Creek", image:"https://c2.staticflickr.com/4/3344/4576893185_8561c860d0_b.jpg"},
    {name:"Galapagus", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz5nZMMmnTxqmLfspsmxVsp50ObmEXWlpxZGHielnzhu1chfG79A"},
    {name: "Green Mont", image:"http://bustedwallet.com/wp-content/uploads/2014/05/Camping-Near-The-Lake-Background-Wallpaper.jpg"}
];



app.get("/campgrounds", function(req, res){

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name=  req.body.name;
    var image= req.body.image;
    var newCamp = {name: name, image:image};
    campgrounds.push(newCamp);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping app started");
});