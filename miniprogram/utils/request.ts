/**
 * 
 * @param link:链接 
 * @param md ：方式
 * @param body ：内容
 *  
 * 
 * // return new promise((resolve,reject)=>{
// wx.request({
//     ...parent,
//     url:"http://localhost:5001"+parent.url,
//     success:res=>{
//         resolve(res)
//     },
//     fail:err=>{
//         reject(err)
//     }
// })
​
// })
 */

export default function request(link:string,md:'GET'|'POST',body:Object = {}){
  return new Promise((resolve,reject)=>{
      let token = wx.getStorageSync("token") == "" ? '' : wx.getStorageSync("token") as string;
      wx.request({
        url:"http://localhost:8080"+link,
        method:md,
        data:body,
        header:{token},
        success :(res:any)=>{
          resolve(res)
        },
        fail:(res:any)=>{
          reject(res)
        }
      })

  })
 
}