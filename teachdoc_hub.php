<?php
/* For licensing terms, see /license.txt */

class teachdoc_hub extends Plugin
{

    protected function __construct()
    {
        parent::__construct(
            '1.0',
            'Damien Renou',
            array(
                'enable_plugin_oel_tools_teachdoc' => 'boolean'
            )
        );
    }
	
    /**
     * @return oel_tools_teachdoc|null
     */
    public static function create()
    {
        static $result = null;
        return $result ? $result : $result = new self();
    }
	
    public function install()
    {
        $sql = "CREATE TABLE IF NOT EXISTS plugin_oel_tools_teachdoc(
            id INT NOT NULL AUTO_INCREMENT,
            id_user INT,
            title VARCHAR(255) NOT NULL,
            id_parent INT,
            order_lst INT,
            type_node INT,
            type_base INT,
            colors VARCHAR(25) NOT NULL,
            id_url INT,
            lp_id INT,
            behavior TINYINT NOT NULL DEFAULT '0',
            local_folder VARCHAR(60) NOT NULL,
            date_create VARCHAR(12) NOT NULL,
            base_html TEXT NOT NULL,
            base_css TEXT NOT NULL,
            GpsComps TEXT NOT NULL,
            GpsStyle TEXT NOT NULL,
            recent_save TINYINT NOT NULL DEFAULT '0',
            options VARCHAR(512) NOT NULL,
            PRIMARY KEY (id));";
        Database::query($sql);
    }
	
    public function uninstall()
    {
        //$sql = "DROP TABLE IF EXISTS plugin_oel_tools_teachdoc";
        //Database::query($sql);
    }
}
