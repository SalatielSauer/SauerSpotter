allmaps = ["aard3c", "academy", "akaritori", "alithia", "alloy", "aqueducts", "arbana", "bvdm_01", "castle_trap", "collusion", "complex", "corruption", "curvedm", "curvy_castle", "darkdeath", "deathtek", "depot", "dirtndust", "DM_BS1", "dock", "douze", "duel7", "duel8", "dune", "elegy", "fanatic_quake", "force", "fragplaza", "frostbyte", "frozen", "fury", "guacamole", "gubo", "hades", "hashi", "hog2", "industry", "injustice", "island", "justice", "kalking1", "katrez_d", "kffa", "killfactory", "kmap5", "konkuri-to", "ksauer1", "legazzo", "lostinspace", "masdm", "mbt10", "mbt2", "mbt9", "memento", "metl2", "metl3", "metl4", "moonlite", "neondevastation", "neonpanic", "nmp8", "nucleus", "oasis", "oddworld", "ogrosupply", "orbe", "orion", "osiris", "ot", "outpost", "paradigm", "park", "pgdm", "phosgene", "pitch_black", "powerplant", "refuge", "renegade", "rm5", "roughinery", "ruby", "ruine", "sauerstruck", "sdm1", "shadowed", "shindou", "shinmei1", "shiva", "simplicity", "skrdm1", "stemple", "suburb", "tartech", "teahupoo", "tejen", "thetowers", "thor", "torment", "tumwalk", "turbine", "wake5", "wdcd", "abbey", "akroseum", "alithia", "arabic", "asgard", "asteroids", "c_egypt", "c_valley", "campo", "capture_night", "caribbean", "collusion", "core_refuge", "core_transfer", "corruption", "cwcastle", "damnation", "dirtndust", "donya", "duomo", "dust2", "eternal_valley", "evilness", "face-capture", "fb_capture", "fc3", "fc4", "fc5", "forge", "frostbyte", "hades", "hallo", "haste", "hidden", "infamy", "killcore3", "kopenhagen", "lostinspace", "mbt12", "mercury", "monastery", "nevil_c", "nitro", "nmp4", "nmp8", "nmp9", "nucleus", "ogrosupply", "paradigm", "ph-capture", "reissen", "relic", "river_c", "serenity", "snapper_rocks", "spcr", "subterra", "suburb", "tempest", "tortuga", "turbulence", "twinforts", "urban_c", "valhalla", "venice", "xenon", "abbey", "akroseum", "arbana", "asgard", "authentic", "autumn", "bad_moon", "berlin_wall", "bt_falls", "campo", "capture_night", "catch22", "core_refuge", "core_transfer", "damnation", "desecration", "dust2", "eternal_valley", "europium", "evilness", "face-capture", "flagstone", "forge", "forgotten", "garden", "hallo", "haste", "hidden", "infamy", "kopenhagen", "l_ctf", "mach2", "mbt1", "mbt12", "mbt4", "mercury", "mill", "nitro", "nucleus", "recovery", "redemption", "reissen", "sacrifice", "shipwreck", "siberia", "snapper_rocks", "spcr", "subterra", "suburb", "tejen", "tempest", "tortuga", "turbulence", "twinforts", "urban_c", "valhalla", "wdcd", "xenon", "ladder", "spiralz", "canyon", "secondevermap", "firstevermap", "door_demo", "box_demo", "platform_demo", "mpsp6a", "mpsp6b", "mpsp6c", "mpsp9a", "mpsp9b", "mpsp9c", "mpsp10", "lost", "level9"];

window.onload = (function(){
	serverbrowser = document.getElementById("serverbrowser");
	stats = document.getElementById("stats");
	playerInactives = 0;
	serverInactives = 0;
	totalclients = 0;
	serverbrowser_inactives = "";
	verifyserverbrowser();
	body = document.getElementsByTagName("body")[0];
});

function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			data = JSON.parse(this.response);
            callback(xmlHttp.responseText);
        };
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
};

