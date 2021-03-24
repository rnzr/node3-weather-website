const path = require('path');
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const express = require('express')
const hbs = require('hbs');
const { registerHelper } = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view_engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);



//setup static directory to serve
app.use(express.static(publicDirectory));



app.get('', (req,res)=> {
    res.render('index.hbs',{
        title:"Welcome",
        name:'Tommi'
    })
})

app.get('/about',(req,res)=> {
    res.render('about.hbs', {
        title:"About",
        name:"FACKO"
    });

})

app.get('/help',(req,res)=> {
    res.render('help.hbs', {
        title:"Help",
        name:"Tommi",
        helpText:"EVERYTHING IS FUCKED?"
    });

})

app.get('/weather', (req,res)=> {
    
    if(!req.query.location) {
        return res.send({
            error:"you must provide a location!"
        })
    }
    
    geocode(req.query.location,(error,{latitude,longitude}={})=> {
        if(error) {
             return res.send({error});
        }

        else {
        forecast(latitude,longitude,(error,{temperature,location,feelslike,country,humidity})=>{
            if (error) {
                return res.send({
                    error:"something went wrong"
                })
            }
            res.send({
                address:location,
                temperature,
                feelslike,
                country,
                humidity
            });

        })
    }
    })
    
    
})

app.get('/products', (req,res)=> {
    console.log(req.query.search);
    if (!req.query.search) {
        return res.send({
            error:"you must provide a search term!"
        })
    }
    
    res.send({
        products:[]
    })

})

app.get('/help/*',(req,res)=> {
    res.render('404.hbs', {
        title:'404',
        name:'Teh Pwnerer',
        message:"Help article not found."
    })
})

app.get('*',(req,res)=>{
    res.render('404.hbs', {
        title:'404',
        name:'Teh Pwnerer',
        message:"U GOT 40PW0NED!"
    })
    
})
// app.com
// app.com/help
// app.com/about

app.listen(port, ()=> {console.log("server starts at port: "+port)});
