<?php
session_start();

require $_SERVER['DOCUMENT_ROOT'].'/Controller/Home.php';

$Home = new Controller_Home();
$tpl = $Home->templates->loadTemplate('Home.mustache');
$data = $Home->route();


echo $tpl->render($data);



