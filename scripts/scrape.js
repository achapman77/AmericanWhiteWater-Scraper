//scrape script
//===================

//Require axios (or request) and cheerio
const cheerio = require('cheerio');
const axios = require('axios');

const scrape = (cb) => {
    // Making a request via axios
    axios.get("https://www.americanwhitewater.org/content/River/state-summary/state/CO/").then(response => {

        // Load the body of the HTML into cheerio
        const $ = cheerio.load(response.data);
  
        // Empty array to save our scraped data
        let rivers = [];
  
        // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
        $("tr.river").each((i, element) => {
    
            // Save the text of the h4-tag as "title"
            const riverName = $(element).find(".rivername").text().replace(/(\r\n\t|\n|\r\t)/gm, "");
            const riverSection = $(element).find("span.river-section").text();
            const riverSectionLink = $(element).find("span.river-section a").attr("href");
            const sectionClass = $(element).find(".river_info").next("td").text();
            const sectionCFS = $(element).find("td.gauge_info a").text();
            const changeCFS = $(element).find("td.gauge_info span.river-trend").text().replace(/(\r\n\t|\n|\r\t)/gm, "");
            const recommendation = $(element).find("td.rc:nth-child(5)").text().replace(/(\r\n\t|\n|\r\t)/gm, "").replace(/[^- ]*\-(\S*)/, "").trim();
            // const recommendation = $(element).find("td.gauge_info").next("td").find("a").text();
            const lastUpdated = $(element).find("td.gauge_info").next("td").next("td").text().replace(/(\r\n\t|\n|\r\t)/gm, "");
        
            // Make an object with data we scraped for this h4 and push it to the results array
            rivers.push({
                riverName: riverName,
                riverSection: riverSection,
                riverSectionLink: riverSectionLink,
                sectionClass: sectionClass,
                sectionCFS: sectionCFS,
                changeCFS: changeCFS,
                recommendation: recommendation,
                lastUpdated: lastUpdated
            });
        });
    
        // After looping through each <tr> send the results
        cb(results);
        console.log(results)
    });
};

module.exports = scrape;
//Used by controller->river.js

