'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      <h1 className={styles.welcome}>Welcome</h1>
      <div>
        This is the welcome page, if you want to visit the homepage, please visit&nbsp;
      </div>
      <Link className={styles.link} href={'/homepage'}>http://localhost:3000/homepage</Link>
    </div>
  )
};
