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
    const { title, body, thumbnail, category, rating } = blog.fields;

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7">
                    <Image src={`http:${thumbnail.fields.file.url}`}
                        width={thumbnail.fields.file.details.image.width}
                        height={thumbnail.fields.file.details.image.height}
                        alt={title} className="mt-5 mb-3" />
                    <h3 className={styles.title, styles.title_details}>{title}</h3>
                    <hr />
                    <div className="row">
                        <div className="col-md-3">
                            {
                                category.map(cat => <span key={cat} className={styles.starts}>
                                    <i className="bi bi-bookmark-fill"></i>&nbsp;{cat} &nbsp;
                                </span>)
                            }
                        </div>
                        <div className="col-md-3">
                            <span className={styles.starts}>Evaluation:&nbsp;</span>
                            {
                                rating > 1 ?
                                    <span className={styles.starts}>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star"></i>
                                        <i className="bi bi-star"></i>
                                    </span> : <span className={styles.starts}>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star"></i>
                                        <i className="bi bi-star"></i>
                                        <i className="bi bi-star"></i>
                                    </span>
                            }
                        </div>
                    </div>
                    <hr />

                    <p className="text mt-5">{documentToReactComponents(body)}</p>

                </div>
            </div>
        </div>
    )
}

