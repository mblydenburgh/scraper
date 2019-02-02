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
                });
                
                db.Review.create({
                    beer_name: name,
                    beer_style: style,
                    brewery_name: brewery,
                    score: score,
                    review_body: comment
                });
                
            });
            
            res.redirect("/");
        });

    });

    app.get("/api", async (req,res) => {
       const data = await db.Review.find();
       console.log(data);
    });


    app.delete("/", async (req,res) => {
        console.log(`in the delete route`);
        await db.Review.deleteMany();
        // res.redirect("/");
        res.end();
    });
};