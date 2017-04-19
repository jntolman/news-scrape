'use strict';

/**
 * 
 * Homework Assignment 18 - All the News That's Fit to Scrape
 * Jarrett Tolman - controllers/index.js
 * 
 */

// dependencies
// =============================================================
const request = require('request'),
      cheerio = require('cheerio');

module.exports = function(app) {

    // root route
    app.get('/', function(req, res) {
        let hbsObj = {
            title: 'All the News That\'s Fit to Scrape'
        };
        res.render('index', hbsObj);
    });

    // scrape articles
    app.get('/scrape', function(req, res) {
        request('https://news.ycombinator.com', function(error, response, html) {
            let $ = cheerio.load(html);
            let results = [];
            $('tr.athing td.title').each(function(i, e) {
                let title = $(this).children('a').text(),
                    link = $(this).children('a').attr('href'),
                    single = {};
                if (link !== undefined &&  title !== '') {
                    single = {
                        title: title,
                        link: link
                    };
                    results.push(single);
                }
            });
            res.json(results);
        });
    });

};
