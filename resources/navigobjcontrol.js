
function ctrlpl(i,behavior,pid,pagebehav) {
    
    //Main menu
    if (behavior==-100) {
        if(pid<scoPageAPI||pid==scoPageAPI){
            lpl(i,behavior,pagebehav);
        } else {
            return false;
        }
    }

    //if is next page
    if (pid==scoPageAPI+1&&pageBindex==scoPageAPI) {

    } else {
        if (pid>scoPageAPI&&pid>1&&pagebehav!=0) {
            return false;
        }
    }

    var haveRedir = false;

    var ctrPage = LUDI.pageIsOk();
    if(scoPageAPI>pageBindex||i<pageBindex){
        ctrPage = true;
    }
    if(pid<scoPageAPI||pid==scoPageAPI){
        ctrPage = true;
    }
    if(context_data_resolve.indexOf(";"+pageBindex+";")!=-1){
        ctrPage = true;
    }
    
    if(pid>pageBindex+1&&pid>scoPageAPI&&pagebehav!=0){
        ctrPage = false;
    }else{
        if(ctrPage){
            if (pid>scoPageAPI) {
                context_data_resolve += pageBindex+';';
            }
            setContextData();
            lpl(i,behavior,pagebehav);
            haveRedir = true;
        }else{
            showTopMessage();
        }
    }

    //if is next page
    if (pid==scoPageAPI+1&&pageBindex==scoPageAPI) {

    } else {
        if (haveRedir==false) {
            if (pagebehav==0) {
                lpl(i,behavior,-99);
            }
        }
    }

}

function fakeLoadInPanel() {

    var fakeLoad = "<div class=fakeLoadFrame >";
    fakeLoad += "<div class='loadbarre' style='width:340px;' /></div>";
    fakeLoad += "<div class='loadbarre loadbarre1' style='width:240px;display:none;' /></div>";
    fakeLoad += "<div class='loadbarre loadbarre2' style='width:240px;display:none;' /></div>";
    fakeLoad += "<div class='loadbarre loadbarre3' style='width:340px;display:none;' /></div>";
    fakeLoad += "<div class='loadbarre loadbarre4' style='width:140px;display:none;' /></div>";
    fakeLoad += "<div class='loadbarre loadbarre5' style='width:240px;display:none;' /></div>";
    fakeLoad += "<div class='loadbarre loadbarre6' style='width:140px;display:none;' /></div>";
    fakeLoad += "</div>";
    
    var panel = document.querySelector(".panel-teachdoc");
    if(!panel){
        panel = document.querySelector(".panel-teachdoc-large");
    }
    if(panel){
        panel.style.top = '90px';
        panel.style.height = '350px';
        panel.innerHTML = fakeLoad;
    }

    setTimeout(function(){
        $(".loadbarre1").css('display','block');
        setTimeout(function(){
            $(".loadbarre2").css('display','block');
            setTimeout(function(){
                $(".loadbarre3").css('display','block');
                setTimeout(function(){
                    $(".loadbarre4").css('display','block');
                    setTimeout(function(){
                        $(".loadbarre5").css('display','block');
                        setTimeout(function(){
                            $(".loadbarre6").css('display','block');
                        },200);
                    },200);
                },200);
            },200);
        },200);
    },200);

}

function lpl(id,behavior,pagebehav) {
    
	if(id==0||id==-1){
		return false;
	}
	
    var ipg = 30;
    for(var ip=0; ip < ipg; ip++){
        $(".NodeLvl" + ip).removeClass("activeli");
    }

    $(".pgh" + id).css("background-color","#A9D0F5");

   fakeLoadInPanel();
    
    $(".fixed-top-nav").css("opacity","0.5");
    $(".div-teachdoc").css("opacity","0.5");
    $(".panel-teachdoc").css("opacity","0.5");
    $(".panel-teachdoc-large").css("opacity","0.5");

    if(window.parent.document) {
        if(window.parent.document.getElementById('content_id')) {
            window.parent.document.getElementById('content_id').style.backgroundColor = window.document.body.style.backgroundColor;
        }
    }
    
    var v = Math.floor(Math.random() * 10000);

    if ((pagebehav+"").indexOf("load=")!=-1) {
        window.location.href = "teachdoc-"+id+".html?"+pagebehav+"&v="+v+"&b=";
    }else{
        window.location.href = "teachdoc-"+id+".html?v="+v+"&b="+pagebehav;
    }
    
}

function installProgress() {
    
    if (typeof progressBtop == 'undefined') {
        return false;
    }

    var _percent = 0;
    var progressStep = Math.round(100 / progressBtop) - 1;
    var pageBindexVirtual = pageBindex;

    pageBindexVirtual = getLMSLocation();

    if (pageBindexVirtual==progressBtop||progressBtop==1) {
        _percent = 100;
        setTimeout(function(){
            CheckLMSFinishFinal();
            $(".barre-ludi-progress").css('background-color','#04B45F');
        },1200);
        showLevelBlocs("E");
        hideLevelBlocs("F");
    } else {
        if(progressBtop>0&&pageBindexVirtual>0){
            _percent = Math.round((pageBindexVirtual/progressBtop)*100);
        }
    }

    var textProgress = document.querySelector(".left-text-progress");
    var panelProgress = document.querySelector(".barre-ludi-progress");
    var leftProgress = document.querySelector(".left-barre-progress");

    if (panelProgress) {
        
        if (progressStep>0) {
            
            panelProgress.style.width = _percent - progressStep + "%";
            leftProgress.style.width = _percent - progressStep + "%";

            if (_percent>2) {
                textProgress.innerHTML = parseInt(_percent-2) + "%";
            } else {
                textProgress.innerHTML = parseInt(_percent) + "%";
            }
            
            setTimeout(function(){
                
                $(".barre-ludi-progress").animate({
                    width: _percent + "%"
                },1000,function(){
                });

                $(".left-barre-progress").animate({
                    width: _percent + "%"
                },1000,function(){
                });

            },100);

            if (_percent>2) {
                setTimeout(function(){
                    textProgress.innerHTML = parseInt(_percent-2) + "%";
                    setTimeout(function(){
                        textProgress.innerHTML = parseInt(_percent-1) + "%";
                        setTimeout(function(){
                            textProgress.innerHTML = parseInt(_percent) + "%";
                        },300);
                    },300);
                },300);
            }
            
        } else {
            panelProgress.style.width = _percent + "%";
        }
       
    }

}

