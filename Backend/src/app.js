const express=require('express');

const app=express();



app.use('/hello',(req,res)=>{
    res.send("hello path created")
});
app.use('/',(req,res)=>{
    res.send('/ path created')
});

app.listen(3000,()=>{
    console.log("port 30000")
})