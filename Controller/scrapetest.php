<?php
	// echo 'start';

	scrape_tides();


	function tdrows($elements)
	{
	    $str = "";
	    foreach ($elements as $element) {
	        $str .= $element->nodeValue;
	    }

	    return $str;
	}

	function tdrows_to_array($elements)
	{

		date_default_timezone_set('America/Los_Angeles');
		$day = date('d');

		$array = array();

		if ($elements->item(0)->nodeValue == $day) {
			foreach($elements as $element) {
				array_push($array, $element->nodeValue);
			}
		} else if ($elements->item(0)->nodeValue == ($day + 1)) {
			foreach($elements as $element) {
				array_push($array, $element->nodeValue);
			}
		}

	    return $array;
	}

function getdata()
{

	$html = file_get_contents("http://ca.usharbors.com/monthly-tides/global/San%20Diego/2016-01");
    $tides_doc = new DOMDocument();
    libxml_use_internal_errors(TRUE); //disable libxml errors

    if(!empty($html)){
    	$tides_doc->loadHTML($html);
    	$items = $tides_doc->getElementsByTagName('tr');
    	foreach ($items as $node) {
        echo tdrows($node->childNodes);
    }
    }

}

function getdatabyclass($link,$classname) {
	$html = file_get_contents($link);
    $dom = new DOMDocument();
    libxml_use_internal_errors(TRUE); //disable libxml errors

    if(!empty($html)){
    	$dom->loadHTML($html);

		$finder = new DomXPath($dom);
		$classname="tide-row";
		$nodes = $finder->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $classname ')]");

		$tidesarray = array();

		$temparray = array();

    	foreach ($nodes as $node) {
        	$temparray = tdrows_to_array($node->childNodes);
        	
        	foreach ($temparray as $item) {
        		array_push($tidesarray, $item);
        	}

    	}

    	return $tidesarray;
    }	
}

function gettidelinks() {// returns array (number of links, link1, link2 if necessary)

	$link_base = "http://ca.usharbors.com/monthly-tides/global/San%20Diego/";


	date_default_timezone_set('America/Los_Angeles');
	$link_date = date('Y-m');
	$link_date_next = date('Y-m',time()+86400); //Tuesday 19th of January 2016 09:12:05 PM
	if ($link_date == $link_date_next)
	{
		$number_of_links = 1;
		$link1 = $link_base.$link_date;
		$links = array($number_of_links,$link1);
	} else {
		$number_of_links = 2;
		$link1 = $link_base.$link_date;
		$link2 = $link_base.$link_date_next;
		$links = array($number_of_links,$link1,$link2);
	}
	// foreach($links as $item) {
	// 	echo $item;
	// }
	return $links;
}

function scrape_tides() {
	$links = gettidelinks();
	$number_of_links = $links[0];
	// echo $number_of_links;
	if ($number_of_links > 1) {
		echo '2 links';
	} else {
		// echo '1 link';
		// echo $links[1];
		// getdatabyclass("http://ca.usharbors.com/monthly-tides/global/San%20Diego/2016-01","tide-row");
		$tidesarray = getdatabyclass($links[1],"tide-row");

		// foreach ($tidesarray as $item) {
		// 	echo $item;
		// }
		// var_dump($tidesarray);
		// print_r($tidesarray);


		$tides_lookup_array = [
				"today_am_high" => trim($tidesarray[6]),
				"today_pm_high" => trim($tidesarray[10]),
				"today_am_low" => trim($tidesarray[16]),
				"today_pm_low" => trim($tidesarray[20]),
				"today_sunrise" => trim($tidesarray[26]),
				"today_sunset" => trim($tidesarray[28]),

				"tomorrow_am_high" => trim($tidesarray[38]),
				"tomorrow_pm_high" => trim($tidesarray[42]),
				"tomorrow_am_low" => trim($tidesarray[48]),
				"tomorrow_pm_low" => trim($tidesarray[52]),
				"tomorrow_sunrise" => trim($tidesarray[58]),
				"tomorrow_sunset" => trim($tidesarray[60])

		];
		
		foreach ($tides_lookup_array as $key => $value) {
			if(strlen($value) == 10)
				{echo $tides_lookup_array[$i];
				}
			
		}

		// echo $tidesarray[0];

		print_r($tides_lookup_array);

	}
}

?>





