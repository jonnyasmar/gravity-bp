import { actions } from 'actions';

const swUrl: string = 'sw.js';

export const register = (store): void => {
  const { Actions } = actions(store.dispatch);

  Actions.Chat.createMessage({
    text: 'Welcome to Gravity Boilerplate!',
    user: 'Jonny Asmar',
  });

  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const sw: ServiceWorkerContainer = navigator.serviceWorker;

    sw.register(swUrl)
      .then(registration => {
        registration.onupdatefound = (): any => {
          const installer: ServiceWorker | null = registration.installing;

          if (installer !== null) {
            installer.onstatechange = (): any => {
              if (installer.state === 'installed') {
                if (sw.controller) console.log('New content available. Refresh the page.');
                else console.log('Content cached for offline use.');
              }
            };
          }
        };
      })
      .catch(error => {
        console.error('Failed to register service worker:', error);
      });
  }
};

export const unregister = (): void => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
};
