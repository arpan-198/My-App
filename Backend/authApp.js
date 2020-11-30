const express=require('express');
const body=require('body-parser');
const app=express();
const cors=require('cors');

const authRouter=require('./router/auth')

app.use(body.json());
app.use(body.urlencoded({extended:false}));
app.use(cors());



app.use('/',authRouter);

module.exports=app;


