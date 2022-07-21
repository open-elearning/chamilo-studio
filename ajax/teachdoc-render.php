<?php

require_once __DIR__.'/../../../main/inc/global.inc.php';
require_once __DIR__.'/../inc/tranformSource.php';
require_once __DIR__.'/inc/teachdoc-render-prepare.php';
require_once __DIR__.'/inc/teachdoc-render-file.php';

require_once __DIR__.'/inc/functions.php';
require_once __DIR__.'/../0_dal/dal.save.php';
require_once __DIR__.'/../0_dal/dal.chamilo_object.php';

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

if(api_is_anonymous()){
    echo "KO";
    exit;
}

if(!isset($_GET['id'])){exit;}

$idPageTop = get_int_from('id');

$user = api_get_user_info();
$userId = $user['id'];
$lp_id = 0;
$local_folder = "";
$titleMod = "error";
$optionsProject = "";
$optionsProjectCheck = "";

$oel_tools_infos = get_oel_tools_infos($idPageTop);
$lp_id = $oel_tools_infos['lp_id'];
$titleMod =  $oel_tools_infos['title'];
$local_folder = $oel_tools_infos['local_folder'];
$optionsProject = $oel_tools_infos['optionsProject'];
$optionsProjectCheck = $oel_tools_infos['optionsProjectCheck'];
$optionsProjectMessKo = $oel_tools_infos['optionsProjectMessKo'];
$ProjectQuizzTheme = $oel_tools_infos['quizztheme'];

if ($local_folder=="") {
    echo "KOCS - no folder";
}

update_lp_infos($lp_id,$titleMod,$local_folder);

$course_dir = get_directory($lp_id);
$courseSysPage = api_get_path(SYS_COURSE_PATH).$course_dir.'/scorm/'.$local_folder."/";

prepareFoldersSco($courseSysPage,$course_dir,$local_folder,$idPageTop,$optionsProjectCheck);

include(__DIR__."/inc/teachdoc-render-menu.php");

scormPrepareFilesProcess($courseSysPage);

//Project image
if ($oel_tools_infos['optionsProjectImg']!='') {
    
    $imgSrc = $oel_tools_infos['optionsProjectImg'];
    $fileimgdeco = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/'. $imgSrc;
    $backimgdeco = $courseSysPage."/img/classique/oel_back.jpg";
    
    if ( fileIndexOf($imgSrc,'.jpg') || fileIndexOf($imgSrc,'.jpeg') ) {
        @copy($fileimgdeco,$backimgdeco);
    }

    if ( fileIndexOf($imgSrc,'.png') ) {
        preparepng2jpg($fileimgdeco,$backimgdeco,90);
    }

}

//Create a low image
$backimgdecoOri = $courseSysPage."/img/classique/oel_back.jpg";
$backimgdecoLow = $courseSysPage."/img/classique/oel_back-low.jpg";
preparelowjpg($backimgdecoOri,$backimgdecoLow,90);

if (strpos($optionsProjectCheck,"M")===false&&strpos($optionsProjectCheck,"L")===false) {
    prepareMenuStartSco($courseSysPage,$idPageTop,$optionsProjectCheck,$renderM,$titleMod);
}

