import React from 'react';
import ContentLoader from 'react-content-loader';

const GameCardSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={300}
      height={400}
      viewBox="0 0 300 400"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="8" ry="8" width="300" height="200" />
      <rect x="10" y="220" rx="4" ry="4" width="280" height="12" />
      <rect x="10" y="240" rx="4" ry="4" width="260" height="12" />
      <rect x="10" y="260" rx="4" ry="4" width="240" height="12" />
      <rect x="10" y="280" rx="4" ry="4" width="220" height="12" />
      <rect x="10" y="300" rx="4" ry="4" width="200" height="12" />
    </ContentLoader>
  );
};

export default GameCardSkeleton;
