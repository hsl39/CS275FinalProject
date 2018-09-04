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


app.get("/", function(req,res){
	res.sendfile("login.html");
	
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
					res.send('Success');
					return;
				}
			}
		res.send("error");
		}	
	});
	
});



app.get("/foodList", function(req,res){
	
	var food =  String(req.query.input);
	
	
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
		
	list.getNDBNO(food, 25);
	
});

app.get("/nutrients", function(req, res){
	
	var item = req.query.food;
	console.log(item);
	
	var html = "<p>"
	
	list.once("result", function(msg){
		var nutri = [1,3,4,5,6];
		var html= "<p>" + msg.name; 
		for( x in nutri){
			console.log(x);
			html += "<br>" + msg.nutrients[nutri[x]].name + "<br>" + msg.nutrients[nutri[x]].value + msg.nutrients[nutri[x]].unit + "</p>";
		}
		console.log(html);
		res.send(html);
	});
	
	list.getInformation(item);
	
	
	
});






app.listen(8080,function(){
	console.log("Server Up!");
});


