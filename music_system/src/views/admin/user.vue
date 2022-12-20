<template>
  <div class="user">
    <!--搜索框-->
    <div class="search">
      <el-input
          v-model="input"
          placeholder="请输入用户名"
          prefix-icon="el-icon-search"
      ></el-input>
      <el-button class="btn" @click="search(0)" type="primary">搜索</el-button>
      <el-button
          class="btn"
          @click="openEdit('')"
          type="success">
        添加用户
      </el-button>
    </div>

    <!--歌曲列表-->
    <div class="user-content">
      <el-table
          :data="userListData"
          stripe
          class="user-content-table">
        <el-table-column
            type="index"
            :index="indexMethod">
        </el-table-column>
        <el-table-column
            prop="img"
            label="头像"
            align="center">
          <template slot-scope="scope">
            <img style='width: 80px;height: 80px;'
                 :src="`${scope.row.img}`"/>
          </template>
        </el-table-column>
        <el-table-column
            prop="username"
            label="用户名"
            align="center">
        </el-table-column>
        <el-table-column
            prop="password"
            label="密码"
            align="center">
        </el-table-column>
        <el-table-column
            prop="permissions"
            label="权限"
            align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.permissions">管理员</el-tag>
            <el-tag v-else="scope.row.permissions">普通用户</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="operation"
            label="操作"
            align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="openEdit(scope.row)">编辑</el-button>
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
        :current-page.sync="currentPage"
        :page-size="5"
        :total="total">
    </el-pagination>
    <user-edit
      :isOpen="isOpen"
      @closeEdit="closeEdit"
      :username="username"
      @refresh="refresh"
    ></user-edit>
  </div>
</template>

<script>
import UserEdit from '@/components/dialog/user-edit.vue'
import {
  apiGetAllUser,
  apiGetUserByUsername,
  apiRemoveUser,
} from '@/api/index.js'

export default {
  name: "user",
  components:{UserEdit},
  data(){
    return {
      input: '',//输入内容
      userListData:[],//用户列表
      isOpen: false,
      total: 0,//分页总数
      currentPage: 0,//当前页码
      imgPath: 'http://localhost:8080/music/uploadImg',
      username:'',
      isSearch: false,//是否为搜索状态
    }
  },
  created(){
    this.getUserList(0)
  },
  watch:{
    currentPage(val){
      if(this.isSearch){
        this.search(val)
      }else{
        this.getUserList(val)
      }
    }
  },
  methods:{
    //获取用户信息
    getUserList(page){
      let params = {
        pageSize: 5,
        pageNum: page,
      }
      let res = apiGetAllUser(params)
      res.then(data => {
        console.log(data)
        this.userListData = data.result.list
        this.total = data.result.total
        // console.log(this.total)
        // console.log(this.musicListData)
      })
    },
    //搜索按钮
    search(page){
      console.log('搜索')
      let params = {
        username: this.input,
        pageSize: 5,
        pageNum: page,
      }
      let res = apiGetUserByUsername(params)
      res.then(data => {
        console.log(data.result.list)
        this.userListData = data.result.list
        this.total = data.result.total
        this.$message.success('搜索成功')
        this.isSearch = true
      })
    },
    //添加/编辑用户
    openEdit(info){
      this.username = info.username
      this.isOpen = true
    },
    //关闭添加/编辑用户弹框
    closeEdit(){
      this.username = ''
      this.isOpen = false
    },
    //删除用户
    remove(id){
      let res = apiRemoveUser({id})
      res.then(data => {
        console.log(data)
        this.$message.success('删除成功')
        this.getUserList(this.currentPage)
      })
    },
    //序号格式
    indexMethod(index){
      return index+1
    },
    //刷新列表
    refresh(arg){
      if(arg) this.getUserList(this.currentPage)
    },
  }
}
</script>

<style lang="less" scoped>
.user{
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

  .user-content{
    width: 70%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .user-content-table{
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