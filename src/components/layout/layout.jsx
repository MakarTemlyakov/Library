import { Fragment, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../footer/footer';
import { Header } from '../header';

export const Layout = () => {
  const [isActiveMenu, setActiveMenu] = useState(false);

  return (
    <Fragment>
      <Header />
      <main className='main'>
        <div className='container'>
          <Outlet />
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};
