<template>
  <div class="comm-edit">
    <div class="form-group">
      <div class="form-block">
         <el-collapse-transition>
          <div class="form-list" >
            <el-form :model="stMicroShop" :rules="rules" ref="stMicroShop" label-width="120px" class="ruleForm">
              <el-row :gutter="24">
                <el-col :span="12" :offset="12">
                  <el-form-item label="微店logo" prop="microShopLogo">
                    <img :src="stMicroShop.microShopLogo" class="logo-image">
                    <!-- <el-input v-model="stMicroShop.logoList[0].filePath"></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="微店名称" prop="microShopName">
                    <el-input v-model="stMicroShop.microShopName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="微店介绍" prop="shopIntroduce">
                    <el-input v-model="stMicroShop.shopIntroduce" type="textarea"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16" :offset="12" :style="{margin:'5px 0px 25px'}">
                  <el-form-item label="模板选择" prop="template" :style="{float:'left'}">
                    <!-- <el-button type="danger" @click="openTemplate">选择模板</el-button>
                    <span v-if="this.stMicroShop.template != '' && this.stMicroShop.template != null">&nbsp;&nbsp;&nbsp;当前选择：</span> -->
                    <div style="overflow:hidden;margin-bottom:20px;">
                      <img src="../../../assets/image/template1.jpg" v-if="this.stMicroShop.template == '1'" :style="{width:'200px',float:'left'}">
                      <img src="../../../assets/image/template2.jpg" v-if="this.stMicroShop.template == '2'" :style="{width:'200px',float:'left'}">
                      <img src="../../../assets/image/template3.jpg" v-if="this.stMicroShop.template == '0'" :style="{width:'200px',float:'left'}">
                      <img src="../../../assets/image/template4.jpg" v-if="this.stMicroShop.template == '3'" :style="{width:'200px',float:'left'}">
                      <img src="../../../assets/image/template5.jpg" v-if="this.stMicroShop.template == '4'" :style="{width:'200px',float:'left'}">
                      <img src="../../../assets/image/template6.jpg" v-if="this.stMicroShop.template == '5'" :style="{width:'200px',float:'left'}">
                      <img src="../../../assets/image/template6.jpg" v-if="this.stMicroShop.template == '6'" :style="{width:'200px',float:'left'}">
                    </div>
                    <div>
                      <el-button type="danger" @click="openTemplate">选择模板</el-button>
                    </div>
                  </el-form-item>

                </el-col>
                <el-dialog title="选择模板" :visible.sync="flag" width="680px">
                  <div class="template-list">
                    <div class="template-item">
                      <div class="img-view">
                        <img src="../../../assets/image/template1.jpg" alt="" >
                        <div>模板一</div>
                        <p class="case-text">
                          <!-- <el-button type="primary" class="look-tem" @click="previewMS('1')">预览</el-button> -->
                          <el-button type="primary" class="use-tem" @click="useTemplate('1')">使用该模板</el-button>
                        </p>
                      </div>
                      <div class="now-icon" v-if="nowTemplate=='1'">
                        <img src="../../../assets/image/now_icon.png" alt="">
                      </div>
                    </div>
                    <div class="template-item">
                      <div class="img-view">
                        <img src="../../../assets/image/template2.jpg" alt="" >
                        <div>模板二</div>
                        <p class="case-text">
                          <!-- <el-button type="primary" class="look-tem" @click="previewMS('2')">预览</el-button> -->
                          <el-button type="primary" class="use-tem" @click="useTemplate('2')">使用该模板</el-button>
                        </p>
                      </div>
                      <div class="now-icon" v-if="nowTemplate=='2'">
                        <img src="../../../assets/image/now_icon.png" alt="">
                      </div>
                    </div>
                    <div class="template-item">
                      <div class="img-view">
                        <img src="../../../assets/image/template3.jpg" alt="" >
                        <div>模板三</div>
                        <p class="case-text">
                          <!-- <el-button type="primary" class="look-tem" @click="previewMS('0')">预览</el-button> -->
                          <el-button type="primary" class="use-tem" @click="useTemplate('0')">使用该模板</el-button>
                        </p>
                      </div>
                      <div class="now-icon" v-if="nowTemplate=='0'">
                        <img src="../../../assets/image/now_icon.png" alt="">
                      </div>
                    </div>
                    <div class="template-item">
                      <div class="img-view">
                        <img src="../../../assets/image/template4.jpg" alt="" >
                        <div>模板四</div>
                        <p class="case-text">
                          <!-- <el-button type="primary" class="look-tem" @click="previewMS('3')">预览</el-button> -->
                          <el-button type="primary" class="use-tem" @click="useTemplate('3')">使用该模板</el-button>
                        </p>
                      </div>
                      <div class="now-icon" v-if="nowTemplate=='3'">
                        <img src="../../../assets/image/now_icon.png" alt="">
                      </div>
                    </div>
                    <div class="template-item">
                      <div class="img-view">
                        <img src="../../../assets/image/template5.jpg" alt="" >
                        <div>模板五</div>
                        <p class="case-text">
                          <!-- <el-button type="primary" class="look-tem" @click="previewMS('3')">预览</el-button> -->
                          <el-button type="primary" class="use-tem" @click="useTemplate('4')">使用该模板</el-button>
                        </p>
                      </div>
                      <div class="now-icon" v-if="nowTemplate=='4'">
                        <img src="../../../assets/image/now_icon.png" alt="">
                      </div>
                    </div>
                    <div class="template-item">
                      <div class="img-view">
                        <img src="../../../assets/image/template6.jpg" alt="" >
                        <div>模板六</div>
                        <p class="case-text">
                          <!-- <el-button type="primary" class="look-tem" @click="previewMS('3')">预览</el-button> -->
                          <el-button type="primary" class="use-tem" @click="useTemplate('5')">使用该模板</el-button>
                        </p>
                      </div>
                      <div class="now-icon" v-if="nowTemplate=='5'">
                        <img src="../../../assets/image/now_icon.png" alt="">
                      </div>
                    </div>
                    <div class="template-item">
                      <div class="img-view">
                        <img src="../../../assets/image/template6.jpg" alt="" >
                        <div>模板七</div>
                        <p class="case-text">
                          <!-- <el-button type="primary" class="look-tem" @click="previewMS('3')">预览</el-button> -->
                          <el-button type="primary" class="use-tem" @click="useTemplate('6')">使用该模板</el-button>
                        </p>
                      </div>
                      <div class="now-icon" v-if="nowTemplate=='6'">
                        <img src="../../../assets/image/now_icon.png" alt="">
                      </div>
                    </div>
                  </div>
                </el-dialog>
                <el-col :span="12" :offset="12">
                  <el-form-item :label="stMicroShop.template != '4'?'首页背景图片':'顶部图片'" prop="homeBackground" class="upload-item" v-if="stMicroShop.template == '2' || stMicroShop.template == '3' || stMicroShop.template == '4'">
                    <el-upload
                      :action="$config().photoUploadUrl"
                      :data="{bid: stMicroShop.microShopId}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-success="fileUploadSuccess"
                      :file-list="stMicroShop.fileLists"
                      :before-upload="beforeAvatarUpload"
                      :limit="1"
                      :on-exceed="outOfRange"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                  <el-form-item label="品牌故事封面" prop="storyPicture" class="upload-item" v-if="stMicroShop.template == '2' || stMicroShop.template == '0' || stMicroShop.template == '3'">
                    <el-upload
                      :action="$config().photoUploadUrl"
                      :data="{bid: stMicroShop.microShopId}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview2"
                      :on-success="fileUploadSuccess2"
                      :file-list="stMicroShop.fileLists2"
                      :before-upload="beforeAvatarUpload2"
                      :limit="1"
                      :on-exceed="outOfRange1"
                      :on-remove="handleRemove2">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible2">
                      <img width="100%" :src="dialogImageUrl2" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="12" :offset="12">
                  <el-form-item label="首页视频" prop="homeVideo">
                    <el-input v-model="stMicroShop.homeVideo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="21" :offset="12">
                  <el-form-item label="视频地址" prop="videoAddress">
                    <el-input v-model="stMicroShop.videoAddress"></el-input>
                  </el-form-item>
                </el-col> -->
                <!-- <el-col :span="15" :offset="12" v-if="stMicroShop.template == '1'">
                  <el-form-item label="文字颜色" prop="fontColor" >
                    <el-color-picker v-model="stMicroShop.fontColor" size="mini"></el-color-picker>
                  </el-form-item>
                </el-col> -->
                <!-- 活动图片开始  -->
                <el-col :span="12" :offset="12" v-if="stMicroShop.template == '6'">
                  <el-form-item label="优惠券模块" prop="shopIntroduce">
                    <!-- 11111 -->
                      <div class="dialogBox">
                        <div class="uploading">
                          <div class="noImg" v-if="recommendedCoupons[0].img == ''">
                            <el-upload
                              :action="$config().uploadUrl"
                              list-type="picture-card"
                              accept="image/*"
                              :class="{disabled:recommendedCoupons[0].img != ''} "
                              :limit="imgLimit"
                              :file-list="recommendedCoupons[0].fileLists6"
                              :multiple="isMultiple"
                              :on-preview="handlePictureCardPreview6"
                              :on-remove="handleRemove6"
                              :on-success="fileUploadSuccess6"
                              :before-upload="beforeAvatarUpload6"
                              :on-exceed="handleExceed"
                              :on-error="imgUploadError">
                              <i class="el-icon-plus"></i>
                            </el-upload>
                          </div>
                          <div class="hasImg" v-else @mouseenter="cenShowMask1" @mouseleave="leaShowMask1">
                            <div class="imgBlock">
                                <img class="roundImg"  :src="recommendedCoupons[0].img" />
                                <img class="successImg" src="../../../../static/image/uploadSuccess_image.png" />
                            </div>
                            <div class="imgMask" v-if="isShowMask1">
                                <div class="btnBox">
                                    <img class="previewImg(1)"  @click="previewCouImg(1)" src="../../../../static/image/preview_icon.png" />
                                    <img class="delButton(1)" @click="deleteCouImg(1)" src="../../../../static/image/delete_icon.png" />
                                </div>
                            </div>
                          </div>
                          <el-dialog :visible.sync="dialogVisible6">
                            <img width="100%" :src="recommendedCoupons[0].img" alt="">
                          </el-dialog>
                        </div>
                        <div class="dialogue" >
                          <el-button type="text" @click="showLinkList(1)"  class="dialogBtn" v-if="!recommendedCoupons[0].id || recommendedCoupons[0].id == null">添加链接</el-button>
                        </div>
                        <div  class="iconBox" v-if="recommendedCoupons[0].id && recommendedCoupons[0].id != null">
                          <img src="../../../../static/image/load.png" alt=""  class="iconImage">
                          <div class="couponTitle">{{recommendedCoupons[0].couponName}}</div>
                          <i class="el-icon-circle-check"></i>
                        </div>
                        <div class="commonBox" v-if="recommendedCoupons[0].id && recommendedCoupons[0].id != null">
                          <el-button class="common" @click="showLinkList(1)">重选</el-button>
                          <el-button class="common del" @click="deletes(1)">删除</el-button>
                        </div>
                      </div>
                     <!-- 22222 -->
                       <div class="dialogBox" >
                        <div class="uploading">
                          <div class="noImg" v-if="recommendedCoupons[1].img == ''">
                             <el-upload
                              :action="$config().uploadUrl"
                              list-type="picture-card"
                              accept="image/*"
                              :class="{disabled:recommendedCoupons[0].img != ''} "
                              :limit="imgLimit"
                              :file-list="recommendedCoupons[1].fileLists7"
                              :multiple="isMultiple"
                              :on-preview="handlePictureCardPreview7"
                              :on-remove="handleRemove7"
                              :on-success="fileUploadSuccess7"
                              :before-upload="beforeAvatarUpload7"
                              :on-exceed="handleExceed"
                              :on-error="imgUploadError">
                              <i class="el-icon-plus"></i>
                            </el-upload>
                          </div>
                          <div class="hasImg" v-else @mouseenter="cenShowMask2" @mouseleave="leaShowMask2">
                            <div class="imgBlock">
                                <img class="roundImg"  :src="recommendedCoupons[1].img" />
                                <img class="successImg" src="../../../../static/image/uploadSuccess_image.png" />
                            </div>
                            <div class="imgMask" v-if="isShowMask2">
                                <div class="btnBox">
                                    <img class="previewImg" @click="previewCouImg(1)" src="../../../../static/image/preview_icon.png" />
                                    <img class="delButton" @click="deleteCouImg(2)" src="../../../../static/image/delete_icon.png" />
                                </div>
                            </div>
                          </div>
                          <el-dialog :visible.sync="dialogVisible7">
                            <img width="100%" :src="recommendedCoupons[1].img" alt="">
                          </el-dialog>
                        </div>
                        <div class="dialogue">
                          <el-button type="text" @click="showLinkList(2)" v-if="!recommendedCoupons[1].id || recommendedCoupons[1].id == null" class="dialogBtn">添加链接</el-button>
                        </div>
                        <div  class="iconBox" v-if="recommendedCoupons[1].id && recommendedCoupons[1].id != null && recommendedCoupons[1].id != ''">
                          <img src="../../../../static/image/load.png" alt=""  class="iconImage">
                          <div class="couponTitle">{{recommendedCoupons[1].couponName}}</div>
                          <i class="el-icon-circle-check"></i>
                        </div>
                        <div  class="commonBox" v-if="recommendedCoupons[1].id && recommendedCoupons[1].id != null&& recommendedCoupons[1].id != ''" >
                          <el-button class="common" @click="showLinkList(2)">重选</el-button>
                          <el-button class="common del" @click="deletes(2)">删除</el-button>
                        </div>
                      </div>
                       <!-- 温馨提示 -->
                      <div class="hint">
                        <img src="/static/image/zhuyi-icon.png" alt class="iconpng">
                        <span class="textHint">温馨提示：图片为 165px*91px 效果更佳，不超过2M</span>
                      </div>
                  </el-form-item>
                </el-col>
                <!-- 活动图片结束 -->
                <el-col v-if="stMicroShop.template != '4' && stMicroShop.template != '5'" >
                  <el-form-item label="主题颜色" prop="color">
                    <el-radio-group v-model="stMicroShop.color" class="color-sele">
                      <el-radio :label="item" class="color-group" v-for="(item,index) in stMicroShop.colorList" :key="index">
                        <div class="color-theme">
                            <div :style="{ width:'25px',background:item.split('_')[0] }"></div>
                            <div :style="{ width:'25px',background:item.split('_')[1] }"></div>
                        </div>
                      </el-radio>
                    </el-radio-group>
                    <span class="tip-item">*左侧为主题色彩,右侧为字体颜色</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12" v-if="stMicroShop.template == '6'">
                  <el-form-item label="自定义模块" class="upload-item">
                    <div style="width:100%;">
                      <div style="display:flex;align-items: center;margin-bottom: 20px;">
                        <el-input style="width: 150px;height: 40px;" v-model="inputText" placeholder="请输入内容" maxlength="8"></el-input>
                        <span style="color: #909399;margin-left: 20px;">标题上限制四个汉字</span>
                      </div>
                      <div style="display: flex;align-items: center;margin-bottom: 10px;">
                        <div class="pictureUploadContainer">
                          <div class="noImage" v-if="!coverUrl">
                            <el-upload
                              :action="$config().photoUploadUrl"
                              :limit="1"
                              list-type="picture-card"
                              :on-success="pictureUploadSuccess">
                              <i class="el-icon-plus"></i>
                            </el-upload>
                          </div>
                          <div class="hasImage" v-else  @mouseenter="enter" @mouseleave="leave"> 
                            <div class="imgBox">
                                <img class="roundImg" v-if="coverUrl" :src="coverUrl" />
                                <img class="delButton" src="../../../../static/image/uploadSuccess_image.png" />
                            </div>
                            <div class="imgMask" v-if="isShowMask">
                                <div class="btnBox">
                                    <img class="previewImg" @click="previewImage" src="../../../../static/image/preview_icon.png" />
                                    <img class="delButton" @click="deleteImage" src="../../../../static/image/delete_icon.png" />
                                </div>
                            </div>
                            <el-dialog :visible.sync="customModuleDialogVisible">
                              <img style="width: 100%; height: 480px;" :src="customModuleDialogImageUrl">
                            </el-dialog>
                          </div>
                        </div>
                        <div>
                          <div class="addLink" v-if="isShowLinkText"  @click="openAddLink">添加链接</div>
                        </div>
                        <div class="showLinkBox" v-if="contentItem">
                          <div class="linkTitle">
                            <i class="el-icon-info"></i>
                            <div class="iconTitle">{{contentItem.contentType | contentType }}{{ contentItem.headline }}</div>
                            <i class="el-icon-circle-check icon_success"></i>
                          </div>
                          <el-button @click="resetChoice">重选</el-button>
                          <el-button @click="deteleLink">删除</el-button>
                        </div>
                      </div>
                      <div style="display: flex;align-items: center;color:#B5B5B5;">
                        <i class="el-icon-warning" style="margin-right: 8px;"></i>
                        <span>温馨提示：图片为 345px*155px 效果更佳，不超过2M</span>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12" v-if="stMicroShop.template != '3' && stMicroShop.template != '4'">
                  <el-form-item label="首页视频" prop="videoAddress" class="upload-item3">
                    <el-upload
                      :action="$config().photoUploadUrl"
                      :data="{bid: stMicroShop.microShopId}"
                      :on-preview="handlePictureCardPreview3"
                      :on-success="fileUploadSuccess3"
                      :file-list="stMicroShop.fileLists3"
                      :before-upload="beforeAvatarUpload3"
                      :limit="1"
                      :on-progress = 'onProgress'
                      ref="elUpload"
                      :on-error = 'onUploadError'
                      :on-remove="handleRemove3">
                      <el-button size="small" type="primary" :disabled='isUpLoad' :loading='isUpLoad' >{{uploadText}}</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传一个mp4格式视频，视频比例：16:9 视频尺寸750*420px且大小不超过50MB</div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible3">
                      <video width="100%" height="500px" :src="dialogImageUrl3" autoplay="autoplay" controls loop="-1"></video>
                    </el-dialog>
                  </el-form-item>
                </el-col>
                
                <el-col :span="12" :offset="12" v-if="stMicroShop.template == '5'|| stMicroShop.template == '6'">
                  <el-form-item label="底部图片" prop="bottomImg" class="upload-item">
                    <el-upload
                      :action="$config().photoUploadUrl"
                      :data="{bid: stMicroShop.microShopId}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview4"
                      :on-success="fileUploadSuccess4"
                      :file-list="stMicroShop.fileLists4"
                      :before-upload="beforeAvatarUpload4"
                      :limit="1"
                      :on-exceed="outOfRange"
                      :on-remove="handleRemove4">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible4">
                      <img width="100%" :src="dialogImageUrl4" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12" v-if="stMicroShop.template == '5'">
                  <el-form-item class="el_text_tips">
                    <div class="imageTips">
                      <i class="el-icon-warning"></i>
                      <div slot="tip" class="el-image__tip">图片宽度固定750px，高度不限，不超过2M</div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="活动顶部图片" prop="activeTopImg" class="upload-item">
                    <el-upload
                      :action="$config().photoUploadUrl"
                      :data="{bid: stMicroShop.microShopId}"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview5"
                      :on-success="fileUploadSuccess5"
                      :file-list="stMicroShop.fileLists5"
                      :before-upload="beforeAvatarUpload5"
                      :limit="1"
                      :on-exceed="outOfRange"
                      :on-remove="handleRemove5">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible5">
                      <img width="100%" :src="dialogImageUrl5" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-col>
                <el-col :span="13" :offset="12" v-if="stMicroShop.template == '5'">
                  <el-form-item class="el_text_tips">
                    <div class="imageTips">
                      <i class="el-icon-warning"></i>
                      <div slot="tip" class="el-image__tip">温馨提示:图片为750px * 420px效果更佳，不超过2M</div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12" v-if="stMicroShop.template == '5'">
                  <el-form-item label="优惠券说明" class="location">
                    <el-radio-group v-model="stMicroShop.infoPosition">
                      <el-radio label="0" >展开</el-radio>
                      <el-radio label="1" >收起</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="12">
                  <el-form-item label="展示故事" prop="state">
                    <el-radio-group v-model="stMicroShop.display">
                      <el-radio label="0" >是</el-radio>
                      <el-radio label="1" >否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <!-- 底部广告图 -->
                <el-col :span="12" :offset="12" v-if="stMicroShop.template == '6'">
                  <el-form-item label="底部广告图" class="upload-item">
                    <div style="width:100%;">
                      <div style="display: flex;align-items: center;margin-bottom: 10px;">
                        <div class="pictureUploadContainer">
                          <div class="noImage" v-if="!coverUrl1">
                            <el-upload
                              :action="$config().photoUploadUrl"
                              :limit="1"
                              list-type="picture-card"
                              :on-success="pictureUploadSuccess1">
                              <i class="el-icon-plus"></i>
                            </el-upload>
                          </div>
                          <div class="hasImage" v-else  @mouseenter="enter1" @mouseleave="leave1"> 
                            <div class="imgBox">
                                <img class="roundImg" v-if="coverUrl1" :src="coverUrl1" />
                                <img class="delButton" src="../../../../static/image/uploadSuccess_image.png" />
                            </div>
                            <div class="imgMask" v-if="isShowMask3">
                                <div class="btnBox">
                                    <img class="previewImg" @click="previewImage1" src="../../../../static/image/preview_icon.png" />
                                    <img class="delButton" @click="deleteImage1" src="../../../../static/image/delete_icon.png" />
                                </div>
                            </div>
                            <el-dialog :visible.sync="customModuleDialogVisible1">
                              <img style="width: 100%; height: 480px;" :src="customModuleDialogImageUrl1">
                            </el-dialog>
                          </div>
                        </div>
                        <div>
                          <div class="addLink" v-if="isShowLinkText1"  @click="openAddLink1">添加链接</div>
                        </div>
                        <div class="showLinkBox" v-if="contentItem1">
                          <div class="linkTitle">
                            <i class="el-icon-info"></i>
                            <div class="iconTitle">{{contentItem1.contentType | contentType }}{{ contentItem1.headline }}</div>
                            <i class="el-icon-circle-check icon_success"></i>
                          </div>
                          <el-button @click="resetChoice1">重选</el-button>
                          <el-button @click="deteleLink1">删除</el-button>
                        </div>
                      </div>
                      <div style="display: flex;align-items: center;color:#B5B5B5;">
                        <i class="el-icon-warning" style="margin-right: 8px;"></i>
                        <span>温馨提示：图片为 345px*155px 效果更佳，不超过2M</span>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="故事详情" prop="storyContent" v-show="showstoryContent && stMicroShop.display == 0">
                    <quill-editor :oldcontent="stMicroShop.storyContent" @newCont="newCont"></quill-editor>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-collapse-transition>
      </div>
      <div class="opeartion">
          <!-- <el-button @click="reset('StBrandStory')">重置</el-button> -->
          <!-- <el-button type="success" @click="previewMS" v-if="stMicroShop.microShopName">预览</el-button> -->
          <el-button type="primary" @click="submit('stMicroShop')">提交</el-button>
      </div>
      <iframe style="border: 0px;visibility:  hidden;width: 0;height: 0;" type="text/x-scriptlet" :src="MSUrl"></iframe>
      <el-dialog :visible.sync="previewShow" class="preview-show" :before-close="closeIframe">
        <div class="iframe-content">
           <!-- <iframe :src="MSUrl"></iframe> -->
           <iframe style="border:0px" type="text/x-scriptlet" :src="MSUrl" height=650></iframe>
        </div>
      </el-dialog>
      <!-- 自定义选择框 -->
      <el-dialog 
        class="import-dialog"
        width="30%"
        :before-close="closeAddLink"
        :visible.sync="isClickAddLink">
        <div slot="title" class="center-title">
          <span class="top">品牌内容库</span>
        </div>
        <brandContentComponent  @clickSubmit="clickSubmit" @clickCancel="clickCancel" />
      </el-dialog>
      <!-- 底部图片选择框 -->
      <el-dialog 
        class="import-dialog"
        width="30%"
        :before-close="closeAddLink1"
        :visible.sync="isClickAddLink1">
        <div slot="title" class="center-title">
          <span class="top">品牌内容库</span>
        </div>
        <brandContentComponent1 @clickSubmit1="clickSubmit1" @clickCancel1="clickCancel1" />
      </el-dialog>
      <!-- 推荐优惠券选择 -->
      <el-dialog
        title="优惠券"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="radioGroup">
          <marketing-itemNew :data="stMarketingCouponVoList" @childByValue="childByValue"></marketing-itemNew>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import marketingItemNew from "../../../components/marketing/marketingItemNew";