foreach($CollectionPages as &$row){
    
    $idPageG = intval($row["id"]);
    $ind = intval($row["index"]);

    $prevId = intval($row["prev_id"]);
    $nextId = intval($row["next_id"]);
    $behavi = intval($row["behavior"]);

    $colors = $row["colors"];
    $quizztheme = $row["quizztheme"];

    if ( $colors=="") {
        $colors = "white-chami.css";
    }
    if ( $quizztheme=="") {
        $quizztheme = "white-quizz.css";
    }

    $typeNodeR = intval($row["type_node"]);

    $result = array();
    $sql = "SELECT base_html,base_css  ";
    $sql .= " FROM plugin_oel_tools_teachdoc ";
    $sql .= " WHERE id = $idPageG;";
    
    $resultOne = Database::query($sql);
    while($row=Database::fetch_array($resultOne)){
        $baseHtml = $row['base_html'];
        $baseCss = $row['base_css'];
    }
    
    $cssPath = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/templates/';

    $cssA = $cssPath.'styles/classic.css';
    $dataA = file_get_contents($cssA);
    
    $cssB = $cssPath.'colors/'.$colors;
    $dataB = file_get_contents($cssB);

    $cssC = $cssPath.'quizztheme/'.$quizztheme;
    $dataC = file_get_contents($cssC);
    $dataC = str_replace('quizzcontentplug{','quizzcontentpluginactiv{',$dataC);
    $dataC = str_replace('quizzcontentplug {','quizzcontentpluginactiv {',$dataC);

    $sendBaseCss = $baseCss.$dataA.$dataB.$dataC;

    if($typeNodeR==4){
        $optfiledata = get_oel_tools_options($idPageG);
        $srcFdata = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/'.$optfiledata;
        if (file_exists($srcFdata)) {
            $destFimg = $courseSysPage."/img_cache/".basename($optfiledata);
            @copy($srcFdata,$destFimg);
            if (file_exists($destFimg)) {
                $baseHtml = '<div class="panel"><div id="linkdatafile" >'.basename($optfiledata).'</div></div>';
            } else {
                $baseHtml = '<div class="panel"><p>Error '.$destFimg.'</p></div>';
            }
            
        }else{
            $baseHtml = '<div class="panel"><p>Error '.$srcFdata.'</p></div>';
        }
        $baseCss = '.baseCss{}';
    }

    if($baseHtml!=''&&$baseCss!=''){

        if (strpos($optionsProjectCheck,"L")===false) {
            $baseHtml = str_replace('class="panel"','class="panel-teachdoc"',$baseHtml);
        }else{
            $baseHtml = str_replace('class="panel"','class="panel-teachdoc-large"',$baseHtml);
        }
        $baseHtml = str_replace('>minidia</span>','></span>',$baseHtml);
        //
        if (strpos($optionsProjectCheck,"F")) {
            $baseHtml = str_replace('nofullscreen','',$baseHtml);
        }
        
        pageGenerationProcess($idPageG,$courseSysPage,$renderM,$renderCss,$renderJS,$ind,$idPageTop,$baseHtml,$sendBaseCss,$prevId,$nextId,$behavi);
        pagePrepareFileProcess($idPageG,$courseSysPage,$baseHtml,strtolower($course_dir));
        pagePrepareFileProcess($idPageG,$courseSysPage,$baseCss,strtolower($course_dir));

    }
    
}

function prepareFoldersSco($courseSysPage,$course_dir,$local_folder,$idPTop,$optionsProjectCheck) {

    //Engine
    $filePathNg = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/resources/navigobjcontrol.js';
    $courseDysNg = $courseSysPage."ng.js";
    if (!copy($filePathNg,$courseDysNg)){
        $dataNg = file_get_contents($filePathNg);
        $fd = fopen($courseDysNg,'w');	
        fwrite($fd,$dataNg);
        fclose($fd);
    }

    //INDEX
    $filePathIndex = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/resources/index.html';
    $courseDyIndex = $courseSysPage."index.html";
    $courseDyIndex2 = $courseSysPage."teachdoc-undefined.html";
    $dataIndex = file_get_contents($filePathIndex);
    
    $dataIndex2 = str_replace('{start}',$idPTop,$dataIndex);
    $dataIndex2 = str_replace('load=','resetall=',$dataIndex2);

    $dataIndex = str_replace('{start}',$idPTop,$dataIndex);
    if (strpos($optionsProjectCheck,"P")!=false) {
        $dataIndex = str_replace('=first','=save',$dataIndex);
    }
    
    $fd = fopen($courseDyIndex,'w');
    fwrite($fd,$dataIndex);
    fclose($fd);

    $fd = fopen($courseDyIndex2,'w');
    fwrite($fd,$dataIndex2);
    fclose($fd);

   


    //API
    prepaRootFile($courseSysPage,'api.js');
    prepaRootFile($courseSysPage,'jq.js');
    prepaRootFile($courseSysPage,'imsmanifest.xml');
    prepaRootFile($courseSysPage,'adlcp_rootv1p2.xsd');
    prepaRootFile($courseSysPage,'ims_xml.xsd');
    prepaRootFile($courseSysPage,'imscp_rootv1p1p2.xsd');
    prepaRootFile($courseSysPage,'imsmd_rootv1p2p1.xsd');

    $courseSysCss = $courseSysPage."/css";
    if(!file_exists($courseSysCss)){
        mkdir($courseSysCss, 0777,true);
    }

    //CSS
    $filePathCss = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/ajax/files/scorm.css';
    $courseDyCss = $courseSysPage."css/scorm.css";
    if (!copy($filePathCss,$courseDyCss)){
        $dataCss = file_get_contents($filePathCss);
        $fd = fopen($courseDyCss,'w');	
        fwrite($fd,$dataCss);
        fclose($fd);
    }

    //CSS Plug rewrite
    $filePlugCss = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/templates/styles/plug.css';
    $coursePlugCss = $courseSysPage."css/plug.css";
    $dataCss = file_get_contents($filePlugCss);
    $dataCss = str_replace('url(img/classique/','url(../img/classique/',$dataCss);
    $fd = fopen($coursePlugCss,'w');
    fwrite($fd,$dataCss);
    fclose($fd);
    
    $coursePageCache = $courseSysPage."/img_cache/";
    if(!file_exists($coursePageCache)){
        mkdir($coursePageCache, 0777,true);
    }
    $coursePageCacheFolder1 = $coursePageCache . strtolower($course_dir);
    if(!file_exists($coursePageCacheFolder1)){
        mkdir($coursePageCacheFolder1, 0777,true);
    }
    $coursePageCacheFolder2 = $coursePageCache . strtolower($local_folder);
    if(!file_exists($coursePageCacheFolder2)){
        mkdir($coursePageCacheFolder2, 0777,true);
    }

}

