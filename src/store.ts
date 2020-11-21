import axios from './network/index'
import { createStore } from 'vuex'
import { getColumns, getColumn, getPosts } from './network/columns'
import { toLogin, getCurrentUser } from './network/user'
import { post } from './network/file'


export interface ResponseType<P = {}>{
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
}
export interface AvatarType {
  url?: string;
  _id?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: AvatarType;
  description: string;
}

export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: PostImage | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}

export interface PostImage {
  url?: string;
  _id?: string;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
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
      state.posts.push(newPost)
    },
    fetchColumns(state, data) {
      state.columns = data.list
    },
    fetchColumn(state, data) {
      state.columns = [data]
    },
    fetchPosts(state, data) {
      state.posts = data.list
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
  },
  actions: {
    // column部分
    async fetchColumns(context) {
      const { data } = await getColumns()
      return context.commit('fetchColumns', data)
    },
    async fetchColumn(context, cid) {
      const { data } = await getColumn(cid)
      return context.commit('fetchColumn', data)
    },
    async fetchPosts(context, cid) {
      const { data } = await getPosts(cid)
      return context.commit('fetchPosts', data)
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
    async test({ dispatch },payload){
      return dispatch('login',payload).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    // 发布post
    async createPost({commit},payload){
      const { data } = await post(payload)
      return commit('createPost',data)
    }
  }
})

export default store