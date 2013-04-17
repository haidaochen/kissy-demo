<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Kissy Demo</title>
    <link rel="stylesheet" href="./assets/build/style-min.css">
  </head>
  <body>
    <div class="wrap">
      <div id="J_Tips" class="tips"></div>
      <header class="head">
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
            <fieldset class="column">
              <div id="J_HtmlWin" class="window"></div>
              <div id="J_JsWin" class="window"></div>
            </fieldset>
            <fieldset class="column">
              <div id="J_CssWin" class="window"></div>
              <div id="J_ResultWin" class="window">
                <iframe id="J_Result" width="100%" height="100%"></iframe>
              </div>
            </fieldset>
          </div>
        </article>
        <!--E code -->

      </div>
      <aside class="side">
        
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
    <script src="http://a.tbcdn.cn/s/kissy/1.3.0/seed-min.js"></script>
    <script src="./assets/build/ace/ace.js"></script>
    <script src="./assets/build/index-min.js"></script>
    </script>
  </body>
</html>