'use client'

import { useCallback, useEffect, useRef, useState } from 'react';

export interface MenuItem {
  text: string;
  color?: string;
  onClick: () => void;
}

export default function Menu({ items }: { items: MenuItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setIsOpen(isOpen => !isOpen);
    e.stopPropagation();
  }, [setIsOpen]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Node && ref?.current?.contains(event.target)) {
        // Ignore clicks inside dialog.
        return;
      }

      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', onClickOutside);

    return () => document.removeEventListener('click', onClickOutside);
  }, [isOpen, setIsOpen]);

  return (
    <div className="relative" ref={ref}>
      <div className="rounded-full hover:bg-black/10 cursor-pointer w-6 h-6 flex justify-center items-center" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="12px" width="12px" version="1.1" id="Capa_1" viewBox="0 0 32.055 32.055" className="rotate-90">
          <g>
            <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967   C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967   s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967   c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z" />
          </g>
        </svg>
      </div>
      {isOpen && <div className="absolute top-4 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
        {items.map(item => (
          <div className="py-1" role="none" key={`menu-item-${item.text}`}>
            <div className="block px-4 py-2 text-sm cursor-pointer hover:bg-slate-300" role="menuitem" id="menu-item-0"
              onClick={(e) => {
                item.onClick();
                setIsOpen(false);
              }}
              style={{ color: item.color ?? 'black' }}>
              {item.text}
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
}