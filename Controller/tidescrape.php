<?php
	// echo 'start';

	scrape_tides();



	function scrape_tides() {
		$link = "https://tidesandcurrents.noaa.gov/noaatidepredictions/NOAATidesFacade.jsp?Stationid=9410170";
		$classname = "hilow";

		$tidesarray = getdatabyclass($link,$classname);
        // print_r($tidesarray[0][4]);
        $parsed_tides = parse_tides($tidesarray);
        return $parsed_tides;




	}

function tdrows_to_array($elements)
    {


        $array = array();

        $array = preg_split('/\s+/', $elements);
        // print_r($array);

        return $array;
    }

	function getdatabyclass($link,$classname) {
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
    		array_push($tidesarray,tdrows_to_array($row));
			}

            return $tidesarray;
        }   
    }

    function parse_tides($raw_array){



    	$returnarray = array();

    	$i = 0;

    	foreach ($raw_array as $row) {
			$months[$i] = substr($row[0], 0, 2);
			$days[$i] = substr($row[0], 3, 2);
			$hours[$i] = substr($row[2], 0, 2);
			if ($row[3] == "PM") {
				if ($hours[$i] < 12 ){
					$hours[$i] += 12;
				}
			} else if ($row[3] == "AM") {
				if ($hours[$i] == 12) {
					$hours[$i] = 0;
				}
			}
			$minutes[$i] = substr($row[2], 3, 2);
			// use ampm to mod hours
			$heights[$i] = $row[4];
			$hilow[$i] = $row[5];

			$i++;

    	}

    	array_push($returnarray, $months);
    	array_push($returnarray, $days);
    	array_push($returnarray, $hours);
    	array_push($returnarray, $minutes);
    	array_push($returnarray, $heights);
    	array_push($returnarray, $hilow);

    	return $returnarray;

    }



?>





