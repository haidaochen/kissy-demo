/**
 * @fileoverview module.js
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/module', function(S, Base, Method, Node, XTemplate) {

  var $ = S.all, METHOD;

  /**
   * Module
   */
  var Module = function(api) {
    this.el     = $('#J_Module');
    this.elHd   = $('#J_ModuleHd');
    this.elBd   = $('#J_ModuleBd');
    this.events = {
      'click #J_ModuleHd a': 'renderModule',
      'click #J_ModuleBd a': 'renderMethod'
    };
    this.api    = api;
    METHOD      = new Method(api);
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
    this.elHd.one('a').fire('click');
  };

  /**
   * 渲染界面
   */
  Module.prototype.render = function() {
    var self = this,
        tpl;

    tpl = [
      '<ul>',
        '{{#each api}}',
          '<li>',
            '<a href="javascript:;" title="{{desc}}" data-index="{{xindex}}">',
              '{{anme}}',
            '</a>',
          '</li>',
        '{{/each}}',
      '</ul>'
    ].join('');

    var buffer = new XTemplate(tpl).render({api: self.api});

    self.elHd.html(buffer);
  };

  /**
   * 渲染 Module
   */
  Module.prototype.renderModule = function(e) {
    var self   = this,
        target = $(e.currentTarget),
        index  = target.attr('data-index'),
        API    = self.api;

    self.elHd.all('a').removeClass('current');
    target.addClass('current');

    tpl = [
      '<ul>',
        '{{#each modules}}',
          '<li>',
            '<a href="javascript:;" data-name="{{name}}" data-index="{{xindex}}" data-module-index="' + index + '">',
              '{{name}}',
            '</a>',
          '</li>',
        '{{/each}}',
      '</ul>'
    ].join('');

    var buffer = new XTemplate(tpl).render({modules: API[index].subcats});

    self.elBd.html(buffer);
    self.elBd.one('a').fire('click');
  };

  /**
   * 渲染 Method
   */
  Module.prototype.renderMethod = function(e) {
    var self   = this,
        target = $(e.currentTarget),
        name   = target.attr('data-name'),
        index  = target.attr('data-index');
        mindex = target.attr('data-module-index');

    self.elBd.all('a').removeClass('current');
    target.addClass('current');
    
    self._render('list');
    self._set('module', name);

    METHOD.render(mindex, index);
  };

  return Module;

}, {

  requires: ['demo/base', 'demo/method', 'node', 'xtemplate']

});