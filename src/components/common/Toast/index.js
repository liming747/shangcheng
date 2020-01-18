import Toast from './toast'
const obj = {}

obj.install = function(Vue){
  // console.log('执行tosat组件',vue)
  // 1 创建组件构造器
  const toastcontrustor = Vue.extend(Toast)

  // 2 通过new 的方式 根据组件构造器 可以构建出来一个组件对象
  const  toast = new toastcontrustor()
  
  // 3 将组建独享手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4 toast.$el 拿到的就是对应的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj