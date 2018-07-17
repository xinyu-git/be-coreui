<template>
   <div class="content">
       <div class="content-nav">
            <div class="breadcrumb-box">
                <b-breadcrumb :items="items"/>
            </div>
            <div class="addGoods-btn">
                <!-- <b-button variant='primary lg'>返回列表</b-button> -->
            </div>
        </div>
       <div class="container-fluid">
            <b-card>
                <b-form @submit="saveGood" >
                    <b-form-group id="goodsNameLabel" 
                            horizontal
                            :label-cols="1"
                            label-size="md" 
                            label="商品名称" 
                            label-class="text-sm-right"
                            label-for="goodsNameInput">
                        <b-form-input   id="goodsNameInput"
                                        required
                                        size="md" 
                                        class="col-sm-3"
                                        v-model="goodForm.name"
                                        placeholder="请输入商品名称"></b-form-input>
                    </b-form-group>
                    <b-form-group id="goodsDescLabel" 
                            horizontal
                            :label-cols="1"
                            label-size="md" 
                            label="商品描述" 
                            label-class="text-sm-right"
                            label-for="goodsEditor">
                            <markdown-editor required autoinit="autoinit" v-model="goodForm.goods_desc" ref="markdownEditor" 
                                        id="goodsEditor" preview-class="markdown-body" ></markdown-editor>
                    </b-form-group>
                    <b-form-group id="goodsPicLabel" 
                            horizontal
                            :label-cols="1"
                            label-size="md" 
                            label="商品图片" 
                            label-class="text-sm-right"
                            label-for="goodsPicInput">
                        <b-form-input   id="goodsPicInput"
                                        required
                                        size="md" 
                                        class="col-sm-4"
                                        v-model="goodForm.list_pic_url"
                                        placeholder="请输入商品图片地址"></b-form-input>
                    </b-form-group>
                    <b-form-group id="goodsFocusPicLabel" 
                            horizontal
                            :label-cols="1"
                            label-size="md" 
                            label="商品轮播图" 
                            label-class="text-sm-right"
                            label-for="goodsFocusPicInput">
                        <b-form-textarea   id="goodsFocusPicInput"
                                        size="md" 
                                        class="col-sm-6"
                                        :rows="3"
                                        v-model="goodForm.gallerys"
                                        placeholder="请输入商品轮播图地址,多个图片以“;”(英文符合)分割">
                                    </b-form-textarea>                                      
                    </b-form-group>
                     
                    <b-form-group id="goodsPriceLabel" 
                            horizontal
                            :label-cols="1"
                            label-size="md" 
                            label="商品价格" 
                            label-class="text-sm-right"
                            label-for="goodsPriceInput">
                        <b-form-input   id="goodsPriceInput"
                                        required
                                        size="md" 
                                        class="col-sm-2"
                                        type="number"
                                        v-model="goodForm.retail_price"
                                        placeholder="请输入商品价格"></b-form-input>
                    </b-form-group>
                    <b-form-group id="goodsIntegralLabel" 
                            horizontal
                            :label-cols="1"
                            label-size="md" 
                            label="积分" 
                            label-class="text-sm-right"
                            label-for="goodsIntegralInput">
                        <b-form-input   id="goodsIntegralInput"
                                        required
                                        size="md" 
                                        class="col-sm-2"
                                        type="number"
                                        v-model="goodForm.integral"
                                        placeholder="请输入积分"></b-form-input>
                    </b-form-group>
                    <b-form-group id="goodsTypeLabel" 
                            horizontal
                            :label-cols="1"
                            label="推荐类型" 
                            label-class="text-sm-right"
                            >
                            <div class="goodsTypeCheckbox">
                                <b-form-checkbox  v-model="goodForm.is_new" value="1" unchecked-value="0">新品</b-form-checkbox>                            
                                <b-form-checkbox  v-model="goodForm.is_hot" value="1" unchecked-value="0">人气</b-form-checkbox>
                            </div>
                    </b-form-group>
                    <b-form-group id="goodsOnSaleLabel" 
                            horizontal
                            :label-cols="1"
                            label="上架" 
                            label-class="text-sm-right"
                            >
                         <c-switch class="mx-1" color="info" v-model="goodForm.is_on_sale"  variant="3d" />
                    </b-form-group>
                    <b-form-group id="goodsStandard" 
                            horizontal
                            :label-cols="1"
                            label="添加规格" 
                            label-class="text-sm-right"
                            >
                         <c-switch class="mx-1" color="info" v-model="goodForm.standard" variant="3d"  />
                    </b-form-group>
                    <b-form-group id="goodsVolumeLabel" v-if="!goodForm.standard"
                            horizontal
                            :label-cols="1"
                            label-size="md" 
                            label="商品库存" 
                            label-class="text-sm-right"
                            label-for="goodsVolumeInput">
                        <b-form-input   id="goodsVolumeInput"
                                        required
                                        size="md" 
                                        class="col-sm-2"
                                        type="number"
                                        v-model="goodForm.goods_number"
                                        placeholder="请输入商品库存"></b-form-input>
                    </b-form-group>
                    <b-form-group id="goodsOrderLabel" 
                            horizontal
                            :label-cols="1"
                            label-size="md" 
                            label="排序" 
                            label-class="text-sm-right"
                            label-for="goodsOrderInput">
                        <b-form-input   id="goodsOrderInput"
                                        required
                                        size="md" 
                                        class="col-sm-2"
                                        type="number"
                                        v-model="goodForm.sort_order"
                                        ></b-form-input>
                    </b-form-group>                   
                    <b-form-group horizontal :label-cols="1">
                            <b-button type="submit" variant="primary">{{goodForm.standard ? '下一步' : '保存'}}</b-button>
                            <b-button type="button" variant="danger" @click="onCancel">取消</b-button>
                    </b-form-group>
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
import { Switch as cSwitch } from '@coreui/vue'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
    export default{
        name:'goodsAddPage',
        components:{
            cSwitch,
            markdownEditor
        },
        data : () => {
            return {
                configs:{
                    autofocus:true,
                    autosave:{
                        enabled:true,
                        uniqueId:'goodsEditor'
                    }                    
                },
                goodId:null,
                items: [{
                    text: '首页',
                    href: '#'
                }, {
                    text: '商品管理',
                    href: '#'
                }, {
                    text: '添加商品',
                    active: true
                }],
                saveBtnMsg:'保存',
                good_backup:{},
                goodForm: {
                    name:'',
                    goods_desc:'',
                    list_pic_url:'',
                    gallerys:'',
                    retail_price:'',
                    goods_number:'',
                    integral:'',
                    is_new:0,
                    is_hot:0,
                    is_on_sale:false,
                    sort_order:100,
                    standard:false
                },
                addGoodMsg:'',
                addGoodFlag:false
            }
        },
        async mounted () {
            let self=this
           self.goodId=this.$route.params.id
           //判断是新增/修改
           if(self.goodId!=-999){
               self.getGoodInfo();
           }

        },
        methods : {
            async getGoodInfo(){
                //修改--获取商品Id,渲染数据
                let self= this;
                let result = await self.$http.get(`api/be/goods/info?id=${self.goodId}`)
                console.log(result)
                self.goodForm = result.data;
                console.log(self.goodForm)
                //数据备份
                self.good_backup={...result.data};   
                //上架/规格--数字转布尔
                if(self.goodForm.is_on_sale==1){
                    self.goodForm.is_on_sale=true;
                }else if(self.goodForm.is_on_sale==0){
                    self.goodForm.is_on_sale=false
                }
                if(self.goodForm.standard==1){
                    self.goodForm.standard=true;
                }else if(self.goodForm.standard==0){
                    self.goodForm.standard=false
                }                             
            },
            async saveGood(evt){
                evt.preventDefault();
                let self=this;
                console.log(self.goodForm)
                //return false;  
                let result=await self.$http.post('api/be/goods/store',self.goodForm)
                if(self.goodForm.standard){
                    //有规格--获取商品id传入规格页面
                    let goodId=result.data.id;
                    self.$router.push({name:'goodsStandard',params:{id:goodId}})
                }else{ 
                    //无规格--直接保存商品                
                    if(result.errno==0){
                        self.showModal ();
                        self.addGoodMsg='添加商品成功';
                        this.addGoodFlag=true;
                    }else{
                        self.showModal ();
                        self.addGoodMsg='添加商品失败';
                    }
                }                             
            },
            onCancel(){
                let self=this;
                self.goodForm = {...self.good_backup};
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
@import 'simplemde/dist/simplemde.min.css';
@import '~github-markdown-css';
.content-nav{display:flex;background: #fff;margin-bottom: 1.5rem;padding:0 30px;}
.content-nav .breadcrumb-box{flex: 1;color:#8492A6;}
.content-nav .breadcrumb-box .breadcrumb{background: none;border:none;margin-bottom: 0;}
.addGoods-btn{width: auto;display:flex;align-items: center;}
.goodsTypeCheckbox{align-items: center;height: 100%;display: flex;}
.markdown-editor .CodeMirror {
  height: 200px;
}
</style>
