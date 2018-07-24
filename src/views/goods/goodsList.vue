<template>
   <div class="content">
       <div class="content-nav">
           <div class="breadcrumb-box">
               <b-breadcrumb :items="items"/>
           </div>
           <div class="addGoods-btn">
               <b-button variant='primary lg' @click="editGoods(-999)">添加商品</b-button>
           </div>
       </div>
       <div class="container-fluid">
          <b-card>
              <b-row>
                    <b-col sm="1"><label for="goodsName" class="text-sm-right">商品名称</label></b-col>
                    <b-col sm="3">
                        <b-form-input id="goodsName" size="Default" v-model="goodsName"></b-form-input>
                    </b-col>
                    <b-col sm="2">
                        <b-button  variant="primary lg" @click="onSubmitFilter">查询</b-button>
                    </b-col>
                </b-row>
                <b-row class="container-box">
                    <b-col lg="12">
                        <b-table striped hover border  :items="goodsList" :fields="fieldsGoodsLis">
                            <template slot="is_new" slot-scope="data">
                                {{data.item.is_new ? '是' : '否'}}
                            </template>
                            <template slot="is_hot" slot-scope="data">
                                {{data.item.is_hot ? '是' : '否'}}
                            </template>
                            <template slot="is_delete" slot-scope="data">
                                {{data.item.is_delete ? '已下架' : '已上架'}}
                            </template>
                            <template slot="goodsOperation" slot-scope="data">
                                <b-button  variant="primary sm" @click="editGoods(data.item.id)">编辑</b-button>
                            </template>
                        </b-table>
                    </b-col>
                </b-row>
                <div>
                    <b-pagination size="md" align="right" :total-rows="count" :per-page="size" v-model="currentPage" prev-text="上一页" next-text="下一页" hide-goto-end-buttons @change="changePage"/>
                </div>
          </b-card>
       </div>
   </div>
</template>
<script>
    export default{
        name:'goodList',
        components:{
            //cSwitch
        },
        data : () => {
            return {
                items: [{
                    text: '首页',
                    href: '#/dashboard'
                }, {
                    text: '商品管理',
                    href: '#'
                }, {
                    text: '商品列表',
                    active: true
                }],
                goodsList: [],
                size:7,
                count:0,
                currentPage:1,
                goodsName:'',
                fieldsGoodsLis:{
                    id:{label:'ID',sortable:false},
                    name:{label:'商品名称',sortable:false},
                    retail_price:{label:'售价',sortable:false},
                    integral:{label:'积分',sortable:false},
                    goods_number:{label:'库存',sortable:false},
                    is_new:{label:'新品',sortable:false},
                    is_hot:{label:'人气',sortable:false},
                    is_delete:{label:'上架',sortable:false},
                    sort_order:{label:'排序',sortable:true},
                    goodsOperation :{label:'操作',sortable:false}
                }
            }
        },
        async mounted () {
           this.getGoodsList();
        },
        methods : {
            changePage(page){
                this.currentPage = page;
                this.getGoodsList();
            },
            onSubmitFilter() {
                this.currentPage = 1
                this.getGoodsList();
            },
            async getGoodsList(){
                let self=this;
                let result=await self.$http.get('api/be/goods/index?page='+self.currentPage+'&size='+self.size+'&name='+self.goodsName+'  ')
                console.log(result)
                if(result.errno==0){
                    self.count=result.data.count;
                    self.goodsList=result.data.data;
                }
            },
            editGoods(id){
                let self=this;
                self.$router.push({name:'goodsAddPage',params:{id:id}})
            }
        }
    }
</script>
<style lang="scss">
.content-nav{display:flex;background: #fff;margin-bottom: 1.5rem;padding:0 30px;}
.content-nav .breadcrumb-box{flex: 1;color:#8492A6;}
.content-nav .breadcrumb-box .breadcrumb{background: none;border:none;margin-bottom: 0;}
.addGoods-btn{width: auto;display:flex;align-items: center;}
.container-box{background: #fff;padding:10px 0;}
</style>
