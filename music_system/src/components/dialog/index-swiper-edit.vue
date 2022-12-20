<template>
  <el-dialog
      :title="id ? '编辑' : '添加轮播图'"
      :visible.sync="swiperOpen"
      width="30%"
      :before-close="cancel">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="轮播图">
        <upload
          :isOpen="swiperOpen"
          :id="id"
          :type="'img'"
          :path="imgPath"
          :form="form"
          @getImgPath="getImgPath">
        </upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Upload from '@/components/upload'
import {
  apiCreateSwiper,
  apiUpdateSwiper,
} from '@/api/index.js'

export default {
  name: "index-swiper-edit",
  components:{Upload},
  props:{
    swiperOpen:{
      type: Boolean,
      default: () => {
        return false
      }
    },
    id:{
      type: String,
      default: ''
    },
  },
  data(){
    return {
      form:{},//表单
      imgPath: 'http://localhost:8080/swiper/upload'
    }
  },
  watch:{
    id(val){
      // console.log('',val)
      console.log('有id',val)
      if(val){ //编辑

      }
    }
  },
  methods:{
    //获取音乐列表
    getImgPath(img){
      this.form.path = img
    },
    //关闭
    cancel(){
      this.$emit('closeSwiperEdit')
    },
    //确定
    submit(){
      console.log(this.form)
      if(this.form.path == ''){
        this.$message.error('请选择图片！')
      }else{
        if(this.id){ //编辑
          console.log('编辑')
          this.form.id = this.id
          let res = apiUpdateSwiper(this.form)
          res.then(data => {
            this.$message.success('编辑轮播成功')
          })
        }else{ //添加
          console.log('添加')
          let res = apiCreateSwiper(this.form)
          res.then(data => {
            this.$message.success("添加轮播图成功")
          })
        }
        this.cancel()
      }
    },
  }
}
</script>

<style scoped>

</style>