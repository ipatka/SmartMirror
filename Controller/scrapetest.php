<?php
	echo 'start';

	getdatabyclass();
    // $html = file_get_contents("http://ca.usharbors.com/monthly-tides/global/San%20Diego/2016-01?print=true");

    // $tides_doc = new DOMDocument();

    // libxml_use_internal_errors(TRUE); //disable libxml errors

  //   if(!empty($html)){ //if any html is actually returned
  //       // return "something returned";
  //   	$tides_doc->loadHTML($html);
  //   	echo $html;
  //   	libxml_clear_errors();
  //       $tides_xpath = new DOMXPath($tides_doc);
		// $tide_row = $tides_doc->getElementsByTagName('tr[class="highlight-today"]');
  //   	// echo $tides_xpath;
  //   	// $result = $tides_xpath->evaluate('/html/body/div[@id="wrapper"]/div[@class="container"]/div[@id="main"]/div[@class="main-inner"]/div[@id="content"]/div[@id="tide-charts-page"]/div[2]');
  //   	// $result = $tides_doc->getElementsByTagName('tbody')->item(0);
  //   	foreach($tide_row as $node) {
		//   // echo "{$node->nodeName} - {$node->nodeValue}";
		//   // or you can just print out the the XML:
		//   // $dom->saveXML($node);
		//   echo $node;
		// }
        
        
  //       // $tide_row = $tides_xpath->query('//table[@class="tides-table"]/tbody/tr[@class="highlight-today"]/td');

  //       // foreach ($tide_row as $row) {
  //       // echo $row->nodeValue; //returns Year
  //       // echo "<br>";
  //       // }
  //   }

	function tdrows($elements)
	{
	    $str = "";
	    foreach ($elements as $element) {
	        $str .= $element->nodeValue;
	    }

	    return $str;
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

    //theirs
    // $contents = "<table><tr><td>Row 1 Column 1</td><td>Row 1 Column 2</td></tr><tr><td>Row 2 Column 1</td><td>Row 2 Column 2</td></tr></table>";
    // $DOM = new DOMDocument;
    // $DOM->loadHTML($contents);

    // $items = $DOM->getElementsByTagName('tr');

    // foreach ($items as $node) {
    //     echo tdrows($node->childNodes) . "<br />";
    // }
}

function getdatabyclass() {
	$html = file_get_contents("http://ca.usharbors.com/monthly-tides/global/San%20Diego/2016-01");
    $dom = new DOMDocument();
    libxml_use_internal_errors(TRUE); //disable libxml errors

    if(!empty($html)){
    	$dom->loadHTML($html);

		$finder = new DomXPath($dom);
		$classname="tide-row";
		$nodes = $finder->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $classname ')]");

    	foreach ($nodes as $node) {
        echo tdrows($node->childNodes);
    }
    }	
}

?>





