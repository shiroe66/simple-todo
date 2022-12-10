import Routing from '@app/pages';
import { withProviders } from './providers';
import './index.scss';

const App = () => {
  return (
    <>
      <Routing />
    </>
  );
};

export default withProviders(App);
