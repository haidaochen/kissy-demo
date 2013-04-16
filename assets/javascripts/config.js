/**
 * @fileoverview config.js
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/config', function(S, Base, Node, XTemplate) {

  var $ = S.all;
  /**
   * Config
   */
  var Config = function() {
    this.el = $('#J_Config');
    this.init();
  };

  /**
   * 基础继承类
   */
  S.extend(Config, Base);

  /**
   * 程序初始化
   */
  Config.prototype.init = function() {
    Config.superclass.constructor.call(this);
  };

  /**
   * 渲染界面
   * @param {Object} demo
   */
  Config.prototype.render = function(demo) {
    var self = this,
        tpl;

    if (!demo) {
      var demo = {
        module: self._makeQueryId()
      };
    }

    tpl = [
      '{{#demo}}',
        '<h2>描述</h2>',
        '<ul>',
          '<li>',
            '<label for="J_Author">作者：</label>',
            '<p>',
              '<input id="J_Author" class="author" value="{{author}}" placeholder="填写您的花名">',
            '</p>',
          '</li>',
          '<li>',
            '<label for="J_Intro">简介：</label>',
            '<p>',
              '<textarea id="J_Intro" class="intro" placeholder="介绍下DEMO">{{intro}}</textarea>',
            '</p>',
          '</li>',
          '<li>',
            '<p>模块：</p>',
            '<p id="J_Module">{{module}}</p>',
          '</li>',
          '<li>',
            '<p>框架：</p>',
            '<p>',
              '<input type="checkbox" checked="true" disabled="true"> Kissy 1.3',
            '</p>',
          '</li>',
        '</ul>',
      '{{/demo}}'
    ].join('');

    var buffer = new XTemplate(tpl).render({demo: demo});

    self.el.html(buffer);
  };

  /**
   * 获取 DEMO 配置
   * @return {Object}
   */
  Config.prototype.getDemoConfig = function() {
    var self     = this,
        introEl  = $('#J_Intro'),
        authorEl = $('#J_Author');

    return {
      module: self._makeQueryId(),
      intro : introEl.val(),
      author: authorEl.val()
    };
  };

  return Config;

}, {

  requires: ['demo/base', 'node', 'xtemplate']

});