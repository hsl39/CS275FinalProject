var EventEmitter = require('events').EventEmitter;
var request = require('request');
var eventEm = new EventEmitter;

class USDAModule extends EventEmitter{
	constructor(){
		super();
	}
	
	//Gets nutritional information based on the ndbno number
	getInformation(number){
		var ndbno = number;
		var URL = 'https://api.nal.usda.gov/ndb/reports/?ndbno='+ndbno+'&type=b&format=json&api_key=lZIqzPiEXSImPbcdpu5tanygbkEIXWc7XHIDdQxO';
		var self = this;
		
		request(URL, function(error,response,body){
			var json = JSON.parse(body);
			console.log(json.report.food.nutrients);
			self.emit('result',json.report.food.nutrients);
		});
		
	}	
	
	//Gets the ndbno list
	getNDBNO(descr, length){
		var URL = 'https://api.nal.usda.gov/ndb/search/?format=json&q='+descr+'&sort=r&max='+length+'&offset=0&api_key=lZIqzPiEXSImPbcdpu5tanygbkEIXWc7XHIDdQxO'; 
		request(URL, function(error,response,body){
			var json = JSON.parse(body);
			var ndbno = String(json.list.item);
			console.log(json.list.item)
			self.emit('ndbno',ndbno);
		});	
	};
	
}

exports.USDAModule = USDAModule;