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
    this.events   = {
      'click #J_SidebarHd a': 'getApi'
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
                '<p class="module-name"><i class="icon-caret-right"></i>{{name}}</span>',
                '{{@if entries}}',
                  '<ul class="entries">',
                    '{{#entries}}',
                      '<li class="entrie">',
                        '<p class="entrie-name">{{name}}</p>',
                        '<p class="entrie-desc">{{desc}}</p>',
                      '</li>',
                    '{{/entries}}',
                  '</ul>',
                '{{else}}',
                  '<ul class="subcats">',
                    '{{#subcats}}',
                      '<li class="subcat">',
                        '<p class="subcat-name">{{name}}</p>',
                        '<ul class="entries">',
                          '{{#entries}}',
                            '<li class="entrie">',
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

    S.use(apiMod, function(S, api) {
      self.render(api);
    });
  };

  return Sidebar;

}, {

  requires: ['demo/base', 'demo/list', 'node', 'xtemplate']

});