<?php

require_once __DIR__.'/../../../../main/inc/global.inc.php';
require_once __DIR__.'/../inc/functions.php';
require_once __DIR__.'/../../0_dal/dal.save.php';

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

if(!isset($_GET['idteach'])){exit;}

$step = get_int_from('step');
$idPage = get_int_from('idteach');

if (oel_ctr_rights($idPage)==false) {
    echo "KO";
    exit;
}

$user = api_get_user_info();
$userId = $user['id'];
$idurl = api_get_current_access_url_id();
$UrlWhere = "";
$title = "error";

$localFolder = get_local_folder($idPage);
$customPageCss = api_get_path(SYS_PATH)."plugin/";
$customPageCss .= "adv_oel_tools_teachdoc/editor/img_cache/";
$customPageCss .= strtolower($localFolder)."/custom.css";

if($step==0){

    //Create
    if(!file_exists($customPageCss)){		

        $customCssOri = api_get_path(SYS_PATH)."plugin/";
        $customCssOri .= "adv_oel_tools_teachdoc/editor/";
        $customCssOri .= "templates/colors/paper-chami.css";

        $base_css = file_get_contents($customCssOri);
        
        $fp = fopen($customPageCss,'w');
        fwrite($fp,$base_css);
        fclose($fp);
    
    }

    if(file_exists($customPageCss)){
        $custom_css = file_get_contents($customPageCss);
        echo $custom_css;
    }else{
        echo "KO";
    }

}
if($step==1){
    $content_css = get_string_direct_from('content');
    $fp = fopen($customPageCss,'w');
    fwrite($fp,$content_css);
    fclose($fp);
}
