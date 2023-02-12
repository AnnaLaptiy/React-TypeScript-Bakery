import React from 'react';
import ContentLoader from 'react-content-loader';

export const PieLoader: React.FC = () => (
  <ContentLoader
    className="pie-block"
    speed={2}
    width={280}
    height={600}
    viewBox="0 0 280 650"
    backgroundColor="#f5f5f5"
    foregroundColor="#dff1e2">
    <circle cx="137" cy="116" r="100" />
    <rect x="34" y="248" rx="3" ry="3" width="202" height="35" />
    <rect x="15" y="555" rx="3" ry="3" width="114" height="41" />
    <rect x="145" y="554" rx="17" ry="17" width="120" height="44" />
    <rect x="11" y="396" rx="6" ry="6" width="250" height="132" />
    <rect x="34" y="305" rx="0" ry="0" width="201" height="68" />
  </ContentLoader>
);
