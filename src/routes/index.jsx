import MainLayout from '@layouts/MainLayout';
import Activity from '@pages/Activity';
import Admin from '@pages/Admin';
import CreateQuestion from '@pages/CreateQuestion';
import CreateQuiz from '@pages/CreateQuiz';
import EditQuiz from '@pages/EditQuiz';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import Settings from '@pages/Settings';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: true,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/settings',
    name: 'Settings',
    protected: true,
    component: Settings,
    layout: MainLayout,
  },
  {
    path: '/activity',
    name: 'Activity',
    protected: true,
    component: Activity,
    layout: MainLayout,
  },
  {
    path: '/create-quiz',
    name: 'Create Quiz',
    protected: true,
    component: CreateQuiz,
    layout: MainLayout,
  },
  {
    path: '/edit-quiz/:quiz_id',
    name: 'Edit Quiz',
    protected: true,
    component: EditQuiz,
    layout: MainLayout,
  },
  {
    path: '/admin',
    name: 'Admin',
    protected: true,
    component: Admin,
    layout: MainLayout,
  },
  {
    path: '/create-question/:quiz_id/:question_no',
    name: 'Create Question',
    protected: true,
    component: CreateQuestion,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
