<template>
   <div class="content">
       <div class="container-fluid">
            <b-card>
                <b-form @submit="saveGoodSku">
                    <b-row>
                        <b-col sm="1"><label>商品规格</label></b-col>
                        <b-col sm="11" >
                            <b-row class="struct" v-for="(item,index) in speData" :key="index">
                                <table>
                                    <tr><td><label> {{item.name}} </label></td></tr>
                                    <tr v-if="item.id==1">
                                        <td>
                                            <div class="sku-color">                       
                                                <b-row v-for="(item,index) in skuData1" :key="index">
                                                    <b-input-group>
                                                        <b-input-group-prepend is-text>
                                                            <input type="checkbox" :checked="item.checked" @change="addSpe1(item,1)">
                                                        </b-input-group-prepend>
                                                        <b-form-input type="text" v-model="item.name" placeholder="请输入颜色" ></b-form-input>
                                                        <b-form-input type="text" v-model="item.remark" placeholder="请输入图片地址"></b-form-input>
                                                        <b-form-input type="text" v-model="item.id" hidden></b-form-input>
                                                    </b-input-group>
                                                </b-row>
                                                <b-row >
                                                    <b-input-group>
                                                        <b-input-group-prepend is-text>
                                                            <input type="checkbox" v-model="skuItem1.checked" @change="addSpe(1)"  >
                                                        </b-input-group-prepend>
                                                        <b-form-input type="text" v-model="skuItem1.name"  placeholder="请输入颜色" ></b-form-input>
                                                        <b-form-input type="text" v-model="skuItem1.remark"  placeholder="请输入图片地址"></b-form-input>
                                                        <b-form-input type="text" v-model="skuItem1.id" hidden></b-form-input>
                                                    </b-input-group>
                                                </b-row>                                         
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="item.id==2">
                                        <td>
                                            <div class="sku-size">
                                                <b-row v-for="item in skuData2" :key="item.index">
                                                    <b-input-group>
                                                        <b-input-group-prepend is-text>
                                                            <input type="checkbox" :checked="item.checked" @change="addSpe1(item,2)">
                                                        </b-input-group-prepend>
                                                        <b-form-input type="text"  v-model="item.name" placeholder="请输入自定义尺寸"></b-form-input>   
                                                        <b-form-input type="text" v-model="item.id" hidden></b-form-input>                                          
                                                    </b-input-group>
                                                </b-row>
                                                <b-row>
                                                    <b-input-group>
                                                        <b-input-group-prepend is-text>
                                                            <input type="checkbox" v-model="skuItem2.checked" @change="addSpe(2)">
                                                        </b-input-group-prepend>
                                                        <b-form-input type="text"  v-model="skuItem2.name" placeholder="请输入自定义尺寸"></b-form-input>  
                                                        <b-form-input type="text" v-model="skuItem2.id" hidden></b-form-input>                                                
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
                                        {{data.item[0].name}}
                                    </template>
                                    <template slot="size" slot-scope="data">
                                        {{data.item[1].name}}
                                    </template>
                                    <template slot="retail_price" slot-scope="data">
                                        <b-form-input v-model="data.item[2].retail_price"></b-form-input>
                                    </template>
                                    <template slot="integral" slot-scope="data">
                                        <b-form-input v-model="data.item[2].integral"></b-form-input>
                                    </template>
                                    <template slot="goods_number" slot-scope="data">
                                        <b-form-input v-model="data.item[2].goods_number"></b-form-input>
                                    </template>
                                    <!-- <template slot="id" slot-scope="data">                                     
                                        <b-form-input v-model="data.item[2].id"></b-form-input>
                                    </template>
                                    <template slot="colorId" slot-scope="data">                                     
                                        <b-form-input v-model="data.item[0].id"></b-form-input>
                                    </template>
                                    <template slot="sizeId" slot-scope="data">                                     
                                        <b-form-input v-model="data.item[1].id"></b-form-input>
                                    </template>
                                    <template slot="goods_specification_ids"  slot-scope="data">
                                         <b-form-input v-model="data.item[2].goods_specification_ids"></b-form-input>
                                    </template> -->
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
    export default{
        name:'goodsStandard',
        components:{

        },
        data : () => {
            return {
                goodId:null,
                skuData1:[],
                skuItem1:{
                    name:'',
                    remark:'',
                    checked:false,
                    id:''
                },
                skuData2:[],
                skuItem2:{
                    name:'',
                    checked:false,
                    id:''
                },
                goodsSkuList: [],
                fieldsSkuList:{
                    // color:{label:'颜色',sortable:false},
                    // size:{label:'尺寸',sortable:false},
                    // goods_number:{label:'库存',sortable:false},
                },
                speData:[],
                goodsSkuGroup:{data:[]},
                goodsSkuTable:{data:[]},
                addGoodMsg:'',
                addGoodFlag:false,
                spdelete : [],
                skuTempId:[]
            }

        },
        async mounted () {
            let self = this;
            //新增/修改--商品id
            self.goodId=self.$route.params.id     
            //获取商品规格属性 be/product/list?goods_id=1181000
            self.getSpecification();        
        },
        methods : {
            //商品规格-- 通过商品id查到已设置的规格项
            async getSpecification(){
                let self = this;
                let result = await self.$http.get(`api/be/product/getSpecification`)
                console.log(result)
                //获取商品规格属性
                self.speData=result.data
                //生成表格的表头
                let skuName1='';
                let skuName2='';
                for(let i=0;i<self.speData.length;i++){
                    if(self.speData[i].id==1){
                        skuName1=self.speData[i].name;
                    }else if(self.speData[i].id==2){
                        skuName2=self.speData[i].name;
                    }
                }
                self.fieldsSkuList={
                    color:{label:skuName1,sortable:false},
                    size:{label:skuName2,sortable:false},                   
                    retail_price:{label:'价格'},
                    integral:{label:'积分'},
                    goods_number:{label:'库存',sortable:false}
                    // id:{lable:'ID'},
                    // colorId:{lable:'颜色ID'},
                    // sizeId:{lable:'尺寸ID'},
                    // goods_specification_ids:{lable:'id组合'}
                }
                
                //根据商品id获取到规格 specListArr-商品规格  productList--规格表格
                let resultSpe = await self.$http.get(`api/be/product/list?goods_id=${self.goodId}`)
                let specListArr=resultSpe.data.specificationList
                let productList=resultSpe.data.productList
                //特殊情况 商品初始无规格后期新增规格
                if(specListArr.length==0 && productList.length>0){
                    productList=[];
                }
                //商品规格
                if(specListArr.length>0){
                    for(var i=0;i<specListArr.length;i++){
                        //1--颜色 2--规格 
                        if(specListArr[i].specification_id==1){
                            self.skuData1.push({
                                name:specListArr[i].value,
                                remark:specListArr[i].pic_url,
                                checked:true,
                                id:specListArr[i].id
                            })
                        }else if(specListArr[i].specification_id==2){
                            self.skuData2.push({
                                name:specListArr[i].value,
                                checked:true,
                                id:specListArr[i].id
                            })
                        }
                    }
                } 
                //self.goodsSkuList.push(['浅杏粉','1.5m床垫*1+枕头*2','价格'，'积分',{goods_number:100},'id'])
                //商品id--生成商品规格table--self.goodsSkuList             
                if(productList.length>0){
                    //skuListTemp 临时存放表格每一项信息
                    let skuListTemp=[];
                    for(let i=0;i<productList.length;i++){
                        let cuttId=productList[i].goods_specification_ids.split('_');
                        for(let t=0;t<cuttId.length;t++){
                            let spid = cuttId[t];                           
                            for(var j=0;j<specListArr.length;j++){
                                if(spid==specListArr[j].id){
                                    skuListTemp.push({name:specListArr[j].value,id:specListArr[j].id});
                                }
                            }
                        }
                        skuListTemp.push({retail_price:productList[i].retail_price,integral:productList[i].integral,goods_number:productList[i].goods_number,id:productList[i].id,goods_specification_ids:productList[i].goods_specification_ids});    
                        self.goodsSkuList.push(skuListTemp);                 
                        skuListTemp = [];
                    }
                }
                //深拷贝--页面初始加载--用于表格数据id赋值
                self.skuTempId=[...self.goodsSkuList] 
                console.log(self.goodsSkuList)
            },
            addSpe(type){
                let self=this;
                //每输入勾选一条规格自动创建一条空输入区域   1--颜色 2--规格                    
                if(type==1){
                    self.skuData1.push(self.skuItem1);
                    self.skuItem1={
                        checked:false,
                        name:'',
                        remark:'',
                        id:''
                    }
                }else if(type==2){
                    self.skuData2.push(self.skuItem2);
                    self.skuItem2={
                        checked:false,
                        name:'',
                        id:''
                    }
                }
            },
            addSpe1(item,type){
                let self=this;
                //点击已勾选项删除此项 1--颜色 2--规格
                if(type==1){
                    let index=self.skuData1.indexOf(item)
                    if(item.checked){
                        self.skuData1.splice(index,1)
                        //self.spdelete 删除的规格id
                        self.spdelete.push(item.id)
                    }
                }else if(type==2){
                    let index=self.skuData2.indexOf(item)
                    if(item.checked){
                        self.skuData2.splice(index,1)
                        //self.spdelete 删除的规格id
                        self.spdelete.push(item.id)
                    }
                }
            },
            async getSkuData (){
                let self = this;
                // skuData1NameArr--存放skuData1的name/id skuData2NameArr--存放skuData2的name/id  goodsSkuTempArr--表格中每条信息tr
                //self.goodsSkuGroup 每条sku的详情数组--返给后台生成id
                let skuData1NameArr=[];
                let skuData2NameArr=[];
                let goodsSkuTempArr = [];
                self.goodsSkuGroup.data=[];
                self.goodsSkuList=[];

                //颜色数组                                
                for(let i=0;i<self.skuData1.length;i++){
                    if(self.skuData1[i].name){
                        skuData1NameArr.push({name:self.skuData1[i].name,id:self.skuData1[i].id})
                        self.goodsSkuGroup.data.push({
                            id:self.skuData1[i].id,
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
                        skuData2NameArr.push({name:self.skuData2[i].name,id:self.skuData2[i].id});
                        self.goodsSkuGroup.data.push({
                            id:self.skuData2[i].id,
                            goods_id:self.goodId,
                            specification_id:2,
                            value:self.skuData2[i].name
                        })
                    }
                }

                //return false;
                self.goodsSkuGroup.spdelete = self.spdelete;
                let resultStore = await self.$http.post(`api/be/product/storeSp`,self.goodsSkuGroup);            
                if(resultStore.data.length>0){
                    let temp1 = 0;
                    let temp2 = 0;
                    for(var i=0;i<resultStore.data.length;i++){
                        //1--颜色 2--规格 
                        if(resultStore.data[i].specification_id==1){
                            self.skuData1[temp1].id=skuData1NameArr[temp1].id=resultStore.data[i].id;
                            //skuData1NameArr[temp1].id=resultStore.data[i].id;
                            temp1++;
                        }
                        if(resultStore.data[i].specification_id==2){
                            self.skuData2[temp2].id=skuData2NameArr[temp2].id=resultStore.data[i].id;
                            //skuData2NameArr[temp2].id=resultStore.data[i].id;
                            temp2++;
                        }
                    }
                }

                //skuData1NameArr--skuData2NameArr 生成表格数据
                //self.goodsSkuList ['浅杏粉','1.5m床垫*1+枕头*2','价格'，'积分','库存','id','颜色id','尺寸id']
                for (let t = 0; t < skuData1NameArr.length; t++) {
		            for (let i = 0; i < skuData2NameArr.length; i++) { 
                        goodsSkuTempArr = [];   
		                goodsSkuTempArr.push({name:skuData1NameArr[t].name,id:skuData1NameArr[t].id});
                        goodsSkuTempArr.push({name:skuData2NameArr[i].name,id:skuData2NameArr[i].id});                       
                        goodsSkuTempArr.push({retail_price:'',integral:'',goods_number:'',goods_specification_ids:skuData1NameArr[t].id+'_'+skuData2NameArr[i].id,id:''});
                        self.goodsSkuList.push(goodsSkuTempArr);
		            }
                }

                //skuTempId深拷贝已保存的table数据。通过比较goods_specification_ids相等，赋值id
                //self.goodsSkuList表格数据
                for(let j=0;j<self.skuTempId.length;j++){
                    for(let temp=0;temp<self.goodsSkuList.length;temp++){
                        if(self.skuTempId[j][2].goods_specification_ids==self.goodsSkuList[temp][2].goods_specification_ids){
                            self.goodsSkuList[temp][2].id=self.skuTempId[j][2].id  
                            self.goodsSkuList[temp][2].goods_number=self.skuTempId[j][2].goods_number                 
                            self.goodsSkuList[temp][2].integral=self.skuTempId[j][2].integral
                            self.goodsSkuList[temp][2].retail_price=self.skuTempId[j][2].retail_price
                        }
                    }                   
                }
                               
            },
            async saveGoodSku(evt){
                evt.preventDefault();
                let self = this
                //self.goodsSkuTable--返给后台的表格数据  self.goodsSkuList表格创建数据
                self.goodsSkuTable.data=[];                           
                for(let i=0;i<self.goodsSkuList.length;i++){
                    self.goodsSkuTable.data.push({
                        id:self.goodsSkuList[i][2].id,
                        goods_id:self.goodId,
                        goods_specification_ids:self.goodsSkuList[i][2].goods_specification_ids,
                        goods_number:self.goodsSkuList[i][2].goods_number,
                        retail_price:self.goodsSkuList[i][2].retail_price,
                        integral:self.goodsSkuList[i][2].integral
                    })
                }
                //return false;
                let resultSku = await self.$http.post(`api/be/product/storeProduct`,self.goodsSkuTable)
                if(resultSku.errno==0){
                    if(resultSku.data.length>0){
                        for(let i=0;i<resultSku.data.length;i++){
                            self.goodsSkuTable.data[i].id=self.goodsSkuList[i][2].id=resultSku.data[i].id;             
                        }
                    }
                    self.showModal ();
                    self.addGoodMsg='保存成功';
                    //addGoodFlag 如果添加成功，点击确定按钮，关闭弹窗，返回商品列表页
                    self.addGoodFlag=true;
                }else{
                    self.showModal ();
                    self.addGoodMsg='保存失败';
                } 
                //深拷贝--保存提交--用于表格数据id赋值--
                self.skuTempId=[...self.goodsSkuList]                  
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
.sku-size>.row{margin:10px 10px 10px 0;}

.struct button,.speBtn{margin:20px 50px;}
.speTable{padding: 10px;}

</style>
