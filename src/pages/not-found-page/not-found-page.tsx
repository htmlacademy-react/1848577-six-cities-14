import {Link} from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <div style={{textAlign: 'center'}}>
      <h1 style={{fontSize: '40px'}}>404. Page not found</h1>
      <Link to="/" style={{color: 'blue'}}>Вернуться на главную</Link>
    </div>
  );
}

export default NotFoundPage;
