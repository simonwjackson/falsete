import withConditionalRedirect from './withConditionalRedirect'
import useLocalStorage from '../hooks/useLocalStorage'

/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the signin page.
 */
export default (WrappedComponent) => {
  const [host] = useLocalStorage('host')

  return withConditionalRedirect({
    WrappedComponent,
    location: '/settings',
    clientCondition: () => {
      return host === '' || host === undefined
    },
    serverCondition: function withAuthServerCondition(ctx) {
      // return !ctx.req.headers.cookie.includes('session')
      return true
    }
  })
}
