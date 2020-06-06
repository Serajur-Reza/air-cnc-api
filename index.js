const express= require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app= express();


app.use(cors())
app.use(bodyParser.json())




// const dbUser= process.env.DB_USER;
// const pass=process.env.DB_PASS;
// const uri = process.env.DB_PATH;

//connection

const uri = process.env.DB_PATH;
// let client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("Database connected")
//   client.close();
// });


app.get('/', (req,res)=>{
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("air-cnc").collection("experiences");
    collection.find().toArray((err,result)=>{
      if(err){
        console.log(err);
        res.status(500).send({message : err})
      }
      else {
          res.send(result)
      }
    })
    client.close();
  });
})

app.get('/experience/:id', (req,res)=>{
  const id=req.params.id

  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("air-cnc").collection("experiences");
    collection.find({id}).toArray((err,result)=>{
      if(err){
        console.log(err);
        res.status(500).send({message : err})
      }
      else {
          res.send(result)
      }
    })
    client.close();
  });
})

app.post("/addExperience",(req,res)=>{
  const experience= req.body
    
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("air-cnc").collection("experiences");
      collection.insert(experience, (err,result)=>{
        if(err){
          console.log(err);
          res.status(500).send({message : err})
        }
        else {
            res.send(result.ops[0])
        }
      })
      client.close();
    });
})

app.get('/homes', (req,res)=>{
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("air-cnc").collection("homes");
    collection.find().toArray((err,result)=>{
      if(err){
        console.log(err);
        res.status(500).send({message : err})
      }
      else {
          res.send(result)
      }
    })
    client.close();
  });
})

app.get('/homes/:id', (req,res)=>{
  const id=req.params.id

  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("air-cnc").collection("homes");
    collection.find({id}).toArray((err,result)=>{
      if(err){
        console.log(err);
        res.status(500).send({message : err})
      }
      else {
          res.send(result)
      }
    })
    client.close();
  });
})

app.post("/addHome",(req,res)=>{
  const home= req.body
    
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("air-cnc").collection("homes");
      collection.insert(home, (err,result)=>{
        if(err){
          console.log(err);
          res.status(500).send({message : err})
        }
        else {
            res.send(result.ops[0])
        }
      })
      client.close();
    });
})

app.post('/addBooking',(req,res)=>{
    const book= req.body
    
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("air-cnc").collection("bookings");
      collection.insert(book, (err,result)=>{
        if(err){
          console.log(err);
          res.status(500).send({message : err})
        }
        else {
            res.send(result.ops[0])
        }
      })
      client.close();
    });

})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening from port ${port}`))