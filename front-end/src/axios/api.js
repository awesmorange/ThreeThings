import { delKey } from '@/utils/store'
import store from '@/store'
import Qs from 'qs'
import axios from 'axios'
import { Loading } from 'element-ui';
import { Message } from 'element-ui';

export const get = (url, info = {}) => {
    let loadingInstance = Loading.service({ fullscreen: true });
    let data = { ...info, token:store.state.token }
    return new Promise((resolve, reject) => {
        axios.get(url,  { params: data })
            .then(res => {
                let mydata = res.data
                if (mydata.code == 0) {
                    Message({
                        message: mydata.msg,
                        type: 'error'
                    })
                    reject(mydata)
                }
                else if (mydata.coe == 100) {
                    delKey('token')
                    this.$store.commit('serToken', '')
                    this.$router.push('/Login')
                } 
                resolve(mydata)
            })
            .catch(err => reject(err))
            .finally(() => {
                loadingInstance.close();
            })
    })
}

export const post = (url, info = {}) => {
    let loadingInstance = Loading.service({ fullscreen: true });   
    let data = { ...info, token: store.state.token }
    return new Promise((resolve, reject) => {
        axios.post(url, Qs.stringify(data))
            .then(res => {
                let mydata = res.data
                if (mydata.code == 0) {
                    Message({
                        message: mydata.msg,
                        type: 'error'
                    })
                   reject(mydata)
                }
                else if (mydata.coe == 100) {
                    delKey('token')
                    this.$store.commit('serToken', '')
                    this.$router.push('/Login')
                } 
                resolve(mydata)
            })
            .catch(err => reject(err))
            .finally(() => {
                loadingInstance.close();
            })
    })
}