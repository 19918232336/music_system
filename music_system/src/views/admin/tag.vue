<template>
  <div class="tag">
    <div class="tag-table">
      <el-table
          :data="tagList"
          border
          style="width: 100%">
        <el-table-column
            prop="name"
            label="标签名"
            align="center">
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
    <div class="btn">
      <el-button type="primary" @click="openEdit(null)">添加标签</el-button>
    </div>
    <tag-edit
      :isOpen="isOpen"
      @closeEdit="closeEdit"
      :tagInfo="tagInfo">
    </tag-edit>
  </div>
</template>

<script>
import TagEdit from '@/components/dialog/tag-edit.vue'
import {
  apiGetTag,
  apiRemoveTag,
} from '@/api/index.js'

export default {
  name: "tag",
  components:{ TagEdit },
  data(){
    return {
      tagList:[],
      isOpen: false,
      tagInfo: {},//歌曲信息
      currentPage: 0,
      total: 0,
    }
  },
  created(){
    this.getTagInfo(0)
  },
  watch:{
    currentPage(val){
      this.getTagInfo(val)
    }
  },
  methods:{
    //获取标签信息
    getTagInfo(page){
      let params = {
        pageSize: 5,
        pageNum: page,
      }
      let res = apiGetTag(params)
      res.then(data => {
        console.log(data.result)
        this.total = data.result.total
        this.tagList = data.result.list
      })
    },
    //添加/编辑标签
    openEdit(info){
      this.isOpen = true
      this.tagInfo = info
    },
    //删除标签
    remove(id){
      let params = {id}
      let res = apiRemoveTag(params)
      res.then(data => {
        console.log(data)
        if(data.code == 0){
          this.$message.success('删除标签成功')
          this.getTagInfo(this.currentPage)
        }else{
          this.$message.warning('标签被引用，禁止删除，请先修改引用该标签歌曲的标签信息')
        }
      })
    },
    //关闭添加/编辑标签弹框
    closeEdit(){
      this.isOpen = false
      this.tagInfo = {}
      this.getTagInfo(this.currentPage)
    },
    //刷新列表
    refresh(arg){
      console.log('刷新')
      if(arg) this.getTagInfo(this.currentPage)
    },
  }
}
</script>

<style lang="less" scoped>
.tag{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 30px;

  .btn{
    width: 35%;
    display: flex;
    justify-content: right;
  }

  .tag-table{
    width: 70%;
    margin: 30px 0;
  }

  .pagination{
    width: 35%;
  }
}
</style>