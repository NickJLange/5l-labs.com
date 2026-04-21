import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import homepageConfig from '../config/homepage';
import latestPost from '../generated/latest-post.json';
import styles from './index.module.css';

const INDEX_ENTRIES = [
  {
    date: new Date(latestPost.date).toISOString().slice(0, 10),
    type: 'writing',
    area: 'frontier',
    title: latestPost.title,
    meta: '14 min',
    url: latestPost.url,
  },
  {
    date: '2026-02-10',
    type: 'release',
    area: 'applied-ai',
    title: 'open-embeddings v0.4.0',
    meta: 'changelog',
    url: 'https://www.open-embeddings.org',
  },
  {
    date: '2026-01-28',
    type: 'writing',
    area: 'applied-ai',
    title: 'benchmarking private embeddings vs ada-002',
    meta: '8 min',
    url: '/applied-ai-engineering',
  },
  {
    date: '2026-01-14',
    type: 'project',
    area: 'iot',
    title: 'overlord-network-kill-switch v1.2',
    meta: 'hardware',
    url: 'https://github.com/5L-Labs/overlord-network-kill-switch',
  },
  {
    date: '2025-12-30',
    type: 'writing',
    area: 'iot',
    title: 'flashing tasmota on a $4 zigbee hub',
    meta: '6 min',
    url: '/self-hosted-iot',
  },
  {
    date: '2025-12-10',
    type: 'release',
    area: 'applied-ai',
    title: 'recruiter-rankings preview open',
    meta: 'preview',
    url: 'https://www.recruiter-rankings.com',
  },
  {
    date: '2025-11-22',
    type: 'writing',
    area: 'frontier',
    title: 'differential privacy without the accuracy cliff',
    meta: '11 min',
    url: '/frontier-research',
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={homepageConfig.missionStatement}
    >
      <main className={styles.page}>

        {/* Terminal banner */}
        <div className={styles.terminal}>
          <div><span className={styles.terminalPrompt}>$ whoami</span></div>
          <div>5L Labs — commercial privacy-first research, est. 2023 (NYC)</div>
          <div style={{ marginTop: 8 }}><span className={styles.terminalPrompt}>$ cat mission.txt</span></div>
          <div>{homepageConfig.missionStatement}</div>
          <div style={{ marginTop: 8 }}><span className={styles.terminalPrompt}>$ ls areas/</span></div>
          <div>
            <span className={styles.terminalDir}>private-ai/</span>{' '}
            <span className={styles.terminalDir}>private-iot/</span>{' '}
            <span className={styles.terminalDir}>frontier/</span>{' '}
            <span className={styles.terminalDir}>applied-ai/</span>
          </div>
          <div style={{ marginTop: 8 }}>
            <span className={styles.terminalPrompt}>$ ./hire-us --consulting</span>{' '}
            <span className={styles.terminalCursor}>▊</span>
          </div>
        </div>

        {/* Index */}
        <section className={styles.indexSection}>
          <div className={styles.indexHeader}>
            <span>INDEX OF /</span>
            <span>·</span>
            <span>SORT BY:</span>
            <span className={`${styles.chip} ${styles.chipActive}`}>DATE ↓</span>
            <span className={styles.chip}>AREA</span>
            <span className={styles.chip}>TYPE</span>
          </div>

          <table className={styles.indexTable}>
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
              {INDEX_ENTRIES.map((entry, i) => (
                <tr key={i}>
                  <td>{entry.date}</td>
                  <td>
                    <span className={`${styles.chip} ${entry.type === 'writing' ? styles.chipActive : ''}`}>
                      {entry.type}
                    </span>
                  </td>
                  <td>{entry.area}</td>
                  <td className={styles.titleCell}>
                    <Link to={entry.url}>{entry.title}</Link>
                  </td>
                  <td>{entry.meta}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.loadMore}>— load more —</div>
        </section>

        {/* Projects + Consulting */}
        <div className={styles.twoCol}>

          <div className={styles.box}>
            <div className={styles.boxLabel}>~/projects</div>
            {homepageConfig.products.map((p) => (
              <div key={p.title}>
                <div className={styles.projectRow}>
                  <Link to={p.link} className={styles.projectName}>
                    {p.title.toLowerCase().replace(/\s*\(.*?\)/, '')}
                  </Link>
                  <span className={styles.projectMeta}>↗</span>
                </div>
                <div className={styles.projectDesc}>{p.description}</div>
              </div>
            ))}
          </div>

          <div className={styles.box}>
            <div className={styles.boxLabel}>~/consulting</div>
            <div className={styles.consultTitle}>
              We take on a small number of engagements each quarter.
            </div>
            <div className={styles.consultDesc}>
              Private ML systems, on-device inference, and IoT architecture audits.
            </div>
            <div className={styles.availability}>
              CURRENT AVAILABILITY:{' '}
              <span className={styles.availabilityVal}>Q3 2026</span>
            </div>
            <Link to="/docs" className={styles.btnAccent}>
              ./inquire →
            </Link>
          </div>

        </div>
      </main>
    </Layout>
  );
}
