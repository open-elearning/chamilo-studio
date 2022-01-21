<?php

function recurseCopyFolderSco($src,$dst){

    $dir = opendir($src); 
    
    @mkdir($dst); 
    
    while(false !== ( $file = readdir($dir)) ) { 
        if (( $file != '.' ) 
        && ( $file != '..' ) 
        && ( $file != 'Thumbs.db' ) ) { 
            if ( is_dir($src . '/' . $file) ) { 
                recurseCopyFolderSco($src . '/' . $file,$dst . '/' . $file); 
            } else { 
                copy($src . '/' . $file,$dst . '/' . $file); 
            }
        } 
    } 
    
    closedir($dir);
    
}

function oel_ctr_rights($idPage)
{

    $lst_ids = '';

    if (isset($_SESSION['idsessionedition'])) {
        $lst_ids = (string)$_SESSION["idsessionedition"];
    }

    if ($lst_ids=='') {
        return true;
    } else {
        $pos = strrpos($lst_ids,';'.$idPage.';');
        if($pos=== false){
            return false;
        }else{
            return true;
        }
    }

}


function oel_escape_string($value)
{
    $search = array("\\",  "\x00", "\n",  "\r",  "'",  '"', "\x1a");
    $replace = array("\\\\","\\0","\\n", "\\r", "\'", '\"', "\\Z");
    return str_replace($search, $replace, $value);
}

function uuid($length)
{
    $chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    while (strlen($chars) < $length) {
        $chars .= $chars;
    }
    return substr(str_shuffle($chars), 0, $length);
}

function get_int_from($search){

    $valInt = 0;
	if(isset($_POST[$search])){
        $valInt = $_POST[$search];
    }
    if(isset($_GET[$search])){
        $valInt = $_GET[$search];
    }
    return Security::remove_XSS($valInt);

}

function get_string_from($search){

    $valStr = '';
	if(isset($_POST[$search])){
        $valStr = $_POST[$search];
    }
    if(isset($_GET[$search])){
        $valStr = $_GET[$search];
    }
    return Security::remove_XSS($valStr);

}

function get_string_direct_from($search){

    $valStr = '';
	if(isset($_POST[$search])){
        $valStr = $_POST[$search];
    }
    if(isset($_GET[$search])){
        $valStr = $_GET[$search];
    }
    return ($valStr);

}

function get_clean_idstring($value){

    $value = strtolower($value);
    $search =  array("é"," ","ç","è","?",'"',"'");
    $replace = array("e","-","c","e","" ,'-','-');
    return str_replace($search, $replace, $value);
    
}


function fileIndexOf($mystring,$search){
	$pos = strrpos($mystring,$search);
	if($pos=== false){
		return false;
	}else{
		return true;
	}
}
