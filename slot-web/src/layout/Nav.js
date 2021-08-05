import { useState } from 'react';
import classes from './Nav.module.scss';
import { Link } from 'react-router-dom';

const Nav = ({ setReviewState }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.navBox}>
      <main className={classes.main}>
        <div className={`${classes['hamburger-menu']} ${classes['toggle-overlay']}`} onClick={() => setOpen(!open)}>
          <div className={open ? `${classes.bar} ${classes.animate}` : classes.bar} />
        </div>
      </main>

      <aside className={`${open ? classes.open : null} ${classes.aside}`}>
        <div className={`${classes['outer-close']} ${classes['toggle-overlay']}`}>
          <Link className={classes.close}>
            <span />
          </Link>
        </div>

        <nav className={classes.nav}>
          <ul>
            <li>
              <Link>客服</Link>
            </li>
            <li>
              <Link onClick={() => setReviewState(true)}>離開</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Nav;
