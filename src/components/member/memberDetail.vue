<template>
  <div class="detail">
    <!-- <div class="portrait">
      <img src="../../assets/image/user-head.jpg" alt="">
      <span style="font-size:35px;">{{stMemberDetail.firstName}}</span>
    </div> -->
    <div class="content">
      <p>{{stMemberDetail.memberName}}</p>
      <ul>
        <!-- <li>ID：{{stMemberDetail.memberId}}</li> -->
        <li>电话：{{stMemberDetail.mobile}}</li>
        <li>地址：{{stMemberDetail.memberRegion}}{{stMemberDetail.detailAddress}}</li>
      </ul>
      <ul>
        <li>微信号：{{stMemberDetail.wechatNumber}}</li>
        <li>昵称：{{stMemberDetail.nikiName}}</li>
        <li>性别：{{stMemberDetail.realSex}}</li>
        <li>生日：{{stMemberDetail.birthdayStr}}</li>
        <li>年龄段：{{stMemberDetail.ageGroup}}</li>
        <li>备注：{{stMemberDetail.remarks}}</li>
      </ul>
      <ul>
        <li>来源：{{stMemberDetail.source}}</li>
        <li>邀请人：{{stMemberDetail.inviterView}}</li>
      </ul>
      <!-- <ul>
        <li>购买次数：</li>
        <li>购买最后时间：</li>
        <li>累计积分：</li>
        <li>剩余积分：</li>
        <li>使用积分：</li>
        <li>通过积分：</li>
      </ul> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  // 接收传过来的数组对象
  props: ['stMemberDetail'],
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixins/var';
.detail{
  padding: 30px 42px;
  display: flex;
  .portrait{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .content{
    padding-left: 30px;
    font-size: $md-size;
    color: $child-nav-color;
    width: calc(100% - 80px);
    >p{
      font-weight: 700;
    }
    ul{
      padding: 12px 0;
      position: relative;
      &::before{
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: $border-color;
        position: absolute;
        left: 0;
        bottom: 0;
      }
      &:last-child:before{
        height: 0;
      }
      li{
        font-size: $xs-size;
      }
    }
  }
}
</style>