function behaviorGetParamVal(param){
	
	var u = document.location.href;
	var reg = new RegExp('(\\?|&|^)'+param+'=(.*?)(&|$)');
	matches = u.match(reg);
	
	if(matches==null){return '';}
	
	var vari=matches[2] != undefined ? decodeURIComponent(matches[2]).replace(/\+/g,' ') : '';
	
	return vari;
	
}

function installVirtualClick(){
    var element = document.querySelectorAll("a.btn-btnTeach");
    if(element&&element.length>0){
        for(let i = 0; i < element.length; i++){
            var aObj = element[i];
            aObj.href="javascript:void(0);";
            aObj.addEventListener("click", function() {
                virtualClick(this);
            });
        }
    }else{
        setTimeout(function(){
            installVirtualClick();
        },300);
    }
}

function virtualClick(obj){
    
    var aclik = $(obj);
    var ascri = obj.parentNode.querySelectorAll("span.datatext4");
    if(ascri.length==1){
        var evalScript = ascri[0].innerHTML;
        //alert(evalScript);
        
        if (evalScript.indexOf("url@")!=-1) {
            var linkW = evalScript.replace('url@','');

            fakeLoadInPanel();

            $(".fixed-top-nav").css("opacity","0.5");
            $(".div-teachdoc").css("opacity","0.5");
            $(".panel-teachdoc").css("opacity","0.5");
            $(".panel-teachdoc-large").css("opacity","0.5");
            top.location.href = linkW;

        }else{

            if (evalScript.indexOf("dow@")!=-1) {
                var linkW = evalScript.replace('dow@','');
                top.open(linkW,'_blank')
            }else{
                eval(evalScript);
            }
        }

    }
    
}

setTimeout(function(){
    installVirtualClick();
},200);

function isObjSub(tObj){

    if(tObj.find(".dotSubLudi").length>0){
        return true;
    }else{
        return false;
    }

}

function applyLifeAnim(){
    applyLifeAnimOne(parseInt(context_data_life)+1);
    applyLifeAnimOne(parseInt(context_data_life)+2);
    applyLifeAnimOne(parseInt(context_data_life)+3);
}

function applyLifeAnimOne(i){

    $("#ui-life-bar").animate({
        right: "2px"
    },50, function() {
        $("#ui-life-bar").animate({
            right: "0px"
        },50, function() {
            $("#ui-life-bar").animate({
                right: "2px"
            },50, function() {
                $("#ui-life-bar").animate({
                    right: "0px"
                },50, function() {
                });
            });
        });
    });

    var objAnim = $("#ui-life-bar").find("#lifeopt"+i);
    objAnim.animate({
        width: "0px"
    },1000, function() {
    });

}

function applyLifeHideOne(i){
    var objAnim = $("#ui-life-bar").find("#lifeopt"+i);
    objAnim.css("width","0px");
}

function cleanDomTexts(){
 
    var oriClass = '';

    $(".teachdoctext").each(function(index){
        var obj = $(this);
        oriClass = getTableClassOrigine(obj);
        obj.removeClass();
        obj.addClass("teachdoctext").addClass(oriClass);
    });
    $(".quizzTextqcm").each(function(index){
        var obj = $(this);
        oriClass = getTableClassOrigine(obj);
        obj.removeClass();
        obj.addClass("quizzTextqcm").addClass(oriClass);
    });
    $(".qcmbarre").each(function(index){
        var obj = $(this);
        oriClass = getTableClassOrigine(obj);
        obj.removeClass();
        obj.addClass("qcmbarre").addClass(oriClass);
    });

}

function getTableClassOrigine(objT){
	var dhC = '';
	if (objT.hasClass("displayhideCondiMA")) {
		dhC = "displayhideCondiMA";
	}
	if (objT.hasClass("displayhideCondiMB")) {
		dhC = "displayhideCondiMB";
	}
	if (objT.hasClass("displayhideCondiMC")) {
		dhC = "displayhideCondiMC";
	}
	if (objT.hasClass("displayhideCondiMD")) {
		dhC = "displayhideCondiMD";
	}
	if (objT.hasClass("displayhideCondiME")) {
		dhC = "displayhideCondiME";
	}
	if (objT.hasClass("displayhideCondiMF")) {
		dhC = "displayhideCondiMF";
	}
	return dhC;
}

installMenuLocation();
installImgOverviewEvents();
installProgress();
cleanDomTexts();

setTimeout(function(){
    applyCheckExercices();
    resizeAutoIframe();
},1100);

var onetimeprocess = 0; 

function Teachscript(){

    this.pageIsOk = function(){
        
        var ctrPage = true;
        
        ctrPage = pageControlsAllQuizz();

        if(context_data_resolve.indexOf(";"+pageBindex+";")!=-1){
            ctrPage = true;
        }

        return ctrPage;
        
    };

    this.nextPageIfOK = function(){
        
        if(this.pageIsOk()){
            context_data_resolve += pageBindex+';';
            setContextData();
            this.nextPage();
        }else{
            showTopMessage();
        }

    };

    this.nextPage = function() {

        if(pageBindex<progressBtop){
            var pageBi = pageBindex + 1;
            var lvl = basePages[pageBi];
            ctrlpl(lvl);
        }

    };

    this.prevPage = function(s) {
        if(pageBindex>1){
            var pageBi = pageBindex - 1;
            var lvl = basePages[pageBi];
            ctrlpl(lvl);
        }
    };

    this.checkAll = function(){
        checkAnswers();
    }

    this.nextPageIsOK = function(){

    };

    this.getNumPage = function(){
        
    };

    this.goPage = function(ip){
        
    };
    
    this.wait = function(s){
        
    };
    
    this.waitReset = function() {
        
    };
    
    this.deleteLife = function() {

        if (onetimeprocess==0) {
            onetimeprocess = 1;
            if(context_data_life>0){
                context_data_life = context_data_life - 1;
            }
            applyLifeAnim();
            setContextData();

            setTimeout(function(){
                onetimeprocess = 0;
                if (document.getElementById("ui-life-bar")){
                    if(context_data_life==0){
                        var v = Math.floor(Math.random() * 20);
                        window.location.href = "index.html?load=first&v=go"+v;
                    }
                }
            },1000);
        }

    };
    
    this.addLife = function(){
        if (context_data_life<10) {
            context_data_life = context_data_life + 1;
            applyLifeAnim();
            setContextData();
        }
    };

    this.Reset = function(){
        LUDI.goPage(0);
    };
    
    this.randomId = function() {
        function s5() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s5()+s5()+'-'+s5()+'-'+s5()+'-'+s5()+'-'+s5()+s5()+s5();
    };
    
    this.guid = function() {
        return this.randomId();
    };
  
}

var LUDI = new Teachscript();

