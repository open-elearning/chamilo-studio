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

function getCollectionPages($idPage):array{

    $result = array();
    $sql = "SELECT id , title , type_node , behavior , colors , quizztheme ";
    $sql .= " FROM plugin_oel_tools_teachdoc ";
    $sql .= " WHERE id = $idPage;";
    
    $ip = 0;
    $ipReal = 0;
    $resultOne = Database::query($sql);

    while($row=Database::fetch_array($resultOne)){
        
        if ($row['colors']=='') {
            $row['colors'] = 'white-chami.css';
        }

        if ($row['quizztheme']=='') {
            $row['quizztheme'] = 'white-quizz.css';
        }

        $result[$ip] = array(
            'id' => $row['id'],
            'next_id' => 0,
            'prev_id' => 0,
            'title' => $row['title'],
            'type_node' => $row['type_node'],
            'behavior' => $row['behavior'],
            'colors' => $row['colors'],
            'quizztheme' => $row['quizztheme'],
            'index' =>  $ipReal
        );
        
    }
    
    $ip = $ip + 1;
    $ipReal = $ipReal + 1;
    
    $sqlSubs = "SELECT id , title , type_node , behavior , colors , quizztheme FROM plugin_oel_tools_teachdoc ";
    $sqlSubs .= " WHERE type_node <> -1 AND id_parent = $idPage ORDER BY order_lst;";
    $resultSubs = Database::query($sqlSubs);

    while($rowS=Database::fetch_array($resultSubs)){
        
        if ($rowS['colors']=='') {
            $rowS['colors'] = 'white-chami.css';
        }
        if ($rowS['quizztheme']=='') {
            $rowS['quizztheme'] = 'white-quizz.css';
        }
        
        $result[$ip] = array(
            'id' => $rowS['id'],
            'title' => $rowS['title'],
            'type_node' => $rowS['type_node'],
            'behavior' => $rowS['behavior'],
            'colors' => $rowS['colors'],
            'quizztheme' => $rowS['quizztheme'],
            'index' =>  $ipReal
        );
        if($rowS['type_node']!=3){
            $ipReal = $ipReal + 1;
        }
        $ip = $ip + 1;
    }

    return $result;
}

function getDirectoryRender($lpid){

    $course_table = Database::get_main_table(TABLE_MAIN_COURSE);
    $tblCLp = Database::get_course_table(TABLE_LP_MAIN);
    $courseDir = '';
    $sqlC = "SELECT directory FROM $course_table ";
    $sqlC .= " INNER JOIN $tblCLp ON $tblCLp.c_id = $course_table.id  ";
    $sqlC .= " WHERE $tblCLp.id = $lpid";
    $resultC = Database::query($sqlC);
    while($PartC=Database::fetch_array($resultC)){
        $courseDir = $PartC['directory'];
    }
    return $courseDir;

}

?>
