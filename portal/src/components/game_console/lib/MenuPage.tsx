import { PropsWithChildren } from 'react';
import MenuLink from './MenuLink';

interface MenuPageProps {
  title: JSX.Element | string;
  onBack: () => void;
}

export default function MenuPage({
  title,
  onBack,
  children,
}: PropsWithChildren<MenuPageProps>) {
  return (
    <div>
      <div>{title}</div>
      <div>{children}</div>
      <MenuLink onClick={onBack}>Back</MenuLink>
    </div>
  );
}
