var express = require('express'); //Requires express 
var http = require('http'); //Requires http
var app = express();

app.use(express.static("."));

var getList = require("./USDAModule").USDAModule;
var list = new getList();






app.get("/foodList", function(req,res){
	
	var food =  String(req.query.input);
	
	var n = req.query.num;
	
	
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
			flist += "<li ondblclick=requestNutri(" + "'" + ndbno + "'" + ") >" + descr + " <br> NDBNO Code: " + ndbno + "</a> </li> <br>";
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
		var nutri = [1,3,4,5,6];
		var html= "<p>" + msg.name + "<br><br> Nutritional Facts: <br>"; 
		for( x in nutri){
			console.log(x);
			html += "<br>" + msg.nutrients[nutri[x]].name + "<br><font color=green>" + msg.nutrients[nutri[x]].value + msg.nutrients[nutri[x]].unit + "</font></p>";
		}
		console.log(html);
		res.send(html);
	});
	
	list.getInformation(item);
	
	
	
});






app.listen(8080,function(){
	console.log("Server Up!");
});


