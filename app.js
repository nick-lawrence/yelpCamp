const express  = require('express'),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

//SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: 'Salmon Creek', 
//     image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f7c77ba4eebcbb_340.jpg"
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND: ");
//         console.log(campground);
//     }
// });









app.get("/", function(req, res){
    res.render('landing');
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    //get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds:allcampgrounds});
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
});

//NEW - show form to create new campground

app.get("/campgrounds/new", function(req, res){
    res.render('new');
});

//CREATE - add new campround to DB

app.post("/campgrounds", function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    var newCampground = {name:name, image:image}; 
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.listen(3000, 'localhost', function(){
    console.log("YelpCamp server has started!");
});