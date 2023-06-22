 // for our server   establishment
// when an request is received ,to extract out the necessary data and to neglect the metadata,
// the body parser is used ,for parsing and allowing the user data to be accessed
const express=require("express")
const bodyParser=require("body-parser")
const mailchimp=require("@mailchimp/mailchimp_marketing")
// this module ,make the communication with the mailchimp server possible,so that 
// we would be able to use their database for our purpose


mailchimp.setConfig({
  apiKey:"7485970a171924df9824a26dee745b7e-us9",
  server:"us9"
})
// this is our application server , the express object
const app=express()
// the app uses the express static to send along with file,i.e html a folder provided which can be css,images.icon is any
app.use(express.static("public"))
//In bodyparsing  , it depends whether the received request is of form data or something else
// to extract the form data ,we always use the urlencoded method when data is provided through form
// bodyParser.text(),parse the request into text type ,
app.use(bodyParser.urlencoded({extended:true}))
// when a request is received on the server by an browser ,and file is send to the client 
// since the app uses express static folder of other files would also be sended
app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html")
})
// async function run() {
//     const response = await client.ping.get();
//     console.log(response);
//   }
  
  // When an request to posting in  which  data is send to the server to collect this data a posting 
  // method of app is declared ,and posting must happen on to the home route and consecutively the 
  // call back function is called where the created object of request data and response is passed
app.post("/",async(req,res,next)=>{
  // the body parser transform's the request into an object which display the following data properties
    const name=req.body.first
    const last=req.body.last
    const email=req.body.email
    // this is the object as per mailchimp requirements
   var data={
       "email_address":email,
       "status":"subscribed",
       "merge_fields":{
                FNAME:name,
                LNAME:last
            }
      }

   // since it requires a flat single string json we need to stringify our js object
 const jsond=JSON.stringify(data)
 const response=await mailchimp.lists.addListMember("3568bbcfd3",jsond);
//  res.status(200).json(response)
console.log(response);
res.redirect("/");
  })

app.listen(3000,function(){
    console.log("server established")
})


// API key (this tell's the mailchimp server that it is your )
// d27dfe50d006cbcfacc12171b2136a5d-us9
// audience/list (this tell the mailchimp the list in which the provided person to be added)
// 3568bbcfd3

// client.setConfig({
//   apiKey: "d27dfe50d006cbcfacc12171b2136a5d-us9",
//   server: "us-9",
// });
// const run = () => {
//   const response =  client.lists.addListMember("3568bbcfd3", {
//     email_address: email,
//     status: "subscribed",
//     merge_fields:{
//         FNAME:name,
//         LNAME:last
//     }
//   });
//   console.log(response);
// };

// run();