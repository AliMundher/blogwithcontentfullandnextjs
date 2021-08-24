import { createClient } from 'contentful';


export default function Home({ blogs }) {
  console.log(blogs)
  return (
    <div className="container">
      <h1 className="btn btn-primary">home</h1>
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