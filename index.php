<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Kissy Demo</title>
    <link rel="stylesheet" href="./assets/build/style-min.css">
  </head>
  <body>
    <div class="wrap">
      <header class="head">
        <div id="J_Tips" class="tips"></div>
        <nav id="J_Module" class="module">
          <div id="J_ModuleHd" class="module-hd"></div>
          <div id="J_ModuleBd" class="module-bd"></div>
        </nav>
      </header>
      <div id="J_Cont" class="cont">

        <!--S list -->
        <article id="J_List" class="main list">
          <header id="J_ListHd" class="main-hd">
            <a href="javascript:;" id="J_Add" class="add">+ 添加</a>
            <h1></h1>
          </header>
          <div id="J_ListBd" class="main-bd">
          </div>
        </article>
        <!--E list -->

        <!--S code -->
        <article id="J_Code" class="main code">
          <header id="J_ListHd" class="main-hd">
            <a href="javascript:;" id="J_Back" class="back">← 返回</a>
            <a href="javascript:;" id="J_Commit" class="btn"><i class="icon-pencil"></i>提交</a>
            <a href="javascript:;" id="J_Update" class="btn"><i class="icon-refresh"></i>更新</a>
            <a href="javascript:;" id="J_Debug" class="btn"><i class="icon-play-circle"></i>预览</a>
          </header>
          <div class="main-bd">
            <fieldset class="column left">
              <div class="editor-wrap top">
                <span class="editor-label">HTML<i class="icon-fullscreen"></i></span>
                <div id="J_Html" class="editor"></div>
              </div>
              <div class="editor-wrap bottom">
                <span class="editor-label">JavaScript<i class="icon-fullscreen"></i></span>
                <div id="J_Js" class="editor"></div>
              </div>
            </fieldset>
            <fieldset class="column right">
              <div class="editor-wrap top">
                <span class="editor-label">CSS<i class="icon-fullscreen"></i></span>
                <div id="J_Css" class="editor"></div>
              </div>
              <div class="editor-wrap bottom">
                <span class="editor-label">预览<i class="icon-fullscreen"></i></span>
                <div class="editor">
                  <iframe id="J_Preview" width="100%" height="100%"></iframe>
                </div>
              </div>
            </fieldset>
          </div>
        </article>
        <!--E code -->

      </div>
      <aside id="J_Side" class="side">
        
        <!--S method -->
        <nav id="J_Method" class="method">
          <h2 id="J_MethodHd"></h2>
          <div id="J_MethodBd"></div>
        </nav>
        <!--E method -->
        
        <!--S config -->
        <div id="J_Config" class="config"></div>
        <!--E config -->

      </aside>
    </div>
    
    <?php 
      $ENV = "";
      if (strpos($_SERVER['REQUEST_URI'], 'dev') !== FALSE) {
        $ENV = "dev";
      }
    ?>

    <script src="http://a.tbcdn.cn/s/kissy/1.3.0/seed-min.js" <?php if ($ENV != "dev") { ?>data-config="{combine:true}"<?php } ?>></script>
    <script src="./assets/build/ace/ace.js"></script>
    <script src="./assets/build/index-min.js"></script>
  </body>
</html>