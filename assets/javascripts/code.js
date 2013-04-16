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
      'click #J_Debug' : 'debug'
    };
    this.iframe = $('#J_Result')[0].contentWindow.document;
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
    this.resetColumns();
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
    self.setEditorVal(demo || {});
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

    var el = $(e.currentTarget),
        cb = function(res) {
          if (res.status) {
            self._tips(true, res.message);
          } else {
            self._tips(false, res.message);
          }
        };

    self._ajax(el, './act/edit.php', self.makeDemoInfo('update'), cb);
  };

  /**
   * 提交代码
   */
  Code.prototype.commit = function(e) {
    var self = this;

    var el = $(e.currentTarget),
        cb = function(res) {
          if (res.status) {
            self._tips(true, res.message);
          } else {
            self._tips(false, res.message);
          }
        };

    self._ajax(el, './act/add.php', self.makeDemoInfo('commit'), cb);
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
   * 设置列宽
   */
  Code.prototype.resetColumns = function() {
    var self     = this,
        contEl   = $('#J_Cont'),
        columnEl = $('.column', contEl);

    columnEl.width((contEl.width() - 250) / 2);
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

    self.htmlEditor = aceEditor($('#J_HtmlWin'), 'html');
    self.cssEditor  = aceEditor($('#J_CssWin'), 'css');
    self.jsEditor   = aceEditor($('#J_JsWin'), 'javascript');
  };

  /**
   * 编辑器设值
   * @param {Object} demo
   */
  Code.prototype.setEditorVal = function(demo) {
    var self = this;

    self.htmlEditor.setValue(demo.html);
    self.htmlEditor.focus();
    self.htmlEditor.clearSelection();

    self.cssEditor.setValue(demo.css);
    self.cssEditor.focus();
    self.cssEditor.clearSelection();

    self.jsEditor.setValue(demo.js);
    self.jsEditor.focus();
    self.jsEditor.clearSelection();

    self.debug();
  };

  /**
   * 编辑器取值
   * @return {Object}
   */
  Code.prototype.getEditorVal = function() {
    var self = this;

    return {
        html: self.htmlEditor.getValue(),
        css : self.cssEditor.getValue(),
        js  : self.jsEditor.getValue()
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
              '{{css}}\r\n',
            '</style>\r\n',
          '</head>\r\n',
          '<body>\r\n',
            '{{{html}}}\r\n',
          '<script src="http://a.tbcdn.cn/s/kissy/1.3.0/seed-min.js" data-config="{combine:true}"></script>\r\n',
          '<script>\r\n',
            '{{js}}\r\n',
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

  return Code;

}, {

  requires: ['demo/base', 'demo/config', 'node', 'xtemplate']

});