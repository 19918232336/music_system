<template>
  <!--音乐上传-->
  <el-upload
      v-if="type == 'music'"
      class="upload-music"
      :action="path"
      :on-preview="handlePreviewMusic"
      :on-remove="handleRemoveMusic"
      :before-upload="beforeUpload"
      :before-remove="beforeRemoveMusic"
      :on-success="handleMusicSuccess"
      multiple
      :limit="1"
      :on-exceed="handleExceedMusic"
      :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传mp3文件</div>
  </el-upload>

  <!--图片上传-->
  <el-upload
      v-else-if="type == 'img'"
      class="avatar-uploader"
      :action="path"
      :show-file-list="false"
      :on-success="handleImgSuccess"
      :before-upload="beforeUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import {
  apiUploadMusicPath,
  apiUploadMusicImg,
} from '@/api/index.js'

export default {
  name: "upload",
  props:{
    type: {
      type: String,
      default: 'img',
    },
    path:{
      type: String,
      default: '',
    },
    isOpen:{
      type: Boolean,
      efault: () => {
        return false
      }
    },
    id:{
      type: String,
      default: () => {
        return ''
      }
    },
    form: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data(){
    return {
      imageUrl: '',//图片路径
      fileList: [],//音乐列表
      duration:0,//音乐时长
    }
  },
  watch:{
    isOpen(val){
      if(!val){
        console.log('关闭')
        this.imageUrl = ''
        this.fileList = []
      }else{
        console.log('mp3列表',this.fileList)
      }
    },
    form(val){
      console.log('form:',val)
      if(val.name || val.username){
        if(this.id){
          this.fileList.push({
            name: val.name,
            url: val.path,
          })
          this.imageUrl = this.form.img
        }
      }
    }
  },
  methods:{
    getTimes(file) {
      console.log('获取时长文件',file)
      //获取时长
      let content = file
      let url = URL.createObjectURL(content)
      //经测试，发现audio也可获取视频的时长
      let audioElement = new Audio(url)
      let getDuration = () => {
        this.duration = parseInt(audioElement.duration)
        console.log(this.duration)
        this.$emit('getDuration',this.duration)
      }
      audioElement.addEventListener('loadedmetadata', getDuration)
    },
    //上传图片成功触发
    handleImgSuccess(res, file) {
      console.log(res, file)
      this.imageUrl = res.result.user_img
      this.$emit('getImgPath',res.result.user_img)
    },
    //上传前触发
    beforeUpload(file, type) {
      console.log(file,type)
      if(this.type == 'img'){
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }else if(this.type == 'music'){
        const isMP3 = file.type === 'audio/mpeg'
        const isLt2M = file.size / 1024 / 1024 < 500;

        if (!isMP3) {
          this.$message.error('上传头像图片只能是 MP3 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 500MB!');
        }

        //获取音乐时长
        if(isMP3 && isLt2M){
          this.getTimes(file)
        }

        return isMP3 && isLt2M;
      }
    },
    //音乐上传成功时触发
    handleMusicSuccess(res, file){
      console.log('音乐上传成功：')
      console.log(res, file)
      this.fileList.push({
        name: res.result.music_name,
        url: res.result.music_path
      })
      this.$emit('getMusicPath',this.fileList[0].url)
    },
    //删除音乐时触发
    handleRemoveMusic(file, fileList) {
      console.log(file, fileList);
    },
    //点击文件列表中已上传的文件时的钩子
    handlePreviewMusic(file) {
      console.log(file);
    },
    //删除音乐前触发
    beforeRemoveMusic(file){
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    //文件超出个数限制时的钩子
    handleExceedMusic(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>