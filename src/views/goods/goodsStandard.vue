<template>
   <div class="content">
       <div class="container-fluid">
            <b-card>
                <b-form @submit="saveGood">
                    <b-row>
                        <b-col sm="1"><label>商品规格</label></b-col>
                        <b-col sm="11" >
                            <b-row class="struct">
                                <table>
                                    <tr><td><label> {{skuLabelName1}} </label></td></tr>
                                    <tr>
                                        <td>
                                            <div class="sku-color">                       
                                                <b-row v-for="(item,index) in skuData1" :key="index">
                                                    <b-input-group>
                                                        <b-input-group-prepend is-text>
                                                            <input type="checkbox" :checked="item.checked" @change="addSpe1(item,1)">
                                                        </b-input-group-prepend>
                                                        <b-form-input type="text" v-model="item.name" placeholder="请输入颜色" ></b-form-input>
                                                        <b-form-input type="text" v-model="item.remark" placeholder="请输入图片地址"></b-form-input>
                                                    </b-input-group>
                                                </b-row>
                                                <b-row >
                                                    <b-input-group>
                                                        <b-input-group-prepend is-text>
                                                            <input type="checkbox" v-model="skuItem1.checked" @change="addSpe(1)"  >
                                                        </b-input-group-prepend>
                                                        <b-form-input type="text" v-model="skuItem1.name"  placeholder="请输入颜色" ></b-form-input>
                                                        <b-form-input type="text" v-model="skuItem1.remark"  placeholder="请输入图片地址"></b-form-input>
                                                    </b-input-group>
                                                </b-row>                                         
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </b-row>
                            <b-row class="struct">
                                <table>
                                    <tr><td><label > {{skuLabelName2}} </label></td></tr>
                                    <tr>
                                        <td>
                                            <div class="sku-size">
                                                <b-row v-for="item in skuData2" :key="item.index">
                                                    <b-input-group>
                                                        <b-input-group-prepend is-text>
                                                            <input type="checkbox" :checked="item.checked" @change="addSpe1(item,2)">
                                                        </b-input-group-prepend>
                                                        <b-form-input type="text"  v-model="item.name" placeholder="请输入自定义尺寸"></b-form-input>                                                      
                                                    </b-input-group>
                                                </b-row>
                                                <b-row>
                                                    <b-input-group>
                                                        <b-input-group-prepend is-text>
                                                            <input type="checkbox" v-model="skuItem2.checked" @change="addSpe(2)">
                                                        </b-input-group-prepend>
                                                        <b-form-input type="text"  v-model="skuItem2.name" placeholder="请输入自定义尺寸"></b-form-input>                                                      
                                                    </b-input-group>
                                                </b-row>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </b-row>
                            <b-row class="struct"> <b-button variant='primary' size="md" @click="getSkuData();">添加商品规格</b-button> </b-row>
                            <b-row class="struct speTable" v-if="goodsSkuList.length != 0">
                                <div><label >商品销售规格</label></div>
                                <b-table striped hover border  :items="goodsSkuList" :fields="fieldsSkuList">
                                    <template slot="color" slot-scope="data">
                                        {{data.item[0]}}
                                    </template>
                                    <template slot="size" slot-scope="data">
                                        {{data.item[1]}}
                                    </template>
                                    <template slot="goods_number" slot-scope="data">
                                        <b-form-input v-model="goodsSkuList.goods_number"></b-form-input>
                                    </template>
                                </b-table>
                                <div class="speBtn"> <b-button type="submit" variant="primary"> 保存 </b-button> </div>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-form>
                <!-- 模态窗 -->
                <b-modal ref="myModalRef" centered hide-footer>
                    <div class="d-block text-center">
                      <h3> {{addGoodMsg}} </h3>
                    </div>
                    <b-btn class="mt-3" variant="primary" block @click="hideModal">确认</b-btn>
                </b-modal>
            </b-card>
       </div>
   </div>
</template>


