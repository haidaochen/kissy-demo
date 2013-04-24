/**
 * @fileoverview Sidebar.js
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/sidebar', function(S, Base, List, Node, XTemplate) {

  var $    = S.all,
      LIST = new List();

  /**
   * Sidebar
   */
  var Sidebar = function(api) {
    this.el     = $('#J_Sidebar');
    this.elHd   = $('#J_SidebarHd');
    this.elBd   = $('#J_SidebarBd');
    this.events = {
      'click #J_SidebarHd a': 'getApi',
      'click .J_Module'     : 'toggle',
      'click .J_Subcat'     : 'toggle',
      'click .J_Entrie'     : 'toggle'
    };
    this.init();
  };

  /**
   * 基础继承类
   */
  S.extend(Sidebar, Base);

  /**
   * 程序初始化
   */
  Sidebar.prototype.init = function() {
    Sidebar.superclass.constructor.call(this);
    this.elHd.one('a').fire('click');
  };

  /**
   * 渲染界面
   * @param {Object} api
   */
  Sidebar.prototype.render = function(api) {
    var self = this,
        tpl, buffer;

    tpl = [
      '{{#api}}',
        '<ul class="modules">',
          '{{#subcats}}',
            '<li class="module">',
                '<p class="J_Module module-name" data-name="{{name}}" data-type="module"><i class="icon-caret-right"></i>{{name}}</span>',
                '{{@if entries}}',
                  '<ul class="entries">',
                    '{{#entries}}',
                      '<li class="J_Entrie entrie" data-name="{{name}}" data-type="entrie">',
                        '<p class="entrie-name">{{name}}</p>',
                        '<p class="entrie-desc">{{desc}}</p>',
                      '</li>',
                    '{{/entries}}',
                  '</ul>',
                '{{else}}',
                  '<ul class="subcats">',
                    '{{#subcats}}',
                      '<li class="subcat">',
                        '<p class="J_Subcat subcat-name" data-name="{{name}}" data-type="subcat">{{name}}</p>',
                        '<ul class="entries">',
                          '{{#entries}}',
                            '<li class="J_Entrie entrie" data-name="{{name}}" data-type="entrie">',
                              '<p class="entrie-name">{{name}}</p>',
                              '<p class="entrie-desc">{{desc}}</p>',
                            '</li>',
                          '{{/entries}}',
                        '</ul>',
                      '</li>',
                    '{{/subcats}}',
                  '</ul>',
                '{{/if}}',
            '</li>',
          '{{/subcats}}',
        '</ul>',
      '{{/api}}'
    ];

    buffer = new XTemplate(tpl.join('')).render({api: api});
    self.elBd.html(buffer);
  };

  /**
   * 获取 API
   */
  Sidebar.prototype.getApi = function(e) {
    var self   = this,
        target = $(e.currentTarget),
        apiMod = target.attr('data-api-mod');

    target.addClass('current')
          .siblings().removeClass('current');

    S.use(apiMod, function(S, api) {
      self.render(api);
    });
  };

  /**
   * 展开收起
   */
  Sidebar.prototype.toggle = function(e) {
    var self   = this,
        target = $(e.currentTarget),
        name   = target.attr('data-name'),
        type   = target.attr('data-type');

    switch (type) {

      case 'module':
        target.next().slideToggle(0.2);
        self._set('module', name);
        self._set('subcat', null);
        self._set('entrie', null);
        break;

      case 'subcat':
        target.next().slideToggle(0.2);
        self._set('subcat', name);
        self._set('entrie', null);
        break;

      case 'entrie':
        $('.J_Entrie', self.elBd).removeClass('current');
        target.addClass('current');
        self._set('entrie', name);
        break;

    }

    LIST.render();

  };

  return Sidebar;

}, {

  requires: ['demo/base', 'demo/list', 'node', 'xtemplate']

});