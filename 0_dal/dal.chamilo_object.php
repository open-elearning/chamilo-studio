<?php

function get_lp_Id($idPageT){

    $idPageT = intval($idPageT);
    $lpid = 0;

    $sql = "SELECT lp_id FROM plugin_oel_tools_teachdoc WHERE id = $idPageT ";
    $result = Database::query($sql);
    while($Part=Database::fetch_array($result)){
        $lpid = $Part['lp_id'];
    }
    return $lpid;

}

function get_directory($lpid){

    $lpid = intval($lpid);

    $course_table = Database::get_main_table(TABLE_MAIN_COURSE);
    $tblCLp = Database::get_course_table(TABLE_LP_MAIN);
    $courseDir = '';
    $sqlC = "SELECT directory FROM $course_table INNER JOIN $tblCLp ON $tblCLp.c_id = $course_table.id WHERE $tblCLp.id = $lpid";
    $resultC = Database::query($sqlC);
    while($PartC=Database::fetch_array($resultC)){
        $courseDir = $PartC['directory'];
    }
    return $courseDir;

}


function update_lp_infos($lp_id,$title,$local_folder){

    $tblCLp = Database::get_course_table(TABLE_LP_MAIN);
    $title = oel_escape_string($title);
    $sqlU = "UPDATE $tblCLp SET $tblCLp.path = '$local_folder/.' , $tblCLp.default_view_mod = 'embedframe' , $tblCLp.name = '$title' ";
    $sqlU .= " WHERE $tblCLp.id = $lp_id;";
    Database::query($sqlU);
    
}


?>
