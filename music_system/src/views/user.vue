<template>
  <div class="user">
    <el-card class="top">
      <div class="img">
        <img :src="userInfo.img"/>
      </div>
      <div class="name">{{ userInfo.username }}</div>
    </el-card>
    <div style="width: 70%;">
      <el-divider content-position="center">
        <span style="color: red;font-size: 1.2rem;">
          收藏歌单
        </span>
      </el-divider>
    </div>
    <div class="playlist">
      <el-table
          :data="musicList"
          stripe
          class="music-content-table">
        <el-table-column
            type="index"
            :index="indexMethod">
        </el-table-column>
        <el-table-column
            prop="name"
            label="歌曲"
            align="center">
        </el-table-column>
        <el-table-column
            prop="duration"
            label="时长"
            align="center">
        </el-table-column>
        <el-table-column
            prop="operation"
            label="操作"
            align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="cancelCollection(scope.row.id)">取消收藏</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <span>请前往登录</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="toLogin('isRegister')">注册</el-button>
    <el-button type="primary" @click="toLogin('isLogin')">登录</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  apiGetCollection,
  apiRemoveCollection
} from '@/api/index.js'


export default {
  name: "user",
  data(){
    return {
      musicList:[{},{}],//收藏歌单列表
      dialogVisible: false,//是否开启弹框
      userInfo: {},
    }
  },
  created(){
    this.getCollection()
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if(!userInfo){ //用户未登录
      this.dialogVisible = true
    }else{
      this.userInfo = userInfo
    }
  },
  methods:{
    //获取音乐列表
    getCollection(){
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      let user_id = userInfo.id
      let res = apiGetCollection({user_id})
      res.then(data => {
        console.log(data)
        this.musicList = data.result
      })
    },
    //取消收藏
    cancelCollection(music_id){
      // console.log(music_id)
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      let user_id = userInfo.id
      let params = {
        user_id,
        music_id
      }
      let res = apiRemoveCollection(params)
      res.then(data => {
        this.$message.success("取消收藏成功")
        this.getCollection()
      })
    },
    //前往登录注册
    toLogin(type){
      this.$router.push(`/login/${type}`)
      this.handleClose()
    },
    //关闭弹框
    handleClose(){
      this.dialogVisible = false
    },
    //序号格式
    indexMethod(index){
      return index+1
    },
  }
}
</script>

<style lang="less" scoped>
.user{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .top{
    width: 70%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 30px 0;

    .img{
      width: 100%;
      text-align: center;

      img{
        width: 180px;
        height: 180px;
        border-radius: 50%;
      }
    }

    .name{
      margin: 10px 0;
      width: 100%;
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .signature{
      width: 100%;
      text-align: center;
      color: #b3b4b5;
    }
  }

  .playlist{
    margin: 30px 0;
    width: 70%;
  }
}
</style>