function getmmcolor(mastermode) {
	mmlist = ["auth", "open", "locked", "password", "private"];
	mmcolorslist = ["lightgrey", "chartreuse", "orange", "darkorange", "red"];
	return "<span style='color: " + mmcolorslist[mmlist.indexOf(mastermode)] + "'>" + mastermode + "</span>";
};

function setteamcolors(team, color, i){
	if (data.players[i].team == team){playerTeamColor = color};
};

function getserverslots(){
	if (data.maxClients <= data.clients){
		serverSlots = data.clients + "/" + data.maxClients + " (<span style='color: #ff4040'>the server is full</span>)";
	} else {
		serverSlots = data.clients + "/" + data.maxClients + " (<span style='color: #40ff80'>" + (data.maxClients - data.clients) + " slots available</span>)";
	};
	return serverSlots;
};

ismax = 0;
function resizeDialog(state, dialogID){
	curserver = document.getElementById("serverdialogID_" + dialogID);
	
	if (ismax == 0) {
		curserver.setAttribute("preposLeft", curserver.style.left);
		curserver.setAttribute("preposTop", curserver.style.top);
		curserver.style.width = "98%";
		curserver.style.height = "91%";
		curserver.style.left = "0px";
		curserver.style.top = "33px";
		ismax = 1;
	} else {
		curserver.style.width = "500px";
		curserver.style.height = "300px";
		curserver.style.left = curserver.getAttribute("preposLeft");
		curserver.style.top = curserver.getAttribute("preposTop");
		ismax = 0;
	};
};

function refreshDialog(dialogID){
	curserver = document.getElementById("serverdialogID_" + dialogID);
	create_Serverdetails(curserver.getAttribute("host"), dialogID, 1);
};

canmove = 0;
function moveDialog(dialogID, state){
	curserver2 = document.getElementById("serverdialogID_" + dialogID);
	if (state == 0){
		canmove = 0;
		curserver2.style.cursor = "unset";
		return;
	};
	
	if (curserver2.style.display == "none"){canmove = 0; return};
	
	if (state == 1){
		if (canmove == 1){canmove = 0} else {canmove = 1};
	};

	if (canmove == 1 && state == 2){
		curserver2.style.zIndex = 2000;
		curserver2.style.cursor = "grabbing"
		curserver2.style.left = (event.clientX - 250)
		curserver2.style.top = (event.clientY - 150);	
	} else {curserver2.style.zIndex = 0};
};

function getPlayerByTeam(team, i){
	return "<div style='background-color: " + team + "; display: -webkit-box;'><p style='background-color: " + team + "' id='serverplayers'>" + data.players[i].name + "<br><span id='serverplayersDetails'>" + playerFrags + "/" + playerDeaths + " | " + playerScores + " | " + playerPing + "</span></p>" + playerFlag + "</div>";	
};

function getFixedtime(mode, time){
	if (mode != "coop_edit"){
		return " | " + time;
	} else {return ""};
};

function getTeamColor(team, score, teammb) {
	teamslist = ["good", "evil"];
	teamcolorslist = ["#637cff", "#ff6366"];
	
	if (teamcolorslist[teamslist.indexOf(team)]){
		return "<span style='color: " + teamcolorslist[teamslist.indexOf(team)] + "'>" + team + ": <span style='color: white; font-family: fantasy'> " + score + " <i title='flags (scores)' class='far fa-flag'></i> | " + teammb + " <i class='far fa-user'></i></span></span>";
	} else {
		return "<span style='color: lightgrey'>" + team + ": <span style='color: white; font-family: fantasy'> " + score + " <i title='flags (scores)' class='far fa-flag'></i></span></span>";
	};
};

