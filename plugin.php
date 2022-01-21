<?php
/* For license terms, see /license.txt */

require_once(__DIR__.'/teachdoc_hub.php');

$plugin_info = teachdoc_hub::create()->get_info();

// The plugin title.
$plugin_info['title'] = 'Chamilo Studio Open eLearning Tools';
$plugin_info['name'] = 'Chamilo Studio Open eLearning Tools';
$plugin_info['comment'] = "OeL tools (z p_f)";
$plugin_info['version'] = '1.1';
$plugin_info['author'] = 'Bâtisseurs Numériques';

$form = new FormValidator('form');

$defaults = array();

$url_id = api_get_current_access_url_id();

$defaults['active'] = api_get_plugin_setting('oel_tools_teachdoc','active-'.$url_id);

$stringTitle = $form->addElement('checkbox','active-'.$url_id,'Activation','');
if($defaults['active']==''){
	$defaults['active'] = false;
}
$stringTitle->setValue($defaults['active']);

//Sauvegarde
//$form->addElement('button', 'submit_button', get_lang('Save'));
$form->addButtonSave(get_lang('Save'));

// Get default value for form

$plugin_info['settings_form'] = $form;

//set the templates that are going to be used
$plugin_info['templates'] = array('template.tpl');
