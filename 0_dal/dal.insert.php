<?php

function insertNewProject($title,$userId) {

    $idurl = api_get_current_access_url_id();
    $table = 'plugin_oel_tools_teachdoc';
    $dirPlug = api_get_path(SYS_PLUGIN_PATH).'/adv_oel_tools_teachdoc';

    $date = new DateTime();
    $year = $date->format("Y");
    $month = $date->format('m');
    $day = $date->format('j');

    $dateStr = $day.'/'.$month.'/'.$year;
    
    $folderFSName = "teachcs-".$year.$month.$day."-".uuid(5);
    
    $course_dir = api_get_course_path().'/scorm';
    //echo 'course_dir = '.$course_dir.'<br>';

    $course_sys_dir = api_get_path(SYS_COURSE_PATH).$course_dir;
    //echo 'course_sys_dir = '.$course_sys_dir.'<br>';

    if(!file_exists($course_sys_dir)){
        if (@mkdir(
            $course_sys_dir,api_get_permissions_for_new_directories()
        )){
            chdir($course_sys_dir);
        }
    }
    
    $course_sys_dir_fs = api_get_path(SYS_COURSE_PATH).$course_dir.'/'.$folderFSName;
    //echo 'course_sys_dir_fs = '.$course_sys_dir_fs.'<br>';
    
    if (is_dir($course_sys_dir_fs) ||
        @mkdir(
            $course_sys_dir_fs,api_get_permissions_for_new_directories()
        )
    ){
        chdir($course_sys_dir_fs);
    }
    
    $courseDysDirManifest = api_get_path(SYS_COURSE_PATH).$course_dir.'/'.$folderFSName."/imsmanifest.xml";
    $filePathManifest = $dirPlug."/resources/imsmanifest.xml";
    $dataManifest = file_get_contents($filePathManifest);
    $fd = fopen($courseDysDirManifest,'w');	
    fwrite($fd,$dataManifest);
    fclose($fd);

    $filePathIndex = $dirPlug."/resources/index.html";
    $courseDysDirIndex= api_get_path(SYS_COURSE_PATH).$course_dir.'/'.$folderFSName."/index.html";
    $dataIndex = file_get_contents($filePathIndex);
    $fd = fopen($courseDysDirIndex,'w');	
    fwrite($fd,$dataIndex);
    fclose($fd);
    
    $filePathJq = $dirPlug."/resources/jq.js";
    $courseDysJq= api_get_path(SYS_COURSE_PATH).$course_dir.'/'.$folderFSName."/jq.js";
    
    if (!copy($filePathJq,$courseDysJq)){
        $dataJq = file_get_contents($filePathJq);
        $fd = fopen($courseDysJq,'w');	
        fwrite($fd,$dataJq);
        fclose($fd);
    }

    $filePathApi = $dirPlug."/resources/api.js";
    $courseDysApi = api_get_path(SYS_COURSE_PATH).$course_dir.'/'.$folderFSName."/api.js";
    
    if (!copy($filePathApi,$courseDysApi)){
        $dataApi = file_get_contents($filePathApi);
        $fd = fopen($courseDysApi,'w');	
        fwrite($fd,$dataApi);
        fclose($fd);
    }

    $proximity = 'local';
    if (!empty($_REQUEST['content_proximity'])) {
        $proximity = Database::escape_string($_REQUEST['content_proximity']);
    }
    $maker = 'Scorm';
    if (!empty($_REQUEST['content_maker'])) {
        $maker = Database::escape_string($_REQUEST['content_maker']);
    }

    $oScorm = new scorm();
    
    $oScorm->parse_manifest($courseDysDirManifest);
    $oScorm->import_manifest(api_get_course_id(),1);
    
    $oScorm->set_proximity($proximity);
    $oScorm->set_maker($maker);
    $oScorm->set_jslib('scorm_api.php');
    
    $objectId = $oScorm->lp_id;
    
    $params = [
        'title' => $title,
        'date_create' => $dateStr,
        'id_parent' => 0,
        'id_user' => $userId,
        'type_base' => '',
        'lp_id' => $oScorm->lp_id,
        'local_folder' => $folderFSName,
        'order_lst' => 1,
        'type_node' => 1,
        'id_url' => $idurl
    ];
    
    $result = Database::insert($table, $params);

    return $objectId;

}