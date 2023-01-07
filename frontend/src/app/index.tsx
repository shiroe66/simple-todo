import { withProviders } from './providers';
import './index.scss';
import Routing from '@/pages';

const App = () => {
  return (
    <>
      <Routing />
    </>
  );
};

export default withProviders(App);
