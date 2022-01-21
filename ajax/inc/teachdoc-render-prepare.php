<?php

function scormPrepareFilesProcess($courseSys){

    $courseSysFvideo = $courseSys."/audio";
    if(!file_exists($courseSysFvideo)) {
        mkdir($courseSysFvideo, 0777, true);
    }
    
    $courseSysFvideo = $courseSys."/video";
    if(!file_exists($courseSysFvideo)) {
        mkdir($courseSysFvideo, 0777, true);
    }
    
    $courseSysOelPlug = $courseSys."/oel-plug";
    if(!file_exists($courseSysOelPlug)) {
        mkdir($courseSysOelPlug, 0777, true);
    }
    $srcFOelPlug = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/oel-plug';
    recurse_copy_teachdoc($srcFOelPlug,$courseSysOelPlug);

    $courseSysFimg = $courseSys."/img";
    if(!file_exists($courseSysFimg)) {
        mkdir($courseSysFimg, 0777, true);
    }
    
    $courseSysFqcm = $courseSys."/img/qcm";
    if(!file_exists($courseSysFqcm)){
        mkdir($courseSysFqcm, 0777, true);
    }

    $courseSysFbtn = $courseSys."/img/btn";
    if(!file_exists($courseSysFbtn)){
        mkdir($courseSysFbtn, 0777, true);
    }

    $courseSysCss = $courseSys."/css";
    if(!file_exists($courseSysCss)){
        mkdir($courseSysCss, 0777,true);
    }
    
    $srcFimg = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/img/qcm';
    recurse_copy_teachdoc($srcFimg,$courseSysFqcm);

    $srcFbtn = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/img/btn';
    recurse_copy_teachdoc($srcFbtn,$courseSysFbtn);

    $courseSysCLass= $courseSys."/img/classique";
    if(!file_exists($courseSysCLass)) {
        mkdir($courseSysCLass, 0777, true);
    }
    $srcClsImg = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/img/classique';
    recurse_copy_teachdoc($srcClsImg,$courseSysCLass);

}

function pagePrepareFileProcess($pid,$courseSys,$base_html,$courseDirImg){

    $bh = $base_html;
    $matches = array();
    preg_match_all('/src="([^"]+)/i',$base_html,$matches);
    for($i=0;$i<count($matches[0]);$i++){
        $cleanSrc = $matches[0][$i];
        $cleanSrc = str_replace('src="','',$cleanSrc);
        pagePrepareFileCopy($cleanSrc,$courseSys,$bh,$courseDirImg);
    }
    
    $matchesback = array();
    preg_match_all('~url\((?P<img_url>.+?)\)~',$base_html,$matchesback);
    for($i=0;$i<count($matchesback[0]);$i++){
        $cleanSrc = $matchesback[0][$i];
        $cleanSrc = str_replace('url("','',$cleanSrc);
        $cleanSrc = str_replace('")','',$cleanSrc);
        $cleanSrc = str_replace('url(','',$cleanSrc);
        $cleanSrc = str_replace(')','',$cleanSrc);
        echo " -> cleanSrc $cleanSrc <br>";
        pagePrepareFileCopy($cleanSrc,$courseSys,$bh,$courseDirImg);
    }
    
}

function pagePrepareFileCopy($filename,$courseSys,$bh,$courseDirImg){
    
    echo $filename.'</br>';
    $isHttp = strpos($filename,'http');

    if($isHttp===false){

        $isImgFolder = strpos($filename,'mg/');
        $isVideoFolder = strpos($filename,'ideo/');
        $isVideoAudio = strpos($filename,'udio/');
        
        if($isImgFolder!=false||$isVideoFolder!=false||$isVideoAudio!=false){
            $srcFimg = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/'.$filename;
            $courseSysFdest = $courseSys.$filename;
            if(file_exists($srcFimg)) {
                if(!file_exists($courseSysFdest)) {
                    @copy($srcFimg,$courseSysFdest);
                    echo $srcFimg.' <b>to</b> '.$courseSysFdest.'</br>';
                }
            }
        }
        
        $isImgCache = strpos($filename,'mg_cache/');
        if($isImgCache!=false){
            echo " -> Log $filename <br>";
            $srcFimg = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/'.$filename;
            $courseSysFdest = $courseSys.$filename;
            if(file_exists($srcFimg)) {
                if(!file_exists($courseSysFdest)) {
                    @copy($srcFimg,$courseSysFdest);
                    echo $srcFimg.' <b>to</b> '.$courseSysFdest.'</br>';
                }
            }
        }

    }
}

function recurse_copy_teachdoc($src,$dst){

    $dir = opendir($src); 
    
    @mkdir($dst); 
    
    while(false !== ( $file = readdir($dir)) ) { 
        if (( $file != '.' ) 
        && ( $file != '..' ) 
        && ( $file != 'Thumbs.db' ) ) { 
            if ( is_dir($src . '/' . $file) ) { 
                recurse_copy_teachdoc($src . '/' . $file,$dst . '/' . $file); 
            } else { 
                copy($src . '/' . $file,$dst . '/' . $file); 
            }
        } 
    } 
    
    closedir($dir);
    
}

?>