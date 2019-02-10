$(window).ready(function($) {
		
	// Navigation Scroll	
	$(window).scroll(function(event) {
		if ($(window).scrollTop() < $(window).height()) {
			
			//if ($(window).scrollTop() > $(window).height()) {
				//console.log( $("#tint").css("background-color").split(", ")[3].substring(0,5) );
				
				var percentage = Math.round( (110 / $(window).height()) * $(window).scrollTop()) / 100;
				
				if (percentage > 1)
					percentage = 1;
				
				
				//var r = (100/43)*percentage;
				//var g = (100/46)*percentage;
				//var b = (100/71)*percentage;
				
				
				$("#tint2").css("background", "rgba(" + 107 + "," + 175 + "," + 64 + "," + percentage + ")");
				//console.log(percentage)
				$("section#main h1").css("opacity", 1-percentage);
				//console.log( percentage );
				var scrollmultiplier = 1;
				if ($(window).width() <= 999) {
					scrollmultiplier = 0;
				}
				$("section#main #mobileMockup").css("margin-top", -295-$(window).scrollTop()*scrollmultiplier );
				
			//}
				
		}
		
	});
	
	$.getJSON( "/featuredServers.php", function( data ) {
		var html = "";
		
		$.each(data, function(key, server) {
			html += ""
			+ "	<div>"
			+ "		<div class=\"title\">" + colorString(server.name).replace(/_/g, ' ') + "</div>"
			+ "		<div class=\"slots\">" + server.num_online + "/" + server.max_online + "</div>"
			+ "		<div class=\"ip\"><span>IP:</span> <span class=\"bright\" onclick=\"this.selectText();\">" + (server.domain_custom != "" ? server.domain_custom : server.domain) + "</span> : <span>Port:</span> <span class=\"bright\">" + server.port + "</span></div>"
			+ "	</div>"
		})
		
		$("#list").html(html)
		
	});
	
	$(".items > div > a").click(function(e) {
		if ($(this).parent().find("p").css("display") != "none") {
			$(this).parent().find("p").hide()
		} else {
			$(".items > div > p").each(function(e) {
				$(this).hide()
			})
			$(this).parent().find("p").show()
		}
	})
});
function colorString(input) {
	var output = "";
	var closed = true;
	
	if(input != null)
	for(var i=0; i <input.length;i++) {
		if(input.charCodeAt(i)==167 || (input.charAt(i)=='&' && input.charAt(i+1)=='s' && input.charAt(i+2)=='e' && input.charAt(i+3)=='c' && input.charAt(i+4)=='t' && input.charAt(i+5)==';') || input.charCodeAt(i)==64) {
			if(input.charAt(i)=='&')i+=5;
			i++;
			if(!closed)output = output+"</font>";
			output=output+"<font style=\"color: "+getColorFromCode(input.charAt(i))+";\">";
			closed=false;
		} else {
			output = output + input.charAt(i);
		}
	}
	if(!closed)output = output+"</font>";
	return output;
}

function getColorFromCode(code) {
	switch(code.toLowerCase()) {
		case '0':
			return "#000000";
			break;
		case '1':
			return "#0000aa";
			break;
		case '2':
			return "#00aa00";
			break;
		case '3':
			return "#00aaaa";
			break;
		case '4':
			return "#aa0000";
			break;
		case '5':
			return "#aa00aa";
			break;
		case '6':
			return "#ffaa00";
			break;
		case '7':
			return "#aaaaaa";
			break;
		case '8':
			return "#555555";
			break;
		case '9':
			return "#5555ff";
			break;
		case 'a':
			return "#55ff55";
			break;
		case 'b':
			return "#55ffff";
			break;
		case 'c':
			return "#ff5555";
			break;
		case 'd':
			return "#ff55ff";
			break;
		case 'e':
			return "#ffff55";
			break;
		default:
			return "#000000";
	}
}

function resetter() {
	$('body').addClass('noscroll')
	$("body").append(""
	+ "<div id=\"passwordFader\"></div>"
	+ "<div id=\"passwordContainer\">"
		+ "<div id=\"modal\">"
			+ "<div id=\"top\">"
				+ "<center>"
				+ "<h1>Password Reset</h1>"
				+ "Enter your Leet account data"
				+ "<span></span"
				+ "</center>"
			+ "</div>"
			+ "<div id=\"body\">"
				+ "<form id=\"passwordReset\" method=\"post\">"
					+ "<div class=\"input\">"
						+ "<div class=\"icon\">"
							+ "<div>"
								+ "<i class=\"fa fa-envelope\"></i>"
							+ "</div>"
						+ "</div>"
						+ "<div class=\"core\">"
							+ "<div>"
								+ "<input type=\"text\" name=\"email\" id=\"email\" placeholder=\"Email address\" >"
							+ "</div>"
						+ "</div>"
					+ "</div>"
					+ "<br>"
					+ "<input type=\"submit\" value=\"Request Reset\" >"
				+ "</form>"
			+ "</div>"
		+ "</div>"
	+ "</div>"
	+ "")
}

function discord() {
	$('body').addClass('noscroll')
	$("body").append(""
	+ "<div id=\"passwordFader\"></div>"
	+ "<div id=\"discordContainer\">"
		+ "<div id=\"modal\">"
			+ "<div id=\"top\">"
				+ "<center>"
				+ "<h1>Official Discord Server</h1>"
				+ "<span></span"
				+ "</center>"
			+ "</div>"
			+ "<div id=\"body\">"
				+ "<iframe src=\"https://discordapp.com/widget?id=382669571934388245&title=test&theme=dark&join=true&abc=false&hideChannels=TechKing's Office\" width=\"350\" height=\"500\" allowtransparency=\"true\" frameborder=\"0\"></iframe>"
			+ "</div>"
		+ "</div>"
	+ "</div>"
	+ "")
}

$(document).on("submit", '#passwordReset', function(event) {
	event.preventDefault();
	var emailAddr = $(this).find("#email").val()
	$.post( "reset/?action=resetPassword", { email:  emailAddr, email2: emailAddr})
	.done(function( data ) {
		if (data.indexOf("Invalid email") > -1 || data.indexOf("No email found") > -1) {
			$("#passwordContainer #modal #top span").html("Invalid account")
		} else
		if (data.indexOf("An email has been sent with a link that resets the password.") > -1) {
			$("#passwordContainer #modal #top span").html("");
			$("#passwordContainer #modal #body").html("<center><span style=\"color:#444;font-weight:400;font-size:13px;\">Please check your email to confirm a password reset.</span></center>")
		}
	});
});



$(document).on("click", '#passwordContainer, #passwordFader, #discordContainer', function(event) {
	$('#passwordFader').remove();
	$('#passwordContainer').remove();
	$('#discordContainer').remove();
	$('body').removeClass('noscroll')
});
$(document).on("click", '#passwordContainer #modal', function(event) {
	e.stopPropagation();
});