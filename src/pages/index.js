import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig, i18n} = useDocusaurusContext();
  const isTw = i18n.currentLocale === 'zh-Hant-TW';
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/intro">
            {isTw ? '點擊查看' : '点击查看'}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig, i18n} = useDocusaurusContext();
  const isTw = i18n.currentLocale === 'zh-Hant-TW';
  return (
    <Layout
      title={isTw ? '主頁' : '主页'}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
