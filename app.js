const express=require('express');
const app=express();

const fs=require('fs');

const PORT=3000;

// json data
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// read
const readhospitaldata=()=>{
    const rawData=fs.readFileSync('data.json');
    return JSON.parse(rawData);
};

// write
const writehospitaldata=(data)=>{
    fs.writeFileSync('data.json', JSON.stringify(data,null,2));
};


// GET = http://localhost:3000/hospitals (to show all)
app.get('/hospitals',(req,res)=>{
    const hospitals=readhospitaldata();
    res.json(hospitals);
});


// GET = http://localhost:3000/hospital/2 (to show 3rd hospital)
app.get('/hospital/:index',(req,res)=>{
    const hospitals=readhospitaldata();
    const index=req.params.index;
    if(index<hospitals.length)
    {
        res.json(hospitals[index]);
    }
    else
    {
        res.status(404).send('Hospital Not found');
    }
});


// POST = http://localhost:3000/hospital (add data in json format)
app.post('/hospital',(req,res)=>{
    const hospitals=readhospitaldata();
    const Newhospital=req.body;
    hospitals.push(Newhospital);
    writehospitaldata(hospitals);
    res.send('Hospital data added');
});

// PUT = http://localhost:3000/edit/hospital/1 (edit 2nd hospital details)
app.put('/edit/hospital/:index',(req,res)=>{
    const hospitals=readhospitaldata();
    const index=req.params.index;
    if(index<hospitals.length)
    {
        hospitals[index]=req.body;
        writehospitaldata(hospitals);
        res.send('Hospital details updated');
    }
    else
    {
        res.status(404).send('Hospital not found');
    }
});

// DELETE = http://localhost:3000/delete/hospital/4 (deletes 5th hospital data)
app.delete('/delete/hospital/:index',(req,res)=>{
    const hospitals=readhospitaldata();
    const index=req.params.index;
    if(index<hospitals.length)
    {
        hospitals.splice(index,1);
        writehospitaldata(hospitals);
        res.send('Hospital data deleted');
    }
    else
    {
        res.status(404).send('Hospital not found');
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running on code ${PORT}`);
});