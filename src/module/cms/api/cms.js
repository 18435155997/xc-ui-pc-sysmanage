import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

// 使用webpack打包，此处需使用export
export const page_list = (page,size,params)=>{
  //将json对象转成key/value对
  let query= querystring.stringify(params);
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size+'?'+query);
}

// 新增方法
export const page_add = params =>{
  return http.requestPost(apiUrl+'/cms/page/add',params);
}

// 根据id查询页面
export const page_get = id => {
return http.requestQuickGet(apiUrl+'/cms/page/get/'+id);
}

// 修改页面的提交
export const page_edit = (id,params) => {

}

