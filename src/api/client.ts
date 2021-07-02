// import axios from './Interceptors'
import axios from 'axios'
import { clientStorage } from 'constants/clientStorage'

/**
 * Sử dụng setoken nếu cần thiết
 * @param token
 */
export const setToken = async (token = '') => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const clearToken = async () => {
  axios.defaults.headers.common['Authorization'] = ''
}

const requestAbordCode = 'ECONNABORTED'

axios.defaults.baseURL = process.env.REACT_APP_API_GATEWAY
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 360000

const RequestClient = class {
  constructor() {
    const access_token = clientStorage.get('sp-afro4isc')
    if (access_token) {
      this.init(access_token)
    } else {
      this.init('')
    }
  }

  async init(access_token: string) {
    axios.defaults.headers.common['Authorization'] = access_token
  }
  async headers(params: any) {
    const keys = Object.keys(params)

    keys.forEach((key) => {
      axios.defaults.headers.common[key] = params[key]
    })
  }
  async get(endpoint: string, params: any) {
    try {
      const response = await axios.get(endpoint, { params: params })
      return response
    } catch (error) {
      this.handleError(error)
    }
  }

  async post(endpoint: string, body: any, params?: any) {
    try {
      const response = await axios.post(endpoint, body, { params: params })
      return response
    } catch (error) {
      this.handleError(error)
      return error.response
    }
  }

  async put(endpoint: string, body: any, params: any) {
    try {
      const response = await axios.put(endpoint, body, { params: params })
      return response
    } catch (error) {
      this.handleError(error)
      return error.response
    }
  }

  async delete(endpoint: string, data?: any) {
    try {
      const response = await axios.delete(endpoint, { data: data })
      return response
    } catch (error) {
      this.handleError(error)
    }
  }
  async upload(endpoint: string, file: any) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response
    } catch (error) {
      this.handleError(error)
      return error.response
    }
  }
  handleError(error: any) {
    // console.log(error.response);

    if (error.response && error.response.status === 401) {
      // xử lý logout đoạn này
    }
    if (error.code === requestAbordCode || ('response' in error && error.response === undefined)) {
      // delay(1000);
      error.recall = true
    }
    // throw error;
  }
}

const client = new RequestClient()

export { client }