function pageControlsAllQuizz(){

    var ctrPage = true;

    $('span.errorflag').remove();
    
    var allTables = $(".panel-teachdoc").find("table");
    allTables.each(function(index){
        var tabG = $(this);
        if(tabG.hasClass("qcmbarre")){
            var objCtr = tabG.find('.xboxqcm');
            var srcCtr = objCtr.attr("src");
            if(srcCtr){
                if(srcCtr.indexOf('matgreen1.png')==-1){
                    ctrPage = false;
                    tabG.before("<span class='errorflag' >&#9888;</span>");
                }
            }
        }
    });
    
    var allIframe = $(".plugteachcontain").find("iframe");
    allIframe.each(function(index){
        var tabG = $(this);
        if(tabG.hasClass("hvpcontentfram")){
        allIframeHVP = tabG.contents().find("iframe");
        allIframeHVP.each(function(index){
            var objI = $(this).contents().find(".h5p-joubelui-score-bar-star");
            if(objI.length==0){
                ctrPage = false;
                tabG.before("<span class='errorflag' >&#9888;</span>");
            }
        });

        }
    });

    $('span.errorflag').css("display","none");

    return ctrPage;

}

function checkAnswers(){

    var ctrPage  = pageControlsAllQuizz();

    if (ctrPage==false) {
        showErrorMessages();
        showTopMessage();
    }

}

function showErrorMessages(){

    $('span.errorflag').css("margin-left","10px");
    $('span.errorflag').css("display","block");
    
    showLevelBlocs("B");

    $( "span.errorflag" ).animate({
        "margin-left" : "5px"
    },200,function(){
        $( "span.errorflag" ).animate({
            "margin-left" : "10px"
        },200,function(){
            $( "span.errorflag" ).animate({
                "margin-left" : "5px"
            },200,function(){
              
            });
        });
    });

}

var onetimeoutShow;

function showTopMessage(){
   
    $(".fixed-top-message").css("right","-350px");
    $(".fixed-top-message").css("display","block");
    $( ".fixed-top-message" ).animate({
        right: "4px"
    },500);

    clearTimeout(onetimeoutShow);
    
    onetimeoutShow = setTimeout(function(){
        hideTopMessage()
    },6000);
    
}

function hideTopMessage(){

    $( ".fixed-top-message" ).animate({
        right: "-350px"
    },400,function(){
        $(".fixed-top-message").css("display","none");     
    });



}

//Menu design Progression
function installMenuLocation() {
    
    if (typeof sendLMSLocation === "function") {

        var beha = behaviorGetParamVal("b");
        var ctPg = getLMSLocation();

        if (beha==0&&(pageBindex>ctPg+1)) {

            scoPageAPI = ctPg;

        } else {

            if (beha!=-99) {
              
                if(typeof progressBtop != 'undefined') {
                    sendLMSLocation(pageBindex,progressBtop);
                    console.log("scoPageAPI=" + scoPageAPI);
                }

                if(typeof localIdTeachdoc != 'undefined') {
                    if(window.localStorage){
                        var keyPage = 'pageM' + localIdTeachdoc;
                        window.localStorage.setItem(keyPage,scoPageAPI);
                    }
                }  
            }

        }

        var sty = ' style="position:absolute;left:3px;top:6px;" ';
        
        if (pageBindex>1) {
            if (isObjSub($('.subMenuSco'+pageBindex))) {
                $('.subMenuSco'+pageBindex).append('<img ' + sty + ' src="img/qcm/sumin.png" />');
            }
        }

        if (scoPageAPI==1) {
            $('.subMenuSco1').append('<img ' + sty + ' src="img/qcm/suminmidle.png" />')
        } else {
            if (scoPageAPI>1) {
                $('.subMenuSco1').append('<img ' + sty + ' src="img/qcm/sumin.png" />')
            }
        }
        
        if(pageBindex>1){
            //$('.subMenuSco1').append('<img ' + sty + ' src="img/qcm/sumin.png" />');
        }

        scoPageAPI = parseInt(scoPageAPI);

        if (scoPageAPI>1) {
            for (let i = 1; i < (scoPageAPI+1);i++){
                if(pageBindex!=i&&i!=1){
                    if(isObjSub($('.subMenuSco'+i))){
                        $('.subMenuSco'+i).append('<img ' + sty + ' src="img/qcm/sumin.png" />');
                    }
                }
            }
        }

        if(typeof progressBtop != 'undefined'){
         
            var firstBulle = true;
            for (let j = (scoPageAPI+1);j<(progressBtop+1);j++) {
                if(j!=pageBindex){
                    if(pageBindex!=j&&j!=1){
                        if(firstBulle){
                            if(isObjSub($('.subMenuSco'+j))){
                                $('.subMenuSco'+j).append('<img ' + sty + ' src="img/qcm/s-lock2.png" />');
                            }
                            firstBulle = false;
                        }else{
                            if(isObjSub($('.subMenuSco'+j))){
                                var pagebehav = $('.subMenuSco'+j).attr('pagebehav');
                                if(pagebehav==0){
                                    $('.subMenuSco'+j).append('<img ' + sty + ' src="img/qcm/s-lock.png" />');
                                }else{
                                    $('.subMenuSco'+j).append('<img ' + sty + ' src="img/qcm/s-lock2.png" />');
                                }
                            }
                        }
                    }
                }
            }

        }
        
    }else{
        setTimeout(function(){
            installMenuLocation();
        },300);
    }
    
}

setTimeout(function(){
    resizeEventSco();
},300);

$( window ).resize(function() {
    resizeEventSco();
});

function resizeEventSco() {

    if (homeMenuIsOpen==false) {
       
        var hdiv = $('.div-teachdoc').height();

        var ltw = $(".list-teachdoc_wrapper");
        var offsetLtw = ltw.offset();
        var topL =  offsetLtw.top;

        $(".list-teachdoc_wrapper").css("height",parseInt(hdiv - (topL + 10)) + 'px');
    
    } else {
        resizeEventHome();
    }

}

