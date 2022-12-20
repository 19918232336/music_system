<template>
  <div class="music-show">
    <el-card class="card">
      <div class="top">
        <div class="left">
          <img :src="musicInfo.img" />
        </div>
        <div class="center">
          <div class="center-item">
            歌名:<span style="margin-left: 30px;">{{musicInfo.name}}</span>
          </div>
          <div class="center-item">
            作者:<span style="margin-left: 30px;">{{musicInfo.author}}</span>
          </div>
          <div class="center-item">
            时长:<span style="margin-left: 30px;">{{musicInfo.duration}}</span>s
          </div>
          <div class="center-item">
            标签:<span style="margin-left: 30px;"><el-tag>{{musicInfo.tag_info.tag_name}}</el-tag></span>
          </div>
          <div class="center-item">
            播放量:<span style="margin-left: 30px;">{{musicInfo.view}}</span>
          </div>
          <div class="center-item">
            发布时间:<span style="margin-left: 10px;">{{musicInfo.createdAt | filter}}</span>
          </div>
        </div>
        <div class="right">
          <el-button @click="cancel">返回</el-button>
        </div>
      </div>
      <player
          :img="musicInfo.img"
          :music-list="[musicInfo.path]">
      </player>
    </el-card>
  </div>
</template>

<script>
import Player from '@/components/player.vue'
import {
  apiGetMusicById
} from '@/api/index.js'

export default {
  name: "music-show",
  components:{ Player },
  data(){
    return {
      musicInfo:{//音乐信息
        tag_info:{
          tag_name:''
        }
      }
    }
  },
  filters: {
    filter(time){
      if(time){
        time = time.replace('T',' ')
        time = time.replace('.000Z','')
      }
      console.log(time)
      return time
    }
  },
  mounted() {
    let music_id = this.$route.params.id
    this.getMusicInfo(music_id)
  },
  methods:{
    //获取音乐信息
    getMusicInfo(id){
      let res = apiGetMusicById({id})
      res.then(data => {
        console.log(data)
        this.musicInfo = data.result
      })
    },
    //返回
    cancel(){
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.music-show{
  width: 100%;
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .card{
    width: 60%;
  }

  .top{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    .left{
      width: 400px;
      height: 500px;

      img{
        width: 400px;
        height: 500px;
      }
    }

    .center{
      flex:1;
      padding-left: 30px;

      .center-item{
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }

}
</style>