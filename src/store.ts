import axios from './network/index'
import { createStore } from 'vuex'
import { getColumns, getColumn, getPosts } from './network/columns'
import { toLogin, getCurrentUser } from './network/user'
import { post } from './network/file'
import { findPostById, updatePost, deletePost } from './network/posts'
import { arrToObj, objToArr } from './helper'

export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P;
}

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}


export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}

interface ListProps<P> {
  [id: string]: P;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

export interface GlobalDataProps {
  token: string;
  error: GlobalErrorProps;
  loading: boolean;
  columns: { data: ListProps<ColumnProps>; currentPage: number; total: number };
  posts: { data: ListProps<PostProps>; loadedColumns: string[] };
  user: UserProps;
}


const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {}, loadedColumns: [] },
    user: { isLogin: false }
  },
  getters: {
    getColumns: (state) => {
      console.log(state.columns.data)
      return objToArr(state.columns.data)
    },
    getColumnById: (state) => (id: string) => {
      return state.columns.data[id]
    },
    getPostsByCid: (state) => (cid: string) => {
      return objToArr(state.posts.data).filter(post => post.column === cid)
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.data[id]
    }
  },
  mutations: {
    // 公共部分  
    setLoading(state, status: boolean) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e;
    },
    // column部分
    createPost(state, newPost) {
      state.posts.data[newPost._id] = newPost
    },
    fetchColumns(state, rawData) { // 获取专栏列表信息
      const { data } = state.columns
      const { list, count, currentPage } = rawData
      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: count,
        currentPage: currentPage * 1
      }
    },
    fetchColumn(state, rawData) { // 获取专栏详情信息（例如专栏的简介等）
      if (!rawData || !rawData._id) return
      state.columns.data[rawData._id] = rawData
    },
    fetchPosts(state, payload) { // 获取专栏中文章列表
      if (!payload || !payload.data) return
      state.posts.data = { ...state.posts.data, ...arrToObj(payload.data.list) }
      // console.log('payload',payload)
      state.posts.loadedColumns.push(payload.cid)
    },
    fetchPost(state, rawData) { // 获取专栏中文章详情
      state.posts.data[rawData._id] = rawData
      // console.log(state.posts.data)
    },
    // user部分
    login(state, data) {
      state.token = data.token
      // state.user.isLogin = true
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
      localStorage.setItem('token', data.token)
    },
    fetchCurrentUser(state, data) {
      // console.log(data)
      state.user = { isLogin: true, ...data }
    },
    logout(state) {
      // console.log(state.user)
      state.user = {
        isLogin: false,
      }
      state.token = ''
      localStorage.removeItem('token')
    },
    // 更新文章
    updatePost(state, data) {
      state.posts.data[data._id] = data
      // console.log( state.posts.data)
    },
    // 删除文章
    deletePost(state, data) {
      delete state.posts.data[data._id]
      console.log(data)
    }
  },
  actions: {
    // column部分
    async fetchColumns({ state, commit }, params = {}) {
      const { currentPage = 1, pageSize = 3 } = params
      if (state.columns.currentPage < currentPage) {
        const { data } = await getColumns(currentPage, pageSize)
        return commit('fetchColumns', data)
      }
    }, 
    async fetchColumn({ state, commit }, cid) {
      if (!state.columns.data[cid]) {
        const { data } = await getColumn(cid)
        return commit('fetchColumn', data)
      }
    },
    async fetchPosts(context, cid) {
      if (!context.state.posts.loadedColumns.includes(cid)) {
        const { data } = await getPosts(cid)
        return context.commit('fetchPosts', { data, cid })
      }
    },
    // user部分
    async login(context, payload) {
      const { data } = await toLogin(payload)
      return context.commit('login', data)
    },
    async fetchCurrentUser(context) {
      const { data } = await getCurrentUser()
      return context.commit('fetchCurrentUser', data)
    },
    async test({ dispatch }, payload) {
      // return dispatch('login', payload).then(() => {
      //   return dispatch('fetchCurrentUser')
      // })
      await dispatch('login',payload)
      await dispatch('fetchCurrentUser')
    },
    // 发布post
    async createPost({ commit }, payload) {
      const { data } = await post(payload)
      return commit('createPost', data)
    },
    // 查看文章内容
    async fetchPost({ state, commit }, id) {
      const currentPost = state.posts.data[id]
      if (!currentPost || !currentPost.content) {
        const { data } = await findPostById(id)
        return commit('fetchPost', data)
      } else {
        return Promise.resolve({ data: currentPost })
      }
    },
    // 更新文章
    async updatePost({ commit }, sendData) {
      const { data } = await updatePost(sendData)
      // console.log(data)
      return commit('updatePost', data)
    },
    // 删除文章
    async deletePost({ commit }, id) {
      const { data } = await deletePost(id)
      return commit('deletePost', data)
    }
  }
})

export default store