import { LoaderFunctionArgs, json } from "@remix-run/node";
import  './app.css';
import {
  Form,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";

// existing imports

import { fetchInvoicesPages, getPeople } from "../src/redux/services/api_people";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import ThemeProvider from "../src/context/ThemeProvider";
import ErrorBoundary from "../src/components/ErrorBoundary/ErrorBoundary";
import Main from "../src/components/Main/Main";
import Themes from "../src/components/Themes/Themes";

// existing exports

export const loader = async ({request}: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const currentPage = Number(page);
  
    const totalPages = await fetchInvoicesPages();
    const data = await getPeople(currentPage);
  
    return { results: data.results, totalPages, currentPage };
};

export default function App() {
    const { results, totalPages, currentPage } = useLoaderData<typeof loader>();
   // const [searchParams] = useSearchParams();
  return (
    <html lang="en">
    <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
    </head>
    <body>
        <div id="root">
           
        <Provider store={store}>
                       
                          
                        <Main data={results}
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                 
                   </Provider >
                   <ScrollRestoration />
                    <Scripts />
        </div>
    </body>
</html>
  );
}