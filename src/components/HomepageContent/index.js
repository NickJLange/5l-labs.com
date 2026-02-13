import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import homepageConfig from '../../config/homepage';

import latestPost from '../../generated/latest-post.json';

function Section({ title, items }) {
  return (
    <div className={clsx('col col--6')}>
      <div className="padding-horiz--md">
        <h3 className="text--center">{title}</h3>
        {items.map((item, idx) => (
          <div key={idx} className="card shadow--md margin-bottom--md">
            <div className="card__header">
              <h3>
                {item.link ? <Link to={item.link}>{item.title}</Link> : item.title}
              </h3>
            </div>
            <div className="card__body">
              <p>{item.description}</p>
            </div>
            {item.link && (
              <div className="card__footer">
                <Link
                  to={item.link}
                  className="button button--primary button--block"
                  aria-label={`Learn more about ${item.title}`}
                >
                  Learn More
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LatestPost() {
  if (!latestPost || !latestPost.title) return null;

  return (
    <div className={clsx('col col--6')}>
      <div className="text--center padding-horiz--md">
        <h3>Latest Update</h3>
        <div className="card shadow--md">
          <div className="card__header">
            <h3><Link to={latestPost.url}>{latestPost.title}</Link></h3>
            <small>
              <time dateTime={latestPost.date}>
                {new Date(latestPost.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'UTC',
                })}
              </time>
            </small>
          </div>
          <div className="card__body text--center">
            <p>{latestPost.content}</p>
          </div>
          <div className="card__footer">
            <Link
              to={latestPost.url}
              className="button button--primary button--block"
              aria-label={`Read more about ${latestPost.title}`}
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageContent() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className="text--center padding-horiz--md margin-bottom--xl">
              <h2>Mission Statement</h2>
              <p>{homepageConfig.missionStatement}</p>
            </div>
          </div>
        </div>
        <div className="row" style={{ justifyContent: 'center' }}>
          <Section title="Major Research Areas" items={homepageConfig.researchAreas} />
          <LatestPost />
        </div>
      </div>
    </section>
  );
}
