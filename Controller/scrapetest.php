<?php
	echo 'start';
    $html = file_get_contents("http://ca.usharbors.com/monthly-tides/global/San%20Diego/2016-01?print=true");

    $tides_doc = new DOMDocument();

    libxml_use_internal_errors(TRUE); //disable libxml errors

    if(!empty($html)){ //if any html is actually returned
        // return "something returned";
    	$tides_doc->loadHTMLFile($html);
    	echo $html;
    	libxml_clear_errors();
        $tides_xpath = new DOMXPath($tides_doc);
		$tide_row = $tides_doc->getElementsByTagName('tr[class="highlight-today"]');
    	// echo $tides_xpath;
    	// $result = $tides_xpath->evaluate('/html/body/div[@id="wrapper"]/div[@class="container"]/div[@id="main"]/div[@class="main-inner"]/div[@id="content"]/div[@id="tide-charts-page"]/div[2]');
    	// $result = $tides_doc->getElementsByTagName('tbody')->item(0);
    	foreach($tide_row as $node) {
		  // echo "{$node->nodeName} - {$node->nodeValue}";
		  // or you can just print out the the XML:
		  // $dom->saveXML($node);
		  echo $node;
		}
        
        
        // $tide_row = $tides_xpath->query('//table[@class="tides-table"]/tbody/tr[@class="highlight-today"]/td');

        // foreach ($tide_row as $row) {
        // echo $row->nodeValue; //returns Year
        // echo "<br>";
        // }
    }

?>