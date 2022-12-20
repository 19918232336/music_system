<template>
  <div class="music">
    <!--搜索框-->
    <div class="search">
      <el-input
        v-model="input"
        placeholder="请输入歌名"
        prefix-icon="el-icon-search"
      ></el-input>
      <el-button class="btn" @click="search(0)" type="primary">搜索</el-button>
      <el-button
        class="btn"
        @click="openEdit(null)"
        type="success">
        添加歌曲
      </el-button>
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
            prop="img"
            label="封面"
            align="center">
          <template slot-scope="scope">
            <img style='width: 80px;height: 80px;'
                 :src="`http://localhost:8000/${scope.row.img}`"/>
          </template>
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
            <el-button type="text" @click="openEdit(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="5"
        :total="total">
    </el-pagination>
    <music-edit
      :isOpen="isOpen"
      @closeEdit="closeEdit"
      :id="musicId"
      @refresh="refresh">
    </music-edit>
  </div>
</template>

<script>
import MusicEdit from '@/components/dialog/music-edit.vue'
import {
  apiGetAllMusic,
  apiGetMusicByName,
  apiRemoveMusic
} from '@/api/index.js'

export default {
  name: "music",
  components:{ MusicEdit },
  data(){
    return {
      input: '',//输入内容
      musicListData:[],//歌单列表
      isOpen: false,
      musicId: '',//歌曲信息
      total: 0,//分页总数
      currentPage: 0,//当前页码
      isSearch: false,//是否为搜索状态
    }
  },
  watch:{
    currentPage(val){
      if(this.isSearch){
        this.search()
      }else{
        this.getAllMusic(val)
      }
    }
  },
  created(){
    this.getAllMusic(0)
  },
  methods:{
    //获取音乐列表
    getAllMusic(page){
      let params = {
        pageSize: 5,
        pageNum: page,
      }
      let res = apiGetAllMusic(params)
      res.then(data => {
        console.log(data)
        this.musicListData = data.result.list
        this.total = data.result.total
        console.log(this.total)
        // console.log(this.musicListData)
      })
    },
    //刷新列表
    refresh(arg){
      if(arg) this.getAllMusic(this.currentPage)
    },
    //页码改变时触发
    handleCurrentChange(val){
      this.currentPage = val
    },
    //序号格式
    indexMethod(index){
      return index+1
    },
    //搜索按钮
    search(page){
      console.log('搜索')
      let params = {
        name: this.input,
        pageSize: 5,
        pageNum: page,
      }
      let res = apiGetMusicByName(params)
      res.then(data => {
        console.log(data)
        this.isSearch = true
        this.$message.success('搜索成功')
        this.musicListData = data.result.list
        this.total = data.result.total
      })
    },
    //添加/编辑歌曲
    openEdit(id){
      // console.log(info)
      if(id) {
        this.musicId = id+''
      }
      this.isOpen = true
    },
    //关闭添加/编辑歌曲弹框
    closeEdit(){
      this.musicId = ''
      this.isOpen = false
    },
    //删除歌曲
    remove(id){
      console.log(id)
      let params = {id}
      let res = apiRemoveMusic(params)
      res.then(data => {
        console.log(data)
        if(data.code==0){
          this.$message.success('删除成功')
        }else{
          this.$message.warning('推荐歌单中有引用不能删除，请先修改推荐歌单！')
        }
        this.getAllMusic()
      },err => {
        this.$message.warning('删除失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.music{
  width:100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 30px;

  .search{
    width: 70%;
    display: flex;

    .btn{
      margin-left: 10px;
    }
  }

  .music-content{
    width: 70%;
    margin-top: 30px;
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