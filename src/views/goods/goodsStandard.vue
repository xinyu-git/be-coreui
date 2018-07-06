<template>
   <div class="content">
       <div class="container-fluid">
            <b-card>
                <b-form >
                    <b-row>
                        <b-col sm="1"><label>商品规格</label></b-col>
                        <b-col col-sm-12>
                            <b-row class="struct">
                                <table>
                                    <tr><td><label >颜色</label></td></tr>
                                    <tr>
                                        <td>
                                            <div class="sku-color">
                                                <b-row v-for="item in skuData" :key="item.index">
                                                    <b-input-group>
                                                        <b-input-group-prepend is-text>
                                                            <input type="checkbox" v-model="item.checked" @click="select(item)">
                                                        </b-input-group-prepend>
                                                        <b-form-input type="text" v-model="item.skuTypeVal1" placeholder="请输入颜色"></b-form-input>
                                                        <b-form-input type="text" v-model="item.skuTypeVal2" placeholder="请输入图片地址"></b-form-input>
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
                                                <b-input-group>
                                                        <b-input-group-prepend is-text>
                                                            <input type="checkbox" aria-label="Checkbox for following text input">
                                                        </b-input-group-prepend>
                                                        <b-form-input type="text" placeholder="请输入自定义尺寸"></b-form-input>                                                      
                                                </b-input-group>
                                                <b-input-group>
                                                        <b-input-group-prepend is-text>
                                                            <input type="checkbox" aria-label="Checkbox for following text input">
                                                        </b-input-group-prepend>
                                                        <b-form-input type="text" placeholder="请输入自定义尺寸"></b-form-input>                                                      
                                                </b-input-group>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </b-row>
                            <b-row class="struct">
                                <table>
                                    <tr><td><label >商品销售规格</label></td></tr>
                                    <tr>
                                        <td>
                                            <div class="sku-table col-lg-12">
                                                <table striped hover border>
                                                    <tr>
                                                        <td>颜色分类</td>
                                                        <td>尺码分类</td>
                                                        <td>库存</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
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
                skuData:[
                    {
                        checked:false,
                        skuTypeVal1:null,
                        skuTypeVal2:null
                    }
                ],
                good_backup:{},
                goodStandardForm: {
                    
                },
                a:'2'
            }
        },
        async mounted () {

        },
        methods : {
            async getGoodInfo(){
                
            },
            async saveGood(){
                             
            },
            select (item){
                let self=this;
                let index=self.skuData.indexOf(item)
                console.log(index)
                console.log(self.skuData[index].checked)
               // console.log(this.skuData.indexOf(item))
               
                if(self.skuData[index].checked){
                   
                    //let i=self.skuData[index]
                    console.log(index)
                    self.skuData.splice(index,1)
                }else{
                     self.skuData.push({
                        checked:false,
                        skuTypeVal1:null,
                        skuTypeVal2:null
                    })
                    self.skuData[index].checked=!self.skuData[index].checked;
                    //console.log(self.skuData)
                    //console.log(self.skuData.checked)                    
                }
                console.log(self.skuData)
                
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
.sku-size{display:flex;}
.sku-color>.row{margin-bottom: 10px;}
</style>
