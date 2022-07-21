
var lstUlLoad = '<ul class="list-teachdoc"><li>&nbsp;</li><li>...</li><ul>';

//CodeMirror lib => For editing code
$(document).ready(function(){
	
	insertMRight();
	
	$('.gjs-pn-buttons').prepend('<span onClick="saveSourceFrame(false,false,0)" class="gjs-pn-btn fa fa-save"></span>');
	
	var bdDiv = '<div id="loadsave" ><img src="img/loadsave.gif" /></div>';
	bdDiv += '<div id="logMsgLoad" ';
	bdDiv += ' style="z-index:10;position:absolute;border:solid 1px red;';
	bdDiv += 'left:22%;top:60px;right:22%;height:600px;';
	bdDiv += 'background-color:white;display:none;" ></div>';
	
	bdDiv += '<div id="workingProcessSave" class="workingProcessSave" ><img src="img/cube-oe.gif" /></div>';

	$('body').append(bdDiv);
	
	var dataImg = [{
		"type":"image",
		"height":0,
		"width":0
	}];
	
	localStorage.setItem("gjs-assets",dataImg);
	
	setTimeout(function(){
		restyleCadre();
	},100);

	setTimeout(function(){
		traductAll();
	},200);
	
});

function restyleCadre(){
	
	if($("div[title='Map']").length>0){

		$("div[title='Map']").css("display","none");
		$("div[title='Price Bloc']").addClass("myCustomBlock");
		$('head').append('<style>.myCustomBlock:before{content:url("img/bloctext.png");}</style>');

		//$(".gjs-one-bg").css("background-color","#0B2161");
		$('.fa-code').css("display","none");
		$('.fa-save').css("display","none");
		
		$("div[title='Video']").css("display","none");
		$("div[title='Quote']").css("display","none");
		$("div[title='3 Columns']").css("display","none");
		$("div[title='Navbar']").css("display","none");
		$("div[title='Countdown']").css("display","none");
		$("div[title='Link']").css("display","none");
		$("div[title='Text']").css("display","none");
		$("div[title='Link Block']").css("display","none");
		
		$("div[title='2 Columns 3/7']").css("display","none");
		$("div[title='Text section']").css("display","none");
		
		$(".fa-download").css("opacity","0");
		$(".fa-download").css("visible","hidden")
		$(".fa-bars").css("display","none");
		$(".fa-trash").css("display","none");
		
		$(".qlab").append("<div class=qlabicon >?</div>");

		$(".gjs-title").css("display","none");
	/**/

		$(".fa-save").each(function(index){

			if(index==3){
				$(this).css("display","block");
				$(this).html("&nbsp;&nbsp;|&nbsp;");
				$(this).css("color","#5858FA");
				$(this).attr("id","Teachdoc");
				$(this).removeClass("fa-save");
				$(this).css("display","none");
				$(this).before(getMenuTop());
			}
			if(index==1){
				$(this).css("display","block");
				$(this).css("color","#0B0B61");
				$(this).attr("id","btnsave");
			}
		
		});
		
		$("#Teachdoc").attr("onclick", "").unbind("click");

		$("#Teachdoc").click(function(){

			$('#btnsave').css("display","none");
			$('#loadsave').css("display","block");
			
			saveSourceFrame(true,true,0);
			
		});
		
		$(".gjs-block-category").css("display","none");
		$(".gjs-block-category").each(function(index){
			if(index==0){
				$(this).css("display","block");
			}
			if(index==1){
				$(this).css("display","block");
			}
		});

		if (typeNodePg==4) {
			$(".gjs-block-categories").css("visibility","hidden");
			displayFileEdit();
		}
		
		setTimeout(function(){
			
			var dataImg = [{
				"type":"image",
				"height":0,
				"width":0
			}];		
			localStorage.setItem("gjs-assets",dataImg);
			restyleCadreImage();
			
			var first = getParamValueForOeLEditor('first');
			if(first==1){
				processRender(false);
			}

		},1000);

		reloadHtmlToGrap();
		
	}else{

		setTimeout(function(){
			restyleCadre();
		},200);
	
	}

}

function getParamValueForOeLEditor(param){
	var u = window.top.location.href;var reg=new RegExp('(\\?|&|^)'+param+'=(.*?)(&|$)');
	matches=u.match(reg);
	if(matches==null){return '';}
	var vari=matches[2] != undefined ? decodeURIComponent(matches[2]).replace(/\+/g,' ') : '';
	return vari;
}

function reloadHtmlToGrap(){

	var iframe = $('.gjs-frame');

	var iframeBody = iframe.contents().find("body");

	iframeBody.find(".editRapidIcon").unbind('hover');
	iframeBody.find(".editRapidIcon").unbind('mouseenter mouseleave');

	var allVideos = iframeBody.find("video");
	allVideos.removeClass().addClass("videoByLudi");
	allVideos.unbind('hover').unbind('mouseenter mouseleave');
	
	allVideos.each(function(index){
		var container = $(this).parent();
		var src = container.html();
		container.html(src);
	});
	
	var allAudios = iframeBody.find("audio");
	allAudios.removeClass().addClass("audioByLudi");
	allAudios.unbind('hover').unbind('mouseenter mouseleave');
	allAudios.each(function(index){
		var container = $(this).parent();
		var src = container.html();
		container.html(src);
	});

	reloadTableToGrap();
	$('#jscssedit').css("display","none");
	
}

function detectNeedReload(){

	var detect = false;

	var iframe = $('.gjs-frame');
	var iframeBody = iframe.contents().find("body");
	var allTables = iframeBody.find("table");

	allTables.each(function(index){

		var src = $(this).html();
		
		if (src.indexOf('td data-gjs-type="cell"')!=-1) {
			detect = true;
		}
		if (src.indexOf('tbody data-gjs-type="tbody"')!=-1) {
			//detect = true;
		}

	});

	return detect;
}

//Control Edition Line
setTimeout(function(){
	controlEditionLine();
},500);
function controlEditionLine() {
	if (detectNeedReload()) {
		reloadTableToGrap();
		setTimeout(function(){
			controlEditionLine();
		},500);
	} else {
		setTimeout(function(){
			controlEditionLine();
		},300);
	}
}
//Control Edition Line

function switchToolsEdit(){
	$(".ludiEditIco").css('display','none');
}

function displayToolsCarre(){

	var toolsGraps = $('.gjs-blocks-cs').parent();
	if(toolsGraps.css('display') == 'none'){
		eventFireAuto(document.querySelector('.fa-th-large'),'click');
	}

}

function eventFireAuto(el, etype){
	if (el.fireEvent) {
	  el.fireEvent('on' + etype);
	} else {
	  var evObj = document.createEvent('Events');
	  evObj.initEvent(etype, true, false);
	  el.dispatchEvent(evObj);
	}
}

function ajustHtmlToGrap(){

	var iframe = $('.gjs-frame');
	var iframeBody = iframe.contents().find("body");
	var allImgs = iframeBody.find("img");

	allImgs.each(function(index){
		
		var container = $(this);
		//container.css("width","auto");
		//var widthPx = container.width();
		//if(container.hasClass("gjs-comp-selected")){
		container.css("width","100%");
		//}

	});

}

function insertMRight(){

	$("body").css("position","relative");
	$('.gjs-editor-cont').before(getMenuR());
	
	microEvents();

	resizeMenuTools();
	$('#labelMenuLudi'+idPageHtml).parent().addClass('activeli');
	refreshMenu(-1);

}

function microEvents(){

	$("body").append("<div class='maskobjMenu' ></div>");
	$( ".maskobjMenu" ).click(function() {
		isTabActive = true;
		decTabActiv = false;
		tickScrollEvt = 0;
		$( ".maskpause" ).css("display","none");
		$( ".maskobjMenu" ).css("display","none");
		$( ".objMenuParamFloat" ).css("display","none");
	});

	$("body").append("<div class='maskpause' ></div>");
	$( ".maskpause" ).click(function() {
		isTabActive = true;
		decTabActiv = false;
		tickScrollEvt = 0;
		$( ".maskpause" ).css("display","none");
	});

	$( ".maskpause" ).on("mousemove", function(e) {
		document.getElementById("tool-colors-paste").focus();
	})
	
	$( ".gjs-one-bg" ).on("mousedown", function(e) {
		isTabActive = true;
		decTabActiv = false;
		$( ".maskpause" ).css("display","none");
	})

	$( ".maskpause" ).bind('mousewheel', function(e){
		tickScrollEvt++;
		if(tickScrollEvt>2) {
			$( ".maskpause" ).css("display","none");
		}
	});

}

$(window).resize(function(){
	resizeMenuTools();
});

function resizeMenuTools(){
	
	var bodypw = $('body').outerWidth();
	var bodyph = $('body').outerHeight();

	$(".ludimenuteachdoc").css("height",(bodyph - 410) + "px")

	$(".gjs-editor-cont").css("right","0%").css("position","absolute");

	if(bodypw>1200||bodypw==1200){
	
		$(".gjs-editor-cont").css("width","86%");
	
	}else{

		var editorypw = $('#gjs').outerWidth();
		
		var large = bodypw - 170;
		var pourc = (large / bodypw) * 100;
		$(".gjs-editor-cont").css("width",pourc + "%");

		var large = editorypw - 170;
		var pourc = (large / editorypw) * 100;
		$(".gjs-cv-canvas").css("width",pourc + "%");
		$(".gjs-pn-commands").css("width",pourc + "%");

	}


}

function reloadTableToGrap(){

	var iframe = $('.gjs-frame');
	var iframeBody = iframe.contents().find("body");

	var allTables = iframeBody.find("table");

	allTables.each(function(index){
		
		var oriClass = getTableClassOrigine($(this));

		if($(this).hasClass("qcmbarre")){
			$(this).removeClass().addClass("qcmbarre").addClass(oriClass);
			$(this).unbind('hover').unbind('mouseenter mouseleave');
			$(this).attr('style','width:100%;');
			var src = $(this).html();
			src = cleanCodeBeforeLoad(src);
			$(this).html(src);
		}
		
		if($(this).hasClass("teachdoctext")){
			$(this).removeClass().addClass("teachdoctext").addClass(oriClass);
			$(this).unbind('hover').unbind('mouseenter mouseleave');
			var src = $(this).html();
			src = cleanCodeBeforeLoad(src);
			$(this).html(src);	
		}
		
		if($(this).hasClass("teachdocplugteach")){
			
			var noReload = false;

			var src = $(this).html();
			
			if (src.indexOf(">oelcontent")!=-1){	
				$(this).find(".photo").removeClass().addClass("photo");
				$(this).find(".datatext1").removeClass().addClass("datatext1");
				$(this).find(".datatext2").removeClass().addClass("datatext2");
				src = $(this).html();
				src = cleanCodeBeforeLoad(src);

                if (src.indexOf("plugteachcontain")!=-1){
					var extractText1 = $(this).find('span.datatext1').html();
					if(extractText1===undefined){extractText1 = '';}
					if(extractText1==="undefined"){extractText1 = '';}
					src = applyImgContentTiny1(src,extractText1);
				}
			}

			if (src.indexOf(">txtmathjax")!=-1){
				$(this).find(".plugteachcontain").css("text-align","left");
				src = $(this).html();
				src = cleanCodeBeforeLoad(src);
			}

			$(this).removeClass().addClass("teachdocplugteach").addClass(oriClass);
			$(this).unbind('hover').unbind('mouseenter mouseleave');
			src = src.replace(' data-gjs-type="cell" ',' ');
			
			// Special UI
			if (src.indexOf(">lifebar<")!=-1){
				if (src.indexOf("plugteachcontain")!=-1){
					src = src.replace('plugteachcontain','plugteachuicontain');
				}
			}
			
			// Detect quizz plugin quizzcontentplug
			if ( src.indexOf(">blank<")!=-1
				||src.indexOf(">markwords<")!=-1
				||src.indexOf(">filltext<")!=-1
			){
				if ( src.indexOf("quizzcontentplug")==-1 ){
					src = src.replace('teachdocplugteach ','teachdocplugteach quizzcontentplug');
				}
				$(this).removeClass('quizzcontentplug').addClass("quizzcontentplug");
			}
			
			$(this).html(src);
			
		}

		if($(this).hasClass("teachdocbtnteach")){
			
			var srcB = $(this).html();
		
			var datatext3 = $(this).find('a').attr("datatext3");
			var datatext4 = $(this).find('a').attr("datatext4");
			var datatext5 = $(this).find('a').attr("datatext5");
			
			if(datatext3!=''){
				var datatext3 = $(this).find('span.datatext3').html();
				var datatext3 = $(this).find('span.datatext4').html();
				var datatext5 = $(this).find('span.datatext5').html();
			}

			$(this).removeClass().addClass("teachdocbtnteach").addClass(oriClass);
			$(this).unbind('hover').unbind('mouseenter mouseleave');
			$(this).attr('style','width:100%;');
			
			var src = $(this).html();
			src = cleanCodeBeforeLoad(src);
			$(this).html(src);

			if(datatext3!=''){
				$(this).find('a').attr("datatext3",datatext3);
				$(this).find('a').attr("datatext5",datatext5);
			}
		
		}
		
	});

	reloadVideosToGrap(iframeBody);

}

function reloadVideosToGrap(iframeBody){

	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
		
		var allVideos = iframeBody.find("video");
		allVideos.each(function(index){
			$(this).on("mouseup mouseover", function () {
				var containDiv = $(this).parent();
				if (containDiv.find('rapidselectorgrapvideo').length==0) {
					containDiv.css("position","relative");
					var bdDiv = '<div class="rapidselectorgrapvideo" ';
					bdDiv += ' onMouseDown="parent.displayEditButon(this);" ></div>';
					containDiv.prepend(bdDiv);
				}
			});
		});
		
	}

}

function getTableClassOrigine(objT){
	var dhC = '';
	if (objT.hasClass("dhcondiMA")) {
		dhC = "dhcondiMA";
	}
	if (objT.hasClass("dhcondiMB")) {
		dhC = "dhcondiMB";
	}
	if (objT.hasClass("dhcondiMC")) {
		dhC = "dhcondiMC";
	}
	if (objT.hasClass("dhcondiMD")) {
		dhC = "dhcondiMD";
	}
	if (objT.hasClass("dhcondiME")) {
		dhC = "dhcondiME";
	}
	if (objT.hasClass("dhcondiMF")) {
		dhC = "dhcondiMF";
	}
	return dhC;
}

setTimeout(function(){
	controlPosition();
},600);

var globalControlTime = 350;

function controlPosition(){

	var itoolbar = $('.gjs-toolbar');
	var obJoffset = itoolbar.offset();
	
	if (typeof obJoffset === "undefined" || typeof obJoffset.left === "undefined"){

		setTimeout(function(){
			controlPosition();
		},4000);

	} else {

		var left_position = obJoffset.left;

		var igjs = $('#gjs-tools');
		//var igJoffset = parseInt(igjs.offset());
		//var canvas_left = obJoffset.left;
		var canvas_width = parseInt($('#gjs-tools').width());
	
		var frame_width = parseInt($('.gjs-frame').width());
		
		if (frame_width>800) {
		
			var canvas_right = 0;
	
			if (canvas_width>810) {
				canvas_right = parseInt((canvas_width - 800)/2);
			}
	
			//console.log("left_position : " + left_position + " > " + (canvas_width-canvas_right) );
	
			if (left_position>canvas_width-canvas_right) {
				//console.log("Error");
				
				window.dispatchEvent(new Event('resize'));
				
				$('.gjs-cv-canvas').css("width","85.2%");
				setTimeout(function(){
					$('.gjs-cv-canvas').css("width","85%");
				},100);
				globalControlTime = globalControlTime + 5000;
			}
			
		}

		setTimeout(function(){
			controlPosition();
		},globalControlTime);
		
	}

}

var OneCloseImage = true;

function restyleCadreImage(){

	if(!document.getElementById("chamiloImages")){

		//showFileManagerStudio(0,0,0);
		var bh = "<div class='trd' id='chamiloImages' onClick='showFileManagerStudio2(13,0,\"pushToCollAfterSelect\");' ";
		bh += " style='width:100%;height:70px;border:solid 1px gray;text-align:center;cursor:pointer;' >";
		bh += "<br>";
		bh += "Selecting an image <br> from the server";
		bh += "</div>";

		$('.gjs-am-file-uploader').html(bh);

		setTimeout(function(){
			restyleCadreImage();
			traductAll();
		},300);

	}

}

function restyleLstImage(){

	$('.gjs-am-meta').css("display","none");
	$('.gjs-am-asset').css("width","50%");
	$('.gjs-am-preview-cont').css("width","90%");
	$('.gjs-am-file-uploader').css("width","100%");
	$('.gjs-am-assets-cont').css("width","100%");
	$('.gjs-am-assets-cont').css("height","auto");
	$('.gjs-am-assets-cont').css("padding","2px");

	$('.gjs-am-close').css("display","none");

	restyleLateral();
	setTimeout(function(){
		restyleLateral();
	},10);
	setTimeout(function(){
		restyleLateral();
	},300);
	
	$('.gjs-am-preview').click(function(){
		//$('.gjs-mdl-container').css("display","none");
	});

}

function restyleLateral(){
	
	var gjsD = $('#chamiloImages').parent().parent().parent().parent().parent();
	gjsD.css("width","20%");
	gjsD.css("max-width","280px");
	gjsD.css("margin-right","0%");
	gjsD.css("margin-top","0%");
	gjsD.css("margin-bottom","0%");
	gjsD.css("border-radius","0");
	gjsD.css("border-left","solid 3px gray");
	gjsD.css("border-right","solid 3px gray");
	gjsD.css("background-color","#585858");
	gjsD.css("color","#F2F2F2");
	gjsD.parent().css("background-color","rgba(0,0,0,0.2)");

	gjsD.find(".gjs-btn-prim").addClass('img-plus-gjs');
	
	gjsD.find(".gjs-btn-prim").parent().css("display","none");

	var gjscontent = gjsD.find('.gjs-mdl-content');
	
	var ph = gjsD.outerHeight();
	gjscontent.css("height",parseInt(ph-80)+"px");
	gjscontent.css("border-top","solid 1px #F2F2F2");
	gjscontent.css("padding","5px");

	var gjsassets = gjsD.find('.gjs-am-assets');
	gjsassets.css("height",parseInt(ph-195)+"px");
	gjsassets.css("border","solid 0px blue");

}

var RedirectToLP = "";
var saveOHtml = "";
var saveOCss = "";
var saveEventG = false;
var onRenderUpdate = false;
var globalQuitAction = false;

function activeEventSave(){
	
	if(saveEventG==false){
		saveEventG = true;
		console.log("oel teachdoc need Update");
	}

}

function saveSourceFrame(CreateRedirect,HaveRender,idNode){

	processScoExport = false;
	if(modeHistory){
		return false;
	}
	if(saveEventG==false&&idNode!=0){
		window.location.href = "index.php?action=edit&id=" + parseInt(idNode);
		return false;
	}

	if(onlyOneUpdate){
	
		if(localStorage){
			
			onlyOneUpdate = false;
			
			$('#btnsave').css("display","none");
			$('#loadsave').css("display","block");
			
			if(CreateRedirect){
				$('.workingProcessSave').css("display","block");
			}
			
			var Ghtml = editor.getHtml();
			var Gcss = editor.getCss();
			
			var gjsHtml = localStorage.getItem("gjs-html-" + idPageHtml);
			var gjsCss = localStorage.getItem("gjs-css-"+ idPageHtml);
			
			amplify.store("page-html", gjsHtml);
			amplify.store("page-css" , gjsCss);
			
			var formData = {
				id : idPageHtml,
				bh : gjsHtml, //amplify.store("page-html"),
				bc : gjsCss ,// amplify.store("page-css")
			};

			var noChange = false;
			if(saveOHtml!=''&&gjsCss!=''&&gjsHtml==saveOHtml&&gjsCss==saveOCss){
				noChange = true;
				formData = {
					id : idPageHtml,
					bh : '',bc : ''
				};
			}
			
			var extraRedi = "&r=0";
			if(CreateRedirect){
				extraRedi = "&r=1&pt=" + idPageHtmlTop;
				if(HaveRender){
					$('#dataFileEditWindows').css("display","none");
					installFakeLoad();
					onRenderUpdate = true;
				}
			}

			if(noChange&&CreateRedirect==false&&idNode==0){
				setTimeout(function(){
					$('#btnsave').css("display","block");
					$('#loadsave').css("display","none");
				},200);
				onlyOneUpdate = true;
			}else{

				$.ajax({
					url : '../ajax/save/ajax.save.php?id=' + idPageHtml + extraRedi,
					type: "POST",data : formData,
					success: function(data,textStatus,jqXHR){
						
						saveSourceComponents();

						if(data.indexOf("error")==-1){
							saveOHtml = gjsHtml;
							saveOCss = gjsCss;
							if(idNode!=0&&idNode!=idPageHtml){
								window.location.href = "index.php?action=edit&id=" + parseInt(idNode);
							}else{
								if(CreateRedirect){
									RedirectToLP = data;
									if(HaveRender){
										processRender(CreateRedirect);
									}
								}else{
									if(data.indexOf("OK")!=-1){
										$('#btnsave').css("display","block");
										$('#loadsave').css("display","none");
									}else{
										$('#btnsave').css("display","block");
										$('#loadsave').css("display","none");
									}
									onlyOneUpdate = true;

									if (loadFXObjectevent) {
										var location = window.location.href;
										location = location.replace("#page0","");
										location = location.replace("#","");
										location = location.replace("&fxload=1","");
										location += "&fxload=1";
										window.location.href = location;
									}
									
								}
							}
						}else{
							$('#logMsgLoad').css("display","block");
							$('#logMsgLoad').html(data);
							onlyOneUpdate = true;
						}
					},
					error: function (jqXHR, textStatus, errorThrown)
					{
						$('#logMsgLoad').css("display","block");
						$('#logMsgLoad').html(textStatus);
						onlyOneUpdate = true;
					}
				});
				
			}

		}else{
			$('#logMsgLoad').css("display","block");
			$('#logMsgLoad').html("localStorage error !");
			onlyOneUpdate = true;
		}
			
	}
}

function saveSourceComponents(){

	if(modeHistory){
		return false;
	}

	const Gcomps = editor.getComponents();
	const Gstyle = editor. getStyle();

	var formData = {
		id : idPageHtml,
		GpsComps : JSON.stringify(Gcomps),
		GpsStyle : JSON.stringify(Gstyle)
	};

	$.ajax({
		url : '../ajax/save/ajax.save-compo.php?id=' + idPageHtml,
		type: "POST",data : formData,
		success: function(data,textStatus,jqXHR){

			if(data.indexOf("error")==-1){

			}else{
				$('#logMsgLoad').css("display","block");
				$('#logMsgLoad').html(data);
			}

		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			$('#logMsgLoad').css("display","block");
			$('#logMsgLoad').html(textStatus);
		}
	});

}

function processRender(CreateRedirect){
	
	if(modeHistory){
		return false;
	}
	
	processScoExport = false;
	$('#loadsave').css("display","block");
	
	
	if(CreateRedirect&&RedirectToLP!=''&&RedirectToLP.indexOf('.php')!=-1){

		RedirectToLP = RedirectToLP.replace('&gidReq=0&gradebook=0&origin=&','&');
		RedirectToLP = RedirectToLP.replace('&origin=&','&');
		RedirectToLP = RedirectToLP.replace(/\//g, "t@d");
		RedirectToLP = RedirectToLP.replace(/\?/g, "t@@d");
		RedirectToLP = RedirectToLP.replace(/\&/g, "t@@@d");
		
		var quitVar = '&quit=0';
		if (globalQuitAction) {
			quitVar = '&quit=1';
		}
		
		window.location.href = 'iredirteachdoc.php?i=' + idPageHtmlTop + '&redir='+ RedirectToLP + quitVar;
	
	}else{

		var urRend = '../ajax/teachdoc-render.php?id=' + idPageHtmlTop;
	
		$.ajax({
			url :urRend,type: "POST",
			success: function(data,textStatus,jqXHR){
				
				if(CreateRedirect&&RedirectToLP!=''&&RedirectToLP.indexOf('.php')!=-1){
					window.location.href = RedirectToLP;
					onlyOneUpdate = true;
				}else{
					$('#loadsave').css("display","none");
					onlyOneUpdate = true;
				}
				
			},
			error: function (jqXHR, textStatus, errorThrown)
			{
				$('#loadsave').css("display","none");
				onlyOneUpdate = true;
			}
		});

	}

}

function reloadPageErr() {

	$('#loadsave').css("display","block");
	window.location.href = "index.php?action=edit&id=" + parseInt(idPageHtml);

}

function controlStringInSource(src){

	var gjsHtml = localStorage.getItem("gjs-html-" + idPageHtml);

	if(gjsHtml.indexOf(src)!=-1){
		return true;
	} else {
		return false;
	}

}

function getMenuTop(){
	
	var h = '';
	h += '<div class="topmenuteachdoc" onmouseover="safeMenuTop();" >';
	h += '<div class="topmenublock trd" onClick="showFileMenu();" >File</div>';
	h += '<div class="topmenublock trd" onClick="showEditMenu();" >Edit</div>';
	h += '<div class="topmenublock trd" style="width:20px;" onClick="showAboutMenu();" >?</div>';
	h += '</div>';

	h += '<div class="topmenufile" >';
	h += '<div class="topsubmenublock trd" onClick="deleteAllTopMenu();saveSourceFrame(false,false,0);" >Save</div>';
	h += '<div class="topsubmenublock trd" onClick="deleteAllTopMenu();displaySubExportScorm();" >Export to SCORM</div>';
	h += '<div class="topsubmenublock trd" onClick="deleteAllTopMenu();displaySubExportProject();" >Export Project</div>';
	h += '<div class="topsubmenublock trd" onClick="deleteAllTopMenu();displaySubImportProject();" >Import Project</div>';
	h += '<div class="topsubmenublock trd" onClick="deleteAllTopMenu();displaySelectLanguage();" >UI Language</div>';
	h += '<div class="topsubmenublock trd" onClick="deleteAllTopMenu();displayExportToManager(\'pdf\');" >Export to PDF</div>';
	h += '<div class="topsubmenublock trd" onClick="deleteAllTopMenu();quitEditorAll();" >Quit</div>';
	h += '</div>';
	
	h += '<div class="topmenuedit" >';
	h += '<div class="topsubmenublock trd" onClick="deleteAllTopMenu();displayFileManagerSlider(0);" >File manager</div>';
	h += '<div class="topsubmenublock trd" onClick="deleteAllTopMenu();displayGlobalHistory();" >History</div>';
	h += '</div>';

	h += '<div class="topmenuabout" >';
	h += '<p>CS engine 2018 - 2022</p>';
	h += '<p>Version : ' + versionCS;
	h += '<a href="#" style="color:#E5E8E8;margin-left:10px;" onClick="displayDevAdminParams()" >...</a>';
	h += '</p>';
	
	h += '</div>';
	
	h += '<div class="topmenubackarea" onmouseover="deleteAllTopMenu();" >';
	h += '</div>';

	return h;
}

function safeMenuTop(){
	$('.gjs-comp-selected').removeClass("gjs-comp-selected");
	$('.topmenubackarea').css("display","block");
}

function showFileMenu(){
	deleteAllTopMenu();
	$('.gjs-comp-selected').removeClass("gjs-comp-selected");
	$('.topmenubackarea').css("display","block");
	$('.topmenufile').css("display","block");
	loadaFunction();
}

function showEditMenu(){
	deleteAllTopMenu();
	$('.gjs-comp-selected').removeClass("gjs-comp-selected");
	$('.topmenubackarea').css("display","block");
	$('.topmenuedit').css("display","block");
	loadaFunction();
}

function showAboutMenu(){
	deleteAllTopMenu();
	$('.gjs-comp-selected').removeClass("gjs-comp-selected");
	$('.topmenubackarea').css("display","block");
	$('.topmenuabout').css("display","block");
	loadaFunction();
}

function deleteAllTopMenu(){
	$('.topmenufile').css("display","none");
	$('.topmenuedit').css("display","none");
	$('.topmenubackarea').css("display","none");
	$('.topmenuabout').css("display","none");
	loadaFunction();
}

function getMenuR(){
	
	var h = '<div class="ludimenu" onMouseMove="if(windowEditorIsOpen==false){$(this).css(\'z-index\',\'1000\');displayToolsCarre();}" >';
	h += '<div class="luditopheader" ></div>';
	
	h += '<div class="ludimenuteachdoc" >';
	
	var loadM = amplify.store("menuHtmlInLocal" + idPageHtmlTop);
	if(loadM!=undefined||loadM!=''||loadM!='undefined'){
		h += loadM;
	}else{
		h += lstUlLoad;
	}
	
	h += '</div>';
	h += displayParamsTeachEdit();
	h += '</div>';

	//Context Menu
	h += '<div class="ludiEditMenuContext" >';
	h += '<input id="changeTitlePage" type="text" value="" style="width:310px;margin:11px;font-size:12px;padding:5px;" />';
	
	h += '<div class="uPIcon minIcon" onClick="upContextMenuSub(0);" ></div>';
	h += '<div class="dowNIcon minIcon" onClick="upContextMenuSub(1);" ></div>';
	
	h += '<p style="position:absolute;left:12px;top:85px;padding:5px;margin:5px;" >';
	h += '<input type="radio" class=checkBehaviorWind id="Behavior0" name="behaviorPage" ></input>';
	h += '<label class="trd" for="Behavior0">Free page</label>';
	h += '</p>';

	h += '<p style="position:absolute;left:12px;top:110px;padding:5px;margin:5px;" >';
	h += '<input type="radio" class=checkBehaviorWind id="Behavior1" name="behaviorPage" ></input>';
	h += '<label class="trd" for="Behavior1">The page is subject to the progression</label>';
	h += '</p>';

	h += '<p style="position:absolute;left:12px;top:135px;padding:5px;margin:5px;" >';
	h += '<input type="radio" class=checkBehaviorWind id="Behavior2" name="behaviorPage" ></input>';
	h += '<label class="trd" for="Behavior2">You must resolve this page to continue</label>';
	h += '</p>';

	h += '<a onClick="deleteContextMenuSub();" ';
	h += ' style="position:absolute;bottom:10px;left:5px;cursor:pointer;"  >';
	h += '<img src="icon/delete-icon-24.png" /></a>';

	h += '<input onClick="closeAllEditWindows();" ';
	h += ' style="position:absolute;bottom:10px;right:120px;border:solid 1px gray;cursor:pointer;color:white;" ';
	h += ' class="gjs-one-bg ludiButtonCancel trd" type="button" value="Cancel" />';

	h += '<input onClick="saveContextMenuSub();" ';
	h += ' style="position:absolute;bottom:10px;right:10px;border:solid 1px gray;cursor:pointer;color:white;" ';
	h += ' class="gjs-one-bg ludiButtonSaveMenu trd" type="button" value="Save" />';
	
	h += '</div>';
	
	return h;

}

function refreshMenu(refEditNode){

	$.ajax({
		url : '../ajax/list-menu.php?v=2&id=' + idPageHtml,
		type: "GET",
		cache: false,
		success: function(data,textStatus,jqXHR){
			if(data.indexOf("ul")!=-1){
				$('.ludimenuteachdoc').html(data);
				saveContextMenuInLocal();
				if (refEditNode!=-1) {
					$('#labelMenuLudi'+refEditNode).css('background','#F3E2A9');
				}
			}else{

			}
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			alert("Error !");
			alert(textStatus);
		}
	});

	
	
}

var onlyOneUpdate = true;
var subTitleLoadData = new Array();
var oldTitleLoadData = '';
var scrollTeachdoc = 0;

var updateMenuEvent = false;

//Menu Down Up
function loadContextMenuSub(i,posi){

	if(onlyOneUpdate){
		
		loadaFunction();
		
		scrollTeachdoc = $('.ludimenuteachdoc').scrollTop();

		refIdPageLudi = i;
		refPosiPageLudi = posi;
		
		$('.miniMenuLudi').css('color','black');
		$('.miniMenuLudi').css('background','transparent');
		$('#labelMenuLudi'+refIdPageLudi).css('background','#F3E2A9');

		var behavior = parseInt($('#labelMenuLudi'+i).attr("behavior"));

		if(behavior==0){
			$('#Behavior0').attr('checked',true);
			$('#Behavior1').attr('checked',false);
			$('#Behavior2').attr('checked',false);
		}
		if(behavior==1){
			$('#Behavior0').attr('checked',false);
			$('#Behavior1').attr('checked',true);
			$('#Behavior2').attr('checked',false);
		}
		if(behavior==2){
			$('#Behavior0').attr('checked',false);
			$('#Behavior1').attr('checked',false);
			$('#Behavior2').attr('checked',true);
		}

		if(subTitleLoadData[i]== undefined||subTitleLoadData[i]==''){
			subTitleLoadData[i] = $('#labelMenuLudi'+i).html();
		}
		if(subTitleLoadData[i]!=''){
			$('#labelMenuLudi'+refIdPageLudi).css('color','black');
			$('#changeTitlePage').val(subTitleLoadData[i])
		}
		if(idPageHtmlTop==refIdPageLudi){
			$('.ludiButtonDelete').css("display","none");
		}else{
			$('.ludiButtonDelete').css("display","block");
		}

		$('.ludiEditMenuContext').css("display","block");
		$('.ludiEditMenuContext').css("top",parseInt(78 + (posi * 35)-scrollTeachdoc)+"px");

		if(refIdPageLudi==idPageHtmlTop ){
			$('.uPIcon,.dowNIcon').css("opacity","0");
		}else{
			$('.uPIcon,.dowNIcon').css("opacity","1");
		}

	}

}

function saveContextMenuSub(){

	if (onlyOneUpdate) { 

		var strLib = $('#changeTitlePage').val();
		$('#labelMenuLudi'+refIdPageLudi).html(strLib);
		subTitleLoadData[refIdPageLudi] = strLib;
		var behav = 0;
		if($('#Behavior1').is(':checked')){behav = 1;}
		if($('#Behavior2').is(':checked')){behav = 2;}
		var formData = {
			id : refIdPageLudi,
			title : strLib,
			behavior : behav
		};

		$('#labelMenuLudi'+refIdPageLudi).attr("behavior",behav)

		onlyOneUpdate = false;
		updateMenuEvent = true;

		$('#labelMenuLudi'+refIdPageLudi).css('color','orange');

		$.ajax({
			url : '../ajax/save/ajax.uptsubdoc.php?id=' + refIdPageLudi + '&pt=' + idPageHtmlTop,
			type: "POST",
			data : formData,
			success: function(data,textStatus,jqXHR){
				
				$('#labelMenuLudi'+refIdPageLudi).css('background','transparent');
				if(data.indexOf('KO')==-1){
					$('#labelMenuLudi' + refIdPageLudi).css('color','green');
				}else{
					$('#labelMenuLudi' + refIdPageLudi).css('color','red');
				}
				onlyOneUpdate = true;
				
			},
			error: function (jqXHR, textStatus, errorThrown)
			{
				$('#logMsgLoad').css("display","block");
				alert("Error !");
				alert(textStatus);
				onlyOneUpdate = true;
			}
		});

		closeAllEditWindows();
			
	}
	
}

function deleteContextMenuSub(){

	if(idPageHtmlTop!=refIdPageLudi&&onlyOneUpdate){

		var formData = {id:refIdPageLudi};

		onlyOneUpdate = false;
		updateMenuEvent = true;
		$('.ludiEditMenuContext').css("display","none");

		$('#labelMenuLudi'+refIdPageLudi).css('text-decoration','line-through');
		$('#labelMenuLudi'+refIdPageLudi).css('color','red');
		
		$.ajax({
			url : '../ajax/save/ajax.uptsubdoc.php?a=666&id=' + refIdPageLudi + '&pt=' + idPageHtmlTop,
			type: "POST",
			data : formData,
			success: function(data,textStatus,jqXHR){

				if(data.indexOf('KO')==-1){
					$('#labelMenuLudi'+refIdPageLudi).css('color','black');
				}else{
					$('#labelMenuLudi'+refIdPageLudi).css('color','orange');
					$('#labelMenuLudi'+refIdPageLudi).css('text-decoration','none');
				}

				setTimeout(function(){

					if(idPageHtml==refIdPageLudi){
						window.location.href = "index.php?action=edit&id=" + parseInt(idPageHtmlTop);
					}else{
						$('#labelMenuLudi'+refIdPageLudi).parent().css("display","none");
						onlyOneUpdate = true;
					}
	
				},1000);
				
			},
			error: function (jqXHR, textStatus, errorThrown)
			{
				$('#logMsgLoad').css("display","block");
				alert("Error !");
				alert(textStatus);
				onlyOneUpdate = true;
			}
		});

		closeAllEditWindows();
		
	}

}

function upContextMenuSub(u){

	if(idPageHtmlTop!=refIdPageLudi&&onlyOneUpdate&&(refPosiPageLudi>1||u==1)){

		var formData = {id:refIdPageLudi};

		onlyOneUpdate = false;
		updateMenuEvent = true;
		
		scrollTeachdoc = $('.ludimenuteachdoc').scrollTop();

		$('.minIcon').css("display","none");
		$('#labelMenuLudi'+refIdPageLudi).css('color','orange');
		
		if(u==0){

			if(refPosiPageLudi>0){
				refPosiPageLudi = refPosiPageLudi - 1;
				$('.ludiEditMenuContext').css("top",parseInt(78 + (refPosiPageLudi * 35) - scrollTeachdoc)+"px");
			}
			
			var $current = $('#labelMenuLudi'+refIdPageLudi).parent();
			var $previous = $current.prev('li');
			if($previous.length !== 0){
			  $current.insertBefore($previous);
			}
		}

		if(u==1){

			if(refPosiPageLudi>0){
				refPosiPageLudi = refPosiPageLudi + 1;
				$('.ludiEditMenuContext').css("top",parseInt(78 + (refPosiPageLudi * 35) - scrollTeachdoc)+"px");
			}

			var $current = $('#labelMenuLudi'+refIdPageLudi).parent().next();
			var $previous = $current.prev('li');
			if($previous.length !== 0){
			  $current.insertBefore($previous);
			}
		}

		$.ajax({
			url : '../ajax/save/ajax.subdocmoveup.php?a='+u+'&id=' + refIdPageLudi + '&pt=' + idPageHtmlTop,
			type: "POST",
			data : formData,
			success: function(data,textStatus,jqXHR){

				if(data.indexOf('KO')==-1){
					$('#labelMenuLudi'+refIdPageLudi).css('color','black');
					$('#labelMenuLudi'+refIdPageLudi).css('background','#F3E2A9');
					$('.minIcon').css("display","block");
				}else{
					$('#labelMenuLudi'+refIdPageLudi).css('color','orange');
					$('#labelMenuLudi'+refIdPageLudi).css('text-decoration','none');
				}
				refreshMenu(refIdPageLudi);
				onlyOneUpdate = true;
				
			},error: function (jqXHR, textStatus, errorThrown)
			{
				$('#logMsgLoad').css("display","block");
				alert("Error !");
				alert(textStatus);
				onlyOneUpdate = true;
			}
		});

	}

}

function saveContextMenuInLocal() {

	if(localStorage){
		
		var menuHtmlInLocal = cleText($('.ludimenuteachdoc').html());
		
		if (menuHtmlInLocal!="") {
			
			menuHtmlInLocal = menuHtmlInLocal.replace('activeli','');

			if(updateMenuEvent){	
				menuHtmlInLocal = menuHtmlInLocal.replace(/onclick/g,'dataclick');
				menuHtmlInLocal = menuHtmlInLocal.replace(/onClick/g,'dataclick');
			}

			amplify.store("menuHtmlInLocal" + idPageHtmlTop, menuHtmlInLocal);
		}
	
	}

}

function displaySubImportProject() {

	window.location.href = "import-project/import.php?id=" + parseInt(idPageHtmlTop);
	
}

var oldUrlVideo = "";
var tmpNameDom = "editnode";
var tmpNameObj = "";
var tmpObjDom;
var windowEditorIsOpen = false;

function actionEditButon(){

	if(typeof tmpObjDom === 'undefined'&&GlobalIDGrappesObj!=''){	
		tmpObjDom = getAbstractObjDom(GlobalIDGrappesObj);
	}
	
	if(tmpObjDom&&GlobalIDGrappesObj!=''){

		var actionFind = false;
		var domObj = $(tmpObjDom);
		
		if(domObj.hasClass("rapidselectorgrapvideo")){
			//displayVideoEdit(tmpObjDom);
			//actionFind = true;
		}
		if(domObj.is("video")){
			displayVideoEdit(tmpObjDom);
			actionFind = true;
		}
		if(domObj.is("audio")){
			displayAudioEdit(tmpObjDom);
			actionFind = true;
		}
		if(domObj.is("table")){
			if(domObj.hasClass("qcmbarre")){
				displayQcmEdit(tmpObjDom);
				actionFind = true;
			}
			if(domObj.hasClass("teachdoctext")){
				displayTeachDocTextEdit(tmpObjDom);
				actionFind = true;
			}
			if(domObj.hasClass("teachdocbtnteach")){
				displayBtnEdit(tmpObjDom);
				actionFind = true;
			}
			if(domObj.hasClass("teachdocplugteach")){
				displayPlugTeachEdit(tmpObjDom);
				actionFind = true;
			}
		}
		
		if(actionFind==false&&GlobalIDGrappesObj!=''){
			tmpObjDom = getAbstractObjDom(GlobalIDGrappesObj);
		}

	}

}

function placeEditButonDyna(){
	
	if(tmpObjDom){

		var domObj = $(tmpObjDom);
		
		if(domObj.is("video")||domObj.is("audio")){
			displayEditButonY(tmpObjDom);
			tmpNameObj = "video";
		}
		if(domObj.hasClass("rapidselectorgrapvideo")){
			displayEditButonY(tmpObjDom);
			tmpNameObj = "video";
		}
		if(domObj.is("img")||domObj.is("image")){
			displayEditButonY(tmpObjDom);
			tmpNameObj = "image";
		}
		if(domObj.is("table")){
			if(domObj.hasClass("qcmbarre")){
				displayEditButonY(tmpObjDom);
				tmpNameObj = "qcmbarre";
			}
			if(domObj.hasClass("teachdoctext")){
				displayEditButonY(tmpObjDom);
				tmpNameObj = "teachdoctext";
			}
			if(domObj.hasClass("teachdocplugteach")){
				if (domObj.html().indexOf(">animfx<")!=-1) {
					tmpNameObj = "animfx";
				} else {
					tmpNameObj = "plugteach";
				}
				if (tmpNameObj!="animfx") {
					displayEditButonY(tmpObjDom);
				}
			}
			if(domObj.hasClass("teachdocbtnteach")){
				displayEditButonY(tmpObjDom);
				tmpNameObj = "button";
			}
		}

	}
	setTimeout(function(){placeEditButonDyna();},100);
}
setTimeout(function(){ placeEditButonDyna(); },1000);

function displayFromGrappes(iDGrappesObj){

	var domObj = getAbstractObjDom(iDGrappesObj);
	if(domObj!=-1){
		tmpObjDom = domObj;
	}
	
}

function displayEditButon(myObj){

	if(typeof myObj === 'undefined'){	
		return false;
	}

	var domObj = $(myObj);
	tmpObjDom = domObj;
}

function displayEditButonY(myObj){

	if(typeof myObj === 'undefined'){	
		return false;
	}

	var domObj = $(myObj);
	
	var maxTop = $(".ludimenu").height();
	var posW = $(".ludimenu").width();

	var position = searchGlobalPosi(domObj);
	var posX = posW + parseInt(position[0]) + ((domObj.width()) - 48);
	var posy = 45 + parseInt(position[1]);

	if(posy>maxTop-50){
		posy = maxTop-50;
	}

	$(".ludiEditIco").css('left',posX + 'px');
	$(".ludiEditIco").css('top', posy + 'px');

	if (tmpNameObj=='image') {
		if (posy<45) {
			posy=45;
		}
		$(".ludiSpeedTools").css('top', posy + 'px');
		var posR = $(".gjs-blocks-c").width() + 20;
		var posR2 = $(".gjs-pn-views").width() + 20;
		if (posR<posR2) {
			posR = posR2;
		}
		$(".ludiSpeedTools").css('right', posR + 'px');
		installSpeedTools();
	}

}

function searchGlobalPosi(domObj){

	if(typeof domObj === 'undefined'){	
		return false;
	}

	var obJoffset = domObj.offset();

	var topScrollTop = getTopScroll(domObj);

	var left_position = obJoffset.left;
	var top_position = obJoffset.top - topScrollTop;
	var posiDomObj = [left_position,top_position];

	return posiDomObj;

}

function getTopScroll(domObj){

	if(typeof domObj === 'undefined'){	
		return false;
	}

	var topScrollTop = $(document).scrollTop();

	var parentObj = domObj.parent();
	
	//#wrapper
	if(parentObj.is("body")){
		topScrollTop = $(parentObj).scrollTop();
	}else{
		var parentObj2 = parentObj.parent();
		if(parentObj2.is("body")){
			topScrollTop = $(parentObj2).scrollTop();
		}else{
			var parentObj3 = parentObj2.parent();
			if(parentObj3.is("body")){
				topScrollTop = $(parentObj3).scrollTop();
			}else{
				var parentObj4 = parentObj3.parent();
				if(parentObj4.is("body")){
					topScrollTop = $(parentObj4).scrollTop();
				}else{
					var parentObj5 = parentObj4.parent();
					if(parentObj5.is("body")){
						topScrollTop = $(parentObj5).scrollTop();
					}else{
						var parentObj6 = parentObj5.parent();
						if(parentObj6.is("body")){
							topScrollTop = $(parentObj6).scrollTop();
						}else{
							var parentObj7 = parentObj6.parent();
							if(parentObj7.is("body")){
								topScrollTop = $(parentObj7).scrollTop();
							}else{
								var parentObj8 = parentObj7.parent();
								if(parentObj8.is("body")){
									topScrollTop = $(parentObj8).scrollTop();
								}else{
									var parentObj9 = parentObj8.parent();
									if(parentObj9.is("body")){
										topScrollTop = $(parentObj9).scrollTop();
									}else{
										
									}
								}
							}
						}
					}
				}
			}
		}
	}

	return topScrollTop;

}

function closeAllEditWindows(){
	
	$('.miniMenuLudi').css('background','transparent');
	$('#BtnEditWindows').css("display","none");
	$('#VideoEditLinks').css("display","none");
	
	$('#AudioEditLinks').css("display","none");
	$('#QcmEditLinks').css("display","none");
	$('.WinEditColorsTeach').css("display","none");
	
	$('.BtnEditPlugTeach').css("display","none");

	$('#pageEditProgressClean').css("display","none");
	$('#TeachDocTextEditWindows').css("display","none");
	
	$('.ludiEditMenuContext').css("display","none");
	$("#pageEditExportScorm").css("display","none");
	$("#BtnFXTeachList").css("display","none");
	
	$("#pageEditGlobalParams").css("display","none");
	$('#panel-view-history').css("display","none");
	$('#pageEditAdd').css("display","none");

	$('#pageEditHistory').css("display","none");
	$('#pageEditTemplates').css("display","none");
	$('#pageDevAdminParams').css("display","none");
	
	$('#TeachDocPasteEditWindows').css("display","none");
	$("#ImageActiveEdit").css("display","none");
	$("#FileManagerStudio").css("display","none");
	$("#pageEditExportProject").css("display","none");
	$("#ExportToManager").css("display","none");
	
	$('.ludimenu').css("display","");
	$('.ludimenu').css("z-index","1000");
	$('.tox-toolbar__group').css("display","none");
	
	$("#pageEditThemeParams").css("display","none");
	$('#SelectLanguageWindows').css("display","none");
	
	$('#glossaryManager').css("display","none");
	$('#pageDevUpdate').css("display","none");
	
	$('.objMenuParamFloat').css("display","none");
	$('.maskobjMenu').css("display","none");
	$('.maskpause').css("display","none");

	$('#txtEditWinplace').removeClass("winPlaceLeft");
	$('#txtEditWinplace').removeClass("winPlaceRight");
	$('#TeachDocTextEditWindows').removeClass("winPlaceClear");
	
	deleteAllTopMenu();
	isTabActive = true;
	displayToolsCarre();
	onePasteOnly = true;
	windowEditorIsOpen = false;
	
}

var onlyOneRedirect = false;

function loadSubLudi(i){
	
	if(onlyOneUpdate){ 
	
		if (onlyOneRedirect==false) {

			loadaFunction();
			saveSourceFrame(false,false,i);
			
			$('.list-teachdoc li').removeClass('activeli');
			$('#labelMenuLudi'+i).parent().addClass('activeli');
			
			refIdPageLudi = i;
			onlyOneRedirect = true;
			$('#dataFileEditWindows').css("display","none");
			$('.gjs-frame').css("visibility","hidden");
			$('.gjs-pn-devices-c').css("display","none");
			$('.gjs-cv-canvas').css("position","relative");
			$('.gjs-cv-canvas').css("background-color","white");
			
			installFakeLoad();

			$(".loadbarre").animate({
				width: '480px'
			},1500, function(){
				$(".loadbarre").animate({
					width: '240px'
				},1000, function(){
					$(".loadbarre").animate({
						width: '480px'
					},1000, function(){
					});
				});
			});
			
		}
		
	}

}

function installFakeLoad(){
	
	$('.ludiEditIco').css('display','none');
	$('.ludiSpeedTools').css('display','none');

	var fakeLoad = "<div class='fakeBodyFrame' style='" + getcontextStyleBack() + "' ><div class=fakeLoadFrame >";
	fakeLoad += "<br/>";
	fakeLoad += "<img class='loadbarre' style='width:240px;height:20px;margin:5px;' src='img/rectangle-loader.gif' />";
	fakeLoad += "<br/><br/>";
	fakeLoad += "<img style='width:150px;height:20px;margin:5px;' src='img/rectangle-loader.gif' />";
	fakeLoad += "<br/><br/>";
	fakeLoad += "<img style='width:250px;height:20px;margin:5px;' src='img/rectangle-loader.gif' />";
	fakeLoad += "<br/><br/>";
	fakeLoad += "<img style='width:150px;height:20px;margin:5px;' src='img/rectangle-loader.gif' />";
	fakeLoad += "<br/><br/>";
	fakeLoad += "<img style='width:50px;height:20px;margin:5px;' src='img/rectangle-loader.gif' />";
	fakeLoad += "<br/><br/>";
	fakeLoad += "<img style='width:150px;height:20px;margin:5px;' src='img/rectangle-loader.gif' />";
	fakeLoad += "</div>";
	fakeLoad += "</div>";

	$('.gjs-cv-canvas').html(fakeLoad);

}

function getcontextStyleBack(){

	var sty = "";

	if (colorsPath=="white-chami.css"||colorsPath=="") {
		sty = "background-color : #d1d1e0!important;"
	}
	if (colorsPath=="orange-chami.css") {
		sty = "background-color :#d1d1e0!important;"
	}
	if (colorsPath=="eco-chami.css") {
		sty = "background-image : url(img/classique/leafs.png);"
		sty += "background-position: left bottom;";
		sty += "background-repeat: no-repeat;";
		sty += "background-color :#E8F6F3!important;";
		sty += "background-attachment: fixed;"
	}
	if (colorsPath=="paper-chami.css") {
		sty = "background-color :#d1d1e0!important;"
	}
	if (colorsPath=="office-chami.css") {
		sty = "background-image : url(img/classique/office-a.png);";
		sty += "background-position: left bottom;";
		sty += "background-repeat: no-repeat;";
		sty += "background-color :#EBEDEF!important;";
		sty += "background-attachment: fixed;";
	}
	if (colorsPath=="white-sky.css") {
		sty = "background-image : url(img/classique/sky-azure.jpg);";
		sty += "background-position: left bottom;";
		sty += "background-repeat: repeat-x;";
		sty += "background-color :#E8F6F3!important;";
		sty += "background-attachment: fixed;";
	}

	return sty;

}

var typeWindEditLink = 0;

function showFileManagerStudio(t,src,callbackfct){
	
	if(src==0){src='';}
	
	typeWindEditLink = t;
	
	$('<div \>').dialog({modal:true,width:"80%",title:"Select your file",zIndex: 99999,
		create:function(event,ui){
			$(this).elfinder({
				resizable: false,
				url: "../../../main/inc/lib/elfinder/connectorAction.php",
				commandsOptions: {
					getfile: {
					oncomplete: 'destroy' 
					}
				},                       
				getFileCallback: function(file) {

					//alert(file.url);
					$('.ui-dialog').css("display","none");
					
					$('.workingProcessSave').css("display","block");

					if(typeWindEditLink==0){

						var formData = {
							id : idPageHtmlTop,
							ur : encodeURI(file.url)
						};
						$.ajax({
							url : '../ajax/ajax.upldimg.php?id=' + formData.id + '&ur=' + formData.ur,
							type: "POST",data : formData,
							success: function(data,textStatus,jqXHR){

								if(data.indexOf("error")==-1&&data.indexOf("img_cache")!=-1){
									pushImageToColl(data);
								}else{
									pushImageToColl(file.url);
								}

							},
							error: function (jqXHR, textStatus, errorThrown)
							{
								pushImageToColl(file.url);
							}
						});
						
					}
					if(typeWindEditLink==1){
						$('#inputVideoLink').val(file.url);
						deleteLoadSave();
					}
					if(typeWindEditLink==2){
						$('#inputAudioLink').val(file.url);
						deleteLoadSave();
					}
					if(typeWindEditLink==11){
						$('#datatext1').val(file.url);
						deleteLoadSave();
					}
					if(typeWindEditLink==12){
						$('#datatext2'+src).val(file.url);
						deleteLoadSave();
					}

					if(typeWindEditLink==13){
						
						var formData = {
							id : idPageHtmlTop,
							ur : encodeURI(file.url)
						};
						$.ajax({
							url : '../ajax/ajax.upldimg.php?id=' + formData.id + '&ur=' + formData.ur,
							type: "POST",data : formData,
							success: function(data,textStatus,jqXHR){

								if(data.indexOf("error")==-1&&data.indexOf("img_cache")!=-1){
									$('#'+src).val(data);
								}else{
									$('#'+src).val(file.url);
								}
								window[callbackfct]();
							},
							error: function (jqXHR, textStatus, errorThrown)
							{
								$('#'+src).val(file.url);
								window[callbackfct]();
							}
						});
						
					}

					if(typeWindEditLink==14){

						var formData = {
							id : idPageHtmlTop,
							ur : encodeURI(file.url)
						};
						$.ajax({
							url : '../ajax/ajax.upldimg.php?id=' + formData.id + '&ur=' + formData.ur ,
							type: "POST",data : formData,
							success: function(data,textStatus,jqXHR){
								if(data.indexOf("error")==-1&&data.indexOf("img_cache")!=-1){
									$('#'+src).val(data);
								}else{
									alert(data);
									$('#'+src).val("");
								}
								window[callbackfct]();
							},
							error: function (jqXHR, textStatus, errorThrown)
							{
								$('#'+src).val(file.url);
								window[callbackfct]();
							}
						});
						
					}


				}
			}).elfinder('instance')
		}
	});

}

function isImageStudio(imgA){
	
	var r = false;

	if (imgA==''||
    (imgA.toLowerCase().indexOf('.png')==-1
    &&imgA.toLowerCase().indexOf('.jpg')==-1
    &&imgA.toLowerCase().indexOf('.jpeg')==-1
    &&imgA.toLowerCase().indexOf('.gif')==-1
    &&imgA.toLowerCase().indexOf('cache')==-1)
    ){
		r = false;
	} else {
		r = true;
	}
	
	return r;

}

function isImageFile(imgA){
	
	var r = false;

	if (imgA==''||
    (imgA.toLowerCase().indexOf('.png')==-1
    &&imgA.toLowerCase().indexOf('.jpg')==-1
    &&imgA.toLowerCase().indexOf('.jpeg')==-1
    &&imgA.toLowerCase().indexOf('.gif')==-1)
    ){
		r = false;
	} else {
		r = true;
	}
	
	return r;

}

function pushImageToColl(fileurl){

	$('.ui-widget-overlay').css("display","none");
	$('.workingProcessSave').css("display","none");
	
	$('.gjs-am-add-asset').find("input").val(fileurl);
	$('.gjs-am-add-asset button').css("background","cornflowerblue");
	$('.gjs-am-add-asset button').css("color","white");
	$('.img-plus-gjs').click();

}

function deleteLoadSave(){
	$('.ui-widget-overlay').css("display","none");
	$('.workingProcessSave').css("display","none");
}

var refIdPageLudi = 0;
var refPosiPageLudi = 0;
var refLedtAddPage = 0;
var tplSelectPg = -1;
var reftypeNodeV = 0;

function selectTplPage(i){
	tplSelectPg = i;
	$('.tpl-page-select').css("border","solid 3px #BDBDBD");
	$('.tplpage'+tplSelectPg).css("border","solid 3px gray");
}

function saveNextSubLudi(){
	
	var inputTitlePageStr = $('#inputTitlePage').val();	
	
	if(inputTitlePageStr!=""){
		
		var typeNodeV = 2;
		if($('#typenode3').is(':checked')){
			typeNodeV = 3;
		}
		if($('#typenode4').is(':checked')){
			typeNodeV = 4;
		}
		reftypeNodeV = typeNodeV;

		$('#inputAddSubPage').css("display","none");
		$('#loadsave').css("display","block");

		updateMenuEvent = true;
		var formData = {
			id : refIdPageLudi,
			title : inputTitlePageStr,
			typenode : typeNodeV
		};

		if (typeNodeV==2) {
		
			$('.oelTitlePage').css("display","none");
			$('.oelChosePage').css("display","");
			
			$('.oelInputAdd1').css("display","none");
			$('.oelInputAdd2').css("display","");

		}
		if (typeNodeV==3||typeNodeV==4) {
			
			$('.oelTitlePage').css("display","none");
			$('#oelTitleload').css("display","");
		
		}

		$.ajax({
			url : '../ajax/save/ajax.addsubdoc.php?id=' + refIdPageLudi + '&pt=' + idPageHtmlTop,
			type: "POST",
			data : formData,
			success: function(data,textStatus,jqXHR){

				if(data.indexOf("KO")==-1&&data.indexOf("error")==-1){
				
					var idNp = parseInt(data);
					if(isNaN(idNp)){
					}else{

						$('#loadsave').css("display","none");
						refLedtAddPage = idNp;

						//title section
						if (reftypeNodeV==3) {
							refreshMenu(-1);
							$('#oelTitleload').css("display","none");
							$('.oelInputAdd2').css("display","none");
							$('.tpl-page-select').css("display","none");
							$('.tpl-page-title').css("display","none");
							$('.tpl-page-loader').css("display","block");
							closeAllEditWindows();
						}
						if (reftypeNodeV==4) {
							tplSelectPg = 1;
							saveNextSubLudiFinal();
						}
						
					}
					
				}

			},
			error: function (jqXHR, textStatus, errorThrown)
			{
				$('#logMsgLoad').css("display","block");
				alert("Error !");
				alert(textStatus);
			}
		});

	}

}

function saveNextSubLudiFinal(){
	
	if(refLedtAddPage>0&&tplSelectPg>-1){
		$('.oelInputAdd2').css("display","none");
		$('.tpl-page-select').css("display","none");
		$('.tpl-page-title').css("display","none");
		$('.tpl-page-loader').css("display","block");
		window.location.href = "index.php?action=edit&id=" + parseInt(refLedtAddPage)+ "&first=1&pty=p" + tplSelectPg + "&ty=0";
		tplSelectPg = -1;
	}

}

function displaySubProgressClean(){
	
	$('.ludimenu').css("z-index","2");

	cleanSourceLocation = 0;
	saveSourceLocations();

	if($("#pageEditProgressClean").length==0){
		
		var bdDiv = '<div id="pageEditProgressClean" class="gjs-mdl-container" >';
		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" style="max-width:575px;" >';
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title">Edition</div>';
		bdDiv += '<div class="gjs-mdl-btn-close" onClick="closeAllEditWindows()" data-close-modal="">⨯</div>';
		bdDiv += '</div>';
		
		bdDiv += '<div class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;" >';
		bdDiv += '<br/>';
		bdDiv += '<img class="brossIcons" src="img/bross.png" />';
		bdDiv += '<br/>';
		bdDiv += '<br/>';
		bdDiv += '</div>';
		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
		bdDiv += '</div>';
		$('body').append(bdDiv);

	}

	if($("#pageEditProgressClean").length==1){

		loadaFunction();
		
		$(".brossIcons").css("margin-left","300px");
		
		$(".brossIcons").animate({
			marginLeft: "60px"
		},1000, function(){
			$(".brossIcons").animate({
				marginLeft: "300px"
			},2000, function(){
				if(cleanSourceLocation==1){
					closeAllEditWindows();
				}else{
					$(".brossIcons").animate({
						marginLeft: "60px"
					},5000, function(){
						if(cleanSourceLocation==1){
							closeAllEditWindows();
						}else{
							alert('Error !');
						}
					});
				}
				
			});
		});

		$('.ludimenu').css("display","none");
		$('#pageEditProgressClean').css("display","");
		traductAll();
		
	}


}

var cleanSourceLocation = 0;

function saveSourceLocations(){
	if (localStorage) {
		window.localStorage.setItem('data'+idPageHtmlTop,"@@@@@@");
	}

	$.ajax({
		url : '../ajax/sco/scorm-save-location.php?idteach=' + idPageHtmlTop,
		type: "POST",
		success: function(data,textStatus,jqXHR){
			cleanSourceLocation = 1;
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			cleanSourceLocation = 0;
		}
	});

}

var oldUrlAudio = "";

function displayAudioEdit(myObj){

	var audioObj = $(myObj);
	tmpObjDom = audioObj;

	if($("#AudioEditLinks").length==0){

		var bdDiv = '<div id="AudioEditLinks" class="gjs-mdl-container" style="" >';
		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color">';
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title trd">Edition</div>';
		bdDiv += '<div class="gjs-mdl-btn-close gjs-mdl-btn-close-audio" onClick="closeAllEditWindows()" ';
		bdDiv += ' data-close-modal="">⨯</div>';
		bdDiv += '</div>';
		
		bdDiv += '<div class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;" >';
		bdDiv += 'File&nbsp;:&nbsp;';
		bdDiv += '<input id="inputAudioLink" type="text" value="http://" style="width:450px;font-size:12px;padding:5px" />';
		bdDiv += '&nbsp;<input onClick="filterGlobalFiles=\'.mp3\';showFileManagerStudio2(23,\'inputAudioLink\',0);" ';
		bdDiv += ' style="border:solid 1px gray;padding:5px;cursor:pointer;color:white;width:50px;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonSave" type="button" value="..." />';
		
		bdDiv += '<br/>';
		bdDiv += '<div style="padding:25px;text-align:right;" >';
		bdDiv += '<input onClick="saveAudioEdit()" ';
		bdDiv += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonSave trd" type="button" value="Save" /><br/>';
		bdDiv += '</div>';
		
		bdDiv += '</div>';
		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
		bdDiv += '</div>';

		$('body').append(bdDiv);

		
	}

	if($("#AudioEditLinks").length==1){
		
		strLinkString = audioObj.attr("datahref");
		var idm = Math.floor(Math.random() * Math.floor(200));
		tmpNameDom = 'tempnode' + idm;
		audioObj.attr("id",tmpNameDom);

		oldUrlAudio = strLinkString;
		$('#inputAudioLink').val(strLinkString);	
		$('.ludimenu').css("z-index","2");
		$('#AudioEditLinks').css("display","");
		windowEditorIsOpen = true;
		loadaFunction();
		traductAll();

	}

}

function saveAudioEdit(){

	var inputAudioLink = $('#inputAudioLink').val();

	var audioObj = tmpObjDom;
	audioObj.attr("datahref",inputAudioLink);
	audioObj.attr("src",inputAudioLink);

	audioObj.load();

	var gjsHtml = localStorage.getItem("gjs-html-" + idPageHtml);
	if(oldUrlAudio!=""&&inputAudioLink!=""&&oldUrlAudio!=inputAudioLink){
		gjsHtml = gjsHtml.replace(oldUrlAudio,inputAudioLink);
		gjsHtml = gjsHtml.replace(oldUrlAudio,inputAudioLink);
		oldUrlAudio = inputAudioLink;
		localStorage.setItem("gjs-html-" + idPageHtml,gjsHtml);
		$('.ludimenu').css("z-index","1000");
		saveSourceFrame(false,false,0);
	}
	
	closeAllEditWindows();
}

function installVideoEdit(){
	
}

function displayVideoEdit(myObj){

	var vidObj = $(myObj);
	tmpObjDom = vidObj;

	if($("#VideoEditLinks").length==0){

		var bdDiv = '<div id="VideoEditLinks" class="gjs-mdl-container" style="" >';
		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color">';
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title">Edition</div>';
		bdDiv += '<div class="gjs-mdl-btn-close gjs-mdl-btn-close-video" onClick="closeAllEditWindows()" data-close-modal="">⨯</div>';
		bdDiv += '</div>';
		
		bdDiv += '<div class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;" >';
		bdDiv += 'File&nbsp;:&nbsp;';
		bdDiv += '<input id="inputVideoLink" type="text" value="http://" style="width:450px;font-size:12px;padding:5px;" />';
		bdDiv += '&nbsp;<input onClick="filterGlobalFiles=\'.mp4\';showFileManagerStudio2(23,\'inputVideoLink\',0);" ';
		bdDiv += ' style="border:solid 1px gray;padding:5px;cursor:pointer;color:white;width:50px;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonSave" type="button" value="..." />';
		
		bdDiv += '<br/>';
		bdDiv += '<div style="padding:25px;text-align:right;" >';
		bdDiv += '<input onClick="saveVideoEdit()" ';
		bdDiv += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonSave trd" type="button" value="Save" /><br/>';
		bdDiv += '</div>';
		
		bdDiv += '</div>';
		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
		bdDiv += '</div>';
		
		$('body').append(bdDiv);

		/*
		$('.gjs-mdl-btn-close-video').click(function(){
			if(OneCloseImage){
				OneCloseImage = false;
				ajustHtmlToGrap();
				setTimeout(function(){
					OneCloseImage = true;
				},1000);
			}
		});
		*/
	}

	if($("#VideoEditLinks").length==1){
		
		strLinkString = vidObj.attr("datahref");
		var idm = Math.floor(Math.random() * Math.floor(200));
		tmpNameDom = 'tempnode' + idm;
		vidObj.find(".sourcevid").attr("name",tmpNameDom);
		vidObj.attr("id",tmpNameDom);

		oldUrlVideo = strLinkString;
		$('#inputVideoLink').val(strLinkString);	
		$('.ludimenu').css("z-index","2");
		$('#VideoEditLinks').css("display","");
		windowEditorIsOpen = true;
		loadaFunction();
		traductAll();
	}

}

function saveVideoEdit(){

	var inputVideoLink = $('#inputVideoLink').val();

	var vidObj = tmpObjDom;
	vidObj.attr("datahref",inputVideoLink);
	vidObj.find(".sourcevid").attr("src",inputVideoLink);

	vidObj.load();

	var gjsHtml = localStorage.getItem("gjs-html-" + idPageHtml);
	if(oldUrlVideo!=""&&inputVideoLink!=""&&oldUrlVideo!=inputVideoLink){
		gjsHtml = gjsHtml.replace(oldUrlVideo,inputVideoLink);
		gjsHtml = gjsHtml.replace(oldUrlVideo,inputVideoLink);
		oldUrlVideo = inputVideoLink;
		localStorage.setItem("gjs-html-" + idPageHtml,gjsHtml);
		$('.ludimenu').css("z-index","1000");
		saveSourceFrame(false,false,0);
	}
	
	var rH = baseButton;
    rH = rH.replace("video/oel-teachdoc.mp4",inputVideoLink);
	rH = rH.replace("video/oel-teachdoc.mp4",inputVideoLink);
    if(GlobalTagGrappeObj=='div'){
		
	}
	setAbstractObjContent(rH);

	closeAllEditWindows();
}

var haveAchange = false;
var changeDataBase = new Array();
var identchange = '';
var indexChangeObj = -1;

function displayQcmEdit(myObj){
	
	var qcmObj = $(myObj);
	tmpObjDom = qcmObj;
	
	identchange = getUnikId();
	tmpObjDom.attr("data-ref",identchange);
	searchPosiIndex(identchange,"qcmbarre");
	
	if ($("#QcmEditLinks").length==0) {

		var bdDiv = '<div id="QcmEditLinks" class="gjs-mdl-container" style="" >';
		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" ';
		bdDiv += ' style="max-width:520px!important;" >';
		
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title">Edition</div>';
		bdDiv += '<div class="gjs-mdl-btn-close gjs-mdl-btn-close-audio" ';
		bdDiv += ' onClick="closeAllEditWindows()" ';
		bdDiv += ' data-close-modal="">⨯</div>';
		bdDiv += '</div>';

		bdDiv += inLineTextArea("QuizzText");
		bdDiv += inLineInput("AnswerA");
		bdDiv += inLineInput("AnswerB");
		bdDiv += inLineInput("AnswerC");
		bdDiv += inLineInput("AnswerD");

		bdDiv += '<div class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;" >';
		
		bdDiv += '<br/>';

		bdDiv += '<div style="padding:25px;text-align:right;" >';
		bdDiv += '<input onClick="saveQcmEdit()" ';
		bdDiv += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonSave trd" type="button" value="Save" /><br/>';
		bdDiv += '</div>';
		
		bdDiv += '</div>';
		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display:none"></div>';
		bdDiv += '</div>';

		$('body').append(bdDiv);

	}

	if($("#QcmEditLinks").length==1){
		
		var quizzTextQcm = qcmObj.find('.quizzTextqcm').html();
		$('#areaQuizzText').val(quizzTextQcm);
		
		$('#checkAnswerA').prop("checked",false);
		$('#checkAnswerB').prop("checked",false);
		$('#checkAnswerC').prop("checked",false);
		$('#checkAnswerD').prop("checked",false);

		var index = 0;
		qcmObj.find('tr td').each(function(index){

			//line 1
			if(index==1){
				var cocheA = $(this).find('img');
				if(cocheA.attr('src').indexOf('1.png')!=-1){
					$('#checkAnswerA').prop("checked",true);
				}
			}
			if(index==2){
				var VtextAnswerA = $(this).html();
				$('#textAnswerA').val(VtextAnswerA);
				
			}
			
			//line 2
			if(index==3){
				var cocheB = $(this).find('img');
				if(cocheB.attr('src').indexOf('1.png')!=-1){
					$('#checkAnswerB').prop("checked",true);
				}
			}
			if(index==4){
				var VtextAnswerB = $(this).html();
				$('#textAnswerB').val(VtextAnswerB);
			}

			//line 3
			if(index==5){
				var cocheC = $(this).find('img');
				var imgSrc = cocheC.attr('src');
				if(typeof imgSrc == 'undefined'||imgSrc=='undefined'){
					imgSrc = '';
				}
				if(imgSrc.indexOf('1.png')!=-1){
					$('#checkAnswerC').prop("checked",true);
				}
			}
			if(index==6){
				var VtextAnswerC = $(this).html();
				$('#textAnswerC').val(VtextAnswerC);
			}

			//line 4
			if(index==7){
				var cocheD = $(this).find('img');
				var imgSrc = cocheD.attr('src');
				if(typeof imgSrc == 'undefined'||imgSrc=='undefined'){
					imgSrc = '';
				}
				if(imgSrc.indexOf('1.png')!=-1){
					$('#checkAnswerD').prop("checked",true);
				}

			}
			if(index==8){
				var VtextAnswerD = $(this).html();
				$('#textAnswerD').val(VtextAnswerD);
			}

			index = index + 1;

		});

		$('.ludimenu').css("z-index",'2');
		$('#QcmEditLinks').css("display",'');
		windowEditorIsOpen = true;
		loadaFunction();
		$('textarea#areaQuizzText').tinymce(
			{menubar: false,statusbar: false}
		);
		traductAll();
	}

}

function searchPosiIndex(idRef,classname){

	var iframe = $('.gjs-frame');
	var iframeBody = iframe.contents().find("body");
	var allTables = iframeBody.find("table");
	var indexObj = 0;
	
	indexChangeObj = -1;

	allTables.each(function(index){
		if($(this).hasClass(classname)){
			indexObj++;
			var ObjIdRef = $(this).attr("data-ref");
			if(ObjIdRef==idRef){
				indexChangeObj = indexObj;
			}
		}
	});

}

function inLineTextArea(idRef){
	
	var bdDiv = "";
	bdDiv += '<p style="padding:5px;margin:5px;" >';
	bdDiv += '<textarea id="area'+idRef+'" name="area'+idRef+'" ';
	bdDiv += 'rows="5" cols="38" ';
	bdDiv += 'style="width:485px;font-size:13px;padding:2px;margin-left:27px;resize:none;" ></textarea>';
	bdDiv += '</p>';
	return bdDiv;

}

function inLineInput(idRef){
	var bdDiv = "";
	bdDiv += '<p style="padding:5px;margin:5px;" >';
	bdDiv += '<input type="checkbox" ';
	bdDiv += ' onClick="onClickCheckBox(this)" ';
	bdDiv += ' class=checkRapidWindows id="check'+idRef+'" ';
	bdDiv += ' name="check'+idRef+'" ></input>';
	bdDiv += '<input id="text'+idRef+'" class="checkInputAnswer" ';
	bdDiv += ' type="text" value="" ';
	bdDiv += ' style="width:450px;font-size:13px;padding:2px;" />';
	bdDiv += '</p>';
	return bdDiv;
}

function onClickCheckBox(objT){

	if($(objT).is(':checked')){
		$('#checkAnswerA').prop("checked",false);
		$('#checkAnswerB').prop("checked",false);
		$('#checkAnswerC').prop("checked",false);
		$('#checkAnswerD').prop("checked",false);
		$(objT).prop("checked",true);
	}

}

function saveQcmEdit(){

	if(onlyOneUpdate==false||indexChangeObj==-1){
		return false;
	}

	var TareaQuizzText = $('#areaQuizzText').val();

	var TtextAnswerA = $('#textAnswerA').val();
	var TtextAnswerB = $('#textAnswerB').val();
	var TtextAnswerC = $('#textAnswerC').val();
	var TtextAnswerD = $('#textAnswerD').val();

	var renderH = "<tbody>";

	renderH += "<div class='quizzblockdeco' ></div>";
	
	if(TareaQuizzText==''){
		TtextAnsTareaQuizzTextwerA = '?';
	}

	renderH += "<tr>";
	renderH += "<td colspan='2' class='quizzTextqcm' >" + TareaQuizzText + "</td>";
	renderH += "</tr>";

	if(TtextAnswerA==''){
		TtextAnswerA = 'Answer 1';
	}
	
	if(TtextAnswerA!=''){
		renderH += "<tr class='quizzTextTr' ><td class=quizzTextTd >";
		
		if($('#checkAnswerA').is(':checked')){
			renderH += "<img src='img/qcm/matgreen1.png' class='checkboxqcm' />";
		}else{
			renderH += "<img src='img/qcm/matgreen0.png' class='checkboxqcm' />";
		}

		renderH += "</td>";
		renderH += "<td style='text-align:left;' >" + TtextAnswerA + "</td>";
		renderH += "</tr>";	
	
	}

	if(TtextAnswerB!=''){
		renderH += "<tr class='quizzTextTr' ><td class=quizzTextTd >";

		if($('#checkAnswerB').is(':checked')){
			renderH += "<img src='img/qcm/matgreen1.png' class='checkboxqcm' />";
		}else{
			renderH += "<img src='img/qcm/matgreen0.png' class='checkboxqcm' />";
		}

		renderH += "</td>";
		renderH += "<td style='text-align:left;'  >" + TtextAnswerB + "</td>";
		renderH += "</tr>";	
	}
	if(TtextAnswerC!=''){
		renderH += "<tr class='quizzTextTr' ><td class=quizzTextTd >";
		if($('#checkAnswerC').is(':checked')){
			renderH += "<img src='img/qcm/matgreen1.png' class='checkboxqcm' />";
		}else{
			renderH += "<img src='img/qcm/matgreen0.png' class='checkboxqcm' />";
		}
		renderH += "</td>";
		renderH += "<td style='text-align:left;'  >" + TtextAnswerC + "</td>";
		renderH += "</tr>";	
	}
	if(TtextAnswerD!=''){
		renderH += "<tr class='quizzTextTr' ><td class=quizzTextTd >";
		if($('#checkAnswerD').is(':checked')){
			renderH += "<img src='img/qcm/matgreen1.png' class='checkboxqcm' />";
		}else{
			renderH += "<img src='img/qcm/matgreen0.png' class='checkboxqcm' />";
		}
		renderH += "</td>";
		renderH += "<td style='text-align:left;'  >" + TtextAnswerD + "</td>";
		renderH += "</tr>";	
	}

	renderH += "</tbody>";
	
	if(GlobalTagGrappeObj=='div'){
		var rdrFull = '<table onMouseDown="parent.displayEditButon(this);" ';
		rdrFull += ' class="qcmbarre" style="width:100%;">';
		rdrFull += renderH + '</table>';
		renderH = rdrFull;
	}

	//var qcmObj = $(tmpObjDom);
	//qcmObj.html(renderH);

	setAbstractObjContent(renderH);

	closeAllEditWindows();

	$('.ludimenu').css("z-index","1000");
	saveSourceFrame(false,false,0);

}

function getUnikId(){

	var idNum = Math.floor(Math.random() * 100);
	var iLetter = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for(var i=0;i<15; i++){
		iLetter += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
  
	return idNum + iLetter;
  
}
var indexTxtEdition = 0;

function displayTeachDocTextEdit(myObj){

	var QObj = $(myObj);
	tmpObjDom = QObj;

	identchange = getUnikId();
	tmpObjDom.attr("data-ref",identchange);

	if (!isTeachDocTextEdit(QObj)) {
		alert('error');
		return false;
	}
	
	indexTxtEdition++;

	if($("#TeachDocTextEditWindows").length==0){
		var bdDiv = '<div id="TeachDocTextEditWindows" class="gjs-mdl-container" style="" >';
		bdDiv += getInnerTextEngine();
		bdDiv += '</div>';
		$('body').append(bdDiv);
	}else{
		$('#TeachDocTextEditWindows').html(getInnerTextEngine());
	}

	if($("#TeachDocTextEditWindows").length==1){
		
		var getTextContent = QObj.find('.teachdoctextContent').html();
		$('#areaTeachDocText' + indexTxtEdition ).val(getTextContent);
		
		$('.ludimenu').css("z-index",'2');
		$('#TeachDocTextEditWindows').css("display",'');
		windowEditorIsOpen = true;
		loadaFunction();
		$('#areaTeachDocText'+indexTxtEdition).tinymce({
			menubar: false, statusbar: false,
			toolbar: 'undo redo| formatselect forecolor | bold italic underline | bullist numlist outdent indent link unlink removeformat | fontselect fontsizeselect blockquote code ',
			block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Infos=samp;Warning=address;',
			plugins: 'link lists', contextmenu: 'link lists',
			content_css: 'templates/colors/minicss/min-' + colorsPath
		});
		traductAll();
		
	}

}

function getInnerTextEngine(){

	var bdDiv = '<div id="txtEditWinplace" class="gjs-mdl-dialog-v2 winPlace gjs-one-bg gjs-two-color" ';
	bdDiv += ' style="max-width:800px!important;" >';
	bdDiv += '<div class="gjs-mdl-header">';
	bdDiv += '<div class="gjs-mdl-title">Edition</div>';

	bdDiv += '<div onClick="goToPlace(3);" class="winbtn-right" ></div>';
	bdDiv += '<div onClick="goToPlace(2);" class="winbtn-center" ></div>';
	bdDiv += '<div onClick="goToPlace(1);" class="winbtn-left" ></div>';

	bdDiv += '<div class="gjs-mdl-btn-close gjs-mdl-btn-close-audio" ';
	bdDiv += ' onClick="closeAllEditWindows()" ';
	bdDiv += ' data-close-modal="">⨯</div>';
	bdDiv += '</div>';

	bdDiv += '<div class="gjs-am-add-asset" ';
	bdDiv += 'style="padding:25px;padding-top:10px;font-size:16px;" >';
	
	bdDiv += '<p style="padding:5px;margin:0px;" >';
	bdDiv += '<textarea id="areaTeachDocText'+indexTxtEdition+'" name="areaTeachDocText'+indexTxtEdition+'" ';
	bdDiv += 'rows="25"';
	bdDiv += 'style="width:100%;font-size:13px;padding:2px;margin-left:20px;resize:none;" ></textarea>';
	bdDiv += '</p>';

	bdDiv += '<div style="padding:25px;padding-top:10px;padding-bottom:5px;text-align:right;" >';
	bdDiv += '<input onClick="saveTeachDocTextEdit()" ';
	bdDiv += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
	bdDiv += ' class="gjs-one-bg ludiButtonSave trd" type="button" value="Save" /><br/>';
	bdDiv += '</div>';
	
	bdDiv += '</div>';
	bdDiv += '</div>';

	bdDiv += '<div class="gjs-mdl-collector" style="display:none"></div>';

	return bdDiv;

}

function goToPlace(i) {

	$('#txtEditWinplace').removeClass("winPlaceLeft");
	$('#txtEditWinplace').removeClass("winPlaceRight");
	$('#TeachDocTextEditWindows').removeClass("winPlaceClear");
	var wback = $('#TeachDocTextEditWindows').width();
	var wplace = (wback - $('#txtEditWinplace').width())/2;
	
	if (i==1) {
		$('#txtEditWinplace').css("margin-right","auto");
		$('#txtEditWinplace').css("margin-left",wplace + "px");
		$('#TeachDocTextEditWindows').addClass("winPlaceClear");
		setTimeout(function(){
			$('#txtEditWinplace').addClass("winPlaceLeft");
		},50);
	}
	if (i==3) {
		$('#txtEditWinplace').css("margin-left","auto");
		$('#txtEditWinplace').css("margin-right",wplace + "px");
		$('#TeachDocTextEditWindows').addClass("winPlaceClear");
		setTimeout(function(){
			$('#txtEditWinplace').addClass("winPlaceRight");
		},50);
	}

}

function isTeachDocTextEdit(QObj){

	var b = true;
	var tagnam = QObj.prop("tagName");
	tagnam = tagnam.toLowerCase();
	
	if (QObj.hasClass("teachdoctext")&&tagnam=='table') {
		b = true;
	} else {
		b = false;
	}

	var btnObjDivhref = QObj.find('div');
	typesource = btnObjDivhref.parent().find('span.typesource').html();
	if(typesource===undefined){typesource = '';}
	if (typesource!='') {
		b = false;
	}

	return b;

}

function saveTeachDocTextEdit(){

	if(onlyOneUpdate==false){
		return false;
	}

	var TareaTeachDocText = $('#areaTeachDocText'+indexTxtEdition).val();

	var renderH = "<tbody>";

	if(TareaTeachDocText==''){
		TareaTeachDocText = '?';
	}

	renderH += "<tr>";
	renderH += "<td class='teachdoctextContent' >" + TareaTeachDocText + "</td>";
	renderH += "</tr>";

	renderH += "</tbody>";

	if(GlobalTagGrappeObj=='div'){
		var rdrFull = '<table onMouseDown="parent.displayEditButon(this);" ';
		rdrFull += ' class="teachdoctext" style="width:97%;">';
		rdrFull += renderH + '</table>';
		renderH = rdrFull;
	}
	
	setAbstractObjContent(renderH);

	closeAllEditWindows();

	$('.ludimenu').css("z-index","1000");
	saveSourceFrame(false,false,0);

}

var VirtualObjectOel;

function displayBtnEdit(myObj){

	var btnObj = $(myObj);
	tmpObjDom = btnObj;
	
	identchange = getUnikId();
	tmpObjDom.attr("data-ref",identchange);

	if($("#BtnEditWindows").length==0){
		
		var bdDiv = '<div id="BtnEditWindows" class="gjs-mdl-container" >';

		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" ';
		bdDiv += ' style="max-width:800px!important;" >';
		
		bdDiv += getTitleBar('Edition button');

		bdDiv += '<div class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;padding-top:10px;font-size:16px;" >';
		
		//Text and style
		bdDiv += '<div style="padding:5px;padding-top:1px;margin:0px;margin-bottom:1px;height:26px;" >';
		
		bdDiv += '<div class="trd" style="padding:5px;width:70px;float:left;text-align:right;" >';
		bdDiv += 'Text&nbsp;:&nbsp;</div>';
		bdDiv += '<input id="inputButtonLink" type="text" value="" ';
		bdDiv += ' style="width:150px;font-size:12px;padding:5px;float:left;" />';
		
		bdDiv += '<div class="trd" style="padding:5px;width:46px;float:left;" >';
		bdDiv += '&nbsp;Style&nbsp;:&nbsp;</div>';

		bdDiv += '<input type="radio" class="checkStyleBtn" ';
		bdDiv += 'id="styleBtn1" name="styleBtn"></input>';
		bdDiv += '<img class="imgStyleBtn" src="img/btnblue.png" />&nbsp;';

		bdDiv += '<input type="radio" class="checkStyleBtn" ';
		bdDiv += 'id="styleBtn2" name="styleBtn"></input>';
		bdDiv += '<img class="imgStyleBtn" src="img/btngreen.png" />&nbsp;';

		bdDiv += '<input type="radio" class="checkStyleBtn" ';
		bdDiv += 'id="styleBtn3" name="styleBtn"></input>';
		bdDiv += '<img class="imgStyleBtn" src="img/btnroundblue.png" />&nbsp;';

		bdDiv += '<input type="radio" class="checkStyleBtn" ';
		bdDiv += 'id="styleBtn4" name="styleBtn"></input>';
		bdDiv += '<img class="imgStyleBtn" src="img/btnroundblueprev.png" />&nbsp;';

		bdDiv += '<input type="radio" class="checkStyleBtn" ';
		bdDiv += 'id="styleBtn5" name="styleBtn"></input>';
		bdDiv += '<img class="imgStyleBtn" src="img/btnroundbluecheck.png" />&nbsp;';

		bdDiv += '</div>';

		bdDiv += '<div style="padding:5px;padding-top:1px;margin:0px;margin-bottom:5px;height:26px;" >';
		bdDiv += '<div class="trd" style="padding:5px;width:70px;float:left;text-align:right;" >';
		bdDiv += 'infobulle&nbsp;:&nbsp;</div>';
		bdDiv += '<input id="infosButtonLink" type="text" value="" ';
		bdDiv += ' style="width:150px;font-size:12px;padding:5px;float:left;" />';
		bdDiv += '</div>';

		var ctd = '<td style="width:20%;user-select:none;text-align:center;border:dotted 1px #353739;padding:5px;margin:0px;" >';

		var h = '<div style="position:relative;padding:5px;margin:5px;border:dotted 1px #353739;" >';

		h += '<table style="width:100%;border-spacing:0px;" >';
		h += '<tr style="padding:0px;margin:0px;" >';

		h += ctd;
		h += '<input onChange="ctrEditionNoCode()" type="radio" class=checkBehaviorWind id="behaviorBtn0" name="behaviorBtn" ></input>';
		h += '<label style="cursor:pointer;" class="trd" for="behaviorBtn0">&nbsp;Next&nbsp;page</label>&nbsp;</td>';

		h += ctd;
		h += '<input onChange="ctrEditionNoCode()" type="radio" class=checkBehaviorWind id="behaviorBtn1" name="behaviorBtn" ></input>';
		h += '<label style="cursor:pointer;" class="trd" for="behaviorBtn1">&nbsp;Prev&nbsp;page</label>&nbsp;</td>';
		
		h += ctd;
		h += '<input onChange="ctrEditionNoCode()" type="radio" class=checkBehaviorWind id="behaviorBtn2" name="behaviorBtn" ></input>';
		h += '<label style="cursor:pointer;" class="trd" for="behaviorBtn2">&nbsp;Link</label>&nbsp;</td>';

		h += ctd;
		h += '<input onChange="ctrEditionNoCode()" type="radio" class=checkBehaviorWind id="behaviorBtn4" name="behaviorBtn" ></input>';
		h += '<label style="cursor:pointer;" class="trd" for="behaviorBtn4">&nbsp;Download</label>&nbsp;</td>';

		h += ctd;
		h += '<input onChange="ctrEditionNoCode()" type="radio" class=checkBehaviorWind id="behaviorBtn3" name="behaviorBtn" ></input>';
		h += '<label style="cursor:pointer;" class="trd" for="behaviorBtn3">&nbsp;no-code&nbsp;editor</label>&nbsp;</td>';
		
		h += '</tr></table>';

		h += '</div>';
		
		bdDiv += h;

		bdDiv += '<div id="editEditorFrameBtn" style="padding:0px;margin-left:50px;display:none;" >';
		bdDiv += '<p>iframe</p>';
		bdDiv += '</div>';

		bdDiv += '<div id="editEditorFrameLink" style="padding:0px;margin-left:-10px;display:none;" >';
		bdDiv += '<p>links</p>';
		bdDiv += '</div>';

		bdDiv += '<div id="editEditorDownloadLink" style="padding:0px;margin-left:-10px;display:none;" >';
		bdDiv += '<p>download</p>';
		bdDiv += '</div>';

		bdDiv += '<div style="padding:25px;padding-top:10px;padding-bottom:5px;text-align:right;" >';
		bdDiv += '<input id="saveBtnBoutonStyle" onClick="saveBtnEditWindows()" ';
		bdDiv += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonSave trd" type="button" value="Save" /><br/>';
		bdDiv += '</div>';
		
		bdDiv += '</div>';
		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display:none"></div>';
		bdDiv += '</div>';

		$('body').append(bdDiv);

	}

	if($("#BtnEditWindows").length==1){
		
		var hObj = tmpObjDom.html();

		$('#editEditorFrameLink').html(oeLinksShow(datatext4));
		$('#editEditorDownloadLink').html(oeLinksDownload(datatext4));

		//Style button
		$('#styleBtn1').attr('checked',false);
		$('#styleBtn2').attr('checked',false);
		$('#styleBtn3').attr('checked',false);
		$('#styleBtn4').attr('checked',false);

		var haveBtnSty = false;
		if(hObj.indexOf("btnteachblue")!=-1) {
			$('#styleBtn1').attr('checked',true);
			haveBtnSty = true;
		}
		if(hObj.indexOf("btnteachgreen")!=-1) {
			$('#styleBtn2').attr('checked',true);
			haveBtnSty = true;
		}
		if(hObj.indexOf("btnroundblue")!=-1) {
			$('#styleBtn3').attr('checked',true);
			haveBtnSty = true;
		}
		if(hObj.indexOf("btnroundblueprev")!=-1) {
			$('#styleBtn4').attr('checked',true);
			haveBtnSty = true;
		}
		if(hObj.indexOf("btnroundbluecheck")!=-1) {
			$('#styleBtn5').attr('checked',true);
			haveBtnSty = true;
		}
		if (haveBtnSty==false) {
			$('#styleBtn1').attr('checked',true);
		}
		//Style button

		var getTextContent = btnObj.find('a').html();
		
		var datatext3 = btnObj.find('a').attr("datatext3");
		var datatext4 = btnObj.find('a').attr("datatext4");
		var datatext5 = btnObj.find('a').attr("datatext5");

		var datatitle = btnObj.find('a').attr("title");
		if (datatitle===undefined) {datatitle = getTextContent;}

		$('#infosButtonLink').val(datatitle);

		$('#behaviorBtn0').attr('checked',false);
		$('#behaviorBtn1').attr('checked',false);
		$('#behaviorBtn2').attr('checked',false);
		$('#behaviorBtn3').attr('checked',false);
		$('#behaviorBtn4').attr('checked',false);

		if (datatext3===undefined) {datatext3 = '';}
		if (datatext4===undefined) {datatext4 = '';}
		if (datatext5===undefined) {datatext5 = '';}

		if (datatext3==''||datatext4==''||datatext5=='') {
			var btnObjAhref = btnObj.find('a');
			datatext3 = btnObjAhref.parent().find('span.datatext3').html();
			datatext4 = btnObjAhref.parent().find('span.datatext4').html();
			datatext5 = btnObjAhref.parent().find('span.datatext5').html();
		}

		if (datatext3===undefined) {datatext3 = '';}
		if (datatext4===undefined) {datatext4 = '';}
		if (datatext5===undefined) {datatext5 = '';}
		
		if (datatext3==''||datatext4==''||datatext5=='') {
			datatext3 = 'act3|';
			datatext4 = 'LUDI.nextPage();';
			datatext5 = '|';
		}

		if (datatext3=="act3|"||datatext3=='') {
			$('#behaviorBtn0').attr('checked',true);
		} else {
			if (datatext3=="act5|") {
				$('#behaviorBtn1').attr('checked',true);
			} else {
				if (datatext3=="link|") {
					$('#behaviorBtn2').attr('checked',true);
					if (datatext4.indexOf("url@")!=-1) {
						var linkW = datatext4.replace('url@','');
						linkW = linkW.replace('dow@','');
						$('#inputWebLink').val(linkW);
					}
				} else {
					if (datatext3=="download|") {
						var linkW = datatext4.replace('dow@','');
						linkW = linkW.replace('url@','');
						$('#inputDonwloadLink').val(linkW);
						$('#behaviorBtn4').attr('checked',true);
					} else {
						$('#behaviorBtn3').attr('checked',true);
					}
				}
			}
		}

		VirtualObjectOel = objetVirtualBtnFromContext(identchange,getTextContent,datatext3,datatext4,datatext5)

		var renderNoCodeEditor = oeEditorShow(VirtualObjectOel);

		$('#editEditorFrameBtn').html(renderNoCodeEditor);

		$('#inputButtonLink').val(getTextContent);
		$('.ludimenu').css("z-index",'2');
		$('#BtnEditWindows').css("display",'');
		windowEditorIsOpen = true;
		loadaFunction();
		ctrEditionNoCode()
		
		$('#saveBtnBoutonStyle').css("display","inline-block");

		traductAll();

	}

}

function oeEditorShow(VObjectOel){
    
    var wbpath = 'plug/editor-action/forms/index.html?v='+randomoeEditor();

	var p = ''
	p += '<iframe data="' + objetSendToString(VObjectOel) + '" scrolling=no ';
	p += ' id="editEditorFrame" name="editEditorFrame" ';
	p += ' src="' + wbpath + '" width="650px" height="440px" ';
	p += ' frameBorder="0" >';
	p += '</iframe>';
	
  	return p;
	
}

function oeLinksShow(datatext4){
    
	var p = ''

	p += '<div style="padding:5px;width:120px;float:left;text-align:right;" >';
	p += 'Link&nbsp;:&nbsp;</div>';
	p += '<input id="inputWebLink" type="text" value="" ';
	p += ' style="width:400px;font-size:12px;padding:5px;float:left;" />';

  	return p;
	
}

function oeLinksDownload(datatext4){
    
	var p = ''
	p += '<div style="padding:5px;width:120px;float:left;text-align:right;" >';
	p += 'File&nbsp;:&nbsp;</div>';
	p += '<input id="inputDonwloadLink" readonly="readonly" type="text" value="" ';
	p += ' style="background:#D5D8DC;width:450px;font-size:12px;padding:5px;float:left;" />';
	p += '&nbsp;<input onClick="filterGlobalFiles=\'\';showFileManagerStudio2(23,\'inputDonwloadLink\',0);" ';
	p += ' class="gjs-one-bg ludiButtonSave plugInputMin trd" type="button" value="..." />';
	
  	return p;
	
}

function randomoeEditor() {
	return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
}

function ctrEditionNoCode(){

	if($('#behaviorBtn3').is(':checked')){
		
		$('#editEditorFrameBtn').css("display",'');
		$('#editEditorFrameBtn').css("height",'20px');

		$( "#editEditorFrameBtn" ).animate({
			height: "440px"
		},500,function(){});

		$('#editEditorFrameLink').css("display",'none');
		$('#editEditorDownloadLink').css("display",'none');

	}else{

		if($('#behaviorBtn4').is(':checked')){

			$('#editEditorFrameLink').css("display",'none');
			$('#editEditorDownloadLink').css("display",'');
			$('#editEditorDownloadLink').css("height",'20px');

			$( "#editEditorDownloadLink" ).animate({
				height: "100px"
			},500,function(){});

			$( "#editEditorFrameBtn" ).animate({
				height: "20px"
			},400,function(){
				$('#editEditorFrameBtn').css("display",'none');
			});

		}else{

			if($('#behaviorBtn2').is(':checked')){

				$('#editEditorDownloadLink').css("display",'none');
				$('#editEditorFrameLink').css("display",'');
				$('#editEditorFrameLink').css("height",'20px');

				$( "#editEditorFrameLink" ).animate({
					height: "100px"
				},500,function(){});

				$( "#editEditorFrameBtn" ).animate({
					height: "20px"
				},400,function(){
					$('#editEditorFrameBtn').css("display",'none');
				});

			}else{
				$('#editEditorDownloadLink').css("display",'none');
				$('#editEditorFrameLink').css("display",'none');

				$( "#editEditorFrameBtn" ).animate({
					height: "20px"
				},400,function(){
					$('#editEditorFrameBtn').css("display",'none');
				});

			}
		}
	}

}

function saveBtnEditWindows(){

	if(onlyOneUpdate==false){
		return false;
	}
	
	$('#saveBtnBoutonStyle').css("display","none");

	var TButtonText = $('#inputButtonLink').val();

	var Tobj = validEditorObject()
	
	var clueSrc = TButtonText;

	if(TButtonText==''){
		TButtonText = '?';
	}

	if($('#behaviorBtn0').is(':checked')){
		Tobj.text3 = "act3|";
		Tobj.text4 = "LUDI.nextPage();";
		Tobj.text5 = "|";
	}
	if($('#behaviorBtn1').is(':checked')){
		Tobj.text3 = "act5|";
		Tobj.text4 = "LUDI.prevPage();";
		Tobj.text5 = "|";
	}
	if($('#behaviorBtn2').is(':checked')){
		Tobj.text3 = "link|";
		Tobj.text4 = 'url@'+$('#inputWebLink').val();
		Tobj.text5 = "|";
		clueSrc = $('#inputWebLink').val();
	}
	if($('#behaviorBtn4').is(':checked')){
		Tobj.text3 = "download|";
		Tobj.text4 = 'dow@'+$('#inputDonwloadLink').val();
		Tobj.text5 = "|";
		clueSrc = $('#inputDonwloadLink').val();
	}

	var renderH = "<tr>";
	renderH += '<td style="text-align:center;padding:10px;width:100%;" >';
	
	if($('#styleBtn1').is(':checked')){
		renderH += '<a href="" class="btn-btnTeach btnteachblue" ';
	}
	if($('#styleBtn2').is(':checked')){
		renderH += '<a href="" class="btn-btnTeach btnteachgreen" ';
	}
	if($('#styleBtn3').is(':checked')){
		renderH += '<a href="" class="btn-btnTeach btnroundblue" ';
	}
	if($('#styleBtn4').is(':checked')){
		renderH += '<a href="" class="btn-btnTeach btnroundblueprev" ';
	}
	if($('#styleBtn5').is(':checked')){
		renderH += '<a href="" class="btn-btnTeach btnroundbluecheck" ';
	}
	renderH += ' datatext3="' + Tobj.text3 + '" ';
	renderH += ' datatext4="' + Tobj.text4 + '" ';
	renderH += ' datatext5="' + Tobj.text5 + '" ';

	renderH += ' title="' + cleTextTitle($('#infosButtonLink').val()) + '" ';

	renderH += 'name="submit" type="button" >';
	renderH += TButtonText + '</a>';

	renderH += '<span class=datatext3 style="display:none;" >' + Tobj.text3 + '</span>';
	renderH += '<span class=datatext4 style="display:none;" >' + Tobj.text4 + '</span>';
	renderH += '<span class=datatext5 style="display:none;" >' + Tobj.text5 + '</span>';
	
	renderH += "</td></tr>";

	if(GlobalTagGrappeObj=='div'){
		var rdrFull = '<table onMouseDown="parent.displayEditButon(this);" ';
		rdrFull += ' class="teachdocbtnteach" style="width:100%;">';
		rdrFull += renderH + '</table>';
		renderH = rdrFull;
	}
	
	setAbstractObjContent(renderH);
	
	//setAbstractObjAttribute('datatext3',Tobj.text3);

	$('.ui-widget-overlay').css("display","block");
	$('.workingProcessSave').css("display","block");

	if (controlStringInSource(clueSrc)) {
		
		setTimeout(function(){
			saveSourceFrame(false,false,0);
			$('.ui-widget-overlay').css("display","none");
			$('.workingProcessSave').css("display","none");
			$('.ludimenu').css("z-index","1000");
			closeAllEditWindows();
		},200);

	} else {

		setTimeout(function(){
			saveSourceFrame(false,false,0);
			setTimeout(function(){
				if (controlStringInSource(clueSrc)) {
					saveSourceFrame(false,false,0);
				}
				$('.ui-widget-overlay').css("display","none");
				$('.workingProcessSave').css("display","none");
				$('.ludimenu').css("z-index","1000");
				closeAllEditWindows();
			},3000);
		},500);
		
	}

}

function getTitleBar(title){

	var bdDiv = '<div class="gjs-mdl-header" ';
	bdDiv += ' style="background-color:#E6E6E6;" >';
	bdDiv += '<div class="gjs-mdl-title trd">' + title + '</div>';
	bdDiv += '<div class="gjs-mdl-btn-close gjs-mdl-btn-close-audio" ';
	bdDiv += ' onClick="closeAllEditWindows()" ';
	bdDiv += ' data-close-modal="">⨯</div>';
	bdDiv += '</div>';

	return bdDiv;

}

function objetVirtualBtnFromContext(idBtn,textBtn,datatext3,datatext4,datatext5){

	var Tobj = new Object();
	Tobj.id = idBtn;
	Tobj.idFab = idBtn;
	Tobj.unikid = GlobalIDGrappesObj;
	Tobj.idString = GlobalIDGrappesObj;
	Tobj.type = 'teachdocbtnteach';
	Tobj.subtype = 'teachdocbtnteach';
	Tobj.text = textBtn;
	Tobj.text2 = '';
	Tobj.text3 = datatext3;
	Tobj.text4 = datatext4;
	Tobj.text5 = datatext5;
	Tobj.text6 = '';
	Tobj.val = '';
	Tobj.val2 = '';
	Tobj.val3 = '';
	Tobj.val4 = '';
	Tobj.val5 = '';
	Tobj.val6 = '';
	return Tobj;

}

function objetSendToString(Tobj){
    
    var str = "";
	str += Tobj.id + '@';
	str += Tobj.idFab + '@';
	str += Tobj.unikid + '@';
    str += Tobj.idString + '@';
    str += Tobj.type + '@';
	str += Tobj.subtype + '@';
    str += Tobj.text + '@';
    str += Tobj.text2 + '@';
    str += Tobj.text3 + '@';
    str += Tobj.text4 + '@';
    str += Tobj.text5 + '@';
    str += Tobj.text6 + '@';
    str += Tobj.val + '@';
    str += Tobj.val2 + '@';
    str += Tobj.val3 + '@';
    str += Tobj.val4 + '@';
    str += Tobj.val5 + '@';
    str += Tobj.val6 + '@';
	return str;
}

function validEditorObject(){

	var Tobj = new Object();

	transfertTextPlugins = $('#editEditorFrame').contents().find('#finalcode').val();
	
	if(transfertTextPlugins==''){
	
		alert('Failure of registration');
	
	}else{

		var getObjD = transfertTextPlugins.split("@");

		Tobj.id = getObjD[0];
		Tobj.idFab = getObjD[1];
		Tobj.unikid = getObjD[2];
		Tobj.idString = getObjD[3];
		Tobj.type = getObjD[4];
		Tobj.subtype = getObjD[5];
		Tobj.text = getObjD[6];
		Tobj.text2 = getObjD[7];
		Tobj.text3 = getObjD[8];
		Tobj.text4 = getObjD[9];
		Tobj.text5 = getObjD[10];
		Tobj.text6 = getObjD[11];
		Tobj.val = getObjD[12];
		Tobj.val2 = getObjD[13];
		Tobj.val3 = getObjD[14];
		Tobj.val4 = getObjD[15];
		Tobj.val5 = getObjD[16];
		Tobj.val6 = getObjD[17];

	}

	return Tobj;
	
}
var editor = grapesjs.init({
	height: '100%',
	showOffsets: 1,
	noticeOnUnload: 0,
	storageManager: { autoload: 0 },
	container: '#gjs',
	fromElement: true,
	plugins: ['gjs-preset-webpage'],
	pluginsOpts: {
		'gjs-preset-webpage': {}
	},
	canvas: {
		styles: [
			'templates/styles/classic.css',
			'templates/colors/' + colorsPath,
			'templates/quizztheme/' + quizzthemePath,
			'templates/styles/plug.css',
		]
	}
});

/*,
keymaps: {
	defaults: {
		'your-namespace:keymap-name' {
		keys: '⌘+s, ctrl+s',
		handler: 'some-command-id'
		}
	}
}
*/

// components: GpsCompsPage,
editor.on('component:selected', function (droppedComponent) {

	var idTrait = droppedComponent.get('traits')['id'];

	if(typeof idTrait == 'undefined'){
		idTrait = getUnikIdGrappesObj();
		droppedComponent.get('traits')['id'] = idTrait;
	}
	
	var idUnik = droppedComponent.get('tagName') + idTrait;

	if (GlobalIDGrappesObj!=idUnik) {
		hookSelectAnObject();
	}

	GlobalIDGrappesObj = idUnik;
	GlobalTagGrappeObj = droppedComponent.get('tagName') ;

	//console.log('idUnik',idUnik);
	
	//Display classic menu on left
	displayToolsCarre();
	switchToolsEdit();
	
});

editor.on('component:drag:end', function (component) {
	activeEventSave();
	const el = component.getEl();
	const hasChildren = component.components().length;
});

editor.on('block:drag:stop', function (droppedComponent) {
	
	activeEventSave();
	if(droppedComponent){
		if(droppedComponent.attributes){
			if(droppedComponent.attributes.tagName){
				
				if(droppedComponent.attributes.tagName=="img"){
					droppedComponent.addAttributes({
						class: 'bandeImg'
					});
				}
				if(droppedComponent.attributes.content){
					if(droppedComponent.attributes.content.indexOf("pluginfx-obj")!=-1){
						moveAFxObj = true;
					}
				}
			}
		}
	}

});

editor.DomComponents.addType('image', {
	model: {
		defaults: {
			resizable: {
				tl: 0, // Top left
				tc: 0, // Top center
				tr: 0, // Top right
				cl: 0, // Center left
				bl: 0, // Bottom left
				br: 0, // Bottom right
				cr: 0, // Center right
				bc: 0 // Bottom Center
			}
		}
	}
})

editor.on('component:toggled',function (droppedComponent){
	activeEventSave();
});

editor.on('run:open-assets',function (droppedComponent){
	$('.ludimenu').css("z-index","2");
	restyleLstImage();
});

editor.on('change:selectedComponent', model => {
	console.log('New content selected', model.get('content'));
});

var dragOpts = ' data-gjs-draggable="false" data-gjs-droppable="false" data-gjs-editable="false" ';
var cssI = " style='position:absolute;cursor:pointer;background-image:url(\"img/editdoc.png\");background-position:center center;background-repeat:no-repeat;right:2px;top:3px;width:50px;height:50px;z-index: 1000;' ";

//var baseButton = '<div class="row" ' + dragOpts + ' style="position:relative;" id="i25td">';
//baseButton += '<div class="cell" ' + dragOpts + ' style="text-align:center;position:relative;" >';

//baseButton += '<div class="editRapidIcon" ' + cssI + ' onClick="parent.displayVideoEdit(this);" ></div>';

var baseButton = '<video onMouseDown="parent.displayEditButon(this);" ';
baseButton += ' oncontextmenu="return false;" class="videoByLudi" ';
baseButton += ' datahref="video/oel-teachdoc.mp4" ';
baseButton += ' controls  controlsList="nofullscreen nodownload" >';
baseButton += '<source name="sourcevid" class="sourcevid" ';
baseButton += ' src="video/oel-teachdoc.mp4" ';
baseButton += ' type="video/mp4" ></video>';

//baseButton += '</div>';
//baseButton += '</div>';

editor.BlockManager.add('VideoTeach',{
	label: '',
	attributes: {class: 'fa fa-text icon-action'},
	category: 'Basic',
	content: {
		content: baseButton,
		script: "",
		style: {
		width: '100%',
		minHeight: '100px',
		droppable: false,
		removable: true,
		draggable: false,
		copyable: false
	}
	}
});

//var baseButtonAudio = '<div class="row" ' + dragOpts + ' style="position:relative;" id="i26td">';
//baseButtonAudio += '<div class="cell" ' + dragOpts + ' style="text-align:center;position:relative;" >';

//baseButtonAudio += '<div class="editRapidIcon" ' + cssI + ' onClick="parent.displayAudioEdit(this);" ></div>';

var baseButtonAudio = '<audio onMouseUp="parent.displayEditButon(this);" oncontextmenu="return false;" class="audioByLudi" ';
baseButtonAudio += ' datahref="audio/teachdoc-sample.mp3" ';
baseButtonAudio += ' src="audio/teachdoc-sample.mp3" ';
baseButtonAudio += ' controls controlsList="nodownload" ></audio>';

//baseButtonAudio += '</div>';
//baseButtonAudio += '</div>';
  
editor.BlockManager.add('AudioTeach',{
	label: 'Audio',
	attributes: {class: 'fa fa-text icon-audio'},
	category: 'Basic',
	content: {
		content: baseButtonAudio,
		script: "",
		style: {
		width: '100%',
		minHeight: '100px'
		}
	}
});

//editor.setStyle(GpsStylePage);
//editor.setComponent(GpsCompsPage);

//if(GpsCompH!=''){
	//editor.load(GpsCompH);
//}

/*
	removable: true, // Can't remove it
	draggable: true, // Can't move it
	copyable: true, // Disable copy/past
*/

function correctPositionsEditor(){
	
	var wrapperChildren = editor.getWrapper();
	var modelComponent = editor.getComponents();
	var wrapperChildren = editor.getWrapper();
	const allBody = wrapperChildren.findType('body');
	
}


editor.BlockManager.add('sectioncollapse',{
	label: 'Separator',
	attributes: {
		class: 'fa fa-text icon-plugTeach',
        style: "background-image: url('icon/separator.png');background-repeat:no-repeat;background-position:center center;"
	},
    category: 'Basic',
    content: {
		content: '<div class=separatorteach ></div>',
        script: "",
		style: {
			width: '100%'
		}
	}
});



editor.BlockManager.add('h1block',{
	label: 'Title 1',
	content: '<h1>Put your title here</h1>',
	category: 'Basic',
	attributes: {
		title: 'h1 block',
		class: 'fa fa-text icon-h1'
	}
});

editor.BlockManager.add('h2block',{
	label: 'Title 2',
	content: '<h2>Put your title here</h2>',
	category: 'Basic',
	attributes: {
		title: 'h2 block',
		class: 'fa fa-text icon-h2'
	}
});

var bTxt = '<table class="teachdoctext" ';
bTxt += 'onMouseDown="parent.displayEditButon(this);" style="width:100%;" >';
bTxt += '<tr><td class="teachdoctextContent" colspan=1 style="padding-top:15px;padding-bottom:15px;" >';
bTxt += 'Nec sane haec sola pernicies orientem diversis cladibus adfligebat.';
bTxt += 'Namque et Isauri, quibus est usitatum saepe pacari saepeque inopinis ';
bTxt += 'excursibus cuncta miscere, ex latrociniis occultis et raris, alente inpunitate adulescentem ';
bTxt += 'in peius audaciam ad bella gravia proruperunt, diu quidem perduelles spiritus inrequietis motibus ';
bTxt += 'erigentes, hac tamen indignitate perciti vehementer, ut iactitabant, quod eorum capiti quidam ';
bTxt += 'consortes apud Iconium Pisidiae oppidum in amphitheatrali spectaculo feris praedatricibus obiecti ';
bTxt += 'sunt praeter morem.'
bTxt += '</td></tr>';
bTxt +='</table>';


editor.BlockManager.add('TxtTeach',{
	label: 'Text Bloc',
	attributes: {class: 'fa fa-text icon-txtteach'},
	category: 'Basic',
	content: {
		content: bTxt,
		script: "",
		style: {
		width: '100%',
		minHeight: '100px'
		}
	}
});
var btnSrc = '<table class="teachdocbtnteach" ';
btnSrc += 'onMouseDown="parent.displayEditButon(this);" style="width:100%;text-align:center;" >';
btnSrc += '<tr><td style="text-align:center;padding:10px;width:100%;" >';

btnSrc += '<a href="" class="btn-btnTeach btnteachblue" ';
btnSrc += 'name="submit" type="button"  >';
btnSrc += 'Check the answers</a>';

btnSrc += '</td></tr></table>';

editor.BlockManager.add('btnTeach',{
	label: 'Button',
	attributes: {class: 'fa fa-text icon-btnTeach'},
	category: 'Basic',
	content: {
		content: btnSrc,
		script: "",
		style: {
			width: '100%',
			minHeight: '70px'
		}
	}
});

var GlobalIDGrappesObj = '';
var GlobalTagGrappeObj = '';

function grappesObj(){
	
	this.id;
	this.create;
	this.show = function() {
		if (this.create==0) {
			this.create = 1;
		} else {
			paintObjToGraph(this);
		}
	}
	
}

function setAbstractObjContent(renderH){
    
    var wrapperChildrenTbl = editor.getWrapper();
    const allBody = wrapperChildrenTbl.findType('table');
    
    var  findObject = false;
    
	editor.DomComponents.getWrapper().onAll(comp =>{

        var idTrait = comp.get('traits')['id'];

        if(typeof idTrait != 'undefined'&&idTrait!='undefined'){
           
            var makeAnId = comp.get('tagName') + idTrait;

            if(GlobalIDGrappesObj==makeAnId){
                
                /*
                var view = comp.getView();
                var el = comp.getEl();
                el.innerHTML = renderH;
                */
				findObject = true;
				var compContent = comp.get("content");
                
				if(compContent!=renderH){
					comp.set({selectable: true, hoverable: true, resizable:false, draggable:true});
					comp.components('');
					comp.set("content",renderH);
					changeDataBase[identchange] = renderH;
					comp.updated();
				}
                // var test = comp.toHTML();
                
            }

        }

	});

    if(findObject==false){
        alert('Echec de mise à jour');
    }

	var Elem = new grappesObj()
	Elem.x = 10;
	Elem.y = 10;
	Elem.w = 170;
	Elem.h = 100;
	Elem.uid = getUnikIdGrappesObj();
	Elem.idparent = 0;
	Elem.create = 0;
    
}

function setAbstractObjAttribute(name,value){

	if(value==''){
		return false;
	}
	if(name!='datatext3'){
		return false;
	}

    var wrapperChildrenTbl = editor.getWrapper();
    const allBody = wrapperChildrenTbl.findType('table');
    
    var  findObject = false;
    
	editor.DomComponents.getWrapper().onAll(comp =>{

        var idTrait = comp.get('traits')['id'];

        if(typeof idTrait != 'undefined'&&idTrait!='undefined'){
           
            var makeAnId = comp.get('tagName') + idTrait;
			
            if(GlobalIDGrappesObj==makeAnId){
               
            	findObject = true;
				
				if(name=='datatext3'){

					var datatext3 = comp.get('traits')['datatext3'];
					if(datatext3 === undefined) {
						comp.addTrait(name);
						datatext3 = comp.get('traits')['datatext3'];
					}
					if(datatext3 !== undefined) {
						datatext3.set(value);
					}
				}
            }

        }

	});

    if(findObject==false){
        alert('Echec de mise à jour');
	}
	
}

function setAbstractObjClass(nameClass){
    
    var wrapperChildrenTbl = editor.getWrapper();
    const allBody = wrapperChildrenTbl.findType('table');
    
    var  findObject = false;
    
	editor.DomComponents.getWrapper().onAll(comp =>{

        var idTrait = comp.get('traits')['id'];
		
        if(typeof idTrait != 'undefined'&&idTrait!='undefined'){
           
            var makeAnId = comp.get('tagName') + idTrait;

            if(GlobalIDGrappesObj==makeAnId){
				
				findObject = true;
				var compContent = comp.get("content");
				comp.removeClass('bandeImg');
				comp.removeClass('initialImg');
				comp.removeClass('bandeImgFull');
				comp.removeClass('bandeImgOverview');
				comp.addClass(nameClass);
                
            }

        }

	});

    if(findObject==false){
        alert('Echec de mise à jour');
    }

}

function setAbstractObjOneClass(nameClass,removeClass,removeClass2){
    
    var wrapperChildrenTbl = editor.getWrapper();
    const allBody = wrapperChildrenTbl.findType('table');
    
    var  findObject = false;
    
	editor.DomComponents.getWrapper().onAll(comp =>{

        var idTrait = comp.get('traits')['id'];
		
        if(typeof idTrait != 'undefined'&&idTrait!='undefined'){
           
            var makeAnId = comp.get('tagName') + idTrait;

            if(GlobalIDGrappesObj==makeAnId){
				
				findObject = true;
				var compContent = comp.get("content");
				if (removeClass!='') {
					comp.removeClass(removeClass);
				}
				if (removeClass2!='') {
					comp.removeClass(removeClass2);
				}
				if (nameClass!='') {
					comp.addClass(nameClass);
				}
				
            }

        }

	});

    if(findObject==false){
        alert('Echec de mise à jour');
    }

}

function abstractHaveClass(nameClass){
    
    var wrapperChildrenTbl = editor.getWrapper();
    const allBody = wrapperChildrenTbl.findType('table');

    var findObject = false;
    var haveClass = false;

	editor.DomComponents.getWrapper().onAll(comp =>{

        var idTrait = comp.get('traits')['id'];
		
        if(typeof idTrait != 'undefined'&&idTrait!='undefined'){
           
            var makeAnId = comp.get('tagName') + idTrait;

            if(GlobalIDGrappesObj==makeAnId){
				
				findObject = true;
				var compContent = comp.get("content");
				
				if (nameClass!='') {
					var arrClas = comp.getClasses();
					if (arrClas.includes(nameClass)) {
						haveClass = true;
					}
				}
				
            }

        }

	});

    if(findObject==false){
        return false;
    } else {
		return haveClass;
	}

}

function detectLudiEditIco() {

    var comp = getAbstractObjContent();
    
	if (comp==-1) {
	
		setTimeout(function(){ detectLudiEditIco(); },450);
	
	} else {

		var type = comp.get('type');
		var tagName = comp.get('tagName');
		
		if (tagName=='img'||tagName=='IMG') {
			type = 'image';
		}
		
		if(type!='wrapper'&&(type=='div'||tagName=='div')){

			var compContent = comp.get("content");

			var view = comp.getView();
			var el = comp.getEl();
			var compContentH = el.innerHTML;

			if (compContentH.slice(0, 6)=='<audio') {
				type = 'audio';
			}
			if (compContentH.slice(0, 6)=='<video') {
				type = 'video';
			}
			if (compContentH.indexOf('rapidselectorgrapvideo')!=-1) {
				type = 'video';
			}
			
			if (compContentH.slice(0, 4)=='<img'){
				type = 'image';
			}

			if (compContent.slice(0, 6)=='<table'
			&&compContent.indexOf('teachdoctext')!=-1){
				type = 'table';
			}

			if(compContent.slice(0, 6)=='<table'
			&&compContent.indexOf('qcmbarre')!=-1){
				type = 'table';
			}

			if(compContent.slice(0, 6)=='<table'
			&&compContent.indexOf('teachdocbtnteach')!=-1){
				type = 'table';
			}
			
			if(compContent.slice(0, 6)=='<table'
			&&compContent.indexOf('teachdocplugteach')!=-1){
				type = 'table';
			}
			
			if(compContent.indexOf('audio')!=-1||type=='audio'){
				type = 'audio';
				var domObj = $(tmpObjDom);
				if(!domObj.is("audio")){
					tmpObjDom = getAbstractObjDom(GlobalIDGrappesObj);
				}

			}
			if(compContent.indexOf('video')!=-1){
				type = 'video';
				var domObj = $(tmpObjDom);
				if(!domObj.is("video")){
					tmpObjDom = getAbstractObjDom(GlobalIDGrappesObj);
				}
			}

			var deepCOntent = false;
			
			if (deepCOntent) {
				
				if(compContentH.indexOf('table')!=-1
				&&compContentH.indexOf('qcmbarre')!=-1){
					type = 'table';
				}
				if(compContentH.indexOf('table')!=-1
				&&compContentH.indexOf('teachdoctext')!=-1){
					type = 'table';
				}
				if(compContentH.indexOf('table')!=-1
				&&compContentH.indexOf('teachdocbtnteach')!=-1){
					type = 'table';
				}
				if (compContentH.indexOf('<audio ')!=-1 ){
					type = 'audio';
				}
				if (compContentH.indexOf('<video ')!=-1 ){
					type = 'video';
				}
				
			}
			
			var classN = comp.get('classes');
			var classMod = classN.models;
			for (var modelA in classMod) {
				if(classMod[modelA].attributes.name=='panel'){
					type = 'panel';
				}
			}

		}

		if(type=='wrapper'||type=='panel'||onRenderUpdate){
			$(".gjs-toolbar").css('display','none');
			$(".gjs-badge").css('display','none');
			$(".gjs-toolbar").css('opacity','0');
			type = 'panel';
		}else{
			$(".gjs-toolbar").css('display','');
			$(".gjs-badge").css('display','block');
			$(".gjs-toolbar").css('opacity','1');	
		}
		
        if(type=='table'||type=='audio'||type=='video'){
			if(tmpNameObj!="animfx"){
				$(".ludiEditIco").css('display','block');
			}else{
				$(".ludiEditIco").css('display','none');
			}
        }else{
            $(".ludiEditIco").css('display','none');
        }

		if(type=='image'){
 			$(".ludiSpeedTools").css('display','block');
			 tmpObjDom = getAbstractObjDom(GlobalIDGrappesObj);
		}else{
            $(".ludiSpeedTools").css('display','none');
        }

        setTimeout(function(){ detectLudiEditIco(); },500);
    }
}
setTimeout(function(){ detectLudiEditIco(); },1000);

function getAbstractObjDom(iDGrappesObj){

    var rcomp = -1;

    editor.DomComponents.getWrapper().onAll(comp =>{

        var idTrait = comp.get('traits')['id'];

        if(typeof idTrait != 'undefined'&&idTrait!='undefined'){
           
            var makeAnId = comp.get('tagName') + idTrait;

            if(iDGrappesObj==makeAnId){
				rcomp = comp.getEl();
				var compContentH = $(rcomp).html();
				if(compContentH.indexOf('<audio ')!=-1){
					rcomp = $(rcomp).find("audio").get(0);
				}
				if(compContentH.indexOf('<video ')!=-1){
					rcomp = $(rcomp).find("video").get(0);
				}
            }

        }

    });
    
    return rcomp;

}

function getAbstractObjContent(){

    var rcomp = -1;

    editor.DomComponents.getWrapper().onAll(comp =>{

        var idTrait = comp.get('traits')['id'];

        if(typeof idTrait != 'undefined'&&idTrait!='undefined'){
           
            var makeAnId = comp.get('tagName') + idTrait;

            if(GlobalIDGrappesObj==makeAnId){
                rcomp = comp;
            }

        }

    });
    
    return rcomp;

	//var iframe = $('.gjs-frame');
	//var iframeBody = iframe.contents().find("body");

	//var htmlB = iframeBody.html();
	
	/*
	var wrapperChildrenTbl = editor.getWrapper();
	const allBody = wrapperChildrenTbl.findType('table');
	
	var indexCntObj = 0;

	editor.DomComponents.getWrapper().onAll(comp =>{
		
		if(comp.attributes.type === 'table'){

			var classN = comp.get('classes');
			var classMod = classN.models;
			var classN1 = '';
			for (var modelA in classMod) {
				classN1 = classN1 + classMod[modelA].attributes.name + ' ';
			}

			if(classN1.indexOf('qcmbarre')!=-1){

				indexCntObj++;
				
				if(indexChangeObj==indexCntObj){
					var view = comp.getView();
					var el = comp.getEl();
					el.innerHTML = renderH;
					//if(el.innerHTML.indexOf(identchange)!=-1){}
					comp.set({selectable: true, hoverable: true, resizable:false, draggable:true});
					comp.components('');
					comp.set("content",renderH);
					changeDataBase[identchange] = renderH;
					comp.updated();
					var test = comp.toHTML();
				}
			}

		}

	});
	
	//editor.setComponents(htmlB);
	//editor.getSelected().toHTML()
	*/

}

function getUnikIdGrappesObj(){

	var idNum = Math.floor(Math.random() * 100);
    
	var iLetter = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for(var i=0;i<15; i++){
	  iLetter += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
  
	return idNum + iLetter;
  
}

//before select
function hookSelectAnObject() {

    console.log('hookSelectAnObject');

    setTimeout(function(){
        installMicroMenu();
    },100);

}

function installMicroMenu() {

    var toolItem = $('div.fa.fa-plus-square.gjs-toolbar-item'); //32 935
    if (toolItem.length>0) {
        $('.objMenuParamFloat').css("display","none");
    }

}

//load a windows or a function
function loadaFunction() {
	$('.objMenuParamFloat').css("display","none");
	$('.maskobjMenu').css("display","none");
	$('.maskpause').css("display","none");
}

//before select
function displayMicroMenu() {

    var toolItem = $('div.fa.fa-plus-square.gjs-toolbar-item'); //32 935
    if (toolItem.length==1) {
        displayObjectMenu(toolItem);
        console.log('click menu');
    }
    
}
function displayObjectMenu(toolItem) {

    if ($("#ObjMenuParams").length==0) {
    
        var bdDiv = '<div id="ObjMenuParams" class="objMenuParamFloat" >';
        bdDiv += '<div id="objMenuTitleFloat" class="objMenuTitleFloat" >Objet</div>';
        
        var styl = 'style="padding:5px;margin:4px;"';

        bdDiv += '<p class="trd" style="padding:5px;margin:5px;margin-top:28px;margin-bottom:0px;" >Display / Hide :</p>';
        
        var bdDiv2 = '<p ' + styl + ' >';
        bdDiv2 += '<input type="checkbox" onclick="onObjMenuCheckBox(this)" class="checkRapidWindows" id="checkObjMA" name="checkObjMA"></input>';
        bdDiv2 += '<span>' + returnTradTerm('Display in all cases')+'</span></p>';
        
        bdDiv2 += '<p ' + styl + ' >';
        bdDiv2 += '<input type="checkbox" onclick="onObjMenuCheckBox(this)" class="checkRapidWindows" id="checkObjMB" name="checkObjMB"></input>';
        bdDiv2 += '<span>' + returnTradTerm('Display in case of a wrong answer on this page')+'</span></p>';

        bdDiv2 += '<p ' + styl + ' >';
        bdDiv2 += '<input type="checkbox" onclick="onObjMenuCheckBox(this)" ';
        bdDiv2 += ' class="checkRapidWindows" id="checkObjMC" name="checkObjMC"></input>';
        bdDiv2 += '<span>' + returnTradTerm('Display if you need help understanding the subject')+'</span></p>';

        bdDiv2 += '<p ' + styl + ' >';
        bdDiv2 += '<input type="checkbox" onclick="onObjMenuCheckBox(this)" ';
        bdDiv2 += ' class="checkRapidWindows" id="checkObjMD" name="checkObjMD"></input>';
        bdDiv2 += '<span>' + returnTradTerm('Hide if you need help understanding the subject')+'</span></p>';

        bdDiv2 += '<p ' + styl + ' >';
        bdDiv2 += '<input type="checkbox" onclick="onObjMenuCheckBox(this)" ';
        bdDiv2 += ' class="checkRapidWindows" id="checkObjME" name="checkObjME"></input>';
        bdDiv2 += '<span>' + returnTradTerm('Display when the document has been completed')+'</span></p>';

        bdDiv2 += '<p ' + styl + ' >';
        bdDiv2 += '<input type="checkbox" onclick="onObjMenuCheckBox(this)" ';
        bdDiv2 += 'class="checkRapidWindows" id="checkObjMF" name="checkObjMF"></input>';
        bdDiv2 += '<span>' + returnTradTerm('Hide when the document has been completed')+'</span></p>';

        bdDiv2 = bdDiv2.replace(/Display/g,"<span style='color:green;font-weight:bold;' >Display</span>");
        bdDiv2 = bdDiv2.replace(/Hide/g,"<span style='color:red;' >Hide</span>");

        bdDiv2 = bdDiv2.replace(/Afficher/g,"<span style='color:green;font-weight:bold;' >Afficher</span>");
        bdDiv2 = bdDiv2.replace(/Masquer/g,"<span style='color:red;' >Masquer</span>");

        bdDiv += bdDiv2;

        bdDiv += '<p style="text-align:right;" >';
        bdDiv += '<input style="width:110px;display:inline-block;cursor:pointer;margin-right:10px;" ';
        bdDiv += ' onClick="saveObjMenuCheckBox();" ';
        bdDiv += ' class="gjs-one-bg ludiButtonSave trd" type="button" value="Save" /><br/>';
        bdDiv += '</p>';

        bdDiv += '</div>';

        $('body').append(bdDiv);

    }

    if ($("#ObjMenuParams").length==1) {
        
        inactivjMenuCheckBox();

        $('.maskobjMenu').css("display","block");
        $('.objMenuParamFloat').css("display","block");

        var position = toolItem.parent().parent().position();
        var positionMain = toolItem.parent().parent().parent().position();
        
        var Mtop = position.top;
        var Maintop = positionMain.top;
        var Mleft = position.left;

        $('#ObjMenuParams').css("width",'20px').css("height",'20px').css("margin-left",'20px');
        $('#ObjMenuParams').css("top",parseInt((Mtop + Maintop) + 40) + 'px');
        $('#ObjMenuParams').css("left",parseInt(Mleft + $('.ludimenuteachdoc').width() ) + 'px');

        $( "#ObjMenuParams" ).animate({ 
            width : '400px', 
            marginLeft : '-405px'
	    },200,function(){

            $( "#ObjMenuParams" ).animate({ 
                height: "310px"
            },200,function(){
            });

        });
        
        traductAll();

        loadjMenuCheckBox();

    }

}

function onObjMenuCheckBox(objT){

	if($(objT).is(':checked')){
        inactivjMenuCheckBox();
		$(objT).prop("checked",true);
	}

}

function inactivjMenuCheckBox(){

    $('#checkObjMA').prop("checked",false);
    $('#checkObjMB').prop("checked",false);
    $('#checkObjMC').prop("checked",false);
    $('#checkObjMD').prop("checked",false);
    $('#checkObjME').prop("checked",false);
    $('#checkObjMF').prop("checked",false);

}

function loadjMenuCheckBox(){

    var haveSpecialClass = false;
    if (abstractHaveClass('dhcondiMA') ) {
        haveSpecialClass = true;
        $('#checkObjMA').prop("checked",true);
    }
    if (abstractHaveClass('dhcondiMB') ) {
        haveSpecialClass = true;
        $('#checkObjMB').prop("checked",true);
    }
    if (abstractHaveClass('dhcondiMC') ) {
        haveSpecialClass = true;
        $('#checkObjMC').prop("checked",true);
    }
    if (abstractHaveClass('dhcondiMD') ) {
        haveSpecialClass = true;
        $('#checkObjMD').prop("checked",true);
    }
    if (abstractHaveClass('dhcondiME') ) {
        haveSpecialClass = true;
        $('#checkObjME').prop("checked",true);
    }
    if (abstractHaveClass('dhcondiMF') ) {
        haveSpecialClass = true;
        $('#checkObjMF').prop("checked",true);
    }
    if (haveSpecialClass==false) {
        $('#checkObjMA').prop("checked",true);
    }
    //setAbstractObjOneClass('','');

}

function saveObjMenuCheckBox(){

    setAbstractObjOneClass('','dhcondiMA','dhcondiMB');
    setAbstractObjOneClass('','dhcondiMC','dhcondiMD');
    setAbstractObjOneClass('','dhcondiME','dhcondiMF');
    
    if ($('#checkObjMA').is(':checked')) {
        setAbstractObjOneClass('dhcondiMA','','');
    }
    if ($('#checkObjMB').is(':checked')) {
        setAbstractObjOneClass('dhcondiMB','','');
    }
    if ($('#checkObjMC').is(':checked')) {
        setAbstractObjOneClass('dhcondiMC','','');
    }
    if ($('#checkObjMD').is(':checked')) {
        setAbstractObjOneClass('dhcondiMD','','');
    }
    if ($('#checkObjME').is(':checked')) {
        setAbstractObjOneClass('dhcondiME','','');
    }
    if ($('#checkObjMF').is(':checked')) {
        setAbstractObjOneClass('dhcondiMF','','');
    }
    
    $('.maskobjMenu').css("display","none");

    $( "#ObjMenuParams" ).animate({ 
        width : '20px',
        height: "20px",
        marginLeft : '0px'
    },200,function(){
        $('#ObjMenuParams').css("display","none");
    });
    
}

var contentSourceEdition = "";
var contentSourceEditionV1 = "";
var contentSourceEditionV2 = "";
var identSourceEdition = 1;

function displayPlugTeachEdit(myObj){

	var btnObj = $(myObj);
	tmpObjDom = btnObj;
	
	identchange = getUnikId();
	tmpObjDom.attr("data-ref",identchange);
	
	var typesource = "";
	var btnObjDivhref = btnObj.find('div');
	typesource = btnObjDivhref.parent().find('span.typesource').html();
	if(typesource===undefined){typesource = '';}
	
	if (typesource=='imageactive'){
		displayImageActiveEdit(myObj);
		return false;
	}
	
	contentSourceEdition = '';
	identSourceEdition++;

	if (isTypeSourceCont(typesource)) {
		var objDivSrc = btnObj.find('div');
		contentSourceEdition = objDivSrc.html();
		if(contentSourceEdition===undefined){
			contentSourceEdition = '';
		}
	}

	//error
	if (typesource=="") {
		reloadPageErr();
		return false;
	}
	
	if($("#BtnEditPlugTeach"+typesource).length==0){
		
		var bdDiv = '<div id="BtnEditPlugTeach' + typesource + '" ';
		bdDiv += ' class="gjs-mdl-container BtnEditPlugTeach" >';

		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" ';

		if (typesource.indexOf('oelcontent')!=-1||typesource=='txtmathjax') {
			bdDiv += ' style="max-width:780px!important;" >';
		} else {
			bdDiv += ' style="max-width:680px!important;" >';
		}
		
		bdDiv += getTitleBar('Edition ' + typesource);

		bdDiv += '<div class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;padding-top:10px;font-size:16px;" >';
		
		if (typesource=='card') {
			bdDiv += txtParamsPlugTeach(1,typesource,'Text');
			bdDiv += imgParamsPlugTeach(2,typesource,'Image');
		}

		if (typesource=='blank') {
			bdDiv += txtParamsPlugTeach(1,typesource,'Title');
			bdDiv += areaParamsPlugTeach(2,typesource,'Text');
			bdDiv += helperParamsPlugTeach(typesource,'Text');
		}
		if (typesource=='filltext') {
			bdDiv += txtParamsPlugTeach(1,typesource,'Title');
			bdDiv += areaParamsPlugTeach(2,typesource,'Text');
			bdDiv += helperParamsPlugTeach(typesource,'Text');
		}
		if (typesource=='markwords') {
			bdDiv += txtParamsPlugTeach(1,typesource,'Title');
			bdDiv += areaParamsPlugTeach(2,typesource,'Text');
			bdDiv += helperParamsPlugTeach(typesource,'Text');
		}

		if (typesource=='iframe-obj') {
			bdDiv += txtParamsPlugTeach(1,typesource,'Link');
			bdDiv += heightParamsPlugTeach(2,typesource,'Height');
		}
		if (typesource=='minidia') {
			var tmpdatatext1 = btnObjDivhref.parent().find('span.datatext1').html();
			var tmpdatatext2 = btnObjDivhref.parent().find('span.datatext2').html();
			if (typeof tmpdatatext1 === "undefined"){
				tmpdatatext1 = '';
			}
			var btnObjDivhref = btnObj.find('div');
			bdDiv += select2minidia(tmpdatatext2);
			bdDiv += areaRichParamsPlugTeach(1,typesource,tmpdatatext1);
		}
		if (isTypeSourceCont(typesource)) {
			bdDiv += '<div id="plugPmargAreaContent'+typesource+'" class="plugPmargAreaContent" ></div>';
		}

		bdDiv += getinputFXObj(typesource);
		
		bdDiv += '<div style="padding:25px;padding-top:10px;padding-bottom:5px;text-align:right;" >';
		bdDiv += '<input onClick="savePlugTeach(\''+typesource+'\')" ';
		bdDiv += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonSave trd" type="button" value="Save" /><br/>';
		bdDiv += '</div>';
		
		bdDiv += '</div>';
		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display:none"></div>';
		bdDiv += '</div>';

		$('body').append(bdDiv);

		if (typesource=='minidia') {
			$('#datatext1' + typesource).tinymce({
				menubar: false,
				statusbar: false,
				toolbar: 'undo redo| fontselect fontsizeselect forecolor | bold italic underline | bullist numlist outdent indent |link unlink removeformat blockquote code ',
				plugins: 'link lists',
				contextmenu: 'link lists'
			});
		}

	}
    
	if($("#BtnEditPlugTeach"+typesource).length==1){
		
        var datatext1 = "";
        if(datatext1===undefined){datatext1 = '';}
        if(datatext1==''){
			var btnObjDivhref = btnObj.find('div');
			datatext1 = btnObjDivhref.parent().find('span.datatext1').html();
			datatext2 = btnObjDivhref.parent().find('span.datatext2').html();
		}
        if(datatext1===undefined){datatext1 = '';}
		if(datatext2===undefined){datatext2 = '';}
		if(datatext1==="undefined"){datatext1 = '';}
		if(datatext2==="undefined"){datatext2 = '';}
		
		if (
			typesource=='blank'
			||typesource=='filltext'
			||typesource=='markwords'
		) {
			datatext2 = datatext2.replace(/!br!/g,'\n')
		}

		if (typesource=='iframe-obj') {
			if (datatext2=='') {
				datatext2 = 350;
			}
		}
		if (typesource=='minidia') {
			selectAvatarminidia(datatext2);
		}

		$('#datatext1'+ typesource).val(datatext1);
		$('#datatext2'+ typesource).val(datatext2);
		
		$('.ludimenu').css("z-index",'2');
		$('#BtnEditPlugTeach'+typesource).css("display",'');
		
		windowEditorIsOpen = true;
		loadaFunction();
		if (typesource.indexOf("animfx")!=-1) {
			$('#BtnEditPlugTeach'+typesource).css("display",'none');
		}

		if (isTypeSourceCont(typesource)) {
			var hcontent = htmlParamsContentEdit(identSourceEdition,typesource);
			$('#plugPmargAreaContent'+typesource).html(hcontent);
			if (contentSourceEdition!='') {
				contentSourceEditionV1 = datatext1;
				contentSourceEditionV2 = datatext2;
				installDirectContentEdit(identSourceEdition);
			}
		}

		traductAll();

	}
	
}

function isTypeSourceCont(typesource){
	var b = false;
	if (typesource.indexOf('elcontent')!=-1
	||typesource=='txtmathjax') {
		b = true;
	}
	return b;
}

function savePlugTeach(typesource){

	if(onlyOneUpdate==false){
		return false;
	}
	var isQuizzElem = false;

	var datatext1 = $('#datatext1'+ typesource).val();
	var datatext2 = $('#datatext2'+ typesource).val();

	var rP = '';
	if (typesource=='card') {
		rP = renderplugincard(datatext1,datatext2);
	}
	if (typesource=='blank') {
		isQuizzElem = true;
		datatext2 = datatext2.replace(/\r\n|\r|\n/g,"!br!")
		rP = renderpluginblank(datatext1,datatext2);
	}
	if (typesource=='filltext') {
		isQuizzElem = true;
		datatext2 = datatext2.replace(/\r\n|\r|\n/g,"!br!")
		rP = renderpluginfilltext(datatext1,datatext2);
	}
	if (typesource=='markwords') {
		isQuizzElem = true;
		datatext2 = datatext2.replace(/\r\n|\r|\n/g,"!br!")
		rP = renderpluginmarkwords(datatext1,datatext2);
	}
	if (typesource=='iframe-obj') {
		rP = renderpluginiframe(datatext1,datatext2);
	}
	if (typesource=='minidia') {
		rP = renderplugminidia(datatext1,datatext2);
	}
	if (rP=="") {
		rP = renderFXObj(datatext1,datatext2,typesource);
	}
	//error
	if (rP=="") {
		reloadPageErr();
		return false;
	}

	var paramsDB = '<span class=datatext1 >' ;
    paramsDB +=  datatext1 + '</span>';
    paramsDB += '<span class=datatext2 >' ;
    paramsDB +=  datatext2 + '</span>';
	paramsDB += '<span class=typesource >' ;
    paramsDB +=  typesource + '</span>';

    var rH = GplugSrcT;
	//Special UI
	if (typesource=='lifebar') {
		rH = rH.replace('plugteachcontain','plugteachuicontain');
	}

    rH = rH.replace("{content}",rP + paramsDB);

    if(GlobalTagGrappeObj=='div'){

		if (isQuizzElem) {
			rH = GquizzSrcTop + rH + GplugSrcBottom;
		} else {
			rH = GplugSrcTop + rH + GplugSrcBottom;
		}
		
	}
    
	setAbstractObjContent(rH);
	
	closeAllEditWindows();
	
	$('.ludimenu').css("z-index","1000");
	saveSourceFrame(false,false,0);

}

//params plug
function txtParamsPlugTeach(i,typesource,txt){

	var bdDiv = '<div class="plugPmarg" >';
	bdDiv += '<div class="plugLabelDiv trd" >';
	bdDiv += txt;
	bdDiv += '&nbsp;:&nbsp;</div>';
	bdDiv += '<input id="datatext'+ i + typesource + '" type="text" value="" ';
	bdDiv += ' class="plugInputDiv" />';
	bdDiv += '</div>';
	return bdDiv;

}

function heightParamsPlugTeach(i,typesource,txt){

	var bdDiv = '<div class="plugPmarg" >';
	bdDiv += '<div class="plugLabelDiv trd" >';
	bdDiv += txt;
	bdDiv += '&nbsp;:&nbsp;</div>';
	bdDiv += '<input id="datatext'+ i + typesource + '" type="number" min="350" max="1200" ';
	bdDiv += ' class="plugInputDiv" />';
	bdDiv += '</div>';
	return bdDiv;

}

function numbe10ParamsPlugTeach(i,typesource,txt){

	var bdDiv = '<div class="plugPmarg" >';
	bdDiv += '<div class="plugLabelDiv trd" >';
	bdDiv += txt;
	bdDiv += '&nbsp;:&nbsp;</div>';
	bdDiv += '<input id="datatext'+ i + typesource + '" type="number" min="1" max="10" ';
	bdDiv += ' class="plugInputDiv" />';
	bdDiv += '</div>';
	return bdDiv;

}

function areaParamsPlugTeach(i,typesource,txt){

	var bdDiv = '<div class="plugPmargArea" >';
	bdDiv += '<div class="plugLabelDiv trd" >';
	bdDiv += txt;
	bdDiv += '&nbsp;:&nbsp;</div>';
	bdDiv += '<textarea id="datatext'+ i + typesource + '" type="text" value="" ';
	bdDiv += ' class="plugAreaDiv" ></textarea>';
	bdDiv += '</div>';
	return bdDiv;

}

function areaRichParamsPlugTeach(i,typesource,txt){
	
	var bdDiv = '<div class="plugPmargAreaRich" >';
	bdDiv += '<textarea id="datatext'+ i + typesource + '" type="text" value="" ';
	bdDiv += ' class="plugAreaDivRich" >'+txt+'</textarea>';
	bdDiv += '</div>';
	return bdDiv;

}

function imgParamsPlugTeach(i,typesource,txt){

	var bdDiv = '<div class="plugPmarg" >';
	bdDiv += '<div class="plugLabelDiv trd" >';
	bdDiv += txt;
	bdDiv += '&nbsp;:&nbsp;</div>';
	bdDiv += '<input id="datatext' + i + typesource + '" type="text" value="" ';
	bdDiv += ' style="width:360px;" class="plugInputDiv" />';
	bdDiv += '&nbsp;<input onClick="showFileManagerStudio2(13,\'datatext2'+typesource+'\',0);" ';
	bdDiv += ' class="gjs-one-bg ludiButtonSave plugInputMin" type="button" value="..." />';
	bdDiv += '</div>';
	return bdDiv;

}

function helperParamsPlugTeach(typesource,txt){

	var bdDiv = '<div class="plugPmarg" >';
	bdDiv += '<div class="plugLabelDiv" >';
	bdDiv += '&nbsp;&nbsp;</div>';
	bdDiv += '<a onClick="helperProcessPlugTeach(\''+typesource+'\')" ';
	bdDiv += ' style="cursor:pointer;" id="dataexample'+ i + typesource + '" ';
	bdDiv += ' class="plugInputDiv trd" >insert example</a>';
	bdDiv += '</div>';
	return bdDiv;

}

function helperProcessPlugTeach(typesource){

	if (typesource=='blank') {
		$('#datatext1blank').val("Lyon School");
		var txtBlank = "The Lyon School is a term for a group of *French* artists which gathered around Paul Chenavard.";
		txtBlank += "It was founded by *Pierre Revoil*, one of the representatives of the *Troubadour* style.";
		$('#datatext2blank').val(txtBlank);
	}

	if (typesource=='filltext') {
		$('#datatext1filltext').val("Fill the Blanks");
		var txtFill = "Use Fill the Blanks to test *students* recall of important ideas from the teaching materials.";
		txtFill += "Students must be able to *remember* specific details and be able to type the answers into the spaces.";
		$('#datatext2filltext').val(txtFill);
	}

	if (typesource=='markwords') {
		$('#datatext1markwords').val("Marks the Words");
		$('#datatext2markwords').val("A free based *question* type allowing creatives to create *challenges* where the user is to mark specific types of verbs in a text.");
	}

}

var GplugSrcTop = '<table class="teachdocplugteach" ';
GplugSrcTop += 'onMouseDown="parent.displayEditButon(this);" ';
GplugSrcTop += ' style="width:100%;text-align:center;" >';


var GquizzSrcTop = '<table class="teachdocplugteach quizzcontentplug" ';
GquizzSrcTop += 'onMouseDown="parent.displayEditButon(this);" ';
GquizzSrcTop += ' style="width:100%;text-align:center;" >';

var GplugSrcT = '<tr><td style="text-align:center;padding:10px;width:100%;position:relative;" >';
GplugSrcT += '<div class="plugteachcontain" >';
GplugSrcT += '{content}';
GplugSrcT += '</div>';
GplugSrcT += '</td></tr>';

var GplugSrcBottom = '</table>';

var firstSrcT = GplugSrcT.replace("{content}",renderplugincard('',''));

editor.BlockManager.add('plugTeachCard',{
	label: 'Card',
	attributes: {
		class: 'fa fa-text icon-plugTeach',
		style: "background-image: url('icon/plug-card.png');background-repeat:no-repeat;background-position:center center;"
	},
	category: 'Basic',
	content: {
		content: GplugSrcTop+firstSrcT+GplugSrcBottom,script: "",
		style: {
			width: '100%',
			minHeight: '70px'
		}
	}
});


var bCMQ = '<div class="row" style="position:relative;" id="i27td">';

var baseRenderLUDIQcm = '<table class="qcmbarre" onMouseDown="parent.displayEditButon(this);" style="width:100%;" >';

baseRenderLUDIQcm += '<tr><td colspan=2 style="padding:15px;" class=quizzTextqcm >Quizz text</td></tr>';

baseRenderLUDIQcm += '<tr class=quizzTextTr ><td class=quizzTextTd ><img class=checkboxqcm src="img/qcm/matgreen0.png" />';
baseRenderLUDIQcm += '</td><td style="text-align:left;" >Answer 1</td></tr>';
baseRenderLUDIQcm += '<tr class=quizzTextTr ><td class=quizzTextTd ><img class=checkboxqcm src="img/qcm/matgreen0.png" />';
baseRenderLUDIQcm += '</td><td style="text-align:left;" >Answer 2</td></tr>';
baseRenderLUDIQcm += '<tr class=quizzTextTr ><td class=quizzTextTd ><img class=checkboxqcm src="img/qcm/matgreen0.png" />';
baseRenderLUDIQcm += '</td><td style="text-align:left;" >Answer 3</td></tr>';
baseRenderLUDIQcm +='</table>';

bCMQ = baseRenderLUDIQcm;

//bCMQ += '</div>';
  
editor.BlockManager.add('CmqTeach',{
	label: 'Quizz',
	attributes: {class: 'fa fa-text qlab icon-cmq'},
	category: 'Basic',
	content: {
		content: bCMQ,
		script: "",
		style: {
		width: '100%',
		minHeight: '100px'
		}
	}
});

firstSrcT = GplugSrcT.replace("{content}",renderpluginblank('',''));

editor.BlockManager.add('plugTeachBlank',{
	label: 'Drag & Drop',
	attributes: {
		class: 'fa fa-text qlab icon-plugTeach',
		style: "background-image: url('icon/plug-blank.png');background-repeat:no-repeat;background-position:center center;"
	},
	category: 'Basic',
	content: {
		content: GquizzSrcTop+firstSrcT+GplugSrcBottom,script: "",
		style: {
			width: '100%',
			minHeight: '70px'
		}
	}
});


firstSrcT = GplugSrcT.replace("{content}",renderpluginfilltext('',''));

editor.BlockManager.add('plugTeachFillText',{
	label: 'Fill text',
	attributes: {
		class: 'fa fa-text qlab icon-plugTeach',
		style: "background-image: url('icon/plug-filltext.png');background-repeat:no-repeat;background-position:center center;"
	},
	category: 'Basic',
	content: {
		content: GquizzSrcTop+firstSrcT+GplugSrcBottom,script: "",
		style: {
			width: '100%',
			minHeight: '70px'
		}
	}
});


firstSrcT = GplugSrcT.replace("{content}",renderpluginmarkwords('',''));

editor.BlockManager.add('plugTeachMarkwords',{
	label: 'Mark Words',
	attributes: {
		class: 'fa fa-text qlab icon-plugTeach',
		style: "background-image: url('icon/plug-markwords.png');background-repeat:no-repeat;background-position:center center;"
	},
	category: 'Basic',
	content: {
		content: GquizzSrcTop+firstSrcT+GplugSrcBottom,script: "",
		style: {
			width: '100%',
			minHeight: '70px'
		}
	}
});



firstSrcT = GplugSrcT.replace("{content}",renderpluginiframeInit('',''));

editor.BlockManager.add('plugTeachIframe',{
	label: 'iframe',
	attributes: {
		class: 'fa fa-text icon-plugTeach',
		style: "background-image: url('icon/plug-iframe.png');background-repeat:no-repeat;background-position:center center;"
	},
	category: 'Basic',
	content: {
		content: GplugSrcTop+firstSrcT+GplugSrcBottom,script: "",
		style: {
			width: '100%',
			minHeight: '300px'
		}
	}
});


firstSrcT = GplugSrcT.replace("{content}",renderplugminidia('',''));

editor.BlockManager.add('plugTeachMinidia',{
	label: 'mini dia',
	attributes: {
		class: 'fa fa-text icon-plugTeach',
		style: "background-image: url('icon/plug-minidia.png');background-repeat:no-repeat;background-position:center center;"
	},
	category: 'Basic',
	content: {
		content: GplugSrcTop+firstSrcT+GplugSrcBottom,script: "",
		style: {
			width: '100%',
			minHeight: '200px'
		}
	}
});



firstSrcT = GplugSrcT.replace("{content}",renderimgactive('',''));

editor.BlockManager.add('plugTeachImgActive',{
	label: 'Img Active',
	attributes: {
		class: 'fa fa-text icon-plugTeach',
		style: "background-image: url('icon/plug-image-active.png');background-repeat:no-repeat;background-position:center center;"
	},
	category: 'Basic',
	content: {
		content: GplugSrcTop+firstSrcT+GplugSrcBottom,script: "",
		style: {
			width: '100%',
			minHeight: '200px'
		}
	}
});
function renderplugincard(var1,var2) {

    var h = '';
    
    h = '<div class="plugcard" tabindex="0" >';
    h += '<div class="plugcard-front" ';
    if (var2!='') {
        h += ' style="background-image: url(' + var2 + ');" ';
    }else{
        h += ' style="background-image: url(img/classique/cardbase.jpg);" ';
    }
    h += '></div>';
    h += '<div class="plugcard-back">';
    h += '<h2>' + var1 + '</h2>';
    h += '</div>';
    
    h += '</div>';
    
    h += '<div class="forceplug300" ></div>';

    h += '<span class=typesource >card</span>';

    return h;

}


function renderpluginblank(var1,var2) {

    var h = '<iframe';
    h += ' style="width:100%;height:300px;overflow:hidden;" ';
    h += ' frameBorder="0" ';
    h += ' src="oel-plug/hvpdragthewords/dragthewords.html" ';
    h += '></iframe>';
    
    if (var1==""&&var2=="") {
        var1 = "Title";
        var2 = "Edit object<br /><br />";
    }

    var2 = var2.replace(/!br!/g,'<br />');
    var2 = var2.replace(/\*/g,'starClue');
    // var regex = /starClue[a-z]*starClue/gi;
    //var regex = /starClue[a-zA-Z0-9]*starClue/gi;
    var regex = /starClue(.*?)starClue/gi;

    var2 = var2.replace(regex,"<span style='color:red;' >????</span>");
    
    h = '<p style="font-size:18px;text-align:left;" >' + var1 + '</p>';
    h += '<p style="font-size:18px;text-align:left;" >' + var2 + '</p>';
    h += '<img src="img/classique/hvp_check.png" ';
    h += ' style="width:130px;height:45px;float:left;" />';
    h += '<span class=typesource >blank</span>';
    
    return h;

}

function renderpluginiframe(var1,var2) {

    var h  = '<div class=topinactiveteach ></div>';
    
    h += '<iframe';
    h += ' style="width:100%;min-height:350px;z-index:1;';
    h += 'height:' + var2 + 'px;overflow:hidden;" ';
    h += ' frameBorder="0" ';
    h += ' src="' + var1 + '" ></iframe>';
    
    h += '<span class=typesource >iframe-obj</span>';

    return h;

}

function renderpluginiframeInit(var1,var2) {

    var h = '<div';
    h += ' style="width:100%;height:350px;background:#E5E7E9;" ';
    h += '></div>';
    
    h += '<span class=typesource  >iframe-obj</span>';

    return h;

}
function renderplugminidia(var1,var2) {

    if (typeof var2 === "undefined"){
        var2 = '';
    }
    if (typeof var1 === "undefined"){
        var1 = '';
    }

    var h  = '';
    h = '<div class="plugminidia" tabindex="0" >';
    h += '<div class="avatar-minidia" ';
    if (var2!='') {
        h += ' style="background-image: url(' + var2 + ');" ';
    }else{
        h += ' style="background-image: url(img/classique/man-conducting-survey.png);" ';
    }
    h += '></div>';
    
    h += '<div class="dialog-minidia bubble-minidia">';
    h += var1;
    h += '</div>';
    
    h += '</div>';

    h += '<span class=typesource style="display:none;" >minidia</span>';

    return h;

}

function select2minidia(var2) {
    if (typeof var2 === "undefined"){var2 = '';}
    if (var2=='') {var2 = 'img/classique/man-conducting-survey.png';}
	var bdDiv = '<div class="plugPmargDia" >';
    bdDiv += '<div class="plugLabelDiv" >Avatar';
	bdDiv += '&nbsp;:&nbsp;</div>';
    bdDiv += '<img class="avatarminidiasel avatarminidiasel1" onClick="selectAminidia(this)" ';
    bdDiv += 'style="border:2px #E6E6E6 solid;width:60px;height:84px;float:left;" src="img/classique/man-conducting-survey.png" />';
    bdDiv += '<img class="avatarminidiasel avatarminidiasel2" onClick="selectAminidia(this)" ';
    bdDiv += 'style="border:2px #E6E6E6 solid;width:54px;height:84px;float:left;" src="img/classique/woman-conducting-survey.png" />';
    bdDiv += '<img class="avatarminidiasel avatarminidiasel9" onClick="selectMyAvatar(this)" ';
    bdDiv += 'style="border:2px #E6E6E6 solid;width:54px;height:84px;float:left;" src="img/classique/selectavatar.png" />';

    bdDiv += '<input id="datatext2minidia" type="text" value="' + var2 + '" ';
	bdDiv += ' class="plugInputDiv" style="display:none;" />';
	bdDiv += '</div>';
	return bdDiv;

}

function selectAminidia(objI) {
    $(".avatarminidiasel").css("border","#E6E6E6 solid 2px");
    $(objI).css("border","green solid 2px");
    $("#datatext2minidia").val($(objI).attr("src"));
}

function selectAvatarminidia(var2) {

    var findOriginal = false;
    $(".avatarminidiasel").css("border","#E6E6E6 solid 2px");
    $(".avatarminidiasel").each(function(index){
        if($(this).attr("src")==var2){
            $(this).css("border","green solid 2px");
            findOriginal = true;
            if(var2.indexOf("img/classique")!=-1){
                $('.avatarminidiasel9').attr("src","img/classique/selectavatar.png");
            }
        }
	});

    if(findOriginal==false&&var2!=""){
        $('.avatarminidiasel9').attr("src",var2);
        $('.avatarminidiasel9').css("border","green solid 2px");
    }else{
        if(var2==''){
            $('.avatarminidiasel1').css("border","green solid 2px");
            $('.avatarminidiasel9').attr("src","img/classique/selectavatar.png");
        }
    }

}

function selectMyAvatar(objI) {

    showFileManagerStudio2(13,'datatext2minidia','refreshMyAvatarDia');
    
    $(".avatarminidiasel").css("border","#E6E6E6 solid 2px");
    $(objI).css("border","green solid 2px");

}

function refreshMyAvatarDia(){

    var imgA =$('#datatext2minidia').val();

    if (imgA==''||
    (imgA.toLowerCase().indexOf('.png')==-1
    &&imgA.toLowerCase().indexOf('.jpg')==-1
    &&imgA.toLowerCase().indexOf('.jpeg')==-1
    &&imgA.toLowerCase().indexOf('.gif')==-1)
    ) {
        $('#datatext2minidia').val("");
        $('.avatarminidiasel9').attr("src","img/classique/selectavatar.png");
    }else{
        $('.avatarminidiasel9').attr("src",imgA);
    }

    $('.ui-widget-overlay').css("display","none");
	$('.workingProcessSave').css("display","none");
    $('.ludimenu').css("display","none");
    $('#BtnEditPlugTeach'+"minidia").css("display","");

}

function renderpluginfilltext(var1,var2) {

    var h = '<iframe';
    h += ' style="width:100%;height:300px;overflow:hidden;" ';
    h += ' frameBorder="0" ';
    h += ' src="oel-plug/hvpfillintheblanks/fill-in-the-missing-words.html" ';
    h += '></iframe>';
    
    if (var1==""&&var2=="") {
        var1 = "Fill the Blanks";
        var2 = "Use Fill the Blanks to test students recall of important ideas from the teaching materials.<br />";
        var2 = "Students must be able to *remember* specific details and be able to type the answers into the spaces.";
    }

    var2 = var2.replace(/!br!/g,'<br />');
    var2 = var2.replace(/\*/g,'starClue');
    // var regex = /starClue[a-z]*starClue/gi;
    //var regex = /starClue[a-zA-Z0-9]*starClue/gi;
    var regex = /starClue(.*?)starClue/gi;

    var2 = var2.replace(regex,"<span style='color:blue;' >[______]</span>");
    
    h = '<p style="font-size:18px;text-align:left;" >' + var1 + '</p>';
    h += '<p style="font-size:18px;text-align:left;" >' + var2 + '</p>';
    h += '<img src="img/classique/hvp_check.png" ';
    h += ' style="width:130px;height:45px;float:left;" />';
    h += '<span class=typesource >filltext</span>';
    
    return h;

}

function renderpluginmarkwords(var1,var2) {
    
    var h = '<iframe';
    h += ' style="width:100%;height:300px;overflow:hidden;" ';
    h += ' frameBorder="0" ';
    h += ' src="oel-plug/hvpmarkthewords/hvpmarkthewords.html" ';
    h += '></iframe>';
    
    if (var1==""&&var2=="") {
        var1 = "Marks the Words";
        var2 = "A free based *question* type allowing creatives to create *challenges* ";
        var2 += "where the user is to mark specific types of verbs in a text.";
    }

    var2 = var2.replace(/!br!/g,'<br />');
    var2 = var2.replace(/\*/g,'starClue');
    // var regex = /starClue[a-z]*starClue/gi;
    //var regex = /starClue[a-zA-Z0-9]*starClue/gi;
    var regex = /starClue(.*?)starClue/gi;

    //var2 = var2.replace(regex,"<span style='color:blue;' >[______]</span>");
    
    var result;
    while ((result = regex.exec(var2)) !== null) {
        var fullTerm = result[0];
        var myTerm = result[1];
        var2 = var2.replace(fullTerm,"<span style='color:blue;' >" + myTerm + "</span>");
    }

    h = '<p style="font-size:18px;text-align:left;" >' + var1 + '</p>';
    h += '<p style="font-size:18px;text-align:left;" >' + var2 + '</p>';
    h += '<img src="img/classique/hvp_check.png" ';
    h += ' style="width:130px;height:45px;float:left;" />';
    h += '<span class=typesource >markwords</span>';
    
    return h;

}
function displayPageDevUpdate(init) {
	
    var loadV = amplify.store("versionconsult");
    if (versionCS==loadV&&init==1) {
        return false;
    }

	$('.ludimenu').css("z-index","2");
    $('.topmenuabout').css("display","none");

	if ($("#pageDevUpdate").length==0) {
		
		var bdDiv = '<div id="pageDevUpdate" style="overflow:hidden;" class="gjs-mdl-container" >';

		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" >';
		
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title trd">Here you can find information about updates</div>';
		bdDiv += '<div class="gjs-mdl-btn-close closeUpdateBtn" onClick="closeUpdateWin()" data-close-modal="">⨯</div>';
		bdDiv += '</div>';

        bdDiv += '<div style="padding:15px;padding-top:0px;" >';

        bdDiv += '<img class="updateimg" src="icon/updates.png" />';

        bdDiv += '<h3>Engine Studio Updates</h3>';
        bdDiv += '<p><b>Current version: ' + versionCS + '</b></p>';
		
        bdDiv += '<div id="divUpdateLogs" class="divUpdateLogs" ></div>';

        bdDiv += '<p><input onClick="closeUpdateWin();" ';
		bdDiv += ' style="position:relative;left:50%;border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonSave closeUpdateBtn trd" type="button" value="&nbsp;&nbsp;OK&nbsp;&nbsp;" /></p>';

        bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
 
		bdDiv += '</div>';

		$('body').append(bdDiv);

	}

	if($("#pageDevUpdate").length==1){
		$('.ludimenu').css("display","none");
		$('#pageDevUpdate').css("display","");
        getDevUpdate();
	}

}

setTimeout(function(){
    if (idPageHtml==idPageHtmlTop) {
        displayPageDevUpdate(1);
    }
},600);

function getDevUpdate(){

    $('#divUpdateLogs').html(getListUpdate());

    /*
        var extUrl = "https://chamilo-studio.com/news/";
        var ajaxUrl = '../ajax/params/params-get.php?idteach=' + idPageHtmlTop;
        $.ajax({
            url : extUrl,
            type: "POST",
            success: function(data,textStatus,jqXHR){
                $('#divUpdateLogs').html(data);
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                $('#divUpdateLogs').html(getListUpdate());
            }
        });
    */

}

function getListUpdate(){

    var b = "";

    b += "<h3>Features studio 20/07/2022</h3>";
    b += "<ul>";
    b += '<li>Move text editor to left or right</li>';
    b += '<li>Add Separator object</li>';
    b += '<li>Fix upload file progress</li>';
    b += "</ul>";
    
    b += "<h3>Features studio 13/07/2022</h3>";
    b += "<ul>";
    b += '<li>Add Glossary Function</li>';
    b += '<li>Fix Video edition on Firefox</li>';
    b += '<li>Optimize smartphone student view</li>';
    b += '<li>Conditionnal bloc menu</li>';
    b += "</ul>";
    
    b += "<h3>Features studio 23/04/2022</h3>";
    b += "<ul>";
    b += '<li>Add French and Spannish language</li>';
    b += '<li>button : add help text</li>';
    b += '<li>Fix Image Active message bubble</li>';
    b += '<li>Optimize student view loading</li>';
    b += "</ul>";

    b += "<h3>Features studio 16/02/2022</h3>";
    b += "<ul>";
    b += '<li>Add a top menu</li>';
    b += '<li>DownloadLinks: to add Download links to all button</li>';
    b += '<li>Dynamic center menu</li>';
    b += "</ul>";

    b += "<h3>Features studio 26/01/2022</h3>";
    b += "<ul>";
    b += '<li>New home page for your elearning content</li>';
    b += '<li>Fix page edition gap</li>';
    b += '<li>Dynamic center menu</li>';
    b += '<li>Add option to export source project</li>';
    b += "</ul>";

    b += "<h3>Features lms 20/08/2021</h3>";
    b += "<ul>";
    b += '<li>LTIProvider: Add support for LTI as provider (experimental)</li>';
    b += '<li>Learnpath: Offline courses: Generate index page when exporting backup</li>';
    b += "<li>Learning path: Add progress check to avoid saving if progress is lower than before, only when 'score as progress' option is enabled</li>";
    b += "</ul>";
    
    return b;

}

function closeUpdateWin() {

    $('.closeUpdateBtn').css("display","none");

    if (localStorage) {
        amplify.store("versionconsult",versionCS);
    }

    setTimeout(function(){
            closeAllEditWindows();
    },600);

}
editor.BlockManager.add('sectioncollapse',{
	label: 'Section collapse',
	attributes: {
		class: 'fa fa-text icon-plugTeach',
        style: "background-image: url('icon/sectioncollapse.png');background-repeat:no-repeat;background-position:center center;"
	},
    category: 'Basic',
    content: {
		content: '<div class=sectioncollapse >SECTION</div>',
        script: "",
		style: {
			width: '100%'
		}
	}
});

var processScoExport = false;
var processScoData = 0;

function displaySubExportScorm(){
	
	$('.ludimenu').css("z-index","2");

	if($("#pageEditExportScorm").length==0){
		
		var bdDiv = '<div id="pageEditExportScorm" class="gjs-mdl-container" >';
		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" style="max-width:575px;" >';
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title trd ">Export to SCORM package</div>';
		bdDiv += '<div class="gjs-mdl-btn-close" onClick="closeAllEditWindows();processScoExport=false;" data-close-modal="">⨯</div>';
		bdDiv += '</div>';
		
		bdDiv += '<div class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;" >';
		
		bdDiv += '<div class="progressExport" ><div class="pourcentExport" ></div></div>';
		bdDiv += '<div class="logMsgLoadSco" ><br/></div>';

		bdDiv += '<div class="finaldonwloadsco" style="padding:25px;padding-top:10px;padding-bottom:5px;text-align:center;" >';
		bdDiv += '<input style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonCancel trd" type="button" value="Download" />';
		bdDiv += '<br/></div>';

		bdDiv += '</div>';
		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
		bdDiv += '</div>';
		$('body').append(bdDiv);

	}

	if($("#pageEditExportScorm").length==1){

		$('.ludimenu').css("display","none");
		$('#pageEditExportScorm').css("display","");
		$('.pourcentExport').css("width","1%");
		processScoExport = true;
		processScoData = 0;
		
		var bdDow = '<input style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		bdDow += ' class="gjs-one-bg ludiButtonCancel trd" ';
		bdDow += ' type="button" value="Download" />';
		$('.finaldonwloadsco').html(bdDow);
		
		loadaFunction();
		launchExportScorm1();
		traductAll();
		
	}

}

function launchExportScorm1(){

	if(processScoExport==false) {
		return false;
	}

	$( ".pourcentExport" ).animate({ width: "20%"
	},5500,function(){});

	$.ajax({
		url : '../ajax/export/prepare-sco.php?id=' + idPageHtmlTop+'&step=1&p='+processScoData,
		type: "get",
		success: function(data,textStatus,jqXHR){

			if(data.indexOf("KO")==-1){
				if (processScoExport) {
					launchExportScorm2();
				}
				$( ".pourcentExport" ).stop();
				$( ".pourcentExport" ).animate({ width: "40%"
				},6500,function(){});
			}else{
				$('.logMsgLoadSco').html(data);
			}

		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			alert("Error : "+textStatus);
		}
	});

}

function launchExportScorm2(){

	if(processScoExport==false) {
		return false;
	}
	$.ajax({
		url : '../ajax/export/prepare-sco.php?id=' + idPageHtmlTop+'&step=2&p='+processScoData,
		type: "get",
		success: function(data,textStatus,jqXHR){

			if(data.indexOf("KO")==-1
				&&data.indexOf("OK 2")!=-1){
				$( ".pourcentExport" ).stop();
				$( ".pourcentExport" ).animate({ width: "60%"
				},5500, function() {});
				if (processScoExport) {
					launchExportScorm3();
				}
			}else{
				$('.logMsgLoadSco').html(data);
			}

		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			alert("Error : "+textStatus);
		}
	});

}

function launchExportScorm3(){

	if(processScoExport==false) {
		return false;
	}

	$.ajax({
		url : '../ajax/export/prepare-sco.php?id=' + idPageHtmlTop+'&step=3&p='+processScoData,
		type: "get",
		success: function(data,textStatus,jqXHR){

			if(data.indexOf("KO")==-1){
				$( ".pourcentExport" ).stop();
				$( ".pourcentExport" ).animate({ width: "70%"
				},5500, function() {});

				if (processScoExport) {
					launchExportScorm4();
				}
			}else{
				$('.logMsgLoadSco').css("display","block");
				$('.logMsgLoadSco').html(data);
			}

		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			$('.logMsgLoadSco').css("display","block");
			alert("Error : "+textStatus);
		}
	});

}

function launchExportScorm4(){

	if(processScoExport==false) {
		return false;
	}
	$( ".pourcentExport" ).stop();
	$( ".pourcentExport" ).animate({ width: "90%"
	},7500,function(){});

	$.ajax({
		url : '../ajax/export/prepare-sco.php?id=' + idPageHtmlTop+'&step=4&p='+processScoData,
		type: "get",
		success: function(data,textStatus,jqXHR){

			if(data.indexOf("KO")==-1){
				
				$( ".pourcentExport" ).stop();
				$( ".pourcentExport" ).animate({ width: "100%"
				},500, function() {});

				if(data.indexOf(".zip")!=-1&&data.indexOf("Warning")==-1){
					
					var bdDiv = '<a href="'+data+'" target="_blank" ';
					bdDiv += 'style="border:solid 1px gray;padding:7px;';
					bdDiv += 'cursor:pointer;color:white;display:inline-block;" ';
					bdDiv += ' class="gjs-one-bg ludiButtonSave trd" >Download</a>';

					$('.finaldonwloadsco').html(bdDiv);
					
				}else{

					var bdDiv = '<a target="_blank" ';
					bdDiv += 'style="border:solid 1px gray;padding:7px;';
					bdDiv += 'cursor:pointer;color:white;display:inline-block;" ';
					bdDiv += ' class="gjs-one-bg ludiButtonSave trd" >Error !</a>';
					
					$('.finaldonwloadsco').html(bdDiv);

					$('.logMsgLoadSco').html(data);
				}

			}else{
				$('.logMsgLoadSco').html(data);
			}
			
			traductAll();

		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			alert("Error : "+textStatus);
		}
	});

}
function displaySubExportProject(){
	$('.ludimenu').css("z-index","2");

	if($("#pageEditExportProject").length==0){
		
		var bdDiv = '<div id="pageEditExportProject" class="gjs-mdl-container" >';
		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" style="max-width:575px;" >';
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title">Export project package</div>';
		bdDiv += '<div class="gjs-mdl-btn-close" onClick="closeAllEditWindows();processScoExport=false;" data-close-modal="">⨯</div>';
		bdDiv += '</div>';
		
		bdDiv += '<div class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;" >';
		
		bdDiv += '<div class="progressExport" ><div class="pourcentExport" ></div></div>';
		bdDiv += '<div class="logMsgLoadSco" ><br/></div>';

		bdDiv += '<div class="finaldonwloadsco" style="padding:25px;padding-top:10px;padding-bottom:5px;text-align:center;" >';
		bdDiv += '<input style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonCancel" type="button" value="Download" />';
		bdDiv += '<br/></div>';

		bdDiv += '</div>';
		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
		bdDiv += '</div>';
		$('body').append(bdDiv);

	}

	if($("#pageEditExportProject").length==1){
		$('.ludimenu').css("display","none");
		$('#pageEditExportProject').css("display","");
		$('.pourcentExport').css("width","1%");
		processScoExport = true;
        processScoData = 1;
		launchExportScorm1();
		traductAll();
		
	}

}
function directToRender(filename) {

    var formData = {
        id : idPageHtmlTop,
        ur : encodeURI(filename)
    };

    $.ajax({
        url : '../ajax/ajax.upltorender.php?id=' + formData.id + '&ur=' + formData.ur,
        type: "POST",data : formData,
        success: function(data,textStatus,jqXHR){
            
            if(data.indexOf("error")==-1){
              
            } else {
               
            }

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            pushImageToColl(file.url);
        }
    });

}
function displayColorsTeachEdit(){

	if($("#WinEditColorsTeach").length==0){
		
		var bdDiv = '<div id="WinEditColorsTeach" ';
		bdDiv += ' style="background-color:#7F8C8D;" ';
		bdDiv += ' class="WinEditColorsTeach" >';
		bdDiv += getTitleBar('Colors');

		bdDiv += getCollectionsColorsThemes();
		
		bdDiv += '</div>';

		$('body').append(bdDiv);

	}
    
	if($("#WinEditColorsTeach").length==1){
		saveSourceFrame(false,false,0);
		$( "#WinEditColorsTeach" ).css("display",'').css("height",'50px');
		$( "#WinEditColorsTeach" ).animate({
			height: "420px"
		}, 500, function() {
		});
		traductAll();
	}
	
}

function displayEditThemeParamsProject(){

	$('.ludimenu').css("z-index","2");

	if($("#pageEditThemeParams").length==0){
		
		var bdDiv = '<div id="pageEditThemeParams" class="gjs-mdl-container" >';
		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" ';
        bdDiv += ' style="max-width:850px;background-color:white;" >';
		bdDiv += '<div class="gjs-mdl-header" style="background-color: #E6E6E6;" >';
		bdDiv += '<div class="gjs-mdl-title">Project theme</div>';
		bdDiv += '<div class="gjs-mdl-btn-close" ';
        bdDiv += ' onClick="closeAllEditWindows();processScoExport=false;" ';
        bdDiv += ' data-close-modal="">⨯</div>';
		bdDiv += '</div>';
		
		bdDiv += '<div class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;" >';
		
        bdDiv += '<div class="innerLeftBannerTeach" >';
        bdDiv += '</div>';

		bdDiv += '<div class="innerEditTitleTeach" style="margin-left:5px;" >Page style</div>';
		bdDiv += '<div class="innerEditTitleTeach" style="margin-left:10px;">Quiz style</div>';

        bdDiv += '<div class="innerEditColorsTeach" >';
        bdDiv += getCollectionsColorsThemes();
        bdDiv += '</div>';

        bdDiv += '<div class="innerEditQuizzTeach" >';
		bdDiv += getCollectionsQuizzThemes();
        bdDiv += '</div>';

		bdDiv += '</div>';
		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
		bdDiv += '</div>';
		$('body').append(bdDiv);

	}

	if($("#pageEditThemeParams").length==1){
        
        windowEditorIsOpen = true;
		loadaFunction();
		var bodypw = $('body').outerWidth();
        if(bodypw<1050){
            $('.ludimenu').css("display","none");
        }
		$('#pageEditThemeParams').css("display","");
       
        $('.ludimenu').css("z-index","2");
		traductAll();
	}

}

function getCollectionsColorsThemes(){

	var bdDiv = '<a title="White-Blue" onClick="changColor(\'white-chami\');" ';
	bdDiv += ' class="colorCube" >';
	bdDiv += '<img src="templates/colors/white-chami.jpg" />';
	bdDiv += '</a>';

	bdDiv += '<a title="Eco-green" onClick="changColor(\'eco-chami\');" ';
	bdDiv += ' class="colorCube" >';
	bdDiv += '<img src="templates/colors/eco-chami.jpg" />';
	bdDiv += '</a>';

	bdDiv += '<a title="White-Orange" onClick="changColor(\'orange-chami\');" ';
	bdDiv += ' class="colorCube" >';
	bdDiv += '<img src="templates/colors/orange-chami.jpg" />';
	bdDiv += '</a>';
	
	bdDiv += '<a title="Classic-Paper" onClick="changColor(\'paper-chami\');" ';
	bdDiv += ' class="colorCube" >';
	bdDiv += '<img src="templates/colors/paper-chami.jpg" />';
	bdDiv += '</a>';

	bdDiv += '<a title="Office" onClick="changColor(\'office-chami\');" ';
	bdDiv += ' class="colorCube" >';
	bdDiv += '<img src="templates/colors/office-chami.jpg" />';
	bdDiv += '</a>';

	bdDiv += '<a title="Sky" onClick="changColor(\'white-sky\');" ';
	bdDiv += ' class="colorCube" >';
	bdDiv += '<img src="templates/colors/white-sky.jpg" />';
	bdDiv += '</a>';
	
	bdDiv += '<a title="hahmlet-blue" onClick="changColor(\'hahmlet-blue\');" ';
	bdDiv += ' class="colorCube" >';
	bdDiv += '<img src="templates/colors/hahmlet-blue.jpg" />';
	bdDiv += '</a>';

	return bdDiv;

}

function changColor(t){
	
	var urlNc = 'index.php?action=edit&id='+ idPageHtml +'&changc=' + t;
	window.location.href = urlNc;

}

function getCollectionsQuizzThemes(){

	var bdDiv = '';
	bdDiv += '<a title="White-quizz" onClick="changQuizzColor(\'white-quizz\');" ';
	bdDiv += ' class="colorCube" >';
	bdDiv += '<img src="templates/quizztheme/white-quizz.png" />';
	bdDiv += '</a>';
	
	bdDiv += '<a title="Yellow-contrast" onClick="changQuizzColor(\'yellow-contrast\');" ';
	bdDiv += ' class="colorCube" >';
	bdDiv += '<img src="templates/quizztheme/yellow-contrast.png" />';
	bdDiv += '</a>';

	bdDiv += '<a title="Blue-contrast" onClick="changQuizzColor(\'blue-contrast\');" ';
	bdDiv += ' class="colorCube" >';
	bdDiv += '<img src="templates/quizztheme/blue-contrast.png" />';
	bdDiv += '</a>';
	


	return bdDiv;

}

function changQuizzColor(t){
	
	var urlNc = 'index.php?action=edit&id='+ idPageHtml +'&changquizz=' + t;
	window.location.href = urlNc;

}

function displayParamsTeachEdit(){

	if($("#WinEditParamsTeach").length==0){
		
        var h = '<div id="WinEditParamsTeach" ';
		h += ' class="WinEditParamsTeach" >';
        
        h +=  '<div class="gjs-mdl-header" style="background:#808B96;color:white;" >';
        h += '<div class="gjs-mdl-title">Tools</div>';
        h += '<div class="gjs-mdl-btn-close gjs-mdl-btn-close-audio" ';
        h += ' onClick="closeAllEditWindows()" ';
        h += ' data-close-modal="">-</div>';
        h += '</div>';
        
        h += '<a class="tool-clean-data tool-base" onClick="displaySubProgressClean();" href="#" >';
        h += '<div class="trd" >Clean data</div>';
        h += '</a>';
        
        // reloadEditorAll();

        h += '<a class="tool-play tool-base" onClick="playAllinCore();" href="#" >';
        h += '<div class="trd" >Play</div>';
        h += '</a>';
        
        h += '<a class="tool-colors-editor tool-base" onClick="displayEditThemeParamsProject();" href="#" >';
        h += '<div class="trd" >Colors</div>';
        h += '</a>';

        h += '<a class="tool-colors-params tool-base" onClick="displayGlobalParams();" href="#" >';
        h += '<div class="trd" >Options</div>';
        h += '</a>';

        h += '<a class="tool-colors-sco tool-base" onClick="displaySubExportScorm();" href="#" >';
        h += '<div class="trd" >Export SCORM</div>';
        h += '</a>';

        h += '<a class="tool-glossary tool-base" onClick="displayGlossaryManager();" href="#" >';
        h += '<div class="trd" >Glossary</div>';
        h += '</a>';
        /*glossary32.png*/
        /*
        h += '<a class="tool-colors-template tool-base" onClick="displayEditTemplates();" href="#" >';
        h += '<div>Custom style</div>';
        h += '</a>';
        */
       
        h += '<a id="tool-colors-paste" name="tool-colors-paste" class="tool-colors-paste tool-base" onClick="pasteWindowsShow(false);" href="#" >';
        h += '<div class="trd" >Integration</div>';
        h += '</a>';
        
        h += '<a id="tool-quit" name="tool-quit" class="tool-quit tool-base" onClick="quitEditorAll();" href="#" >';
        h += '<div class="trd" >Quit</div>';
        h += '</a>';
        
		h += '</div>';
        
		return h;

	}
   	
}

function playAllinCore(){

    $('#btnsave').css("display","none");
    $('#loadsave').css("display","block");
    
    saveSourceFrame(true,true,0);

}

function reloadEditorAll(){
    
    $('.workingProcessSave').css("display","");
    loadFXObjectevent = true;
    saveSourceFrame(false,false,0);
    installFakeLoad();
    setTimeout(function(){  
        var location = window.location.href;
        location = location.replace("#page0","");
        location = location.replace("#","");
        location = location.replace("&fxload=1","");
        location += "&refresh=23";
        window.location.href = location;
    },3000);

}

function quitEditorAll(){
    globalQuitAction = true;
    $('#btnsave').css("display","none");
	$('#loadsave').css("display","block");
    saveSourceFrame(true,true,0);
}
var optionsGlobalPage = "";


function displayGlobalParams(){
	
	$('.ludimenu').css("z-index","2");
    
	if($("#pageEditGlobalParams").length==0){
		
		var bdDiv = '<div id="pageEditGlobalParams" class="gjs-mdl-container" >';
		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" style="max-width:575px;" >';
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title trd">Project options</div>';
		bdDiv += '<div class="gjs-mdl-btn-close" ';
        bdDiv += 'onClick="closeAllEditWindows()" data-close-modal="">⨯</div>';
		bdDiv += '</div>';
		
        bdDiv += '<div id="allParamsAreaload" class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;" >';
        bdDiv += '<p style="text-align:center;" ><br/><img src="img/cube-oe.gif" /><br/><br/></p>';
		bdDiv += '<br/>';
		bdDiv += '</div>';

		bdDiv += '<div id="allParamsArea" class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;display:none;" >';

        bdDiv += '<p class="trd" style="position:relative;margin-left:80px;" >Project image :</p>';
        
        bdDiv += '<div ';
        bdDiv += ' style="position:absolute;left:50%;top:60px;width:30%;height:79px;';
        bdDiv += 'max-height:80px;cursor:pointer;overflow:hidden;" >';
        bdDiv += '<img onClick="loadAnImage();" id="imgshow" src="img/classique/oel_back.jpg" ';
        bdDiv += ' style="position:absolute;width:100%;height:auto;cursor:pointer;" />';
        bdDiv += '</div>';

        bdDiv += '<img onClick="initProjectImage();" src="img/bross.png" ';
        bdDiv += ' style="position:absolute;right:70px;top:60px;width:22px;height:22px;cursor:pointer;" />';

        bdDiv += '<input id="dataimgglobal" style="display:none;" type="text" value="" />';

        bdDiv += addCheckOptions('Disable top button','T');
        bdDiv += addCheckOptions('Disable navigation in menu','N');
        bdDiv += addCheckOptions('Hide Menu in left','L');
        bdDiv += addCheckOptions('Save context game and exercise resolutions','P');
        bdDiv += addCheckOptions('Each attempt restart at the first page','R');
        bdDiv += addCheckOptions('Option full screen on video','F');
        bdDiv += addCheckOptions('Disable full menu page on start','M');

        bdDiv += '<div style="position:relative;margin:15px;" >';
        bdDiv += '<span class="trd" >&nbsp;&nbsp;Message&nbsp;page&nbsp;Ko&nbsp;:&nbsp;</span>';
        bdDiv += '<input style="position:relative;width:300px;" id="messageNoOk" type="text" value="" />';
        bdDiv += '</div>';

        bdDiv += '<br/>';
        bdDiv += '<div style="padding:25px;text-align:right;" >';
		bdDiv += '<input onClick="saveParamsGlobal()" ';
		bdDiv += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonSave trd" type="button" value="Save" /><br/>';
		bdDiv += '</div>';

		bdDiv += '</div>';

		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
		bdDiv += '</div>';
		$('body').append(bdDiv);

	}

	if($("#pageEditGlobalParams").length==1){
        windowEditorIsOpen = true;
        loadaFunction();
        getParamsGlobal();
		$('.ludimenu').css("display","none");
		$('#pageEditGlobalParams').css("display","");
	}

}

function loadAnImage(){
    filterGlobalFiles='';
    showFileManagerStudio2(13,'dataimgglobal','refreshAnImageGlobal');
}

function initProjectImage(){
    $('#dataimgglobal').val("");
    $('#imgshow').attr("src","img/classique/oel_back.jpg");
}

function refreshAnImageGlobal(){

    var imgA =$('#dataimgglobal').val();

    if (imgA==''||
    (imgA.toLowerCase().indexOf('.png')==-1
    &&imgA.toLowerCase().indexOf('.jpg')==-1
    &&imgA.toLowerCase().indexOf('.jpeg')==-1
    &&imgA.toLowerCase().indexOf('.gif')==-1
    &&imgA.toLowerCase().indexOf('cache')==-1)
    ){
        $('#dataimgglobal').val("");
        $('#imgshow').attr("src","img/classique/oel_back.jpg");
    }else{
        $('#imgshow').attr("src",$('#dataimgglobal').val());
    }
    $('.ui-widget-overlay').css("display","none");
	$('.workingProcessSave').css("display","none");
    $('.ludimenu').css("display","none");
    $('#pageEditGlobalParams').css("display","");

}

function loadOptGlobal(){

    optionsGlobalPage = optionsGlobalPage + "@@@@@@";
        
    var getObjD = optionsGlobalPage.split("@");

    var imgA = getObjD[0];
    $('#dataimgglobal').val(imgA);
    if (imgA==''||
    (imgA.toLowerCase().indexOf('.png')==-1
    &&imgA.toLowerCase().indexOf('.jpg')==-1
    &&imgA.toLowerCase().indexOf('.jpeg')==-1
    &&imgA.toLowerCase().indexOf('.gif')==-1)
    ) {
        $('#dataimgglobal').val("");
        $('#imgshow').attr("src","img/classique/oel_back.jpg");
    }else{
        $('#imgshow').attr("src",imgA);
    }
    var checkB = getObjD[1];
    if (checkB.indexOf("T")!=-1) {
        document.getElementById('checkboxT').checked = true;
    }else{
        document.getElementById('checkboxT').checked = false;
    }
    if (checkB.indexOf("N")!=-1) {
        document.getElementById('checkboxN').checked = true;
    }else{
        document.getElementById('checkboxN').checked = false;
    }
    if (checkB.indexOf("L")!=-1) {
        document.getElementById('checkboxL').checked = true;
    }else{
        document.getElementById('checkboxL').checked = false;
    }
    if (checkB.indexOf("P")!=-1) {
        document.getElementById('checkboxP').checked = true;
    }else{
        document.getElementById('checkboxP').checked = false;
    }
    if (checkB.indexOf("R")!=-1) {
        document.getElementById('checkboxR').checked = true;
    }else{
        document.getElementById('checkboxR').checked = false;
    }
    if (checkB.indexOf("F")!=-1) {
        document.getElementById('checkboxF').checked = true;
    }else{
        document.getElementById('checkboxF').checked = false;
    }
    if (checkB.indexOf("M")!=-1) {
        document.getElementById('checkboxM').checked = true;
    }else{
        document.getElementById('checkboxM').checked = false;
    }
    var messageNoOk = getObjD[2];
    if (messageNoOk!='') {
        $('#messageNoOk').val(messageNoOk);
    } else {
        $('#messageNoOk').val('Page incomplete');
    }
    
}

function getParamsGlobal(){
    $('#allParamsArea').css("display","none");
    $('#allParamsAreaload').css("display","");
	$.ajax({
		url : '../ajax/params/params-get.php?idteach=' + idPageHtmlTop,
		type: "POST",
		success: function(data,textStatus,jqXHR){
			optionsGlobalPage = data;

            setTimeout(function(){
                $('#allParamsArea').css("display","");
                loadOptGlobal();
                $('#allParamsAreaload').css("display","none");
            },500);
            
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			$('#pageEditGlobalParams').css("display","none");
            closeAllEditWindows();
		}
	});
}

function saveParamsGlobal(){

    $('#allParamsArea').css("display","none");
    $('#allParamsAreaload').css("display","");
	
    var optdata = $('#dataimgglobal').val() + "@";

    if(document.getElementById('checkboxT').checked){
		optdata += "T";
    }
    if(document.getElementById('checkboxN').checked){
		optdata += "N";
    }
    if(document.getElementById('checkboxL').checked){
		optdata += "L";
    }
    if(document.getElementById('checkboxP').checked){
		optdata += "P";
    }
    if(document.getElementById('checkboxR').checked){
		optdata += "R";
    }
    if(document.getElementById('checkboxF').checked){
		optdata += "F";
    }
    if(document.getElementById('checkboxM').checked){
		optdata += "M";
    }
    optdata += "@";
    optdata += $('#messageNoOk').val() + "@";

    $.ajax({
		url : '../ajax/params/params-get.php?step=1&idteach=' + idPageHtmlTop+'&opt='+optdata,
		type: "POST",
		success: function(data,textStatus,jqXHR){
			optionsGlobalPage = optdata;
            $('#pageEditGlobalParams').css("display","none");
            closeAllEditWindows();
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			$('#pageEditGlobalParams').css("display","none");
            closeAllEditWindows();
		}
	});

}

function addCheckOptions(label,code){

    var bdDiv = '<div style="position:relative;margin-left:20px;';
    bdDiv += 'width:440px;margin-bottom:4px;" >';
    bdDiv += '<label style="margin-top:1px;" class="el-switch el-switch-green" >';
    bdDiv += '<input id="checkbox'+code+'" type="checkbox" name="switch" >';
    bdDiv += '<span class="el-switch-style"></span>';
    bdDiv += '</label>';
    bdDiv += '<div class="margin-r trd" ';
    bdDiv += ' style="position:absolute;left:50px;top:0px;padding:5px;" >';
    bdDiv += '&nbsp;'+label+'</div>';
    bdDiv += '</div>';

    return bdDiv;

}

var optionsGlobalHistory;
var modeHistory = false;

function displayGlobalHistory(){
	
	$('.ludimenu').css("z-index","2");
    
	if($("#pageEditHistory").length==0){
		
		var bdDiv = '<div id="pageEditHistory" class="gjs-mdl-container" >';
		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" style="max-width:575px;" >';
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title trd" >History</div>';
		bdDiv += '<div class="gjs-mdl-btn-close" onClick="closeAllEditWindows()" data-close-modal="">⨯</div>';
		bdDiv += '</div>';
		
        bdDiv += '<div id="allHistoryLoad" class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;" >';
        bdDiv += '<p style="text-align:center;" ><br/><img src="img/cube-oe.gif" /><br/><br/></p>';
		bdDiv += '<br/>';
		bdDiv += '</div>';

		bdDiv += '<div id="allHistoryArea" class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;display:none;" >';

        bdDiv += '<div id="allHistoryTable" >';
        bdDiv += '</div>';
        
		bdDiv += '</div>';

		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
		bdDiv += '</div>';

		bdDiv += '<div id="panel-view-history" class="panel-view-history" style="display: none"></div>';
		bdDiv += '</div>';

		$('body').append(bdDiv);

	}

	if($("#pageEditHistory").length==1){
        
        windowEditorIsOpen = true;
		loadaFunction();
        getParamsHistory();
		$('.ludimenu').css("display","none");
		$('#pageEditHistory').css("display","");

	}

}

function getParamsHistory(){

    $('#allHistoryArea').css("display","none");
    $('#allHistoryLoad').css("display","");

	$.ajax({
		url : 'history_cache/get-history.php?idteach=' + idPageHtml,
		type: "POST",
        dataType : 'json',
		success: function(data,textStatus,jqXHR){
			optionsGlobalHistory = data;
            if(optionsGlobalHistory.history.length>0){
                installTableHistory();
                $('#allHistoryArea').css("display","");
                $('#allHistoryLoad').css("display","none");
            }else{
                $('#allHistoryArea').css("display","none");
                $('#allHistoryLoad').css("display","");
            }
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
            $('#allHistoryArea').css("display","none");
            $('#allHistoryLoad').css("display","");
		}
	});

}

function installTableHistory(){
    
    var tableH = "<table class='historyTable noselect' >";
    tableH += "<thead><tr>";
    tableH += "<th>Date</th>";
    tableH += "<th>Action</th>";
    tableH += "</tr>";
    tableH += "</thead>";
    tableH += "<tbody>";
    $.each(optionsGlobalHistory.history,function(){
        tableH += "<tr>";
        tableH += "<td style='text-align:center;' >" + nameFromHistory(this.data) + "</td>";
        tableH += "<td style='text-align:center;' >";
        tableH += "<a onClick='showFileHistoryInPanel(\""+this.folder+"\",\""+this.data+"\");' ";
        tableH += " style='cursor:pointer;' >";
        tableH += "<img src='img/view.png' /></a></td>";
        tableH += "</tr>";
    });
    tableH += "</tbody>";
    tableH += "</table>";

    $('#allHistoryTable').html(tableH);
}

function showFileHistoryInPanel(f,h){

    $('#allHistoryArea').css("display","none");
    $('#allHistoryLoad').css("display","");

    $.ajax({
		url : 'history_cache/' + f + '/' + h,
		type: "POST",
		success: function(data,textStatus,jqXHR){
            data = data.replace(/ href/g," dhref");
            data += "<div class=closecross onClick='closeAllEditWindows();' ></div>"
            var dh = h.replace(".html","");
            data += "<div class='installhisto trd' onClick='changHistoryLoad(\"" + dh + "\");' >Load</div>"

            $('#panel-view-history').html(data);
            $('#panel-view-history').css("display","");
            $('#allHistoryLoad').css("display","none");
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
            $('#allHistoryArea').css("display","none");
            $('#allHistoryLoad').css("display","");
		}
	});

}

function nameFromHistory(f) {
    
    f = cleText(f);
    f = f.replace(".html","");
    f = f + '-0-0-0-0';
    var getObjD = f.split("-");

    var year = parseInt(getObjD[0]);
    var month = parseInt(getObjD[1]);
    var day = parseInt(getObjD[2]);
    var hour = parseInt(getObjD[3]);
    var period = "AM";

    if (hour>12) {
        period = "PM";
        hour = hour - 12;
    }

    var  months = ["December" ,"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return day + '&nbsp;' + months[month] + '&nbsp;' + year + '&nbsp;&nbsp;<small>(' + hour + ':00' + period + ")</small>";

}

function changHistoryLoad(t){
	
	var urlNc = 'index.php?action=edit&id='+ idPageHtml +'&loadh=' + t;
	window.location.href = urlNc;

}

function displayEditTemplates(){
	
	$('.ludimenu').css("z-index","2");
    
	if($("#pageEditTemplates").length==0){
		
		var bdDiv = '<div id="pageEditTemplates" ';
        bdDiv += ' style="overflow:hidden;" ';
        bdDiv += ' class="gjs-mdl-container" >';
		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" style="max-width:575px;" >';
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title trd">Custom style</div>';
		bdDiv += '<div class="gjs-mdl-btn-close" onClick="closeAllEditWindows()" data-close-modal="">⨯</div>';
		bdDiv += '</div>';
		
        bdDiv += '<div id="allTemplatesAreaload" class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;" >';
        bdDiv += '<p style="text-align:center;" ><br/><img src="img/cube-oe.gif" /><br/><br/></p>';
		bdDiv += '<br/>';
		bdDiv += '</div>';

        bdDiv += '<div id="allTemplatesArea" class="gjs-am-add-asset" ';
		bdDiv += 'style="overflow:hidden;padding:25px;padding-bottom:0px;font-size:16px;display:none;" >';

        bdDiv += '</div>';

		bdDiv += '<div id="allTemplatesSave" class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;padding-top:0px;font-size:16px;display:none;" >';
        bdDiv += '<div style="padding:25px;padding-top:5px;padding-right:15px;text-align:right;" >';
		bdDiv += '<input onClick="saveTemplatesGlobal()" ';
		bdDiv += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonSave trd" type="button" value="Save" /><br/>';
		bdDiv += '</div>';

		bdDiv += '</div>';

		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
		bdDiv += '</div>';
		$('body').append(bdDiv);

	}

	if($("#pageEditTemplates").length==1){
        getTemplatesGlobal();
		$('.ludimenu').css("display","none");
		$('#pageEditTemplates').css("display","");
	}

}

var optionsTemplateCss = "";

function getTemplatesGlobal(){

    $('#allTemplatesSave').css("display","none");
    $('#allTemplatesArea').css("display","none");
    $('#allTemplatesAreaload').css("display","");

	$.ajax({
		url : '../ajax/params/template-get.php?idteach=' + idPageHtmlTop,
		type: "POST",
		success: function(data,textStatus,jqXHR){
			optionsTemplateCss = data;
            $('#allTemplatesSave').css("display","");
            $('#allTemplatesArea').css("display","");
            loadTemplatesGlobal();
            $('#allTemplatesAreaload').css("display","none");
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			$('#pageEditTemplates').css("display","none");
            closeAllEditWindows();
		}
	});
}

function loadTemplatesGlobal(){

    var txtArea = '<textarea withspellcheck="false" id="customcsstxt" ';
    txtArea += ' class="customcsstxt" rows="24" cols="67" >';
    txtArea += optionsTemplateCss;
    txtArea += "</textarea>";
    $('#allTemplatesArea').html(txtArea);

}

function saveTemplatesGlobal(){

    $('#allTemplatesSave').css("display","none");
    $('#allTemplatesArea').css("display","none");
    $('#allTemplatesAreaload').css("display","");
    var formData = {
        content : $('#customcsstxt').val()
    };
    $.ajax({
		url : '../ajax/params/template-get.php?step=1&idteach=' + idPageHtmlTop,
		type: "POST",data : formData,
		success: function(data,textStatus,jqXHR){
			optionsTemplateCss = $('#customcsstxt').val();
            $('#pageEditTemplates').css("display","none");
            closeAllEditWindows();
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			$('#pageEditTemplates').css("display","none");
            closeAllEditWindows();
		}
	});

}

function displayDevAdminParams(){
	
	$('.ludimenu').css("z-index","2");
    $('.topmenuabout').css("display","none");

	if ($("#pageDevAdminParams").length==0) {
		
		var bdDiv = '<div id="pageDevAdminParams" style="overflow:hidden;" class="gjs-mdl-container" >';

		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" style="max-width:575px;" >';
		
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title trd">Studio DevTools</div>';
		bdDiv += '<div class="gjs-mdl-btn-close" onClick="closeAllEditWindows()" data-close-modal="">⨯</div>';
		bdDiv += '</div>';

		listPagesCS = listPagesCS.replace(/;/g,' ');
        bdDiv += '<p style="position:relative;margin-left:20px;" >list [pages] : <small>(' + listPagesCS + ')</small></p>';
		
		var statusStr = "SESSIONADMIN";
		
		if (userStatusCS==3) { statusStr = "SESSIONADMIN"; }
		if (userStatusCS==1) { statusStr = "COURSEMANAGER"; }
		if (userStatusCS==11) { statusStr = "PLATFORM_ADMIN"; }
		
		bdDiv += '<p style="position:relative;margin-left:20px;" > user[status] : <small>' + statusStr + ' (' + userStatusCS + ')</small></p>';
		
		bdDiv += '<p style="position:relative;margin-left:20px;" > colorsPath : <small>' + colorsPath + '</small></p>';
		bdDiv += '<p style="position:relative;margin-left:20px;" > quizzThemePath : <small>' + quizzthemePath + '</small></p>';
		bdDiv += '<p><br/></p>';
		
		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
 
		bdDiv += '</div>';

		$('body').append(bdDiv);

	}

	if($("#pageDevAdminParams").length==1){
        getTemplatesGlobal();
		$('.ludimenu').css("display","none");
		$('#pageDevAdminParams').css("display","");
	}

}

function displayExportToManager(typeprint) {

	if ($("#ExportToManager").length==0) {

		var bdDiv = '<div id="ExportToManager" class="gjs-mdl-container" style="z-index:3;" >';
		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color">';
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title">Overview</div>';
		bdDiv += '<div class="gjs-mdl-btn-close gjs-mdl-btn-close-audio" onClick="if(oneExportOnly){closeProcessSlider();}" ';
		bdDiv += ' data-close-modal="">⨯</div>';
		bdDiv += '</div>';
		
		bdDiv += '<div class="gjs-am-add-asset innerExportToManager" ';
		bdDiv += 'style="padding:25px;font-size:16px;background:#f6f7f7;" >';
        
		bdDiv += '</div>';

		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
		bdDiv += '</div>';

		$('body').append(bdDiv);

	}

	if ($("#ExportToManager").length==1) {

		$('.ludimenu').css("z-index","2");
		$('#ExportToManager').css("display","");
        $('#ExportToManager').css("z-index",101);
		windowEditorIsOpen = true;
        loadaFunction();
        resizeExportToManager();
        traductAll();
        getPrintExportHtml();
	}

}

function resizeExportToManager() {
    
    var bheight = $("body").height() -130;
    $(".innerExportToManager").css("height",bheight + "px");

}

function getPrintExportHtml() {

    var bdD = '<p style="text-align:center;" ><br/>';
    bdD += '<img src="img/cube-oe.gif" /><br/><br/></p>';

    $('.innerExportToManager').html(bdD);

    var urA = '../ajax/teachdoc-print.php?generepdf=0&id=' + idPageHtmlTop;
    $.ajax({
        url : urA,
        type: "POST",
        success: function(data,textStatus,jqXHR){
            
            if(data.indexOf('.html')!=-1){
                var bheight = $("body").height() - 130;
                var h = '<iframe id="printWindows" name="printWindows" ';
                h += 'frameBorder=0 src="' + data + '" ';
                h += ' style="width:100%;height:94%;';
                h += 'z-index:1;margin-top:50px;" ';
                h += '></iframe>';

                h += '<a onClick="if(oneExportOnly){printFrameProcess()}" class="butonPrint" ></a>';
                
                h += '<a id="butonPdfShowFake" class="butonPdfShow" onClick="if(oneExportOnly){confirmGenerationExport();}" href="#" ></a>';

                h += '<a class="butonPdfWait"  >';
                h += '<div class="progressExportIcon" ><div class="pourcentExportIcon" ></div></div>';
                h += '</a>';

                h += '<a id="butonPdfShowReal" class="butonPdfShow" href="#" download ></a>';

                $('.innerExportToManager').html(h);
                
                $('.butonPdfWait').css("display","none");
                $('#butonPdfShowReal').css("display","none");
                $('#butonPdfShowFake').css("display","");

            }else{
                var bdD = '<p style="text-align:center;" ><br/>';
                bdD += 'Error<br/><br/></p>';
                $('.innerExportToManager').html(bdD);
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            var bdD = '<p style="text-align:center;" ><br/>';
            bdD += 'Error<br/><br/></p>';
            $('.innerExportToManager').html(bdD);
        }
    });
    
}

var oneExportOnly = true;

function confirmGenerationExport() {

    if (window.confirm("Are you sure you are launching an export ?")) {
        getPrintExportPdf();
    }

}

function getPrintExportPdf() {

    if (oneExportOnly) {

        $( ".pourcentExportIcon" ).css('width','1%');
        $('#butonPdfShowFake').css("display","none");
        $('.butonPdfWait').css("display","");
        var urA = '../ajax/teachdoc-print.php?generepdf=1&id=' + idPageHtmlTop;
        oneExportOnly = false;
        $.ajax({
            url : urA,
            type: "POST",
            success: function(data,textStatus,jqXHR){
                if(data.indexOf('.pdf')!=-1){
                    oneExportOnly = true;
                    $('.butonPdfWait').css("display","none");
                    $('#butonPdfShowReal').css("display","block");
                    $('#butonPdfShowReal').attr("href",data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
            }
        });
        
        $( ".pourcentExportIcon" ).animate({ width: "99%"
        },90000,function(){});
        
    }

}

function printFrameProcess() {

    window.frames["printWindows"].focus();
    window.frames["printWindows"].print();

}

function renderimgactive(var1,var2) {

    var h = '';
    
    h += '<div class="plugimageactive" >';
    h += '<img class="imageactive" src="img/imageactive.jpg" />';
    h += '</div>';

    h += '<span class=typesource >imageactive</span>';

    return h;

}



function displayImageActiveEdit(myObj){

	var ImageActiveObj = $(myObj);
	tmpObjDom = ImageActiveObj;
	
	var datatext1 = '';
	var datatext2 = '';
	var datatext3 = '';
	var ObjDivhref = ImageActiveObj.find('div');
	datatext1 = ObjDivhref.parent().find('span.datatext1').html();
	datatext2 = ObjDivhref.parent().find('span.datatext2').html();
	datatext3 = ObjDivhref.parent().find('span.datatext3').html();
	if(datatext1===undefined){datatext1 = '';}
	if(datatext2===undefined){datatext2 = '';}
	if(datatext3===undefined){datatext3 = '';}
	if(datatext1==="undefined"){datatext1 = '';}
	if(datatext2==="undefined"){datatext2 = '';}
	if(datatext3==="undefined"){datatext3 = '';}

	optionsIZA1 = datatext1;
	optionsIZA2 = datatext2;
	optionsIZA3 = datatext3;

	if ($("#ImageActiveEdit").length==0) {

		var bdDiv = '<div id="ImageActiveEdit" class="gjs-mdl-container" style="" >';
		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color">';
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title">Edition</div>';
		bdDiv += '<a id="logZA" class="buttonXY">0</a>';
		bdDiv += '<div class="gjs-mdl-btn-close gjs-mdl-btn-close-audio" onClick="closeAllEditWindows()" ';
		bdDiv += ' data-close-modal="">⨯</div>';
		bdDiv += '</div>';
		
		bdDiv += '<div class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;" >';
		
		console.log("load Interface ImgActiv");

		bdDiv += loadInterfaceImgActiv();
		bdDiv += loadImgActivTools();
		bdDiv += loadWindowImgActiv();
		
		bdDiv += '</div>';
		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
		bdDiv += '</div>';

		$('body').append(bdDiv);

	}

	if ($("#ImageActiveEdit").length==1) {
		
		strLinkString = ImageActiveObj.attr("datahref");
		var idm = Math.floor(Math.random() * Math.floor(200));
		tmpNameDom = 'tempnode' + idm;
		ImageActiveObj.attr("id",tmpNameDom);
        
		$('.ludimenu').css("z-index","2");
		$('#ImageActiveEdit').css("display","");
		$('#activeimg3').val("");
		$('#activeimg3').css("display","none");
		//Load image
		var hi = '<img id="reviewImg" style="position:relative;width:100%;opacity:0.7;z-index:97;" src="img/imageactive.jpg" />';
		if (isImageStudio(optionsIZA1)){
			hi = '<img id="reviewImg" style="position:relative;width:100%;opacity:0.8;z-index:97;" src="'+optionsIZA1+'" />';
			$('#activeimg3').val(optionsIZA1);
		}

		$('#zoneButtonRightZA').html(hi);

		//Load Areas
		loadExtrasZonesA();
		overvZAaction();
		
		$("#zoneButtonRightZA").css("width","87%");
        $("#zoneButtonRightZA").css("margin-left","0%");

		redimWorkAreaActiveImage();
		setTimeout(function(){ redimWorkAreaActiveImage(); },1000);

		windowEditorIsOpen = true;
		loadaFunction();
	}

}

function saveImageActiveEdit() {

	optionsIZA1 = $('#activeimg3').val();

	var rC = '<div class="plugimageactive" >';

	if (isImageStudio(optionsIZA1)){
    	rC += '<img class="imageactive" src="' + optionsIZA1 + '" />';
	} else {
		rC += '<img class="imageactive" src="img/imageactive.jpg" />';
	}
	rC += createHtmlFromZoneFromCodes();
    rC += '</div>';
    rC += '<span class=typesource >imageactive</span>';

	if (isImageStudio(optionsIZA1)){
		rC += '<span class=datatext1 >' + optionsIZA1 + '</span>';
	} else {
		rC += '<span class=datatext1 ></span>';
	}
	rC += '<span class=datatext2 >' + optionsIZA2 + '</span>';
	rC += '<span class=datatext3 >' + optionsIZA3 + '</span>';

	if(GlobalTagGrappeObj=='div'){
		rH = GplugSrcTop + rH + GplugSrcBottom;
	}

	var rH = GplugSrcT;
    rH = rH.replace("{content}",rC);
    if(GlobalTagGrappeObj=='div'){
		rH = GplugSrcTop + rH + GplugSrcBottom;
	}

	setAbstractObjContent(rH);
	
	closeAllEditWindows();
	
	$('.ludimenu').css("z-index","1000");
	saveSourceFrame(false,false,0);

}

function loadAnActiveImage(){
    showFileManagerStudio2(13,'activeimg3','refreshAnActiveImageGlobal');
}

function refreshAnActiveImageGlobal(){

	var imgA = $('#activeimg3').val();

    if (isImageStudio(imgA)==false){
        $('#activeimg3').val("");
        $('#reviewImg').attr("src","img/imageactive.jpg");
    }else{
        $('#reviewImg').attr("src",imgA);
    }
	
	$('.ui-widget-overlay').css("display","none");
	$('.workingProcessSave').css("display","none");
    $('.ludimenu').css("display","none");
    $('#pageEditGlobalParams').css("display","");
	
}

var currentDroppable = false;
var GshiftX = 0;
var GshiftY = 0;
var idZA = 0;
var currentidZA = -1;

var optionsIZA1 = '';
var optionsIZA2 = '';
var optionsIZA3 = '';

//Center image
function loadInterfaceImgActiv() {

	var i = '<div id="zoneButtonRightZA" class="zoneButtonRightZA noselect">';
    i += '</div>';
	return i;

}

//Tools
function loadImgActivTools() {

	var i = '<div class="zoneButtonLeftZA noselect">';
    i += '<a onclick="addZoneToZoneA()" class="buttonZA">+</a>';
    i += '<a onclick="loadAnActiveImage()" class="buttonZAloadImage"></a>';
    
    i += '<input id=activeimg3 class=activeimg3 />';

	i += '<input onClick="saveImageActiveEdit()" ';
	i += ' class="gjs-one-bg btnZIA ludiButtonSave trd" type="button" value="Save" /><br/>';
	i += '</div>';

	return i;

}

//Windows events
function loadWindowImgActiv() {

	var interf = '<div class="actioneditorwin">';

	interf += '<div class="actioneditorwintitle">Edition';
	interf += '<div class="actioneditorwinclose" onclick="closeActionEditZA()">X</div>';
	interf += '</div>';

	interf += '<select name="actionZASelect" id="actionZASelect" class="actionZASelect">';
	interf += '<option value="0">No action</option>';
	interf += '<option value="1">Display message</option>';
	interf += '<option value="2">Next page</option>';
	interf += '<option value="3">Prev page</option>';
	interf += '<option value="4">Display image</option>';
    interf += '<option value="5">Speech Bubble</option>';
	interf += '</select>';


    interf += '<div class="checkCell01 noselect"></div>';
    interf += '<div class="checkCell02 noselect"></div>';
    interf += '<div class="checkCell03 noselect"></div>';

	interf += '<div class="checkTyp01 noselect">';
	interf += '<input type="radio" value="0" id="typeZA01" name="typeZA">';
	interf += '<label class="noselect" for="typeZA01">Transparent</label>';
	interf += '</div>';


	interf += '<div class="checkTyp03 noselect">';
	interf += '<input type="radio" value="2" id="typeZA03" name="typeZA">';
	interf += '<label class="noselect" for="typeZA03">Big cursor</label>';
	interf += '</div>';
    
    interf += '<img class="checkImgTyp03 noselect" src="img/classique/cursor.svg" />';


    interf += '<div class="checkTyp04 noselect">';
	interf += '<input type="radio" value="3" id="typeZA04" name="typeZA">';
	interf += '<label class="noselect" for="typeZA04">Small cursor</label>';
	interf += '</div>';

    interf += '<img class="checkImgTyp04" src="img/classique/cursor.svg" />';

    /* line 2 */

    interf += '<div class="checkCell04 noselect"></div>';
    interf += '<div class="checkCell05 noselect"></div>';
    interf += '<div class="checkCell06 noselect"></div>';

	interf += '<div class="checkTyp02 noselect" >';
	interf += '<input type="radio" value="1" id="typeZA02" name="typeZA">';
	interf += '<label class="noselect" for="typeZA02">MapPoint</label>';
	interf += '</div>';

    interf += '<img class="checkImgTyp02 noselect" src="img/classique/point-circle.svg" />';

    interf += '<div class="checkTyp05 noselect" >';
	interf += '<input type="radio" value="4" id="typeZA05" name="typeZA">';
	interf += '<label class="noselect" for="typeZA05">Pointing left</label>';
	interf += '</div>';

    interf += '<img class="checkImgTyp05 noselect" src="img/classique/pointing-left.svg" />';

	interf += '<textarea id="actionZAtextArea" name="actionZAtextArea" class="actionZAtextArea" rows="3" cols="46"></textarea>';

	interf += '<input id="urlextraimg" class="form-control extraimg" style="position:absolute;left:10px;top:85px;width:80%;display:none;" />';
	interf += '<a onclick="showFileManagerToInput(100);" style="position:absolute;right:15px;top:85px;display:none;" class="btn btn-info extraimg" >...</a>';

	interf += '<a class="btn btn-info actionBtnApplyZA ludiButtonSave trd" onclick="applyActionEditZA()">Apply</a>';

    interf += '<a class="actionBtndeleteZA" onclick="applyActionDeleteZA()">';
    interf += '<img src="icon/delete-icon-24.png" /></a>';

	interf += '</div>';

    return interf;

}

//Load Areas from data
function loadExtrasZonesA() {

    if (optionsIZA2.indexOf('$')!=-1) {
        
        optionsIZA3 = optionsIZA3 + '$$$$$$';

        var ArrayObjects = optionsIZA2.split('$');
        var ArrayOptions = optionsIZA3.split('$');

        var i = 0;

        for (i = 0; i < ArrayObjects.length; i++) {
        
            var objInfos = ArrayObjects[i];
            var objValues = ArrayOptions[i];

            if (objInfos.indexOf('|')!=-1) {
                var objdet = objInfos.split('|');
                addZoneToZoneAFromOpt2(objdet[1],objdet[2],objValues);
            }
            
            document.getElementById('zoneButtonRightZA').ondragstart = function() { return false; };
            document.getElementById('zoneButtonRightZA').onmouseup = function(event) { currentDroppable = false; };

        }

    }

    document.getElementById('zoneButtonRightZA').addEventListener('mousemove',calculCoordZA);

}

//Create Render from data
function redimWorkAreaActiveImage() {
    
    var bi = $("body").height()-100;
    var hi = $("#reviewImg").height();

    if (hi>bi){
        $("#zoneButtonRightZA").css("width","70%");
        $("#zoneButtonRightZA").css("margin-left","10%");
    }

}

//Create Render from data
function createHtmlFromZoneFromCodes() {

    var renderH = "";

    if (optionsIZA2.indexOf('$')!=-1) {
        
        optionsIZA3 = optionsIZA3 + '$$$$$$';

        var ArrayObjects = optionsIZA2.split('$');
        var ArrayOptions = optionsIZA3.split('$');

        var i = 0;
        for (i = 0; i < ArrayObjects.length; i++) {

            var objInfos = ArrayObjects[i];
            var objValues = ArrayOptions[i];

            if (objInfos.indexOf('|')!=-1) {
                var objdet = objInfos.split('|');
                var lx = objdet[1];
                var ty = objdet[2];
                var para = "<div class='overViewZAedition' style='left:" + lx + "%;top:" + ty + "%;' ></div>";
                renderH += para;
            }
            
        }

    }

    return renderH;


}

//Install Area from code
function addZoneToZoneAFromOpt2(l,t,ovals) {
    
    ovals = ovals + '||||||';
    var objparam = ovals.split('|');

    var actZASelect = objparam[1];
    var zAtextArea = cleTextAct(objparam[2]);
    var typeZA = objparam[3];

    var para = "<div id='paramsZA' class='paramsZA' onClick='launchActionEditZA(" + idZA + ");' ></div>";
    para += "<div class='decoEditZA' ></div>";
    var divH = "<div action='"+actZASelect+"' typeZA='"+typeZA+"' zatext='"+zAtextArea+"' ";
    divH += " id='areaZA" + idZA + "' style='left:" + l + "%;top:" + t + "%;' ";
    divH += " class='areaZA noselect' >" + para + "</div>";
    $('#zoneButtonRightZA').append(divH);

    eventsZoneZA(idZA);
    idZA++;
    
}

//Add a new area
function addZoneToZoneA(){
    
    var para = "<div id='paramsZA' class='paramsZA' onClick='launchActionEditZA(" + idZA + ");' ></div>";

    $('#zoneButtonRightZA').append("<div id='areaZA" + idZA + "' typeZA=0 style='left:5%;top:5%;' class='areaZA noselect' >"+para+"</div>");
    document.getElementById('zoneButtonRightZA').addEventListener('mousemove',calculCoordZA);
    document.getElementById('zoneButtonRightZA').ondragstart = function() { return false; };
    document.getElementById('zoneButtonRightZA').onmouseup = function(event) { currentDroppable = false; };
    eventsZoneZA(idZA);
    idZA++;

}

function eventsZoneZA(i){

    var ZA = document.getElementById('areaZA' + i);
    ZA.onmousedown = function(event) {
        if (isClickOnArea(i) ) {
            currentDroppable = true;
            currentidZA = i;
        }
    };
    ZA.onmouseup = function(event) {
        currentDroppable = false;
        currentidZA = -1;
        
    };
    ZA.ondragstart = function() {
        return false;
    };

}

function isClickOnArea(i) {

    var posArea = $('#areaZA'+i).offset();

    var yObjCtr = posArea.top;
    yObjCtr = document.getElementById('areaZA' + i).offsetTop;

    var ycoordCtr = 0
    var documentHeight = $('#zoneButtonRightZA').height();

	var ycoordCtr = (ycoordPour * documentHeight) / 100;

    if (ycoordCtr<yObjCtr) {
        return false;
    }else{
        return true;
    }

}

//Edit action behavior
function launchActionEditZA(i) {

    $('.actioneditorwin').css("display",'block');

    var actZASelect = $('#areaZA' + i).attr("action");
    if (actZASelect=='') { actZASelect = 0; }
    if (actZASelect === undefined) { actZASelect = 0; }

    var zAtextArea = $('#areaZA' + i).attr("zatext");
    if (zAtextArea === undefined) { zAtextArea = ''; }
    if (zAtextArea == 'undefined') { zAtextArea = ''; }

    $('#actionZASelect').val(actZASelect);

    $('#urlextraimg').val('');
    $('#actionZAtextArea').val('');

    var typeZA = $('#areaZA' + i).attr("typeZA");
    if (typeZA === undefined) { typeZA = 0; }
    if (typeZA == 'undefined') { typeZA = 0; }
    if (typeZA == '') { typeZA = 0; }
    typeZA = parseInt(typeZA);

    launchActionCheckZA(typeZA);

    $('#actionZASelect').on('change', function() {
        arrangeActionEditZA();
    });
    
    if (actZASelect==4) {
        zAtextArea = zAtextArea.replace(/S!L/g,'/');
        $('#urlextraimg').val(zAtextArea);
    } else {
        $('#actionZAtextArea').val(zAtextArea);
    }

    currentidZA = i;
    
    arrangeActionEditZA();

}

var xcoord = 0;
var ycoord = 0;

var xcoordPour = 0;
var ycoordPour = 0;

function calculCoordZA(e) {

    if( !e ) {
      if( window.event ) {
        //Internet Explorer
        e = window.event;
      } else {
        //total failure, we have no way of referencing the event
        return;
      }
    }
    if( typeof( e.pageX ) == 'number' ) {
      //most browsers
      xcoord = e.pageX;
      ycoord = e.pageY;
    } else if( typeof( e.clientX ) == 'number' ) {
        
      //Internet Explorer and older browsers
      //other browsers provide this, but follow the pageX/Y branch
      
      xcoord = e.clientX;
      ycoord = e.clientY;
      
      var badOldBrowser = ( window.navigator.userAgent.indexOf( 'Opera' ) + 1 ) ||//**
       ( window.ScriptEngine && ScriptEngine().indexOf( 'InScript' ) + 1 ) ||//**
       ( navigator.vendor == 'KDE' );//**
       
      if( !badOldBrowser ) {//**
        if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {//**
          //IE 4, 5 & 6 (in non-standards compliant mode)
          xcoord += document.body.scrollLeft;
          ycoord += document.body.scrollTop;
        } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {//**
          //IE 6 (in standards compliant mode)
          xcoord += document.documentElement.scrollLeft;//**
          ycoord += document.documentElement.scrollTop;//**
        }
      }
      
    } else {
      //total failure, we have no way of obtaining the mouse coordinates
      return;
    }
    var e_posx = 0;
    var e_posy = 0;
    var obj = this;
    //get parent element position in document
    if (obj.offsetParent){
        do { 
            e_posx += obj.offsetLeft;
            e_posy += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    //var decX = 
    xcoord = (xcoord - e_posx);
    ycoord = (ycoord - e_posy);
   
    var documentWidth = $('#zoneButtonRightZA').width();
	var documentHeight = $('#zoneButtonRightZA').height();

    var pourcX = (xcoord / documentWidth)  * 100;
	var pourcY = (ycoord / documentHeight) * 100;
    
    pourcX = Math.round(pourcX * 10) / 10;
    pourcY = Math.round(pourcY * 10) / 10;
    if (pourcX>99) {pourcX = 99; }
    if (pourcY>99){ pourcY = 99; }

    xcoordPour = pourcX;
    ycoordPour = pourcY;

    var xCoordLab = parseInt(xcoord);
    if (xCoordLab<0) {xCoordLab = 0;}

    if (xCoordLab<10) {
        xCoordLab = "00" + xCoordLab;
    }else{
        if (xCoordLab<100) {
            xCoordLab = "0" + xCoordLab;
        }
    }

    var yCoordLab = parseInt(ycoord);

    if (yCoordLab<0) {yCoordLab = 0;}

    if (yCoordLab<10) {
        yCoordLab = "00" + yCoordLab;
    }else{
        if (yCoordLab<100) {
            yCoordLab = "0" + yCoordLab;
        }
    }

    $('#logZA').html('X:' + xCoordLab + '&nbsp;' + 'Y:' + yCoordLab );
    if (currentDroppable&&currentidZA!=-1) {
        var ZA = document.getElementById('areaZA'+currentidZA);
        ZA.style.left = (pourcX -5) + '%';
        ZA.style.top = (pourcY-5) + '%';
        calculZAdata();
    }
  
}

function calculZAdata() {

    var finaldata = "";

    $( ".areaZA" ).each(function( index ) {
        
        var documentWidth = $('#zoneButtonRightZA').width();
        var documentHeight = $('#zoneButtonRightZA').height();
        
        var position = $( this ).position();
        var idObj = $( this ).attr("id");
        idObj = idObj.replace("areaZA","");
        var pourcX = (position.left / documentWidth)  * 100;
        var pourcY = (position.top / documentHeight) * 100;
        
        pourcX = Math.round(pourcX * 10) / 10;
        pourcY = Math.round(pourcY * 10) / 10;

        finaldata += idObj + '|' + pourcX + '|' + pourcY;
        finaldata += '$';
    
    });
    
    optionsIZA2 = finaldata;
    
    calculZAaction();

}

function calculZAaction() {

    var finaldata = "";

    $( ".areaZA" ).each(function( index ) {
        
        var idObj = $( this ).attr("id");
        idObj = idObj.replace("areaZA","");
        
        var actStr = $( this ).attr("action");
        if (actStr=='') { actStr = 0; }
        if (actStr === undefined) { actStr = 0; }

        var zAtextArea = $( this ).attr("zatext");
        zAtextArea = cleTextAct(zAtextArea);

        var typeZA = $( this ).attr("typeZA");
        if (typeZA === undefined) { typeZA = 0; }
        if (typeZA == 'undefined') { typeZA = 0; }
        if (typeZA == '') { typeZA = 0; }

        var hDeco = "";
        if (typeZA==2) {
            hDeco = "<span>Cursor</span>"
        }
        $(this).find("decoEditZA").html(hDeco);

        finaldata += idObj + '|' + actStr + '|' + zAtextArea + '|' + typeZA;
        finaldata += '$';
    
    });
    
    optionsIZA3 = finaldata;

}

function overvZAaction() {

    $( ".areaZA" ).each(function( index ) {
        
        var typeZA = $( this ).attr("typeZA");
        if (typeZA === undefined) { typeZA = 0; }
        if (typeZA == 'undefined') { typeZA = 0; }
        if (typeZA == '') { typeZA = 0; }

        var hDeco = "";
        if (typeZA==1) {
            hDeco = "url(img/classique/point-circle.svg)";
        }
        if (typeZA==2) {
            hDeco = "url(img/rendcursor.png)";
        }
        if (typeZA==3) {
            hDeco = "url(img/rendcursor.png)";
        }
        if (typeZA==4) {
            hDeco = "url(img/pointing-left.png)";
        }
        $(this).find(".decoEditZA").css("background-image",hDeco);
        

    });

}

function closeActionEditZA() {

    currentDroppable = false;
    $('.actioneditorwin').css("display",'none');
    
}

//Update Actions
function arrangeActionEditZA() {

    var actZASelect = $('#actionZASelect').val();

    $('.extraimg').css("display","none");
    $('#actionZAtextArea').css("display","none");

    if (actZASelect==4) {
        $('.extraimg').css("display","block");
    }
    if (actZASelect==1||actZASelect==5) {
        $('#actionZAtextArea').css("display","block");
    }

}

//Load parameters check
function launchActionCheckZA(typeZA) {

    $('#typeZA01').prop("checked", false);
    $('#typeZA02').prop("checked", false);
    $('#typeZA03').prop("checked", false);
    $('#typeZA04').prop("checked", false);
    $('#typeZA04').prop("checked", true);

    if (typeZA==0) {
        $('#typeZA01').prop("checked", true);    
    } 
    if (typeZA==1) {
        $('#typeZA02').prop("checked", true);
    }
    if (typeZA==2) {
        $('#typeZA03').prop("checked", true);
    }
    if (typeZA==3) {
        $('#typeZA04').prop("checked", true);
    }
    if (typeZA==4) {
        $('#typeZA05').prop("checked", true);
    }
}

//Load parameters
function launchActionEditZA(i) {

    $('.actioneditorwin').css("display",'block');

    var actZASelect = $('#areaZA' + i).attr("action");
    if (actZASelect=='') { actZASelect = 0; }
    if (actZASelect === undefined) { actZASelect = 0; }

    var zAtextArea = $('#areaZA' + i).attr("zatext");
    if (zAtextArea === undefined) { zAtextArea = ''; }
    if (zAtextArea == 'undefined') { zAtextArea = ''; }

    $('#actionZASelect').val(actZASelect);

    $('#urlextraimg').val('');
    $('#actionZAtextArea').val('');

    var typeZA = $('#areaZA' + i).attr("typeZA");
    if (typeZA === undefined) { typeZA = 0; }
    if (typeZA == 'undefined') { typeZA = 0; }
    if (typeZA == '') { typeZA = 0; }
    typeZA = parseInt(typeZA);

    launchActionCheckZA(typeZA);

    $('#actionZASelect').on('change', function() {
        arrangeActionEditZA();
    });
    
    if (actZASelect==4) {
        zAtextArea = zAtextArea.replace(/S!L/g,'/');
        $('#urlextraimg').val(zAtextArea);
    } else {
        $('#actionZAtextArea').val(zAtextArea);
    }

    currentidZA = i;
    
    arrangeActionEditZA();

}

function applyActionEditZA() {

    $('.actioneditorwin').css("display",'none');

    var actZASelect = $('#actionZASelect').val();

    var zAtextArea = $('#actionZAtextArea').val();
    zAtextArea = zAtextArea.replace(/\n/g,' ');
    zAtextArea = zAtextArea.replace(/@/g,'');
    
    zAtextArea = cleTextAct(zAtextArea);

    if (actZASelect==4) {
        zAtextArea =  $('#urlextraimg').val();
        zAtextArea = zAtextArea.replace(/\//g,'S!L');
    }

    var typeZA = $('input:radio[name=typeZA]:checked').val();

    $('#areaZA' + currentidZA).attr("action",actZASelect);
    $('#areaZA' + currentidZA).attr("zatext",zAtextArea);
    $('#areaZA' + currentidZA).attr("typeZA",typeZA);
    
    calculZAaction();
    overvZAaction();
    currentDroppable = false;

}

function applyActionDeleteZA() {

    $('#areaZA' + currentidZA).remove();
    calculZAdata();
    calculZAaction();
    overvZAaction();
    $('.actioneditorwin').css("display",'none');
    currentDroppable = false;

}

var typeFiletManaged = '';
var srcInputManaged = '';
var ftcBackManaged = '';
var dataSelectImgManaged = '';
var selectFileNameManaged = '';

//showFileManagerStudio(13,'activeimg3','refreshAnActiveImageGlobal');

function showFileManagerStudio2(typeFile,idF,ftcBack) {
    
    srcInputManaged = idF;
    ftcBackManaged = ftcBack;
    typeFiletManaged = typeFile;
    
    // Option dialogue
    if (ftcBack=='refreshMyAvatarDia') {

    }
    displayFileManagerSlider(typeFile);
    
}

function displayFileManagerSlider(typeFile) {

	if ($("#FileManagerStudio").length==0) {

		var bdDiv = '<div id="FileManagerStudio" class="gjs-mdl-container" style="z-index:3;" >';
		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color">';
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title">File manager</div>';
		bdDiv += '<div class="gjs-mdl-btn-close gjs-mdl-btn-close-audio" onClick="closeProcessSlider()" ';
		bdDiv += ' data-close-modal="">⨯</div>';
		bdDiv += '</div>';
		
		bdDiv += '<div class="gjs-am-add-asset innerFileManagerStudio" ';
		bdDiv += 'style="padding:25px;font-size:16px;background:#f6f7f7;" >';
        bdDiv += innerFileManagerSlider();
		bdDiv += '</div>';
        
		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
		bdDiv += '</div>';

		$('body').append(bdDiv);

	}

	if ($("#FileManagerStudio").length==1) {

		$('.ludimenu').css("z-index","2");
		$('#FileManagerStudio').css("display","");
        $('#FileManagerStudio').css("z-index",101);
        
        $('.media-alarm').css("display",'none');

        $('.attachments-wrapper').css("display","block");
        $('.attachments-wrapper-files').css("display","none");
        $('.attachments-wrapper-upload').css("display","none");

        // Button
        if (typeFile==13||typeFile==23) {
            $('.select-process-slider').css("display","");
        } else {
            $('.select-process-slider').css("display","none");
        }
        
        var collDat = '';
        for(var itemImg in baseCollImgs) {
            collDat += createThumbAccessSlider(baseCollImgs[itemImg].src,0,'');
        }
        $('.attachments-wrapper').html(collDat);
        
        if (typeFile==23) {
            $('.attachments-wrapper').css("display","none");
            $('.attachments-wrapper-upload').css("display","none");
            $('.attachments-wrapper-files').css("display","block");
            loadDataFileTab();
        }

		windowEditorIsOpen = true;
        loadaFunction();
        resizeFileManagerSlider();
        traductAll();
        loadInfosMedias();
        loadButtonSaveMedia();
        $('.bloc-img-manager').css("display","");
        initUploadFileInStudio();

	}

}

function resizeFileManagerSlider() {
    
    var bheight = $("body").height() -130;
    $(".innerFileManagerStudio").css("height",bheight + "px");

}

function innerFileManagerSlider() {

    var bdDiv = '<div class="media-frame-menu" >';
    bdDiv += '<div class="media-menu">';
    bdDiv += '<a class="media-menu-item trd" >Insert media</a>';
    bdDiv += '<div role="presentation" class="separator"></div>';

    bdDiv += '<a onClick="uploadFileInSlider();" ';
    bdDiv += 'class="media-menu-item trd" >From chamilo</a>';

    bdDiv += '<a onClick="directUploadFileInStudio();" ';
    bdDiv += 'class="media-menu-item trd" >Direct Upload</a>';

    bdDiv += '<div onMouseOver="hideMediaAlarm()" onClick="hideMediaAlarm()" class="media-alarm trad "></div>';

    bdDiv += '<div class="media-details">';

    bdDiv += '<div class="mediainfos-title mediainfos-line">---</div>';
    bdDiv += '<div class="mediainfos-width mediainfos-line">---</div>';
    bdDiv += '<div class="mediainfos-height mediainfos-line">---</div>';

    bdDiv += '<div class="mediainfos-delete"></div>';

    bdDiv += '</div>';

    bdDiv += '</div>';
    bdDiv += '</div>';

    bdDiv += '<div class="attachments-wrapper ludiscroolminimal">';
    bdDiv += '</div>';

    bdDiv += '<div id="attachments-wrapper-files" class="attachments-wrapper-files ludiscroolminimal">';
    bdDiv += '<p style="text-align:center;" ><br/><img src="img/cube-oe.gif" /><br/><br/></p>';
    bdDiv += '</div>';

    bdDiv += '<div id="attachments-wrapper-upload" class="attachments-wrapper-upload ludiscroolminimal">';
    bdDiv += '<p style="text-align:center;" ><br/><img src="img/cube-oe.gif" /><br/><br/></p>';
    bdDiv += '</div>';

    bdDiv += '<input id="urlFileInSlider" style="display:none;" />';

    bdDiv += '<div class="select-process-slider" >';

    
    bdDiv += '</div>';

    return bdDiv;

}

function loadButtonSaveMedia(){

    var bdDiv = '<input onClick="selectProcessSlider()" ';
    bdDiv += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
    bdDiv += ' class="gjs-one-bg ludiButtonSave" type="button" value="Select" />';
    $('.select-process-slider').html(bdDiv);

}

function loadInfosMedias() {

    if (dataSelectImgManaged=='') {
        
        $(".mediainfos-title").html("-.-.-");
        $(".mediainfos-width").html("-.-.-");
        $(".mediainfos-height").html("-.-.-");
        $(".mediainfos-delete").html("");

    } else {

        $(".mediainfos-title").html('<strong><u>'+getFileNameByUrl(dataSelectImgManaged)+'</u></strong>');

        if (isImageFile(dataSelectImgManaged)) {
                var img = new Image();
            img.onload = function() {
                $(".mediainfos-width").html("width : " + this.width + "px");
                $(".mediainfos-height").html("height : " + this.height + "px");
            };
            img.src = dataSelectImgManaged;
        }

        if (dataSelectImgManaged.indexOf('.mp3')!=-1) {
            $(".mediainfos-width").html("-.-.-");
            $(".mediainfos-height").html("-.-.-");
        }
        if (dataSelectImgManaged.indexOf('.mp4')!=-1) {
            $(".mediainfos-width").html("-.-.-");
            $(".mediainfos-height").html("-.-.-");
        }
        if (dataSelectImgManaged.indexOf('.pdf')!=-1) {
            $(".mediainfos-width").html("-.-.-");
            $(".mediainfos-height").html("-.-.-");
        }
        if (dataSelectImgManaged.indexOf('img/classique')==-1
            &&dataSelectImgManaged.indexOf('img_cache')!=-1 ) {
            var imgc = '<a onclick="deleteOneFileManger()" style=""><img src="icon/delete-icon-24.png" /></a>';
            $(".mediainfos-delete").html(imgc);
        }
       
    }
    
}

function deleteOneFileManger() {

    if (dataSelectImgManaged=='') {

        $(".mediainfos-delete").html('<span>!</span>');
        
    } else {

        $(".mediainfos-delete").html('<img style="margin:4px;" src="img/loadsave.gif" />');

        var formData = {
            id : idPageHtmlTop,
            ur : encodeURI(dataSelectImgManaged)
        };

        $.ajax({
            url : '../ajax/ajax.del-img.php?id=' + formData.id + '&ur=' + formData.ur,
            type: "POST",data : formData,
            success: function(data,textStatus,jqXHR){

                //alert(data);

                if(data.indexOf("error")==-1&&data.indexOf("KO")==-1&&data.indexOf("OK")!=-1){
                    
                    $(".bloc-img-manager").each(function(index){
                        var obj = $(this);
                        var datasrc = obj.attr('datasrc');
                        if (datasrc==dataSelectImgManaged) {
                            obj.css('display','none');
                        }
                    });

                    $(".mediainfos-delete").html('<span></span>');
                    
                    dataSelectImgManaged = '';
                    selectFileNameManaged = '';
                    
                    loadInfosMedias();

                } else {
                    
                    showMediaAlarm('Error');

                }
                
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                pushImageToColl(file.url);
            }
        });

    }

}

function selectThumbSlider(obj) {

    var objS = $(obj);
    $(".bloc-img-view").removeClass("bloc-img-view-active");
    objS.find(".bloc-img-view").addClass("bloc-img-view-active");
    dataSelectImgManaged = objS.attr("dataSrc");
    loadInfosMedias();
}

//Select Save
function selectProcessSlider() {
    
    //alert(dataSelectImgManaged);

    if (dataSelectImgManaged=='') {
        return false;
    }
    if (typeFiletManaged==13) {
        $('#'+srcInputManaged).val(dataSelectImgManaged);
        if (ftcBackManaged!=''&&ftcBackManaged!=0) {
            window[ftcBackManaged]();
        }
    }
    
    //Download
    if (typeFiletManaged==23) {
        $('#'+srcInputManaged).val(dataSelectImgManaged);
        if (ftcBackManaged!=''&&ftcBackManaged!=0) {
            window[ftcBackManaged]();
        }
        directToRender(dataSelectImgManaged);
    }
    
    $('#FileManagerStudio').css("display","none");

}

function closeProcessSlider() {
    
    if (typeFiletManaged==13) {
        $('#FileManagerStudio').css("display","none");
    } else {
        closeAllEditWindows();
    }

}

//UPLOAD FROM CHAMILO
function uploadFileInSlider() {
    
    if (typeFiletManaged==13) {
        showFileManagerStudio(13,'urlFileInSlider','refreshAfterAnUpload');
        $('.attachments-wrapper').css("display","block");
        $('.attachments-wrapper-files').css("display","none");
        $('.attachments-wrapper-upload').css("display","none");
    }

    if (typeFiletManaged==23) {
        showFileManagerStudio(13,'urlFileInSlider','refreshAfterAnUpload');
        $('.attachments-wrapper').css("display","none");
        $('.attachments-wrapper-files').css("display","block");
        $('.attachments-wrapper-upload').css("display","none");
    }

    $('.media-alarm').css("display",'none');

}

function showMediaAlarm(m){
    $('.media-alarm').css("display",'block');
    $('.media-alarm').css("left",'10px');
    $('.media-alarm').animate({
        left: '205px'
    },300);
    $('.media-alarm').html(m);
}

function hideMediaAlarm() {

    $('.media-alarm').animate({
        left: "0px"
    },300,function(){
        $('.media-alarm').css("display",'none');
    });

}

function pushToCollAfterSelect() {

    var fileurl = dataSelectImgManaged;

    if (getAutorizedExtends(fileurl)) {
        if (isImageFile(fileurl) ) {
            if (isImageStudio(fileurl)) {
                pushImageToColl(fileurl);
            }
        }
    }

}

//UPLOAD DIRECT
function directUploadFileInStudio() {

    $('.attachments-wrapper').css("display","none");
    $('.attachments-wrapper-files').css("display","none");
    $('.attachments-wrapper-upload').css("display","block");

}

function initUploadFileInStudio() {
    
    setTimeout(function(){
        var sty = "style='overflow:hidden;margin:10px;margin-left:5%;margin-right:5%;width:90%;'";
        $('.attachments-wrapper-upload').html("<iframe "+sty+" scrolling='no'  height='350' frameBorder='0' src='import-project/import-file.php?id="+ idPageHtmlTop +"&action=step1&typefile="+ typeFiletManaged +"' ></iframe>");    
    },500);

}

// Refresh after upload
function refreshAfterAnUpload() {

    $(".bloc-img-view").removeClass("bloc-img-view-active");

	var imgA = $('#urlFileInSlider').val();
    
    // Images
    if (typeFiletManaged==13) {

        if (isImageStudio(imgA)==false) {
            $('#urlFileInSlider').val("");
        }else{
            $('#urlFileInSlider').attr("src",imgA);
            if (typeFiletManaged==13) {
                $('.bloc-img-manager').css("display","none");
                $('.attachments-wrapper').prepend(createThumbAccessSlider(imgA,1,''));
                dataSelectImgManaged = imgA;
            } else {
                $('.attachments-wrapper').prepend(createThumbAccessSlider(imgA,1,''));
            }
        }

    }
    // Files
    if (typeFiletManaged==23) {

        var goodFormat = false;
        if (filterGlobalFiles=='.mp3'&&imgA.indexOf('.mp3')!=-1) {
            goodFormat = true;
        }
        if (filterGlobalFiles=='.mp4'&&imgA.indexOf('.mp4')!=-1) {
            goodFormat = true;
        }

        if (filterGlobalFiles=='.mp4.pdf') {
            if (imgA.indexOf('.mp4')!=-1) {
                goodFormat = true;
            }
            if (imgA.indexOf('.pdf')!=-1) {
                goodFormat = true;
            }
        }
        if (filterGlobalFiles==''&&imgA!="") {
            goodFormat = true;
        }
        if (goodFormat&&getAutorizedExtends(imgA)) {
            
            $('.attachments-wrapper-files').prepend(createThumbAccessSlider(imgA,1,''));
            dataSelectImgManaged = imgA;

        } else {
            
            showMediaAlarm("Format Not Correct");

        }
        
    }
    
	$('.ui-widget-overlay').css("display","none");
	$('.workingProcessSave').css("display","none");
    $('.ludimenu').css("display","");
	
}

function receiveMessageDirectUpload(event)
{

    $('.attachments-wrapper').css("display","none");
    $('.attachments-wrapper-files').css("display","none");
    $('.attachments-wrapper-upload').css("display","none");

    if (event.data.indexOf('importfileok:')!=-1) {
        
        selectFileNameManaged = event.data;
        selectFileNameManaged = selectFileNameManaged.replace('importfileok:','');
        
        // Images
        if (typeFiletManaged==13) {
            
            if (isImageFile(selectFileNameManaged)) {
                $('.attachments-wrapper').css("display","block");
                $('.bloc-img-manager').css("display","none");
                dataSelectImgManaged = selectFileNameManaged;
                var bdDiv = createThumbAccessSlider(selectFileNameManaged,1,'');
                $('.attachments-wrapper').prepend(bdDiv);
            } else {
                showMediaAlarm("Format Not Correct !");
                $('.attachments-wrapper').css("display","block");
                $('.bloc-img-manager').css("display","block");
            }

        }
        // Files
        if (typeFiletManaged==23) {

            $('.attachments-wrapper-files').css("display","block");

            var goodFormat = false;
            if (filterGlobalFiles=='.mp3'&&selectFileNameManaged.indexOf('.mp3')!=-1) {
                goodFormat = true;
            }
            if (filterGlobalFiles=='.mp4'&&selectFileNameManaged.indexOf('.mp4')!=-1) {
                goodFormat = true;
            }
            if (filterGlobalFiles=='.mp4.pdf') {
                if (selectFileNameManaged.indexOf('.mp4')!=-1) {
                    goodFormat = true;
                }
                if (selectFileNameManaged.indexOf('.pdf')!=-1) {
                    goodFormat = true;
                }
            }
            if (filterGlobalFiles==''&&selectFileNameManaged!="") {
                goodFormat = true;
            }
            if (goodFormat&&getAutorizedExtends(selectFileNameManaged)) {
                
                $('.bloc-img-manager').css("display","none");
                $('.attachments-wrapper-files').prepend(createThumbAccessSlider(selectFileNameManaged,1,''));
                dataSelectImgManaged = selectFileNameManaged;
                
            } else {

                if (selectFileNameManaged=='filexist') {
                    //$('.media-alarm').html("Format Not Correct");
                    showMediaAlarm("File exist !");
                } else {

                    if (selectFileNameManaged=='errorupload') {
                        showMediaAlarm("Error Upload!");
                    } else {

                        if (selectFileNameManaged=='filenot') {
                            showMediaAlarm("File not authorized !");
                        } else {
                            showMediaAlarm("Error !");
                        }
                    }
                }

            }

        }
      
    }

    initUploadFileInStudio();

}

window.addEventListener("message", receiveMessageDirectUpload, false);

function getAutorizedExtends(selectFileName) {

    var goodFormat = false;

    if (selectFileName.indexOf('.mp3')!=-1) {
        goodFormat = true;
    }
    if (selectFileName.indexOf('.mp4')!=-1) {
        goodFormat = true;
    }
    if (selectFileName.indexOf('.pdf')!=-1) {
        goodFormat = true;
    }
    if (selectFileName.indexOf('.jpg')!=-1) {
        goodFormat = true;
    }
    if (selectFileName.indexOf('.gif')!=-1) {
        goodFormat = true;
    }
    if (selectFileName.indexOf('.png')!=-1) {
        goodFormat = true;
    }
    if (selectFileName.indexOf('.zip')!=-1) {
        goodFormat = true;
    }
    return goodFormat;

}
var optionsGlobalFiles;
var filterGlobalFiles = '';

function loadDataFileTab() {

    var bdDiv = '<p style="text-align:center;" ><br/><img src="img/cube-oe.gif" /><br/><br/></p>';
    $('.attachments-wrapper-files').html(bdDiv);

    $.ajax({
		url : 'img_cache/getfiles.php?idteach=' + idPageHtml,
		type: "POST",
        dataType : 'json',
		success: function(data,textStatus,jqXHR){
            var tableH = '';

            
            optionsGlobalFiles = data;
            if(optionsGlobalFiles.files.length>0){
                $.each(optionsGlobalFiles.files,function(){

                    if (selectFileNameManaged==this.src) {
                        tableH += createThumbAccessSlider(this.src,1,this.nameonly);
                    } else {
                        tableH += createThumbAccessSlider(this.src,0,this.nameonly);
                    }
                    
                });
                tableH += createThumbdirectUpload();

                $('.attachments-wrapper-files').html(tableH);
             
            } else {
                $('.attachments-wrapper-files').html(createThumbdirectUpload());
            }
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
            $('.attachments-wrapper-files').html("Error");
		}
	});

}

function createThumbAccessSlider(src,act,nam) {

    if (typeFiletManaged==23) {

        if (filterGlobalFiles!='') {
            if (filterGlobalFiles=='.mp4') {
                if (src.indexOf('.mp4')==-1) {
                    return '';
                }
            }
            if (filterGlobalFiles=='.mp3') {
                if (src.indexOf('.mp3')==-1) {
                    return '';
                }
            }
            if (filterGlobalFiles=='.mp4.pdf') {
                if (src.indexOf('.mp4')==-1&&src.indexOf('.pdf')==-1) {
                    return '';
                }
            
            }
        }
    }

    if (nam==''&&src!='') {
        nam = getFileNameByUrl(src);
    }
    
    var bdDiv = '<div class="bloc-img-manager" ';
    bdDiv += 'dataSrc="'+src+'" onClick="selectThumbSlider(this)" >';
    
    if (act==0) {
        bdDiv += '<div class="bloc-img-view">';
    } else {
        bdDiv += '<div class="bloc-img-view bloc-img-view-active">';
    }
    
    if (isImageFile(src)) {
    
        bdDiv += '<img src="' + src + '" />';
    
    } else {

        if (src.indexOf('.mp4')!=-1) {
            bdDiv += '<img src="icon/bouton-video.png" />';
            bdDiv += '<div class="bloc-img-title" >'+nam+'</div>';
        } else if (src.indexOf('.mp3')!=-1) {
            bdDiv += '<img src="icon/audio.png" />';
            bdDiv += '<div class="bloc-img-title" >'+nam+'</div>';
        } else {
            bdDiv += '<img src="icon/file-pdf-center.png" />';
            bdDiv += '<div class="bloc-img-title" >'+nam+'</div>';
        }

    }
    bdDiv += '</div>';
    bdDiv += '</div>';

    return bdDiv;

}

function createThumbdirectUpload() {

    var bdDiv = '<div onClick="directUploadFileInStudio();" ';
    
    bdDiv += ' style="cursor:pointer;" class="bloc-img-manager" >';

    bdDiv += '<div class="bloc-img-view" style="border:1px dotted #7F8C8D!important;" >';

    bdDiv += '<img src="icon/uploadfiles.png" />';
    bdDiv += '<div class="bloc-img-title" >Upload a file</div>';
    
    bdDiv += '</div>';

    bdDiv += '</div>';

    return bdDiv;

}
var moveAFxObj = false;

var GFXSrcTop = '<table class="teachdocplugteach" ';
GFXSrcTop += 'onMouseDown="parent.displayEditButon(this);" ';
GFXSrcTop += ' style="width:100%;text-align:center;" >';

var GFXSrcT = '<tr><td style="text-align:center;padding:10px;width:100%;position:relative;" >';
GFXSrcT += '<div class="plugteachcontain" >';
GFXSrcT += '{content}';
GFXSrcT += '</div>';
GFXSrcT += '</td></tr>';

var GFXSrcBottom = '</table>';

var firstSrcFX = GFXSrcT.replace("{content}",'$pluginfx-obj$');

var styFX = "background-image: url('icon/fxobjetblue.png');";
styFX += "background-repeat:no-repeat;";
styFX += "background-position:center center;";

editor.BlockManager.add('fxTools',{
	label : 'fxTools',
	attributes : {
		class : 'fa fa-text icon-plugTeach',
		style : styFX
	},
	category: 'Basic',
	content: {
		content: GFXSrcTop+firstSrcFX+GFXSrcBottom,script: "",
		style: {
			width: '100%',
			minHeight: '70px'
		}
	}
});

function searchNewTeachdocfx(){
	
	if (moveAFxObj) {
		
		moveAFxObj = false;

		var iframe = $('.gjs-frame');
		var iframeBody = iframe.contents().find("body");
		var allTables = iframeBody.find("table");

		allTables.each(function(index){
			
			if($(this).hasClass("teachdocplugteach")){
				var srcB = $(this).html();
				if (srcB.indexOf("$pluginfx-obj$")!=-1) {
					displayFXTeachList(this);
				}
			}
			
		});	
	}

	setTimeout(function(){
		searchNewTeachdocfx();
	},300);

}

setTimeout(function(){
	searchNewTeachdocfx();
},1000);

var loadFXObjectevent = false;

var loadFXObjectIndex = 0;

function displayFXTeachList(myObj){

	var btnObj = $(myObj);
	tmpObjDom = btnObj;
	
	identchange = getUnikId();
	tmpObjDom.attr("data-ref",identchange);
	
	if($("#BtnFXTeachList").length==0){
		
		var bdDiv = '<div id="BtnFXTeachList" ';
		bdDiv += ' class="gjs-mdl-container BtnFXTeachList" >';

		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" ';
		bdDiv += ' style="max-width:780px!important;" >';
		
		bdDiv +=  '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title">' + 'Content elements' + '</div>';
		bdDiv += '<div id="closeobjfxarea" class="gjs-mdl-btn-close gjs-mdl-btn-close-audio" ';
		bdDiv += ' onClick="cancelFXObj()" ';
		bdDiv += ' data-close-modal="">⨯</div>';
		bdDiv += '</div>';

		bdDiv += '<div class="fxtoolsdescription" >';
		bdDiv += '</div>';
		
		bdDiv += '<div id="listobjfxarea" class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;padding-top:10px;font-size:16px;" >';
		
		bdDiv += '<div class="tabfx-title" >Objects</div>';
		bdDiv += '<div class="tabfx-title" >Contents</div>';
		
        bdDiv += generateIconFx('Youtube Video','youtubevideo');
        bdDiv += generateIconFx('Google Doc','googledoc');
		bdDiv += generateIconFx('Dance Trophy','animfx');

		bdDiv += generateIconFx('Life bar','lifebar');
		bdDiv += generateIconFx('Text MathJax','txtmathjax');


		bdDiv += generateIconFx('intro bloc','oelcontentcardinfo');
		bdDiv += generateIconFx('text bloc circle','oelcontentcardinfocircle');
		bdDiv += generateIconFx('Photo legend','oelcontentphotowtitle');

		bdDiv += generateIconFx('2 lists','oelcontentlistbox50');
		bdDiv += generateIconFx('list and image','oelcontentlistboximg50');

		bdDiv += '</div>';
		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display:none"></div>';
		bdDiv += '</div>';

		$('body').append(bdDiv);

	}
    
	if($("#BtnFXTeachList").length==1){
		
		selectFXObj('')
		$('.ludimenu').css("z-index",'2');
		$('#BtnFXTeachList').css("display",'');
		windowEditorIsOpen = true;
		loadaFunction();
		traductAll();
		
	}
	
}

function selectFXObj(typesource){

	loadFXObjectIndex++;

	var b = '';

	if (typesource == "youtubevideo") {
		b += '<h2 class="titlefx" >Youtube Object</h2>';
		b += '<div class="previewfxobj" ';
		b += ' style="background-image:url(icon/' + typesource + '-d.png);" ></div>';
		b += '<p class="descrifx" >';
		b += 'The simplest method to embed a YouTube video in a page without IFrame';
		b += '</p>';
	}

	if (typesource == "lifebar") {
		b += '<h2 class="titlefx" >Life bar</h2>';
		b += '<div class="previewfxobj" ';
		b += ' style="background-image:url(icon/' + typesource + '-d.png);" ></div>';
		b += '<p class="descrifx" >';
		b += 'Add a Gaming Life Bar in interface';
		b += '</p>';
	}

	if (typesource == "animfx") {
		b += '<h2 class="titlefx" >Dance Trophy</h2>';
		b += '<div class="previewfxobj" ';
		b += ' style="background-image:url(img/white-medium-star.svg?v='+loadFXObjectIndex+');" ></div>';
		b += '<p class="descrifx" >';
		b += 'Add a animation Trophy in interface';
		b += '</p>';
	}

	if (typesource == "googledoc") {
		b += '<h2 class="titlefx" >Google Doc</h2>';
		b += '<div class="previewfxobj" ';
		b += ' style="background-image:url(icon/googledoc-d.png);" ></div>';
		b += '<p class="descrifx" >';
		b += 'Add a Google Doc integration in interface';
		b += '</p>';
	}

	if (typesource == "txtmathjax") {
		b += '<h2 class="titlefx" >Text MathJax</h2>';
		b += '<div class="previewfxobj" ';
		b += ' style="background-image:url(icon/txtmathjax-d.png);" ></div>';
		b += '<p class="descrifx" >';
		b += 'Add a text with MathJax integration';
		b += '</p>';
	}

	if (typesource == "oelcontentcardinfo") {
		b += '<h2 class="titlefx" >Large info-box</h2>';
		b += '<div class="previewfxobj" ';
		b += ' style="background-image:url(icon/' + typesource + '-d.png);" ></div>';
		b += '<p class="descrifx" >';
		b += 'This is a infobox with a title, a sub-title, an image, description in a box.';
		b += '</p>';
	}

	if (typesource == "oelcontentcardinfocircle") {
		b += '<h2 class="titlefx" >Large info-box</h2>';
		b += '<div class="previewfxobj" ';
		b += ' style="background-image:url(icon/' + typesource + '-d.png);" ></div>';
		b += '<p class="descrifx" >';
		b += 'This is a infobox with a title, a sub-title, a circle image, description in a box.';
		b += '</p>';
	}

	if (typesource == "oelcontentphotowtitle") {
		b += '<h2 class="titlefx" >Photo and legend</h2>';
		b += '<div class="previewfxobj" ';
		b += ' style="background-image:url(icon/' + typesource + '-d.png);" ></div>';
		b += '<p class="descrifx" >';
		b += 'This is a photo with a description.';
		b += '</p>';
	}

	if (typesource == "oelcontentlistbox50") {
		b += '<h2 class="titlefx" >Two lists</h2>';
		b += '<div class="previewfxobj" ';
		b += ' style="background-image:url(icon/' + typesource + '-d.png);" ></div>';
		b += '<p class="descrifx" >';
		b += 'Two liste.';
		b += '</p>';
	}

	if (typesource == "oelcontentlistboximg50") {
		b += '<h2 class="titlefx" >List and image</h2>';
		b += '<div class="previewfxobj" ';
		b += ' style="background-image:url(icon/' + typesource + '-d.png);" ></div>';
		b += '<p class="descrifx" >';
		b += 'Two liste.';
		b += '</p>';
	}

	if (b == "") {
		b += '<h2 class="titlefx" >FX Object</h2>';
		b += '<div class="previewfxobj" ';
		b += ' style="background-image:url(icon/basic-d.png);" ></div>';
		b += '<p class="descrifx" >';
		b += 'Select an object.';
		b += '</p>';
	} else {
		b += '<div style="position:absolute;right:0px;bottom:0px;padding:10px;padding-top:10px;text-align:right;" >';
		b += '<input id="ludiButtonSaveFxObj" onClick="applyFXObj(\''+typesource+'\')" ';
		b += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		b += ' class="gjs-one-bg ludiButtonSave" type="button" value="&nbsp;Insert&nbsp;" /><br/>';
		b += '</div>';
	}

	$('.fxtoolsdescription').html(b);

}

function applyFXObj(typesource){

    if(onlyOneUpdate==false){
		return false;
	}

	var rP = '';
	var datatext1 = '';
    var datatext2 = '';
	if (typesource=='youtubevideo') {
        datatext1 = 'https://www.youtube.com/embed/pefhbQ1gzUw';
        datatext2 = '450';
		rP = renderpluginyoutubevideo(datatext1,datatext2);
	}

	if (typesource=='googledoc') {
        datatext1 = '';
        datatext2 = '450';
		rP = renderplugingoogledoc(datatext1,datatext2);
	}
	
	if (typesource=='animfx') {
        datatext1 = 'img/classique/white-medium-star.svg';
        datatext2 = '';
		rP = renderpluginanimfx(datatext1,datatext2);
	}
	
	if (typesource=='lifebar') {
        datatext1 = '3';datatext2 = '';
		rP = renderpluginlifebar(datatext1,datatext2);
	}

	if (typesource=='txtmathjax') {
        datatext1 = '';datatext2 = '';
		rP = renderplugintxtmathjax(datatext1,datatext2);
	}
	
	if (typesource=='oelcontentcardinfo') {
        datatext1 = '';datatext2 = '';
		rP = renderpluginoelcontentcardinfo(datatext1,datatext2);
	}
	if (typesource=='oelcontentcardinfocircle') {
        datatext1 = '';datatext2 = '';
		rP = renderpluginoelcontentcardinfocircle(datatext1,datatext2);
	}
	if (typesource=='oelcontentphotowtitle') {
        datatext1 = '';datatext2 = '';
		rP = renderpluginoelcontentphotowtitle(datatext1,datatext2);
	}
	if (typesource=='oelcontentlistbox50') {
        datatext1 = '';datatext2 = '';
		rP = renderpluginoelcontentlistbox50(datatext1,datatext2);
	}
	if (typesource=='oelcontentlistboximg50') {
        datatext1 = '';datatext2 = '';
		rP = renderpluginoelcontentlistboximg50(datatext1,datatext2);
	}
	
    if (rP=="") {
        reloadPageErr();
        return false;
    }

	$('#ludiButtonSaveFxObj').css("display","none");

	$('#listobjfxarea').html("<p style='text-align:center;' ><br/><img src='img/cube-oe.gif' /><br/><br/></p>");
	$('#closeobjfxarea').css("display","none");

    var paramsDB = '<span class=datatext1  >'+datatext1+'</span>';
    paramsDB += '<span class=datatext2  >'+datatext2+'</span>';
    paramsDB += '<span class=typesource >' ;
    paramsDB +=  typesource + '</span>';

    var rH = GFXSrcT;
	
	if (typesource=='lifebar') {
		rH = rH.replace('plugteachcontain','plugteachuicontain');
	}
    rH = rH.replace("{content}",rP + paramsDB);
	
    tmpObjDom.html(rH);
	
    var gjsHtml = localStorage.getItem("gjs-html-" + idPageHtml);
	if(gjsHtml.indexOf("$pluginfx-obj$")!=-1){
		gjsHtml = gjsHtml.replace('$pluginfx-obj$',rP + paramsDB);
		gjsHtml = gjsHtml.replace('$pluginfx-obj$',rP + paramsDB);
		localStorage.setItem("gjs-html-" + idPageHtml,gjsHtml);
		loadFXObjectevent = true;
		saveSourceFrame(false,false,0);
	}else{
        reloadPageErr();
        return false;
    }

}

function cancelFXObj(){

	tmpObjDom.parent();
	tmpObjDom.html('');
	var gjsHtml = localStorage.getItem("gjs-html-" + idPageHtml);
	if(gjsHtml.indexOf("$pluginfx-obj$")!=-1){
		gjsHtml = gjsHtml.replace('$pluginfx-obj$','');
		gjsHtml = gjsHtml.replace('$pluginfx-obj$','');
		localStorage.setItem("gjs-html-" + idPageHtml,gjsHtml);
		$('.ludimenu').css("z-index","1000");
		saveSourceFrame(false,false,0);
	}
	closeAllEditWindows();

}

function generateIconFx(title,typesrc) {

    var bdDiv = '<a class="fxtoolscube" ';
    bdDiv += ' style="background-image:url(icon/' + typesrc + '.png);" ';
    bdDiv += 'onclick="selectFXObj(\'' + typesrc + '\');" >';
    bdDiv += '<div class="fxtoolstitle" >';
    bdDiv += title + '</div>';
    bdDiv += '</a>';

    return bdDiv;

}

function getinputFXObj(typesource) {

	var bdDiv = "";
   //FX
	if (typesource=='youtubevideo') {
		bdDiv += txtParamsPlugTeach(1,typesource,'Link youtube');
		bdDiv += heightParamsPlugTeach(2,typesource,'Height');
	}
	if (typesource=='googledoc') {
		bdDiv += txtParamsPlugTeach(1,typesource,'Link google doc');
		bdDiv += heightParamsPlugTeach(2,typesource,'Height');
	}
	if (typesource=='lifebar') {
		bdDiv += numbe10ParamsPlugTeach(1,typesource,'number');
	}

    return bdDiv;

}

function renderFXObj(datatext1,datatext2,typesource) {

    if (typesource=='youtubevideo') {
		rP = renderpluginyoutubevideo(datatext1,datatext2);
	}

	if (typesource=='googledoc') {
		rP = renderplugingoogledoc(datatext1,datatext2);
	}

	if (typesource=='lifebar') {
		rP = renderpluginlifebar(datatext1,datatext2);
	}

	if (typesource=='txtmathjax') {
		rP = renderplugintxtmathjax(datatext1,datatext2);
	}

	if (isTypeSourceCont(typesource)) {
		var TareaTeachDocText = $('#contentedittxtarea'+identSourceEdition).val();
		TareaTeachDocText = TareaTeachDocText.replace(/<span /g,'<em ');
		TareaTeachDocText = TareaTeachDocText.replace(/<\/span>/g,'</em>');
		rP = TareaTeachDocText;

		rP += '<span class=typesource >' + typesource + '</span>';

		var datatext1 = $('#contenteditimg'+identSourceEdition).val();
		rP += '<span class=datatext1 >' + datatext1 + '</span>';

	}

    return rP;

}

//Edit direct content
function htmlParamsContentEdit(id,typesource) {

	var bdDiv = '<textarea id="contentedittxtarea'+id+'" type="text" ';
	var src =  cleanCodeBeforeEdit(contentSourceEdition);

	if (typesource=='txtmathjax') {

		bdDiv += ' class="plugAreaDivContentMathJax" >'+src+'</textarea>';
		bdDiv += '<div class="previewMathJax previewMathJax' + id + '" ></div>';
		
		setTimeout(function(){
			refreshEditorFX(id,typesource)
		},500);

	} else {
		bdDiv += ' class="plugAreaDivContent" >'+src+'</textarea>';
		bdDiv += '<div style="padding:5px;" >';
		bdDiv += '<input id="contenteditimg' + id + '" type="text" value="" readonly="readonly" ';
		bdDiv += ' class="plugInputDiv" style="width:80px;" />';
		bdDiv += '&nbsp;<input onClick="showFileManagerStudio2(13,\'contenteditimg'+ id + '\',\'finalizeContentEditImg\');" ';
		bdDiv += ' class="gjs-one-bg ludiButtonSave plugInputMin" type="button" value="..." />';
		bdDiv += '</div>';
	}

	return bdDiv;

}

function finalizeContentEditImg() {
	
	$('.ui-widget-overlay').css("display","none");
	$('.workingProcessSave').css("display","none");
	contentSourceEditionV1 = $('#contenteditimg'+identSourceEdition).val();
	
	setTimeout(function(){
		applyImgContentTiny();
	},200);

}

function cleanCodeBeforeEdit(src){

	src = cleanCodeBeforeLoad(src);
	src = src.replace(/<span.*class="typesource.*[\n]+.*?<\/span>/g,'');
	src = src.replace(/<span.*>.*?<\/span>/g,'');
	
	return src;
}

function cleanCodeBeforeLoad(src){

	src = src.replace(/data-gjs-type="row"/g,'');
	src = src.replace(/data-gjs-type="tbody"/g,'');
	src = src.replace(/data-gjs-type="text"/g,'');
	src = src.replace(/data-gjs-type="cell"/g,'');
	src = src.replace(/data-gjs-type="default"/g,'');
	src = src.replace(/data-highlightable="1"/g,'');
	src = src.replace(' data-gjs-type="cell" ',' ');
	src = src.replace('<tbody  >','<tbody>');

	src = src.replace(/<td  /g,'<td ');
	src = src.replace(/<td  /g,'<td ');
	src = src.replace(/<span  /g,'<span ');
	src = src.replace(/<span  /g,'<span ');
	src = src.replace(/<div  /g,'<div ');
	src = src.replace(/<div  /g,'<div ');
	src = src.replace(/<p  /g,'<p ');
	src = src.replace(/<p  /g,'<p ');
	
	src = src.replace('<span class="datatext1">undefined</span>','');
	src = src.replace('<span class="datatext2">undefined</span>','');

	return src;

}

function installDirectContentEdit(id) {

	//link unlink removeformat blockquote code
	$('#contentedittxtarea'+id).tinymce({
		menubar: false,
		statusbar: false,
		toolbar: 'undo redo| fontselect fontsizeselect forecolor | bold italic underline | bullist numlist outdent indent | code ',
		plugins: 'link lists',
		contextmenu: 'link lists',
		content_css: _p['web_editor'] + "/templates/styles/plug.css",
	});

	$('#contenteditimg'+id).val(contentSourceEditionV1);

	setTimeout(function(){
		applyImgContentTiny();
	},200);
}

function applyImgContentTiny(){

	var hContent =  $('#contentedittxtarea'+identSourceEdition).val();
	if (hContent!='') {

		if (contentSourceEditionV1!='') {
			
			//Pas de background image
			hContent = applyImgContentTiny1(hContent,contentSourceEditionV1);
			
			var tinyMceSrcEdit = tinymce.get('contentedittxtarea'+identSourceEdition);
			tinyMceSrcEdit.setContent(hContent);
		
			directToRender(contentSourceEditionV1);
			
		}

	} else {
		
		setTimeout(function(){
			applyImgContentTiny();
		},200);

	}

}

function applyImgContentTiny1(hContent,var1){

	if (hContent!='') {
		if (var1!='') {
			//Pas de background image
			if (hContent.indexOf("background-image:")==-1) {
				if (hContent.indexOf('class="photo')!=-1) {
					hContent = hContent.replace('class="photo',' style="background-image: url('+var1+')" class="photo');
				}
			} else {
				hContent = hContent.replace(/url\((?!['"]?(?:data|http):)['"]?([^'"\)]*)['"]?\)/g,'url('+var1+')');
			}
		}
	}
	return hContent;

}
var indexGlossEdition = 0;
var subGlossData = new Array();

function displayGlossaryManager() {

	if ($("#glossaryManager").length==0) {

		var bdDiv = '<div id="glossaryManager" ';
        bdDiv += ' class="gjs-mdl-container" style="z-index:3;" >';
		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color">';
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title">Glossary</div>';
		bdDiv += '<div class="gjs-mdl-btn-close gjs-mdl-btn-close-audio" ';
		bdDiv += ' onClick="closeAllEditWindows();" data-close-modal="">⨯</div>';
		bdDiv += '</div>';
		
		bdDiv += '<div class="gjs-am-add-asset innerGlossaryManager" ';
		bdDiv += 'style="padding:5px;font-size:14px;" ></div>';
		
		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
		bdDiv += '</div>';

		$('body').append(bdDiv);

	}

	if ($("#glossaryManager").length==1) {

		$('.ludimenu').css("z-index","2");
		$('#glossaryManager').css("display","");
        $('#glossaryManager').css("z-index",101);
		windowEditorIsOpen = true;
        traductAll();
        innerGlossaryManager();
	}

}

function innerGlossaryManager() {
    
    var h = '';

	h += '<div class="blockGlossaryLoad" >'
    h += '</div>';

    h += '<div class="blockGlossary blockGlossaryAdd" >'
    h += '</div>';
    
    h += innerGlossaryTable();

    $('.innerGlossaryManager').html(h);

	loadGlossaryTermsColl();

}

function launchEditGlossManager(typedit,idterm) {

	indexGlossEdition++;

	var wordTerm = '';
	var defTerm = '';
	var defTerm2 = '';
	
	if (idterm!=''&&typedit==1) {
		wordTerm = subGlossData[idterm].w;
		defTerm = subGlossData[idterm].d;
		defTerm2 = subGlossData[idterm].d2;
	}
	
    var h = '<div class="blockGlossaryLine1" >';
    h += '<div class="blockGlossaryLabel" ><span class="trd" >Term</span>&nbsp;:&nbsp;</div>';
    h += '<input id="termAddGloss' + indexGlossEdition + '" type="text" value="' + wordTerm + '" ';
    h += ' class="blockGlossaryInput" />';
	h += '<div class="blockGlossaryLabelFull" ><span class="trd" >Simple definition</span>&nbsp;:&nbsp;</div>';
	h += '<textarea id="areaGloss1Text' + indexGlossEdition + '"  ';
    h += ' name="areaGloss1Text' + indexGlossEdition + '" ';
	h += 'rows=4 ';
	h += 'style="width:98%;font-size:13px;padding:2px;resize:none;" ';  
	h += ' >' + defTerm + '</textarea>';
    h += '</div>';

	h += '<a onClick="deleteGlossaryProcess(\''+idterm+'\');" ';
	h += ' style="position:absolute;bottom:10px;left:5px;cursor:pointer;"  >';
	h += '<img src="icon/delete-icon-24.png" /></a>';

    h += '<div class="blockGlossaryLine2" >';

    h += '<div class="blockGlossaryLabelFull" ><span class="trd" >Advanced definition</span>&nbsp;:&nbsp;</div>'
    h += '<textarea id="areaGlossText' + indexGlossEdition + '"  ';
    h += ' name="areaTeachDocText' + indexGlossEdition + '" ';
	h += 'rows=4 ';
	h += 'style="width:98%;font-size:13px;padding:2px;margin-left:20px;resize:none;" ';  
	h += ' >' + defTerm2 + '</textarea>';
    
	// Buttons
    h += '<div style="padding:5px;text-align:right;" >';
	h += '<input onClick="closeGlossaryT()" ';
    h += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
    h += ' class="gjs-one-bg ludiButtonCancel trd" type="button" value="Cancel" />&nbsp;';
   
    if (typedit==0) {
		h += '<input onClick="saveGlossaryT(\'\')" ';
		h += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		h += ' class="gjs-one-bg ludiButtonSave trd" type="button" value="Add" />';
	}
    if (typedit==1) {
		h += '<input onClick="saveGlossaryT(\''+idterm+'\')" ';
		h += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		h += ' class="gjs-one-bg ludiButtonSave trd" type="button" value="Save" />';
	}

    h += '</div>';
    h += '</div>';

	$('.blockGlossaryAdd').html(h);

	$('.blockGlossaryAdd').css('display','block');
	$('.blockGlossaryTable').css("display","none");

	$('#areaGlossText'+indexGlossEdition).tinymce({
        menubar: false,
        statusbar: false
    });

}

function innerGlossaryTable() {
    
    var h = '<div class="blockGlossaryTable" >';
    h += '</div>';
    
    return h ;

}

function closeGlossaryT() {
	$('.blockGlossaryAdd').css("display","none");
	$('.blockGlossaryLoad').css("display","none");
	$('.blockGlossaryTable').css("display","block");
}

function saveGlossaryT(idterm) {

    var txtTerm = $('#termAddGloss'+indexGlossEdition).val();
	var defTerm1 = $('#areaGloss1Text'+indexGlossEdition).val();
	var defTerm2 = $('#areaGlossText'+indexGlossEdition).val();

	if (onlyOneUpdate==false
		||txtTerm==''
		||txtTerm.length<3) {
			return false;
	}

	$('.blockGlossaryAdd').css("display","none");
	$('.blockGlossaryLoad').css("display","block");

    var formData = {
        term : txtTerm,
        def1 : defTerm1,
		def2 : defTerm2,
		idterm : idterm
    };
    var act = 1;
	if (idterm!='') {
		act = 3;
	}
	onlyOneUpdate = false;
    $.ajax({
		url : '../ajax/save/ajax.saveterm.php?act='+act+'&id=' + idPageHtml,
		type: "POST",data : formData,
		cache: false,
		success : function(data,textStatus,jqXHR){

			onlyOneUpdate = true;
			if (data.indexOf("error")==-1) {
				if (idterm!='') {
					
				}
				$('.blockGlossaryLoad').css("display","block");
				loadGlossaryTermsColl();

			} else {
                alert("Error !");
			}

		}, error : function (jqXHR, textStatus, errorThrown)
		{
			alert("Error !");
			alert(textStatus);
		}
	});


}

function loadGlossaryTermsColl() {

	if (onlyOneUpdate==false) {
		return false;
	}

	subGlossData = new Array();

	$('.blockGlossaryAdd').css("display","none");
	
	onlyOneUpdate = false;

    $.ajax({
		url : '../ajax/save/ajax.saveterm.php?act=2&id=' + idPageHtml,
		type: "GET",
		cache: false,
		success: function(data,textStatus,jqXHR){
			
			onlyOneUpdate = true;

			$('.blockGlossaryLoad').css("display","none");
			$('.blockGlossaryTable').css("display","block");

			if (data.indexOf("error")==-1) {
				
				var ArrayObjects = data.split('|');
				var i = 0;
				var nbterms = 0;
				var txtC = '';

				txtC += '<table class="blockGlossTableLine" >';
				txtC += '<tr>';
				txtC += '<td id="GlossNbTerms" ></td>';
				txtC += '<td style="width:28px;" >';
				txtC += '<a onClick="launchEditGlossManager(0,\'\');" ';
				txtC += 'style="cursor:pointer;height:22px;text-align:center;" >';
				txtC += '<img style="margin:4px;margin-top:6px;" ';
				txtC += 'src="icon/add.png" /></td></a>';
				txtC += '</tr>';
				txtC += '</table>';

				txtC += '<table class="blockGlossTableLine" >';

				for (i=0;i<ArrayObjects.length;i++) {
					
					var objInfos = ArrayObjects[i];

					if (objdet!='') {

						if (objInfos.indexOf('@')!=-1) {
						
							var objdet = objInfos.split('@');
							var idt = objdet[0];
							txtC += '<tr id="termid-'+idt+'" >';
							txtC += '<td>&nbsp;' + objdet[1] + '</td>';
							
							var descri = objdet[2];

							if (descri.length>70) {
								descri = descri.substring(0,70);
							}
							
							txtC += '<td>&nbsp;' + descri + '...</td>';
							txtC += '<td style="width:30px;background-color:white;';
							txtC += 'text-align:center;" >';
							txtC += '<a onClick="launchEditGlossManager(1,\''+idt+'\');" ';
							txtC += ' style="cursor:pointer;width:24px;height:24px;" >';
							txtC += '<img style="margin-top:4px;" src="img/edit.png" />';
							txtC += '</a>';
							txtC += '</td>';

							var objectC = {
								w : objdet[1],
								d : objdet[2],
								d2 : objdet[3]
							};
							subGlossData[objdet[0]] = objectC;
							
							//txtC += objdet[0];
	
							txtC += '</tr>';
							nbterms++;
						}
	
					}
				}
				txtC += '</table>';
				
				$('.blockGlossaryTable').html(txtC);
				
				$('#GlossNbTerms').html('&nbsp;' + nbterms + ' terms');
				
			} else {
            
				alert("Error !");
			
			}

		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			alert("Error !");
			alert(textStatus);
		}
	});


}

function deleteGlossaryProcess(idterm) {

	if (onlyOneUpdate==false) {
		return false;
	}
	var formData = {
		idterm : idterm
    };

	$('.blockGlossaryAdd').css('display','none');
	$('.blockGlossaryTable').css("display","none");
	$('.blockGlossaryLoad').css("display","block");
	onlyOneUpdate = false;
    $.ajax({
		url : '../ajax/save/ajax.saveterm.php?act=100&id=' + idPageHtml,
		type: "POST",data:formData,
		cache: false,
		success : function(data,textStatus,jqXHR){
			onlyOneUpdate = true;
			if (data.indexOf("error")==-1
			&&data.indexOf("OK")!=-1) {
				$('.blockGlossaryLoad').css("display","none");
				$('.blockGlossaryTable').css("display","block");
				$('#termid-' + idterm).css("display","none");
			} else {
                alert("Error !");
				$('.blockGlossaryTable').css("display","block");
			}
		}, error : function (jqXHR, textStatus, errorThrown)
		{
			alert("Error !");
			$('.blockGlossaryTable').css("display","block");
			alert(textStatus);
		}
	});

}

function renderpluginyoutubevideo(var1,var2) {

    var1 = 'https://www.youtube.com/embed/' + extractvId(var1);

    var h  = '<div class=topinactiveteach ></div>';
    
    h += '<iframe';
    h += ' style="width:100%;min-height:350px;z-index:1;';
    h += 'height:' + var2 + 'px;overflow:hidden;" ';
    h += ' frameBorder="0" ';
    h += ' src="' + var1 + '" ></iframe>';
    
    h += '<span class=typesource style="display:none;" >youtubevideo</span>';

    return h;

}

function renderpluginyoutubevideoInit(var1,var2) {

    var h = '<div';
    h += ' style="width:100%;height:350px;background:#E5E7E9;" ';
    h += '></div>';
    h += '<span class=typesource style="display:none;" >youtubevideo</span>';

    return h;

}

function extractvId(n) {
    n = real(n,'http://www.youtube.com/watch?v=','');
    n = real(n,'https://www.youtube.com/watch?v=','');
    n = real(n,'https://www.youtube.com/embed/','');
    n = real(n,'http://www.youtube.com/embed/','');
    n = real(n,'https://youtu.be/','');
    n = real(n,'https://www.youtube.com/','');
    n = real(n,'http://www.youtube.com/','');
    n = n.replace('embed/','');
    n = real(n,'/','');
    n = real(n,' ','');
    n = real(n,' ','');
    n = n.replace('watch?v=','');
    n = n.replace('/','');
    n = n.replace(' ','');
    n = n.replace(' ','');
    n = n.replace('&amp;','&');
    
    var ampersandPosition = n.indexOf('&');
    if(ampersandPosition != -1) {
        n = n.substring(0, ampersandPosition);
    }
    return n;
}

function real (txt, rep, witht) {
    return txt.replace(new RegExp(rep,'g'),witht);
}
function renderplugingoogledoc(var1,var2) {

    var h  = '<div class=topinactiveteach ></div>';
    
    h += '<iframe';
    h += ' style="width:100%;min-height:350px;z-index:1;';
    h += 'height:' + var2 + 'px;overflow:hidden;" ';
    h += ' frameBorder="0" ';
    h += ' src="' + var1 + '" ></iframe>';
    
    if (var1=="") {

        h = '<div';
        h += ' style="width:100%;min-height:150px;border:solid 16px #D4E6F1;z-index:1;padding:10px;';
        h += 'height:150px;overflow:hidden;" ';
        h += ' frameBorder="0" ';
        h += ' src="' + var1 + '" ><br/>The document is empty ...</div>';

    }

    h += '<span class=typesource style="display:none;" >googledoc</span>';

    return h;

}

function renderpluginanimfx(var1,var2) {

    var h = '<img';
    h += ' style="width:100%;min-height:150px;z-index:1;';
    h += 'height:150px;" ';
    h += ' frameBorder="0" ';
    h += ' src="' + var1 + '" />';

    h += '<span class=typesource style="display:none;" >animfx</span>';

    return h;

}

function renderpluginlifebar(var1,var2) {

    if (typeof var1 === "undefined"){var1 = 3;}
    if (var1 === ""){var1 = 3;}

    h += '<div class="lifebarcontain" >';

    var h = '';
    var nbLife = parseInt(var1);
    for(var i=0; i < nbLife; i++){
        h += '<div id="lifeopt'+i+'" class="onelifeopt" ></div>';
    }

    h += '</div>';

    h += '<span class=typesource style="display:none;" >lifebar</span>';

    return h;

}

function renderplugintxtmathjax(var1,var2) {

    var h = '';
    h += "<p>"
    h += '\\( J_\\beta(x) = \\sum\\limits_{m=0}^\\infty \\frac{(-1)^m}{m! \\, \\Gamma(m + \\alpha + 1)}{\\left({\\frac{x}{2}}\\right)}^{2 m + \\alpha} \\)';
    h += "</p>"
    h += '<span class=typesource style="display:none;" >txtmathjax</span>';
    return h;

}

function refreshEditorFX(id,typesource) {

	if (windowEditorIsOpen==true) {

		if (typesource=='txtmathjax') {
			var contentToRender = $('#contentedittxtarea'+identSourceEdition).val();
			$('.previewMathJax' + id).html(contentToRender);
			MathJax.typesetPromise();
			setTimeout(function(){
				refreshEditorFX(id,typesource)
			},1000);
		}

	}
	
}

var baseNameObj = '';

function installSpeedTools() {

    if (tmpNameObj=='image'&&baseNameObj!='image') {
        baseNameObj = tmpNameObj;
        var coolTools = '<a onClick="initialImage();" class="image-initial-opt" ></a>';
        coolTools += '<a onClick="classicImage();" class="image-classic-opt" ></a>';
        coolTools += '<a onClick="fullImageFct();" class="image-full-opt" ></a>';
        coolTools += '<a onClick="overImageFct();" class="image-over-opt" ></a>';
        $('.ludiSpeedTools').html(coolTools);
    }

}

function initialImage() {

    if (baseNameObj=='image') {
        setAbstractObjClass('initialImg');
    }
    
}


function classicImage() {

    if (baseNameObj=='image') {
        setAbstractObjClass('bandeImg');
    }
    
}

function fullImageFct() {

    if (baseNameObj=='image') {
        setAbstractObjClass('bandeImgFull');
    }
    
}

function overImageFct() {

    if (baseNameObj=='image') {
        setAbstractObjClass('bandeImgOverview');
    }
    
}




function renderplugintxtmathjax(var1,var2) {

    var h = '';
    h += "<p>"
    h += '\\( J_\\beta(x) = \\sum\\limits_{m=0}^\\infty \\frac{(-1)^m}{m! \\, \\Gamma(m + \\alpha + 1)}{\\left({\\frac{x}{2}}\\right)}^{2 m + \\alpha} \\)';
    h += "</p>"
    h += '<span class=typesource style="display:none;" >txtmathjax</span>';
    return h;

}

function refreshEditorFX(id,typesource) {

	if (windowEditorIsOpen==true) {

		if (typesource=='txtmathjax') {
			var contentToRender = $('#contentedittxtarea'+identSourceEdition).val();
			$('.previewMathJax' + id).html(contentToRender);
			MathJax.typesetPromise();
			setTimeout(function(){
				refreshEditorFX(id,typesource)
			},1000);
		}

	}
	
}

function displaySelectLanguage(){

	if ($("#SelectLanguageWindows").length==0) {
		
		var bdDiv = '<div id="SelectLanguageWindows" class="gjs-mdl-container" >';

		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" ';
		bdDiv += ' style="max-width:800px!important;" >';
		
		bdDiv += getTitleBar('Select Language');

		bdDiv += '<div class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;padding-top:10px;font-size:16px;" >';
		
        bdDiv += '<table class="noselect" style="width:99%;margin-top:10px;margin-bottom:10px;" ><tr>';
        bdDiv += '<td style="text-align:center;" ><img onClick="selectLangUI(\'en\');" style="cursor:pointer;" src="icon/flag-en.png" /></td>';
        bdDiv += '<td style="text-align:center;" ><img onClick="selectLangUI(\'fr\');" style="cursor:pointer;" src="icon/flag-fr.png" /></td>';
        bdDiv += '<td style="text-align:center;" ><img onClick="selectLangUI(\'es\');" style="cursor:pointer;" src="icon/flag-es.png" /></td>';
        bdDiv += '</tr>';
        bdDiv += '</table>';

		bdDiv += '</div>';
		bdDiv += '</div>';
		
		bdDiv += '<div class="gjs-mdl-collector" style="display:none"></div>';
		bdDiv += '</div>';

		$('body').append(bdDiv);
	
	}

	if ($("#SelectLanguageWindows").length==1) {
		$('.ludimenu').css("z-index",'2');
		$('#SelectLanguageWindows').css("display",'');
		windowEditorIsOpen = true;
		loadaFunction();
		traductAll();
	}

}

function selectLangUI(lg) {

	if (langselectUI==lg) {
		closeAllEditWindows();
	}
	
	if (langselectUI=='en') {
		if(localStorage){
			localStorage.setItem("langselectUI",lg);
		}
		closeAllEditWindows();
		traductAll();
	} else {
		if(localStorage){
			localStorage.setItem("langselectUI",lg);
			reloadEditorAll();
		}
	}

}

var langselectUI = 'en';

function traductAll() {

    var langselectUIStore = 'en';

    if (localStorage) {
        langselectUIStore = localStorage.getItem("langselectUI");
        if (langselectUIStore!='fr'&&langselectUIStore!='en'&&langselectUIStore!='es') {
            langselectUIStore = 'en';
        }
    }

    langselectUI = langselectUIStore;
    
    if (langselectUI=='en') { 
        return false;
    }

    //trd
    $( ".trd" ).each(function( index ) {
        
        var isBtn = 0;
        var txt1 = $(this).html();
        if ($(this).is( ":button" )) {
            txt1 = $(this).attr("value");
            isBtn = 1;
        }
        var txt2 = returnTradTerm(txt1);
        if (txt1!=txt2) {
            if (isBtn==1) {
                $(this).attr("value",txt2);
            } else {
                $(this).html(txt2);
            }
        }
        $(this).removeClass("trd");
        
    });

}

function returnTradTerm(txt) {
var chg = 0;
if (langselectUI=='fr') {
if (txt=="Save") {
						chg = 1;
						txt ="Enregistrer";
					}
if (txt=="Add") {
						chg = 1;
						txt ="Ajouter";
					}
if (txt=="&nbsp;Save&nbsp;") {
						chg = 1;
						txt ="&nbsp;Enregistrer&nbsp;";
					}
if (txt=="Cancel") {
						chg = 1;
						txt ="Annuler";
					}
if (txt=="Download") {
						chg = 1;
						txt ="Télécharger";
					}
if (txt=="File") {
						chg = 1;
						txt ="Fichier";
					}
if (txt=="Edit") {
						chg = 1;
						txt ="Edition";
					}
if (txt=="Clean data") {
						chg = 1;
						txt ="Effacer traces";
					}
if (txt=="Play") {
						chg = 1;
						txt ="Lecture";
					}
if (txt=="Load") {
						chg = 1;
						txt ="Charger";
					}
if (txt=="Colors") {
						chg = 1;
						txt ="Thèmes";
					}
if (txt=="Options") {
						chg = 1;
						txt ="Options";
					}
if (txt=="Export SCORM") {
						chg = 1;
						txt ="Exporter SCORM";
					}
if (txt=="Export to SCORM") {
						chg = 1;
						txt ="Exporter vers SCORM";
					}
if (txt=="History") {
						chg = 1;
						txt ="Historique";
					}
if (txt=="Free page") {
						chg = 1;
						txt ="Page libre";
					}
if (txt=="You must visit this page to continue") {
						chg = 1;
						txt ="Visiter la page pour continuer";
					}
if (txt=="The page is subject to the progression") {
						chg = 1;
						txt ="La page est soumise à la progression";
					}
if (txt=="Export Project") {
						chg = 1;
						txt ="Exporter le projet";
					}
if (txt=="Import Project") {
						chg = 1;
						txt ="Importer un projet";
					}
if (txt=="Quit") {
						chg = 1;
						txt ="Quitter";
					}
if (txt=="File manager") {
						chg = 1;
						txt ="Gestion des fichiers";
					}
if (txt=="Integration") {
						chg = 1;
						txt ="Presse papier";
					}
if (txt=="Edition") {
						chg = 1;
						txt ="Edition";
					}
if (txt=="Content&nbsp;") {
						chg = 1;
						txt ="Contenu&nbsp;";
					}
if (txt=="Section&nbsp;") {
						chg = 1;
						txt ="Section&nbsp;";
					}
if (txt=="File&nbsp;") {
						chg = 1;
						txt ="Fichier&nbsp;";
					}
if (txt=="Choose a page style") {
						chg = 1;
						txt ="Choisir un style";
					}
if (txt=="Project options") {
						chg = 1;
						txt ="Options du projet";
					}
if (txt=="Project image :") {
						chg = 1;
						txt ="Image du projet :";
					}
if (txt=="&nbsp;Disable top button") {
						chg = 1;
						txt ="&nbsp;Pas de boutons en haut";
					}
if (txt=="&nbsp;Disable navigation in menu") {
						chg = 1;
						txt ="&nbsp;Menu de gauche non actif";
					}
if (txt=="&nbsp;Hide Menu in left") {
						chg = 1;
						txt ="&nbsp;Masquer le menu de gauche";
					}
if (txt=="&nbsp;Save context game and exercise resolutions") {
						chg = 1;
						txt ="&nbsp;Enregistrer le contexte et les exercices remplis";
					}
if (txt=="&nbsp;Each attempt restart at the first page") {
						chg = 1;
						txt ="&nbsp;Redémarrage à la première page à chaque tentative";
					}
if (txt=="&nbsp;&nbsp;Message&nbsp;page&nbsp;Ko&nbsp;:&nbsp;") {
						chg = 1;
						txt ="Message&nbsp;si&nbsp;bloquée&nbsp;:&nbsp;";
					}
if (txt=="insert example") {
						chg = 1;
						txt ="insérer exemple";
					}
if (txt=="Title&nbsp;:&nbsp;") {
						chg = 1;
						txt ="Titre&nbsp;:&nbsp;";
					}
if (txt=="Text&nbsp;:&nbsp;") {
						chg = 1;
						txt ="Texte&nbsp;:&nbsp;";
					}
if (txt=="Insert media") {
						chg = 1;
						txt ="Insérer un média";
					}
if (txt=="Upload a media") {
						chg = 1;
						txt ="Charger un média";
					}
if (txt=="Export to PDF") {
						chg = 1;
						txt ="Exporter en PDF";
					}
if (txt=="&nbsp;Option full screen on video") {
						chg = 1;
						txt ="&nbsp;Option plein écran sur les vidéos";
					}
if (txt=="&nbsp;Disable full menu page on start") {
						chg = 1;
						txt ="&nbsp;Pas de menu plein écran au démarrage";
					}
if (txt=="Display in all cases") {
						chg = 1;
						txt ="Afficher dans tous les cas";
					}
if (txt=="Display in case of a wrong answer on this page") {
						chg = 1;
						txt ="Afficher en cas de mauvaise réponse";
					}
if (txt=="Display if you need help understanding the subject") {
						chg = 1;
						txt ="Afficher en cas de difficultée";
					}
if (txt=="Hide if you need help understanding the subject") {
						chg = 1;
						txt ="Masquer en cas de difficultée";
					}
if (txt=="Display when the document has been completed") {
						chg = 1;
						txt ="Afficher si le document est à 100%";
					}
if (txt=="Hide when the document has been completed") {
						chg = 1;
						txt ="Masquer si le document est à 100%";
					}
if (txt=="Display / Hide :") {
						chg = 1;
						txt ="Afficher / Masquer :";
					}

if (chg==0) {
console.log(txt);
}
}
return txt;
}






//events-reload.js / tags span for type only
function renderpluginoelcontentcardinfo(var1,var2) {

    var h = '<div class="oelcardinfo oelcardinfoline" >';
    h += ' <div class="meta">';
    h += ' <div class="photo" ></div>';
    h += ' </div>';
    h += ' <div class="description">';
    h += ' <div class=oelcardinfoh1 >Learning to Code</div>';
    h += ' <div class=oelcardinfoh2 >Opening a door to the future</div>';
    h += ' <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>';
    h += ' <p class="read-more"><br/></p>';
    h += ' </div>';
    h += ' </div>';

    h += '<span class=typesource style="display:none;" >oelcontentcardinfo</span>';
    
    return h;

}

function renderpluginoelcontentcardinfocircle(var1,var2) {

    var h = '<div class="oelcardinfo oelcardinfolinelarge" >';
 
    h += ' <div class="description">';
    h += ' <div class="oelcardinfoh1 oeltxtcenter" >Learning to Design</div>';
    h += ' <div class="oelcardinfoh2 oeltxtcenter" >Opening a door to elearning</div>';
    h += ' <p class="oeltxtcenter" > Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>';
    h += ' <p class="read-more"><br/></p>';
    h += ' </div>';

    h += ' <div class="metacircle">';
    h += ' <div class="photo" ></div>';
    h += ' </div>';

    h += ' </div>';

    h += '<span class=typesource style="display:none;" >oelcontentcardinfocircle</span>';
    
    return h;

}

function renderpluginoelcontentphotowtitle(var1,var2) {

    var h = '<div class="oelcardinfo" >';
    h += '<div class="fotowtitle">';
    h += '<div class="photo" ></div>';
    h += '<div class="oelcentertitle" ><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p></div>';
    h += '</div></div>';
    
    return h;

}

function renderpluginoelcontentlistbox50(var1,var2) {

    var h = '<div class="oelcardinfo oelcardinfoline" >';
    
    h += '<div class="describox50">';
    h += '<div class=oelcardinfoh3 >Title A</div>';
    h += '<div class=oelcardseparatorline ></div>';
    h += '<ul>';
    h += '<li>Lorem ipsum dolor sit 1.</li>';
    h += '<li>Lorem ipsum dolor sit 2.</li>';
    h += '<li>Lorem ipsum dolor sit 3.</li>';
    h += '<li>Lorem ipsum dolor sit 4.</li>';
    h += '</ul></div>';
    
    h += '<div class="describox50">';
    h += '<div class=oelcardinfoh3 >Title B</div>';
    h += '<div class=oelcardseparatorline ></div>';
    h += '<ul>';
    h += '<li>Lorem ipsum dolor sit 5.</li>';
    h += '<li>Lorem ipsum dolor sit 6.</li>';
    h += '<li>Lorem ipsum dolor sit 7.</li>';
    h += '<li>Lorem ipsum dolor sit 8.</li>';
    h += '</ul></div>';
    
    h += '</div>';
    
    return h;

}

function renderpluginoelcontentlistboximg50(var1,var2) {

    var h = '<div class="oelcardinfo oelcardinfoline" >';

    h += '<div class="describox50">';
    h += '<div class=oelcardinfoh3 >Title A</div>';
    h += '<div class=oelcardseparatorline ></div>';
    h += '<ul>';
    h += '<li>Lorem ipsum dolor sit 1.</li>';
    h += '<li>Lorem ipsum dolor sit 2.</li>';
    h += '<li>Lorem ipsum dolor sit 3.</li>';
    h += '<li>Lorem ipsum dolor sit 4.</li>';
    h += '<li>Lorem ipsum dolor sit 5.</li>';
    h += '</ul></div>';

    h += '<div class="descrimg50">';
    h += '<div class="photo" ></div>';
    h += '</div>';
    
    return h;

}


function displayFileEdit() {

	if($("#dataFileEditWindows").length==0){
		
		var bdDiv = '<div id="dataFileEditWindows" class="dataFileEditWindows " >';

        bdDiv += '<div class="gjs-mdl-dialog-v3 gjs-one-bg gjs-two-color" >';
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title">Edition</div>';
		bdDiv += '</div></div>';

		bdDiv += '<div class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;text-align:center;" >';

		bdDiv += 'File';
		bdDiv += '<input readonly="readonly" id="inputFileShowLink" type="text" value="'+filePageData+'" ';
		bdDiv += ' style="width:384px;font-size:12px;padding:5px" />';
		bdDiv += '<br/><br/>';
		bdDiv += '<a onClick="loadAFilePage();" ';
		bdDiv += ' style="border:solid 1px gray;padding:5px;padding-bottom:2px;padding-left:16px;padding-right:16px;cursor:pointer;color:white;width:50px;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonSave" >';
		bdDiv += '<img src="icon/folder16.png" />';
		bdDiv += '</a>';
		
		bdDiv += '<br/>';
		
		bdDiv += '<div id="overviewfilepage" class="overviewfilepage" >';
		bdDiv += '</div>';

		bdDiv += '</div>';

		bdDiv += '</div>';

		$('body').append(bdDiv);

	}

	viewAFilePageGlobal();
	traductAll();
}

function loadAFilePage(){
	menuLudiBack();
	filterGlobalFiles = '.mp4.pdf';
    showFileManagerStudio2(23,'inputFileShowLink','refreshAFilePageGlobal');
}

function refreshAFilePageGlobal(){

    $('.ui-widget-overlay').css("display","none");
	$('.workingProcessSave').css("display","none");
	
	$('#overviewfilepage').html("");

	var fileA =$('#inputFileShowLink').val();

	viewAFilePageGlobal();

	$.ajax({
		url : '../ajax/params/params-get.php?step=4&idpg=' + idPageHtml + '&idteach=' + idPageHtmlTop+'&opt='+fileA,
		type: "POST",
		success: function(data,textStatus,jqXHR){
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			$('#inputFileShowLink').val("");
			$('#overviewfilepage').html("error");
		}
	});

}

function viewAFilePageGlobal(){
	
	$('#overviewfilepage').html("");

	var validfile = false;

	var fileA = $('#inputFileShowLink').val();

    if (fileA!=''&&
	fileA.toLowerCase().indexOf('.mp4')!=-1){
		validfile = true;
        $('#overviewfilepage').html("<video style='width:100%;height:100%;' src='"+fileA+"' muted controlsList='nodownload nofullscreen' ></video>");
    }

	if (fileA!=''&&
	fileA.toLowerCase().indexOf('.pdf')!=-1){
		validfile = true;
        $('#overviewfilepage').html("<img style='margin-top:40px' src='icon/file-pdf.png' />");
    }

	if (validfile==false) {
		$('#inputFileShowLink').val("");
		$('#overviewfilepage').html("");
	}

}

function menuLudiBack() {
	$('.ludimenu').css("z-index","99");
}

var clipboardDataTxt = "";
var clipboardHaveImage = false;
var clipboardBlob;
var clipboardBlob64;
var onePasteOnly = true;

function catchEventPaste(){

    if(onePasteOnly){
        if(clipboardDataTxt!=''){
            pasteWindowsShow(true);
            onePasteOnly = false;
        }
        if(clipboardHaveImage){
            pasteWindowsShow(true);
            onePasteOnly = false;
        }
    }

}

function installEventPaste(){

    var iframe = $('.gjs-frame');
	var iframeBody = iframe.contents().find("body");
    
    window.addEventListener("paste", function(thePasteEvent){
        if (windowEditorIsOpen == false ) {
            haveImageClip(thePasteEvent);
            if (clipboardHaveImage==false) {
                var dataH = thePasteEvent.clipboardData.getData('text/html');
                if (dataH.length>3) {
                    clipboardDataTxt = dataH;
                    catchEventPaste();
                }
            }else{
                clipboardDataTxt = '';
                catchEventPaste();
            }
        }
    }, false);

    window.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveSourceFrame(false,false,0);
            // console.log('CTRL + S');
        }
    });

    const keymaps = editor.Keymaps;
    
    keymaps.add('ns:my-keymap', '⌘+s, ctrl+s','saveEventShortCall');
    
    editor.Commands.add("saveEventShortCall", { 
        run: function(editor) { 
            saveEventShortCallFct(editor);
        }
    });

}

var timerInstallEventPaste = setTimeout(function(){
    installEventPaste();
},500);

function saveEventShortCallFct(editor){
    console.log('do saveEventShortCall');
}

function haveImageClip(event){

    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    console.log(JSON.stringify(items)); // will give you the mime types
    for (index in items) {
        var item = items[index];
        if (item.kind === 'file') {
            clipboardHaveImage = true;
            clipboardBlob = item.getAsFile();
            var reader = new FileReader();
            reader.onload = function(event){
                //console.log(event.target.result)
                clipboardBlob64 = event.target.result;
            }; // data url!
            reader.readAsDataURL(clipboardBlob);
        }
    }

}

var timerTabActive = setTimeout(function(){
    activeMaskCopyPaste()
},1000);

var isTabActive = false;
var decTabActiv = false;
var firstDivMask = 0;
var tickScrollEvt = 0;

$(window).on("focus", function(e) {
    if (decTabActiv==false) {
        isTabActive = true;
        $( ".maskpause" ).css("display","none");
    }
})

document.addEventListener("visibilitychange", event => {
    if (document.visibilityState == "visible") {
        isTabActive = true;
    } else {
        isTabActive = false;
    }
})

function activeMaskCopyPaste(){

    if (isTabActive==false) {
        $( ".maskpause" ).css("display","block");
        deleteAllTopMenu();
        tickScrollEvt = 0;
        decTabActiv = true;
        if (firstDivMask==0) {
            $( ".maskpause" ).css("display","none");
            deleteAllTopMenu();
            firstDivMask = 1;
            isTabActive = true;
        }
    }
    timerTabActive = setTimeout(function(){
        activeMaskCopyPaste();
    },500);
    
}

function pasteWindowsShow(fromevent){

    if($("#TeachDocPasteEditWindows").length==0){

		var bdDiv = '<div id="TeachDocPasteEditWindows" class="gjs-mdl-container" style="" >';
        bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" ';
        bdDiv += ' style="max-width:800px!important;" >';
        bdDiv += '<div class="gjs-mdl-header">';
        bdDiv += '<div class="gjs-mdl-title">Integration process</div>';
        bdDiv += '<div class="gjs-mdl-btn-close gjs-mdl-btn-close-audio" ';
        bdDiv += ' onClick="closeAllEditWindows()" ';
        bdDiv += ' data-close-modal="">⨯</div>';
        bdDiv += '</div>';

        bdDiv += '<div id="superpastecontent" class="gjs-am-add-asset" ';
        bdDiv += 'style="padding:25px;padding-top:10px;font-size:15px;height:350px;overflow:auto;background-color:white;" >';
        bdDiv += '</div>';

        bdDiv += '<div style="padding:25px;text-align:center;" >';
        bdDiv += '<input id="btnPasteEditWindows" onClick="addPasteEditWindows()" ';
        bdDiv += ' style="border:solid 1px gray;padding:12px;cursor:pointer;color:white;" ';
        bdDiv += ' class="gjs-one-bg ludiButtonSave" type="button" value="Insert" />';

        bdDiv += '<input id="btnPasteEditWindowsError" ';
        bdDiv += ' style="border:solid 1px gray;padding:12px;cursor:pointer;color:white;" ';
        bdDiv += ' class="gjs-one-bg ludiButtonSave" type="button" value=" Error  !" />';

        bdDiv += '<br/></div>';

		bdDiv += '</div>';

		$('body').append(bdDiv);
	}

    if($("#TeachDocPasteEditWindows").length==1){
        
		loadaFunction();
        
        if (fromevent) {

            if (clipboardHaveImage==false ) {
                $('#superpastecontent').html(clipboardDataTxt);
                CleanPasteWindowsTexte();
                clipboardDataTxt = $('#superpastecontent').html();
                $('#btnPasteEditWindows').css("display","");
            } else {
                $('#superpastecontent').html("<img src='' id='previewclipimage' style='width:76%;margin-left:12%;' />");
                $('#previewclipimage').attr("src",URL.createObjectURL(clipboardBlob));
                onePasteOnly = true;
                $('#btnPasteEditWindows').css("display","");
                $('#btnPasteEditWindowsError').css("display","none");
            }

        } else {

            $('#superpastecontent').html('');
            $('#btnPasteEditWindows').css("display","none");

            $('#btnPasteEditWindowsError').css("display","none");

            $(document).focus(); 
            $(window).focus(); 
        
        }

		$('.ludimenu').css("display","none");
		$('#TeachDocPasteEditWindows').css("display","");
        traductAll();

	}

}

function addPasteEditWindows(){

    $('#btnPasteEditWindows').css("display","none");

    var gjsHtml = localStorage.getItem("gjs-html-" + idPageHtml);

    var ctrFinaltag = gjsHtml.slice(-6);
	if(ctrFinaltag=="</div>"){
    
        if (clipboardHaveImage ) {
            
            uploadImageToCache();

        } else {

            var tb = '<table class="teachdoctext" onmousedown="parent.displayEditButon(this);" >'
            tb += '<tbody><tr><td class="teachdoctextContent">';
            tb += clipboardDataTxt;
            tb += '</td></tr></tbody></table>';
            gjsHtml =  gjsHtml.slice(0, -6) + tb + "</div>";
            localStorage.setItem("gjs-html-" + idPageHtml,gjsHtml);
            loadFXObjectevent = true;
            saveSourceFrame(false,false,0);

        }

    }

}

function uploadImageToCache(){

    const formData = new FormData();

    const req = new XMLHttpRequest();
    req.open('POST', '../ajax/ajax.upldblob.php?class=1', true);
    req.onload = function () {
        if (req.status >= 200 && req.status < 400) {
            const res = req.responseText;
            if (res.indexOf("KO")==-1) {
                console.log("load :" + res);
                moveFinalImageToWorkingFolder(res);
            } else {
                console.log("error pass 1 :" + res);
                uploadImageToCachePass2();
            }
        }
    };

    /* Create a new FileReader. */
    var fileReader = new FileReader();

    fileReader.onload = function(event) {
        /* Once the file has finished loading, run the following: */
        formData.append("file64", this.result);
        req.send(formData);
    };
    
    /* Tell the file reader to asynchronously load the files contents. */
    fileReader.readAsDataURL(clipboardBlob);

}

function uploadImageToCachePass2(){

    var v = Math.floor(Math.random() * 10000);
    const formData = new FormData();

    formData.append('file', clipboardBlob);
    
    const req = new XMLHttpRequest();
    req.open('POST', '../ajax/ajax.upldblob.php?class=1', true);
    req.onload = function () {
        if (req.status >= 200 && req.status < 400) {
            const res = req.responseText;
            if (res.indexOf("KO")==-1) {
                console.log("load :" + res);
                moveFinalImageToWorkingFolder(res);
            } else {
                console.log("error :" + res);
                $('#btnPasteEditWindowsError').css("display","");
            }
        }
    };

    req.send(formData);

}

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}

function moveFinalImageToWorkingFolder(imageName){

    var formData2 = {
        id : idPageHtml,
        name : imageName
    };
    $.ajax('../ajax/ajax.upldblob.php?step=2', {
        method: "POST",
        data: formData2,
        success: function (res) {
            if (res.indexOf("KO")==-1) {
                console.log("uplload :" + res);
                insertImgIntoDoc(res);
            }
        },
        error: function (data) {
            console.log("error :" + data);
        }
    });

}

function insertImgIntoDoc(imagePath){

    var gjsHtml = localStorage.getItem("gjs-html-" + idPageHtml);
    var ctrFinaltag = gjsHtml.slice(-6);

	if(ctrFinaltag=="</div>"){

        var tb = "<img class='bandeImg' src='" + imagePath + "' />";
        gjsHtml =  gjsHtml.slice(0, -6) + tb + "</div>";
        localStorage.setItem("gjs-html-" + idPageHtml,gjsHtml);
        loadFXObjectevent = true;
        saveSourceFrame(false,false,0);

    }
}

function CleanPasteWindowsTexte(){

    $('#superpastecontent p').each(function(){
        CleanOneElementPaste($(this));
    });
    $('#superpastecontent a').each(function(){
        weight = $(this).css('font-weight');
        $(this).attr('style','');
        $(this).attr('target','_blank');
        $(this).removeClass();
        $(this).css('font-weight',  weight);
    });
    $('#superpastecontent span').each(function(){
        CleanOneElementPaste($(this));
    });
    $('#superpastecontent ul').each(function(){
        CleanOneElementPaste($(this));
    });
    $('#superpastecontent li').each(function(){
        CleanOneElementPaste($(this));
    });
    $('#superpastecontent h1').each(function(){
        CleanOneElementPaste($(this));
    });
    $('#superpastecontent h2').each(function(){
        CleanOneElementPaste($(this));
    });
    $('#superpastecontent h3').each(function(){
        CleanOneElementPaste($(this));
    });
    $('#superpastecontent h4').each(function(){
        CleanOneElementPaste($(this));
    });

    //clean wikipedia.org update
    $('#superpastecontent a').each(function(){
        var hrefloc = $(this).attr('href');
        if (hrefloc.indexOf("wikipedia.org")!=-1) {
            if (hrefloc.indexOf("action=edit")!=-1) {
                $(this).remove();
            }
        }
    });

}

function CleanOneElementPaste(Tobj){

    var weight = Tobj.css('font-weight');
    var colorT = Tobj.css('color');

    Tobj.attr('style','');
    Tobj.removeClass();
    Tobj.css('font-weight',  weight);

    var colorC = colorT.replace(/[^0-9,]+/g, "");
    var red = colorC.split(",")[0];
    var gre = colorC.split(",")[1];
    var blu = colorC.split(",")[2];
    if (red<20&&gre<20&&blu<20) {
        colorT = 'black';
    }
    if (colorT!='black') {
        Tobj.css('color',colorT);
    }
}

function displaySubPageEdit(i){
	
	refIdPageLudi = i;
	
	saveSourceFrame(false,false,0);
	
	$('.ludimenu').css("z-index","2");

	if($("#pageEditAdd").length==0){

		var bdDiv = '<div id="pageEditAdd" class="gjs-mdl-container" >';

		bdDiv += '<div class="gjs-mdl-dialog-v2 gjs-one-bg gjs-two-color" style="max-width:575px;" >';
		bdDiv += '<div class="gjs-mdl-header">';
		bdDiv += '<div class="gjs-mdl-title trd">Edition</div>';
		bdDiv += '<div class="gjs-mdl-btn-close" onClick="closeAllEditWindows()" data-close-modal="">⨯</div>';
		bdDiv += '</div>';
		
		bdDiv += '<div class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;" >';

		bdDiv += '<div class="gjs-am-add-asset oelTitlePage" style="padding:4px;" >Title&nbsp;:&nbsp;';
		bdDiv += '<input id="inputTitlePage" type="text" value="" style="width:450px;font-size:14px;padding:4px;" />';
		bdDiv += '</div>';

        bdDiv += '<div id="oelTitleload" class="gjs-am-add-asset" ';
		bdDiv += 'style="padding:25px;font-size:16px;display:none;" >';
        bdDiv += '<p style="text-align:center;" ><br/><img src="img/cube-oe.gif" /><br/><br/></p>';
		bdDiv += '<br/>';
		bdDiv += '</div>';

		bdDiv += '<div class="gjs-am-add-asset oelTitlePage" style="padding:16px;padding-left:40px;" >';
		bdDiv += '<input type="radio" ';
		bdDiv += 'id="typenode2" name="typenode" ></input>';
		bdDiv += '<label style="cursor:pointer;" class="trd" for=typenode2 >Content&nbsp;</label>&nbsp;&nbsp;';

		bdDiv += '<input type="radio" ';
		bdDiv += 'id="typenode3" name="typenode" ></input>';
		bdDiv += '<label style="cursor:pointer;" class="trd" for=typenode3 >Section&nbsp;</label>&nbsp;&nbsp;';
		
		bdDiv += '<input type="radio" ';
		bdDiv += 'id="typenode4" name="typenode" ></input>';
		bdDiv += '<label style="cursor:pointer;" class="trd" for=typenode4 >File&nbsp;</label>';

		bdDiv += '</div>';

		bdDiv += '<div class="gjs-am-add-asset oelChosePage" style="display:none;" >';
		bdDiv += '<img class="tpl-page-loader" src="img/loadsave.gif" style="margin:35px;display:none;" />';
		bdDiv += '<p class="tpl-page-title trd" >Choose a page style</p>';
        bdDiv += '<img onClick="selectTplPage(0);" class="tpl-page-select tplpage0" src="templates/pages/p0.jpg" />';
		bdDiv += '<img onClick="selectTplPage(1);" class="tpl-page-select tplpage1" src="templates/pages/p1.jpg" />';
		bdDiv += '<img onClick="selectTplPage(2);" class="tpl-page-select tplpage2" src="templates/pages/p2.jpg" />';
		bdDiv += '</div>';

		bdDiv += '<br/>';


		bdDiv += '<div class="oelInputAdd1" style="padding:25px;text-align:right;" >';
		bdDiv += '<input id="inputAddSubPage" onClick="saveNextSubLudi()" ';
		bdDiv += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonSave trd" type="button" value="Add" /><br/>';
		bdDiv += '</div>';

		bdDiv += '<div class="oelInputAdd2" style="padding:25px;text-align:right;display:none;" >';
		bdDiv += '<input id="inputAddSubPage" onClick="saveNextSubLudiFinal()" ';
		bdDiv += ' style="border:solid 1px gray;padding:7px;cursor:pointer;color:white;" ';
		bdDiv += ' class="gjs-one-bg ludiButtonSave trd" type="button" value="Valid" /><br/>';
		bdDiv += '</div>';


		bdDiv += '</div>';

		bdDiv += '</div>';

		bdDiv += '<div class="gjs-mdl-collector" style="display: none"></div>';
		bdDiv += '</div>';

		$('body').append(bdDiv);

	}

	if($("#pageEditAdd").length==1){
		
		windowEditorIsOpen = true;
		loadaFunction();
		$('.ludimenu').css("display","none");
		$('#oelTitleload').css("display","none");
		$('#pageEditAdd').css("display","");

		$('#typenode2').attr('checked',true);
		$('#typenode3').attr('checked',false);
		$('#typenode4').attr('checked',false);

		$('#inputTitlePage').focus();
	}

}

function inIframe(){
	if(top.frames.length == 0) {
		return false;
	}else{
		return true;
	}
}

function cleText(s){
	if (s == 'undefined'){return "";}
	if (typeof(s) == 'undefined'){return "";}else{return s;}
}

function getFileNameByUrl(url){
	if (url.indexOf('/')!=-1) {
		url = url.substring(url.lastIndexOf('/')+1);
	} else {
		if (url.indexOf('\\')!=-1) {
			url = url.substring(url.lastIndexOf('\\')+1);
		}
	}
	return url;
}

function cleTextAct(s){
	if (s == 'undefined'){
		s = "";
	}
	if (typeof(s) == 'undefined'){
		s = "";
	}
	s = s.replace('\'','&apos;');
	s = s.replace('\'','&apos;');
	s = s.replace('\'','&apos;');
	s = s.replace('\'','&apos;');
	s = s.replace(/'/g,'');
	s = s.replace(/$/g,'');
	return s;
}


function cleTextTitle(s){
	if (s == 'undefined'){
		s = "";
	}
	if (typeof(s) == 'undefined'){
		s = "";
	}
	s = s.replace('\'','&apos;');
	s = s.replace('\'','&apos;');
	s = s.replace('\'','&apos;');
	s = s.replace('\'','&apos;');
	s = s.replace(/'/g,'');
	s = s.replace(/$/g,'');
	return s;
}