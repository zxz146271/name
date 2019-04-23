<template>
    <div class="scascader" ref="scascader">
        <div class="s-con">
            <input type="text" :class=" focus ? 'focus' : '' " :placeholder="select.length>1?'':mainSelected.placeholder" @focus="changeState">
            <span class="sel-input" @click="changeState">
                <span v-for="(item, index) in selectMain" :key = "index" > {{item.label}} <em v-if="index != selectMain.length-1">></em></span>
            </span>
            <span class="icon">
                <i :class=" focus ? 'el-input__icon el-icon-arrow-down isSever' : 'el-input__icon el-icon-arrow-down'"></i>
            </span>
        </div>
        <div class="s-select" v-if="flag">
            <ul class="checked">
                <li v-for="(item, index) in select" :key="index" @click="changeMenu(index)" :class="menuIndex-1 == index ? 'active' :'' ">{{item.label}}</li>
            </ul>
            <ul class="sel-list" v-if = "menuIndex == 1">
                <li v-for="(item, index) in mainSelected.mainOptions" :key ="index" @click="changeOne(index, 1)"><span :class = " oneIndex==index ? 'active' : '' ">{{item.label}}</span></li>
            </ul>
            <ul class="sel-list" v-if = "menuIndex == 2">
                <li v-for="(item, index) in mainSelected.mainOptions[oneIndex].children" :key ="index" @click="changeOne(index)"><span :class="twoIndex==index?'active':''">{{item.label}}</span></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            focus: false,
            oneIndex:'',
            twoIndex: '',
            flag: false,
            menuIndex: 1,
            select: [{label:'主营类目'}],
            selectMain:[]
        }
    },
    props: ['mainSelected'],
    mounted() {
        document.addEventListener('click', (e) => {
            if (!this.$refs.scascader.contains(e.target)) {
                this.flag = false
                this.focus = false
            }
        })
    },
    methods: {
        blur() {
            this.flag = false
            this.focus = false
        },
        changeState() {
            this.flag = true
            this.focus = true
        },
        changeMenu(index) {
            this.menuIndex = index + 1
            this.changeState();
        },
        changeOne(index, menuIndex) {
            if(menuIndex == 1){
                this.oneIndex = index
                this.select.splice(1,2);
                this.selectMain.splice(0,2);
                let child = this.mainSelected.mainOptions[index].children
                if(child){
                    this.menuIndex = menuIndex + 1
                    this.changeState()
                }else{
                    this.flag = false
                    this.focus = false
                }
                this.select.push(this.mainSelected.mainOptions[index])
                this.selectMain.push(this.mainSelected.mainOptions[index])
            }else{
                this.twoIndex = index
                this.select.splice(2,1)
                this.selectMain.splice(1,1);
                this.menuIndex = 1
                /* this.select.push(this.select[1].children[index]) */
                this.selectMain.push(this.selectMain[0].children[index])
                this.flag = false
                this.focus = false
            }
            let mainSelected = []
            this.selectMain.forEach(item => {
                mainSelected.push(item.id)
            })
            this.$emit("selMain", mainSelected)
        }
    }
}
</script>
<style lang="scss" scoped>
.scascader{
    position: relative;
    .s-con{
        width: 100%;
        line-height: 40px;
        position: relative;
        font-size: 14px;
        cursor: pointer;
        input{
            width: 100%;
            height: 40px;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            font-size: 14px;
            padding: 0 15px;
            cursor: pointer;
            -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        }
        input.focus{
            border-color: #f56c6c;
        }
        span.sel-input{
            position: absolute;
            top: 0;
            left: 15px;
           /*  color: #c0c4cc; */
        }
        .icon{
            display: inline-block;
            position: absolute;
            right: 5px;
            top: 0;
            position: absolute;
            -webkit-transition: all .3s;
            color: #c0c4cc;
            text-align: center;
            i{
                // color: #dcdfe6;
            }
            i.isSever{
                -webkit-transform: rotateZ(180deg);
                transform: rotateZ(180deg);
            }
        }
    }
    .s-select{
        width: 100%;
        position: absolute;
        left: 0;
        top: 45px;
        background:rgba(255,255,255,1);
        border-radius:1px 0px 0px 1px;
        border:1px solid rgba(235,235,235,1);
        z-index: 2;
        .checked{
            height: 35px;
            border-bottom:1px solid rgba(235,235,235,1);
            li{
                padding: 0 10px;
                float:left;
                height: 100%;
                line-height:35px;
                border-radius:0px 1px 0px 0px;
                background:rgba(248,248,248,1);
                border-left:1px solid rgba(235,235,235,1);
                border-right:1px solid rgba(235,235,235,1);
                text-align: center;
                cursor: pointer;
            }
            li.active{
                /* height: 35px; */
                border: none;
                background: #fff;
            }
            &:nth-chlid(1){
                border-right: 1px solid rgba(235,235,235,1);
            }
        }
        .sel-list{
            padding: 10px 10px 30px 10px;
            font-size: 12px;
            overflow: hidden;
            li{
                margin: 0 5px;
                float: left;
                cursor: pointer;
                span{
                    line-height:20px;
                    display: inline-block;
                    padding: 5px 8px;
                    border-radius: 8px;
                }
                span.active{
                    color: #fff;
                    background: red;
                }
            }
        }
    }
}
</style>

