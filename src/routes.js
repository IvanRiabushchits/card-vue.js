import CardForm from './components/CardForm';
import CardDataTable from './components/CardDataTable';

const routes = [
    {path: '', component: CardDataTable},
    {path: '/cardForm', component: CardForm},
];

export default routes;