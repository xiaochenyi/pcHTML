/**
 * Created by Administrator on 17-8-29.
 */

var vm = new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        delFlag: false,
        curProduct:""
    },
    /**
     * 局部过滤器
     */
    filters:{
        formatMoney: function(val) {
            return "￥" + val.toFixed(2);
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.carView();
        });
    },
    methods: {
        carView: function() {
            var _this = this;
            this.$http.get("data/data.json", {"id": 123}).then(function(res) {
                vm.productList = res.body.result.list;
            });
        },
        changeMoney: function(product, way) {
            if(way > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if(product.productQuantity < 1) {
                    product.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct: function(item) {
            if(typeof item.checked == 'undefined') {
//                Vue.set(item, "checked", true); // 全局注册
                this.$set(item, "checked", true); // 局部注册
            } else {
                item.checked = !item.checked;
            }

            var f = true;
            this.productList.forEach(function(item, index) {
                if(!item.checked) {
                    f = false;
                }
            });
            this.checkAllFlag = f;

            this.calcTotalPrice();
        },
        checkAll: function(flag) {
            this.checkAllFlag = flag;
            this.productList.forEach(function(item, index) {
                if(typeof item.checked == 'undefined') {
                    vm.$set(item, "checked", vm.checkAllFlag); // 局部注册
                } else {
                    item.checked = vm.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function() {
            this.totalMoney = 0;
            this.productList.forEach(function(item, index) {
                if(item.checked) {
                    vm.totalMoney += item.productQuantity * item.productPrice;
                }
            });
        },
        delConfirm: function(item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        del: function() {
//            this.productList.$delete(this.curProduct); // 1.0版可以直接删除这个，但是2.0不支持了
            var i = this.productList.indexOf(this.curProduct);
            this.productList.splice(i, 1);
            this.delFlag = false;
            this.calcTotalPrice();
        }
    }
});

// 全局过滤器
Vue.filter("money", function(value, type) {
    return "￥" + value.toFixed(2) + type;
});