<?php

/* */
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

if(isset($_POST['id'])||isset($_GET['id'])){
	
	if(
		(isset($_POST['ur'])||isset($_GET['ur']))
	){

		require_once __DIR__.'/../../../main/inc/global.inc.php';
		require_once '../0_dal/dal.save.php';
		require_once '../0_dal/dal.chamilo_object.php';
        require_once 'inc/functions.php';
		
		$idPage = get_int_from('id');

		if (!oel_ctr_rights($idPage)) {
			echo "KO";
			exit;
		}
		
		$ur = get_string_direct_from('ur');
		
		$localFolder = get_local_folder($idPage);
		$folderPageCache = api_get_path(SYS_PATH)."plugin/adv_oel_tools_teachdoc/editor/img_cache/".strtolower($localFolder);
			
		$nameFile = basename($ur);
			
		echo "nameFile=".$nameFile."  | ";
		
		if (isFileDirectUpload($nameFile)) {

			if(file_exists($folderPageCache."/".$nameFile)){
				@unlink($folderPageCache."/".$nameFile);
			}
			if(file_exists($folderPageCache."/".$nameFile)){
				@unlink($folderPageCache."/".$nameFile);
			}
			if(file_exists($folderPageCache."/".$nameFile)){
				@unlink($folderPageCache."/".$nameFile);
			}
			
			echo $folderPageCache."/".$nameFile."  | ";

			if(!file_exists($folderPageCache."/".$nameFile)){
				echo "OK";
			}else{
				echo "KO ";
			}

		} else {
			echo "KO ";
		}

	}

}else{

	echo 'KO';

}
