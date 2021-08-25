import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../../styles/card.module.css';

const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
});

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: 'blog'
    });

    const paths = res.items.map(item => {
        return {
            params: {
                slug: item.fields.slug
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { items } = await client.getEntries({
        content_type: 'blog',
        'fields.slug': params.slug
    })
    return {
        props: {
            blog: items[0]
        }
    }
}


export default function Details({ blog }) {
    const { title, body, thumbnail, category } = blog.fields;

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7">
                    <Image src={`http:${thumbnail.fields.file.url}`}
                        width={thumbnail.fields.file.details.image.width}
                        height={thumbnail.fields.file.details.image.height}
                        alt={title} className="rounded-2 mt-5 mb-3" />
                    <h3 className={styles.title}>{title}</h3>
                    <p className="text mt-5">{documentToReactComponents(body)}</p>
                </div>
            </div>
        </div>
    )
}

