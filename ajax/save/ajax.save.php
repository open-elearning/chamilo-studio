<?php

/*
	ini_set('display_errors',1);
	ini_set('display_startup_errors',1);
	error_reporting(E_ALL);
*/

if(isset($_POST['id'])||isset($_GET['id'])){
	
	if(
		(isset($_POST['bh'])&&isset($_POST['bc']))
		||(isset($_GET['bh'])&&isset($_GET['bc']))
	){

		require_once  __DIR__.'/../../../../main/inc/global.inc.php';
		
		require_once '../inc/functions.php';
		require_once "../../0_dal/dal.save.php";
		require_once "../../0_dal/dal.chamilo_object.php";
		
		$idPage = get_int_from('id');
		$baseHtml = get_string_direct_from('bh');
		$baseCss = get_string_direct_from('bc');
		$redir = get_int_from('r');

		if (oel_ctr_rights($idPage)==false) {
			echo "KO";
			exit;
		}

		if($baseCss!=''&&$baseHtml!=''){
			
			oel_tools_save_element_compo($baseHtml,$baseCss,$idPage);

			$date = new DateTime();
			$year = $date->format("Y");
			$month = $date->format('m');
			$day = $date->format('j');
			$hour = $date->format('H');
			
			$dateStr = $year.'-'.$month.'-'.$day.'-'.$hour;

			$localFolderH = get_local_folder($idPage).'-'.$idPage;

			if(!file_exists('../../editor/history_cache/'.$localFolderH)){
				mkdir('../../editor/history_cache/'.$localFolderH, 0777,true);
			}

			if(!file_exists('../../editor/history_cache/'.$localFolderH.'/'.$dateStr.'.html')){
				
				//log in dev only
				$fp = fopen('../../editor/history_cache/'.$localFolderH.'/'.$dateStr.'.html','w');
				fwrite($fp,$baseHtml);
				fclose($fp);

				$fp = fopen('../../editor/history_cache/'.$localFolderH.'/'.$dateStr.'.css','w');
				fwrite($fp,$baseCss);
				fclose($fp);
			
			}
			
			if($redir==0){
				echo  " - Saved ";
			}
			
		}

		if($redir==0){
			echo " no redirect ";
		}else{
			
			if(isset($_GET['pt'])){
				
					$idPageTop = get_int_from('pt');

					$lp_id = get_lp_Id($idPageTop);
					$course_dir = get_directory($lp_id);
					$courseSysPage = api_get_path(WEB_PATH)."main/lp/lp_controller.php?cidReq=".$course_dir;
					$courseSysPage .= "&id_session=0&gidReq=0&gradebook=0&origin=&action=view&lp_id=".$lp_id."&isStudentView=true&teachdoc=edit";

					echo $courseSysPage;
					
			}else{
				echo 'error ...';
			}

		}
		
	}

}else{

	echo 'no id';

}
