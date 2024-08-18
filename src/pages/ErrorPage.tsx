import { FC } from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: FC = () => {
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {(error as { statusText?: string; message?: string }).statusText ||
            (error as { statusText?: string; message?: string }).message}
        </i>
      </p>
    </div>
  );
};
export default ErrorPage;
