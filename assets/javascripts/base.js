/**
 * @fileoverview base.js
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/base', function(S, Node) {

  var $ = S.all;

  var LIST_EL   = $('#J_List'),
      CODE_EL   = $('#J_Code'),
      METHOD_EL = $('#J_Method'),
      CONFIG_EL = $('#J_Config');

  /**
   * Base
   */
  var Base = function() {
    this._bind();
  };

  /**
   * 私有数据
   */
  Base._data = {};

  /**
   * 数据设置
   * @param {String} key
   * @param {String} val
   */
  Base.prototype._set = function(key, val) {
    Base._data[key] = val;
  };

  /**
   * 数据获取
   * @param  {String} key
   * @return {String}
   */
  Base.prototype._get = function(key) {
    return Base._data[key];
  };

  /**
   * 事件绑定
   */
  Base.prototype._bind = function() {
    var self = this;

    if (!self.el || !self.events) {
      return;
    }

    S.each(self.events, function(handler, key) {
      if (!key || !handler || !~key.indexOf(" ")) {
        return;
      }
      var arr      = key.replace(' ', '^').split('^'),
          type     = arr[0],
          selector = arr[1];
      $(self.el).delegate(type, selector, self[handler], self);
    });
  };

  /**
   * 渲染界面
   * @param {String} state
   */
  Base.prototype._render = function(state) {
    switch(state) {
      case 'list':
        LIST_EL.show();
        CODE_EL.hide();
        METHOD_EL.show();
        CONFIG_EL.hide();
        break;
      case 'code':
        LIST_EL.hide();
        CODE_EL.show();
        METHOD_EL.hide();
        CONFIG_EL.show();
        break;
    }
  };

  /**
   * 制作查询ID
   * @return {String}
   */
  Base.prototype._makeQueryId = function() {
    return this._get('module') + '.' + this._get('method');
  };

  return Base;

}, {
  requires: ['node']
});