const axios = require('axios')
require('dotenv').config()
const fs = require('fs')
const express = require('express')
app = express()
const expressLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded({extended: false}));
const methodOverride = require('method-override');
// const { getCiphers } = require('crypto')
// const { render } = require('ejs')
const port = 3000

app.get('/goog', function(res, req){
    axios.get('http://www.google.com')
        .then( response =>{
            console.log(response)
        })
})

const franchises =["National Lampoon", "Nightmare on Elm Street", "Halloween", "Jaws"]


app.get('/omdb', function(req, res){
    const qParams = {
        params: {
            s: franchises[Math.floor(Math.random() * franchises.length)],
            //t: "the matrix",
            apikey: process.env.OMDB_API_KEY
        }
    }
    //console.log(qParams.params.apikey)
    axios.get('http://www.omdbapi.com', qParams)
        .then(function(response){
            console.log(response.data)
            return response.data.Search
            //res.render('movies/show' {data:response.data.Search})
        })
        .then(function(mData){
            res.render('movies/show', {data:mData})
        })
})

app.get("/omdb/search", function(req,res){
    res.render("movies/search")
})

app.post("/omdb/search", function(req,res){
    console.log(req.body)
    const qParams = {
        params: {
            s: req.body['search'],
            //t: "the matrix",
            apikey: process.env.OMDB_API_KEY
        }
    }
    axios.get('http://www.omdbapi.com', qParams)
        .then(function(response){
            console.log(response.data)
            return response.data.Search
            //res.render('movies/show' {data:response.data.Search})
        })
        .then(function(mData){
            res.render('movies/show', {data:mData})
        })
})

app.get('/omdb/title/:title', function(req, res){
    const qParams = {
        params: {
            //s: franchises[Math.floor(Math.random() * franchises.length)],
            t: req.params.title,
            plot: "full",
            apikey: process.env.OMDB_API_KEY
        }
    }
    //console.log(qParams.params.apikey)
    axios.get('http://www.omdbapi.com', qParams)
        .then(function(response){
            console.log(response.data)
            return response.data
            //res.render('movies/show' {data:response.data.Search})
        })
        .then(function(mData){
            res.render('movies/title', {data:[mData]})
        })
})



app.get('/omdb/:query', function(req, res){
    const qParams = {
        params: {
            s: req.params.query,
            apikey: process.env.OMDB_API_KEY
        }
    }
    //console.log(qParams.params.apikey)
    axios.get('http://www.omdbapi.com', qParams)
        .then(function(response){
            console.log(response.data)
            return response.data.Search
            //res.render('movies/show' {data:response.data.Search})
        })
        .then(function(mData){
            res.render('movies/show', {data:mData})
        })
})




app.listen(port)