function installPlugTeach(){
    
    installFileTeach();

    $(".plugteachcontain").each(function(index){
        
        var obj = $(this);

        var typesource = obj.find('span.typesource').html();
        var datatext1 = "";var datatext2 = "";var datatext3 = "";
        if (typesource===undefined) {typesource = '';}
        if (typesource=='') {
            typesource = obj.parent().find('span.typesource').html();
            datatext1 = obj.parent().find('span.datatext1').html();
			datatext2 = obj.parent().find('span.datatext2').html();
            datatext3 = obj.parent().find('span.datatext3').html();
            obj.parent().find('span.datatext1').css("display","none");
            obj.parent().find('span.datatext2').css("display","none");
        } else {
            datatext1 = obj.find('span.datatext1').html();
			datatext2 = obj.find('span.datatext2').html();
            datatext3 = obj.find('span.datatext3').html();
            obj.find('span.datatext1').css("display","none");
            obj.find('span.datatext2').css("display","none");
        }
        if (datatext1===undefined) {datatext1 = '';}
		if (datatext2===undefined) {datatext2 = '';}
        if (datatext3===undefined) {datatext3 = '';}
        if (typesource===undefined) {typesource = '';}

        $(".topinactiveteach").css("display","none");
        
        if (typesource=='blank') {
            var h = '';
            h += '<iframe class="hvpcontentfram" ';
            h += ' style="position:relative;width:100%;height:300px;overflow:hidden;" ';
            h += ' frameBorder="0" ';
            h += ' src="oel-plug/hvpdragthewords/dragthewords.html#'+ datatext1 + '@' + datatext2 +'" ';
            h += '></iframe>';
            h += '<div class=loadcontentfram ></div>';
            obj.html(h);
            obj.addClass('hvpcontentfram');
            obj.parent().css("position","relative");
        }
        if (typesource=='filltext') {
            var h = '';
            h += '<iframe class="hvpcontentfram" ';
            h += ' style="position:relative;width:100%;height:300px;overflow:hidden;" ';
            h += ' frameBorder="0" ';
            h += ' src="oel-plug/hvpfillintheblanks/fillinthemissingwords.html#'+ datatext1 + '@' + datatext2 +'" ';
            h += '></iframe>';
            h += '<div class=loadcontentfram ></div>';
            obj.html(h);
            obj.addClass('hvpcontentfram');
            obj.parent().css("position","relative");
        }
        if (typesource=='markwords') {
            var h = '';
            h += '<iframe class="hvpcontentfram" ';
            h += ' style="position:relative;width:100%;height:300px;overflow:hidden;" ';
            h += ' frameBorder="0" ';
            h += ' src="oel-plug/hvpmarkthewords/hvpmarkthewords.html#'+ datatext1 + '@' + datatext2 +'" ';
            h += '></iframe>';
            h += '<div class=loadcontentfram ></div>';
            obj.html(h);
            obj.addClass('hvpcontentfram');
            obj.parent().css("position","relative");
        }

        if (typesource=="lifebar") {
            obj.removeClass('plugteachcontain').addClass('plugteachuicontain');
        }
        if (typesource.indexOf("oelcontent")!=-1){
            if (datatext1!='') {
                obj.find(".photo").css('background-image','url('+datatext1+')');
            }
        }
        if (typesource.indexOf("txtmathjax")!=-1){
            obj.css("text-align","left");
        }
        if (typesource.indexOf("imageactive")!=-1){
            installImageActiveEvents(obj,datatext1,datatext2,datatext3);
        }

    });

    //Special UI
    $(".plugteachuicontain").each(function(index){

        var obj = $(this);
        
        var typesource = obj.find('span.typesource').html();
        var datatext1 = "";

        if (typesource===undefined) {typesource = '';}

        if (typesource=='') {
            typesource = obj.parent().find('span.typesource').html();
            datatext1 = obj.parent().find('span.datatext1').html();
			datatext2 = obj.parent().find('span.datatext2').html();
        } else {
            datatext1 = obj.find('span.datatext1').html();
			datatext2 = obj.find('span.datatext2').html();
        }

        if (datatext1===undefined) {datatext1 = '';}
		if (datatext2===undefined) {datatext2 = '';}
        if (typesource===undefined) {typesource = '';}

        if (typesource=='lifebar') {
            if (!document.getElementById("ui-life-bar")){
                if(context_data_life==-1){
                    context_data_life = parseInt(datatext1);
                    context_data_life_full = parseInt(datatext1);
                }
                var oh = '';
                var nbLife = parseInt(context_data_life_full);
                for (var i=1;i<(nbLife+1);i++) {
                    oh += '<div id="lifeopt'+i+'" class="onelifeopt" ></div>';
                }
                $("body").append("<div id='ui-life-bar' class='ui-life-bar' >"+ oh + "</div>");
                obj.parent().parent().html("");
                
                nbLife = parseInt(context_data_life_full);
                for (var j=1;j<(nbLife+1);j++) {
                    applyLifeHideOne(parseInt(context_data_life)+j);
                }

            }
        }

    });
    
    var iexpandpanel = 1;
    $(".sectioncollapse").each(function(index){
        var obj = $(this);
        obj.addClass("noselect");
        obj.addClass("sectioncollapse"+iexpandpanel);
        obj.attr("id","sectioncollapse"+iexpandpanel);
        obj.css("background-image","url(img/classique/arrow-collapsen.png)");
        obj.append("<a name='anchor"+iexpandpanel+"' ></a>");
        obj.on("click",function(){
            showCollapsePage(this);
        });
        applyCollapsePage(iexpandpanel);
        iexpandpanel++;
    });
    
    setTimeout(function(){
        $(".loadcontentfram").css("display","none");;
    },1600);
    
}

var iframehvp = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function applyCheckExercices(){

    if(context_data_resolve.indexOf(";"+pageBindex+";")==-1){
        return false;
    }

    var attemptCheck = false;

    $(".checkboxqcm").each(function(index){
        var obj = $(this);
        if(obj.hasClass("xboxqcm")){
            obj.attr("src","img/qcm/matgreen1.png");
        }
    });
    $(".checkboxqcm").click(function(){});

    var indexIframe = 0;

    var allIframe = $(".plugteachcontain").find("iframe");
    allIframe.each(function(index){

        if(iframehvp[indexIframe]!=2){
          
            var stepIframe = 0;
            allIframeHVP = $(this).contents().find("iframe");
            allIframeHVP.each(function(index){

                var BtnSS = $(this).contents().find(".h5p-question-show-solution");
                if(BtnSS.length>0){
                    BtnSS.trigger('click');
                    stepIframe = 2;
                    iframehvp[indexIframe] = 2;
                }  else{
                    var BtnCheck = $(this).contents().find(".h5p-question-check-answer");
                    if(BtnCheck.length>0){
                        BtnCheck.trigger('click');
                        stepIframe = 1;
                        iframehvp[indexIframe] = 1;
                    }
                }
        
            });
            
            if(stepIframe!=2){
                attemptCheck = true;
            }
  
        }
        indexIframe++;

    });

    if(attemptCheck) {
        setTimeout(function(){
            applyCheckExercices();
        },500);
    }
    
}

