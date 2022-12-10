import { Spin } from 'antd';
import { ReactNode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (component: () => ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Spin size="large" delay={30000} className="overlay" />}>
        {component()}
      </Suspense>
    </BrowserRouter>
  );
