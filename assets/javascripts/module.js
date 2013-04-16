/**
 * @fileoverview module.js
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/module', function(S, API, Base, Method, Node, XTemplate) {

  var $      = S.all,
      METHOD = new Method();

  /**
   * Module
   */
  var Module = function() {
    this.el     = $('#J_Module');
    this.events = {
      'click a': 'renderMethod'
    };
    this.init();
  };

  /**
   * 基础继承类
   */
  S.extend(Module, Base);

  /**
   * 程序初始化
   */
  Module.prototype.init = function() {
    this.render();
    Module.superclass.constructor.call(this);
    this.el.one('a').fire('click');
  };

  /**
   * 渲染界面
   */
  Module.prototype.render = function() {
    var self = this,
        tpl, modules = [];

    tpl = [
      '<ul>',
        '{{#modules}}',
          '<li>',
            '<a href="javascript:;" data-name="{{name}}" data-index="{{index}}">',
              '{{name}}',
            '</a>',
          '</li>',
        '{{/modules}}',
      '</ul>'
    ].join('');

    S.each(API, function(module, i) {
      modules.push({
        name : module.name,
        index: i
      });
    });

    var buffer = new XTemplate(tpl).render({modules: modules});

    self.el.html(buffer);
  };

  /**
   * 渲染 Method 模块
   */
  Module.prototype.renderMethod = function(e) {
    var self   = this,
        target = $(e.currentTarget),
        name   = target.attr('data-name'),
        index  = parseInt(target.attr('data-index'));

    target.addClass('current');

    self.prevTarget && self.prevTarget.html() !== name && self.prevTarget.removeClass('current');
    self.prevTarget = target;
    
    self._render('list');
    self._set('module', name);
    METHOD.render(index);
  };

  return Module;

}, {

  requires: ['demo/api', 'demo/base', 'demo/method', 'node', 'xtemplate']

});