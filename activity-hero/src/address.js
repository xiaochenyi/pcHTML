/**
 * Created by Administrator on 17-8-30.
 */
new Vue({
    el: ".container",
    data: {
        limitNum: 3,
        addressList: [],
        curIndex: 0,
        shopMethod: 1
    },
    mounted: function() {
        this.$nextTick(function() {
            this.getAddressList();
        })
    },
    computed: {
        filterAddress: function() {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        getAddressList: function() {
            var _this = this;
            this.$http.get("data/address.json").then(function(res) {
                _this.addressList = res.data.result;
            });
        },
        more: function() {
            this.limitNum = this.addressList.length;
        },
        setDefault: function(id) {
            this.addressList.forEach(function(item, index) {
                if(item.addressId == id) {
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
            })
        }
    }
});