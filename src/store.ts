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
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: string;
  createAt: string;
  column: string;
}

const store = createStore<GlobalDataProps>({
  state: {
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
      // console.log(data)
      state.columns = [data]
    },
    fetchPosts(state, data) {
      console.log(data)
      state.posts = data.list
    }
  },
  actions: {
    fetchColumns(context) {
      getColumns().then(resp => {
        context.commit('fetchColumns', resp.data)
      })
    },
    fetchColumn(context, cid) {
      getColumn(cid).then(resp => {
        context.commit('fetchColumn', resp.data)
      })
    },
    fetchPosts(context, cid) {
      getPosts(cid).then(resp => {
        context.commit('fetchPosts', resp.data)
      })
    },
  }
})

export default store