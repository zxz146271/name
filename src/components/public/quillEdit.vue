<template>
<!-- <quill-editor  v-model="content" ref="myTextEditor" :options="editorOption"
 @change="onChange" placeholder="111">
  </quill-editor> -->
  <div id="editor" style="width:375px">
          <el-upload
              class="avatar-uploade"
              :action="$config().photoUploadUrl"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload" v-show="false">
      </el-upload>
      <!--富文本编辑器组件-->
      <el-row v-loading="uillUpdateImg">
      <quill-editor
              v-model="content"
              ref="myQuill"
              :options="editorOption"
              @change="onChange($event)"
      >
      </quill-editor>
       <!-- @ready="onEditorReady($event)" -->
      </el-row>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  // ["blockquote", "code-block"], // 小程序不支持
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent // 小程序不支持
  // [{ direction: "rtl" }], // text direction // 小程序不支持
  // [{ size: ["small", false, "large", "huge"] }], // custom dropdown // 小程序不支持
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],
  
  // [{ font: [] }], // 小程序不支持
  // [{ align: [] }], // 小程序不支持
  ["image"]
];
export default {
  components: { quillEditor },
  props: ['oldspecification'],
  data () {
    return {
      content: '',
      uillUpdateImg: false,
      editorOption: {
        placeholder: '您想说点什么？',
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function (value) {
                if (value) {
                  document.querySelector('.avatar-uploade input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    onChange () {
      this.$emit('newspecification', this.content)
    },
    beforeUpload () {
      // 显示loading动画
      this.quillUpdateImg = true
    },
    uploadSuccess (res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuill.quill
      // 如果上传成功
      if (res.code === 0) {
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res.data.filePath)
        let imgs = document.getElementById('editor').getElementsByTagName('img')
        for (var item of imgs) {
          item.style.width = '100%'
        }
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },

    // 富文本图片上传失败
    uploadError () {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuill.quill
    }
  },
  mounted () {
    this.content = this.oldspecification
  },
  watch: {
    oldspecification (newVal, oldVal) {
      if (this.editor) {
        if (newVal !== this.content) {
          this.content = newVal
        }
      }
    }
  }
}
</script>
