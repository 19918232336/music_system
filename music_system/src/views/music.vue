<template>
  <div class="music">
    <!--搜索框-->
    <div class="search">
      <el-input
          prefix-icon="el-icon-search"
          v-model="input"
          placeholder="请输入歌名">
      </el-input>
      <el-button @click="search" type="primary">搜索</el-button>
      <el-button v-if="isSearch" type="info" @click="close">取消搜索</el-button>
    </div>
    <!--标签-->
    <div class="tag">
      <div v-for='(item,index) in tagList' class="list-item">
        <el-button type="text" @click="getMusicByTag(item.id)">{{item.name}}</el-button>
        <span
            v-if="index != tagList.length-1"
            style="font-size:0.7rem; margin:0 20px; color: #b3b4b5;">|</span>
      </div>
    </div>
    <!--歌曲列表-->
    <div class="music-content">
      <el-table
          :data="musicListData"
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
            prop="author"
            label="作者"
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
            <el-button @click="view(scope.row.id)" type="text">查看</el-button>
            <span v-if="scope.row.isCollection" style="margin-left:20px;color: red;">已收藏</span>
            <el-button v-else type="text" @click="collection(scope.row.id)">收藏</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <el-pagination
        v-if="!isSearch"
        class="pagination"
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="5"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {
  apiGetTag,
  apiGetMusicByName,
  apiGetMusicByTag,
  apiGetMusicIdByUserId,
  apiCollectionMusic,
  apiGetAllMusic
} from '@/api/index.js'

export default {
  name: "music",
  data(){
    return {
      input: '', //用户输入内容
      tagList: [], //标签列表
      musicListData: [], //歌曲列表
      currentPage: 0,//页码
      total: 0,//数据总数
      isSearch: false,
    }
  },
  created(){
    this.getTag()
    this.getMusicList(0)
  },
  watch:{
    currentPage(val){
      this.getMusicList(val)
    }
  },
  methods:{
    //获取标签
    getTag(){
      let params = {
        pageSize: 500,
        pageNum: 1,
      }
      let res = apiGetTag(params)
      res.then(data => {
        console.log(data)
        this.tagList = data.result.list
      })
    },
    //获取歌曲列表
    getMusicList(page=0){
      let params = {
        pageNum: page,
        pageSize: 10,
      }
      let res = apiGetAllMusic(params)
      res.then(data => {
        console.log(data)
        let musicList = data.result.list

        //获取当前用户所有收藏歌曲的id列表
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if(userInfo){ //用户已登录
          let userId = userInfo.id
          let res = apiGetMusicIdByUserId({id:userId}) //请求获取用户收藏歌单的id列表
          res.then(data => {
            // // console.log(data)
            let collectionIdList = data.result
            musicList.forEach(item => {
              if(collectionIdList.indexOf(item.id)>-1){
                item.isCollection = true
              }
            })
            this.musicListData = musicList
          })
        }else{
          this.musicListData = musicList
        }
      })
    },
    //收藏歌曲
    collection(music_id){
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      let user_id = userInfo.id
      let params = {
        user_id,
        music_id
      }
      let res = apiCollectionMusic(params)
      res.then(data => {
        // console.log(data)
        this.$message.success('收藏歌曲成功')
        this.getMusicList(0)
      })
    },
    //搜索
    search(){
      this.isSearch = true
      console.log('搜索')
      let params = {
        pageNum: 1,
        pageSize: 100,
        name: this.input
      }
      let res = apiGetMusicByName(params)
      res.then(data => {
        console.log(data)
        this.musicListData = data.result.list
      })
    },
    //查看详情
    view(id){
      this.$router.push(`/music/show/${id}`)
    },
    //关闭搜索
    close(){
      this.search()
      this.getMusicList()
      this.input = ''
      this.isSearch = false
    },
    //获取标签对应歌曲列表
    getMusicByTag(id){
      let res = apiGetMusicByTag({id})
      res.then(data => {
        console.log(data)
        this.musicListData = data.result
        this.isSearch = true
      })
    },
    //获取当前用户所有收藏歌曲的id列表
    getCollectionIdList(){
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if(userInfo){ //用户已登录
        let userId = userInfo.id
        let res = apiGetMusicIdByUserId({id:userId}) //请求获取用户收藏歌单的id列表
        res.then(data => {
          // console.log(data)
          this.collectionIdList = data.result
          console.log(this.collectionIdList)
        })
      }
    },
    //序号格式
    indexMethod(index){
      return index+1
    },
  }
}
</script>

<style lang="less" scoped>
.music{
  display:flex;
  justify-content: center;
  flex-wrap: wrap;

  .search{
    width: 70%;
    padding: 30px;
    display: flex;
  }

  .tag{
    width: 70%;
    display: flex;
  }

  .music-content{
    width: 70%;
    margin-top: 15px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .music-content-table{
      width: 100%;
    }
  }

  .pagination{
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }
}
</style>