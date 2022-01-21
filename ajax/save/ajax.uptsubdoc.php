<?php

//ajax.uptsubdoc.php

/*
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);
*/

if(isset($_POST['id'])||isset($_GET['id'])){
	
	require_once __DIR__.'/../../../../main/inc/global.inc.php';
	require_once '../inc/functions.php';

	$idPage = get_int_from('id');
	$titleP = get_string_from('title');
	$behavior = get_int_from('behavior');
	$actionP = get_int_from('a');
	$idPageHtmlTop = get_int_from('pt');

	if (oel_ctr_rights($idPageHtmlTop)==false) {
		echo "KO oel_ctr_rights ";
		exit;
	}

	$user = api_get_user_info();
	$userId = $user['id'];
	$idUrl = api_get_current_access_url_id();

	$table = 'plugin_oel_tools_teachdoc';
	
	if($actionP==666){

		$params = [
			'type_node' => '-1'
		];
		$result = Database::update($table, $params, ['id = ? AND id_url = ?' =>[ $idPage,$idUrl]]);
		
		echo 'OK';

	}else{

		if($titleP!=''){
		
			$params = [
				'title' => $titleP,
				'behavior' => $behavior
			];
			$result = Database::update($table, $params, ['id = ? AND id_url = ?' =>[ $idPage,$idUrl]]);
			
			echo 'OK';
			
		}else{
			echo 'KO';
		}
	}
}
