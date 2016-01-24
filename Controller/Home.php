<?php

include 'Base.php';
include 'scrapetest.php';


class Controller_Home extends Controller_Base {

    function __construct() {
        parent::__construct();
}


    public function route() {

       // $data = $this->lifx_init();
       // $data = $this->lifx_toggle();
       $data = scrape_tides();

        return $data;
    }




}

