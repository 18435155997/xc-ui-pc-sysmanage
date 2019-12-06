<template>
 <div>  <!---编写页面静态部分，即view部分-->
   <!--查询表单-->
   <el-form :model="params">
     <el-select v-model="params.siteId" placeholder="请选择站点">
     <el-option
       v-for="item in siteList"
       :key="item.siteId"
       :label="item.siteName"
       :value="item.siteId">
     </el-option>
     </el-select>
     页面别名：<el-input v-model="params.pageAliase" placeholder="请输入内容" style="width: 100px"></el-input>
     <el-button type="primary"  size="small" v-on:click="query">查询</el-button>
     <router-link
        :to="{
                path:'/cms/page/add',
                query:{
                    page:this.params.page,      // 取出数据对象的参数，代入路由中
                    siteId:this.params.siteId
                }
        }">
        <el-button type="primary"  size="small" >新增</el-button>
     </router-link>
   </el-form>

   <el-table
     :data="list"
     style="width: 100%">
     <el-table-column type="index" width="60">
     </el-table-column>
     <el-table-column prop="pageName" label="页面名称" width="120">
     </el-table-column>
     <el-table-column prop="pageAliase" label="别名" width="120">
     </el-table-column>
     <el-table-column prop="pageType" label="页面类型" width="150">
     </el-table-column>
     <el-table-column prop="pageWebPath" label="访问路径" width="250">
     </el-table-column>
     <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
     </el-table-column>
     <el-table-column prop="pageCreateTime" label="创建时间" width="180" >
     </el-table-column>
     <el-table-column label="操作" width="80">
       <template slot-scope="page">
         <!--
            page.row 拿到行里的数据;
            page.row.pageId 从行当中取pageId
            slot-scope="page" 增加一个插槽，在插槽里对外拿列表里的数据；拿到的是一行中的数据
            说明：slot-scope=""中的内容page，应该与el-button中@click中参数page一致
            -->
         <el-button size="small"type="text" @click="edit(page.row.pageId)">编辑
         </el-button>
         <el-button size="small"type="text" @click="del(page.row.pageId)">删除
         </el-button>
       </template>
     </el-table-column>
   </el-table>
   <el-pagination
     layout="prev, pager, next"
     :total=total
     :page-size = params.size
     :current-page = params.page
     @current-change="changePage"
     style="float: right"
   > <!--@current-change="changePage" 同 v-on:current-change="changePage"-->
   </el-pagination>
 </div>
</template>
<script> /*编写页面静态部分，即model及vm部分。*/
import * as CmsApi from '../api/cms';
export default {
  data() {
    return {
      siteList:[], // 站点列表
      list: [],
      total:0,
      params:{    // 当前第几页 & 每页显示几条
        page:2 ,
        size:10,
        siteId:'',
        pageAliase:''
      }
    }
  },
  methods:{
    //实现：点击查询按钮，触发弹出提示
    query:function () {
      // alert("查询");
      // 调用服务端接口
      CmsApi.page_list(this.params.page,this.params.size,this.params).then((res)=>{
        //将res结果数据赋值给数据模型对象
        this.list=res.queryResult.list;
        this.total=res.queryResult.total;
      })
    },
    //实现：点击分页按钮，触发调用query方法
    changePage:function (val) {
      // alert(val); // 点击的分页按钮
      this.params.page = val;
      this.query(); // 调用当前实例的某一个方法，用this.
    },
    edit:function (pageId) {
      // 打开修改页面
      // 改变路由
      this.$router.push({
        // 打开指定页面
        // path:"/cms/page/edit?pageId"+pageId
        // path:"/cms/page/edit/001"            // 通过服务端的springmvc传参
        // 定义路由，路由通过url传参
        path:"/cms/page/edit/"+pageId       // 通过路由，拿到变量的值
      })
    },
    del:function(pageId){
      //debugger
      this.$confirm('确认删除此页面吗?', '提示', {}).then(() => {
        CmsApi.page_del(pageId).then(res=>{
          if(res.success){
            this.$message.success("删除成功");
            this.query();
          }else{
            this.$message.success("删除失败");
          }
        })
      })
    }
  },
  created(){
    this.params.page = Number.parseInt(this.$route.query.page || 1);
    this.params.siteId = this.$route.query.siteId;
  },
  mounted() { //默认查询页面
     this.query()
     this.siteList = [
       {
         siteId:'5a751fab6abb5044e0d19ea1',
         siteName:'门户主站'
       },{
         siteId:'102',
         siteName:'测试站'
      }
     ]
  }
}
</script>
<style> /*编写页面样式，不是必须*/
</style>
