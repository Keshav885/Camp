var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Dark Night ",
        image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_640.jpg",
        description: "Can make you feel cold"
    },    
    
    {
        name: "Salmon Creek",
        image: "https://cdn.pixabay.com/photo/2016/09/07/04/15/fire-1650781_1280.jpg",
        description: "Beautiful and bold"
    },
    
    {
        name: "Resting Hils",
        image: "https://cdn.pixabay.com/photo/2017/06/13/10/52/camping-2398419_1280.jpg",
        description: "This is perfect place for a hangout"
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
