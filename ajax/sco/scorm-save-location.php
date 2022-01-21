<?php

use ChamiloSession as Session;

require_once __DIR__.'/../../../../main/inc/global.inc.php';

if(isset($_GET['id'])||isset($_GET['idteach'])){
    
    if(!api_is_anonymous()){

        $tableLPVIEW = Database::get_course_table(TABLE_LP_VIEW);
        
        $session_condition = api_get_session_condition(
            api_get_session_id(),
            true,
            false
        );
        $course_id = api_get_course_int_id();
        
        $l_id = 0;
        $loc = 0;
        if(isset($_GET['idteach'])){
            $tid = $_GET['idteach'];
            $sqlTeach = "SELECT lp_id FROM plugin_oel_tools_teachdoc WHERE id = $tid ";
            $resultTeach = Database::query($sqlTeach);
            echo  $sqlTeach;
            while($PartTeach=Database::fetch_array($resultTeach)){
                $l_id = $PartTeach['lp_id'];
            }
        }else{
            $l_id = intVal($_GET['id']);
            if(isset($_GET['loc'])){
                $loc = intVal($_GET['loc']);
            }
        }
        
        $itemViewId = 0;
        $sqlT = " SELECT id FROM $tableLPVIEW ";
        $sqlT .= " WHERE lp_id = $l_id ";
        $sqlT .= " AND c_id = ".$course_id;
        $sqlT .= " AND user_id = ".api_get_user_id()." ".$session_condition;
        $resultT = Database::query($sqlT);
        
        while($Part=Database::fetch_array($resultT)){
            $itemViewId = $Part['id'];
        }

        if($itemViewId>0){

            $tableLPITEMVIEW = Database::get_course_table(TABLE_LP_ITEM_VIEW);

            if($loc>0){
                
                $sql = "UPDATE $tableLPITEMVIEW SET
                lesson_location = ".$loc."
                WHERE lp_view_id = ".$itemViewId." AND lesson_location < $loc;";
                Database::query($sql);
            
            }else{

                if(isset($_GET['idteach'])){

                    $sql = "UPDATE $tableLPITEMVIEW SET
                    lesson_location = 0,score = 0,status = 'not attempted'
                    WHERE lp_view_id = ".$itemViewId." ;";
                    //echo $sql;
                    Database::query($sql);

                    $sqlP = " UPDATE c_lp_view SET progress = 0 WHERE c_lp_view.iid = ".$itemViewId.";";
                    Database::query($sqlP);
                    
                    Session::erase('lpobject');

                }

            }
       
        }
       
    }
}

?>