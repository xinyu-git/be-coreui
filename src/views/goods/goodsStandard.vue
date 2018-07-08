<template>
   <div class="content">
       <div class="container-fluid">
            <b-card>
                <b-form >
                    <b-row>
                        <b-col sm="1"><label>商品规格</label></b-col>
                        <b-col sm="11">
                            <b-row class="struct">
                                <table>
                                    <tr><td><label >颜色</label></td></tr>
                                    <tr>
                                        <td>
                                            <div class="sku-color">                       
                                                <b-row v-for="(item,index) in skuData1" :key="index">
                                                    <b-input-group>
                                                        <b-input-group-prepend is-text>
                                                            <input type="checkbox" :checked="item.checked" @change="addSpe1(item,1)">
                                                        </b-input-group-prepend>
                                                        <b-form-input type="text" v-model="item.name" :data-id="'sku'+ index" placeholder="请输入颜色" ></b-form-input>
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
                                    <tr><td><label >尺寸</label></td></tr>
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
                            <b-row class="struct"> <b-button variant='primary lg' size="lg" style="margin:0 auto;" @click="getSkuData();">确定</b-button> </b-row>
                            <b-row class="struct" v-if="goodsSkuList.length != 0">
                                <div><label >商品销售规格</label></div>
                                <b-table striped hover border  :items="goodsSkuList" :fields="fieldsSkuList">
                                    <template slot="color" slot-scope="data">
                                        {{data.item[0]}}
                                    </template>
                                    <template slot="size" slot-scope="data">
                                        {{data.item[1]}}
                                    </template>
                                    <template slot="goods_number" slot-scope="data">
                                        <b-form-input></b-form-input>
                                    </template>
                                </b-table>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-form>
            </b-card>
       </div>
   </div>
</template>


<script>
    //import skuTypeOne from './skuTypeOne'
    export default{
        name:'goodsStandard',
        components:{
            //skuTypeOne
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
                    color:{label:'颜色',sortable:false},
                    size:{label:'尺寸',sortable:false},
                    goods_number:{label:'库存',sortable:false},
                }
            }
        },
        async mounted () {

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
            getSkuData (){
                let self = this;
                let tableArr=[];
                let arr=[];
                let skuData1NameArr=[];
                let skuData2NameArr=[];
                self.goodsSkuList=[];
                for(let i=0;i<self.skuData1.length;i++){
                    skuData1NameArr.push(self.skuData1[i].name)
                }
                for(let i=0;i<self.skuData2.length;i++){
                    skuData2NameArr.push(self.skuData2[i].name)
                }
                if(skuData1NameArr.length == 0 ){
                   skuData1NameArr = ['']
                }
                if(skuData2NameArr.length == 0 ){
                    skuData2NameArr = ['']
                }
                for (var t = 0; t < skuData1NameArr.length; t++) {
		            for (var i = 0; i < skuData2NameArr.length; i++) {
		              arr = [];
		              arr.push(skuData1NameArr[t]);
		              arr.push(skuData2NameArr[i]);
                      self.goodsSkuList.push(arr);
                      //tableArr=[...self.goodsSkuList]
		            }
                }
                console.log(skuData2NameArr.length)
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
</style>