function installCmq(){
    
    getContextData();
    
    $(".checkboxqcm").each(function(index){

        var obj = $(this);
        var src = obj.attr("src");
        if(src.indexOf("matgreen0r.pn")!=-1){
            obj.addClass("xboxqcm");
        }
        obj.css("cursor","pointer");

        var nearLine = obj.parent().next('td');
        nearLine.css("cursor","pointer");
        
        nearLine.click(
            function(){
                var obj = $(this);
                var objC =obj.prev('td').find('img');
                checkObj(objC);
            }
        );
        nearLine.mouseover(
            function(){
                var obj = $(this);
                nearLine.css("text-decoration","underline");
            }
        );
        nearLine.mouseleave(
            function(){
                var obj = $(this);
                nearLine.css("text-decoration","none");
            }
        );
        
	});
    
    $(".checkboxqcm").click(
		function(){
			var obj = $(this);
            checkObj(obj);
        }
    );
    
    setTimeout(function(){applyGlossaryAllTxt();},500);
}

setTimeout(function(){installCmq();},500);

setTimeout(function(){
    $(".fixed-top-nav").css("opacity","1");
    $(".div-teachdoc").css("opacity","1");
    $(".panel-teachdoc").css("opacity","1");
    $(".panel-teachdoc-large").css("opacity","1");
    installPlugTeach();
},300);

function applyCollapsePage(iexpanel){

    var startHidden = false;
    $('.panel-teachdoc').children().each(function () {

        var objD = $(this);
        if (startHidden) {

            if( objD.hasClass("sectioncollapse")){
                startHidden = false;
            }else{
                objD.attr("initdisplay",objD.css("display"));
                objD.css("display","none");
                objD.attr("relexpand",iexpanel);
            }
            
        }
        var hCtr = objD.html();
        if ( objD.hasClass("sectioncollapse"+iexpanel)
        ||hCtr.indexOf("sectioncollapse"+iexpanel)!=-1) {
            startHidden = true;
        }
    });

}

function showCollapsePage(Othis){

    var objD = $(Othis);

    var iexpanel = objD.attr("id");
    iexpanel = iexpanel.replace("sectioncollapse","");
    iexpanel = parseInt(iexpanel);

    var backurl = objD.css("background-image");

    if (backurl.indexOf("collapsen")!=-1) {

        objD.css("background-image","url(img/classique/arrow-collapsel.png)");
       
        $('.panel-teachdoc').children().each(function () {

            var objCtr = $(this);
            var numR = parseInt(objCtr.attr("relexpand"));
            if ( numR == iexpanel) {
                var displayR = objCtr.attr("initdisplay");
                if (typeof displayR == 'undefined') {
                    displayR = "";
                }
                objCtr.css("display",displayR);        
            }
        });

        //location.hash = "#anchor" + iexpanel;
        
        scrollTo($("#sectioncollapse" + iexpanel));
        //window.scrollTo(0,document.querySelector(".panel-teachdoc").scrollHeight);
    
    } else {

        objD.css("background-image","url(img/classique/arrow-collapsen.png)");
        $('.panel-teachdoc').children().each(function () {
            var objCtr = $(this);
            var numR = parseInt(objCtr.attr("relexpand"));
            if ( numR == iexpanel) {
                objCtr.css("display","none");
            }
        });
    
    }

}

function scrollTo(target) {
    if( target.length ) {
        $("html, body").stop().animate( { scrollTop: target.offset().top }, 1500);
    }
}

var context_data_quiz = '';
var context_data_life = -1;
var context_data_life_full = -1;
var context_data_resolve = ';';

function getContextData(){
    
    if (window.location.href.indexOf("resetall=")!=-1&&pageBindex==1) {
        return false;
    }

    if (window.location.href.indexOf("load=")!=-1&&pageBindex==1) {
        if (scoPageAPI!=1) {
            if (window.location.href.indexOf("load=save")!=-1) {
                lpl(basePages[scoPageAPI],"","load=save");
            }else{
                lpl(basePages[scoPageAPI],"","load=first");
            }
        }
    }

    if (window.location.href.indexOf("load=first")!=-1) {
        return false;
    }

    try{
        if (localStorage) {
            mem_context_data = window.localStorage.getItem(getContextDataId());
            if (mem_context_data === null||mem_context_data == "null"){
                mem_context_data = "";
            }
            if (mem_context_data === undefined) {
                mem_context_data = "";
            }
            if (typeof mem_context_data == 'undefined') {
                mem_context_data = "";
            }
            if(mem_context_data!=""){
                if (mem_context_data.indexOf("@")!=-1) {
                    mem_context_data = mem_context_data + "@@@@";
                    var final_context_data = mem_context_data.split('@');
                    context_data_quiz = final_context_data[0];
                    if(final_context_data[1]!=""){
                        context_data_life = final_context_data[1];
                        context_data_life_full = final_context_data[2];
                    }
                    context_data_resolve = final_context_data[3];
                }
            }
        }
    }catch(err){}

}

function setContextData(){
    if (localStorage) {
        var context_data = context_data_quiz + '@' +context_data_life + '@'+context_data_life_full+'@'+context_data_resolve+'@';
        try {
            window.localStorage.setItem(getContextDataId(),context_data);
        } catch(err) {
        }
    }
}

//Data
function getContextDataId(){
    return 'data'+basePages[1];
}
function installImgOverviewEvents() {

    $(".bandeImgOverview").each(function(index){
        var obj = $(this);
		var oriClass = getTableClassOrigine(obj);
		obj.removeClass("bandeImgOverview");
        obj.addClass("bandeImgOverviewOnLive").addClass(oriClass);
        obj.wrap( "<div onClick='disImgToScr(0,\"" + obj.attr('src') +"\",\"black\")'; class='overviewImgOnLive " + oriClass + "' ></div>" );
    });

}

var nextIdis = 0;

