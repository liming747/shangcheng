export default{
  addcart(context,payload){
    // 新添加的商品数据
    // let oldproduct = null
    // 1 for(let i of state.carlist){
    //   if(item.iid === payload.iid){
    //     oldproduct = item
    //   }
    // }
    // 2  let index = state.carlist.indexOf(payload)
    // 判断oldproduct

    // 检测是否有商品 
    let oldproduct = context.state.carlist.find(item =>
       item.iid === payload.iid 
    )
    if(oldproduct){
      oldproduct.count += 1
      context.commit('Addcounter',oldproduct)
    }else{
      payload.count = 1
      // context.state.carlist.push(payload)
      context.commit('addTocart',payload)
    } 
  }
}