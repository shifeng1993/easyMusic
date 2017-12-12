import axios from 'axios';
import qs from 'querystring';
import httpConfig from '../../config/httpConfig.js';
import storage from '../storage';
import {navigation} from '../../../App';

// 默认配置
axios.defaults.baseURL = httpConfig.baseUrl + (!httpConfig.port? '' : ':') + httpConfig.port + httpConfig.prefix;
axios.defaults.timeout = 60000;
axios.defaults.headers = {
  'axios-header': 'axios'
};

// 超时
const checkTimeout = async (res) => {
  if (res && res.data === 'timeout'||res && res.data === 'timeout') {
    await storage.clear();
    navigation.navigate('Login');
    return res
  } else {
    return res
  }
}

// fetch感觉略麻烦，不清爽，直接引了个axios，用es7写的。
export default class http {
  static async get(url, params) {
    /**
     * params{
     *  goods：id，
     *  name：string
     * } ==> ?goods=id&name=string
     */
    try {
      let query = await qs.stringify(params)
      let res = null;
      if (!params) {
        res = await axios.get(url)
      } else {
        res = await axios.get(url + '?' + query)
      }
      checkTimeout(res)
      return res
    } catch (error) {
      console.warn(error);
    }
  }
  static async post(url, params) {
    try {
      let res = await axios.post(url, params)
      checkTimeout(res)
      return res
    } catch (error) {
      console.warn(error);
    }
  }
  static async patch(url, params) {
    try {
      let res = await axios.patch(url, params)
      checkTimeout(res)
      return res
    } catch (error) {
      console.warn(error);
    }
  }
  static async put(url, params) {
    try {
      let res = await axios.put(url, params)
      checkTimeout(res)
      return res
    } catch (error) {
      console.warn(error);
    }
  }
  static async delete(url, params) {
    /**
     * params默认为数组
     */
    try {
      let res = await axios.post(url, params)
      checkTimeout(res)
      return res
    } catch (error) {
      console.warn(error);
    }
  }
  static async upload(url, formdata) {
    const config = {
      headers:{
        'Content-Type':'multipart/form-data',
      } 
    }
    try {
      let res = await axios.post(url, formdata, config)
      checkTimeout(res)
      return res
    } catch (error) {
      console.warn(error);
    }
  }
}