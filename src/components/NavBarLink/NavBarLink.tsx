import { Link } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

type TNavBarLink = {
  text: string;
  href: string;
  dataTestId?: string;
};

function NavBarLink({ href, text, dataTestId }: TNavBarLink) {
  const { pathname } = useLocation();
  const isActive = pathname === href
  
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      component={RouterLink}
      to={href}
      color="#fff"
      underline="hover"
      sx={{
        textDecoration: isActive ? 'underline' : 'auto',
        cursor: 'pointer',
        '&:not(:last-of-type)': {
          marginBottom: '16px',
        },
      }}
      data-testid={dataTestId}
    >
      {text}
    </Link>
  );
};

export default NavBarLink;