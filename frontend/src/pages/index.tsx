import { Route, Routes } from 'react-router-dom';
import TasksList from './tasks';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksList />} />
    </Routes>
  );
};

export default Routing;
