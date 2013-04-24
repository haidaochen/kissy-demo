/**
 * @fileoverview base.js
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/base', function(S, Node, IO) {

  var $ = S.all;

  var TIPS_T     = null,
      TIPS_EL    = $('#J_Tips'),
      LIST_EL    = $('#J_List'),
      CODE_EL    = $('#J_Code'),
      SIDEBAR_EL = $('#J_Sidebar'),
      CONFIG_EL  = $('#J_Config');
      
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
   * @param {Object}   e
   * @param {String}   url
   * @param {Object}   data
   * @param {Function} cb
   */
  Base.prototype._ajax = function(e, url, data, cb) {
    var self     = this,
        target   = $(e.currentTarget),
        targetId = target.attr('id'),
        iconEl   = target.one('i'),
        iconCls  = iconEl.attr('class');

    // 禁用监听
    target.removeAttr('id');
    target.addClass('disabled');

    // 更换图标
    iconEl.removeAttr('class');
    iconEl.addClass("icon-spinner icon-spin");
    
    IO.post(url, data, function(res) {
      // 恢复监听
      target.attr('id', targetId);
      target.removeClass('disabled');

      // 还原图标
      iconEl.removeAttr('class');
      iconEl.addClass(iconCls);

      // 提示信息
      res.status ? self._tips(true, res.message) : self._tips(false, res.message);

      // 招待回调
      cb && cb(res);
    });
  };

  /**
   * 提示信息
   * @param {Boolean} type
   * @param {String}  info
   */
  Base.prototype._tips = function(type, info) {
    var self = this;

    // 清除定时
    TIPS_T && clearTimeout(TIPS_T);

    // 拼装内容
    if (type) {
      TIPS_EL.removeClass('error');
      TIPS_EL.html('<i class="icon-ok"></i>' + info);
    } else {
      TIPS_EL.addClass('error');
      TIPS_EL.html('<i class="icon-remove"></i>' + info);
    }

    // 展示动画
    TIPS_EL.slideDown(0.2);

    // 创建定时
    TIPS_T = setTimeout(function() {
      TIPS_EL.html('').slideUp(0.2);
    }, 2000);
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
        SIDEBAR_EL.show();
        CONFIG_EL.hide();
        break;
      case 'code':
        LIST_EL.hide();
        CODE_EL.show();
        SIDEBAR_EL.hide();
        CONFIG_EL.show();
        break;
    }
  };

  /**
   * 制作查询ID
   * @return {String}
   */
  Base.prototype._makeQueryId = function() {
    var self  = this,
        types = ['module', 'entrie'],
        temp  = [];

    S.each(types, function(type) {
      self._get(type) && temp.push(self._get(type))
    });

    return temp.join('.');
  };

  return Base;

}, {
  requires: ['node', 'ajax']
});