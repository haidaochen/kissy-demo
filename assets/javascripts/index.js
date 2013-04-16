/**
 * @fileoverview index.js
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.config({
  packages: {
    demo: {
      base: '../assets/build',
      tag : +new Date()
    }
  }
});

KISSY.use('demo/module', function(S, Module) {
  new Module();
});