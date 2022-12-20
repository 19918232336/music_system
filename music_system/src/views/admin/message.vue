<template>
  <div class="message">
    <el-card class="message-card">
      <div class="message-content">
        <div v-for="item in messageList" class="message-item">
          <!--父级评论-->
          <div class="parent-message">
            <div class="message-item-left">
              <img :src="item.userInfo.img"/>
            </div>
            <div class="message-item-right">
              <div class="message-item-name">
                {{ item.userInfo.username }}
                <el-tag v-if="item.userInfo.permissions" type="success" style="margin-left: 30px;">管理员</el-tag>
              </div>
              <div class="message-item-message">{{ item.content }}</div>
              <div class="message-item-date">
                {{ item.createdAt | filter }}
                <el-button type="text" color="rgb(71, 114, 237)" @click="reply(item.userInfo.username,item.id)">回复</el-button>
                <el-button type="text" style="color:red" @click="remove(item.id)">删除</el-button>
              </div>
            </div>
          </div>
          <!--子级评论-->
          <div class="child-message" v-if="item.children.length>0">
            <div class="child-message-item" v-for="item1 in item.children">
              <div class="message-item-left">
                <img :src="item1.userInfo.img"/>
              </div>
              <div class="message-item-right">
                <div class="message-item-name">{{ item1.userInfo.username }}</div>
                <div class="message-item-message">
                  <span v-if="item1.reply_username!==null" style="color:rgb(64, 158, 255)">@{{ item1.reply_username }}</span>
                  {{ item1.content }}
                </div>
                <div class="message-item-date">
                  {{ item1.createdAt | filter }}
                  <el-button type="text" color="rgb(71, 114, 237)" @click="reply(item1.userInfo.username,item.id)">回复</el-button>
                  <el-button type="text" style="color:red" @click="remove(item1.id)">删除</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-box">
        <div v-show="replyUser" class="reply-username">
          <div class="text">@{{replyUser}}</div>
          <div class="close"><el-button @click="close" type="text">取消</el-button></div>
        </div>
        <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="textarea2">
        </el-input>
        <div class="btn">
          <el-button type="info" @click="empty" plain>清空</el-button>
          <el-button type="primary" @click="release">发表</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  apiGetMessage,
  apiRemoveMessage,
  apiCreateMessage
} from '@/api/index.js'

export default {
  name: "message",
  data(){
    return {
      textarea2: '',//输入内容
      messageList: [],//评论列表
      replyUser: '',//回复人
      parents_id: 0,//父级id
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
  created(){
    this.getMessage()
  },
  methods:{
    //获取评论列表
    getMessage(){
      let res = apiGetMessage()
      res.then(data => {
        console.log(data)
        this.messageList = data.result
      })
    },

    //清空
    empty(){
      this.textarea2 = ''
    },

    //发布
    release(){
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      console.log('userInfo:',userInfo)
      let params = {}
      if(this.replyUser){ //回复
        params = {
          user_id: userInfo.id,
          content: this.textarea2,
          parents_id: this.parents_id,
          reply_username: this.replyUser
        }
      }else{ //发布新消息
        params = {
          user_id: userInfo.id,
          content: this.textarea2,
          parents_id: this.parents_id,
        }
      }
      let res = apiCreateMessage(params)
      res.then(data => {
        this.textarea2 = ''
        this.getMessage()
        this.$message.success('发布成功')
      })
    },

    // 回复
    reply(username,parents_id){
      console.log(username,parents_id)
      this.replyUser = username
      this.parents_id = parents_id
    },

    //取消回复
    close(){
      this.replyUser = ''
      this.parents_id = 0
    },

    //删除评论
    remove(id){
      console.log(id)
      let res = apiRemoveMessage({id})
      res.then(data => {
        this.getMessage()
        this.$message.success('删除评论成功')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.message{
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30px;

  .message-card{
    width: 70%;
    margin-bottom: 30px;

    .message-content{
      height: 51vh;
      overflow-y: auto;

      .message-item{
        width: 100%;
        margin-bottom: 50px;

        .parent-message{
          display: flex;
          border-bottom: 1px solid #b3b4b5;

          .message-item-left{
            width: 90px;
            height: 90px;

            img{
              width: 100%;
              height: 100%;
            }
          }

          .message-item-right{
            padding-left: 15px;

            .message-item-name{
              font-weight: bold;
              font-size: 1.1rem;
              height: 30px;
            }

            .message-item-message{
              min-height: 40px;
            }

            .message-item-date{

            }
          }
        }

        .child-message{
          padding-left: 90px;

          .child-message-item{
            display: flex;
            margin: 20px 0;
            width: 98%;
            border-bottom: 1px solid #b3b4b5;

            .message-item-left{
              width: 70px;
              height: 70px;

              img{
                width: 100%;
                height: 100%;
              }
            }

            .message-item-right{
              padding-left: 15px;

              .message-item-name{
                font-weight: bold;
                font-size: 1.1rem;
                height: 30px;
              }

              .message-item-message{
                min-height: 40px;
              }

              .message-item-date{

              }
            }
          }
        }
      }
    }

    .input-box{
      margin-top: 30px;

      .reply-username{
        display:  flex;
        justify-content: space-between;

        .text{
          color: rgb(64, 158, 255);
        }

        .close{
          color: #8c939d;
        }
      }

      .btn{
        margin-top:10px;
        display: flex;
        justify-content: right;
      }
    }
  }
}
</style>