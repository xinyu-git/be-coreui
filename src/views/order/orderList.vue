<template>
   <div class="content">
       <div class="content-nav">
           <div class="breadcrumb-box">
               <b-breadcrumb :items="items"/>
           </div>
           <div class="addGoods-btn">
               <!-- <b-button variant='primary lg'>添加订单</b-button> -->
           </div>
       </div>
       <div class="container-fluid">
            <b-card>
                <b-row>
                    <b-col sm="1"><label for="orderSn" class="text-sm-right">订单号</label></b-col>
                    <b-col sm="2">
                        <b-form-input id="orderSn" size="Default" v-model="orderSn"></b-form-input>
                    </b-col>
                    <b-col sm="1"><label for="consignee" >收货人</label></b-col>
                    <b-col sm="2">
                        <b-form-input id="consignee" size="Default" v-model="consignee"></b-form-input>
                    </b-col>
                    <b-col sm="1"><label for="consignee" >支付状态</label></b-col>
                    <b-col sm="2">
                        <b-form-select v-model="pay_status" class="mb-3">
                            <option value=" ">请选择支付状态</option>
                            <option value="101">订单已取消</option>
                            <option value="0">未付款</option>
                            <option value="201">已付款</option>
                            <option value="300">已发货</option>
                            <option value="301">已收货</option>
                        </b-form-select>
                    </b-col>
                    <b-col sm="1">
                        <b-button  variant="primary lg" @click="onSubmitFilter()">查询</b-button>
                    </b-col>
                </b-row>
                <b-row class="container-box">
                    <b-col lg="12">
                        <b-table  striped hover border :items="orderData" :fields="fieldsOrder">
                            <template slot="add_time" slot-scope="time">                           
                                {{time.value}}
                            </template>
                            <template slot="order_status_text" slot-scope="data">
                                {{data.value}}
                            </template>
                            <template slot="order_operation" slot-scope="data">
                                <b-button variant='primary' @click="viewOrder(data.item.id)">查看</b-button>
                            </template>
                        </b-table>
                    </b-col>
                </b-row>
                <div v-show="orderData.length==0" class="orderTips"> {{orderTips}} </div>
                <div>
                    <b-pagination size="md" align="right" :total-rows="count" :per-page="pageSize" v-model="currentPage" prev-text="上一页" next-text="下一页" hide-goto-end-buttons @change="changePage"/>
                </div>
          </b-card>
       </div>
   </div>
</template>
<script>
import {formatTime} from '../../filters/index.js'
    export default{
        name:'orderList',
        data : () => {
            return {
                items: [{
                    text: '首页',
                    href: '#/dashboard'
                }, {
                    text: '订单中心',
                    href: '#'
                }, {
                    text: '订单列表',
                    active: true
                }],
                orderList:[],
                orderData: [],
                currentPage:0,
                pageSize:7,
                count:0,
                orderSn:'',
                consignee:'',
                pay_status:'',
                orderTips:'暂无数据',
                fieldsOrder:{
                    id:{label:'ID',sortable:false},
                    order_sn:{label:'订单号',sortable:false},
                    add_time:{label:'下单时间',sortable:false},
                    consignee:{label:'收货人',sortable:false},
                    order_price:{label:'订单金额',sortable:false},
                    order_status_text:{label:'订单状态',sortable:false},
                    order_operation:{label:'操作',sortable:false}
                }
            }
        },
        async mounted () {
            
        },
        methods: { 
            changePage(page){
                this.currentPage = page;
                this.getOrderList();
            },
            onSubmitFilter() {
                this.currentPage = 1
                this.getOrderList();
            },
            async getOrderList() {
                let self = this;
                self.orderData=[];
                let result = await this.$http.get(
                    `api/be/order/index?page=${self.currentPage}&size=${self.pageSize}&orderSn=${self.orderSn}&consignee=${self.consignee}&pay_status=${self.pay_status}`
                );
                if(result.errno==0){
                    if(result.data.count!=0){
                        self.count = result.data.count;
                        self.orderData = result.data.data; 
                    }else{
                        self.orderTips='未查到此订单'
                    }
                }
            },
            viewOrder (id){
                let self=this;
                self.$router.push({name:'orderDetails',params:{id:id}})
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
.content-nav{display:flex;background: #fff;margin-bottom: 1.5rem;padding:0 30px;}
.content-nav .breadcrumb-box{flex: 1;color:#8492A6;}
.content-nav .breadcrumb-box .breadcrumb{background: none;border:none;margin-bottom: 0;}
.addGoods-btn{width: auto;display:flex;align-items: center;}
.orderimg{width:100px;height:100px;}
.simpleDesc{width: 500px;}
.container-box{background: #fff;padding:10px 0;}
.orderTips{text-align: center;}
</style>
