var API = null;
var callAPI = 0;
var scoPageAPI = 0;
var LastScore = -1;
var ScormStartTime = (new Date()).getTime();

//Log Console
function logconsole(msg){

	if (typeof console === "undefined" || typeof console.log === "undefined"){
		
	}else{
		console.log(msg)
	}

}

/* Check SCORM API or AlterScorm */
function findAPI(win){

	try{

		while ((win.API == null) && (win.parent != null) && (win.parent != win))
		{
			win = win.parent;

			callAPI = callAPI + 1;

		}
		
		API = win.API;
		
	}catch(exception){
		return false;
		
	}

}

/* initialize the SCORM API */
function initAPI(win){
	
	try{

		/* look for the SCORM API up in the frameset */
		findAPI(win);
		
		/* if we still have not found the API, look at the opener and its frameset */
		if ((API == null) && (win.opener != null))
		{
			findAPI(win.opener);
		}

	}catch(exception){

		logconsole("findAPI error");
		return false;

	}

}

function ScormStartComProcess(){
	
	initAPI(window);
	
	if (API != null){
		
		var initOk = false;
		
		//SCORM 1.2
		if (typeof(API.LMSInitialize) != "undefined") {

         if (typeof(API.haveInit) === "undefined") {
            API.LMSInitialize('');
			API.countTime = ScormStartTime;
			API.haveInit = true;
            logconsole("Init SCORM");
         }
        
      }

	}
	
}

function getLMSLocation(){

	if (API != null){

		if(typeof(API.LMSSetValue)!= "undefined"){
			scoPageAPI = API.LMSGetValue("cmi.core.lesson_location");
			if(typeof(API.lessonlocation) != "undefined") {
				if(API.lessonlocation>scoPageAPI){
					scoPageAPI = API.lessonlocation
				}
			}
			if(scoPageAPI===undefined){scoPageAPI = 1;}
			if(scoPageAPI==""){scoPageAPI = 1;}
			return scoPageAPI;
		}else{
			return 1;
		}

	}

}

function sendLMSLocation(nPage,maxPage){

	if(typeof(API.LMSSetValue)!= "undefined"){

		scoPageAPI = API.LMSGetValue("cmi.core.lesson_location");
		
		if(scoPageAPI===undefined){scoPageAPI = 1;}
		if(scoPageAPI==""){scoPageAPI = 1;}

		if(typeof(API.lessonlocation) === "undefined") {
			API.lessonlocation = scoPageAPI;
		}else{
			if(scoPageAPI<API.lessonlocation){
				scoPageAPI = API.lessonlocation;
			}
		}

		if(nPage>scoPageAPI){
			
			//Normal Moodle Protocol
			//API.LMSSetValue('cmi.core.lesson_location',nPage);
			//API.LMSCommit('');

			if(nPage>API.lessonlocation){
				API.lessonlocation = nPage;
			}

			//Hack Chamilo LMS
			if(typeof(API.save_asset)!= "undefined"){
				var olms = parent.olms;
				if(olms.lms_item_type=='sco'){
					var lk = getLocUrl() + 'scorm-save-location.php';
					$.ajax({
						url: lk + "?loc=" + nPage + '&id=' + localIdTeachdoc
					}).done(function(){
						logconsole("loc:" + nPage);
					});
				}
				
			}
		}

	}

}

function getLocUrl(){

	var urlOrigin = window.top.location.origin + "/";
	if(urlOrigin.indexOf('://localhost')!=-1){
		urlOrigin = location.protocol + "//" + document.domain + "/" + location.pathname.split('/')[1] + "/";
	}
	return urlOrigin + "plugin/adv_oel_tools_teachdoc/ajax/sco/"; 

}

ScormStartComProcess();

function CheckLMSFinishFinal(){

	var score = API.LMSGetValue('cmi.core.score.raw');
	var status = API.LMSGetValue('cmi.core.lesson_status');

	if(typeof(API.haveScormSubmitted) === "undefined") {
		API.haveScormSubmitted = false;
	}
	
	if(API.haveScormSubmitted == false){
		
		API.haveScormSubmitted = true;
		
		if(typeof(API.LMSSetValue)!= "undefined"){
			if(score!=100&&status!='completed'){
				API.LMSSetValue('cmi.core.score.raw', 100);
				API.LMSSetValue('cmi.core.lesson_status','completed');
				API.LMSCommit('');
				if(typeof(API.LMSFinish) != "undefined"&&score!=100){
					API.LMSFinish('');
				}
			}else{
				API.LMSSetValue('cmi.core.session_time', MillisecondsToTime((new Date()).getTime() - API.countTime));
				ScormStartTime = (new Date()).getTime();
				API.countTime = ScormStartTime;
				API.LMSCommit('');
			}
		}
		
	}
	
}

setTimeout(function(){sendTimeToLms();},30000);

function sendTimeToLms(){
	if(typeof(API.LMSSetValue)!= "undefined"){
		var sendT = MillisecondsToTime((new Date()).getTime() - API.countTime);
		console.log('sendT:'+sendT);
		API.LMSSetValue('cmi.core.session_time',sendT);
		ScormStartTime = (new Date()).getTime();
		API.countTime = ScormStartTime;
		API.LMSCommit('');
	}
	setTimeout(function(){sendTimeToLms();},60000);
}

//TIME RENDERING FUNCTION
function MillisecondsToTime(Seconds){
	Seconds = Math.round(Seconds/1000);
	var S = Seconds % 60;
	Seconds -= S;
	if (S < 10){S = '0' + S;}
	var M = (Seconds / 60) % 60;
	if (M < 10){M = '0' + M;}
	var H = Math.floor(Seconds / 3600);
	if (H < 10){H = '0' + H;}
	return H + ':' + M + ':' + S;
}
