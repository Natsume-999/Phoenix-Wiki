import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
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
];

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
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
