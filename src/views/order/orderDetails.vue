<template>
   <div class="content">
       <div class="container-fluid" >
            <b-card>
                <b-container class="container-margin" >
                    <b-card-group deck  v-for="items in orderGoodsData" :key="items.id">
                        <b-card title="收货人信息" >
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>收货人:</b></b-col>
                                <b-col>{{items.consignee}} </b-col>
                            </b-row>
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>收货地址:</b></b-col>       
                                <b-col>{{items.province_name+''+items.city_name+''+items.district_name+''+items.address}}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>手机号码:</b></b-col>
                                <b-col>{{items.mobile}}</b-col>
                            </b-row>
                        </b-card>
                         <b-card title="付款信息">
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>付款方式:</b></b-col>
                                <b-col>{{items.pay_name}}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>下单时间:</b></b-col>
                                <b-col> {{items.add_time}}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>付款时间:</b></b-col>
                                <b-col> {{items.pay_time}}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>支付状态:</b></b-col>
                                <b-col>{{items.order_status_text}}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>商品总额:</b></b-col>
                                <b-col> {{items.order_price}}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>应支付金额:</b></b-col>
                                <b-col>{{items.order_price+items.shipping_fee-items.coupon_price}}</b-col>
                            </b-row>
                        </b-card>
                    </b-card-group>
                </b-container>
                <b-container class="container-margin">
                        <b-table  :items="buyGoodsDetails" :fields="fieldsBuyGoods" class="table-details">
                            <template slot="goods_name" slot-scope="data">
                                <img class='orderimg' :src='data.item.list_pic_url' />
                                <a href="javascript:;" target="_blank">{{data.item.goods_name+''+data.item.goods_specifition_name_value }}</a>
                            </template>
                        </b-table>
                </b-container>
                <b-container class="container-margin" v-for="items in orderGoodsData" :key="items.id">
                    <b-row class="justify-content-md-end">
                        <b-col sm="2" class="text-sm-right"><b>商品总额:</b></b-col>
                        <b-col sm="2" class="text-sm-right">{{items.order_price}}</b-col>
                    </b-row>
                    <b-row class="justify-content-md-end">
                        <b-col sm="2" class="text-sm-right"><b>运费:</b></b-col>
                        <b-col sm="2" class="text-sm-right">{{items.shipping_fee}}</b-col>
                    </b-row>
                    <b-row class="justify-content-md-end">
                        <b-col sm="2" class="text-sm-right"><b>优惠券:</b></b-col>
                        <b-col sm="2" class="text-sm-right">{{items.coupon_price}}</b-col>
                    </b-row>
                    <b-row class="justify-content-md-end">
                        <b-col sm="2" class="text-sm-right"><b>积分:</b></b-col>
                        <b-col sm="2" class="text-sm-right">{{items.integral}}</b-col>
                    </b-row>
                    <b-row class="justify-content-md-end">
                        <b-col sm="2" class="text-sm-right"><b>应付总额:</b></b-col>
                        <b-col sm="2" class="text-sm-right">{{items.order_price+items.shipping_fee-items.coupon_price}}</b-col>
                    </b-row>
                </b-container>
          </b-card>
       </div>
   </div>
</template>
<script>
import {formatTime} from '../../filters/index.js'
    export default{
        name:'orderDetails',
        data : () => {
            return {
                id:'',
                orderGoodsData:[],
                buyGoodsDetails:[],
                fieldsBuyGoods:{
                    goods_name:{label:'商品',sortable:false,tdClass:'goodsNameTd'},
                    goods_sn:{label:'商品编号',sortable:false},
                    retail_price:{label:'商品价格',sortable:false},
                    number:{label:'商品数量',sortable:false},
                    integral:{label:'积分',sortable:false}
                }
            }
        },
        async mounted () {
            this.id=this.$route.params.id
            this.getOrderDetails();
        },
        methods: { 
            async getOrderDetails() {
              let self = this;
              let result = await self.$http.get(`api/be/order/info?id=${self.id}`)
              if(result.errno==0){
                    self.orderGoodsData.push(result.data); 
                    self.buyGoodsDetails=result.data.orderGoods;
              }
            }
        },
        filters: {
            formatTime(time) {
                var date = new Date(time*1000);
                return formatTime(date, 'yyyy-MM-dd hh:mm:ss');
            }
        }
    }
</script>
<style lang="scss">
.container-margin{margin-bottom: 20px;}
.table-details th,.table-details td{border-bottom:1px solid #c8ced3 ;vertical-align: middle;text-align: center;}
.orderimg{width:100px;height:60px;}
.goodsNameTd{width: 400px;}
</style>
