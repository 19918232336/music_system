<template>
  <el-dialog
      :title="username ? '编辑' : '添加用户'"
      :visible.sync="isOpen"
      width="30%"
      :before-close="cancel">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="头像" :label-width="width">
        <upload
          :isOpen="isOpen"
          :id="id"
          :type="'img'"
          :path="imgPath"
          :form="form"
          @getImgPath="getImgPath"
        ></upload>
      </el-form-item>
      <el-form-item label="用户名" :label-width="width">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="width">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="是否为管理员" :label-width="width">
        <el-switch
            v-model="form.permissions"
            active-color="#13ce66"
            inactive-color="#b3b4b5">
        </el-switch>
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
  apiUpdateUser,
  apiRegister,
  apiGetUserByUsername
} from '@/api/index.js'

export default {
  name: "user-edit",
  components:{Upload},
  props:{
    isOpen:{
      type: Boolean,
      default: () => {
        return false
      }
    },
    username:{
      type: String,
      default: () => {
        return ''
      }
    },
  },
  data(){
    return {
      form:{},//表单
      width: '100px',//标题宽度
      imgPath: 'http://localhost:8080/user/upload',
      id: '',//用户id
    }
  },
  watch:{
    username(val){
      console.log('username:',val)
      if(val){ //编辑
        console.log('编辑')
        //获取歌曲的标签
        let params = {
          username: val,
          pageSize: 1,
          pageNum:0,
        }
        let res = apiGetUserByUsername(params)
        res.then(data => {
          console.log(data.result.list[0])
          this.form = data.result.list[0]
          this.id = data.result.list[0].id + ''
          // console.log('获取到的数据：',this.form)
        })
      }else{ //添加
        console.log('添加')
      }
    },
  },
  methods:{
    //关闭
    cancel(){
      this.form = {}
      this.$emit('closeEdit',false)
    },
    //确定
    submit(){
      console.log(this.form)
      this.form.permissions = this.form.permissions ? "true" : "false"
      if(this.username){ //编辑
        console.log('编辑：',this.form)

        let res = apiUpdateUser(this.form)
        res.then(data => {
          this.cancel()
          this.$emit('refresh',true)
          this.$message.success('编辑用户成功')
        })
      }else{ //新增
        console.log('新增：',this.form)

        let res = apiRegister(this.form)
        res.then(data => {
          this.cancel()
          this.$emit('refresh',true)
          this.$message.success('添加用户成功')
        })
      }
    },
    //获取图片地址
    getImgPath(path){
      this.form.img = path
    },
  }
}
</script>

<style scoped>

</style>