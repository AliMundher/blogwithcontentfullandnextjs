import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../styles/card.module.css';
import Link from 'next/link';
import Image from 'next/image';

function BlogList({ blog }) {

    const { slug, title, rating, thumbnail, body } = blog.fields;
    return (
        <div className="row justify-content-center my-4">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-8">
                                <Link href={`/blogs/${slug}`}>
                                    <a className={styles.title}>{title}</a>
                                </Link>
                                <p className="text">{body.content["0"].content["0"].value.slice(0, 220)}...</p>
                            </div>
                            <div className="col-md-4">
                                <Image src={`http:${thumbnail.fields.file.url}`}
                                    width={thumbnail.fields.file.details.image.width}
                                    height={thumbnail.fields.file.details.image.height}
                                    alt={title} className="rounded-2" />
                            </div>
                            &nbsp;&nbsp;
                            <hr />
                            <span>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star"></i>
                                <i className="bi bi-star"></i>
                            </span>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BlogList;