function create_Serverdetails(host, dialogID, state) {	
	canmove = 0;
	//close button
	if (host == ""){
		document.getElementById("serverdialogID_" + dialogID).style.display = "none";
		return;
	};
	closebtn = "<button id='dialogbutton' style='margin-left: 0%;' onmousedown='create_Serverdetails(\"\", " + dialogID + ")'><i class='fas fa-window-close'></i></button>";
	closebtn += "<button id='dialogbutton' style='margin-left: 2%;' onmousedown='resizeDialog(1, " + dialogID + ")'><i class='fas fa-window-maximize'></i></button>";
	closebtn += "<button id='dialogbutton' style='margin-left: 4%;' onmousedown='refreshDialog(" + dialogID + ")'><i class='fas fa-redo-alt'></i></button>";
	closebtn += "<button id='dialogbutton' style='margin-left: 6%;' onclick='moveDialog(" + dialogID + ", 1)'><i class='fas fa-arrows-alt'></i></button>";
	//create a new dialog
	body.innerHTML += "<div onmousedown='moveDialog(" + dialogID + ", 0)' onmousemove='moveDialog(" + dialogID + ", 2)' host='" + host + "' id='serverdialogID_" + dialogID + "' class='serverdialog'>" + closebtn + "<center><h3 style='color: white; font-size: large; font-family: sans-serif'>Loading...</h3></center></div>";
		
	curserver = document.getElementById("serverdialogID_" + dialogID);

	curserver.style.display = "unset"; //show dialog
	if (state == 1){
		curserver.innerHTML = "<center><h3 style='color: white; font-size: large; font-family: sans-serif'>Refreshing...</h3></center>";
	};
	clientscreenX = window.innerWidth || body.clientWidth || body.clientWidth;

	//define dialog position
	if (state != 1){
		if ((event.clientX - 50) >= (clientscreenX - 550)) {
			curserver.style.left = (clientscreenX - 550)
		} else {
			if (event.clientX <= 100) {
				curserver.style.left = 40;
			} else {curserver.style.left = (event.clientX - 50)};
		};
	curserver.style.top = (event.clientY - 50);
	};
	httpGetAsync("http://sauertracker.net/api/v2/server/" + host, function(response) {
		teamslist = [];
		for (t = 0; t < data.teams.length; t++){teamslist.push(data.teams[t].name)};
		//dialog content
		serverplayers_evil = "";
		serverplayers_spec = "";
		serverplayers_good = "";
		serverplayers_other = "";
		serverplayer_teams = "";
		serverplayers_evilm = 0;
		serverplayers_goodm = 0;
		serverplayers_otherm = 0;
		//mapthumb as background
		if (allmaps.includes(data.mapName)){
			curserver.style.backgroundImage = 'url("http://sauertracker.net/images/mapshots/' + data.mapName + '.jpg")';
		} else {
			curserver.style.backgroundImage = 'url("https://sauer-sauce.github.io/content/mapshots/coopedit_1.jpg")';
		};
		
		//start dialog header
		curserver.innerHTML = closebtn;
		curserver.innerHTML += "<center><p id='serverdesc'>" + data.descriptionStyled + "<img title='" + data.countryName + "' id='icon' src='http://sauertracker.net/images/flags/" + data.country + ".png'></img></p></center>";
		curserver.innerHTML += "<center><p id='serverslots'>" + (getmmcolor(data.masterMode)) + " " + getserverslots() + " " + data.mapName + " [" + data.gameMode + (getFixedtime(data.gameMode, data.timeLeftString)) + "]</p></center>"; 

		//read clients
		for (i = 0; i < data.clients; i++){
			
			playerFrags = "K/D: " + data.players[i].frags;
			playerPing = "Ping: " + data.players[i].ping;
			playerScores = "Flags: " + data.players[i].flags;
			playerDeaths = data.players[i].deaths;
			
			if (data.players[i].country){
				playerFlag = "<img title='" + data.players[i].countryName + "' style='position: unset;' id='icon' src='http://sauertracker.net/images/flags/" + data.players[i].country + ".png'></img> <p style='font-family: sans-serif; color: white; display: inline'>" + data.players[i].country + "</p>";
			} else {playerFlag = ""};
			
			if ((data.teams.length == 0) && (data.gameMode != "coop_edit")) {
				serverplayers_other += getPlayerByTeam("#37f94699", i);
			} else {
				if ((data.players[i].state == 5) || (data.gameMode == "coop_edit")) {
					serverplayers_spec += getPlayerByTeam("#9a9a9a99", i);	
				} else {
					if (data.players[i].team == "evil") {
						serverplayers_evil += getPlayerByTeam("#b53f3f99", i);
						serverplayers_evilm++;
					};
					if (data.players[i].team == "good"){
						serverplayers_good += getPlayerByTeam("#3f51b599", i);
						serverplayers_goodm++;
					};
					
					if (!teamslist.includes("evil") && !teamslist.includes("good")){
						serverplayers_other += getPlayerByTeam("#82820469", i);
					};
				};
			};
						
			if (i == (data.clients - 1)){
				//read teams
				teammb = "";
				if ((data.gameMode.includes("team")) || (data.gameMode.includes("ctf"))){
					for (t = 0; t < data.teams.length; t++){
						if (data.teams[t].name == "evil"){teammb = serverplayers_evilm};
						if (data.teams[t].name == "good"){teammb = serverplayers_goodm};
						if (!teammb){teammb = ""};
						serverplayer_teams += " <span id='serverteams'" + (getTeamColor(data.teams[t].name, data.teams[t].score, teammb)) + "</span>";
					};
				};
				
				//finish dialog header
				curserver.innerHTML += "<center>" + serverplayer_teams + "</center>";
				curserver.innerHTML += "<hr> \n";
				
				//set teams
				curserver.innerHTML += serverplayers_good;
				curserver.innerHTML += serverplayers_evil;
				curserver.innerHTML += serverplayers_spec;
				curserver.innerHTML += serverplayers_other;
			};
		};
		
	});
};

