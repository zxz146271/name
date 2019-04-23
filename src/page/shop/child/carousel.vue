<template>
    <div class="wrap">
        <p class="tips">{{this.tips}}</p>
        <div>
            <upload v-for="(img, index) in imgs" :label="img.label" :imgUrl="img.imgUrl" :key="index" :order="index" :type="img.type" :allLength="imgs.length" :buttonText="img.buttonText" :link="img.link"
                @show="showPic" @delete="delPic" @increase="orderInc" @decrease="orderDesc" @update="updatePic" @add="addNew" @link="linkChange"></upload>
        </div>
        <div class="opeartion">
            <el-button class="submit_add" @click="resetData">
                取消
            </el-button>
            <el-button  class="submit" @click="saveData">
                保存
            </el-button>
        </div>
        <el-dialog :visible.sync="dialogVisible" >
            <img width="100%" :src="imgUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import upload  from '@/components/shop/upload';
import pathMap from '@/components/shop/miniAppPathMap';
export default {
    name: 'carousel',
    data () {
        return {
            tips: '*目前首页轮播图，仅在选择模板6时才会展示，最多可展示6个轮播图',
            origin: [],
            imgs: [],
            postData: [],
            dialogVisible: false,
            imgUrl: '',
            maxNum: 5,
            pathLists: pathMap
        }
    },
    components: {
        upload
    },
    mounted() {
        this.$api.getCarouselData().then(res => {
            if (res.data.length && res.code === 0) {
                //转换数据
                this.imgs = res.data.map((item, index) => this.createItem(item, index));
                if (this.imgs.length <= this.maxNum) {
                    this.imgs.push(this.createItem({}, this.imgs.length));
                }
                this.imgs.map(item => {
                    this.origin.push(Object.assign({}, item));
                });
            } else {
                this.imgs.push(this.createItem({}, this.imgs.length));
            }
        });

    },
    methods: {
        createItem(obj, index) {
            const labels = [
                '图片一',
                '图片二',
                '图片三',
                '图片四',
                '图片五',
                '图片六'
            ];
            return {
                label: labels[index] || '',
                imgUrl: obj['filePath'] || '',
                type: 'upload',
                buttonText: '更改图片',
                link: obj['pathValue'] ||''
            };
        },
        showPic(obj) {
            this.dialogVisible = true;
            this.imgUrl = obj.imgUrl;
        },
        delPic(obj) {
            const order = obj.order;
            this.imgs[order]['imgUrl'] = '';
            this.imgs[order]['link'] = '';
        },
        updatePic(obj) {
            const order = obj.order;
            this.imgs[order]['imgUrl'] = obj.imgUrl;
        },
        addNew(obj) {
            if (obj.clickBtn) {
                return;
            }
            if (this.imgs.length <= this.maxNum) {
                this.imgs.push(this.createItem({}, this.imgs.length));
            }
        },
        linkChange(obj) {
            const order = obj.order;
            this.imgs[order]['link'] = obj.link;
        },
        orderInc(obj) {
            const order = obj.order;
            const current = this.imgs[order - 1];
            this.$set(this.imgs, order - 1, this.imgs[order]);
            this.$set(this.imgs, order, current);
        },
        orderDesc(obj) {
            const order = obj.order;
            const current = this.imgs[order + 1];
            this.$set(this.imgs, order + 1, this.imgs[order]);
            this.$set(this.imgs, order, current);
        },
        resetData() {
            this.imgs = [];
            this.origin.map(item => {
                this.imgs.push(Object.assign({}, item));
            });
        },
        saveData() {
            let postData = [];
            this.imgs.map(item => {
                if(item.imgUrl) {
                    postData.push({
                        filePath: item.imgUrl,
                        pathType: this.pathLists[item.link] || '',
                        pathValue: item.link
                    });
                }
            });
            this.$api.saveCarouselData({
                banners: JSON.stringify(postData)
            }).then(res => {
                this.$message({
                    message: res.msg,
                    type: res.code === 0 ? 'success' : 'error'
                });
            });
        }
    }
}
</script>

<style lang="sass" scoped>
.wrap
    padding-top: 14px!important
    padding-left: 32px!important
    .tips
        line-height: 20px
        font-size: 14px
        color: rgba(144, 147, 153, 0.85)
    .opeartion
        display: flex
        justify-content: flex-start
        margin-top: 30px
        margin-left: 80px
        button
            padding: 15px 57px
        .submit
            color: #fff
            background-image: linear-gradient(90deg, #E70020, #fd4343, #fe5e55)
            border: 0
            &:hover
                opacity: 0.9
</style>