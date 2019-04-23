<template>
    <div class="recommendGoods">
        <p class="notice padleft">*最多可添加10个推荐商品</p>
        <el-form status-icon ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item>
                <upload v-for="(img, index) in imgs" :label="img.label" :imgUrl="img.imgUrl" :key="index" :order="index" :type="img.type" :allLength="imgs.length" :goodName="img.goodName" @show="showPic" @delete="delPic" @increase="orderInc" @decrease="orderDesc" @add="addNew"></upload>
            </el-form-item>
            <!-- <el-form-item label="推荐商品">
                <div class="input" @click="changeFlag">+</div>
            </el-form-item> -->
            <el-form-item>
                <span class="label">推荐商品</span>
                <el-checkbox v-model="checked" fill="#FE4343">首页推荐商品</el-checkbox>
                <p class="notice">*目前仅可在首页推荐商品区域展示</p>
            </el-form-item>
            <el-form-item>
                <span class="button" @click="cancelSave">取消</span>
                <span class="button save" @click="submitSave">保存</span>
            </el-form-item>
        </el-form>
        <!-- 添加商品 -->
        <el-dialog
            :visible.sync="goodsFlag"
                width="35%"
                class="import-dialog"
                :before-close="closeDialog">
                <div slot="title" class="left-title">
                    <span class="top">选择商品</span>
                </div>
                <div class="popup-search">
                    <!-- <search @searchValue="searchValue"></search> -->
                </div>
                <div class="comm-list">
                    <recommendItem :good='Goods' @addProductOk="addProductOk"/>
                    <!-- <commodity-item @checkBokChange="checkBokChange" v-for="(item, index) in Goods" :key="index" :item="item" :index="index"></commodity-item> -->
                </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible" >
            <img width="100%" :src="imgUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import upload  from '@/components/shop/upload';
