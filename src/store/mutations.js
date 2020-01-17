export default {
  Addcounter(state,payload){
    payload.count ++
  },
  addTocart(state,payload){
    state.carlist.push(payload)
  }
}