'use strict';

require('./mongodb/db')
const express = require('express');
const fileUpload = require('express-fileupload');
const http = require('http');
const fs=require('fs');
//const path=require('path');
const mongoose=require('mongoose')
const { readdirSync, rmSync } = require('fs');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const Book=require("./mongodb/books");
const { buildOptions } = require('express-fileupload/lib/utilities');
const app = express();
const server = http.createServer(app)
const port=5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(fileUpload());



app.get('/api/books',async(req,res)=>{
    const book = await Book.find({});
    if(book){
        let reverseBook=book.reverse()
        //res.json({express:reverseBook,status:"ok"})
        res.json({express:{payload:reverseBook},status:"ok"})
    }
})


app.post('/api/deleteAll',async(req,res)=>{

    const book = await Book.find({});
    if(book.length!=0){
        mongoose.connection.dropCollection("books")
        const dir = `${__dirname}/client/public/uploads`;
        readdirSync(dir).forEach(f => rmSync(`${dir}/${f}`));
        const newBook = await Book.find({});
        if(newBook.length==0){
            res.status(200).json({express:{payload:"empty"},status:"ok"})

        }
        else{
          return  res.status(500).json({express:{payload:"something went wrong on the server"},status:"bad"})
        }
    }
    else{
        res.status(200).json({express:{payload:"all books deleted successfully"},status:"ok"})
    }
})



app.post('/api/upload',async(req,res)=>{
    let file=req.files.file

    const book=new Book()
    if(file.mimetype.toLowerCase()=="image/jpeg"||file.mimetype.toLowerCase()=="image/png"||file.mimetype.toLowerCase=="image/jpg"){
        const randomName =uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
        
        let name=randomName+'.'+(file.mimetype.slice(6, 10))
        book.bookName=name
        book.bookTitle=req.body.title
        book.save(async function(err,data){
            if(err){
                return done(err,null)
            }
            else{
                file.mv(`${__dirname}/client/public/uploads/${name}`, err => {
                    if (err) {
                     // res.status(500).send(err);
                      return res.status(500).json({express:{payload:"errror from server"},status:"bad"})

                    }
                    else{
                        res.status(200).json({express:{payload:"uploaded successfully"},status:"ok"})
                    } 
                });
            }
        })
    }
    else{
        res.status(200).json({express:{payload:"wrong file type uploaded accepted file type(image/jpeg,image/png,image/jpg)"},status:"bad"})
    }
})

app.post('/api/deleteOne',async(req,res)=>{
    let bookName=req.body.bookName
    const dir = `${__dirname}/client/public/uploads/${bookName}`;
    fs.unlinkSync(dir)
    Book.findOneAndDelete({bookName:bookName}, function (err, docs) {
        if (err){
            console.log(err)
            res.status(500).json({express:{payload:"error from server"},status:"bad"})
        }
        else{
            res.status(200).json({express:{payload:"one book deleted"},status:"ok"})
          //  res.json({express:"success",status:"ok"})
        }
    })
})

app.post('/api/update',async(req,res)=>{
    
    if(req.files==null){
        const update = { "$set": {"bookTitle": req.body.title}}

        Book.findOneAndUpdate({bookName:req.body.bookName},update, {new: true}).exec(function(err, doc){
            if(err) {
                //console.log(err);
                res.status(500).json({express:{payload:"error from server"},status:"bad"});
            } else {
                res.status(200).json({express:{payload:"updated successfully"},status:"ok"});
            }
        });
    }
    else{
        let file=req.files.file
        if(file.mimetype.toLowerCase()=="image/jpeg"||file.mimetype.toLowerCase()=="image/png"||file.mimetype.toLowerCase=="image/jpg"){
      
            const dir = `${__dirname}/client/public/uploads/${req.body.bookName}`;
            fs.unlinkSync(dir)
        
            const update = { "$set": {"bookTitle": req.body.title}}
            Book.findOneAndUpdate({bookName:req.body.bookName},update, {new: true}).exec(function(err, doc){
                if(err) {
                    //console.log(err);
                  //  res.status(500).send(err);
                 return   res.status(500).json({express:{payload:"error from server"},status:"bad"});
                } 
            });

            file.mv(`${__dirname}/client/public/uploads/${req.body.bookName}`, err => {
                if (err) {
                 //return res.status(500).send(err);
                return res.status(500).json({express:{payload:"error from server"},status:"bad"});
                }
                else{
                    res.status(200).json({express:{payload:"updated successfully"},status:"ok"});
                } 
            });

        }
        else{
            res.json({express:{payload:"wrong file type uploaded accepted file type(image/jpeg,image/png,image/jpg)"},status:"bad"})
        }
    }
})


server.listen(port ,()=>console.log(`server started.... ${port}`))


//https://expressjs.com/en/starter/static-files.html
//https://stackoverflow.com/questions/70714990/node-js-server-doesnt-display-images-in-react-app