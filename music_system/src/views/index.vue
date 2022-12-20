<template>
  <div class="index">
    <!--  轮播图  -->
    <swiper class="banner" :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item, index) in bannerList" :key="index">
        <img :src="item.src" alt=""/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!--轮播图下放内容-->
    <div class="index-content">
      <div class="content-left">
        <!--推荐歌曲-->
        <div class="recommend">
          <div class="recommend-title">推荐歌曲</div>
          <div class="recommend-content">
            <div v-for="item in recommendList" class="recommend-content-item" @click="view(item.id)">
              <div class="recommend-content-item-img">
                <img :src="item.img"/>
              </div>
              <div class="recommend-content-item-title">{{ item.name }}</div>
              <div class="recommend-content-item-author">{{ item.author }}</div>
            </div>
          </div>
        </div>
        <!--新歌上架-->
        <div class="recommend" style="margin-top:30px;">
          <div class="recommend-title">新歌上架</div>
          <div class="recommend-content">
            <div v-for="item in newList" class="recommend-content-item" @click="view(item.id)">
              <div class="recommend-content-item-img">
                <img :src="item.img"/>
              </div>
              <div class="recommend-content-item-title">{{ item.name }}</div>
              <div class="recommend-content-item-author">{{ item.author }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <!--热门歌曲-->
        <el-card class="hot">
          <div class="top">
            <div class="top-left">热门歌曲</div>
            <div class="top-right">Top8</div>
          </div>
          <div class="hot-content">
            <div v-for="item in hotList" class="hot-content-item" @click="view(item.id)">
              <div class="hot-content-item-name">{{item.name}}</div>
              <div class="hot-content-item-author">{{item.author}}</div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>

</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import {
  apiGetAllSwiper,
  apiGetAllRecommended,
  apiGetNewMusic,
  apiGetHotMusic
} from '@/api/index.js'

export default {
  name: "index",
  components:{
    swiper,
    swiperSlide,
  },
  data(){
    return {
      swiperOption: {
        autoplay: true,
        speed: 300,
        loop: true,
        pagination: {
          el: ".swiper-pagination", //分页器
          clickable: true,
        },
      },
      bannerList:[], //轮播图列表
      recommendList:[],//推荐歌曲列表
      newList: [],//新歌列表
      hotList:[],//热门歌曲列表
    }
  },
  created(){
    this.getSwiper()
    this.getRecommend()
    this.getNew()
    this.getHotMusic()
  },
  methods:{
    //获取轮播图列表
    getSwiper(){
      let res = apiGetAllSwiper()
      res.then(data => {
        console.log(data)
        data.result.forEach(item => {
          this.bannerList.push({src: item.path})
        })
      })
    },

    //获取推荐歌单列表
    getRecommend(){
      let res = apiGetAllRecommended()
      res.then(data => {
        console.log(data)
        this.recommendList = data.result
        // data.result.forEach(item => {
        //   this.bannerList.push({src: item.path})
        // })
      })
    },

    //获取新歌列表
    getNew(){
      let res = apiGetNewMusic()
      res.then(data => {
        console.log(data)
        this.newList = data.result
      })
    },

    // 获取人歌曲
    getHotMusic(){
      let res = apiGetHotMusic()
      res.then(data => {
        console.log(data)
        this.hotList = data.result
      })
    },

    //查看音乐详情
    view(id){
      this.$router.push(`/music/show/${id}`)
    },
  }
}
</script>

<style lang="less" scoped>
.index {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .banner {
    margin-top: 10px;
    width: 100%;
    text-align: center;

    img {
      width: 95%;
      height: 400px;
    }
  }

  .index-content {
    width: 95%;
    display: flex;
    min-height: 300px;
    margin-top: 30px;

    .content-left {
      width: 70vw;

      .recommend {
        width: 100%;
        //background-color: red;
        margin-bottom: 10px;

        .recommend-title {
          width: 100%;
          text-align: center;
          font-weight: bold;
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .recommend-content {
          width: 100%;
          display: flex;
          justify-content: space-around;

          .recommend-content-item {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            width: 200px;
            cursor:pointer;

            .recommend-content-item-img {
              width: 100%;

              img {
                width: 100%;
                height: 160px;
                border-radius: 5px;
              }
            }

            .recommend-content-item-title {
              width: 100%;
              font-weight: 540;
            }

            .recommend-content-item-author {
              width: 100%;
              padding-top: 5px;
            }
          }
        }
      }
    }

    .content-right {
      flex: 1;

      .hot{
        margin-top: 30px;

        .top{
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;

          .top-left{
            color: red;
            font-size: 1.2rem;
            font-weight: bold;
          }

          .top-right{
            color: red;
            font-size: 1.2rem;
            font-weight: bold;
          }
        }

        .hot-content-item{
          height:50px;
          display:flex;
          justify-content: space-between;
          cursor:pointer;

          .hot-content-item-name{
            font-size: 1.1rem;
            font-weight: bold;
          }
        }

      }
    }
  }
}
</style>