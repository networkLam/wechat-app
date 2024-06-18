// pages/addressManage/addressManage.ts
import URL from "../../utils/URL"
import request from "../../utils/request"

interface RequestData {
  addId: number,
  address: string,
  phone: string,
  contacts: string,
  uid: number
}

interface ShowListData {
  addId: number,
  major_address: string,
  minor_address: string,
  phone: string,
  contacts: string,
  major_origin?:string
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    addresssList: [] as ShowListData[],
    address_origin : "" ,//保存带斜杠的major_address信息
    selection:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e: any) {
    // console.log("地址管理")
    console.log(e)
    const temp = Boolean(e.selection);
    // console.log(temp);
    this.data.selection = temp;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const temp_arr:ShowListData[] = [] ;//临时的地址数组列表 用于刷新
    request("/api/address/browser", 'GET').then((res: any) => {
      const { data }: { data: RequestData[] } = res.data;
      //分好主要地址 和 次要地址
      data.forEach(item => {
        let major_address = ""
        let minor_address = ''
        let temp_major_origin = ''
        const temp_obj: ShowListData = {
          addId: 0,
          major_address: "",
          minor_address: "",
          phone: "",
          contacts: "",
          major_origin:""
        }
       const divide = item.address.split("/");//对地址进行裁切
        // console.log(divide)
         divide.forEach((_,index)=>{
           if(index < 3){
            major_address+=divide[index];
            temp_major_origin+=(divide[index]+"/")
           }else{
            minor_address+=divide[index];
           }
         });
         temp_obj.addId = item.addId;
         temp_obj.contacts = item.contacts;
         temp_obj.phone = item.phone;
         temp_obj.major_address = major_address;
         temp_obj.minor_address = minor_address;
         temp_obj.major_origin = temp_major_origin;
         temp_arr.push(temp_obj)
      });
      console.log(temp_arr)
      //刷新数据
      this.setData({
        addresssList:temp_arr
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  jump(e: any) {
    console.log(e)
    const {cantacts,addId,major_address,minor_address,phone,major_origin} = e.detail;
    //带参跳转
    wx.navigateTo({
      url: `/pages/addressEdit/addressEdit?cantacts=${cantacts}&addId=${addId}&major_address=${major_address}&minor_address=${minor_address}&phone=${phone}&major_origin=${major_origin}`
    })
  },
  add_address() {
    wx.navigateTo({
      url: "/pages/addressEdit/addressEdit?type=add"
    })
  },
  select_add(e:any){
    if(this.data.selection){ //证明是从选择地址进入的
     console.log(e);
     const {addId}:{addId:number} = e.currentTarget.dataset.addr;
     console.log(addId)
     wx.setStorageSync("addId",addId);
     wx.navigateBack({
       delta:1
     })
    }else{
      console.log("other way into here")
    }
    
  }
})