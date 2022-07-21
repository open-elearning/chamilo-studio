<?php

/*
	ini_set('display_errors',1);
	ini_set('display_startup_errors',1);
	error_reporting(E_ALL);
*/

if(isset($_POST['id'])||isset($_GET['id'])){
	
	if(
		(isset($_POST['ur'])||isset($_GET['ur']))
	){

		require_once __DIR__.'/../../../main/inc/global.inc.php';
		require_once '../0_dal/dal.save.php';
		require_once '../0_dal/dal.chamilo_object.php';
        require_once 'inc/functions.php';
		
		if(api_is_anonymous()){
			echo "KO";
			exit;
		}
		
		$idPage = get_int_from('id');
		$ur = get_string_from('ur');
		$urSys = get_string_from('ur');

		$posCtr = strrpos($urSys,"http");
		if($posCtr===false){
			$posCtr = strrpos($urSys,"courses/");
			if($posCtr!=false){
				$haveCorrection = true;
				$urSys =  api_get_path(SYS_PATH)."app/".$urSys;
			}
		}

        $localFolder = get_local_folder($idPage);
        
        $nameFile = get_clean_idstring(basename($ur));

		$courseOrigine = api_get_path(SYS_PATH)."plugin/adv_oel_tools_teachdoc/editor/".strtolower($ur);
		
        $lp_id = get_lp_Id($idPage);

        $course_dir = get_directory($lp_id);
        
        if ($course_dir=='') {
            echo "Course_dir is empty ! Error ";
            exit;
        }

        $courseDestination = api_get_path(SYS_COURSE_PATH).$course_dir.'/scorm/'.$localFolder;

        $courseDestinationUrl = $courseDestination.'/'.$ur;

        if (!file_exists($courseDestination."/img_cache")) {
            mkdir($courseDestination."/img_cache", 0777,true);
        }

        if (!file_exists($courseDestinationCache)) {
            mkdir($courseDestinationCache, 0777,true);
        }

        echo $courseOrigine.' copy '.$courseDestinationUrl.'<br>';
		@copy($courseOrigine,$courseDestinationUrl);
		if (!file_exists($courseDestinationUrl)) {
			@copy($courseOrigine,$courseDestinationUrl);
		}
		
        if (!file_exists($courseDestinationUrl)) {
			$urSysDir = str_replace(api_get_path(WEB_PATH),api_get_path(SYS_PATH),$courseOrigine);
			@copy($urSysDir,$courseDestinationUrl);
		}

		if (file_exists($courseDestinationUrl)) {	
			echo "OK";
		}else{
			echo "error ";
		}

	}else{

        echo 'error no data';
    
    }

}else{

	echo 'error no id';

}
