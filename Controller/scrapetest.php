<?php
	// echo 'start';

	scrape_tides();



	function tdrows_to_array($elements)
	{

		date_default_timezone_set('America/Los_Angeles');
		$day = date('d');

		$array = array();

		if ($elements->item(0)->nodeValue == $day) {
			foreach($elements as $element) {
				array_push($array, $element->nodeValue);
			}
		} else if ($elements->item(0)->nodeValue == ($day + 1)) { // should be +1
			foreach($elements as $element) {
				array_push($array, $element->nodeValue);
			}
		}

	    return $array;
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
				"today_high_1" => trim($tidesarray[6]),
				"today_high_2" => trim($tidesarray[10]),
				"today_low_1" => trim($tidesarray[16]),
				"today_low_2" => trim($tidesarray[20]),
				"today_sunrise" => trim($tidesarray[26]),
				"today_sunset" => trim($tidesarray[28]),

				"tomorrow_high_1" => trim($tidesarray[38]),
				"tomorrow_high_2" => trim($tidesarray[42]),
				"tomorrow_low_1" => trim($tidesarray[48]),
				"tomorrow_low_2" => trim($tidesarray[52]),
				"tomorrow_sunrise" => trim($tidesarray[58]),
				"tomorrow_sunset" => trim($tidesarray[60])

		];

		$tides_ampm_lookup_array = [
				"today_high_1" => 'am',
				"today_high_2" => 'pm',
				"today_low_1" => 'am',
				"today_low_2" => 'pm',
				"today_sunrise" => 'am',
				"today_sunset" => 'pm',

				"tomorrow_high_1" => 'am',
				"tomorrow_high_2" => 'pm',
				"tomorrow_low_1" => 'am',
				"tomorrow_low_2" => 'pm',
				"tomorrow_sunrise" => 'am',
				"tomorrow_sunset" => 'pm'
		];

		// print_r($tides_lookup_array);
		// print_r($tides_ampm_lookup_array);

		foreach ($tides_lookup_array as $key => $value) {
			
			if (strlen($value) == 0) {
				switch ($key) {
					case 'today_high_1':
						if(strlen($tides_lookup_array['today_high_2']) > 5) {
							$tides_ampm_lookup_array['today_high_1'] = 'pm';
						} else {
							$tides_ampm_lookup_array['today_high_1'] = 'none';
						}
						break;

					case 'today_high_2':
						if(strlen($tides_lookup_array['today_high_1']) > 5) {
							$tides_ampm_lookup_array['today_high_2'] = 'am';
						} else {
							$tides_ampm_lookup_array['today_high_2'] = 'none';
						}						
						break;

					case 'today_low_1':
						if(strlen($tides_lookup_array['today_low_2']) > 5) {
							$tides_ampm_lookup_array['today_low_1'] = 'pm';
						} else {
							$tides_ampm_lookup_array['today_low_1'] = 'none';
						}						
						break;

					case 'today_low_2':
						if(strlen($tides_lookup_array['today_low_1']) > 5) {
							$tides_ampm_lookup_array['today_low_2'] = 'am';
						} else {
							$tides_ampm_lookup_array['today_low_2'] = 'none';
						}						
						break;

					case 'tomorrow_high_1':
						if(strlen($tides_lookup_array['tomorrow_high_2']) > 5) {
							$tides_ampm_lookup_array['tomorrow_high_1'] = 'pm';
						} else {
							$tides_ampm_lookup_array['tomorrow_high_1'] = 'none';
						}
						break;

					case 'tomorrow_high_2':
						if(strlen($tides_lookup_array['tomorrow_high_1']) > 5) {
							$tides_ampm_lookup_array['tomorrow_high_2'] = 'am';
						} else {
							$tides_ampm_lookup_array['tomorrow_high_2'] = 'none';
						}						
						break;

					case 'tomorrow_low_1':
						if(strlen($tides_lookup_array['tomorrow_low_2']) > 5) {
							$tides_ampm_lookup_array['tomorrow_low_1'] = 'pm';
						} else {
							$tides_ampm_lookup_array['tomorrow_low_1'] = 'none';
						}						
						break;

					case 'tomorrow_low_2':
						if(strlen($tides_lookup_array['tomorrow_low_1']) > 5) {
							$tides_ampm_lookup_array['tomorrow_low_2'] = 'am';
						} else {
							$tides_ampm_lookup_array['tomorrow_low_2'] = 'none';
						}						
						break;
					
					default:
						// nothing changes
						break;
				}				
			}

			if(strlen($value) == 10) {
				
				switch ($key) {
					case 'today_high_1':
						$tides_lookup_array["today_high_1"] = substr($value, 0, 5);
						$tides_lookup_array["today_high_2"] = substr($value, 5, 5);
						break;

					case 'today_high_2':
						$tides_lookup_array["today_high_1"] = substr($value, 0, 5);
						$tides_lookup_array["today_high_2"] = substr($value, 5, 5);
						break;

					case 'today_low_1':
						$tides_lookup_array["today_low_1"] = substr($value, 0, 5);
						$tides_lookup_array["today_low_2"] = substr($value, 5, 5);
						break;

					case 'today_low_2':
						$tides_lookup_array["today_low_1"] = substr($value, 0, 5);
						$tides_lookup_array["today_low_2"] = substr($value, 5, 5);
						break;

					case 'tomorrow_high_1':
						$tides_lookup_array["tomorrow_high_1"] = substr($value, 0, 5);
						$tides_lookup_array["tomorrow_high_2"] = substr($value, 5, 5);
						break;

					case 'tomorrow_high_2':
						$tides_lookup_array["tomorrow_high_1"] = substr($value, 0, 5);
						$tides_lookup_array["tomorrow_high_2"] = substr($value, 5, 5);
						break;

					case 'tomorrow_low_1':
						$tides_lookup_array["tomorrow_low_1"] = substr($value, 0, 5);
						$tides_lookup_array["tomorrow_low_2"] = substr($value, 5, 5);
						break;

					case 'tomorrow_low_2':
						$tides_lookup_array["tomorrow_low_1"] = substr($value, 0, 5);
						$tides_lookup_array["tomorrow_low_2"] = substr($value, 5, 5);
						break;
					
					default:
						# code...
						break;
				}
			
			}
			
			
		}

		// echo $tidesarray[0];

		// print_r($tides_lookup_array);

		// print_r($tides_ampm_lookup_array);

		foreach ($tides_lookup_array as $key => $value) {
			$tides_lookup_array[$key] = $tides_lookup_array[$key].$tides_ampm_lookup_array[$key];
		}

		// print_r($tides_lookup_array)

		return $tides_lookup_array;


	}
}

?>





