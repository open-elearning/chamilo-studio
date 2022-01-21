<?php

/*
	ini_set('display_errors',1);
	ini_set('display_startup_errors',1);
	error_reporting(E_ALL);
*/

if(isset($_POST['id'])||isset($_GET['id'])){
	
	require_once __DIR__.'/../../../../main/inc/global.inc.php';
	require_once '../inc/functions.php';
	require_once "../../0_dal/dal.save.php";
	
	$idTopPage = get_int_from('id');

	if (oel_ctr_rights($idTopPage)==false) {
		echo "KO";
		exit;
	}
	
	$titlenew = get_string_from('title');
	$typeNode = get_int_from('typenode');
	
	if($idTopPage!=-1&&$titlenew!=''){

		$user = api_get_user_info();
		$userId = $user['id'];
		$idUrl = api_get_current_access_url_id();

		$MaxOrder = oel_tools_max_order($idTopPage);
		
		oel_tools_insert_element($titlenew,$idTopPage,$userId,$MaxOrder,$idUrl,$typeNode);
		
	}

}else{

	echo 'KO';

}