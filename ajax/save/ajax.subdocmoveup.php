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
	
	$idPage = get_int_from('id');
	$action = get_int_from('a');
	
	$user = api_get_user_info();
	$userId = $user['id'];
	$idUrl = api_get_current_access_url_id();

	$topPage = get_top_page_id($idPage);

	if (oel_ctr_rights($topPage)==false) {
		echo "KO";
		exit;
	}

	range_all_pages($topPage,$idPage,$action,$idUrl);
	

}
