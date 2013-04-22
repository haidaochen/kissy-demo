/**
 * @fileoverview method.js
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/method', function(S, Base, List, Node, XTemplate) {

  var $    = S.all,
      LIST = new List();

  /**
   * Method
   */
  var Method = function(api) {
    this.el     = $('#J_Method');
    this.elHd   = $('#J_MethodHd');
    this.elBd   = $('#J_MethodBd');
    this.events = {
      'click #J_MethodBd a' : 'renderList',
      'click #J_MethodBd dt': 'renderEntries'
    };
    this.api = api;
    this.init();
  };

  /**
   * 基础继承类
   */
  S.extend(Method, Base);

  /**
   * 程序初始化
   */
  Method.prototype.init = function() {
    Method.superclass.constructor.call(this);
  };

  /**
   * 渲染界面
   * @param {String} mindex
   * @param {String} index
   */
  Method.prototype.render = function(mindex, index) {
    var self = this,
        tpl;

    tpl = [
      '{{#module}}',
        '<ul>',
          '{{#entries}}',
            '<li>',
              '<a href="javascript:;" data-name="{{name}}">',
                '{{name}}',
              '</a>',
            '</li>',
          '{{/entries}}',
        '</ul>',
        '<dl>',
          '{{#subcats}}',
            '<dt>',
              '<i class="icon-angle-down"></i>',
              '{{name}}',
            '</dt>',
            '<dd>',
              '<ul>',
                '{{#entries}}',
                  '<li>',
                    '<a href="javascript:;" data-name="{{name}}">',
                      '{{name}}',
                    '</a>',
                  '</li>',
                '{{/entries}}',
              '</ul>',
            '</dd>',
          '{{/subcats}}',
        '</dl>',
      '{{/module}}'
    ].join('');

    var API    = self.api,
        module = API[mindex]['subcats'][index],
        buffer = new XTemplate(tpl).render({module: module});

    self.elHd.html(module.name);
    self.elBd.html(buffer);
    self.elBd.one('a') && self.elBd.one('a').fire('click');
    self.elBd.one('dt') && self.elBd.one('dt').fire('click');
  };

  /**
   * 渲染 List 模块
   */
  Method.prototype.renderList = function(e) {
    var self   = this,
        target = $(e.currentTarget),
        name   = target.attr('data-name');

    target.addClass('current');

    self.prevTarget && self.prevTarget.html() !== name && self.prevTarget.removeClass('current');
    self.prevTarget = target;

    self._set('method', name);
    LIST.render();
  };

  /**
   * 渲染条目
   */
  Method.prototype.renderEntries = function(e) {
    var self   = this,
        target = $(e.currentTarget),
        nextEl = target.next(),
        iconEl = target.one('i')[0];

    if (iconEl.className == 'icon-angle-down') {
      iconEl.className = 'icon-angle-up';
      nextEl.show();
    } else {
      iconEl.className = 'icon-angle-down';
      nextEl.hide();
    }
  };

  return Method;

}, {

  requires: ['demo/base', 'demo/list', 'node', 'xtemplate']

});