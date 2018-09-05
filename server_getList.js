var express = require('express'); //Requires express 
var http = require('http'); //Requires http
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');
var fs = require('fs');
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'drexelcs275',
	database: 'trutrition'
});

global.currentItem = [null,null];
global.userName = null;

app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

con.connect(function(err){
	if(err)
		console.log(err+"Error Connecting");
	else
		console.log("Connection Successful");	
});

var getList = require("./USDAModule").USDAModule;
var list = new getList();


app.get("/addEntry", function(req,res){
	console.log(userName);
	currentItem[0] = currentItem[0].replace('"','');
	con.query("Insert into logs (time,servings,username,foodName,nutrition) values ('2018-01-01',1,'"+userName+"',\""+currentItem[0]+"\",'"+currentItem[1]+"')"
	, function(err,rows,fields){
		if(err)
			console.log(err);
		else{
		res.send("Success");
		}	
	});
	
});


app.get("/loadPage", function(req,res){
	/*Page Numbering
	login - 1
	createUser - 2
	home - 3
	diary - 4
	lookup - 5
	*/
	var page = parseInt(req.query.page);
	var html;
	switch(page){
		case 1:
			html = fs.readFileSync('login.html');
			break;
		case 2:
			html = fs.readFileSync('createUser.html');
			break;
		case 3:
			html = fs.readFileSync('Trutrition_Home.html');
			break;
		case 4:
			html = fs.readFileSync('personaldiary.html');
			break;
		case 5:
			html = fs.readFileSync('List.html');
			break;
	}
	res.send(html);
	
});

app.post("/createUser", function(req,res){
	var user = req.body.user;
	console.log(user);
	con.query("Insert into users (username) values ('"+user+"')", function(err,rows,fields){
		if(err)
			console.log(err);
		res.send("Success");
			
	});
	
	
});

app.get("/login", function(req,res){
	var user = req.query.user;
	con.query('Select * from users', function(err,rows,fields){
		if(err)
			console.log(err);
		else{
			console.log(rows[0].username +"USER" + user);
			for(i=0; i <rows.length; i++){
				console.log(String(rows[i].username));
				if(String(rows[i].username) == String(user)){
					userName = user;
					res.send('Success');
					return;
				}
			}
		res.send("error");
		}	
	});
	
});

app.get("/validate", function(req,res){
	var user = req.query.user;
	con.query('Select * from users', function(err,rows,fields){
		if(err)
			console.log(err);
		else{
			console.log(rows[0].username +"USER" + user);
			for(i=0; i <rows.length; i++){
				console.log(String(rows[i].username));
				if(String(rows[i].username) == String(user)){
					res.send('Success');
					return;
				}
			}
		res.send("error");
		}	
	});
	
});

app.get("/getUser", function(req,res){
	res.send(userName);	
});

app.get("/foodList", function(req,res){
	
	var food =  String(req.query.input);
	var n = String(req.query.num);
	
	list.once("ndbno", function(msg){
		var flist = "<ol>";
		console.log(msg.length);
		if("errors" in msg){
			console.log("ooh baby");
			res.send("Error determining input, no results found. Please try again.")
		}
		else{
			for(var i = 0; i < msg.list.item.length; i++){
				var descr = msg.list.item[i].name;
				console.log(descr);
				var ndbno = msg.list.item[i].ndbno;
				flist += "<li onclick=requestNutri(" + "'" + ndbno + "'" + ") >" + descr + " <br> NDBNO Code: " + ndbno + "</a> </li> <br>";
			}
			food += "</ol>";

		console.log(flist);
		res.send(flist);}
		});	
		
	list.getNDBNO(food, n);
	
});

app.get("/nutrients", function(req, res){
	
	var item = req.query.food;
	console.log(item);
	
	var html = "<p>"
	
	list.once("result", function(msg){
		currentItem[0]=msg.name;
		nutrition = "";
		console.log(msg.nutrients);
		var nutri = [0,1,2,3,4];
		var html= "<p>"+"<button onclick='addEntry()'>Add to Diary</button><br>" + msg.name; 
		for(x = 0; x < nutri.length; x++){
			console.log(nutri[x]);
			html += "<br>" + msg.nutrients[nutri[x]].name + "<br>" + msg.nutrients[nutri[x]].value + msg.nutrients[nutri[x]].unit + "</p>";
			nutrition += String(msg.nutrients[nutri[x]].name)+": "+String(msg.nutrients[nutri[x]].value) + String(msg.nutrients[nutri[x]].unit) + " ";
		}
		currentItem[1]=nutrition;
		console.log(html);
		res.send(html);
	});
	
	list.getInformation(item);
	
	
	
});

app.get("/updateDiary", function(req,res){
	var table = "<table border='1'><tr>";
	con.query("SELECT distinct users.username,foodName,nutrition,servings,time FROM users,logs where users.username = logs.username and users.username ='"+userName+"'", function(err, rows, fields) {
         if (err) {
             console.log(err);
             res.send('describeTables', 'Error while processing query...');
         } 
		 else {
             for(var i = 0; i < fields.length; i++){
				table += "<th>"+fields[i].name+"</th>";
			}
			table += "</tr><tr>"
			for(var j = 0; j<rows.length; j++){
				table += "<tr>";
				for ( x in rows[j]){
					table += "<td>" + rows[j][x] + "</td>";
				}
				table += "</tr>";
			}
			table += "</tr></table>";
			res.send(table);
         }
     });	
});





app.listen(8080,function(){
	console.log("Server Up!");
});


