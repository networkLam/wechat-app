// index.ts
// 获取应用实例
// const app = getApp<IAppOption>()
// const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// Component({

// })
import request from "../../utils/request"

interface UserInfo{
  name:string,
  test():string,

}
const t:UserInfo={
  name:"",
  test(){
    this.name = 'test'
    return this.name
  }
}

type name = string;



Page({
  data:{
    userData:[{}],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    swiperNav:{
      i:0,
      x:0,
      arr:[
        {v:0,txt:"星期一"},
  　　　{ v: 1, txt: "星期二" },
  　　　{ v: 2, txt: "星期三" },
  　　　{ v: 3, txt: "星期四" },
  　　　{ v: 4, txt: "星期五" },
  　　　{ v: 5, txt: "星期六" }
      ]
    },
    active: 0,
    isShowBack:false



  },
  // what's the function did ?
  showUser(){
    wx.setStorageSync("key",'value');
    return ""
  },
  onChange(event:any) {
    console.log(event.detail)
   
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  todetails(event:any){
    //获取产品ID
    const product_id:string = event.target.id;
    console.log(product_id);
    wx.navigateTo({
      url:"/pages/productDetails/productDetails?id="+product_id,
    })
  },
  tosearch(){
    // click search icon to search page
    wx.navigateTo({
      url : "/pages/search/search"
    })

  },
  // 回到顶部
  backTop(){
    console.log("you have clicked this element")
    wx.pageScrollTo({
      scrollTop:0
    })
  },
  //function listener scroll
  onPageScroll(e:any){
    // console.log(e)
    if(e.scrollTop <= 200){
      this.setData({
        isShowBack:false
      })
    }else{
      this.setData({
        isShowBack:true
      })
    }
  },
  
})