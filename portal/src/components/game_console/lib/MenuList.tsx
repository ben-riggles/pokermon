import { DownKeys, UpKeys } from '@/types/keys';
import { Children, PropsWithChildren, useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';

interface MenuListProps {
  withCursor?: boolean;
  layout?: 'default' | 'grid';
  itemGap?: string;
}

export default function MenuList({
  withCursor = true,
  layout = 'default',
  itemGap,
  children,
}: PropsWithChildren<MenuListProps>) {
  const [cursorPosition, setCursorPosition] = useState(0);
  const gap = itemGap ? `mt-${itemGap}` : '';
  const columns = window.innerWidth > 768 ? 'grid-cols-4' : 'grid-cols-2';
  const containerClasses = layout === 'default' ? '' : `grid ${columns} gap-4`;

  useEffect(() => {
    function arrowHandler(event: KeyboardEvent) {
      if (UpKeys.includes(event.key)) {
        setCursorPosition((cursorPosition) => Math.max(0, cursorPosition - 1));
      }
      if (DownKeys.includes(event.key)) {
        setCursorPosition((cursorPosition) =>
          Math.min(Children.count(children) - 1, cursorPosition + 1)
        );
      }
    }

    window.addEventListener('keydown', arrowHandler);
    return () => {
      window.removeEventListener('keydown', arrowHandler);
    };
  }, [children]);

  function handleMouseEnter(position: number) {
    if (withCursor) {
      setCursorPosition(position);
    }
  }

  return (
    <ul className={containerClasses}>
      {Children.map(children, (child, index) => (
        <li tabIndex={-1}>
          <div
            className={`flex items-center ${index > 0 ? gap : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {withCursor && cursorPosition === index && (
              <FaPlay className='mr-1' />
            )}
            {withCursor && cursorPosition !== index && (
              <span style={{ width: 16 }} className='mr-1'></span>
            )}
            {child}
          </div>
        </li>
      ))}
    </ul>
  );
}
