import React from 'react';
import Layout from '@theme-original/Layout';

import OpenEmbeddingsBadge from '@site/src/components/OpenEmbeddingsBadge';

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      <OpenEmbeddingsBadge />
    </>
  );
}
