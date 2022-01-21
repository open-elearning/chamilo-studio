<?php

require_once __DIR__.'/../../../../main/inc/global.inc.php';
require_once __DIR__.'/../inc/functions.php';
require_once __DIR__.'/../../0_dal/dal.save.php';
require_once __DIR__.'/../../0_dal/dal.chamilo_object.php';

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

if(!isset($_GET['id'])){echo "KO";exit;}

$step = isset($_GET['step']) ? Security::remove_XSS($_GET['step']):'0';
$idPageTop = isset($_GET['id']) ? Security::remove_XSS($_GET['id']):'0';

if (oel_ctr_rights($idPageTop)==false) {
    echo "KO";
    exit;
}

$user = api_get_user_info();
$userId = $user['id'];
$idurl = api_get_current_access_url_id();
$UrlWhere = "";
$local_folder = "";
$title = "error";
$lp_id = 0;

$lp_id = get_lp_Id($idPageTop);
$local_folder = get_local_folder($idPageTop);

if ($local_folder=="") {
    echo "KOCS - no folder";
    exit;
}
if ($lp_id<1) {
    echo "KOCS - lp_id";
    exit;
}

$scormSysPage = api_get_path(SYS_PATH)."plugin/";
$scormSysPage .= "adv_oel_tools_teachdoc/editor/sco_cache/".strtolower($local_folder);

$scormWebPage = api_get_path(WEB_PATH)."plugin/";
$scormWebPage .= "adv_oel_tools_teachdoc/editor/sco_cache/".strtolower($local_folder);

if ($step==1) {
    if(!file_exists($scormSysPage)){
        mkdir($scormSysPage, 0777,true);
    }
}
$scormfolder = $scormSysPage."/".$lp_id;
if ($step==1) {
    sleep(2);
    if(!file_exists($scormfolder)){
        mkdir($scormfolder, 0777,true);
    }
}

$course_dir = get_directory($lp_id);
$courseSysPage = api_get_path(SYS_COURSE_PATH).$course_dir.'/scorm/'.$local_folder."/";

if ($step==1) {
    if(file_exists($scormfolder)){
        echo " OK 1";
    }else{
        echo "KO";
    }
}
if ($step==2) {
    sleep(2);
    recurseCopyFolderSco($courseSysPage,$scormfolder);
    if(file_exists($scormfolder."/index.html")){
        echo " OK 2";
    }else{
        echo "KO";
    }
}

$scormZip = $scormSysPage."/sco".$idPageTop."cs".$lp_id.".zip";
$scormWeb = $scormWebPage."/sco".$idPageTop."cs".$lp_id.".zip";

if ($step==3) {
    sleep(1);
    unlink($scormZip);
    if(!file_exists($scormZip)){
        echo " OK 3";
    }else{
        echo "KO";
    }

}

if ($step==4) {

    $rootPath = realpath($scormfolder);
    if (class_exists('ZipArchive')) {
        $zip = new ZipArchive();
        $zip->open($scormZip, ZipArchive::CREATE | ZipArchive::OVERWRITE);

        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($rootPath),
            RecursiveIteratorIterator::LEAVES_ONLY
        );

        foreach ($files as $name => $file)
        {
            if (!$file->isDir())
            {
                $filePath = $file->getRealPath();
                $relativePath = substr($filePath, strlen($rootPath) + 1);
                $relativePath = str_replace('\\', '/', $relativePath);
                $zip->addFile($filePath, $relativePath);
                
                $fp = fopen('logs.html','a');
                fwrite($fp,'$zip->addFile('.$relativePath.')'.'\r');
                fclose($fp);

            }
        }
        $zip->close();

        if(file_exists($scormZip)){
            echo $scormWeb;
        }else{
            echo "KO";
        }

    }else{
        echo "KO ZipArchive is install";
    }
}