function disImgToScr(i,pathimg,color){

	nextIdis = 0;

	if (!document.getElementById("imgScrView")) {

		var h = '<div id="overViewBack" class="overViewBack" ></div>';
		h +=  '<div id="imgViewBack" class="imgViewBack" >';
		h += '<div id="closeImgView" class="closeImgViewSrc" onClick="closeImgToScr()" >';
		h += '</div></div>';
		h += '<div id="imgScrView" class="imgScrView" >';
		h += '</div>';

        $("body").append(h);
	}
	
	$('#diaViewBack,#diaScrView').css('display','none');

	var finalPath = pathimg;
	var objAll = $('#imgViewBack,#imgScrView');

	$('#imgScrView').css('background-image','url(\'' + finalPath + '\')');

	objAll.css('display','block');
	$('#overViewBack').css("display","block");

	if (i==0) {

		objAll.css('background-size','contain');
		objAll.css('margin-left','0px').css('margin-top','0px');
		objAll.css('left','40%').css('right','40%');
		objAll.css('top','30%').css('bottom','30%');
		$('#imgViewBack').animate({
			left : "2%",right : "2%"
		}, 300, function() {
			$('#imgViewBack').animate({
				top : "5%",bottom : "3%",
			},250, function() {
				$('#imgScrView').animate({
					left : "6%", right : "6%",
					top : "8%", bottom : "7%",
				},200, function() {
				});
			});
		});
	}

	//best resolution
	if (i==1) {

		objAll.css('left','50%').css('top','50%');
		$('#imgViewBack').css('width','100px').css('height','100px');
		$('#imgViewBack').css('margin-left','-50px').css('margin-top','-50px');

		$('#imgScrView').css('width','60px').css('height','60px');
		$('#imgScrView').css('margin-left','-30px').css('margin-top','-30px');

		var newImg = new Image;
		newImg.onload = function() {
			
			var wImg = this.width ;
			var hImg = this.height;
			var wBac = this.width + 50;
			var hBac = this.height + 50;
			
			if (wBac > (largEcranWidth*zoom)||hBac > (largEcranHeight*zoom)){

				nextIdis = 0;
				objAll.css('margin-left','0px').css('margin-top','0px');
				objAll.css('width','auto').css('height','auto');
				objAll.css('background-size','contain');
				objAll.css('left','40%').css('right','40%');
				objAll.css('top','30%').css('bottom','30%');
				$('#imgViewBack').animate({
					left : "4%",right : "4%"
				}, 300, function() {
					$('#imgViewBack').animate({
						top : "4%",bottom : "4%",
					},250, function() {
						$('#imgScrView').animate({
							left : "7%",right : "7%",
							top : "8%",bottom : "7%",
						},200, function() {
						});
					});
				});

			}else{

				nextIdis = 1;
				objAll.css('background-size','none');
				$('#imgViewBack').css('width',(wBac) + 'px').css('height',hBac + 'px');
				$('#imgViewBack').css('margin-left','-' + (wBac/2) + 'px').css('margin-top','-' + (hBac/2) + 'px');
				$('#imgScrView').css('width',wImg + 'px').css('height',hImg + 'px');
				$('#imgScrView').css('margin-left','-' + (wImg/2) + 'px').css('margin-top','-' + (hImg/2) + 'px');
			
			}

		}
		newImg.src = finalPath;

	}
	
}

function closeImgToScr(){
	
	var objAll = $('#imgViewBack,#imgScrView');

	if (nextIdis==0) {
		objAll.animate({
			top : "45%",
			bottom : "45%",
			left : "45%",
			right : "45%"
		}, 200, function() {
			objAll.css("display","none");
			$('#overViewBack').css("display","none");
		});
	}
	if (nextIdis==1) {
		objAll.animate({
			width : "60px",
			height : "60px",
			marginLeft : "-30px",
			marginRight : "-30px"
		}, 200, function() {
			objAll.css("display","none");
			$('#overViewBack').css("display","none");
		});
	}

}

function showLevelBlocs(let) {

	$(".displayhideCondiM" + let).each(function(index){
		var obj = $(this);
		obj.css('display','block');
	});

}
function hideLevelBlocs(let) {

	$(".displayhideCondiM" + let).each(function(index){
		var obj = $(this);
		obj.css('display','none');
	});

}

function installFileTeach(){

    if($("#linkdatafile").length==1){
        var linkFileData = $("#linkdatafile").html();
        $("#linkdatafile").css("display","block");

        if (linkFileData.toLowerCase().indexOf('.pdf')!=-1){
            showPdf(linkFileData);
        }
        if (linkFileData.toLowerCase().indexOf('.mp4')!=-1){
            showVideo(linkFileData);
        }

    }
    
}

function showPdf(linkFileData){

    $("#linkdatafile").css("display","block");
    var haut = window.innerHeight-75;
    var panel = document.querySelector(".panel-teachdoc");
    if(!panel){
        panel = document.querySelector(".panel-teachdoc-large");
    }
    panel.style.top = '10px';
    panel.style.marginTop = '40px';
    panel.style.paddingTop = '5px';
    panel.style.paddingBottom = '5px';
    $("#linkdatafile").animate({
        height : haut + "px"
    },500,function(){
        $("#linkdatafile").html("<iframe style='width:100%;height:100%;' src='img_cache/"+linkFileData+"' ></iframe>");
    });

}

function showVideo(linkFileData){
    
    $("#linkdatafile").css("display","block");
   
    resizeShowVideo(linkFileData);

}

function resizeShowVideo(linkFileData){

    var decoLarg = parseInt($(".deco-teachdoc").width()) + 100 ;
    
    if(window.innerWidth>1280) {
        decoLarg = parseInt($(".deco-teachdoc").width()) + 200 ;
    }
    
    if(window.innerWidth<600) {
        decoLarg = 40;
    }

    var panel = $(".panel-teachdoc");
    if(panel.length==0){
        panel = $(".panel-teachdoc-large");
    }
    var larg = window.innerWidth-decoLarg;
    var haut = window.innerHeight-110;
    var finalhaut = parseInt(larg*0.625);
    if (finalhaut>haut) {
        finalhaut = haut;
    }
    var topD = parseInt((haut - finalhaut)/2) + 60;

    panel.css("padding-top",'10px');
    panel.css("padding-bottom",'10px');
    panel.css("top",topD + "px");
    panel.css("max-width",larg + "px");
    
    panel.stop();
    $("#linkdatafile").stop();
    
    panel.animate({
        marginTop : "0px",
        width : larg + "px",
        height : finalhaut + "px"
    },500,function(){
        $("#linkdatafile").animate({
            height : finalhaut + "px"
        },100);
        if(linkFileData!=''){
            $("#linkdatafile").html("<video oncontextmenu='return false;' style='width:100%;height:100%;' src='img_cache/"+linkFileData+"' controls controlsList='nodownload' ></video>");
            $( window ).resize(function() {
                resizeShowVideo('');
            });
        }
    });

}
var colorThemeQuizz = '#FBFCFC';
var borderThemeQuizz = '#dadce0';

function applyThemeToColors(){
    
    if (pQuizzTheme=='yellow-contrast.css') {
        colorThemeQuizz = '#fff8ea';
        borderThemeQuizz = '#ABB2B9';
    }
    if (pQuizzTheme=='blue-contrast.css') {
        colorThemeQuizz = '#EBF5FB';
        borderThemeQuizz = '#ebf5fbd7';
    }
    
}

