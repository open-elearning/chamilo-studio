<?php
	
require_once __DIR__.'/../../../main/inc/global.inc.php';

if(!api_is_anonymous()){

	require_once '../0_dal/dal.save.php';
	require_once 'inc/functions.php';

	$vers = 6;
	$table = 'plugin_oel_tools_teachdoc';
	$idurl = api_get_current_access_url_id();
	
	$UrlWhere = "";
	if ((api_is_platform_admin() || api_is_session_admin()) && api_get_multiple_access_url()) {
		$UrlWhere = " AND id_url = $idurl ";
	}
	$lpIdLst = ',';
	$sqlNS = "SELECT lp_id FROM $table WHERE id_parent = 0 $UrlWhere ";
	
	$resultPartSub = Database::query($sqlNS);
	
	while($PartTop=Database::fetch_array($resultPartSub)){
		$lpId = $PartTop['lp_id'];
		if($lpId!=0){
			$lpIdLst=$lpIdLst.$lpId.',';
		}
	}
	
	$user = api_get_user_info();
	
	if(isset($user['status'])){

		if($user['status']==SESSIONADMIN
		||$user['status']==COURSEMANAGER
		||$user['status']==PLATFORM_ADMIN){
			$lpIdLst =  ',canedit'.$lpIdLst;
		}

	}
	
	$_SESSION['teachdocLstIds'] = $lpIdLst;
	
	echo $lpIdLst;

}else{

	echo 'KO';
	
}