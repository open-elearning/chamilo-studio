<?php

/*
	ini_set('display_errors',1);
	ini_set('display_startup_errors',1);
	error_reporting(E_ALL);
*/

if(isset($_POST['id'])||isset($_GET['id'])){
	
	if(
		(isset($_POST['GpsComps'])&&isset($_POST['GpsStyle']))
		||(isset($_GET['GpsComps'])&&isset($_GET['GpsStyle']))
	){
		
		require_once  __DIR__.'/../../../../main/inc/global.inc.php';
		require_once '../inc/functions.php';
		require_once "../../0_dal/dal.save.php";

		$idPage = get_int_from('id');

		if (oel_ctr_rights($idPage)==false) {
			echo "KO";
			exit;
		}
		
		$GpsComps = get_string_direct_from('GpsComps');
		$GpsStyle = get_string_direct_from('GpsStyle');
		
		if($GpsComps!=''&&$GpsStyle!=''){
			oel_tools_update_element_compo($GpsComps,$GpsStyle,$idPage);
		}else{
			echo " Saved KO";
		}

	}

}else{

	echo 'error no id';

}
