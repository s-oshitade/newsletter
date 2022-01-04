const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
// const request = require('request');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=> {
  res.sendFile(__dirname + '/signup.html');
})

app.post("/", (req, res)=>{

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName  
        }
    }
  ]
  };

  let jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/860e554851";
  const options = {
    method: "POST",
    auth: "TLK:a015f0ea53e3e888f223b15dbc5960cd-us20"
  }

  const request = https.request(url, options, function(response){

  if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
 request.write(jsonData);
 request.end();
}) 

app.post("/failure", function(req, res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000, ()=> {
  console.log("Server is running on port 3000");
})

// apiKey a015f0ea53e3e888f223b15dbc5960cd-us20
// audienceID 860e554851

