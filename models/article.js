'use strict';

/**
 * 
 * Homework Assignment 18 - All the News That's Fit to Scrape
 * Jarrett Tolman - controllers/index.js
 * 
 */

// dependencies
// =============================================================
const mongoose = require('mongoose'),
      uniqueValidator = require('mongoose-unique-validator');

// create Schema class
const Schema = mongoose.Schema;

// create article schema
const ArticleSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  // link is a required string
  link: {
    type: String,
    unique: true,
    required: true
  },
  // notes is an array of reference ids
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Note",
    required: false
  }]
});

// add unique-validator plugin
ArticleSchema.plugin(uniqueValidator);

// create the Article model with the ArticleSchema
const Article = mongoose.model("Article", ArticleSchema);

// export the model
module.exports = Article;
