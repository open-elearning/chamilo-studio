<?php

$CollectionPages = getCollectionPages($idPageTop);

$oldLpid = -1;
$pageActives = 0;

foreach ($CollectionPages as &$row){
    $row["prev_id"] = $oldLpid;
    $oldLpid = $row["id"];
    $row["next_id"] = findNextId($CollectionPages,$oldLpid);
}

if (strpos($optionsProjectCheck,"L")===false) {
    $renderM = '<div class=div-teachdoc>';
} else{
    $renderM = '<div class=div-teachdoc-hide >';
}

$renderM .= '<div class=deco-teachdoc ></div>';

$renderM .= '<img class="logotop-teachdoc" src="img/classique/oel_back.jpg" />';

$renderM .= '<div class="progress-teachdoc" >';

$renderM .= '<div class="left-text-progress" >0%</div>';

$renderM .= '<div class="left-teach-progress" >';
$renderM .= '<div class="left-barre-progress" ></div>';
$renderM .= '</div>';

$renderM .= '</div>';

$renderM .= '<ul class="list-teachdoc">';

$iP = 1;
$basePages = 'var basePages = new Array();';
$basePages .= 'basePages[0]=0;';

foreach($CollectionPages as &$row){
    
    $typeNode = intval($row["type_node"]);
    $pagebehav = $row["behavior"];

    if($pagebehav==''){
        $pagebehav = 0;
    }
    if ($typeNode!=3) {
        $pageActives++;
        $basePages .= 'basePages['.$iP.']='.$row["id"].';';
    }

    $renderM .= "<li style='position:relative;' ";
    $renderM .= " pagebehav='".$pagebehav."' ";
    
    if ($typeNode==1||$typeNode==2||$typeNode==4) {
        if (strpos($optionsProjectCheck,"N")===false) {
            $renderM .= " onClick='ctrlpl(".$row["id"].",act-bahavior,".$iP.",".$pagebehav.");' ";
        }
        $renderM .= " class='NodeLvl".$row["type_node"]." ";
        $renderM .= "subMenuSco".$iP." "."pgh".$row["id"]." ";
        $renderM .= "subMenuMini".$row["index"]."' >";
        $renderM .= "<span class='dotSubLudi' ></span>";
    } else {
        $renderM .= " class='NodeLvl1' >";
    }

    $renderM .= "<span>".$row["title"]."</span>";
    $renderM .= '</li>';
    if ($typeNode!=3) {
        $iP++;
    }
}

$renderM .= '</ul>';
$renderM .= '</div>';

if (strpos($optionsProjectCheck,"L")===false) {
    $renderM .= '<nav id="nav-bottom" class="fixed-top-nav fixed-top-nav-classic" >';
} else{
    $renderM .= '<nav id="nav-bottom" class="fixed-top-nav fixed-top-nav-large" >';
}

$renderM .= '<div class="span-ludi-progress" >';
$renderM .= '<div class="barre-ludi-progress" ></div>';
$renderM .= '</div>';

if (strpos($optionsProjectCheck,"T")===false) {
    $renderM .= '<button id="btn-next" act-next class="btn btn-outline-light" >&nbsp;>&nbsp;</button>';
    $renderM .= '<button id="btn-prev" act-prev class="btn btn-outline-light" >&nbsp;<&nbsp;</button>';
}

$renderM .= '</nav>';

$renderM .= '<div id="message-bottom" class="fixed-top-message" >';
$renderM .= 'Page incomplete';
$renderM .= '</div>';

//$pageScormCss = 'files/scorm.css';
//$baseCssC = file_get_contents($pageScormCss);
//$renderCss = $baseCssC;
$renderCss = '';
$pageScormNavig = '../resources/navig.js';
$baseNavig = file_get_contents($pageScormNavig);

$renderJS = '<script>var localIdTeachdoc='.intval($lp_id).';';
$renderJS .= 'var progressBtop='.intval($pageActives).';';
$renderJS .= $basePages;
$renderJS .= $baseNavig.'</script>';
//.$baseCtrNavig
$renderJS .= '<script type="text/javascript" src="jq.js?v=3"></script>';
$renderJS .= '<script type="text/javascript" src="api.js?v=3"></script>';
$renderJS .= '<script type="text/javascript" src="ng.js?v=3"></script>';
$renderJS .= '<link href="css/plug.css" rel="stylesheet" type="text/css" />';

?>