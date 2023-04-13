import { Children } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import AlarmClock from './pages/AlarmClock';
import Home from './pages/Home';
import StopWatch from './pages/StopWatch';
import Timer from './pages/Timer';
import WorldClock from './pages/WorldClock';
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout />,
      children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/alarm",
          element:<AlarmClock />
        },
        {
          path:"/stopwatch",
          element:<StopWatch />
        },
        {
          path:"/worldclock",
          element:<WorldClock />
        },
        {
          path:"/timer",
          element:<Timer />
        }
        
      ]
    }
  ])
  return (
    <div className='bg-primary-color min-h-screen'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
