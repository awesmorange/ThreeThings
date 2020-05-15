// state.js
import { getKey } from '@/utils/store/'
const state = {
    token: getKey('token'),
    user: {}
  }
  
  export default state