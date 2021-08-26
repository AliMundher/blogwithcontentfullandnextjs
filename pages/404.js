import Link from 'next/link';
import styles from '../styles/card.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function NotFound() {
    const router = useRouter();
    useEffect(() => setInterval(() => {
        router.push('/');
    }, 3000));

    return (
        <div className="text-center p-5">
            <h1 className={styles.notfound}>404</h1>
            <h2 className={styles.oops}>Oooooops! That Page Can Not Be Found :(</h2>
            <p className={styles.home}>Go to the <Link href='/'>Home Page</Link></p>
        </div>
    )
}
