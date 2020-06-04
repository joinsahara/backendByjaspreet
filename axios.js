const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post('/', (req,res,next)=>{
// set up the request parameters
const params = {
  api_key: "297C4B14528949BDA959554A1C3EAF34",
  
 
  search_type: "shopping",
  location: req.query.location,
  google_domain: req.query.googleDomain,
  time_period: "last_year",
  sort_by: "base_price",
  shopping_condition: "new",
  output: "json",
  page: "1",
  num: "10",
  gl: req.query.gl,
  hl: req.query.hl,
  q: req.query.q
}

// make the http GET request to Scale SERP
axios.get('https://api.scaleserp.com/search', { params })
  .then(response => {

    // print the JSON response from Scale SERP
    console.log(JSON.stringify(response.data, 0, 2));
    response.status(200).json({
        message : "Prodect has been fetched successfully",
        result : response.data.shopping_results
    });

  }).catch(error => {
    // catch and print the error
    console.log(error);
    res.status(500).json({
        message : error
    })
  })
});



// export  module
module.exports = router;