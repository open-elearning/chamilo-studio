<?php

function oel_tools_max_order($idPage){

    $idPage = intval($idPage);
    $MaxOrder = 2;
    
    $sqlMaxOrder = "SELECT max(order_lst) as order_max FROM plugin_oel_tools_teachdoc ";
    $sqlMaxOrder .= " WHERE id_parent = $idPage or id = $idPage ;";
    $resultMaxOrder = Database::query($sqlMaxOrder);
    while($PartMaxOrder=Database::fetch_array($resultMaxOrder)){
        $MaxOrder = $PartMaxOrder['order_max'];
    }
    $MaxOrder = $MaxOrder + 1;
    return $MaxOrder;

}

function oel_tools_insert_element($titlenew,$idTopPage,$userId,$MaxOrder,$idUrl,$typeNode){

    $idTopPage = intval($idTopPage);
    $idUrl = intval($idUrl);
    $userId = intval($userId);
    $MaxOrder = intval($MaxOrder);

    $date = new DateTime();
    $year = $date->format("Y");
    $month = $date->format('m');
    $day = $date->format('j');

    $dateStr = $day.'/'.$month.'/'.$year;

    $localcolors = get_local_theme($idTopPage);
    
    $params = [
        'title' => $titlenew ,
        'date_create' => $dateStr,
        'id_parent' => $idTopPage,
        'id_user' => $userId,
        'type_base' => '',
        'order_lst' => $MaxOrder,
        'type_node' => $typeNode,
        'behavior' => 2,
        'colors' => $localcolors,
        'id_url' => $idUrl
    ];

    $table = 'plugin_oel_tools_teachdoc';
    $result = Database::insert($table, $params);
    if($result){
        $objectId = Database::insert_id();
        echo $objectId;
    }else{
        echo 'KO';
    }

}

function oel_tools_update_element_compo($GpsComps,$GpsStyle,$idPage){

    $idPage = intval($idPage);
    $user = api_get_user_info();

    $table = 'plugin_oel_tools_teachdoc';
    $params = [
        'GpsComps' => $GpsComps,
        'GpsStyle' => $GpsStyle
    ];
    $whereConditions = [
        'id = ?' => $idPage,
        'AND id_user = ?' => $user['id']
    ];

    $statusStr = " user ";
    $isAdmin = api_is_platform_admin();
    if($user['status']==SESSIONADMIN||$user['status']==PLATFORM_ADMIN||$isAdmin){
        $statusStr = "admin ";
        $whereConditions = [
            'id = ?' => $idPage
        ];
    }

    $resultUp = Database::update($table, $params,$whereConditions);
    echo $statusStr." - Saved OK";

}

function oel_tools_save_element_compo($baseHtml,$baseCss,$idPage){

    $idPage = intval($idPage);
    $user = api_get_user_info();
			
    $table = 'plugin_oel_tools_teachdoc';
    $params = [
        'base_html' => $baseHtml,
        'base_css' => $baseCss
    ];
    $whereConditions = [
        'id = ?' => $idPage,
        'AND id_user = ?' => $user['id']
    ];

    $statusStr = "coursemanager";
    $isAdmin = api_is_platform_admin();

    if($user['status']==SESSIONADMIN||$user['status']==PLATFORM_ADMIN||$isAdmin){
        $statusStr = "admin ";
        $whereConditions = [
            'id = ?' => $idPage
        ];
    }
    
    $resultUp = Database::update($table, $params,$whereConditions);


}

function get_local_theme($idPageT){

    $idPageT = intval($idPageT);
    $id_parent = 0;
    $localcolors = "";

    $sql = "SELECT id_parent FROM plugin_oel_tools_teachdoc 
    WHERE id = $idPageT ";
    $result = Database::query($sql);
    while($Part=Database::fetch_array($result)){
        $id_parent= $Part['id_parent'];
    }

    if ($id_parent>0) {
        
        $sql = "SELECT colors FROM plugin_oel_tools_teachdoc 
        WHERE id = $id_parent ";
        $result = Database::query($sql);
        while($Part=Database::fetch_array($result)){
            $localcolors = $Part['colors'];
        }
        
    }

    if($localcolors==""){
        $sql = "SELECT colors FROM plugin_oel_tools_teachdoc 
        WHERE id = $idPageT and  id_parent = 0";
        $result = Database::query($sql);
        while($Part=Database::fetch_array($result)){
            $localcolors = $Part['colors'];
        }
    }

    return $localcolors;

}

