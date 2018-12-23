var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "rick and morty",
		image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
		description: "abc"
	},
	{
		name: "rick and morty",
		image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
		description: "abc"
	},
	{
		name: "rick and morty",
		image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
		description: "abc"
	}
]

function seedDB(){
	//remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}else{
			console.log("removed campgrounds");
			Comment.remove({}, function(err){
				if(err){
					console.log(err);
				}else{
					console.log("removed comments");
					data.forEach(function(seed){
					Campground.create(seed, function(err, campground){
						if(err){
							console.log(err);
						}else{
							console.log("add a campground");
							//add comments
							Comment.create({
								text: "this is a great website",
								author: "lxy"
							}, function(err, comment){
								if(err){
									console.log(err);
								}else{
									campground.comments.push(comment);
									campground.save();
								}
							})
						}
					})
				})
				}
			})
		}
	});
	//add campgrounds
				
}

module.exports = seedDB;
	