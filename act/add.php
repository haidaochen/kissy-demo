<?php

  include("../inc/interface.php");

  $module = $_POST["module"];
  $intro  = $_POST["intro"];
  $html   = $_POST["html"];
  $css    = $_POST["css"];
  $js     = $_POST["js"];
  $author = $_POST["author"];

  $result = addDemo($module, $intro, "1.3.0", $html, $js, $css, $author);

  header('Content-type:text/json');
  echo json_encode($result);