import breadCrumb from '../../../components/public/breadcrumb'
import topTips from '../../../components/public/topTips'
import quillEditor from '../../../components/public/quillEditor'
import brandContentComponent from '../../../components/public/brandContentComponent'
import brandContentComponent1 from '../../../components/public/brandContentComponent1'
// import { Loading } from 'element-ui'
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers';
import { constants } from 'zlib';
import {getStore, setStore, removeStore} from '../../../tool/Utils'

export default {
  data () {
    return {
      // 活动图片开始
      btnCommon:false,//重选删除按钮是否显示
      couponNames:'',//接受优惠券名字
      reelectShow:true,//点击删除大块隐藏
      selectedLink:'',
      selectLinkindex:'',
      iconShow:false,
      iconShow2:false,
      childValue: {},
      dialogImageUrl: '',
      dialogVisible: false,
      productImgs: [],
      isMultiple: true,
      imgLimit: 1,//最大上传图片个数
      centerDialogVisible: false,//对话框
      centerDialogVisible2: false,//对话框2
      currentPage: 1,
      pagesize: 10,
      stMarketingCouponVoList:[],//优惠券数据
      recommendedCoupons: [
        {id: '', img: '', couponName: '', couponCode: '', couponType:'', fileLists6: []},
        {id: '', img: '', couponName:'', couponCode: '', couponType:'', fileLists7: []}
      ],
      // 活动图片结束
      nowTemplate: '',
      flag: false,
      showstoryContent: true,
      hasSubmit: false,
      MSUrl: '',
      previewShow: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogVisible5: false,
      dialogVisible6: false,
      dialogVisible7: false,
      dialogImageUrl: '',
      dialogImageUrl2: '',
      dialogImageUrl3: '',
      dialogImageUrl4: '',
      dialogImageUrl5: '',
      dialogImageUrl6: '',
      dialogImageUrl7: '',
      thisShow: false,
      importComm: false,
      deletFile: '',
      stMicroShop: {
        microShopId: '',
        microShopName: '',
        versionNo: '',
        homeBackground: '',
        homeVideo: '',
        videoAddress: '',
        storyPicture: '',
        infoPosition: '0',
        display: '1',
        template: '1',
        themeColor: '',
        fontColor: '',
        color: '',
        colorList: [],
        storyContent: '',
        shopIntroduce: '',
        storeId: '',
        bottomImg: '',
        activeTopImg:'',
        fileLists: [],
        fileLists2: [],
        fileLists3: [],
        fileLists4: [],
        fileLists5: [],
        isUpLoad: false,
        brandList: []
      },
      rules: {
        microShopName: [
          { required: true, message: '请输入微店名称', trigger: 'blur' },
          { max: 20, message: '标题长度不能超过20', trigger: 'blur' }
        ],
        shopIntroduce: [
          { required: true, message: '请输入微店介绍', trigger: 'blur' },
          { max: 50, message: '概述长度不能超过50', trigger: 'blur' }
        ]
      },
      isUpLoad: false,
      isShowMask1: false,
      isShowMask2: false,
      uploadText: '上传视频',
      inputText: '',  //自定义模块定制标题
      inputText1: '',  //自定义模块定制标题
      coverUrl: '',   //自定义模块定制封面图
      coverUrl1: '',   //自定义模块定制封面图1
      isShowMask: false,  //默认图片不显示阴影
      isShowMask3: false,  //默认图片不显示阴影3
      customModuleDialogVisible: false, //默认自定义模块图片预览显示
      customModuleDialogVisible1: false, //默认自定义模块图片预览显示1
      customModuleDialogImageUrl: '',  //自定义模块图片预览路径
      customModuleDialogImageUrl1: '',  //自定义模块图片预览路径1
      isClickAddLink: false,  //默认未点击'添加链接'
      isClickAddLink1: false,  //默认未点击'添加链接'
      contentItem: '',
      contentItem1: '',
      showLinkText: true,
      showLinkText1: true,
      contentType: '',
      // contentType1: '',
      isShowLinkText: false,  //默认不展示'点击链接'文字
      isShowLinkText1: false,  //默认不展示'点击链接'文字
      resLength: '' //没有添加优惠券
    }
  },
  computed: {
    ...mapGetters(['storeName', 'storeInfo','couponChooseIndex'])
  },
  mounted () {
    this.getStMicroShopInfo()
    this.stMicroShop.infoPosition = '0'
    this.getStMarketingCouponList()
    this.getBrandList()
  },

  methods: {
    // 点击添加链接
    showLinkList(index) {
      // 没有添加优惠券
      if(this.resLength == 0){
        // this.centerDialogVisible = false;
          this.$message({
          showClose: true,
          message: '请在门店活动中添加优惠券!',
          type: 'warning'
        });
      }else{
          this.centerDialogVisible = true
          this.selectLinkindex = index
      }
    },
    // 活动图片开始
    // 获取子组件redio的值
    childByValue(childValue) {
      this.childValue = childValue
    },
    // 重选
    reelect(){
      this.centerDialogVisible = true;
    },
    reelect2(){
      this.centerDialogVisible2 = true;
    },
    previewCouImg(index){
      if(index == 1){
        this.dialogVisible6 = true 
      }else if(index == 2){
        this.dialogVisible7 = true
      }
    },
    deleteCouImg(index){
      if(index == 1){
        this.$set(this.recommendedCoupons[0], `img`, '')
        this.handleRemove6()
      }else if( index == 2){
        this.$set(this.recommendedCoupons[1], `img`, '')
        this.handleRemove7()
      }
    },
    // 删除
    deletes(index){
      // {id: '', img: '', couponName: '', couponCode: '', couponType:'', fileLists6: []},
      if(index == 1){
        this.$set(this.recommendedCoupons[0], `id`, '')
        this.$set(this.recommendedCoupons[0], `img`, '')
        this.$set(this.recommendedCoupons[0], `couponName`, '')
        this.$set(this.recommendedCoupons[0], `couponCode`, '')
        this.$set(this.recommendedCoupons[0], `couponType`, '')
        this.$set(this.recommendedCoupons[0], `fileLists6`, [])
      }else if(index == 2){
        this.$set(this.recommendedCoupons[1], `id`, '')
        this.$set(this.recommendedCoupons[1], `img`, '')
        this.$set(this.recommendedCoupons[1], `couponName`, '')
        this.$set(this.recommendedCoupons[1], `couponCode`, '')
        this.$set(this.recommendedCoupons[1], `couponType`, '')
        this.$set(this.recommendedCoupons[1], `fileLists7`, [])
      }
    },
    cenShowMask1() {
      this.isShowMask1 = true
    },
    leaShowMask1() {
      this.isShowMask1 = false
    },
    cenShowMask2() {
      this.isShowMask2 = true
    },
    leaShowMask2() {
      this.isShowMask2 = false
    },
    // 提 交
    onSubmit(){
      this.centerDialogVisible = false;
      let id = this.childValue.couponId
      let couponName = this.childValue.couponName
      let couponCode = this.childValue.couponCode
      let couponType = this.childValue.type
      if(this.selectLinkindex == 1){
        this.$set(this.recommendedCoupons[0], `id`, id)
        this.$set(this.recommendedCoupons[0], `couponName`, couponName)
        this.$set(this.recommendedCoupons[0], `couponCode`, couponCode)
        this.$set(this.recommendedCoupons[0], `couponType`, couponType)
      }else if(this.selectLinkindex == 2){
        this.$set(this.recommendedCoupons[1], `id`, id)
        this.$set(this.recommendedCoupons[1], `couponName`, couponName)
        this.$set(this.recommendedCoupons[1], `couponCode`, couponCode)
        this.$set(this.recommendedCoupons[1], `couponType`, couponType)
      }
    },
    // 初始化优惠券列表
    getStMarketingCouponList(values) {
      let state = null;
      if (this.couponChooseIndex === 3) {
        state = null;
      } else {
        state = this.couponChooseIndex;
      }
      let params = {
        page: this.currentPage,
        limit: this.pagesize,
        // 默认查询 正在进行的活动
        state: state,
        couponName: this.couponSeacherVal,
        type: 0
        // storeId: this.storeInfo
      };
      this.$api.getStMarketingCouponList(params).then(res => {
        // 遍历数据  翻译字段
        if (res.code === 0) {
          // 没有添加优惠券
          this.resLength = res.data.length
          this.stMarketingCouponVoList = res.data;
          let arry2=[]
          this.stMarketingCouponVoList.forEach((item,index) => {
            
            if (item.useScope === "allProduce") {
              item.useScope = "所有商品";
            } else if (item.useScope === "assignProduce") {
              item.useScope = "指定商品可用";
            } else if (item.useScope === "assignStore") {
              item.useScope = "指定门店可用";
            }
            let getStartTime = item.getStartTime;
            let getStartTimeArr = getStartTime.split(":");
            let getStartTimeArr1 = getStartTimeArr.pop();
            let startTime = getStartTimeArr.join(":");

            let getEndTime = item.getEndTime;
            let getEndTimeArr = getEndTime.split(":");
            let getEndTimeArr1 = getEndTimeArr.pop();
            let endTime = getEndTimeArr.join(":");
            let str = startTime + " 至 " + endTime;
            item["activityTime"] = str;
            arry2.push(Object.assign({},item,{mainManageBrand:0}))
          });
          this.stMarketingCouponVoList = arry2;
        } else if (res.code === 1) {
        } else {
          this.$message.error(res.msg);
        }
        this.loading = false;
        this.totalCount = res.count;
      });
    },
    handleExceed(files, fileList) {//图片上传超过数量限制
      this.$message.error('上传图片不能超过1张!');
    },
    imgUploadError(err, file, fileList){//图片上传失败调用
      console.log(err,"图片上传失败调用")
    },
    // 活动图片结束
    onUploadError () {
      this.isUpLoad = false
      this.$refs['elUpload'].$refs['upload-inner'].$refs['input'].type = 'file'
      this.uploadText = '上传文件'
    },
    onProgress () {
      this.isUpLoad = true
      this.$refs['elUpload'].$refs['upload-inner'].$refs['input'].type = 'text'
      this.uploadText = '上传中'
    },
    // 打开模板选择
    openTemplate () {
      this.flag = true
      this.nowTemplate = this.stMicroShop.template
    },
    closeIframe () {
      this.MSUrl = ''
      this.previewShow = false
    },
    previewMS () {
      this.buildPreview()
      this.previewShow = true
    },
    buildPreview () {
      if (this.stMicroShop.microShopName) {
        this.stMicroShop.themeColor = this.stMicroShop.color.split('_')[0]
        this.stMicroShop.fontColor = this.stMicroShop.color.split('_')[1]
        let params = {
          template: this.stMicroShop.template,
          themeColor: this.stMicroShop.themeColor,
          storyPicture: this.stMicroShop.storyPicture,
          fontColor: this.stMicroShop.fontColor,
          homeBackground: this.stMicroShop.homeBackground,
          microShopName: this.stMicroShop.microShopName,
          serviceLine: this.stMicroShop.serviceLine,
          infoPosition: this.stMicroShop.infoPosition,//添加优惠券说明位置参数
          display: this.stMicroShop.display,
          shopIntroduce: this.stMicroShop.shopIntroduce,
          storeCode: this.stMicroShop.storeCode,
          videoAddress: this.stMicroShop.videoAddress || '',
          microShopLogo: this.stMicroShop.microShopLogo,
          bottomImg: this.stMicroShop.bottomImg
        }
        this.MSUrl = this.$config().MSUrl + encodeURIComponent(JSON.stringify(params))
      }
    },
    loadPreview () {
      let params = {
        template: '1'
      }
      this.MSUrl = this.$config().MSUrl + encodeURIComponent(JSON.stringify(params))
    },
    newCont (cont) {
      this.stMicroShop.storyContent = cont
    },
    // 获取微店信息详情
    getStMicroShopInfo () {
      this.$api.getStMicroShopInfo().then(res => {
        if (res.data.length !== 0) {
          this.stMicroShop = res.data[0]
          this.loadPreview()
          this.nowTemplate = this.stMicroShop.template
          setStore('template', this.stMicroShop.template)
          if (this.stMicroShop.microShopName) {
            this.hasSubmit = true
          }
          // this.stMicroShop.color = this.stMicroShop.themeColor + '_' + this.stMicroShop.fontColor
          if (res.data[0].homeBackground !== null && res.data[0].homeBackground !== '') {
            let item = [{
              url: this.stMicroShop.homeBackground,
              name: 'homeBackground',
              enclosureId: 'homeBackground'
            }]
            this.stMicroShop.fileLists = item
          }
          if (res.data[0].storyPicture !== null && res.data[0].storyPicture !== '') {
            let item = [{
              url: this.stMicroShop.storyPicture,
              name: 'storyPicture',
              enclosureId: 'storyPicture'
            }]
            this.stMicroShop.fileLists2 = item
          }
          if (res.data[0].videoAddress !== null && res.data[0].videoAddress !== '') {
            // var arr = this.stMicroShop.homeVideo.split('/')
            let item = [{
              url: this.stMicroShop.videoAddress,
              name: this.stMicroShop.homeVideo,
              enclosureId: 'videoAddress'
            }]
            this.stMicroShop.fileLists3 = item
          }
          if (res.data[0].bottomImg !== null && res.data[0].bottomImg !== '') {
            let item = [{
              url: this.stMicroShop.bottomImg,
              name: 'bottomImg',
              enclosureId: 'bottomImg'
            }]
            this.stMicroShop.fileLists4 = item
          }
          if (res.data[0].activeTopImg !== null && res.data[0].activeTopImg !== '') {
            let item = [{
              url: this.stMicroShop.activeTopImg,
              name: 'activeTopImg',
              enclosureId: 'activeTopImg'
            }]
            this.stMicroShop.fileLists5 = item
          }
          if(res.data[0].activeInfoJson){
            this.recommendedCoupons = JSON.parse(res.data[0].activeInfoJson)
          }
          if(res.data[0].customizeContentCode) {
            this.inputText = res.data[0].customizeTopic
            this.coverUrl = res.data[0].customizeImg
            this.customModuleDialogImageUrl = res.data[0].customizeImg
            // 获取内容列表
            let params = {
              contentId: res.data[0].customizeContentId
            }
            this.$api.getContentById(params).then(res => {
              this.contentItem = res.data
            })
            
          }
          // 111再次进入页面时候获取部广告图这一条数据
          if(res.data[0].bottomContentId) {
            // this.inputText1 = res.data[0].customizeTopic1
            this.coverUrl1 = res.data[0].bottomContentImg
            this.customModuleDialogImageUrl1 = res.data[0].bottomContentImg
            // // 获取内容列表1111
            let params = {
              contentId: res.data[0].bottomContentId
            }
            this.$api.getContentById(params).then(res => {
              this.contentItem1 = res.data
            })
            
          }
          
        }
      })
    },
    // 自定义模块上传定制图片success
    pictureUploadSuccess (response, file, fileList) {
      this.coverUrl = response.data.filePath;
      this.customModuleDialogImageUrl = response.data.filePath;
      this.isShowMask = false;
      this.isShowLinkText = true;
    },
    // 自定义模块上传定制图片success1
    pictureUploadSuccess1 (response, file, fileList) {
      this.coverUrl1 = response.data.filePath;
      this.customModuleDialogImageUrl1 = response.data.filePath;
      this.isShowMask3 = false;
      this.isShowLinkText1 = true;
    },
    // 鼠标移入图片
    enter () {
      this.isShowMask = true;
    },
    // 鼠标移出图片
    leave () {
      this.isShowMask = false;
    },
    // 鼠标移入图片
    enter1 () {
      this.isShowMask3 = true;
    },
    // 鼠标移出图片
    leave1 () {
      this.isShowMask3 = false;
    },
    // 点击预览图片
    previewImage () {
      this.customModuleDialogVisible = true;
    },
    // 点击预览图片1
    previewImage1 () {
      this.customModuleDialogVisible1 = true;
    },
    // 删除图片
    deleteImage () {
      this.coverUrl = '';
      this.contentItem = '';
      this.isShowLinkText = false;
      this.customModuleDialogVisible = false;
    },
    // 删除图片
    deleteImage1 () {
      this.coverUrl1 = '';
      this.contentItem1 = '';
      this.isShowLinkText1 = false;
      this.customModuleDialogVisible1 = false;
    },
    // 打开添加链接的dailog
    openAddLink () {
      if(this.brandList.length == 0){
          this.$message({
          showClose: true,
          message: '请在内容库中添加品牌内容库!',
          type: 'warning'
        });
      }else{
        this.isClickAddLink = true;
      }
    },
    // 关闭添加链接
    closeAddLink () {
      this.isClickAddLink = false;
    },
    // 打开添加链接的dailog  11111
    openAddLink1 () {
      this.isClickAddLink1 = true;
    },
    // 关闭添加链接  11111
    closeAddLink1 () {
      this.isClickAddLink1 = false;
    },
    // 提交确定
    clickSubmit (item) {
      this.contentItem = item;
      this.contentType = item.contentType;
      this.showLinkText = false;
      this.isClickAddLink = false;
      this.isShowLinkText = false;
    },
    // 提交确定111
    clickSubmit1 (item) {
      this.contentItem1 = item;
      this.contentType1 = item.contentType1;
      this.showLinkText1 = false;
      this.isClickAddLink1 = false;
      this.isShowLinkText1 = false;
    },
    // 取消
    clickCancel () {
      this.isClickAddLink = false;
    },
    // 取消111
    clickCancel1 () {
      this.isClickAddLink1 = false;
    },
    // 重选链接
    resetChoice () {
      this.isClickAddLink = true;
    },
    // 重选链接111
    resetChoice1 () {
      this.isClickAddLink1 = true;
    },
    // 删除链接
    deteleLink () {
      this.isShowLinkText = true;
      this.contentItem = '';
    },
     // 删除链接1
    deteleLink1 () {
      this.isShowLinkText1 = true;
      this.contentItem1 = '';
    },
    // 提交
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.stMicroShop.template == '6') {
            if (this.inputText.length > 4) {
              this.$confirm('自定义模块标题字数超过上限，请重新填写标题', '提示', {
                confirmButtonText: '填写标题',
                cancelButtonText: '取消',
                type: 'warning'
              })
              return
            } else if (this.inputText == '') {
              this.$confirm('自定义模块未填写标题，请填写标题', '提示', {
                confirmButtonText: '填写标题',
                cancelButtonText: '取消',
                type: 'warning'
              })
              return
            } else if (this.coverUrl == '') {
              this.$confirm('自定义模块未上传图片，请上传图片', '提示', {
                confirmButtonText: '上传图片',
                cancelButtonText: '取消',
                type: 'warning'
              })
              return
            } else if (this.coverUrl1 == '') {
              this.$confirm('底部广告图未上传图片，请上传图片', '提示', {
                confirmButtonText: '上传图片',
                cancelButtonText: '取消',
                type: 'warning'
              })
              return
            } else if (this.contentItem == '') {
              this.$confirm('自定义模块未添加链接，请添加链接', '提示', {
                confirmButtonText: '添加链接',
                cancelButtonText: '取消',
                type: 'warning'
              })
              return
            } else if (this.contentItem1 == '') {
              this.$confirm('底部广告图未添加链接，请添加链接', '提示', {
                confirmButtonText: '添加链接',
                cancelButtonText: '取消',
                type: 'warning'
              })
              return
            }
          }
          // 将页面对象赋予参数传递给后台
          this.stMicroShop.themeColor = this.stMicroShop.color.split('_')[0]
          this.stMicroShop.fontColor = this.stMicroShop.color.split('_')[1]
          let params = {
            microShopId: this.stMicroShop.microShopId,
            microShopName: this.stMicroShop.microShopName,
            homeBackground: this.stMicroShop.homeBackground,
            homeVideo: this.stMicroShop.homeVideo,
            videoAddress: this.stMicroShop.videoAddress,
            storyPicture: this.stMicroShop.storyPicture,
            bottomImg: this.stMicroShop.bottomImg,
            activeTopImg: this.stMicroShop.activeTopImg,
            infoPosition: this.stMicroShop.infoPosition,//添加优惠券说明位置参数2
            display: this.stMicroShop.display,
            template: this.stMicroShop.template,
            themeColor: this.stMicroShop.themeColor,
            fontColor: this.stMicroShop.fontColor,
            storyContent: this.stMicroShop.storyContent,
            shopIntroduce: this.stMicroShop.shopIntroduce,
            versionNo: this.stMicroShop.versionNo,
            customizeTopic: this.inputText,
            customizeTopic1: this.inputText1,
            customizeImg: this.coverUrl,
            customizeContentType: this.contentItem.contentType,
            customizeContentId: this.contentItem.contentId,
            customizeContentCode: this.contentItem.contentCode,
            // bottomContentType: this.contentItem1.contentType,
            bottomContentImg: this.coverUrl1,
            bottomContentId: this.contentItem1.contentId,
            // bottomContentCode: this.contentItem1.contentCode,
            activeInfoJson: JSON.stringify(this.recommendedCoupons)
          }
          if (params.versionNo) {
            this.$api.editMicroShop(params).then(res => {
              if (res.code === 0) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                this.getStMicroShopInfo()
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            this.$api.saveMicroShop(params).then(res => {
              if (res.code === 0) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                this.getStMicroShopInfo()
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        }
      })
    },
    reset () {
      this.getStMicroShopInfo()
    },
    // 上传文件之前的钩子，用来做类型、大小等的校验
    beforeAvatarUpload (file) {
      // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
      const isLt2M = file.size / 1024 / 1024 < 20
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let type = true
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        type = false
        return type
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isLt2M && type
    },
    fileUploadSuccess (response, file, fileList) {
      this.stMicroShop.homeBackground = response.data.filePath
      let item = [{
        url: this.stMicroShop.homeBackground,
        name: 'homeBackground',
        enclosureId: 'homeBackground'
      }]
      this.stMicroShop.fileLists = item
    },
    // 删除文件
    handleRemove (file, fileList) {
      this.stMicroShop.homeBackground = ''
      this.stMicroShop.fileLists = []
      this.isUpLoad = false
      this.$refs['elUpload'].$refs['upload-inner'].$refs['input'].type = 'file'
      this.uploadText = '上传视频'
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureCardPreview2 (file) {
      this.dialogImageUrl2 = file.url
      this.dialogVisible2 = true
    },
    handlePictureCardPreview5 (file) {
      this.dialogImageUrl5 = file.url
      this.dialogVisible5 = true
    },
    handlePictureCardPreview6 (file) {
      this.dialogImageUrl6 = file.url
      this.dialogVisible6 = true
      this.$set(this.recommendedCoupons[0], `img`, file.url)
    },
    handlePictureCardPreview7 (file) {
      this.dialogImageUrl7 = file.url
      this.dialogVisible7 = true
      this.$set(this.recommendedCoupons[1], `img`, file.url)
    },
    fileUploadSuccess2 (response, file, fileList) {
      this.stMicroShop.storyPicture = response.data.filePath
      let item = [{
        url: this.stMicroShop.storyPicture,
        name: 'storyPicture',
        enclosureId: 'storyPicture'
      }]
      this.stMicroShop.fileLists2 = item
    },
    // 上传文件之前的钩子，用来做类型、大小等的校验
    beforeAvatarUpload2 (file) {
      // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
      const isLt2M = file.size / 1024 / 1024 < 20
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let type = true
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        type = false
        return type
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isLt2M && type
    },
    // 删除文件
    handleRemove2 (file, fileList) {
      this.stMicroShop.storyPicture = ''
      this.stMicroShop.fileLists2 = []
    },
    // 首页视频上传
    handlePictureCardPreview3 (file) {
      this.dialogImageUrl3 = file.url
      this.dialogVisible3 = true
    },
    // 上传文件之前的钩子，用来做类型、大小等的校验
    beforeAvatarUpload3 (file) {
      // 保存原文件名
      this.stMicroShop.homeVideo = file.name
      // 以下判断为视频上传文件不能超过1024M,类型只能是MP4
      const isLt50M = file.size / 1024 / 1024 < 50
      const isMp4 = file.type === 'video/mp4'
      let type = true
      if (!isMp4) {
        this.$message.error('上传视频只能是mp4格式!')
        type = false
        return type
      }
      if (!isLt50M) {
        this.$message.error('上传视频大小不能超过50MB!')
        return false
      }
      this.isUpLoad = true
      // Loading.service({text: '视频上传处理中...', background: 'rgba(0, 0, 0, 0.7)'})
      return isLt50M && type
    },
    // 超过上传最大数的回调函数
    overMaxNum3 () {
      this.$message.error('只能上传一个首页视频，请先删除原有视频再上传！')
    },
    // 文件上传失败的回调函数
    fileUploadFail3 (response, file, fileList) {
      // this.loading = false
      // let loadingInstance = Loading.service()
      // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      //   loadingInstance.close()
      // })
      this.$message.error('上传失败，请稍后重试!')
    },
    fileUploadSuccess3 (response, file, fileList) {
      this.isUpLoad = false
      this.$refs['elUpload'].$refs['upload-inner'].$refs['input'].type = 'text'
      this.uploadText = '已完成'
      this.stMicroShop.videoAddress = response.data.filePath
      // confirm('成功之后地址' + this.stMicroShop.videoAddress)
      // let loadingInstance = Loading.service()
      // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      //   loadingInstance.close()
      // })
      let item = [{
        url: this.stMicroShop.videoAddress,
        name: this.stMicroShop.homeVideo,
        enclosureId: 'videoAddress'
      }]
      this.stMicroShop.fileLists3 = item
    },
    handlePictureCardPreview4 (file) {
      this.dialogImageUrl4 = file.url
      this.dialogVisible4 = true
    },
    fileUploadSuccess4 (response, file, fileList) {
      this.stMicroShop.bottomImg = response.data.filePath
      let item = [{
        url: this.stMicroShop.bottomImg,
        name: 'bottomImg',
        enclosureId: 'bottomImg'
      }]
      this.stMicroShop.fileLists4 = item
    },
    fileUploadSuccess5 (response, file, fileList) {
      this.stMicroShop.activeTopImg = response.data.filePath
      let item = [{
        url: this.stMicroShop.activeTopImg,
        name: 'activeTopImg',
        enclosureId: 'activeTopImg'
      }]
      this.stMicroShop.fileLists5 = item
    },
    fileUploadSuccess6 (response, file, fileList) {
      this.$set(this.recommendedCoupons[0], 'img', response.data.filePath)
      let item = [{
        url: this.recommendedCoupons[0].img,
        name: 'recommendedCoupons1',
        enclosureId: 'recommendedCoupons1'
      }]
      this.$set(this.recommendedCoupons[0], 'fileLists6', item)
      this.isShowMask1 = false
    },
    fileUploadSuccess7 (response, file, fileList) {
      this.$set(this.recommendedCoupons[1], 'img', response.data.filePath)
      let item = [{
        url: this.recommendedCoupons[1].img,
        name: 'recommendedCoupons2',
        enclosureId: 'recommendedCoupons2'
      }]
      this.$set(this.recommendedCoupons[1], 'fileLists7', item)
      this.isShowMask2 = false
    },
    // 上传文件之前的钩子，用来做类型、大小等的校验
    beforeAvatarUpload4 (file) {
      // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
      const isLt2M = file.size / 1024 / 1024 < 20
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let type = true
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        type = false
        return type
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isLt2M && type
    },
    beforeAvatarUpload6 (file) {
      // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
      const isLt2M = file.size / 1024 / 1024 < 20
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let type = true
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        type = false
        return type
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isLt2M && type
    },
    beforeAvatarUpload7 (file) {
      // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
      const isLt2M = file.size / 1024 / 1024 < 20
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let type = true
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        type = false
        return type
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isLt2M && type
    },
    beforeAvatarUpload5 (file) {
      // 以下判断为图片大小不超过2M,类型只能是JPG/PNG/GIF
      const isLt2M = file.size / 1024 / 1024 < 20
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      let type = true
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        type = false
        return type
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      return isLt2M && type
    },
    handleRemove4 (file, fileList) {
        this.stMicroShop.bottomImg = '';
        this.stMicroShop.fileLists4 = [];
    },
    handleRemove5 (file, fileList) {
        this.stMicroShop.activeTopImg = '';
        this.stMicroShop.fileLists5 = [];
    },
    handleRemove6 (file, fileList) {
      this.$set(this.recommendedCoupons[0], `img`, '')
      this.$set(this.recommendedCoupons[0], `fileLists6`, [])
    },
    handleRemove7 (file, fileList) {
      this.$set(this.recommendedCoupons[1], `img`, '')
      this.$set(this.recommendedCoupons[1], `fileLists7`, [])
    },
    outOfRange () {
      this.$message.error('上传图片数量限制为1张')
    },
    outOfRange1 () {
      this.$message.error('上传图片数量限制为1张')
    },
    // 删除文件
    handleRemove3 (file, fileList) {
      this.stMicroShop.videoAddress = ''
      this.stMicroShop.homeVideo = ''
      this.stMicroShop.fileLists3 = []
      this.isUpLoad = false
      this.$refs['elUpload'].$refs['upload-inner'].$refs['input'].type = 'file'
      this.uploadText = '上传文件'
    },
    useTemplate (index) {
      this.nowTemplate = index
      this.stMicroShop.template = index
      this.$message.success('设置成功！')
      this.flag = false
    },
    // 获取品牌内容库列表
    getBrandList () {
      let params = {
          page: 1,
          limit: 100,
          state: 0,
      }
      this.$api.getAccountContentList(params).then(res => {
          if (res.code === 0) {
              this.brandList = res.data
          } 
      })
    }
  },
  components: { breadCrumb, topTips, quillEditor, brandContentComponent, brandContentComponent1 ,marketingItemNew },
  filters: {
    contentType (v) {
      switch (v) {
          case 'case':
            return '【案例】'
          case 'article':
            return '【文章】'
          case 'atlas':
            return '【图册】'
          case 'panorama':
            return '【全景图】'
          case 'minivideo':
            return '【小视频】'
          default:
            return '【全部】'
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/style/mixins/var';
@import '../../../assets/style/components/icon';
@import '../../../assets/style/components/elupload';

.template-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  .template-item{
    width: 220px;
    position: relative;
    margin-bottom: 10px;
    overflow: hidden;
    .img-view{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img{
        width: 200px;
      }
    }
    &:hover{
      .case-text{
        top: 0;
        width: 200px;
      }
    }
    .case-text{
      position: absolute;
      width: 200px;
      height: 100%;
      top: 339px;
      z-index: 2000;
      background: rgba(66, 69, 82, 0.8);
      transition: top .4s;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .look-tem{
        width: 100px;
        margin: 0 0 20px 0;
        background: #fff;
        color: #fd4343;
        border: none;
      }
      .use-tem{
        width: 100px;
        margin: 0;
      }
    }
    .now-icon{
        position: absolute;
      top: 20px;
      left: 2px;
      z-index: 1000;
      img{
        width: 60px;
      }
    }
  }
}
.iframe-content{
  width: 310px;
  min-height: 650px;
  margin: 0 auto;
  iframe{
    height: 640px;
  }
}
.comm-edit{
  .color-sele{
    display: flex;
    flex-wrap: wrap;
    .color-group{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 30px;
      margin-bottom: 10px;
    }
    .tip-item{
     font-size: 120px;
    }
  }
}
.comm-edit {
  width: 1000px;
  margin: 0 auto;
  padding-top: 106px;
  .top {
    .change-sort {
      text-align: center;
      margin-top: 16px;
      .sort {
        display: inline-block;
        margin: 0 8px;
        li {
          display: inline-block;
          &:nth-child(n + 2)::before {
            content: '>';
          }
        }
      }
      .change {
        padding: 5px 12px;
        color: $text-gray-color;
        &:hover {
          color: $main-color;
        }
      }
    }
  }
  .form-group {
    margin-top: 20px;
    .form-block {
      .form-list {
        .dialogBox{
          display: flex;
          height: 80px;
          margin-bottom: 17px;
          .uploading{
              .hasImg{
                width: 100%;
                height: 100%;
                position: relative;
                .imgBlock{
                  position: relative;
                  .successImg{
                    width: 30px;
                    position: absolute;
                    right: 0;
                    top: 0;
                  }
                  .roundImg{
                    width: 80px;
                    height: 80px;
                  }
                }
                .imgMask{
                  width: 100%;
                  height: 100%;
                  background: rgba(0,0,0,0.5);
                  position: absolute;
                  left: 0;
                  top: 0;
                  .btnBox{
                    display: inline-block;
                    img{
                      width: 20px;
                      margin-top: 25px;
                      &:nth-child(1){
                        margin-left:15px;
                        margin-right:5px;
                      }
                    }
                    
                  }
                }
                
              }
          }
          .dialogue{
            margin-left: 30px;
            display: flex;
            align-items: center;
           
            .dialogBtn{
              color: #FD4343;
              border: none;
              font-size: 15px;
              display: flex;
              align-items: center;
            }
            .el-radio-group{
              display: flex;
              flex-direction: column;
              .el-radio+.el-radio {
                  margin-left: 0px;
              }
            }
          }
          .iconBox{
            display: flex;
            align-items: center;
            margin-right: 31px;
            .el-icon-circle-check{
              color: #67C23A
            }
            .iconImage{
              width: 14px;
              height: 14px;
            }
            .couponTitle{
              width: 160px;
              font-size: 12px;
              color: #909399;
              line-height: 20px;
              margin-right: 11px;
              margin-left: 10px;
              text-overflow:ellipsis;
              display:-webkit-box;
              -webkit-box-orient:vertical;
              -webkit-line-clamp:2;
              overflow:hidden;
              text-align:center;
            }
          }
          .commonBox{
            display: flex;
            align-items: center;
            .common{
              font-size: 14px;
              color: #606266;
              width: 72px;
              // height: 30px;
              // line-height: 30px;
              border-radius:4px;
              background-color: #fff;
              border: 1px solid #E5E7EC;
              cursor: pointer;
            }
            .del{
              margin-left: 15px;
            }
          }
        }
        .hint{
          .iconpng {
            vertical-align: middle;
            margin-top: -2px;
            margin-right: 2px;
          }
          .textHint{
            font-size: 14px;
            color: #B5B5B5;
          }
        }
        .color-theme{
          box-sizing: border-box;
          border: 1px solid #CCCCCC;
          width: 50px;
          height: 25px;
          display: flex;
        }
        .logo-image{
          width: 90px;
          height: 90px;
        }
        margin-top: 28px;
        padding: 0 70px;
        .upload-item {
          .el-form-item__content {
            line-height: 0;
          }
          .pictureUploadContainer {
            width: 80px;
            height: 80px;
            .hasImage {
              width: 100%;
              height: 100%;
              border-radius: 6px;
              position: relative;
              .imgBox {
                width: 100%;
                height: 100%;
                .roundImg {
                  width: 80px;
                  height: 80px;
                  border-radius: 6px;
                }
                .delButton {
                  width: 30px;
                  height: 30px;
                  position: absolute;
                  top: 0;
                  right: 0;
                }
              }
              .imgMask {
                width: 100%;
                height: 100%;
                border-radius: 6px;
                background: rgba(0,0,0,0.5);
                cursor: pointer;
                position: absolute;
                top: 0;
                left: 0;
                .btnBox {
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  .previewImg {
                    width: 21px;
                    height: 21px;
                    margin-right: 7px;
                  }
                  .delButton {
                    width: 21px;
                    height: 21px;
                    margin-left: 8px;
                  }
                }
              }
            }
          }
          .addLink {
            margin-left: 20px;
            color: #fd4343;
            cursor: pointer;
          }
          .showLinkBox {
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: 20px;
            .linkTitle {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              color: #909399;
              margin-right: 30px;
              .iconTitle {
                line-height: 20px;
                margin-left: 6px;
                margin-right: 11px;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;
                overflow:hidden;
                text-align:center;
                font-size: 12px;
              }
              .icon_success {
                color: #67C23A;
              }
            }
          }
        }
        .el_text_tips {
          .el-form-item__content {
            .imageTips {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              height:18px;
              color:#B5B5B5;
              .el-icon-warning {
                font-size: 14px;
                position: relative;
                top: 2px;
                margin-right: 5px;
              }
              .el-image__tip {
                font-size:16px;
                font-weight:400;
                line-height:27px;
              }
            }
          }
        }
        .location{
          margin-bottom: 0
        }
      }
    }
    .opeartion {
      text-align: left;
      margin: 40px 70px 40px 210px;
      button{
        padding:15px 20px;
        width: 140px;
      }
    }
  }
  .import-dialog {
    .left-title {
      position: absolute;
      color: #fff;
      .bottom {
        position: absolute;
        width: 90px;
        height: 28px;
        left: 0;
        z-index: 10;
        background-color: $main-color;
        &::after {
          content: '';
          @include triangle-right(14px,12px,$main-color);
          position: absolute;
          right: -24px;
        }
      }
      .top {
        position: relative;
        width: 82px;
        height: 28px;
        display: inline-block;
        background-color: $gray-color;
        line-height: 28px;
        text-align: center;
        color: $text-main-color;
        font-size: $xs-size;
        &::after {
          content: '';
          @include triangle-right(14px,12px,$gray-color);
          position: absolute;
          right: -24px;
        }
        &::before {
          content: '';
          position: absolute;
          left: 0px;
          width: 4px;
          background-color: $main-color;
          height: 100%;
        }
      }
    }
  }
  .el-upload{
    display: none
  }
}

</style>
