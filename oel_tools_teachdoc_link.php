<?php
	
/* For licensing terms, see /license.txt */

require_once __DIR__.'/../../main/inc/global.inc.php';
require_once __DIR__.'/teachdoc_hub.php';
require_once __DIR__.'/ajax/inc/functions.php';

//1.11.16
if (!function_exists('api_get_print_css')) {
	echo "<div style='color:red;' >Please Update Chamilo !".$user['status']."</div>";
	echo "<script>setTimeout(function(){ location.href = '../../index.php'; }, 3000);</script>";
}

$language = 'en';
$platformLanguage = api_get_interface_language();
$iso = api_get_language_isocode($platformLanguage);

if(!api_is_anonymous()){
	$user = api_get_user_info();
	if(isset($user['status'])){
		if($user['status']==SESSIONADMIN
		||$user['status']==COURSEMANAGER
		||$user['status']==PLATFORM_ADMIN){
		}else{
			echo "<div style='color:red;' >Status !".$user['status']."</div>";
			echo "<script>setTimeout(function(){ location.href = '../../index.php'; }, 3000);</script>";
			exit;
		}
	}
}else{
	echo "<div style='color:red;' >api_is_anonymous !</div>";
	echo "<script>setTimeout(function(){ location.href = '../../index.php'; }, 3000);</script>";
	exit;
}

$userId = $user['id'];

$vers = 6;

$plugin = teachdoc_hub::create();

$id = isset($_GET['id']) ? (int) $_GET['id']:0;

$table = 'plugin_oel_tools_teachdoc';

$action = isset($_GET['action']) ? Security::remove_XSS($_GET['action']):'add';
$cidReq = isset($_GET['cidReq']) ? Security::remove_XSS($_GET['cidReq']):'';
$idLudiLP = isset($_GET['idLudiLP']) ? Security::remove_XSS($_GET['idLudiLP']):'';

$form = new FormValidator('dictionary', 'post', api_get_self().'?action='.$action.'&id='.$id);
	
if($idLudiLP==''){
	
	$form->addText('title',get_lang('Title'),true);
	$form->addButtonSave('&nbsp;&nbsp;'.get_lang('Add').'&nbsp;&nbsp;');

}else{

	$idurl = api_get_current_access_url_id();
	$UrlWhere = "";
	if ((api_is_platform_admin() || api_is_session_admin()) && api_get_multiple_access_url()) {
		$UrlWhere = " AND id_url = $idurl ";
	}
	
	$sql = "SELECT id FROM $table ";
	$sql .= " WHERE lp_id = $idLudiLP AND id_parent = 0 ";
	$sql .= $UrlWhere;
	
	$idLudiProject = '';

	$result = Database::query($sql);
	while($PartLudi=Database::fetch_array($result)){
		$idLudiProject = $PartLudi['id'];
	}

	if($idLudiProject!=''&&$idLudiProject!=0){

		if(isset($_GET['first'])){
			echo "<script>location.href='editor/index.php?id=$idLudiProject&first=1';</script>";
		}else{
			echo "<script>location.href='editor/index.php?id=$idLudiProject';</script>";
		}
	
	}else{
		echo "<div style='color:red;' >Error !</div>";
	}
	
}

switch($action){
	case 'add':
		if ($form->validate()){

			$values = $form->getSubmitValues();
			
			$idurl = api_get_current_access_url_id();

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
			$filePathManifest = __DIR__."/resources/imsmanifest.xml";
			$dataManifest = file_get_contents($filePathManifest);
			$fd = fopen($courseDysDirManifest,'w');	
			fwrite($fd,$dataManifest);
			fclose($fd);

			$filePathIndex = __DIR__."/resources/index.html";
			$courseDysDirIndex= api_get_path(SYS_COURSE_PATH).$course_dir.'/'.$folderFSName."/index.html";
			$dataIndex = file_get_contents($filePathIndex);
			$fd = fopen($courseDysDirIndex,'w');	
			fwrite($fd,$dataIndex);
			fclose($fd);
			

			$filePathJq = __DIR__."/resources/jq.js";
			$courseDysJq= api_get_path(SYS_COURSE_PATH).$course_dir.'/'.$folderFSName."/jq.js";
			
			if (!copy($filePathJq,$courseDysJq)){
				$dataJq = file_get_contents($filePathJq);
				$fd = fopen($courseDysJq,'w');	
				fwrite($fd,$dataJq);
				fclose($fd);
			}

			$filePathApi = __DIR__."/resources/api.js";
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
				'title' => $values['title'],
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
			if ($result) {
				$urlM = api_get_self().'?idLudiLP='.$objectId."&first=1";
				header('Location: '.$urlM);
				Display::addFlash(Display::return_message(get_lang('Added')));
			}else{
				header('Location: '.api_get_self());
			}
			
			exit;
		}
		break;
}

$tpl = new Template("oel elearning tools");
$tpl->assign('form', $form->returnForm());

$content = $tpl->fetch('/adv_oel_tools_teachdoc/view/page_create-v2.tpl');

$tpl->assign('content', $content);

$tpl->display_one_col_template();
