<template>
    <div class="contain-category">
    <div class="tabBtn">全部类别：
      <el-button-group>
        <span
            :class="classState == '1' ? 'primary' : 'deafult'"
            @click="changeState('1')"
            class="btn"
        >全部</span>
        <span
            :class="classState == '2' ? 'primary' : 'deafult'"
            @click="changeState('2')"
            class="btn"
        >案例</span>
        <span
            :class="classState == '3' ? 'primary' : 'deafult'"
            @click="changeState('3')"
            class="btn"
        >文章</span>
        <span
            :class="classState == '4' ? 'primary' : 'deafult'"
            @click="changeState('4')"
            class="btn"
        >图册</span>
        <span
            :class="classState == '5' ? 'primary' : 'deafult'"
            @click="changeState('5')"
            class="btn"
        >全景图</span>
        <span
            :class="classState == '6' ? 'primary' : 'deafult'"
            @click="changeState('6')"
            class="btn"
        >小视频</span>
      </el-button-group>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            classState: '1',
        }
    },
    methods: {
        // 选择不同的内容类型
        changeState(i) {
            this.classState = i
            var contentType
            switch (i) {
                case '1' :
                    contentType = null
                    break
                case '2' :
                    contentType = 'case'
                    break
                case '3' :
                    contentType = 'article'
                    break
                case '4' :
                    contentType = 'atlas'
                    break
                case '5' :
                    contentType = 'panorama'
                    break
                default :
                    contentType = 'minivideo'
                    break
            }
            this.$emit('changeContentType', contentType)
        }
    }
}
</script>

<style scoped>
.tabBtn {
    height: 40px;
    line-height: 40px;
}
.contain-category {
    display: flex;
    justify-content: space-between;
    margin: 0 32px;
    margin-bottom: 12px;
}
.el-button-group > .btn {
    margin-left: 20px;
    border-radius: 5px;
    border: none;
    width: 58px;
    height: 24px;
    line-height: 24px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
}
.el-button-group > .primary {
    background-color: #fd4343;
    color: #fff;
}
.el-button-group > .default {
    background-color: #fff;
}
</style>
