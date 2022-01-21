
var ludiicon = _p['web_plugin'] + 'adv_oel_tools_teachdoc/img/base/oeltools32.png';
var ludiiconplus = _p['web_plugin'] + 'adv_oel_tools_teachdoc/img/base/oeltools32plus.png';
var caneditparamicon = false;

$(document).ready(function($){
	
	var teachdocLstIds = $('#teachdocLstIds').html();

	if(teachdocLstIds!="no"){

		//cidReq
		var valRef = getParamValueForOelTools('cidReq');
		var h = '<a href="'+ _p['web_plugin'] + 'adv_oel_tools_teachdoc/oel_tools_teachdoc_link.php?action=add&cidReq='+valRef+'" ';
		h += ' style="cursor:pointer;" ';
		h += ' alt="Studio Tools" title="Studio Tools">';
		h += '<img id="studioeltools" src="'+ ludiiconplus + '" ';
		h += ' alt="Studio Tools" title="Studio Tools" style="cursor:pointer;" /> ';
		h += '</a>';
		$('#actions-lp').find("div:first-child").find("div:first-child").append(h);
		
		if(teachdocLstIds==''){
			getOelToolsId();
		}else{
			installExtrasToolsOelTools(teachdocLstIds);
			setTimeout(function(){getOelToolsId();},2000);
		}

	}

});

function installExtrasToolsOelTools(teachdocLstIds){

	var action = getParamValueForOelTools('action');
	var lpId = getParamValueForOelTools('lp_id');

	if(action=="add_item"&&lpId!=''){
		
		if(teachdocLstIds.indexOf(','+lpId+',')!=-1){
			$('#doc_form').html('<img style="width:100%;" src="'+ _p['web_plugin'] + 'adv_oel_tools_teachdoc/img/base/oel_tools.jpg" />');
			$('#lp_sidebar').html('<center><img style="width:16px;" src="'+ _p['web_plugin'] + 'adv_oel_tools_teachdoc/img/loadsave.gif" /></center>');
			setTimeout(function(){
				window.location.href = _p['web_plugin'] + "adv_oel_tools_teachdoc/oel_tools_teachdoc_link.php?action=redir&idLudiLP=" + parseInt(lpId);
			},1500);
		}

	}

	if(
		(action==''&&lpId=='')
		||action=='switch_view_mode'||action=='delete'||action=='move_lp_up'||action=='move_lp_down'||action=="list"
	){

		var feedUpdateSplit = teachdocLstIds.split(",");
		var anchors = document.getElementsByTagName("a");

		for (var i = 0; i < anchors.length; i++) {
			
			for (var x = 0; x < feedUpdateSplit.length; x++){

				if(feedUpdateSplit[x]!=''){

					if(feedUpdateSplit[x]=='canedit'){
						caneditparamicon = true;
					}else{

						var idlp = parseInt(feedUpdateSplit[x]);
						var aObj = anchors[i];

						if(aObj.href.indexOf("lp_controller.php")!=-1){
							if((aObj.href.indexOf("lp_id="+idlp+"&")!=-1)
							&&aObj.href.indexOf("teachdoc=")==-1){

								var labObj = $(aObj).find('.lp_content_type_label');
								labObj.html("<em>TeachDoc tools</em>");
								
								var iObj = $(aObj).prev();
								iObj.attr('src',ludiicon);
								iObj.css('height','24px').css('width','24px');

								if(caneditparamicon){
									aObj.href = aObj.href + "&teachdoc=edit";
								}
								
							}
						}
					
					}
				}
			}

		}
	}
}

function getParamValueForOelTools(param){
	var u = window.top.location.href;var reg=new RegExp('(\\?|&|^)'+param+'=(.*?)(&|$)');
	matches=u.match(reg);
	if(matches==null){return '';}
	var vari=matches[2] != undefined ? decodeURIComponent(matches[2]).replace(/\+/g,' ') : '';
	return vari;
}

function getOelToolsId(){

	$.ajax({
		url : _p['web_plugin'] + 'adv_oel_tools_teachdoc/ajax/oel_tools_teachdoc_getids.php',
		type: "GET",
		success: function(data,textStatus,jqXHR){
			if(data.indexOf('KO')==-1){
				teachdocLstIds = data;
				installExtrasToolsOelTools(teachdocLstIds);
			}
			
		},error: function (jqXHR, textStatus, errorThrown){

		}
	});


}