<template>
  <el-dialog
      :title="id ? '编辑' : '添加歌曲'"
      :visible.sync="isOpen"
      width="30%"
      :before-close="cancel">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="封面">
        <upload
          :isOpen="isOpen"
          :id="id"
          :type="'img'"
          :path="imgPath"
          :form="form"
          @getImgPath="getImgPath"
        ></upload>
      </el-form-item>
      <el-form-item label="歌名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="上传歌曲">
        <upload
          :isOpen="isOpen"
          :id="id"
          :type="'music'"
          :path="musicPath"
          :form="form"
          @getMusicPath="getMusicPath"
          @getDuration="getDuration"
        ></upload>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="form.tag_info.tag_id" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
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
  apiGetTag,
  apiGetMusicById,
  apiUpdateMusic,
  apiCreateMusic,
} from '@/api/index.js'

export default {
  name: "music-edit",
  components:{ Upload },
  props:{
    isOpen:{
      type: Boolean,
      default: () => {
        return false
      }
    },
    id:{
      type: String,
      default: () => {
        return ''
      }
    },
  },
  data(){
    return {
      form:{
        tag_info:{
          tag_name:''
        }
      },//表单
      options:[],
      musicPath: 'http://localhost:8080/music/uploadMusic',
      imgPath: 'http://localhost:8080/music/uploadImg'
    }
  },
  created(){
    this.getLabelList()
  },
  watch:{
    id(val){
      console.log('id:',val)
      if(val){ //编辑
        // console.log('编辑')
        //获取歌曲的标签
        let params = {id: val}
        let res = apiGetMusicById(params)
        res.then(data => {
          // console.log(data)
          this.form = data.result
          console.log('获取到的数据：',this.form)
        })
      }else{ //添加
        // console.log('添加')
      }
    },
  },
  methods:{
    //获取标签列表
    getLabelList(){
      let params = {
        pageNum: 0,
        pageSize: 500
      }
      let res = apiGetTag(params)
      res.then(data => {
        console.log('#######',data)
        for(let item of data.result.list){
          let value = item.id
          let label = item.name
          let obj = {value, label}
          this.options.push(obj)
        }
        console.log(this.options)
      })
    },
    //关闭
    cancel(){
      this.form = {
        tag_info:{
          tag_name:''
        }
      }
      this.$emit('closeEdit',false)
    },
    //获取音乐地址
    getMusicPath(path){
      this.form.path = path
    },
    //获取音乐时长
    getDuration(duration){
      this.form.duration = duration
    },
    //获取图片地址
    getImgPath(path){
      this.form.img = path
    },
    //确定
    submit(){
      console.log(this.form)
      if(this.id){ //编辑
        this.form.tag_id = this.form.tag_info.tag_id
        console.log('编辑：',this.form)

        let res = apiUpdateMusic(this.form)
        res.then(data => {
          this.cancel()
          this.$emit('refresh',true)
          this.$message.success('编辑音乐成功')
        },err => {
          this.$message.error('编辑失败')
        })
      }else{ //新增
        this.form.tag_id = this.form.tag_info.tag_id
        this.form.view = 1
        console.log('新增：',this.form)

        let res = apiCreateMusic(this.form)
        res.then(data => {
          this.cancel()
          this.$emit('refresh',true)
          this.$message.success('添加音乐成功')
        },err => {
          this.$message.error('添加失败')
        })
      }
    },
  }
}
</script>

<style scoped>

</style>