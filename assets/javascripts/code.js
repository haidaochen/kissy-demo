/**
 * @fileoverview Code.js
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/code', function(S, Base, Config, Node, XTemplate) {

  var $      = S.all,
      CONFIG = new Config();

  /**
   * Code
   */
  var Code = function() {
    this.el       = $('#J_Code');
    this.commitEl = $('#J_Commit');
    this.updateEl = $('#J_Update'); 
    this.events   = {
      'click #J_Back'  : 'goBack',
      'click #J_Commit': 'commit',
      'click #J_Update': 'update',
      'click #J_Debug' : 'debug',
      'mouseenter .J_EditorWrap': 'toggleEditorWrap',
      'mouseleave .J_EditorWrap': 'toggleEditorWrap',
      'click .J_EditorResize'   : 'editorResize'
    };
    this.iframe = $('#J_PreviewIframe')[0].contentWindow.document;
    this.init();
  };

  /**
   * 基础继承类
   */
  S.extend(Code, Base);

  /**
   * 程序初始化
   */
  Code.prototype.init = function() {
    this.createEditor();
    Code.superclass.constructor.call(this);
  };

  /**
   * 渲染界面
   * @param {Object} demo
   */
  Code.prototype.render = function(demo) {
    var self = this;

    if (demo) {
      self.commitEl.hide();
      self.updateEl.show();
    } else {
      self.commitEl.show();
      self.updateEl.hide();
    }

    CONFIG.render(demo);
    self.setEditorVal(demo);
  };

  /**
   * 返回列表
   */
  Code.prototype.goBack = function() {
    var self = this;

    self._render('list');
  };

  /**
   * 更新代码
   */
  Code.prototype.update = function(e) {
    var self = this;

    self._ajax(e, './act/edit.php', self.makeDemoInfo('update'));
  };

  /**
   * 提交代码
   */
  Code.prototype.commit = function(e) {
    var self = this;

    self._ajax(e, './act/add.php', self.makeDemoInfo('commit'));
  };

  /**
   * 调试代码
   */
  Code.prototype.debug = function() {
    var self = this,
        code = self.getDebugCode(self.getEditorVal());

      self.iframe.open();
      self.iframe.write(code);
      self.iframe.close();
  };

  /**
   * 创建编辑器
   */
  Code.prototype.createEditor = function() {
    var self = this;

    /**
     * 创建 ace 编辑器
     * @param {Object} editor
     * @param {String} mode
     */
    var aceEditor = function(editor, mode) {
      var editor = ace.edit(editor[0]);
          editor.setTheme("ace/theme/dreamweaver");
          editor.getSession().setMode("ace/mode/" + mode);
      return editor;
    };

    self.Html = aceEditor($('#J_Html'), 'html');
    self.Css  = aceEditor($('#J_Css'), 'css');
    self.Js   = aceEditor($('#J_Js'), 'javascript');
  };

  /**
   * 编辑器设值
   * @param {Object} demo
   */
  Code.prototype.setEditorVal = function(demo) {
    var self = this;

    /**
     * 设置默认值
     */
    if (!demo) {
      var demo = {};
      demo.html = '<!-- 所填内容直接添入 BODY 标签 -->\r\n';
      demo.js   = '/* Kissy 1.3 已默认加载 */\r\n';
    }

    self.Html.setValue(demo.html);
    self.Html.focus();
    self.Html.clearSelection();

    self.Css.setValue(demo.css);
    self.Css.focus();
    self.Css.clearSelection();

    self.Js.setValue(demo.js);
    self.Js.focus();
    self.Js.clearSelection();

    self.debug();
  };

  /**
   * 编辑器取值
   * @return {Object}
   */
  Code.prototype.getEditorVal = function() {
    var self = this;

    return {
        html: self.Html.getValue(),
        css : self.Css.getValue(),
        js  : self.Js.getValue()
    };
  };

  /**
   * 获取调试代码
   * @param  {Object} data
   * @return {String}
   */
  Code.prototype.getDebugCode = function(data) {
    var tpl = [  
      '<!DOCTYPE html>\r\n',
        '<html>\r\n',
          '<head>\r\n',
            '<meta charset="utf-8" />\r\n',
            '<title>{{module}}</title>\r\n',
            '<style>\r\n',
              '{{{css}}}\r\n',
            '</style>\r\n',
          '</head>\r\n',
          '<body>\r\n',
            '{{{html}}}\r\n',
          '<script src="http://a.tbcdn.cn/s/kissy/1.3.0/seed-min.js" data-config="{combine:true}"></script>\r\n',
          '<script>\r\n',
            '{{{js}}}\r\n',
          '</script>\r\n',
      '</body>\r\n',
      '</html>'
    ].join('');

    return new XTemplate(tpl).render(data);
  };

  /**
   * 制作 DEMO 信息
   * @param  {String} type
   * @return {Object}
   */
  Code.prototype.makeDemoInfo = function(type) {
    var self   = this,
        editor = self.getEditorVal(),
        config = CONFIG.getDemoConfig();

    switch(type) {
      case 'update':
        return S.merge(editor, config, {id: self._get('id')});
        break;
      default:
        return S.merge(editor, config);
        break;
    }
  };

  /**
   * 标签显示隐藏
   */
  Code.prototype.toggleEditorWrap = function(e) {
    var self    = this,
        target  = $(e.currentTarget),
        labelEl = $('.J_EditorLabel', target);

    labelEl.toggle();
  };

  /**
   * 编辑器缩放
   */
  Code.prototype.editorResize = function(e) {
    var self   = this,
        target = $(e.currentTarget),
        editor = target.attr('data-editor'),
        screen = target.attr('data-screen');

    var editorEl       = $('#J_' + editor),
        editorWrapEl   = editorEl.parent(),
        editorColumnEl = editorWrapEl.parent();

    var fullIconClass  = 'icon-fullscreen',
        smallIconClass = 'icon-resize-small';

    if (screen === 'small') {

      target.attr('data-screen', 'full')
            .removeClass(fullIconClass)
            .addClass(smallIconClass);

      editorColumnEl.css('width', '100%')
                    .siblings().hide();

      editorWrapEl.css('height', '100%')
                  .siblings().hide();


    } else {

      target.attr('data-screen', 'small')
            .removeClass(smallIconClass)
            .addClass(fullIconClass);

      editorColumnEl.css('width', '50%')
                    .siblings().show();

      editorWrapEl.css('height', '50%')
                  .siblings().show();

    }

    self[editor] && self[editor].resize();
  };

  return Code;

}, {

  requires: ['demo/base', 'demo/config', 'node', 'xtemplate']

});