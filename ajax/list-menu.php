<?php

/*
    ini_set('display_errors',1);
    ini_set('display_startup_errors',1);
    error_reporting(E_ALL);
*/

if(isset($_POST['id'])||isset($_GET['id'])){

    require_once __DIR__.'/../../../main/inc/global.inc.php';
    require_once '../0_dal/dal.save.php';
    
    require_once 'inc/functions.php';
    
    $indexPage = 0;

    $idPage = get_int_from('id');
    $topPage = -1;
   
   if($idPage!=0){

        $base_behavior = 0;
        $newSearch = false;
        $user = api_get_user_info();
        $sql = "SELECT title , id_parent , behavior FROM plugin_oel_tools_teachdoc ";
        $sql .= " WHERE id = $idPage;";
        
        $resultParts = Database::query($sql);

        while($Part=Database::fetch_array($resultParts)){

            $base_title = $Part['title'];
            $base_id_parent = $Part['id_parent'];
            $base_behavior = $Part['behavior'];
            if($base_id_parent==0){
                $topPage = $idPage;
            }else{
                $topPage = $base_id_parent;
                $newSearch = true;
            }
        }
        
        if($newSearch){
            $sqlNS = "SELECT title , id_parent , behavior FROM plugin_oel_tools_teachdoc ";
            $sqlNS .= " WHERE id = $topPage;";
            $resultPartSub = Database::query($sqlNS);
            while($PartTop=Database::fetch_array($resultPartSub)){
                $base_title = $PartTop['title'];
                $base_behavior = $PartTop['behavior'];
            }
        }
        
        echo '<ul class="list-teachdoc">';
        
        if($idPage==$topPage){
            echo "<li class=activeli ><span behavior=$base_behavior class='miniMenuLudi' id='labelMenuLudi$topPage' >$base_title</span>";
        }else{
            echo "<li><span class='miniMenuLudi' behavior=$base_behavior id='labelMenuLudi$topPage'  onclick='loadSubLudi($topPage);' >$base_title</span>";
        }
        echo '<span onclick="loadContextMenuSub('.$topPage.','.$indexPage.');" class="badge fa fa-pencil"></span>';
        echo '</li>';
        
        $sqlSubs = "SELECT title , id, behavior, type_node FROM plugin_oel_tools_teachdoc ";
        $sqlSubs .= " WHERE type_node <> -1 AND id_parent = $topPage ORDER BY order_lst;";
        
        $resultSubs = Database::query($sqlSubs);

        $indexPage = $indexPage +1;

        while($PartSub=Database::fetch_array($resultSubs)){
            
            $base_subtitle = $PartSub['title'];
            $id_subtitle = $PartSub['id'];
            $base_behavior = $PartSub['behavior'];
            $type_node = $PartSub['type_node'];
            
            if($idPage==$id_subtitle){
                echo "<li class=activeli ><span class='dotSubLudi' ></span><span class='miniMenuLudi' behavior=$base_behavior id='labelMenuLudi$id_subtitle' >$base_subtitle</span>";
            }else{
                // Content
                if ($type_node==2||$type_node==4) {
                    echo "<li><span class='dotSubLudi' ></span><span class='miniMenuLudi' onclick='loadSubLudi($id_subtitle);' behavior=$base_behavior id='labelMenuLudi$id_subtitle' >$base_subtitle</span>";
                }else{
                    // Title section
                    if ($type_node==3) {
                        echo "<li><span class='miniMenuLudi' behavior=$base_behavior id='labelMenuLudi$id_subtitle' >$base_subtitle</span>";
                    }
                }
                
            }
            
            echo '<span onclick="loadContextMenuSub('.$id_subtitle.','.$indexPage.');" class="badge fa fa-pencil"></span>';
            echo '</li>';
            
            $indexPage = $indexPage +1;
            
        }
        
        echo "<li onClick='displaySubPageEdit($topPage);' class=addli style='text-align:center;cursor:pointer;' >";
        echo "<img style='position:relative;left:50%;margin-left:-15px;' src='img/addScreengray.png' ></li>";

        echo '</ul>';

    }

}
