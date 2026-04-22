import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import homepageConfig from '../config/homepage';
import allPosts from '../generated/all-posts.json';
import styles from './index.module.css';

const PREVIEW_COUNT = 7;
const INDEX_ENTRIES = allPosts.slice(0, PREVIEW_COUNT);

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
              {INDEX_ENTRIES.map((entry, i) => (
                <tr key={i}>
                  <td>{entry.dateLabel}</td>
                  <td>
                    <span className={`${styles.chip} ${styles.chipActive}`}>
                      {entry.type}
                    </span>
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
            <Link to="/archive">— {allPosts.length - PREVIEW_COUNT} more entries → view full archive —</Link>
          </div>
        </section>

        {/* Projects + Consulting */}
        <div className={styles.twoCol}>

          <div className={styles.box}>
            <div className={styles.boxLabel}>~/projects</div>
            {homepageConfig.products.map((p) => (
              <div key={p.title} className={styles.projectGroup}>
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
