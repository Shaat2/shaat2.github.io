$(document).ready(function(){
	var ip;
	loadLinks();
	$.ajax({
		url: "../../ip/ip.txt",
		dataType: "text",
		success: function(data){
			ip = data;
			console.log(ip);
		},
		error: function(jqXHR, tS, error){
			ip = "error"
		},
		complete: function(){
			var api_url = "http://" + ip + "/products/api";
			console.log(api_url);
			$.ajax({
				type: "GET",
				dataType : "json",
				url: api_url,
				success: fillData,
				error: function(){
					$("#data").text("DB SZERVER NEM ELÉRHETŐ").style("width:50%;margin:auto;display:flex;text-transform: uppercase;font-size: 100px; color:#f44336");
				}
			});
		}
	});

});

function fillData(data){
	for(var i=0; i<30; ++i){
		var div = document.createElement("div");
		$(div).attr("class", "product")
			.text(data[i].product_name)
			.appendTo("#data");
	}
	/* $("#data").text(data[0].product_name);*/
}

function loadLinks(){
	$.ajax({
		url: "../pages.json",
		dataType: "json",
		success: function(data){
			for(var i=0; i<data.length; ++i){
				var link = document.createElement("a");
				if(data[i].name === "REST próba"){
					$(link).text(data[i].name).attr("href", "#");
					$("#links").append(link);
				}
				else{
					$(link).text(data[i].name).attr("href", "../../" + data[i].url);
					$("#links").append(link);
				}
				
			}
		}
	});
}