function get_local_folder($idPageT){

    $idPageT = intval($idPageT);
    $id_parent = 0;
    $localfolder = "";
    
    $sql = "SELECT id_parent FROM plugin_oel_tools_teachdoc 
    WHERE id = $idPageT ";
    $result = Database::query($sql);
    while($Part=Database::fetch_array($result)){
        $id_parent= $Part['id_parent'];
    }

    if ($id_parent>0) {
      
        $sql = "SELECT local_folder FROM plugin_oel_tools_teachdoc 
        WHERE id = $id_parent ";
        $result = Database::query($sql);
        while($Part=Database::fetch_array($result)){
            $localfolder = $Part['local_folder'];
        }
    
    }

    if($localfolder==""){
        $sql = "SELECT local_folder FROM plugin_oel_tools_teachdoc 
        WHERE id = $idPageT and  id_parent = 0";
        $result = Database::query($sql);
        while($Part=Database::fetch_array($result)){
            $localfolder = $Part['local_folder'];
        }
    }

    return $localfolder;

}

function get_top_page_id($idPage){

    $idPage = intval($idPage);
    $topPage = 0;

	$sqlNS = "SELECT id_parent FROM plugin_oel_tools_teachdoc ";
	$sqlNS .= " WHERE id = $idPage;";

	$resultPartSub = Database::query($sqlNS);
	while($PartTop=Database::fetch_array($resultPartSub)){
		$topPage = $PartTop['id_parent'];
	}
    return $topPage;

}

function range_all_pages($idTopPage,$idPage,$action,$idUrl){

    $idPage = intval($idPage);
    $action = intval($action);
    $findBefore = false;
	$idOld = 0;
	$orderOld = 0;
	$orderActual = 0;
	$idBefore = 0;
	$orderBefore = 0;
	$idAfter = 0;
	$orderAfter= 0;
    $table = 'plugin_oel_tools_teachdoc';

    //MAJ
	$sqlSubs = "SELECT id,order_lst FROM plugin_oel_tools_teachdoc ";
	$sqlSubs .= " WHERE type_node <> -1 AND id_parent = $idTopPage ORDER BY order_lst;";
	
	$indexOrder = 1;

	$resultSubs = Database::query($sqlSubs);

	while($PartSub=Database::fetch_array($resultSubs)){

		$id = $PartSub["id"];
		$sqlUpdate  = " UPDATE plugin_oel_tools_teachdoc ";
		$sqlUpdate  .= " SET order_lst = $indexOrder ";
		$sqlUpdate  .= " WHERE plugin_oel_tools_teachdoc.id = $id ";
		Database::query($sqlUpdate);
		$indexOrder = $indexOrder  + 1;
	}

	//BEFORE NEXT
	$resultSubs = Database::query($sqlSubs);
	while($PartSub=Database::fetch_array($resultSubs)){
		
		if($findBefore){
			$idAfter = $PartSub["id"];;
			$orderAfter= $PartSub["order_lst"];
			$findBefore = false;
		}
		if($idPage==$PartSub["id"]){
			$findBefore = true;
			$orderActual = $PartSub["order_lst"];
			$idBefore = $idOld;
			$orderBefore = $orderOld;
		}
		$idOld = $PartSub["id"];
		$orderOld = $PartSub["order_lst"];
	}

    if($action==0){

		if($idBefore>0){
		
			$params = ['order_lst' => $orderActual];
			Database::update($table, $params, ['id = ? AND id_url = ?' =>[ $idBefore,$idUrl]]);

			if($orderActual>0){
				$params = ['order_lst' => ($orderActual-1)];
				Database::update($table, $params, ['id = ? AND id_url = ?' =>[ $idPage,$idUrl]]);
				echo "OK";
			}else{
				echo "KO";
			}

		}

	}

	if($action==1){

		if($idAfter>0){
			
			$params = ['order_lst' => $orderActual];
			Database::update($table, $params, ['id = ? AND id_url = ?' =>[ $idAfter,$idUrl]]);
			
			if($orderActual>0){
				$params = ['order_lst' => ($orderActual+1)];
				Database::update($table, $params, ['id = ? AND id_url = ?' =>[ $idPage,$idUrl]]);
				echo "OK";
			}else{
				echo "KO";
			}

		}

	}

}

