export default {
  Addcounter(state,payload){
    payload.count ++
  },
  addTocart(state,payload){
    payload.checked = true
    state.carlist.push(payload)
  }
}