<?php

require_once __DIR__.'/../../../main/inc/global.inc.php';

require_once __DIR__.'/inc/teachdoc-render-prepare.php';
require_once __DIR__.'/inc/teachdoc-render-file.php';
require_once __DIR__.'/inc/functions.php';
require_once __DIR__.'../../inc/tranformSource.php';

require_once __DIR__.'/../0_dal/dal.save.php';
require_once __DIR__.'/../0_dal/dal.chamilo_object.php';

if (api_is_anonymous()) {
    echo "KOERRORPRINT";
    exit;
}

if (!isset($_GET['id'])) {
    exit;
}

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

$idPageT = get_int_from('id');
$havePdf = get_int_from('generepdf');

$CollectionPages = getCollectionPages($idPageT);

$baseHtmlAll = '';

$cssPath = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/templates/';
/*
$cssA = $cssPath.'styles/classic.css';
$baseCssAll = file_get_contents($cssA);
*/

$cssB = $cssPath.'styles/print.css';
$baseCssAll = file_get_contents($cssB);

foreach ($CollectionPages as &$row){
    
    $idPageG = intval($row["id"]);

    $baseHtml = '';
    $baseCss = '';

    $sql = "SELECT base_html,base_css ";
    $sql .= " FROM plugin_oel_tools_teachdoc ";
    $sql .= " WHERE id = $idPageG;";
    
    $resultOne = Database::query($sql);
    while($row=Database::fetch_array($resultOne)){
        $baseHtml = $row['base_html'];
        $baseCss = $row['base_css'];
    }
    $baseHtml = getSrcForPrint($baseHtml);
    $baseHtmlAll .= $baseHtml;

}

$baseHtmlAll = '<style>'.$baseCssAll.'</style>'.$baseHtmlAll;

$folderlocal = get_local_folder($idPageT);
$printPath = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/history_cache/'.$folderlocal.'-print' ;

if(!file_exists($printPath)){
    mkdir($printPath, 0777,true);
}

$absoluteFolder = api_get_path(WEB_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/';
$baseHtmlAll = str_replace('="img_cache/','="'.$absoluteFolder.'img_cache/',$baseHtmlAll);
$baseHtmlAll = str_replace('{abspath}',$absoluteFolder,$baseHtmlAll);
$baseHtmlAll = str_replace('="img/qcm/','="'.$absoluteFolder.'img/qcm/',$baseHtmlAll);
$baseHtmlAll = str_replace('="img/classique/','="'.$absoluteFolder.'img/classique/',$baseHtmlAll);


$baseHtmlAll = str_replace('matgreen1.png','matgreen0.png',$baseHtmlAll);

$printPathFile = $printPath.'/index.html';

$fd = fopen($printPathFile,'w');
fwrite($fd,$baseHtmlAll);
fclose($fd);

if ($havePdf==0) {
    echo api_get_path(WEB_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/history_cache/'.$folderlocal.'-print/index.html';
}

$pathPdf = api_get_path(SYS_PLUGIN_PATH).'/adv_oel_tools_teachdoc/editor/history_cache/'.$folderlocal.'-print/';

if ($havePdf==1) {
    
    //if (!file_exists($pathPdf.'export.pdf')) {

        $title = 'export pdf';
        $params = [
            'tempDir' => $pathPdf,
            'mode' => 'utf-8',
            'margin_left' => 15,
            'margin_right' => 15,
            'margin_top' => 25,
            'margin_bottom' => 20,
            'margin_header' => 8,
            'margin_footer' => 8,
        ];

        $tplA = new Template(removeQuotesPdf($title), false, false, false, false, false, false);
        $mpdf = new PDF('A4','P',$params,$tplA);

        $mpdf->set_custom_header('<p></p>');

        $CtrPathPdf = @$mpdf->exportFromHtmlToFile(
            $baseHtmlAll,
            'export',
            $pathPdf
        );

    //}

    echo api_get_path(WEB_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/history_cache/'.$folderlocal.'-print/export.pdf';

}