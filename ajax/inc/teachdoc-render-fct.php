<?php

function getCollectionPages($idPage):array{

    $result = array();
    $sql = "SELECT id , title , type_node , behavior , colors ";
    $sql .= " FROM plugin_oel_tools_teachdoc ";
    $sql .= " WHERE id = $idPage;";
    
    $ip = 0;
    $ipReal = 0;
    $resultOne = Database::query($sql);

    while($row=Database::fetch_array($resultOne)){
        
        if ($row['colors']=='') {
            $row['colors'] = 'white-chami.css';
        }
        $result[$ip] = array(
            'id' => $row['id'],
            'next_id' => 0,
            'prev_id' => 0,
            'title' => $row['title'],
            'type_node' => $row['type_node'],
            'behavior' => $row['behavior'],
            'colors' => $row['colors'],
            'index' =>  $ipReal
        );
        
    }
    
    $ip = $ip + 1;
    $ipReal = $ipReal + 1;
    
    $sqlSubs = "SELECT id , title , type_node , behavior , colors FROM plugin_oel_tools_teachdoc ";
    $sqlSubs .= " WHERE type_node <> -1 AND id_parent = $idPage ORDER BY order_lst;";
    $resultSubs = Database::query($sqlSubs);

    while($rowS=Database::fetch_array($resultSubs)){
        
        if ($rowS['colors']=='') {
            $rowS['colors'] = 'white-chami.css';
        }
        
        $result[$ip] = array(
            'id' => $rowS['id'],
            'title' => $rowS['title'],
            'type_node' => $rowS['type_node'],
            'behavior' => $rowS['behavior'],
            'colors' => $rowS['colors'],
            'index' =>  $ipReal
        );
        if($rowS['type_node']!=3){
            $ipReal = $ipReal + 1;
        }
        $ip = $ip + 1;
    }

    return $result;
}

function findNextId($CollPages,$ida){

    $varLpid = -1;
    $aFind = false;
    foreach ($CollPages as &$row){
        if($aFind){
            $varLpid = $row["id"];
            $aFind = false;
        }
        if($row["id"]==$ida){
            $aFind = true;
        }
    }
    return $varLpid;

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