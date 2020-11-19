import { createStore } from 'vuex'
import { getColumns, getColumn, getPosts } from './network/columns'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
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
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: PostImage;
  createAt: string;
  column: string;
}

export interface PostImage{
  url?: string;
  _id?: string;
}

const store = createStore<GlobalDataProps>({
  state: {
    loading:false,
    columns: [],
    posts: [],
    user: { isLogin: true, name: 'viking', columnId: 1 }
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
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'viking' }
      console.log(state.user.isLogin)
    },
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
    setLoading(state, status: boolean){
      state.loading = status
    }
  },
  actions: {
    async fetchColumns(context) {
      const { data } = await getColumns()
      context.commit('fetchColumns', data)
    },
    async fetchColumn(context, cid) {
      const { data } = await getColumn(cid)
      context.commit('fetchColumn', data)
    },
    async fetchPosts(context, cid) {
      const { data } = await getPosts(cid)
      context.commit('fetchPosts', data)
    },
  }
})

export default store