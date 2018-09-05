function logIn(){
	var uId = document.getElementById('user').value;
	

	var URL = "http://localhost:8080/login?user=" + uId;
	
	$.ajax({
			type: "GET",
			url: URL,
			dataType: "html",
			success: function(msg){
				if(msg == 'Success'){
					$("#output").html("Login Success");
					loadPage(3);
				}
				else
					$("#output").html("Invalid Credentials");
			},
			error: function(xhr, ajaxOptions, thownError){
				//Outputs error if server doesn't respond
				$("#output").html("ERROR");
			}
		});


}