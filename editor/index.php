<!doctype html>
  <html lang="en" >
  <head>
  <?php
      
      $version = "1.11.16.49";
      
      echo "<script>";
      echo "var versionCS = '".$version."';";
      echo "var userStatusCS = '?';";
      echo "var listPagesCS = '?';";
      echo "</script>";
      
      error_reporting(E_ERROR | E_PARSE);
      
      $title = '';
      $base_html = '';
      $base_css = '';
      $colors_data = '';
      $quizztheme_data = '';
      $type_base = 1;
      $id_parent = 0;
      $loadh = '';
      $changColor = '';
      $changQuizzColor = '';

      if (isset($_GET['id'])) {

        $idPage = intval($_GET['id']);

        if (isset($_GET['changc'])) {
          $changColor = $_GET['changc'];
        }
        if (isset($_GET['changquizz'])) {
          $changQuizzColor = $_GET['changquizz'];
        }
        if (isset($_GET['loadh'])) {
          $loadh = $_GET['loadh'];
        }
        
        require_once __DIR__.'/../../../main/inc/global.inc.php';
        require_once __DIR__.'/../inc/tranformSource.php';
        require_once __DIR__.'/../0_dal/dal.save.php';
        
        if (!api_is_anonymous()) {
            $user = api_get_user_info();
            if (isset($user['status'])) {
              if ($user['status']==SESSIONADMIN
                ||$user['status']==COURSEMANAGER
                ||$user['status']==PLATFORM_ADMIN) {

                  echo "<script>";
                  echo "userStatusCS = '".intVal($user['status'])."';";
                  if (isset($_SESSION['idsessionedition'])) {
                    echo "listPagesCS = '".(string)$_SESSION["idsessionedition"]."';";
                  }
                  echo "</script>";
                  
              } else {
                echo "<div style='color:red;' >Status !".$user['status']."</div>";
                echo "<script>setTimeout(function(){ location.href = '../index.php'; }, 3000);</script>";
                exit;
              }
          }
        }
        
        if ($idPage!=''&&$idPage!=0) {
          
          $Part = get_oel_tools_editor($idPage);
          
          $title = $Part['title'];
          $base_html = getSrcForEditor($Part['base_html']);
          $base_css = $Part['base_css'];
          $type_base = $Part['type_base'];
          $GpsComps = $Part['GpsComps'];
          $GpsStyle = $Part['GpsStyle'];
          $id_parent = $Part['id_parent'];
          $colors_data = $Part['colors'];
          $quizztheme_data = $Part['quizztheme'];
          $typeNode = $Part['type_node'];
          $filePageData = "";

          if ($changColor!='') {
            $colors_data = $changColor.".css";
            update_oel_tools_color($id_parent,$colors_data);
          }
          if ($changQuizzColor!='') {
            $quizztheme_data = $changQuizzColor.".css";
            update_oel_tools_quizztheme($id_parent,$quizztheme_data);
          }
          
          if ($loadh!='') {
            $localFolderH = get_local_folder($idPage).'-'.$idPage;
            $filDataHistory = 'history_cache/'.$localFolderH.'/'.$loadh.'.html';
            echo '<script>console.log("'.$filDataHistory.'");</script>';
            if(file_exists($filDataHistory)){
              echo '<script>console.log("'.$filDataHistory.' exist");</script>';
              $base_html = file_get_contents($filDataHistory);
              $base_css = file_get_contents('history_cache/'.$localFolderH.'/'.$loadh.'.css');
            }
          }

          if ($typeNode==4) {
            $filePageData = $Part['options'];
            $base_html = '<div class="panel"></div>';
            $base_css = '';
          }
          
          if($base_html==''){
              if(isset($_GET['pty'])){
                $pathFile = 'templates/pages/'.$_GET['pty'].'.html';
                if(file_exists($pathFile)) {
                  $base_html = file_get_contents($pathFile);
                }else{
                  $base_html = file_get_contents('templates/pages/error.html');
                }
              }else{
                $base_html = file_get_contents('templates/pages/p0.html');
              }
              $base_html = str_replace('###TITLE###',$title,$base_html);
              echo "<script>setTimeout(function(){saveSourceFrame(false,false,0);},500)</script>";
          }
          
          if(isset($_GET['resetall'])){
            $base_html = file_get_contents('templates/pages/p0.html');
            $base_html = str_replace('###TITLE###',$title,$base_html);
          }
          
          oel_add_ctr_rights($idPage);
          
          echo "<script>";
          echo "var idPageHtml = ".$idPage.";";
          echo "var idPageHtmlTop = ".$id_parent.";";
          echo "var colorsPath = '".$colors_data."';";
          echo "var quizzthemePath = '".$quizztheme_data."';";
          echo "var typeNodePg = ".$typeNode.";";
          echo "var filePageData = '".$filePageData."';";
          echo "</script>";
          
          echo '<script type="text/javascript" src="img_cache/getextras.php?id='.$id_parent.'" ></script>';

        }else{
          
          echo "<script>location.href = '../oel_tools_teachdoc_list.php';</script>";
          exit;
        
        }

      }else{
        echo "<script>location.href = '../oel_tools_teachdoc_list.php';</script>";
        exit;
      }
      
      include( __DIR__.'/inc/head.inc.php');
      
      require_once __DIR__.'/../vendor/elfinder/elfinder.php';

  ?>

  </head>
  <body style="background-color:#D8D8D8;" >
    
    <div class=ludiEditIco onCLick="actionEditButon();" ></div>
    <div class=ludiSpeedTools ></div>
    
    <div id="gjs" style="height:0px; overflow:hidden" >
      <?php
        echo(preventImg64($base_html));//
        if($base_css!=''){
          echo('<style>'.cleanCssForEdit($base_css).'</style>');
        }
        echo('<style>');
        echo('
          .cell{
            border:dashed 1px #A9CCE3;
            vertical-align: middle;
            padding:10px;
            width: 8%;
            min-width: 250px;
            display: table-cell;
            height: 0;
            height: auto!important;
            min-height: 75px;
          }
          .row {
            display: table;
            padding-top: 10px;
            padding-right: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
            width: 100%;
            height: 0;
            height: auto!important;
            min-height: 75px;
          }');
        echo('</style>');
      ?>
    </div>
    
    <img id="jscssedit" src="jscss/edit.png" />
    
    <link href="dist/css/grapes.min.css?v=<?php echo $version ?>" rel="stylesheet" />
    <link href="dist/grapesjs-preset-webpage.min.css?v=<?php echo $version ?>" rel="stylesheet" />
    <link href="jscss/oel-teachdoc.css?v=<?php echo $version ?>" rel="stylesheet" />
    <link href="templates/styles/classic-ux.css?v=<?php echo $version ?>" rel="stylesheet"/>
    
    <script src="../vendor/tinymce/js/tinymce/tinymce.min.js?v=<?php echo $version ?>" ></script>
    <script src="../vendor/tinymce/js/tinymce/jquery.tinymce.min.js?v=<?php echo $version ?>" ></script>
    <script src="jscss/oel-teachdoc-x.js?v=<?php echo $version ?>"></script>
    <script src="jscss/oel-teachdoc.js?v=<?php echo $version ?>"></script>
    <script>correctPositionsEditor();</script>
    
    <?php

      $sysWinston = api_get_path(SYS_PLUGIN_PATH).'chamilo_wiston_bn/resources/js/chamilo_wiston_bn.js';
      $pwpWinston = api_get_path(WEB_PLUGIN_PATH).'chamilo_wiston_bn/resources/js/chamilo_wiston_bn.js';

      if (file_exists($sysWinston)) {
        echo "<script>
          var _p = {
            web_plugin : '".api_get_path(WEB_PLUGIN_PATH)."',
            web_editor : '".api_get_path(WEB_PLUGIN_PATH)."adv_oel_tools_teachdoc/editor'
          };
        </script>";
        echo '<script src="'.$pwpWinston.'"></script>';
      } else {
        echo "<script>
          var _p = {
            web_plugin : '".api_get_path(WEB_PLUGIN_PATH)."',
            web_editor : '".api_get_path(WEB_PLUGIN_PATH)."adv_oel_tools_teachdoc/editor'
          };
        </script>";
      }
    ?>

    <?php
        if (strpos($base_html,"txtmathjax")!=false) {
    ?>
      <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
      <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <?php
      }
    ?>

  </body>
</html>
