import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../styles/card.module.css';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';


function BlogList({ blog }) {
    console.log(blog)
    const { slug, title, thumbnail, body } = blog.fields;
    const { createdAt } = blog.sys;
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
                                <p className={styles.my_text}>{body.content["0"].content["0"].value.slice(0, 220)}...</p>
                            </div>
                            <div className="col-md-4">
                                <Image src={`http:${thumbnail.fields.file.url}`}
                                    width={thumbnail.fields.file.details.image.width}
                                    height={thumbnail.fields.file.details.image.height}
                                    alt={title} className="rounded-2" />
                            </div>
                            &nbsp;&nbsp;
                            <hr />
                            <div className="row text-center">
                                <div className="col">
                                    <span className={styles.heart}>
                                        <i className="bi bi-heart-fill"></i>
                                        <span>&nbsp;20</span>
                                    </span>
                                </div>
                                <div className="col mb-2 mb-md-0">
                                    <span className={styles.comment}>
                                        <i className="bi bi-chat-fill"></i>
                                        <span>&nbsp;12</span>
                                    </span>
                                </div>
                                <div className="col-md-4">
                                    <span className={styles.comment}>
                                        <i className="bi bi-calendar-fill"></i>
                                        &nbsp;<span>{moment(createdAt).calendar()}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BlogList;