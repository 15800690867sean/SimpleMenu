'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      <div>
        This is the default page, if you want to visit the homepage, please visit&nbsp;
      </div>
      <Link className={styles.link} href={'/homepage'}>http://localhost:3000/homepage</Link>
      </div>
  )
};
