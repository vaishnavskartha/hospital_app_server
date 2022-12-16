const express=require('express');
const app=new express();
const fs=require('fs');
app.use(express.json());
const data=require('./dataset.json');
app.get('/hospital',(req,res)=>{
    res.send(data);
})
app.post('/hospital',(req,res)=>{
data.push(req.body);
fs.writeFile('dataset.json',JSON.stringify(data),(err,resp)=>{
    if(err){
        res.send("Data cannot be written");
    }
    else{
        res.send("Data written successfully");
    }
})
})
app.put('/hospital/:name',(req,res)=>{
    let name=req.params.name;
    data.forEach((item)=>{
        if(item.hospitalname==name){
            item.hospitallocation=req.body.hospitallocation;
            item.patientcount=req.body.patientcount;
        }
    })
    fs.writeFile('dataset.json',JSON.stringify(data),(err,resp)=>{
        if(err){
            res.send("Data cannot be updated");
        }
        else{
            res.send("Data updated successfully");
        }
    })
})
app.delete('/hospital/:name',(req,res)=>{
    let name=req.params.name;
    let value=data.filter(item=>item.hospitalname !== name);
    fs.writeFile('dataset.json',JSON.stringify(value),(err,resp)=>{
        if(err){
            res.send("Data cannot be deleted");
        }
        else{
            res.send("Data deleted successfully");
        }
    })
})

app.listen(3000);
console.log("Server listening to port 3000");