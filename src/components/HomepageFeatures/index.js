import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

const FeatureList = {
  'zh-Hans': [
    {
      title: '一站式整合',
      Icon: '🧩',
      description: (
        <>
          封禁、兑换码、出售、皮肤、清理、边界、邀请、交易……十余个模块融合一个 jar，命令与配置互不干扰。
        </>
      ),
    },
    {
      title: '统一数据库',
      Icon: '🗄️',
      description: (
        <>
          SQLite 零配置开箱即用，一键切换 MySQL 供群组服共享数据；封禁、兑换码、邀请分表隔离，备份只碰一个文件。
        </>
      ),
    },
    {
      title: 'Kether 驱动',
      Icon: '⚡',
      description: (
        <>
          所有执行类配置（奖励、封禁脚本、边界事件）统一为 Kether 脚本行，写法一处学会处处可用。
        </>
      ),
    },
  ],
  'zh-Hant-TW': [
    {
      title: '一站式整合',
      Icon: '🧩',
      description: (
        <>
          封禁、兌換碼、出售、皮膚、清理、邊界、邀請、交易……十餘個模組融合一個 jar，指令與配置互不干擾。
        </>
      ),
    },
    {
      title: '統一資料庫',
      Icon: '🗄️',
      description: (
        <>
          SQLite 零設定開箱即用，一鍵切換 MySQL 供群組伺服器共享資料；封禁、兌換碼、邀請分表隔離，備份只碰一個檔案。
        </>
      ),
    },
    {
      title: 'Kether 驅動',
      Icon: '⚡',
      description: (
        <>
          所有執行類配置（獎勵、封禁腳本、邊界事件）統一為 Kether 腳本行，寫法一處學會處處可用。
        </>
      ),
    },
  ],
};

function Feature({Icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <span style={{fontSize: '4rem'}} role="img">{Icon}</span>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  const {i18n} = useDocusaurusContext();
  const features = FeatureList[i18n.currentLocale] ?? FeatureList['zh-Hans'];
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
