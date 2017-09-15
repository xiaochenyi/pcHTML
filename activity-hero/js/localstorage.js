/**
 * 本地存储
 */
var DFSJ5 = DFSJ5 || {};
DFSJ5.globe = {
	storage : {}		
};
DFSJ5.storage = {
    valid : function() {
        return ('localStorage' in window) && window['localStorage'] != null;
    },
    set : function(key, value) {
        if(this.valid()) {
            localStorage.setItem(key, value);
        } else {
        	DFSJ5.globe.storage[key] = value;
        }
        return true;
    },
    setJSON : function(key, value) {
        var json = JSON.stringify(value);
        return this.set(key, json);
    },
    get : function(key) {
        if(this.valid()) {
            return localStorage.getItem(key);
        } else {
            return DFSJ5.globe.storage[key];
        }
    },
    getJSON : function(key) {
        var json = this.get(key);
        if(json == null) {
            return null;
        }
        return eval('(' + json + ')');
    },
    remove : function(key) {
        if(this.valid()) {
            localStorage.removeItem(key);
            return true;
        }
        return false;
    },
    clear : function() {
        if(this.valid()) {
            localStorage.clear();
            return true;
        }
        return false;
    }
};
