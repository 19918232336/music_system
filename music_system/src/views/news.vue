<template>
  <div class="news">
    <!--资讯列表-->
    <el-card v-for="item in newsList" class="news-all-item" shadow="hover">
      <div class="news-item">
        <div class="news-item-right">
          <div class="news-item-title">
            {{item.title}}
          </div>
          <div class="news-item-more" @click="toDetails(item.id)">查看详情><span class="iconfont"></span></div>
        </div>
      </div>
    </el-card>
    <!--分页-->
    <el-pagination
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
  apiGetAllNews
} from '@/api/index.js'

export default {
  name: "news",
  data(){
    return {
      newsList:[],
      currentPage: 0,//当前页码
      total: 0,//数据总数
    }
  },
  created(){
    this.getNews(0)
  },
  watch:{
    currentPage(val){
      this.getNews(val)
    }
  },
  methods:{
    //获取资讯列表
    getNews(page){
      let params = {
        pageNum: page,
        pageSize: 5,
      }
      let res = apiGetAllNews(params)
      res.then(data => {
        console.log(data)
        this.newsList = data.result.list
        this.total = data.result.total
      })
    },
    //查看详情
    toDetails(id){
      this.$router.push(`/news/show/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.news{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 30px;

  .news-all-item{
    width: 70%;
    min-height: 100px;
    margin-bottom: 20px;

    .news-item {
      display: flex;

      //.news-item-left {
      //  width: 30%;
      //  height: 180px;
      //
      //  img {
      //    width: 100%;
      //    height: 100%;
      //  }
      //}

      .news-item-right {
        padding-left: 20px;
        flex: 1;

        .news-item-title{
          height: 90%;
          font-size: 1.1rem;
          font-weight: bold;
        }

        .news-item-more{
          display: flex;
          justify-content: right;
          color: #b3b4b5;
          cursor:pointer;
        }
      }
    }
  }

  .pagination{
    margin-top: 10px;
    width: 100%;
    text-align: center;
  }
}
</style>