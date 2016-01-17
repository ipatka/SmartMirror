<?php

include 'Base.php';

class Controller_LIFX extends Controller_Base {

    function __construct(){
        parent::__construct();
    }

    public function route(){

        if($_POST['toggle']) {
            $this->toggle_lifx();
        }
    }

    private function toggle_lifx(){

    $link = "https://api.lifx.com/v1beta1/lights/all/toggle";
    $authToken = "c2f891f976ebfce1c93183e6589cd989ccd6c0b6bfe8be07d5b4720fc9d40afc";
    $ch = curl_init($link);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $headers = array('Authorization: Bearer ' . $authToken);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $data = "duration=1.0";
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    $response = curl_exec($ch);
    }


}

$LIFX = new Controller_LIFX();
$LIFX->route();