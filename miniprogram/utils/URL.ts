//本项目中需要使用到的所有API
export default {
  LOGIN : "/api/login",
  REGISTER:"/api/user/register",
  USERINFO:"/api/userinfo",
  GETCOLLECTION:"/api/collection/query",
  GETGOODS:"/api/product/page/",
  GETPRODUCTINFO:"/api/product/info?pdId=",//根据商品id返回商品信息
  GETPRODCUTMOMRPICTURE:"/api/picture/detail?pd_id=",//获取商品详情页的图片
  ADDCOLLECTION:"/api/collection/add?id=",//添加收藏
  QUERYCOLLECTION:"/api/collection/query/single?id=",//查询某样商品是否已经被收藏了
  REMOVECOLLECTION:"/api/collection/remove?id=",//对商品进行移除操作
  ADDCART : "/api/cart/add",//添加商品到购物车
  GETCARTLIST:"/api/cart/query",//获取购物车列表
  ADDRESSADDITIONAL:"/api/address/add",//添加地址
}