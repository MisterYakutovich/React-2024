import { render } from '@testing-library/react';
import Page_404 from '../pages/404';
import '@testing-library/jest-dom';
import  {  useRouter  }  from  'next/router' ; 
import  mockRouter  from  "next-router-mock" ; 
//const nextRouterMock = require('next-router-mock')
/*jest.mock('next/router', () => {
  const { useRouter } = nextRouterMock

  const usePathname = () => {
    const router = useRouter()
    return router.pathname
  }

  const useSearchParams = () => {
    const router = useRouter()
    return new URLSearchParams(router.query)
  }

  return {
    useRouter,
    usePathname,
    useSearchParams
  }
})*/
test('renders 404 page', () => {
  const { getByText } = render(
  
    
      <Page_404 />
  
  );
  const page404Element = getByText(/Page_404/i);
  expect(page404Element).toBeInTheDocument();
});
