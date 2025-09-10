const { chromium } = require('playwright');  // use require for Node

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const now = new Date();

  const formattedTime = now.toLocaleString('en-US', {
    
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
    
  });
  console.log(formattedTime);

 const retime =  formattedTime.replace("," ,"");

 console.log(retime);

  await browser.close();
})();
