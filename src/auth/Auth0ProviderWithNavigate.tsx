import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const Auth0ProviderWithNavigate = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const domain = "dev-ah3fziusiwxsrv8z.us.auth0.com";
  const clientId = "5zfzdDMaxaOJse3IDOIa6eJY3H9Ibv42";

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || '/baby-boot-jean');
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        display: 'popup'
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}; 