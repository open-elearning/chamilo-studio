<?php

function api_get_folder_imgcache() {
    $f = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/img_cache/';
    return $f;
}

function api_get_folder_importmp() {

    $f = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/import-project/files/tmp/';
    return $f;
}

function api_get_folder_imporfiles() {

    $f = api_get_path(SYS_PLUGIN_PATH).'adv_oel_tools_teachdoc/editor/import-project/files/';
    return $f;
}

function deleteDir($dirPath) {
    if (! is_dir($dirPath)) {
        throw new InvalidArgumentException("$dirPath must be a directory");
    }
    if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
        $dirPath .= '/';
    }
    $files = glob($dirPath . '*', GLOB_MARK);
    foreach ($files as $file) {
        if (is_dir($file)) {
        deleteDir($file);
        } else {
        unlink($file);
        echo ' - unlink '.$file.'<br>';
        }
    }
    rmdir($dirPath);
}


?>
