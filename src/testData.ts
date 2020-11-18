export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createAt: string;
  columnId: number;
}

export interface ColumnProps {
  id: number;
  title: string;
  description: string;
  avatar?: string;
}

export const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1的专栏",
    description: "这是test1的专栏，有一段非常有益的见解，来更新吧",
    avatar: "123",
  },
  {
    id: 2,
    title: "test1的专栏",
    description: "这是test1的专栏，有一段非常有益的见解，来更新吧",
    avatar: "123",
  },
  {
    id: 3,
    title: "test1的专栏",
    description: "这是test1的专栏，有一段非常有益的见解，来更新吧",
    avatar: "123",
  },
  {
    id: 4,
    title: "test1的专栏",
    description: "这是test1的专栏，有一段非常有益的见解，来更新吧",
    avatar: "123",
  },
  {
    id: 5,
    title: "test1的专栏",
    description: "这是test1的专栏，有一段非常有益的见解，来更新吧",
    // avatar:'123'
  },
  {
    id: 6,
    title: "test1的专栏",
    description: "这是test1的专栏，有一段非常有益的见解，来更新吧",
    avatar: "123",
  },
];

export const testPosts: PostProps[] = [
  {
    id: 1,
    title: '这是我的第一篇文章',
    content: 'this is my first post',
    image: '123',
    createAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 2,
    title: '这是我的第2篇文章',
    content: 'this is my second post',
    image: '123',
    createAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 7,
    title: '这是我的第2篇文章',
    content: 'this is my second post',
    image: '123',
    createAt: '2020-06-11 10:34:22',
    columnId: 4
  },
  {
    id: 3,
    title: '这是我的第2篇文章',
    content: 'this is my second post',
    createAt: '2020-06-11 10:34:22',
    columnId: 5
  },
  {
    id: 4,
    title: '这是我的第2篇文章',
    content: 'this is my second post',
    createAt: '2020-06-11 10:34:22',
    columnId: 6
  },
  {
    id: 5,
    title: '这是我的第2篇文章',
    content: 'this is my second post',
    createAt: '2020-06-11 10:34:22',
    columnId: 3
  },
  {
    id: 6,
    title: '这是我的第2篇文章',
    content: 'this is my second post',
    createAt: '2020-06-11 10:34:22',
    columnId: 2
  },
]
