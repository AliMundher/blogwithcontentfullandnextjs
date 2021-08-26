import styles from '../styles/card.module.css';

export default function footer() {
    return (

        <div className="bg-light p-3">
            <div className="container text-center">
                <h4 className={styles.moon}>Created By Moon<i className="bi bi-heart-fill"></i></h4>
            </div>
        </div>
    )
}
