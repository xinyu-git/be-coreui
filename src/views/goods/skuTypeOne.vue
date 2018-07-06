<template>
    <b-input-group>
        <b-input-group-prepend is-text>
             <input type="checkbox" >
        </b-input-group-prepend>
        <b-form-input type="text" v-model="skuTypeVal1" placeholder="请输入颜色"></b-form-input>
        <b-form-input type="text" v-model="skuTypeVal2" placeholder="请输入图片地址"></b-form-input>
    </b-input-group>
</template>
<script>
    export default{
        props: ['item1'],
        data : () => {
            return {
                skuData:[],
                skuTypeVal1:'',
                skuTypeVal2:'',

            }
        },
        async mounted () {
            console.log(this.item)
        },
        methods : {
            async getGoodInfo(){
                
            },
            async saveGood(){
                             
            }
        }
    }
</script>
