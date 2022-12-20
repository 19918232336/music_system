<template>
  <div class="index">
    <div class="swiper">
      <div class="top">
        <div class="title">轮播图管理</div>
        <el-button @click="swiperEdit('')" class="add" type="primary">添加轮播图</el-button>
      </div>
      <!--轮播图表格-->
      <div class="swiper-content">
        <el-table
            :data="swiperData"
            stripe
            style="width: 100%">
          <el-table-column
              prop="path"
              label="图片"
              align="center">
            <template slot-scope="scope">
              <img :src="scope.row.path" style='width: 160px;height: 80px;'/>
            </template>
          </el-table-column>
          <el-table-column
              prop="operation"
              label="操作"
              align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="swiperEdit(scope.row.id)">编辑</el-button>
              <el-button type="text" @click="removeSwiper(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="recommend">
      <el-divider content-position="center"><span class="title">推荐歌曲</span></el-divider>
      <div class="recommend-content">
        <el-table
            :data="recommendData"
            stripe
            style="width: 100%">
          <el-table-column
              type="index"
              :index="indexMethod">
          </el-table-column>
          <el-table-column
              prop="img"
              label="封面"
              align="center">
            <template slot-scope="scope">
              <img :src="scope.row.img" style='width: 80px;height: 80px;'/>
            </template>
          </el-table-column>
          <el-table-column
              prop="name"
              label="歌名"
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
              <el-button type="text" @click="musicEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <index-swiper-edit
      :swiperOpen="swiperOpen"
      @closeSwiperEdit="closeSwiperEdit"
      :id="swiperId"
    ></index-swiper-edit>
    <recommend-edit
      :isOpen="isOpen"
      @closeEdit="closeEdit"
      :info="musicInfo"
    >
    </recommend-edit>
  </div>
</template>

<script>
import IndexSwiperEdit from '@/components/dialog/index-swiper-edit.vue'
import RecommendEdit from '@/components/dialog/recommend-edit.vue'
import {
  apiGetAllSwiper,
  apiRemoveSwiper,
  apiGetAllRecommended
} from '@/api/index.js'

export default {
  name: "recommend",
  components:{ IndexSwiperEdit,RecommendEdit },
  data(){
    return {
      swiperData:[], //轮播图列表
      recommendData:[], //推荐歌单列表
      swiperOpen: false,// 轮播图弹框是否开启
      swiperInfo: {},//轮播图数据
      swiperId: '',//轮播图id
      isOpen: false,//推荐歌曲弹框是否开启
      musicInfo: {}, //歌曲信息
      musicId: '',//歌曲id
    }
  },
  created(){
    this.getAllSwiper()
    this.getAllMusic()
  },
  methods:{
    //序号格式
    indexMethod(index){
      return index+1
    },
    //获取轮播图列表
    getAllSwiper(){
      let params = {
        pageSize: 100,
      }
      let res = apiGetAllSwiper(params)
      res.then(data => {
        console.log(data)
        this.swiperData = data.result
      })
    },
    //删除轮播图
    removeSwiper(id){
      let res = apiRemoveSwiper({id})
      res.then(data => {
        console.log(data)
        this.$message.success('删除轮播图成功')
        this.getAllSwiper()
      })
    },
    //添加/编辑轮播图
    swiperEdit(id){
      this.swiperId = id+''
      this.swiperOpen = true
    },
    //关闭轮播图弹框
    closeSwiperEdit(){
      this.swiperOpen = false
      this.getAllSwiper()
    },
    //获取推荐歌曲列表
    getAllMusic(){
        let res = apiGetAllRecommended()
        res.then(data => {
          console.log(data)
          if(data.code==0){
            data.result.forEach((item,index) => {
              item.recommend_id = index + 1
            })
            this.recommendData = data.result
            // console.log('推荐列表：',this.recommendData)
          }else{
            this.$message.error('获取推荐歌单失败，推荐歌曲被删除！')
            this.recommendData = []
          }
        })
    },
    //编辑歌曲信息
    musicEdit(info){
      this.musicInfo = info
      this.isOpen = true
    },
    //关闭推荐歌曲弹框
    closeEdit(){
      this.getAllMusic()
      this.isOpen = false
    },
  }
}
</script>

<style lang="less" scoped>
.index{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 30px;

  .swiper{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .top{
      width: 70%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title{
        font-weight: bold;
        font-size: 1.5rem;
        color: rgb(64, 158, 255);
      }
    }

    .swiper-content{
      width: 70%;
      margin-top: 20px;
    }
  }

  .recommend{
    width: 70%;
    margin-top: 50px;

    .title{
      font-weight: bold;
      font-size: 1.5rem;
      color: rgb(64, 158, 255);
    }

    .recommend-content{
      margin-top: 30px;
    }
  }
}
</style>