function prepareMenuStartSco($courseSysPage,$idPTop,$optionsProjectCheck,$renderM,$titleModule) {

    //INDEX MENU
    $filePathIndex3 = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/resources/index-neo.html';

    $courseDyIndex = $courseSysPage."index.html";
    $dataIndex = file_get_contents($filePathIndex3);
    
    //<!--MENU-->
    $dataIndex = str_replace('{start}' , $idPTop,$dataIndex);

    $renderMN = str_replace('oel_back.jpg' ,'oel_back-low.jpg',$renderM);
    $dataIndex = str_replace('<!--MENU-->' , $renderMN,$dataIndex);

    $dataIndex = str_replace('div-teachdoc' , 'div-teachdoc-full',$dataIndex);
    
    // " ' 
    $dataIndex = str_replace('{titleplace}', htmlspecialchars($titleModule), $dataIndex);

    //act-bahavior
    $dataIndex = str_replace('act-bahavior','-100',$dataIndex);

    if (strpos($optionsProjectCheck,"P")!=false) {
        $dataIndex = str_replace('=first','=save',$dataIndex);
    }
    
    $fd = fopen($courseDyIndex,'w');
    fwrite($fd,$dataIndex);
    fclose($fd);

}

function prepaRootFile($courseSysPage,$namefile) {
    
    $filePathApi = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/resources/'.$namefile;
    $courseDyApi = $courseSysPage."/".$namefile;
    if (!copy($filePathApi,$courseDyApi)){
        $dataManifest = file_get_contents($filePathApi);
        $fd = fopen($courseDyApi,'w');	
        fwrite($fd,$dataManifest);
        fclose($fd);
    }

}

function preparepng2jpg($originalFile, $outputFile, $quality) {
    $image = imagecreatefrompng($originalFile);
    imagejpeg($image, $outputFile, $quality);
    imagedestroy($image);
}

function preparelowjpg($originalFile, $outputFile) {
    makeThumbnails($outputFile,$originalFile);
}

function makeThumbnails($outputFile,$img){

	$MaxWe=100;
	$MaxHe=100;

    $arr_image_details = getimagesize($img); 
    $width = $arr_image_details[0];
    $height = $arr_image_details[1];

    $percent = 100;
    if($width > $MaxWe) $percent = floor(($MaxWe * 100) / $width);

    if(floor(($height * $percent)/100)>$MaxHe)  
    $percent = (($MaxHe * 100) / $height);

    if($width > $height) {
        $newWidth=$MaxWe;
        $newHeight=round(($height*$percent)/100);
    }else{
        $newWidth=round(($width*$percent)/100);
        $newHeight=$MaxHe;
    }

    if ($arr_image_details[2] == 1) {
        $imgt = "ImageGIF";
        $imgcreatefrom = "ImageCreateFromGIF";
    }
    if ($arr_image_details[2] == 2) {
        $imgt = "ImageJPEG";
        $imgcreatefrom = "ImageCreateFromJPEG";
    }
    if ($arr_image_details[2] == 3) {
        $imgt = "ImagePNG";
        $imgcreatefrom = "ImageCreateFromPNG";
    }


    if ($imgt) {
        $old_image = $imgcreatefrom($img);
		$new_image = imagecreatetruecolor($newWidth, $newHeight);
		imagealphablending( $new_image, false );
		imagesavealpha( $new_image, true );
        imagecopyresized($new_image, $old_image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

        $imgt($new_image, $outputFile);
        return;
    }
}

