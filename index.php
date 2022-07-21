<?php

$parsedUrlLudi = parse_url($_SERVER['REQUEST_URI']);
$parsedUrlpathLudi = $parsedUrlLudi['path'];

//lp_controller.php
$posCtr = strrpos($parsedUrlpathLudi,"lp_controller.php");
$posGdr = strrpos($parsedUrlpathLudi,"lp_controller.php");
$versionLudi = '3';
$fhL = '';

if($posCtr===false&&$posGdr===false){
    
}else{
    
    $user = api_get_user_info();	

    if(isset($user['id'])){
        
        //$cidReq = isset($_GET['cidReq']) ? (string) $_GET['cidReq']:0;
        $pwpIcoLudi = api_get_path(WEB_PLUGIN_PATH).'adv_oel_tools_teachdoc/resources/js/teachdoc-icon.js';
        $fhL .= '<script src="'.$pwpIcoLudi.'?v='.$versionLudi.'" type="text/javascript" ></script>';

        if(isset($_SESSION['teachdocLstIds'])){
            $fhL .= '<div id="teachdocLstIds" style="display:none;" >'.$_SESSION['teachdocLstIds'].'</div>';
        }else{
            $fhL .= '<div id="teachdocLstIds" style="display:none;" ></div>';
        }
    }
    
}

echo $fhL;
