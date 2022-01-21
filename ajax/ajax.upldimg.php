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

		///courses/TESTLP/document/3787-tolerancement-gps.pdf

		$posCtr = strrpos($urSys,"http");
		if($posCtr===false){
			$posCtr = strrpos($urSys,"courses/");
			if($posCtr!=false){
				$haveCorrection = true;
				$urSys =  api_get_path(SYS_PATH)."app/".$urSys;
			}
		}
	
		$isShort = get_int_from('short');

        $localFolder = get_local_folder($idPage);
		$coursePageCache = api_get_path(SYS_PATH)."plugin/";
        $coursePageCache .= "adv_oel_tools_teachdoc/editor/img_cache/".strtolower($localFolder);
		
		$nameFile = get_clean_idstring(basename($ur));
        if(!file_exists($coursePageCache)){
            mkdir($coursePageCache, 0777,true);
        }
		@copy($ur,$coursePageCache."/".$nameFile);
		if(!file_exists($coursePageCache."/".$nameFile)){
			@copy($urSys,$coursePageCache."/".$nameFile);
		}
		if(!file_exists($coursePageCache."/".$nameFile)){
			$urSysDir = str_replace(api_get_path(WEB_PATH),api_get_path(SYS_PATH), $urSys);
			@copy($urSysDir,$coursePageCache."/".$nameFile);
		}
		if(file_exists($coursePageCache."/".$nameFile)){
			if ($isShort==1) {
				echo "img_cache/".$nameFile;
			} else {
				echo "img_cache/".strtolower($localFolder)."/".$nameFile;
			}
			
		}else{
			echo "error ";
		}

	}

}else{

	echo 'no id';

}
