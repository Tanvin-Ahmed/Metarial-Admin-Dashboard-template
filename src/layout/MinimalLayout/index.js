import { Outlet } from 'react-router-dom';

// project imports
import Customization from '../../views/pages/Customization/index';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
    <>
        <Outlet />
        <Customization />
    </>
);

export default MinimalLayout;
