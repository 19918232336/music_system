<template>
  <div class="news">
    <!--搜索框-->
    <div class="search">
      <el-input
          v-model="input"
          placeholder="请输入资讯标题"
          prefix-icon="el-icon-search"
      ></el-input>
      <el-button class="btn" @click="search(0)" type="primary">搜索</el-button>
      <el-button
          class="btn"
          @click="openEdit(null)"
          type="success">
        添加资讯
      </el-button>
    </div>

    <!--歌曲列表-->
    <div class="news-content">
      <el-table
          :data="newsListData"
          stripe
          class="news-content-table">
        <el-table-column
            prop="title"
            label="资讯标题"
            align="center">
        </el-table-column>
        <el-table-column
            prop="operation"
            label="操作"
            align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="openEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="5"
        :total="total">
    </el-pagination>
    <news-edit
      :isOpen="isOpen"
      @refresh="refresh"
      @closeEdit="closeEdit"
      :newsInfo="newsInfo"
    ></news-edit>
  </div>
</template>

<script>
import NewsEdit from '@/components/dialog/news-edit.vue'
import {
  apiGetAllNews,
  apiRemoveNews,
  apiGetNewsByTitle
} from "@/api/index";

export default {
  name: "news",
  components:{ NewsEdit },
  data(){
    return {
      input: '',//输入内容
      newsListData:[],//歌单列表
      isOpen: false,
      newsInfo: {},//歌曲信息
      total: 0,//分页总数
      currentPage: 0,//当前页码
      isSearch: false,//是否在搜索
    }
  },
  watch:{
    currentPage(val){
      if(this.isSearch){
        this.search(val)
      }else{
        this.getAllNews(val)
      }
    }
  },
  created(){
    this.getAllNews(this.currentPage)
  },
  methods:{
    //获取全部资讯
    getAllNews(page){
      let params = {
        pageSize: 5,
        pageNum: page,
      }
      let res = apiGetAllNews(params)
      res.then(data => {
        console.log(data)
        this.newsListData = data.result.list
        this.total = data.result.total
      })
    },
    //页码改变时触发
    handleCurrentChange(val){
      this.currentPage = val
    },
    //搜索按钮
    search(page){
      if(page == 0) this.currentPage =
      console.log('搜索')
      let params = {
        title: this.input,
        pageSize: 5,
        pageNum: page
      }
      let res = apiGetNewsByTitle(params)
      res.then(data => {
        console.log(data)
        this.newsListData = data.result.list
        this.total = data.result.total
        this.$message.success('搜索成功')
        this.isSearch = true
      })
    },
    //添加/编辑歌曲
    openEdit(info){
      this.isOpen = true
      this.newsInfo = info
    },
    //关闭添加/编辑歌曲弹框
    closeEdit(isUpdate){
      this.isOpen = false
    },
    //刷新列表
    refresh(arg){
      if(arg) this.getAllNews(this.currentPage)
    },
    //删除歌曲
    remove(info){
      let params = {
        id: info.id
      }
      let res = apiRemoveNews(params)
      res.then(data => {
        this.$message.success('删除资讯成功')
        this.getAllNews(this.currentPage)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.news{
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

  .news-content{
    width: 70%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .news-content-table{
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