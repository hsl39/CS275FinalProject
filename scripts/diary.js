function updateDiary(){
	var URL = "http://localhost:8080/updateDiary";
	
	
	
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