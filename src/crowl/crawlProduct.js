const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

let html = "";

async function getHtml() {
  try {
    return await axios.get("https://www.coupang.com/np/categories/306749?channel=plp_C2");
  } catch (error) {
    console.error(error);
  }
}

async function getProduct() {
  if (!html) {
    html = await getHtml();
  }

  const dataArr = [];
  const dataPath = "./product.json";
  const $ = cheerio.load(html.data);

  $(".newcx-container .newcx-body .newcx-main .newcx-list ul li")
  .each(async function (index, item) {
    var src ='http:'+ $(item).find("dl").find("img").attr("src");
    var title = $(item).find("dl").find("img").attr("alt");
    var price = $(item).find("dl").find("dd").find(".sale")
    .find(".price-value").first().text();
    var a ='https://www.coupang.com/'+$(item).find("a").attr("href");
    
      var data = {
        src: src,
        title: title,
        price:price,
        a:a
      };
      if (index > 7) {
        dataArr.push(data);
        fs.writeFileSync(dataPath, JSON.stringify(dataArr));
        console.log("product on json file");
      }
    }
  );
}
module.exports = { getProduct };