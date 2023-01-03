import React from 'react';
import styles from './index.module.less';
import imgMapBg from '#/assets/images/map_bg.jpg';
import RoadImage from './RoadImage';

const RoadMap: React.FC<{ esn: string; nodeId: string; intersectionCode: string }> = ({
  esn,
  nodeId,
  intersectionCode,
}) => (
  <div className={styles['map-wrapper']}>
    <div className={styles.box}>
      <img className={styles['box-map']} src={imgMapBg} alt="" />
      <RoadImage esn={esn} nodeId={nodeId} intersectionCode={intersectionCode} />
    </div>
  </div>
);

export default RoadMap;
