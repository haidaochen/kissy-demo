/**
 * @fileoverview index.js
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.config({
  packages: {
    demo: {
      base: './assets/build',
      tag : +new Date()
    }
  }
});


KISSY.add('demo/index', function(S, Base, Sidebar) {
  var $       = S.all,
      sidebar = new Sidebar();

  /**
   * Index
   */
  var Index = function() {
    this.sideEl   = $('#J_Side');
    this.codeBdEl = $('#J_CodeBd');
    this.init();
    this.bind();
  };

  /**
   * 基础继承类
   */
  S.extend(Index, Base);

  /**
   * 程序初始化
   */
  Index.prototype.init = function() {
    this.render();
    Index.superclass.constructor.call(this);
  };

  /**
   * 渲染界面
   */
  Index.prototype.render = function() {
    var self = this,
        winH = $(window).height();

    self.sideEl.css('height', winH - 40);
    self.codeBdEl.css('height', winH - 101);
  };

  /**
   * 事件绑定
   */
  Index.prototype.bind = function() {
    var self = this;

    $(window).on('resize', function() {
      self.render();
    });
  };


  return Index;

}, {

  requires: ['demo/base', 'demo/sidebar', 'sizzle']

});

KISSY.use('demo/index', function(S, Index) {
  new Index();
});