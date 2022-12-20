<template>
  <div class="news-show">
    <el-card class="card">
      <div class="title">{{ newsInfo.title }}</div>
      <div class="content">
        {{newsInfo.content}}
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  apiGetNewsById
} from '@/api/index'

export default {
  name: "news-show",
  data(){
    return {
      newsInfo: {},
    }
  },
  mounted() {
    let id = this.$route.params.id
    this.getNews(id)
  },
  methods:{
    getNews(id){
      let params = {
        pageNum: 1,
        pageSize: 1,
        id: id
      }
      let res = apiGetNewsById(params)
      res.then(data => {
        console.log(data)
        this.newsInfo = data.result.list[0]
      })
    },
  },
}
</script>

<style lang="less" scoped>
.news-show{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 30px;

  .card{
    width: 70%;

    .title{
      width: 100%;
      font-weight: bold;
      font-size: 30px;
      text-align: center;
      margin-bottom: 30px;
    }

    .content{
      width: 100%;
      font-size: 20px;
    }
  }
}
</style>