function resizeAutoIframe(){

    var fullLoad = true;

    var allIframeS = $(".plugteachcontain");

    allIframeS.each(function(index){
        var oneIplugS = $(this);
        var plugs = oneIplugS.find("iframe");
        plugs.each(function(index){
            if ($(this).hasClass("hvpcontentfram")) {
                oneIplugS.parent().css("border",'solid 1px ' + borderThemeQuizz);
                oneIplugS.parent().css("border-radius",'8px');
                oneIplugS.parent().css("background-color",colorThemeQuizz);
                var objH = $(this).contents().find("html");
                objH.css('overflow','hidden');
                var objB = $(this).contents().find("body");
                objB.css('overflow','hidden');
            }
        });
    });

    var allIframe = $(".plugteachcontain").find("iframe");
    allIframe.each(function(index){

        var oneIframe = $(this);
        
        if($(this).hasClass("hvpcontentfram")){

            oneIframe.css("height","auto");
            oneIframe.css('overflow','hidden');

            var allIframeHVP = oneIframe.contents().find("iframe");
            allIframeHVP.each(function(index){
                var objI = $(this).contents().find("body");
                if(objI.length>0){
                    
                    var objH = $(this).contents().find("html");
                    objH.css('overflow','hidden');
                    objI.css('overflow','hidden');

                    objI.css("background-color",colorThemeQuizz);
                    objI.find(".h5p-content").css("background-color",colorThemeQuizz);
                    objI.find(".h5p-drag-text").css("background-color",colorThemeQuizz);
                    objI.find(".h5p-mark-the-words").css("background-color",colorThemeQuizz);
                    objI.find(".h5p-blanks").css("background-color",colorThemeQuizz);

                    var h = oneIframe.height();
                    var hi = objI.height();
                    if (hi>h) {
                        oneIframe.css("height",parseInt(hi + 10) + "px");
                        oneIframe.css('overflow','hidden');
                    } else {
                        if (hi<h+60) {
                            //oneIframe.css("height",parseInt(hi + 50) + "px");
                        } else {
                            if (hi<10) {
                                fullLoad = false;
                            }
                        }
                    }
                } else {
                    fullLoad = false;
                }
            });
        }   
    });
    
    setTimeout(function(){
        resizeAutoIframe();
    },1500);
    
}


var txtGameImgActic = [];
var idGameImgActic = [];

function installImageActiveEvents(obj,d1,d2,d3){

    var objZA = obj.find(".plugimageactive");
    
    if (objZA.length==1) {
        
        $(".overViewZAedition").remove();

        idGameImgActic = 'frame' + LUDI.randomId();
        objZA.addClass(idGameImgActic);

        objZA.css("position","relative");
        var contZA  = objZA.parent();
        var imgZA  = objZA.find(".imageactive");

        contZA.css("position","relative");
        imgZA.css("width","100%");

        if (d2.indexOf('$')!=-1) {
            
            d3 = d3 + '$$$$$$';

            var ArrayObjects = d2.split('$');
            var ArrayOptions = d3.split('$');
            
            var i = 0;
            for (i = 0;i < ArrayObjects.length;i++) {
            
                var objInfos = ArrayObjects[i];
                var objValues = ArrayOptions[i];

                if (objInfos.indexOf('|')!=-1) {
                    var objdet = objInfos.split('|');
                    addZoneToZoneAFromOpt2(objZA,objdet[1],objdet[2],objValues,i);
                }
                

            }

        }

    }

}

//Install Area from code
function addZoneToZoneAFromOpt2(objZA,l,t,ovals,iobj){
    
    ovals = ovals + '||||||';
    var objparam = ovals.split('|');

    var actZASelect = objparam[1];

    // 0 no action
    // 1 display text
    // 2 nextpage
    // 3 nextpage
    // 4 display image
    // 5 speech-bubble

    var zAtextArea = objparam[2];
    txtGameImgActic[iobj] = zAtextArea;

    var typeZA = objparam[3];
    // 0 transparent
    // 1 areaimgdeco
    // 2 cursor

    var divZoneArea = "<div  ";
    if (actZASelect==1) {
        divZoneArea += " onClick='showTextInWindowsArea("+iobj+",\""+ idGameImgActic +"\");' ";
    }
    if (actZASelect==2) {
        divZoneArea += " onClick='hideAllBubleArea();LUDI.nextPage();' ";
    }
    if (actZASelect==3) {
        divZoneArea += " onClick='hideAllBubleArea();LUDI.prevPage();' ";
    }
    if (actZASelect==5) {
        divZoneArea += " onMouseEnter='showTextInBubleArea("+iobj+",\""+ idGameImgActic +"\"," + l + "," + t + ");'  ";
    }
    divZoneArea += " style='left:" + l + "%;top:" + t + "%;' class='areaZA noselect' >";
    
    if (typeZA==1) {
        divZoneArea += "<div class='areaimgdeco' ></div>";
    }
    if (typeZA==2) {
        divZoneArea += "<div class='areaimgcursor' ></div>";
    }
    if (typeZA==3) {
        divZoneArea += "<div class='areaimgcursorsmall' ></div>";
    }
    if (typeZA==4) {
        divZoneArea += "<div class='areaimgpointingleft' ></div>";
    }

    divZoneArea += "</div>";

    objZA.append(divZoneArea);
    
}

function showTextInWindowsArea(i,idframe){

    $(".centerMessageChalkBoard").remove();
    
    hideAllBubleArea();
    
    $("." + idframe).append("<div class='centerMessageChalkBoard' >...</div>");

    $("." + idframe).css("overflow","hidden");

    $(".centerMessageChalkBoard").html(txtGameImgActic[i]);
    $(".centerMessageChalkBoard").css("display","block");
    $( ".centerMessageChalkBoard" ).animate({
        bottom : "-10%"
    },10, function() {
        $( ".centerMessageChalkBoard" ).animate({
            bottom : "2%"
        },300, function(){
            $("." + idframe).css("overflow","visible");
        });
    });

}

var lastIobj = -1;

function hideAllBubleArea(){
    lastIobj = -1;
    $(".speech-bubble").remove();
}

function hideTextInBubleArea(i){
    if (lastIobj==i) {
        setTimeout(function(){
            lastIobj = -1;
            $(".speech-bubble").remove();
        },300);
    }
}