function get_oel_tools_infos($idPageTop){

    $idPageTop = intval($idPageTop);
    $UrlWhere = "";
    
    $arrayKeys = array(
        "lp_id"  => 0,
        "title" => '',
        "local_folder"  => '',
        "optionsProject"  => '',
        "optionsProjectImg" => '',
        "optionsProjectCheck" => ''
     );

    $idurl = api_get_current_access_url_id();
    if ((api_is_platform_admin() || api_is_session_admin()) && api_get_multiple_access_url()) {
        $UrlWhere = " AND id_url = $idurl ";
    }
    //AND id_user = $userId $UrlWhere

    $sql = "SELECT title, lp_id,local_folder,options FROM plugin_oel_tools_teachdoc ";
    $sql .= "WHERE id = $idPageTop $UrlWhere";

    $result = Database::query($sql);
    while($Part=Database::fetch_array($result)){
        $arrayKeys['lp_id'] = $Part['lp_id'];
        $arrayKeys['title'] = $Part['title'];
        $arrayKeys['local_folder'] = $Part['local_folder'];
        $arrayKeys['optionsProject'] = $Part['options'];

        $optionsProject = $Part['options'];
        if($optionsProject!=''){
            $optionsProject .= '@@@@@';
            $optD = explode("@", $optionsProject);
            $arrayKeys['optionsProjectCheck'] = " ".$optD[1];

            $imgSrc = $optD[0];
            $arrayKeys['optionsProjectImg'] = $imgSrc;
        }

    }

    return $arrayKeys;

}

function get_oel_tools_options($idPage){

    $options = "";
    $idPage = intval($idPage);

    $sql = "SELECT options";
    $sql .= " FROM plugin_oel_tools_teachdoc ";
    $sql .= " WHERE id = $idPage;";
    
    $resultParts = Database::query($sql);
    
    while($Part=Database::fetch_array($resultParts)){
        $options  = $Part['options'];
    }

   return $options;
}


function get_oel_tools_editor($idPage){

    $idPage = intval($idPage);
 
    $arrayKeys = array(
        "title"  => 0,
        "base_html" => '',
        "base_css"  => '',
        "type_base"  => '',
        "GpsComps" => '',
        "GpsStyle" => '',
        "id_parent" => '',
        "colors" => '',
        "options" => '',
     );

     $sql = "SELECT title,base_html,base_css,GpsComps,GpsStyle,type_base,id_parent,colors,type_node,options";
     $sql .= " FROM plugin_oel_tools_teachdoc ";
     $sql .= " WHERE id = $idPage;";
     
     $resultParts = Database::query($sql);
     
     while($Part=Database::fetch_array($resultParts)){
       $arrayKeys['title'] = $Part['title'];
       $arrayKeys['base_html'] = $Part['base_html'];
       $arrayKeys['base_css'] = $Part['base_css'];
       $arrayKeys['type_base'] = $Part['type_base'];
       $arrayKeys['GpsComps']  = $Part['GpsComps'];
       $arrayKeys['GpsStyle']  = $Part['GpsStyle'];
       $arrayKeys['id_parent']  = $Part['id_parent'];
       $arrayKeys['colors']  = $Part['colors'];
       $arrayKeys['type_node']  = $Part['type_node'];
       $arrayKeys['options']  = $Part['options'];

       if($arrayKeys['id_parent']==0){
        $arrayKeys['id_parent'] = $idPage;
       }
     }
     if( $arrayKeys['colors']==""){
        $arrayKeys['colors']= "white-chami.css";
     }

    return $arrayKeys;

}

function update_oel_tools_color($idPage,$colors_data){

    $idPage = intval($idPage);
    
    $sqlU = "UPDATE plugin_oel_tools_teachdoc SET colors = '$colors_data' ";
    $sqlU .= " WHERE id = $idPage or id_parent = $idPage;";
    Database::query($sqlU);

}


?>