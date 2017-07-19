var express =require("express");
var app = express();


app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds =[
        {name: "Salmon Creek", image:"https://c2.staticflickr.com/4/3344/4576893185_8561c860d0_b.jpg"},
        {name: "Galapagus", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToZCA4CjK3O0qwAS33RnRbo2vMdcfA1m4fB4gOJquF-OvDccyjVQ"},
        {name: "Green Mont", image:"http://bustedwallet.com/wp-content/uploads/2014/05/Camping-Near-The-Lake-Background-Wallpaper.jpg"}
    ]
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res){
    
});

app.get("/campgrounds/new/", function(){
    res.render("")
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Camping app started");
});