<script>
    //import skuTypeOne from './skuTypeOne'
    export default{
        name:'goodsStandard',
        components:{

        },
        data : () => {
            return {
                goodId:null,
                skuData1:[],
                skuItem1:{
                    name:null,
                    remark:null,
                    checked:false
                },
                skuData1NameArr:[],
                skuData2:[],
                skuItem2:{
                    name:null,
                    checked:false
                },
                skuData2NameArr:[],
                goodsSkuList: [],
                fieldsSkuList:{
                    // color:{label:'颜色',sortable:false},
                    // size:{label:'尺寸',sortable:false},
                    // goods_number:{label:'库存',sortable:false},
                },
                skuLabelName1:'',
                skuLabelName2:'',
                goodsSkuGroup:{data:[]},
                addGoodMsg:'',
                addGoodFlag:false
            }

        },
        async mounted () {
            let self = this;
            //新增/修改--商品id
            self.goodId=self.$route.params.id      
            //console.log(self.goodId)     
            //获取商品规格属性 be/product/list?goods_id=1181000
            let result = await self.$http.get(`api/be/product/getSpecification?id=${self.goodId}`)
            self.skuLabelName1=result.data[0].name
            self.skuLabelName2=result.data[1].name
            self.fieldsSkuList={
                color:{label:self.skuLabelName1,sortable:false},
                size:{label:self.skuLabelName2,sortable:false},
                goods_number:{label:'库存',sortable:false},
            }
            let resultSpe = await self.$http.get(`api/be/product/list?goods_id=1181000`)
            let specListArr=resultSpe.data.specificationList
            let productList=resultSpe.data.productList
            console.log(specListArr)
            console.log(productList)
            //商品规格
            if(specListArr.length>0){
                for(var i=0;i<specListArr.length;i++){
                    //1--尺寸 2--颜色
                    if(specListArr[i].specification_id==2){
                        self.skuData1.push({
                            name:specListArr[i].value,
                            remark:specListArr[i].pic_url,
                            checked:true,
                            id:specListArr[i].id
                        })
                        console.log(self.skuData1)
                    }else if(specListArr[i].specification_id==1){
                        self.skuData2.push({
                            name:specListArr[i].value,
                            checked:true,
                            id:specListArr[i].id,
                        })
                    }
                }
            } 
            //商品规格table
            // if(productList.length>0){
            //     for(var i=0;i<productList.length;i++){
            //         console.log(productList[0].goods_specification_ids)
            //         if(specListArr[i].specification_id==2){
            //             self.skuData1.push({
            //                 name:specListArr[i].value,
            //                 remark:specListArr[i].pic_url,
            //                 checked:true
            //             })
            //         }else if(specListArr[i].specification_id==1){
            //             self.skuData2.push({
            //                 name:specListArr[i].value,
            //                 checked:true
            //             })
            //         }
            //     }
            // }        
        },
        methods : {
            async getGoodInfo(){
                
            },
            async saveGood(){
                             
            },
            addSpe(type){
                let self=this;                    
                if(type==1){
                    self.skuData1.push(self.skuItem1);
                    self.skuItem1={
                        checked:false,
                        name:null,
                        remark:null
                    }
                }else if(type==2){
                    self.skuData2.push(self.skuItem2);
                    self.skuItem2={
                        checked:false,
                        name:null
                    }
                }
            },
            addSpe1(item,type){
                let self=this;
                if(type==1){
                    let index=self.skuData1.indexOf(item)
                    if(item.checked){
                        self.skuData1.splice(index,1)
                    }
                }else if(type==2){
                    let index=self.skuData2.indexOf(item)
                    if(item.checked){
                        self.skuData2.splice(index,1)
                    }
                }
            },
            async getSkuData (){
                let self = this;
                let arr=[];
                let skuData1NameArr=[];
                let skuData2NameArr=[];
                self.goodsSkuGroup.data=[]
                self.goodsSkuList=[];
                //颜色数组
                for(let i=0;i<self.skuData1.length;i++){
                    if(self.skuData1[i].name){
                        skuData1NameArr.push(self.skuData1[i].name);
                        self.goodsSkuGroup.data.push({
                            id:'',
                            goods_id:self.goodId,
                            specification_id:1,
                            value:self.skuData1[i].name,
                            pic_url:self.skuData1[i].remark
                        })
                    }
                }
                //尺寸数组
                for(let i=0;i<self.skuData2.length;i++){
                    if(self.skuData2[i].name){
                        skuData2NameArr.push(self.skuData2[i].name)
                        self.goodsSkuGroup.data.push({
                            id:'',
                            goods_id:self.goodId,
                            specification_id:2,
                            value:self.skuData2[i].name
                        })
                    }
                }
                //表格数据
                for (var t = 0; t < skuData1NameArr.length; t++) {
		            for (var i = 0; i < skuData2NameArr.length; i++) {
		              arr = [];
		              arr.push(skuData1NameArr[t]);
		              arr.push(skuData2NameArr[i]);
                      self.goodsSkuList.push(arr);
		            }
                }
                console.log(self.goodsSkuGroup)
                return false;
                let result = await self.$http.post(`api/be/product/storeSp`)
                console.log(result)
            },
            showModal () {
                this.$refs.myModalRef.show();
            },
            hideModal () {
                this.$refs.myModalRef.hide();
                if(this.addGoodFlag){
                    this.$router.push('/goods/goodsList')
                }
            }
        }
    }
</script>
<style lang="scss">
.struct{background:#f8f8f8;border: 1px solid #eee;padding:5px;}
.struct>table>tr>td.bar{text-align: left;}
.struct>table>tr>td{padding:2px 5px 10px;line-height: 24px;}
.sku-color,.sku-size{margin:0 10px;padding:0 15px 10px 10px;}
.sku-color .input-group>input,.sku-size .input-group>input{margin:0 10px;}
.sku-size{display:flex;flex-flow: row wrap;}
.sku-color>.row{margin-bottom: 10px;}
.sku-size>.row{margin:10px;}

.struct button,.speBtn{margin:20px 50px;}
.speTable{padding: 10px;}
</style>
