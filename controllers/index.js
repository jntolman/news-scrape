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
      cheerio = require('cheerio'),
      Article = require("../models/article");

module.exports = function(app) {

    // root route
    app.get('/', function(req, res) {
        Article.find({})
            .exec(function(error, articles) {
                if (error) {
                    console.log(error);
                    res.status(500);
                } else {
                    console.log(articles);
                    let hbsObj = {
                        title: 'Poop the News That\'s Fit to Scrape',
                        articles: articles
                    };
                    res.render('index', hbsObj);
                }
            });
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
                    // create new article
                    let entry = new Article(single);
                    // save to database
                    entry.save(function(err, doc) {
                        if (err) {
                            if (!err.errors.link) {
                                console.log(err);
                            }
                        } else {
                            console.log('new article added');
                        }
                    });
                }
            });
            Article.find({})
                .exec(function(error, docs) {
                    if (error) {
                        console.log(error);
                        res.status(500);
                    } else {
                        res.status(200).json(docs);
                    }
                });
        });
    });

};
