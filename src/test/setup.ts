import '@testing-library/jest-dom'

Object.defineProperty(globalThis, 'import.meta', {
  value: {
    env: {
      VITE_MICROSOFT_CLIENT_ID: 'mock_client_id',
      VITE_MICROSOFT_REDIRECT_URI: 'http://localhost/mock_redirect',
      VITE_SENTRY_DSN: 'https://mock_dsn@sentry.io/12345'
    }
  },
  writable: true
})

window.HTMLElement.prototype.scrollIntoView = () => {}
