var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/db");

Campground = require("./models/campground");
Comment = require("./models/comment");
seedDB = require("./seeds");

app.use(express.static(__dirname+"/public"));

seedDB();
app.set("view engine", "ejs");//不用再写.ejs

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allcampgrounds});
        }
    });
    
});

app.post("/campgrounds", function(req, res){
    //get data from form add to campground page
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampGround = {name: name, image: image, description: description};
    Campground.create({
        name: name, 
        image: image,
        description: description
    });
    res.redirect("campgrounds/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

//SHOW shows more info about this tv show
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

//comment routes
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});
app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
            
        }
    })
});

app.listen(5300, function(){
    console.log('listening request on port 5300');
});