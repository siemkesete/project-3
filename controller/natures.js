const express = require("express")
const natureRouter = express.Router()
const nature = require('../models/nature')
const rootData = require('../models/root')


natureRouter.get('/root', async (req, res) => {
    await nature.deleteMany({});
    await nature.create(rootData);
    res.redirect('/naturs');
});

// Index Route
natureRouter.get('/', (req, res) => {
    //         👇 query object
    nature.find({}, (err, natures) => {
        //  Model.find() returns all results in a JS Array
        //                                    👇
        res.render('index.ejs', { natures }); // context object
    }) 
});


// New Route
natureRouter.get('/new', (req, res) => {
    res.render('new.ejs');
});

// Delete Route
natureRouter.delete('/:id', (req, res) => {
    nature.findByIdAndDelete(req.params.id, (err, deletednature) => {
        // res.redirect('/natures');
        res.json(deletednature)
    });
});

// Update Route
natureRouter.put('/:id', (req, res) => {
    // this is known as type casting - cast one datatype into another
    req.body.completed = !!req.body.completed; 
    nature.findByIdAndUpdate(req.params.id, req.body, (err, nature) => {
        res.redirect(`/natures/${req.params.id}`);
    }); 


// Create Route
natureRouter.post('/', (req, res) => {
    req.body.completed = !!req.body.completed; // !!'on' -> true or !!undefined -> false
    nature.create(req.body, (err, nature) => {
        res.redirect('/natures'); // tells the browser to make another GET request to /natures
    });
});

// Edit Route
natureRouter.get('/:id/edit', (req, res) => {
    nature.findById(req.params.id, (err, nature) => {
        res.render('edit.ejs', { nature });
    });
});

// Show Route
natureRouter.get('/:id', async (req, res) => {
    try {
        const nature = await nature.findById(req.params.id);
        res.render('show.ejs', { nature });
    } catch (error) {
        console.log(error.message)
        res.render('error.ejs');
    }
});



module.exports = natureRouter