function verifystates(state, host){
	if (state == 0){
		stats.innerHTML = "";
		stats.innerHTML += "<h3 style='color: white; font-family: sans-serif;'>Playing: <span style='color: #33cc33'>" + (totalclients - playerInactives) + "</span>/<span style='color: lightgrey'>" + totalclients + "</span> | Servers: <span style='color: #33cc33'>" + (servers - serverInactives) + "</span>/<span style='color: lightgrey'>" + servers +"</span></h3>";
		return;
	};
	playerInactives = 0;
	httpGetAsync("http://sauertracker.net/api/v2/server/" + host, function(response) {
		for (i = 0; i < data.clients; i++){
			if (data.players[i].state == 5) {
				playerInactives++
			};
			
			if (i == (data.clients - 1)){
				verifystates(0);
			};
		};
	});	
};

function verifyserverbrowser() {
	httpGetAsync("http://sauertracker.net/api/v2/servers", function(response) {
		for (i = 0; i < data.length; i++){
			servers = data.length;
			serverDescription = data[i].descriptionStyled;
			serverHost = data[i].host;
			serverPort = data[i].port;
			if (serverDescription == ""){serverDescription = data[i].host};
			serverCountry = data[i].country;
			serverGameMode = data[i].gameMode;
			serverClients = data[i].clients;
			totalclients += serverClients;
			serverMaxClients = data[i].maxClients;
			serverMap = data[i].mapName;
			serverMasterMode = (getmmcolor(data[i].masterMode));
		
			create_serverID = i;
			if (serverClients > 0){
				verifystates(1, serverHost + "/" + serverPort);
				serverbrowser.innerHTML += "<p class='pserver' onclick='create_Serverdetails(\"" + serverHost + "/" + serverPort + "\", " + create_serverID + ")'>" + serverDescription + " <span class='gmodes'>| " + serverGameMode + " | <span class='gmaps'>" + serverMap + "</span> | " + serverMasterMode + "</span> <span class='ghost'>/connect " + serverHost + ":" + serverPort + "</span> </p>";
				serverbrowser.innerHTML += "<p class='gclients'>" + serverClients + "<span style='font-size: 15px'>/" + serverMaxClients + "</span></p>";
			} else {
				serverInactives++
				serverbrowser_inactives += "<p class='pserver_off' onclick='create_Serverdetails(\"" + serverHost + "/" + serverPort + "\", " + create_serverID + ")'>" + serverDescription + " <span class='gmodes'>| " + serverGameMode + " | <span class='gmaps'>" + serverMap + "</span> | " + serverMasterMode + "</span> <span class='ghost'>/connect " + serverHost + ":" + serverPort + "</span> </p>";
			};

			if (i == (data.length - 1)){
				verifystates(0);
				serverbrowser.innerHTML += serverbrowser_inactives;
			};
		};
	});
};