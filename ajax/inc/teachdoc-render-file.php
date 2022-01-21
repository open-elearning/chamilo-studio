<?php

function pageGenerationProcess($pid,$courseSys,$extra,$extraCss,$extraJS,$index,$idPgTop,$base_html,$base_css,$prevIdent,$nextIdent,$behavior){

    $courseSysPage0 = $courseSys."/teachdoc-$pid.html";
    
    if($pid==$idPgTop){
        $courseSysPageIndex = $courseSys."/"."index.html";
        $dataIndex = file_get_contents($courseSysPageIndex);
        $dataIndex = str_replace('{start}',$pid,$dataIndex);
        $fd = fopen($courseSysPageIndex,'w');	
        fwrite($fd,$dataIndex);
        fclose($fd);
    }

    if($nextIdent==-1){
        $extra = str_replace( 'act-next',' style="opacity:0.2;" ',$extra);
    }else{
        $extra = str_replace( 'act-next',' onClick="ctrlpl(basePages['.($index + 2).'],'.$behavior.');" ',$extra);
    }

    if($prevIdent==-1){
        $extra = str_replace( 'act-prev',' style="opacity:0.2;" ',$extra);
    }else{
        $extra = str_replace( 'act-prev',' onClick="ctrlpl(basePages['.($index).'],0);" ',$extra);
    }

    $extra = str_replace('act-bahavior',$behavior,$extra);
    
    $base_html = str_replace('img/qcm/matgreen1.png','img/qcm/matgreen0r.png',$base_html);
    $base_html = str_replace('onmousedown="parent.displayEditButon(this);"',' ',$base_html);
    $base_html = str_replace('$pluginfx-obj$','',$base_html);

    $finalTop = "<!doctype html><html><head>";
    $finalTop .= '<meta charset="utf-8">';
    $finalTop .= "<title>TeachDoc engine</title>";
    $finalTop .= '<link href="css/scorm.css?v=2" rel="stylesheet" type="text/css" />';
    $finalTop .= "</head>";
    
    $finalTop .= '<body style="background-color:#D8D8D8;" >';
    $finalhtml = getSrcForSave($base_html);
    
    $finalFooter = "<style>body,html {height: 100%;";
    $finalFooter .= "margin: 0;}".$extraCss.$base_css;
    $finalFooter .= ".cell{border:dashed 0px #A9CCE3;}";
    $finalFooter .= "</style>";
    $finalFooter .= '</body></html>';
    
    $base_html = $finalTop.$finalhtml.$finalFooter;
    
    $extraH = str_replace( 'subMenuMini'.$index,'activeli',$extra);
    $base_html = str_replace('</head>','</head>'.$extraH,$base_html);
    
    $extraJS = '<script>var pageBindex='.intval($index + 1).';</script>'.$extraJS;
    $base_html = str_replace('</body>',$extraJS.'</body>',$base_html);

    $fp = fopen($courseSysPage0,'w');
    fwrite($fp,$base_html);
    fclose($fp);

}

?>