import { PropsWithChildren } from 'react';

interface MenuLinkProps {
  onClick: () => void;
}

export default function MenuLink({
  onClick,
  children,
}: PropsWithChildren<MenuLinkProps>) {
  return <button onClick={onClick}>{children}</button>;
}
