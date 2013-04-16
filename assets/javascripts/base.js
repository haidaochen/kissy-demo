/**
 * @fileoverview base.js
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/base', function(S, Node, IO) {

  var $ = S.all;

  var TIPS_T    = null,
      TIPS_EL   = $('#J_Tips'),
      LIST_EL   = $('#J_List'),
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
   * 提交防洪
   * @param {String}   el
   * @param {String}   url
   * @param {Object}   data
   * @param {Function} cb
   */
  Base.prototype._ajax = function(el, url, data, cb) {
    var self    = this,
        elId    = el.attr('id'),
        iconEl  = el.one('i'),
        iconCls = iconEl.attr('class');

    el.removeAttr('id');
    el.addClass('disabled');

    iconEl.removeAttr('class');
    iconEl.addClass("icon-refresh icon-spin");
    
    IO.post(url, data, function(res) {
      el.attr('id', elId);
      el.removeClass('disabled');

      iconEl.removeAttr('class');
      iconEl.addClass(iconCls);

      cb(res);
    });
  };

  /**
   * 提示信息
   * @param {Boolean} type
   * @param {String}  info
   */
  Base.prototype._tips = function(type, info) {
    var self = this;

    TIPS_T && clearTimeout(TIPS_T);
    type ? TIPS_EL.removeClass('error') : TIPS_EL.addClass('error');
    TIPS_EL.html(info).slideDown(0.1);

    TIPS_T = setTimeout(function() {
      TIPS_EL.html('').slideUp(0.1);
    }, 1000);
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
  requires: ['node', 'ajax']
});