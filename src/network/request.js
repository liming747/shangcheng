import axios from 'axios'

export function request(config) {
    // 1创建axios实例
    const instanse = axios.create({
      // baseURL: 'http://123.207.32.32:8000',
      // baseURL: 'http://123.207.32.32:8000/api/w1',
      baseURL: 'http://106.54.54.237:8000/api/w1',//备用地址
      timeout: 5000
    })
    // 2axios 拦截
    instanse.interceptors.request.use(config=>{
      console.log('请求拦截');

      // 加动画
      return config
    },err =>{
      console.log(err)
    })

    instanse.interceptors.response.use(res =>{
      console.log('响应拦截')
      return res.data
    },err =>{
      console.log(err)
    })
    // 3发送请求
    return instanse(config)    
}



// export function request(config) {

//   return new Promise((resolve, reject) => {
//     // 创建axios实例
//     const instanse = axios.create({
//       baseURL: 'http://zcsc.bjlitian.com:8716',
//       timeout: 5000
//     })

//     instanse(config)
//       .then(res => {
//        resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }
