import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import allPosts from '../generated/all-posts.json';
import styles from './index.module.css';

const AREAS = ['all', ...Array.from(new Set(allPosts.map(p => p.area))).sort()];

export default function Archive() {
  const [area, setArea] = useState('all');

  const entries = area === 'all' ? allPosts : allPosts.filter(p => p.area === area);

  return (
    <Layout
      title="Archive — 5L Labs"
      description="All writing from 5L Labs across research areas."
    >
      <main className={styles.page}>

        <div className={styles.terminal}>
          <div><span className={styles.terminalPrompt}>$ ls -lt writing/</span></div>
          <div>
            {allPosts.length} entries across{' '}
            <span className={styles.terminalDir}>frontier/</span>{' '}
            <span className={styles.terminalDir}>applied-ai/</span>{' '}
            <span className={styles.terminalDir}>home-ml-iot/</span>{' '}
            <span className={styles.terminalDir}>self-hosted-iot/</span>
          </div>
        </div>

        <section className={styles.indexSection}>
          <div className={styles.indexHeader}>
            <span>INDEX OF /writing</span>
            <span>·</span>
            <span>FILTER:</span>
            {AREAS.map(a => (
              <button
                key={a}
                className={`${styles.chip} ${area === a ? styles.chipActive : ''}`}
                onClick={() => setArea(a)}
              >
                {a}
              </button>
            ))}
          </div>

          <table className={styles.indexTable}>
            <colgroup>
              <col className={styles.colDate} />
              <col className={styles.colType} />
              <col className={styles.colArea} />
              <col className={styles.colTitle} />
              <col className={styles.colMeta} />
            </colgroup>
            <thead>
              <tr>
                <th>DATE</th>
                <th>TYPE</th>
                <th>AREA</th>
                <th>TITLE</th>
                <th>↗</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={i}>
                  <td>{entry.dateLabel}</td>
                  <td>
                    <span className={`${styles.chip} ${styles.chipActive}`}>{entry.type}</span>
                  </td>
                  <td>{entry.area}</td>
                  <td className={styles.colTitle}>
                    <Link to={entry.url}>{entry.title}</Link>
                  </td>
                  <td>read</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.loadMore}>
            {entries.length} {area === 'all' ? 'total' : area} entr{entries.length === 1 ? 'y' : 'ies'}
          </div>
        </section>

      </main>
    </Layout>
  );
}
