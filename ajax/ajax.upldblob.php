<?php

require_once __DIR__.'/../../../main/inc/global.inc.php';   
require_once '../0_dal/dal.save.php';
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

    if(!file_exists("../editor/img_cache/tmp/")){
        mkdir("../editor/img_cache/tmp/", 0777,true);
    }

    $namefile = "imgblob_".uuid(6).".png";
    $pathfile = "../editor/img_cache/tmp/".$namefile;

    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    } else {
        move_uploaded_file($_FILES['file']['tmp_name'],$pathfile);
    }

    if (file_exists($pathfile)) {
        echo $namefile;
    } else {
        echo "KO";
    }

}

// if(isset($_POST['image64'])){

//     $base64_string = $_POST['image64'];
//     $output_file = '../editor/img_cache/hello.jpg';
//     base64_to_jpeg($base64_string, $output_file);
//     $picture = $request->files->get('picture');

// }else{

//     if(isset($_POST['image'])){

//         $img_blob = $_POST['image'];
    
//         file_put_contents('../editor/img_cache/hello.png', $img_blob);
    
//     }else{
    
//         echo "no data";
//     }    

// }


function base64_to_jpeg($base64_string, $output_file) {

    $ifp = fopen( $output_file, 'wb' );
    $data = explode( ',', $base64_string );
    fwrite( $ifp, base64_decode( $data[ 1 ] ) );
    fclose( $ifp ); 

    return $output_file; 
}