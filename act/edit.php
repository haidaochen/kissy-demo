<?php

  include("../inc/interface.php");

  $id     = $_POST["id"];
  $module = $_POST["module"];
  $intro  = $_POST["intro"];
  $html   = $_POST["html"];
  $css    = $_POST["css"];
  $js     = $_POST["js"];
  $author = $_POST["author"];

  $result = editDemo($id, $module, $intro, "1.3.0", $html, $js, $css, $author);

  header('Content-type:text/json');
  echo json_encode($result);