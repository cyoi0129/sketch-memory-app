import '../_styles/header.scss';
import { FC } from 'react';
import Link from 'next/link';
import { RiSketching } from 'react-icons/ri';

const Header: FC = () => {
  return (
    <header>
      <Link href="/">
        <RiSketching />
        <h1>Sketch Memory</h1>
      </Link>
    </header>
  );
};

export default Header;
