<?php

include 'Base.php';

class Controller_Scrape extends Controller_Base {

    function __construct(){
        parent::__construct();
    }

    public function route(){

        if($_POST['tide']) {

            $tides = $this->scrape_tides();
            echo json_encode($tides);
            
            // echo json_encode('test');


        }
        
        
    }


 private function tdrows_to_array($elements)
    {


        $array = array();

        $array = preg_split('/\s+/', $elements);
        // print_r($array);

        return $array;
    }

    private function getdatabyclass($link,$classname) {
        $html = file_get_contents($link);
        // echo $html;
        $dom = new DOMDocument();
        libxml_use_internal_errors(TRUE); //disable libxml errors

        if(!empty($html)){
            $dom->loadHTML($html);

            $finder = new DomXPath($dom);
            $nodes = $finder->query('//table[contains(@class,"hilow")]/tr');
            $tidesarray = array();



            foreach ($nodes as $node) {
            $row = $node->nodeValue;
            array_push($tidesarray,$this->tdrows_to_array($row));
            }

            return $tidesarray;
        }   
    }

    private function parse_tides($raw_array){



        $returnarray = array();

        $i = 0;

        foreach ($raw_array as $row) {
            $parsed_row["month"] = substr($row[0], 0, 2);
            $parsed_row["day"] = substr($row[0], 3, 2);
            $parsed_row["hours"] = substr($row[2], 0, 2);
            if ($row[3] == "PM") {
                if ($parsed_row["hours"] < 12 ){
                    $parsed_row["hours"] += 12;
                }
            } else if ($row[3] == "AM") {
                if ($parsed_row["hours"] == 12) {
                    $parsed_row["hours"] = 0;
                }
            }
            $parsed_row["minutes"] = substr($row[2], 3, 2);
            $parsed_row["height"] = $row[4];
            $parsed_row["hilow"] = $row[5];

            array_push($returnarray,$parsed_row);

            // $months[$i] = substr($row[0], 0, 2);
            // $days[$i] = substr($row[0], 3, 2);
            // $hours[$i] = substr($row[2], 0, 2);
            // if ($row[3] == "PM") {
            //     if ($hours[$i] < 12 ){
            //         $hours[$i] += 12;
            //     }
            // } else if ($row[3] == "AM") {
            //     if ($hours[$i] == 12) {
            //         $hours[$i] = 0;
            //     }
            // }
            // $minutes[$i] = substr($row[2], 3, 2);
            // // use ampm to mod hours
            // $heights[$i] = $row[4];
            // $hilow[$i] = $row[5];

            // $i++;

        }

        // array_push($returnarray, $months);
        // array_push($returnarray, $days);
        // array_push($returnarray, $hours);
        // array_push($returnarray, $minutes);
        // array_push($returnarray, $heights);
        // array_push($returnarray, $hilow);

        return $returnarray;

    }

    private function scrape_tides() {
        $link = "https://tidesandcurrents.noaa.gov/noaatidepredictions/NOAATidesFacade.jsp?Stationid=9410170";
        $classname = "hilow";

        $tidesarray = $this->getdatabyclass($link,$classname);
        // print_r($tidesarray[0][4]);
        $parsed_tides = $this->parse_tides($tidesarray);
        return $parsed_tides;


    }




}

$Scrape = new Controller_Scrape();
$Scrape->route();