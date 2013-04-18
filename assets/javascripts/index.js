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

KISSY.add('demo/index', function(S, Base, Module) {
  var $      = S.all,
      MODULE = new Module();

  /**
   * Index
   */
  var Index = function() {
    this.sideEl = $('#J_Side');
    this.init();
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
    var self = this;

    self.sideEl.css('height', $(window).height() - 120);
  };

  return Index;

}, {

  requires: ['demo/base', 'demo/module']

});

KISSY.use('demo/index', function(S, Index) {
  new Index();
});