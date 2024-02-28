const express = require('express');
const fs = require('fs');

const app = express();

app.get("/",(req,res)=>{
    fs.readFile('products.json','utf-8',(err,data)=>{
        if(err)
         console.log(err);
        else {
            const products = JSON.parse(data);
            res.json(products);
        }
    })
})

app.get("/products",(req,res)=>{
  if(req.query.category === 'food'){
    fs.readFile('products.json','utf-8',(err,data)=>{
      if(err)
       console.log(err);
      else{
        const products = JSON.parse(data);
        const filteredProducts = products.filter(product => product.category === 'food');
        res.json(filteredProducts);
      }
    })
  }
})

const newProducts = [
  { title: 'Product1', category: 'food', price: 10.99 },
  { title: 'Product2', category: 'food', price: 15.99 },
  { title: 'Product3', category: 'others', price: 5.99 }
]
;

fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const existingProducts = JSON.parse(data);
      const updatedProducts = [...existingProducts,...newProducts];
      fs.writeFileSync('products.json', JSON.stringify(updatedProducts, null, 2));
    }
  });


app.listen(3001,(err)=>{
    if(err)
     console.log("unable to start server",err);
    else
     console.log("Server started...");
})