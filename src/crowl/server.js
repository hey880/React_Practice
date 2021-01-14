const express = require("express");
const { getProduct } = require("./crawlProduct.js");
const fs = require("fs");

const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const cron = require("node-cron");

const ProudctJSON = fs.readFileSync("./product.json");
const newsData = JSON.parse(newsJSON);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



async function getProductAsync() {
  const Product_data = await getProduct();
  console.log("Product = ", Product_data);
  console.log(ProudctJSON.text);
}


cron.schedule("*/1 * * * *", async () => {
  console.log("running a task every two minutes");
  await getProductAsync();
});


app.get("/api/product",async(req,res)=> {
  res.send(ProudctJSON);
})



app.listen(port, () => console.log(`Listening on port ${port}`));