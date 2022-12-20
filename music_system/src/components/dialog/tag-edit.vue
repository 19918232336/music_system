<template>
  <el-dialog
      :title="tagInfo!==null ? '编辑' : '添加标签'"
      :visible.sync="isOpen"
      width="30%"
      :before-close="cancel">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标签名">
        <el-input v-model="form.name"></el-input>
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
  apiUpdateTag,
} from '@/api/index.js'
import {apiCreateTag} from "../../api";

export default {
  name: "tag-edit",
  props:{
    isOpen:{
      type: Boolean,
      default: () => {
        return false
      }
    },
    tagInfo:{
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  watch:{
    tagInfo(val){
      if(val!==null){//编辑
        this.form = this.tagInfo
      }
    }
  },
  data(){
    return {
      form:{},//表单
    }
  },
  methods:{
    //关闭
    cancel(){
      this.$emit('closeEdit',false)
    },
    //确定
    submit(){
      console.log(this.form)
      if(this.tagInfo!==null){//编辑
        let res = apiUpdateTag(this.tagInfo)
        // console.log(res)
        res.then(res =>{
          this.cancel()
          this.$emit('refresh',true)
          this.$message.success('修改标签成功')
        })
      }else{ //新增
        let res = apiCreateTag(this.form)
        res.then(res =>{
          console.log(res)
          this.cancel()
          this.$emit('refresh',true)
          this.$message.success('添加标签成功')
        })
      }
    },
  }
}
</script>

<style scoped>

</style>