function showTextInBubleArea(i,idframe,l,t){

    if (lastIobj==i) {
        return false;
    }
    
    lastIobj = i;

    $(".speech-bubble").remove();

    $("." + idframe).append("<div class='speech-bubble' onMouseLeave='hideTextInBubleArea("+i+")' >...</div>");
    
    $(".speech-bubble").html(txtGameImgActic[i]);

    var sh = $(".speech-bubble").height() + 45;

    $(".speech-bubble").parent().css("overflow","visible");

    $(".speech-bubble").css("margin-top",(sh * -1) + "px");
    $(".speech-bubble").css("display","block");
    $(".speech-bubble").css("top",(t - 2) + "%");
    $(".speech-bubble").css("left",(t + 1) + "%");
    $(".speech-bubble").css("position","absolute");
    $(".speech-bubble" ).animate({
        left : (l + 5) + "%",
        top : t + "%"
    },50, function() {
    });

}
var indexGlossDom = 1;
var subBubble = new Array();

function applyGlossaryAllTxt() {

    $(".panel-teachdoc p").each(function(index){
        var obj = $(this);
        var oriSrc = obj.html();
        var src = applyGlossaryTxt(oriSrc);
        if (src!=oriSrc) {
            obj.html(src);
        }
	});

}

function applyGlossaryTxt(src) {

    var oriSrc = src;
    for (var index=0;index<glossaryRender.length;++index) {
        var term = glossaryRender[index];
        var termW = term.w;
        var termD = term.d;
        var termD2 = term.d2;
        if (oriSrc.indexOf(termW)!=-1) {
            var oriDiv = '<a id="agloss'+indexGlossDom+'" class=agloss >';
            oriDiv += '<span onClick="hoverGlossary('+indexGlossDom+');"  >' + termW + '</span>';
            oriDiv += '<div id="bubblegloss'+indexGlossDom+'" class="bubblegloss" >';
            oriDiv += '<div class="aglossclose" ';
            oriDiv += ' onClick="closeGlossary('+indexGlossDom+');" ></div>';
            oriDiv += '<div class="glossdef1'+indexGlossDom+'" >' + termD + '</div>';
            if (termD2!='') {
                oriDiv += '<div id="glossPlus'+indexGlossDom+'" class="toolsGloss" onClick="showGlossPlus('+indexGlossDom+');" >';
                oriDiv += '<div class="addGloss" >+</div>';
                oriDiv += '</div>';
                oriDiv += '<div class="glossdef2 glossdef2'+indexGlossDom+'" >' + termD2 + '</div>';
            }
            oriDiv += '</div>';
            oriDiv += '</a>';
            oriSrc = oriSrc.replace(termW,oriDiv);
            indexGlossDom++;
        }
    }
    return oriSrc;

}

function hoverGlossary(i) {
    $("#bubblegloss" + i).css("display","block");
}

function closeGlossary(i) {
    $("#bubblegloss" + i).css("display","none");
}

function showGlossPlus(i) {
    $("#glossPlus" + i).css("display","none");
   // $(".glossdef2" + i).css("display","block");
    $(".glossdef2" + i).slideDown();
}
var homeMenuIsOpen = false;

//startCourse
function startCourse(step) {

	if (homeMenuIsOpen==true) {

		$('.list-teachdoc_wrapper').css("display","none");
		$('.btnlaunch-teachdoc').css("display","none");
		$('.div-teachdoc-full').addClass('div-teachdoc-transi');

		$('.vertical-line-load,.vertical-line-load-2').animate({
			marginLeft: '-480px'
		},500, function(){
		});
		
		$('.panel-teachdoc').css("display","");
		$('#nav-bottom').css("display","");

		setTimeout(function(){

			$('.div-teachdoc-full').addClass('div-teachdoc');
			$('.div-teachdoc-full').removeClass('div-teachdoc-transi');
			$('.div-teachdoc').removeClass('div-teachdoc-full');
			$('.list-teachdoc_wrapper').css("display","");
			
			homeMenuIsOpen = false;

			if (step==0) {
				loadLinkPage();
			} else {
				$('.fixed-top-nav-load').css("display","none");
			}

			setTimeout(function(){
				resizeEventSco()
			},500);

		},500);

	}

}

//startMenu
function startMenu(step) {

	if (homeMenuIsOpen==false) {
		
		if ($('#btnlaunch-teachdoc').length==0) {
			$('.logotop-teachdoc').after("<a id='btnlaunch-teachdoc' onClick='startCourse(1)' class='btnlaunch-teachdoc noselect' >&#9658;</a>")
			$('body').append('<div class="vertical-line-load"></div><div class="vertical-line-load-2"></div>');
			$('body').append('<div class="fixed-top-nav-load"></div>');
			$('.logotop-teachdoc').before("<div id='title-mainmenu' class='title-mainmenu' ><div class='title-mainmenu-core'>" + titleMod + "</div></div>")
		}
		
		$('.list-teachdoc_wrapper').css("display","none");
		
		$('#nav-bottom').css("display","none");

		$('.panel-teachdoc').css("display","none");

		$('.div-teachdoc').addClass('div-teachdoc-full');
		$('.div-teachdoc-full').removeClass('div-teachdoc');
		$('.div-teachdoc-full').removeClass('div-transi');
		
		$('.vertical-line-load,.vertical-line-load-2').animate({
			marginLeft: '0px'
		},500, function(){
		});
		
		setTimeout(function(){
			$('.btnlaunch-teachdoc').css("display","block");
			$('.list-teachdoc_wrapper').css("display","block");
			$('.fixed-top-nav-load').css("display","block");
			homeMenuIsOpen = true;
			resizeEventSco();

			setTimeout(function(){
				resizeEventSco()
			},500);
		},500);
		
	}

}

function resizeEventHome() {

    if (homeMenuIsOpen==true) {
        
        var hdiv = 250;
		if ($('.div-teachdoc').length==1) {
			hdiv = $('.div-teachdoc').height();
		}
		if ($('.div-teachdoc-full').length==1) {
			hdiv = $('.div-teachdoc-full').height();
		}
		$(".list-teachdoc_wrapper").css("height",'auto');
        $(".list-teachdoc_wrapper").css("max-height",parseInt(hdiv - 120) + 'px');
		var hlogo = $('.logotop-teachdoc').height();
		$(".title-mainmenu").css("height", parseInt((hdiv - (hlogo + 150))/2) + 'px');

    }
    
}

setTimeout(function(){
	$('.logotop-teachdoc').click(function() {
		startMenu(1);
	});
	resizeEventHome();
},200);

function loadLogo(){
    var img1 = new Image();
    img1.onload = function() {
        $(".logotop-teachdoc").attr("src","img/classique/oel_back.jpg");
    };
    img1.src = "img/classique/oel_back.jpg";
}
loadLogo();