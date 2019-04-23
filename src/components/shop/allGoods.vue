<template>
    <div class="allGoods">
        <div class="allGoods-item" v-for="(item, index) in goodsList" :key="index">
            <el-radio :label="index" v-model="selectGoodsId" @change="chooseGoods">&nbsp;</el-radio>
            <img class="imgUrl" :src="item.firstPictureUrl" alt="">
            <div class="right">
                <h2>{{item.goodsName}}</h2>
                <p>商品编号:{{item.goodsCode}}</p>
                <p>货号:{{item.artNo}}</p>
                <p><span>规格:{{item.goodsSpecifications}}</span><span>型号:{{item.goodsModel}}</span></p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectGoodsId: null
        }  
    },
     props: {
         goodsList: {
             type: Array
         }
     },
     methods:{
         chooseGoods(){
             let data = this.goodsList[this.selectGoodsId]
             this.$emit('chooseGoods', data)
         }
     },
     onLoad(){
     }
}
</script>
<style lang="scss" scoped>
.allGoods{
    width:100%;
    padding:0 20px;
    .allGoods-item{
        display: flex;
        flex-direction: row;
        margin-bottom:15px;
        .el-radio{
            margin-top: 50px;
        }
        .imgUrl{
            width: 125px;
            height: 125px;
            margin:0 20px 0 15px;
        }
        .right{
            font-size: 12px;
            h2{
                color: #333333;
                font-weight: bold;
                margin-bottom:10px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            p{
                color: #909399;
                line-height: 25px;
                span{
                    margin-right:30px;
                }

            }
        }
    }
}
</style>


