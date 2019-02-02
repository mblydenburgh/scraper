const db = require ("../models/index.js");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app){
    app.get("/", async (req,res) => {
        const data = await db.Review.find({});
        console.log(data);
        res.render("index", {beer:data});
    });
    
    // The scrape route pulls info from Beer Advocate and pushes it into the database
    app.get("/scrape", (req,res) => {
        axios.get("https://www.beeradvocate.com/beer/")
        .then(response => {
            const $ = cheerio.load(response.data);
            const scrapeData = {
                "data":[]
            };
            $("div#rating_fullview_container").each(function(i, element){
                const name = $(element).find("h6").children("a").text();
                const brewery = $(element).find("br + a").first().text();
                const style = $(element).find("br + a").eq(1).text();
                const score = $(element).find("span.BAscore_norm").text();
                const comment = $(element).find("div.comment").text();
                
                scrapeData.data.push({
                    "beerName": name,
                    "brewery": brewery,
                    "style": style,
                    "score": score,
                    "comment": comment,
                    "saved":false
                });
                
                db.Review.create({
                    beer_name: name,
                    beer_style: style,
                    brewery_name: brewery,
                    score: score,
                    review_body: comment,
                    saved:false
                });
                
            });
            
            res.redirect("/");
        });

    });

    // route to display data
    app.get("/api", async (req,res) => {
       const data = await db.Review.find({});
       console.log(data);
       res.json(data);
    });

    // route for displaying saved beers
    app.get("/saved", async (req,res) => {
        const data = await db.Review.find({saved:true});
        res.render("index",{beer:data});
    });

    // route for changing saved state in database entry
    app.put("/:id", async (req,res) => {
        const id = req.params.id;
        const {saved: savedState} = await db.Review.findById(id);
        console.log(`prev state: ${savedState}`);
        await db.Review.findOneAndUpdate({_id:id},{saved:!savedState});
        res.end();
    });

    //! route for clearing all scraped data from db - uh oh!
    app.delete("/", async (req,res) => {
        console.log(`in the delete route`);
        await db.Review.deleteMany();
        res.end();
    });
};