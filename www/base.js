var baseurl = "http://www.m.reisandirvys.com";
var nextpage = "#home";
var view = "frontpage";
var display = "poll";

/* When this function is called, the phone has been initialized and is ready to roll */
function onDeviceReady() {

	username = localStorage.phonegapName;
	title = localStorage.phonegapTitle;
	story = localStorage.phonegapStory;
	blat = localStorage.phonegapLat;
	blong = localStorage.phonegapLong;
	baseurl = localStorage.baseUrl;
	//baseurl = 'http://www.m.reisandirvys.com';
	view = localStorage.view;
	display = localStorage.display;
	

	$("#baseurl").val(baseurl);
		$("#username").val(username);
		$("#storytitle").val(title);
			$("#view").val(view);
			$("#display").val(display);
	/*if (baseurl) {
		$("#baseurl").val(baseurl);
	}

	if (username) {
		$("#username").val(username);
	}

	if (title) {
		$("#storytitle").val(title);
	};
	if (story) {
		$("#story").val(story);
	};

	if (view) {
		$("#view").val(view);
	};

	if (display) {
		$("#display").val(display);
	};
*/
	if (localStorage.localLogin == 3) {
		$("#logoutli").show();
		//$("#logout").show(); // CUSTOM
		$("#loginli").hide();
		//$("#logoutbtn").hide(); // CUSTOM
		//$("#loginbtn").hide(); // CUSTOM
		//$("#login").hide(); // CUSTOM
		
	} else {

		$("#footout").hide();
		
	};

	$.mobile.changePage("#login");

}

function saveSettings() {
	baseurl = 'http://www.m.reisandirvys.com';
	localStorage.baseUrl = baseurl;
	localStorage.view = 'frontpage';
	localStorage.display = 'poll';

	//alert("Connected");

}

/*function saveSettings() {
	baseurl = $("#baseurl").val(baseurl);
	localStorage.baseUrl = baseurl;
	localStorage.view = $("#view").val(frontpage);
	localStorage.display = $("#display").val(poll);
	alert("settings saved");
}
*/
function loginout() {
	if (localStorage.localLogin != 3) {
		//$.mobile.changePage("#login");
		$.mobile.changePage("#login");
	} else {
		logout();
	}
}

function listArticles() {
	url = baseurl + '/phonegap/display_view';
	//url = baseurl + '/phonegap/frontpage';
	$username = '';
	$("#latestlist").html("Retrieving Data...");
	$.post(url, {
		username : $username,
		view : localStorage.view,
		display : localStorage.display
	}, function(data) {
		if (data == '') {
			data = "Connection Error"
		};
		$("#latestlist").html(data);

	});
	$.mobile.changePage("#stories");
}



function saveLogin() {
	username = $("#username").val();
	password = $("#password").val();
	var sayhi = function(data) {
		$("#logmsg").html("server result <br />" + data.result + " status: " + data.status);
		localStorage.localLogin = 5;
		if (data.status == "ok") {
			localStorage.localLogin = 3;
			localStorage.hash = data.hash;
			$.mobile.changePage("#home");
		};
	};
	var saybi = function(data) {
		$("#logmsg").html("connection error ");
	};
	if (username) {
		localStorage.phonegapName = username;
		if (password) {
			localStorage.phonegapPass = password;
			$("#logmsg").html("Settings for " + username + " trying to contact server ...");
			purl = baseurl + '/phonegap/login';
			$.ajax({
				type : 'POST',
				url : purl,
				dataType : 'json',
				success : sayhi,
				error : saybi,
				data : {
					username : username,
					password : password
				}
			});
			return false;
		}
	}
};

function sendStory() {
	$.mobile.changePage("#sending");
	title = $("#storytitle").val();
	story = $("#story").val();
	localStorage.phonegapTitle = title;
	localStorage.phonegapStory = story;
	uname = localStorage.phonegapName;
	hash = localStorage.hash;
	url = baseurl + '/phonegap/post';
	$("#sentmessage").html('<img id="sending" title="sending" alt="sending" src="images/loadingt.gif" /><br /> Your Message is being sent. If this message does not change after two minutes, please check your network connectivity.')
	$.post(url, {
		username : uname,
		password : hash,
		title : title,
		body : story
	}, function(data) {
		var content = $(data).find('#main');
		if (isNumeric(data)) {
			localStorage.phonegapPosted = 3;
			$("#sentmessage").html('your story has been uploaded with id: ' + data + '<br /> please go to my stories to check your story, before clearing it ready for your next report.<br /> <br /> <a class="ui-btn ui-btn-icon-right ui-li ui-corner-top ui-corner-bottom ui-btn-up-c ui-btn-active" onclick="listArticles();" ><p> &nbsp;Show articles</p></a><br /> <br />');
		} else {
			$("#sentmessage").html('There has been a problem uplaoding your story: ' + data + '<br /> please check your settings and connectivty and try again.<br /> <a onclick="listStories();" ><img src="images/my-stories.png" /></a>');
		}
	});
};

function logout() {
	localStorage.phonegapName = "";
	localStorage.phonegapPass = "";
	localStorage.localLogin = 5;
	$("#username").val("");
	$("#password").val("");
	$("#logoutli").hide();
	$("#loginli").show();
	//$("#logoutbtn").hide();
	//$("#loginbtn").show();
	$("#footout").fadeOut();
}

$("#logmsg").html("Settings for " + username + " trying to contact server ...");
function how() {
	$.mobile.changePage("#howitworks");
	//$.username.html("#loggedin");
}

function clearData() {

	localStorage.phonegapName = "";
	localStorage.phonegapPass = "";
	localStorage.localLogin = 5;
	$("#username").val("");
	$("#password").val("");
	$("#logoutlia").val("Login");
	clearStoryData();
}

function addStory() {
	if (localStorage.localLogin != 3) {
		nextpage = "#addstory";
		$.mobile.changePage("#home");
	} else {
		$.mobile.changePage("#addstory");
	};
}

function onBodyLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
	//$("#loggedin").html(username);
}

function isNumeric(input) {
	return (input - 0) == input && input > 0;
}

/*$("#hide").click(function(){
  $("p").hide();
});

$("#show").click(function(){
  $("p").show();
});
*//// GUIDE ONLY

 saveSettings();;
$("backbtn").hide();
