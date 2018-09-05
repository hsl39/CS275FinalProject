function requestFood(){
 
	var URL = "http://localhost:8080/foodList?input=";
	
	var input = String(document.getElementById('food').value);
	URL += decodeURI(input);
	
	var num = document.getElementById('num').value;
	URL +="&num=" + num;
	
	$.ajax({
			type: "GET",
			url: URL,
			dataType: "html",
			success: function(msg){
				//Outputs the answer if the server responds
				$("#output").html(msg);
			},
			error: function(xhr, ajaxOptions, thownError){
				//Outputs error if server doesn't respond
				$("#output").html("ERROR: ");
			}
		});
}
		
function requestNutri(ndbno){
 
	var URL = "http://localhost:8080/nutrients?food=" + ndbno;
	
	
	
	$.ajax({
			type: "GET",
			url: URL,
			dataType: "html",
			success: function(msg){
				//Outputs the answer if the server responds
				$("#output").html(msg);
			},
			error: function(xhr, ajaxOptions, thownError){
				//Outputs error if server doesn't respond
				$("#output").html("ERROR");
			}
		});
 }
 
function addEntry(){
	
	var URL = "http://localhost:8080/addEntry";
	
	
	
	$.ajax({
			type: "GET",
			url: URL,
			dataType: "html",
			success: function(msg){
				//Outputs the answer if the server responds
				alert("Entry Added");
			},
			error: function(xhr, ajaxOptions, thownError){
				//Outputs error if server doesn't respond
				$("#output").html("ERROR");
			}
		});
	
	
	
	
}