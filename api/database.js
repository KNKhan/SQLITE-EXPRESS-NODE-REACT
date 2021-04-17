var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database')
        db.run(`CREATE TABLE userslist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstname text, 
			lastname text,
			email text,		
			dob number
            )`,
			(err) => {
            if (err) {
                // Table already created
				console.log('error log');
            }else{
                // creating test records by loop instead of manual
				console.log('success log');
				var fname = "f name";
				var lname = "l name";
				var email = "email";
				var dob = new Date();
				
				var insert = 'INSERT INTO userslist (firstname, lastname, email, dob) VALUES (?,?,?,?)'
				for(i=0; i<2000; i++) {					
					db.run(insert, [fname+i,lname+i,email+i+"@myspace.com",dob])                
				}
            }
        });  
    }
});

module.exports = db