import search from '@/components/public/search'
import recommendItem from '@/components/public/recommendItem'
import defaultImg from '../../../assets/image/image_placeholder.png'
export default {
    name: 'recommendGoods',
    data () {
        return {
            goodsFlag: false,   // 显示商品
            checked: false,     // 首页推荐选择
            Goods: [],  // 商品列表
            seaValue: '',    // 搜索值
            storeInfo: {},
            origin: [], //原始获取值
            imgs: [/*{
                label: '推荐商品',
                imgUrl: 'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=377818163,1111141501&fm=85&s=ECCA7A2B4CB225B35498150E010080A1',
                type: 'text',
                goodName: '简约客厅系列沙发套装A'
            }*/],
            postData: [],
            dialogVisible: false, //图片弹窗标识
            imgUrl: '',
            maxNum: 9,
            pageNo: 1,
            pageSize: 10,
            delOne: {},
            checkBokGood: []
        }
    },
    components:{
        search,
        recommendItem,
        upload
    },
    mounted() {
        //如果原来存储的数据 没有值 那么新建
        if (this.imgs.length <= this.maxNum) {
            this.imgs.push(this.createItem({label: '推荐商品'}, this.imgs.length));
        }
        this.getStGoodsInfoAllList();
        this.getProductGood();
    },
    methods: {
        getStGoodsInfoAllList() {
            let params = {
                goodsName: this.seaValue,
                state: 0,
                storeId: this.storeInfo
            }
            this.$api.getStGoodsInfoAllList(params).then(res => {
                if(res && res.code == 0){
                    this.Goods = res.data
                }
            })
        },
        createItem(obj, index) {
            return {
                label: obj['label'] || '',
                imgUrl: '',
                type: 'text',
                goodName: '',
                goodsId: ''
            }
        },
        showPic(obj) {
            this.dialogVisible = true;
            this.imgUrl = obj.imgUrl;
        },
        closeDialog () {
            this.goodsFlag = false
            // 获取所有商品信息  用于判断是否选中
        },
        // 搜索传值
        searchValue(value) {

        },
        // 选择推荐的商品
        checkBokChange(value) {

        },
        // 取消
        addProductsClose() {
            this.goodsFlag = false
            this.imgs.splice(0, this.imgs.length-1)
            this.getStGoodsInfoAllList()
        },
        convertData(selectedArray) {
            let result = [];
            if (selectedArray.length) {
                selectedArray.forEach((item) => {
                    this.imgs.find(old => {
                        if (item.goodsId !== old.goodsId && !old.goodsId) {
                            result.push({
                                label: '',
                                imgUrl: item.firstPictureUrl ? item.firstPictureUrl : defaultImg,
                                type: 'text',
                                goodName: item.goodsName,
                                goodsId: item.goodsId
                            });
                        }
                    })
                })
            }
            return result;
        },
        resetSelectData() {
            this.Goods.forEach((item) => {
                item.choose = false;
            });
        },
        ToHeavy(arr) {
            var res =[];
        　　 var json = {};
        　　for(var i=0;i<arr.length;i++){
        　　　　if(!json[arr[i].goodsId]){
        　　　　　　res.push(arr[i]);
        　　　　　　json[arr[i].goodsId] = 1;
        　　　　}
        　　}
        　　return res;
        },
        // 确定选择的推荐商品
        addProductOk(good) {
            // console.log(good);
            // console.log(this.imgs);
            // console.log(this.convertData(good));
            let temp;
            if(this.imgs.length > 1){
                temp = this.imgs.splice(0, this.imgs.length - 1)
            }
            this.checkBokGood = [...good];
            let selected = this.convertData(good);
            selected = temp ? [...temp, ...selected] : [...selected]
            selected = this.ToHeavy(selected)
            if (selected.length > this.maxNum) {
                this.imgs = [...selected.splice(0, this.maxNum + 1)];
            } else {
                this.imgs = [...selected];
            }
            if (this.imgs.length <= this.maxNum) {
                this.imgs.push(this.createItem({}, this.imgs.length));
            }
            this.$set(this.imgs[0], 'label', '推荐商品');
            this.goodsFlag = false;
        },
        addLastGood() {
            let emptyNum = 0
            if (this.imgs.length) {
                if (this.imgs[this.imgs.length-1]['goodsId']) {
                    this.imgs.map(item => {
                        if (!item.goodsId) {
                            emptyNum += 1;
                        }
                    });
                    if (emptyNum === 0 && this.imgs.length <= this.maxNum) {
                        this.imgs.push(this.createItem({}, this.imgs.length));
                    }
                } else {
                    this.imgs[this.imgs.length-1] = this.createItem({}, this.imgs.length);
                }
            } else {
                this.imgs.push(this.createItem({label: '推荐商品'}, this.imgs.length));
            }
        },
        /*add*/
        delPic(obj) {
            let index = obj.order;
            this.delOne = this.imgs.splice(index, 1);
            let params = {id: this.delOne[0].id}
            if(params){
                this.deleteRecommendGoods(params)
            }
            this.resetSelectData();
            this.$set(this.imgs[0], 'label', '推荐商品');
            this.addLastGood();
        },
        deleteRecommendGoods(params) {
            this.$api.deleteRecommendGoods(params).then(res => {
                if(res && res.code == 0){
                    this.$message.success("删除成功")
                }
            })
        },
        orderInc(obj) {
            const order = obj.order;
            const current = this.imgs[order - 1];
            this.imgs[order]['label'] = this.imgs[order - 1]['label'];
            this.imgs[order - 1]['label'] = '';
            this.$set(this.imgs, order - 1, this.imgs[order]);
            this.$set(this.imgs, order, current);
            this.$set(this.imgs[0], 'label', '推荐商品');
        },
        orderDesc(obj) {
            const order = obj.order;
            const current = this.imgs[order + 1];
            this.imgs[order]['label'] = this.imgs[order + 1]['label'];
            this.imgs[order + 1]['label'] = '';
            this.$set(this.imgs, order + 1, this.imgs[order]);
            this.$set(this.imgs, order, current);
            this.$set(this.imgs[0], 'label', '推荐商品')
        },
        getProductGood() {
            let params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize
            }
            this.imgs = [];
            this.$api.recommendGoodsList(params).then(res => {
                if(res && res.code == 0){
                    res.data.forEach((item, index) => {
                        this.imgs.push({
                            imgUrl: item.firstPictureUrl,
                            goodName: item.goodsName,
                            label: index == 0 ? '推荐商品' : '',
                            type: 'text',
                            goodsId: item.goodsId,
                            storeId: item.storeId,
                            id: item.id
                        })
                        this.checked = item.showType == 1 ? true : false
                    });
                    this.addLastGood();
                }
            })
        },
        submitSave() {
            let temp = []
            let imgs = [];
            if (this.imgs.length <= this.maxNum) {
                imgs = this.imgs.splice(0, this.imgs.length - 1);
            } else {
                imgs = [...this.imgs];
            }
            imgs.forEach(item => {
                temp.push({
                    goodsId: item.goodsId,
                    storeId: item.storeId,
                    goodsName: item.goodName,
                    firstPictureUrl: item.imgUrl,
                    id: item.id,
                    showType: this.checked ? '1' : '0'
                })
            })
            let params = JSON.stringify(temp)
            this.$api.recommendGoods({stRecommendGoodsVoJson: params}).then(res => {
                if(res.code == 0){
                    this.getProductGood()
                    this.$message.success('添加成功')
                }else{
                    this.$message.error('添加失败')
                }
            })
        },
        cancelSave() {
            this.getProductGood()
        },
        addNew() {
            this.goodsFlag = true;
        }
    }
}
</script>
<style lang="scss" scoped>
.recommendGoods{
    .notice{
        color:#909399;
        font-size:14px;
        font-family:Source Han Sans SC;
        font-weight:400;
    }
    .padleft{
        padding-left:30px;
    }
    .ruleForm{
        margin-top: 25px;
        .label{
            display: inline-block;
            width: 100px;
            font-size: 14px;
            color: #606266;
        }
        .input{
            width: 80px;
            height: 80px;
            border: 1px dashed #909399;
            text-align: center;
            line-height: 70px;
            font-size: 50px;
            color: #909399;
            border-radius: 4px;
            cursor: pointer;
        }
        .notice{
            color:#909399;
            font-size:14px;
            font-family:Source Han Sans SC;
            font-weight:400;
        }
        .button{
            display: inline-block;
            width: 140px;
            height: 44px;
            border: 1px solid #DCDFE6;
            border-radius: 4px;
            text-align: center;
            line-height: 44px;
            color: #606266;
            font-size: 12px;
            cursor: pointer;
            margin-right:20px;
        }
        .save{
            background: #FE4343;
            color:#fff;
        }
    }
    .import-dialog{
        .popup-search{
            padding: 0 30px;
        }
        .comm-list{
            padding: 0 30px;
            height: 500px;
            overflow: auto;
        }
        .btns{
            display: flex;
            justify-content:center;
            margin-top: 30px;
        }
    }
}
</style>
