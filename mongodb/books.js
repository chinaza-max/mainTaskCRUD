const mongoose=require('mongoose')
let bookSchema= new mongoose.Schema({
    bookName:{
        type:String,
        required:'this field is required',
        trim:true
    },
    bookTitle:{ 
        type:String,
        required:"this field is required",
        trim:true
    }
});

module.exports=mongoose.model("book",bookSchema);
