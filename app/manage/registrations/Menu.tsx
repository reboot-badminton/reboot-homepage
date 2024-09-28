'use client'

import { useCallback, useEffect, useState } from 'react';

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const onClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
        setIsOpen(isOpen => !isOpen);
        e.stopPropagation();
    }, [setIsOpen]);

    useEffect(() => {
        const onClick = () => {
            if (isOpen) {
                setIsOpen(false);
            }
        };

        document.body.addEventListener('click', onClick);

        return () => document.body.removeEventListener('click', onClick);
    }, [isOpen, setIsOpen]);

    return (
        <div className="relative">
            <div className="rounded-full hover:bg-black/10 cursor-pointer w-6 h-6 flex justify-center items-center" onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="12px" width="12px" version="1.1" id="Capa_1" viewBox="0 0 32.055 32.055" className="rotate-90">
                    <g>
                        <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967   C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967   s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967   c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z" />
                    </g>
                </svg>
            </div>
            {isOpen && <div className="absolute top-4 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                    <a href="#" className="block px-4 py-2 text-sm text-red-500" role="menuitem" tabIndex={-1} id="menu-item-0">유저 밴</a>
                </div>
            </div>}
        </div>
    );
}