/**
 * @fileoverview list.js
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/list', function(S, Base, Code, Node, IO, XTemplate) {

  var $    = S.all,
      CODE = new Code();

  /**
   * List
   */
  var List = function() {
    this.el     = $('#J_List');
    this.elHd   = $('#J_ListHd h1');
    this.elBd   = $('#J_ListBd');
    this.events = {
      'click #J_ListHd #J_Add': 'addDemo',
      'click #J_ListBd a'     : 'getDemo'
    };
    this.init();
  };

  /**
   * 基础继承类
   */
  S.extend(List, Base);

  /**
   * 程序初始化
   */
  List.prototype.init = function() {
    List.superclass.constructor.call(this);
  };

  /**
   * 渲染界面
   */
  List.prototype.render = function() {
    var self = this,
        tpl;

    tpl = [
      '<ul>',
        '{{#demo}}',
          '<li>',
            '<a href="javascript:;" data-id="{{id}}">',
              '{{intro}}',
            '</a>',
          '</li>',
        '{{/demo}}',
      '</ul>'
    ].join('');

    IO.post('./act/list.php', {module: self._makeQueryId()}, function(res) {
      var buffer = new XTemplate(tpl).render({demo: res.data});

      self.elHd.html(self._get('method') + ' Demo');
      self.elBd.html(buffer);
    });
  };

  /**
   * 添加 DEMO
   */
  List.prototype.addDemo = function() {
    var self = this;

    self._render('code');
    CODE.render();
  };

  /**
   * 获取 DEMO
   */
  List.prototype.getDemo = function(e) {
    var self   = this,
        target = $(e.currentTarget),
        id     = target.attr('data-id');

    IO.post('./act/detail.php', {id: id}, function(res) {
      self._set('id', id);
      self._render('code');
      CODE.render(res.data);
    });
  };

  return List;

}, {

  requires: ['demo/base', 'demo/code', 'node', 'ajax', 'xtemplate', 'sizzle']

});