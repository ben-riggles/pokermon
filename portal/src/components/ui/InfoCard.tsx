import { ReactNode } from 'react';

type Props = {
  info: ReactNode;
  title: string;
};
export default function InfoCard({ info, title }: Props) {
  return (
    <div className='text-center w-full pixel-border p-4'>
      <div className='text-xl'>{info}</div>
      <div>{title}</div>
    </div>
  );
}
