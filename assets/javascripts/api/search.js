/**
 * @fileoverview
 * @author 水澜 <shuilan.cj@taobao.com>
 *
 */
KISSY.add(function(S,Core,Components){

    var api = {
        "name": "",
        "subcls":[Core,Components]
    };


    self.search = function(term){
        var result;
        result = self.searchInSubcls(term, api);
        return result;
    };

    self.searchInSubcls = function(term, topCls, parentName){
        var results = [];
        var result;

        var topName = topCls.name;
        if(parentName && topName!==''){
            topName = parentName + '.' + topName;
        }

        if(this.compare(term, topCls.name)){
            results.push({
                name:parentName+'.' + topCls.name,
                slug:topCls.slug
            });
        }

        if (topCls.entries && topCls.entries.length) {
            result = this.searchInEntries(term, topCls.entries, topName);
            results = results.concat(result);
        }
        if (topCls.subcat && topCls.subcat.length) {
            result = this.searchInSubcats(term, topCls.subcat ,topName);
            results = results.concat(result);
        }
        if (topCls.subcls && topCls.subcls.length) {
            var  _i, _len , subcls = topCls.subcls;
            for (_i = 0, _len = subcls.length; _i < _len; _i++) {
                result = this.searchInSubcls(term, subcls[_i], topName);
                results = results.concat(result);
            }
        }

        return results;
    };

    self.searchInSubcats = function(term, subcats, parentName) {
        var results, result, _i, _len;
        results = [];
        for (_i = 0, _len = subcats.length; _i < _len; _i++) {
            result = this.searchInEntries(term, subcats[_i].entries, parentName);
            results = results.concat(result);
        }
        return results;
    };

    self.searchInEntries = function(term, entries ,parentName) {
        var entry, results,  _i, _len;
        results = [];
        for (_i = 0, _len = entries.length; _i < _len; _i++) {
            entry = entries[_i];
            if (this.compare(term, entry.name)) {
                results.push({
                    name:parentName+'.'+entry.name,
                    slug:entry.slug
                });
            }
        }
        return results;
    };

    self.compare = function(term , name){
        var titleLow = name.toLowerCase();
        if (titleLow.indexOf(term.toLowerCase()) !== -1) {
            return true;
        }
        return false;
    };

    return self;

}, {
    requires: [
        'demo/api/core',
        'demo/api/components'
    ]
});