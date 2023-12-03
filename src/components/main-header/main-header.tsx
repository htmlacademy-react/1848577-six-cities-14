import Nav from '../nav/nav';
import Logo from '../ui/logo/logo';

function MainHeader(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <Nav />
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
