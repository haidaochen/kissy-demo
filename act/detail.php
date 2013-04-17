<?php

  include("../inc/interface.php");

  $id = $_POST["id"];
  $result = demoDetail($id);

  header('Content-type:text/json');
  echo json_encode($result);