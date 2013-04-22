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

KISSY.use('demo/module, demo/api/core, demo/api/components', function(S, Module, APICore, APIComponents) {
  new Module([].concat(APICore, APIComponents));
});