// Create express app
var express = require("express");
var app = express();
var cors = require("cors");
var db = require("./database.js");

app.use(cors()); // for cors disabling

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Connected"})
});

//API endpoint
app.get("/api/users", (req, res, next) => {
	console.log('req query', req.query);
	
    var sql = "select * from userslist"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
			return;
        }
		
		var start = req.query.start;
		var end = req.query.end;
		
		resp = (start, end, rows) => {
			return rows.slice(start, end);
		}
		
        res.json({
            "message":"success",
			"totalRecords": rows.length,
            "data":resp(start, end, rows)
        })
		
      });	  
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
