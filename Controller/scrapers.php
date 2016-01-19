<?php

include 'Base.php';

class Controller_Scrape extends Controller_Base {

    function __construct(){
        parent::__construct();
    }

    public function route(){

        if($_POST['tide']) {
            // $tides = $this->scrape_tides();
            // echo json_encode($tides);
    $html = file_get_contents("http://ca.usharbors.com/monthly-tides/global/San%20Diego/2016-01?print=true");

    $tides_doc = new DOMDocument();

    libxml_use_internal_errors(TRUE); //disable libxml errors

    if(!empty($html)){ //if any html is actually returned
        // return "something returned";

        $tides_doc->loadHTML($html);
        libxml_clear_errors();
        $tides_xpath = new DOMXPath($tides_doc);
        $tide_row = $tides_xpath->query('//table[@class="tides-table"]/tbody/tr[@class="highlight-today"]/td');

        foreach ($tide_row as $row) {
        echo $row->nodeValue; //returns Year
        echo "<br>";
        }}
        }
        
    }

    private function scrape_tides(){

    $html = file_get_contents("http://ca.usharbors.com/monthly-tides/global/San%20Diego/2016-01?print=true");

    $tides_doc = new DOMDocument();

    libxml_use_internal_errors(TRUE); //disable libxml errors

    if(!empty($html)){ //if any html is actually returned
        // return "something returned";

        $tides_doc->loadHTML($html);
        libxml_clear_errors();
        $tides_xpath = new DOMXPath($tides_doc);
        $tide_row = $tides_xpath->query('//table[@class="tides-table"]/tbody/tr[@class="highlight-today"]/td');

        foreach ($tide_row as $row) {
        echo $row->nodeValue; //returns Year
        echo "<br>";
        } 
        // if ($tide_row->length > 0) {
        //     return $tide_row;
        //     // return 'longer than 0';
        // } else {
        //     return 'nope';
        // }

    // if (!is_null($tide_row)) {
    //   foreach ($tide_row as $row) {
    //     echo "<br/>[". $row->nodeName. "]";

    //     $nodes = $row->childNodes;
    //     foreach ($nodes as $node) {
    //       echo $node->nodeValue. "\n";
    //     }
    //   }
    // }


    }


    }




}

$Scrape = new Controller_Scrape();
$Scrape->route();