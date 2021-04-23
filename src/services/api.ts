import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://nlw-5-react.vercel.app/'
  // baseURL: 'http://localhost:3333/'
})

export const api2 = axios.create({
  // baseURL: 'https://nlw-5-react.vercel.app/'
  baseURL: 'http://localhost:3333/'
})
