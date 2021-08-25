import { createClient } from 'contentful';
import BlogList from '../components/blogList';


export default function Home({ blogs }) {

  return (
    <div className="container">
      {
        blogs.map(blog => <BlogList blog={blog} key={blog.sys.id} />)
      }
    </div>
  )
}


export async function getStaticProps() {
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  })

  const res = await client.getEntries({ content_type: 'blog' });

  return {
    props: {
      blogs: res.items
    }
  }
}