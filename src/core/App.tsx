import React from 'react';
import AppContext from '#/common/AppContext';
import { IAppContext } from '#/types/IAppContext';
import i18n from '#/utils/i18n';
import { Router } from '#/router';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { getLocale } from '#/utils/storage';
import { useTranslation } from 'react-i18next';
import AuthRouter from '#/router/helper/authHelper';

window.t = i18n.t;

const App = () => {
  const [t] = useTranslation();
  const getLiveContextValue = (): IAppContext => ({
    token: '',
  });
  window.t = t;

  return (
    <>
      <AppContext.Provider value={getLiveContextValue()}>
        <BrowserRouter>
          <ConfigProvider locale={{ locale: getLocale() }}>
            <AuthRouter>
              <Router />
            </AuthRouter>
          </ConfigProvider>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
};

export default App;
