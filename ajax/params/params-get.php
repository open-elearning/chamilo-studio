<?php

require_once __DIR__.'/../../../../main/inc/global.inc.php';
require_once __DIR__.'/../inc/functions.php';

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

if(!isset($_GET['idteach'])){exit;}

$step = isset($_GET['step']) ? Security::remove_XSS($_GET['step']):'0';
$idPageTop = isset($_GET['idteach']) ? Security::remove_XSS($_GET['idteach']):'0';

if (oel_ctr_rights($idPageTop)==false) {
    echo "KO";
    exit;
}

$user = api_get_user_info();
$userId = $user['id'];
$idurl = api_get_current_access_url_id();
$UrlWhere = "";
$title = "error";

if($step==0){

    $sql = "SELECT options FROM plugin_oel_tools_teachdoc ";
    $sql .= "WHERE id = $idPageTop";

    $result = Database::query($sql);

    while($Part=Database::fetch_array($result)){
        $options = $Part['options'];
    }
    
    echo  $options;

}

if($step==1){

    $opt = isset($_GET['opt']) ? Security::remove_XSS($_GET['opt']):'0';
    $opt = oel_escape_string($opt);
    $sql = "UPDATE plugin_oel_tools_teachdoc SET options = '$opt' ";
    $sql .= "WHERE id = $idPageTop";
    $result = Database::query($sql);

}

if($step==4){

    $idPage = isset($_GET['idpg']) ? Security::remove_XSS($_GET['idpg']):'0';
    $opt = isset($_GET['opt']) ? Security::remove_XSS($_GET['opt']):'0';
    $opt = oel_escape_string($opt);
    $sql = "UPDATE plugin_oel_tools_teachdoc SET options = '$opt' ";
    $sql .= "WHERE id = $idPage AND id_parent = $idPageTop";
    $result = Database::query($sql);

}