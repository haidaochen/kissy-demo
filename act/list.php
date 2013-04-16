<?php

  include("../inc/interface.php");

  $module = $_POST["module"];
  $result = demoList($module);

  header('Content-type:text/json');
  echo json_encode($result);

?>