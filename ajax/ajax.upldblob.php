<?php

require_once __DIR__.'/../../../main/inc/global.inc.php';   
require_once '../0_dal/dal.save.php';
require_once '../0_dal/dal.chamilo_object.php';
require_once 'inc/functions.php';

if(isset($_GET['step'])){

    $idPage = get_int_from('id');
    $namefile = get_string_from('name');

    $localFolder = get_local_folder($idPage);

    $pathfile = "../editor/img_cache/tmp/".$namefile;
    
    $nameFile = get_clean_idstring(basename($ur));

    $courseFinalCache = api_get_path(SYS_PATH)."plugin/";
    $courseFinalCache .= "adv_oel_tools_teachdoc/editor/img_cache/".strtolower($localFolder)."/".$namefile;

    $courseFinalFolder = api_get_path(SYS_PATH)."plugin/";
    $courseFinalFolder .= "adv_oel_tools_teachdoc/editor/img_cache/".strtolower($localFolder)."/";
    
    if(!file_exists($courseFinalFolder)){
        mkdir($courseFinalFolder, 0777,true);
    }

    @rename($pathfile,$courseFinalCache);

    if (!file_exists($courseFinalCache)) {
        @copy($pathfile,$courseFinalCache);
    }

    if (file_exists($courseFinalCache)) {
        echo "img_cache/".strtolower($localFolder)."/".$namefile;
    } else {
        echo "KO";
    }

} else {

    $namefile = "imgblob_".uuid(6).".png";
    $output_file = "../editor/img_cache/tmp/".$namefile;
    if(!file_exists("../editor/img_cache/tmp/")){
        mkdir("../editor/img_cache/tmp/", 0777,true);
    }

    if ( isset($_POST['file64']) ) {
        $base64_string = (string)$_POST['file64'];
        base64_to_jpeg($base64_string, $output_file);

    }

    if (isset($_FILES['file'])) {
        if ( 0 < $_FILES['file']['error'] ) {
            echo 'Error: ' . $_FILES['file']['error'] . '<br>';
        } else {
            move_uploaded_file($_FILES['file']['tmp_name'],$output_file);
        }
    }

    if (file_exists($output_file)) {
        echo $namefile;
    } else {
        echo "KO " . $output_file . "  (".$_FILES['file']['tmp_name']. ")";
    }

}

function base64_to_jpeg($base64_string, $output_file) {

    $ifp = fopen( $output_file, 'wb' );
    $data = explode( ',', $base64_string );
    fwrite( $ifp, base64_decode( $data[ 1 ] ) );
    fclose( $ifp ); 

    return $output_file; 
}