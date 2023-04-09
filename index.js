const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
require('dotenv').config();
const request = require('request');
const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.static('views'));

app.set('view engine', 'ejs');


app.get('/submit' , (req,res)=>{
    res.render(__dirname, + '/views/index')
})

app.post('/submit',(req, res)=>{

    const tags = req.body.tag
    async function getQuote(tags){
        try{
                const response = await axios.get(`https://api.quotable.io/random?tags=${tags}`)
                const data = response.data;
                
                const author = data.author;
                const content = data.content;

            const dataa  = {
                author:author,
                content:content,
                tag:tags
            };
            res.render(__dirname + '/views/response', {dataa: dataa});
            
        }catch(err){
            console.log(err)
        }
    }
    getQuote(tags)



})




app.listen(PORT , ()=>{
    console.log(`App is running on PORT ${PORT}`)
})
