<template>
  <el-dialog
      :title="newsInfo!==null ? '编辑' : '添加资讯'"
      :visible.sync="isOpen"
      width="30%"
      :before-close="cancel">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="资讯标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="资讯内容">
        <el-input
          type="textarea"
          v-model="form.content"
          :rows="5"
          placeholder="请输入资讯内容">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  apiCreateNews,
  apiUpdateNews
} from '@/api/index.js'

export default {
  name: "news-edit",
  props:{
    isOpen:{
      type: Boolean,
      default: () => {
        return false
      }
    },
    newsInfo:{
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      form: {},//表单
    }
  },
  watch:{
    newsInfo(val){
      console.log('newsInfo:',val)
      if(val == null){ //新增
        this.form = {
          title: '',
          content: '',
        }
      }else{ // 编辑
        this.form = val
      }

    }
  },
  methods:{
    //关闭
    cancel(isUpdate = false){
      this.$emit('closeEdit',isUpdate)
    },
    //确定
    submit(){
      console.log(this.form)
      if(this.newsInfo !== null){ //编辑
        let res = apiUpdateNews(this.form)
        res.then(data => {
          // console.log(data)
          this.$emit('refresh',true)
          this.$message.success('修改成功')
        })
      }else{ //添加
        let res = apiCreateNews(this.form)
        res.then(data => {
          // console.log(data)
          this.$emit('refresh',true)
          this.$message.success('添加成功')
        })
      }
      this.cancel(true)
    },
  }
}
</script>

<style scoped>

</style>