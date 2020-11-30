const express=require('express');
const body=require('body-parser');
const app=express();
const cors=require('cors');

const userRouter=require('./router/user')

app.use(body.json());
app.use(body.urlencoded({extended:false}));
app.use(cors());



app.use('/',userRouter);

module.exports=app;


