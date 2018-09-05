
function createUser(){
	var uId = document.getElementById('user').value;
	var exists = false;
	
	var URL = "http://localhost:8080/validate?user=" + uId;
	
	if(uId.length > 10){
		$("#output").html("Username contains too many characters. Please try again");
	}
	else{
		$("#output").html("");
		params = {
			user: uId
		};
	
		exists = false;
		
		$.ajax({
				type: "GET",
				url: URL,
				dataType: "html",
				success: function(msg){
					if(msg != 'Success'){
					//----------------------
						URL = "http://localhost:8080/createUser?user=" + uId;
						$.ajax({
							type: "POST",
							url: URL,
							dataType: "html",
							data: params,
							success: function(msg){
								if(msg == 'Success'){
									$("#output").html("User Successfully Created");
									loadPage(1);
								}
								else
									$("#output").html("Invalid USERNAME, Please Try Again");
							},
							error: function(xhr, ajaxOptions, thownError){
								//Outputs error if server doesn't respond
								$("#output").html("ERROR");
							}
						});
					//------------------------------------------	
					}
					else
						$("#output").html("UserName already exists, please try again");
				},
				error: function(xhr, ajaxOptions, thownError){
					//Outputs error if server doesn't respond
					$("#output").html("ERROR");
				}
			});
		
		
		
			
		
	}
}