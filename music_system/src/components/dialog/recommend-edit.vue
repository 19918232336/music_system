<template>
  <el-dialog
      :title="'编辑'"
      :visible.sync="isOpen"
      width="30%"
      :before-close="cancel">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="推荐歌曲">
        <el-select v-model="form.music_id" @change="$forceUpdate();" placeholder="请选择">
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
import {
  apiGetAllMusic,
  apiGetMusicCount,
  apiUpdateRecommended,
} from '@/api/index.js'

export default {
  name: "recommend-edit",
  props:{
    isOpen:{
      type: Boolean,
      default: ()=>{
        return false
      }
    },
    info:{
      type: Object,
      default: ()=>{
        return {}
      }
    }
  },
  data(){
    return {
      form:{},
      options:[],
      id: 0,
    }
  },
  created(){
    this.getAllMusic()
  },
  watch:{
    info(val){
      if(val !== null){
        console.log(val)
        this.form.music_id = val.id
        this.id = val.recommend_id
      }
    },
  },
  methods:{
    getAllMusic(){
      let count = 0
      //获取音乐总数
      let countRes = apiGetMusicCount()
      countRes.then(data => {
        count = data.result
        console.log('数据总数：',count)

        let params = {
          pageSize: count
        }
        //获取全部音乐信息
        let res = apiGetAllMusic(params)
        res.then(data => {
          console.log('allMusic:',data)

          data.result.list.forEach(item => {
            this.options.push({
              value: item.id,
              label: item.name
            })
          })
        })
        console.log('选择数据：',this.options)
      })
    },
    //确定
    submit(){
      console.log(this.id,this.form.music_id)
      let params = {
        id: this.id,
        music_id : this.form.music_id
      }
      let res = apiUpdateRecommended(params)
      res.then(data => {
        this.$message.success('修改歌曲成功')
        this.cancel()
      })
    },
    //返回
    cancel(){
      this.$emit('closeEdit')
    }
  }
}
</script>

<style scoped>

</style>