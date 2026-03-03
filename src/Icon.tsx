import React from 'react';

export type IconProps = { name: string; className?: string; strokeWidth?: number };

export function Icon({ name, className, strokeWidth }: IconProps) {
  const c = className ?? 'h-5 w-5';
  const sw = strokeWidth ?? 1.5;
  switch (name) {
    case 'search':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );
    case 'bookmark':
      return (
        <svg className={c} fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" clipRule="evenodd" />
        </svg>
      );
    case 'list':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M5.29 15.48L7.74 17.73L12.4 11.22" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M16.41 11.9H20M16.04 11.9H19.62M4 6.22H20M13.54 17.78H20" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
        </svg>
      );
    case 'dots':
      return (
        <svg className={c} fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="6" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="18" r="1.5" />
        </svg>
      );
    case 'options':
    case 'settings':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'grip':
      return (
        <svg className={c} fill="currentColor" viewBox="0 0 24 24">
          <circle cx="9" cy="6" r="1.5" />
          <circle cx="9" cy="12" r="1.5" />
          <circle cx="9" cy="18" r="1.5" />
          <circle cx="15" cy="6" r="1.5" />
          <circle cx="15" cy="12" r="1.5" />
          <circle cx="15" cy="18" r="1.5" />
        </svg>
      );
    case 'back':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} d="M15 19L8 12L15 5" />
        </svg>
      );
    case 'bell-ring':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12.0013 17.3556C7.25587 17.3556 5.06075 16.7211 4.84863 14.1728C4.84863 11.6274 6.37919 11.7899 6.37919 8.66555C6.37919 6.22426 8.59766 3.44824 12.0013 3.44824C15.4049 3.44824 17.6234 6.22426 17.6234 8.66458C17.6234 11.7889 19.1539 11.6255 19.1539 14.1728C18.9408 16.7299 16.7457 17.3556 12.0013 17.3556Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M9.98438 20C10.4757 20.614 11.2133 21.0003 12.0287 21.0003C12.8538 21.0003 13.5913 20.614 14.0827 20" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
        </svg>
      );
    case 'bell-minus':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M6.74 16.62C5.52 16.13 4.89 15.31 4.78 14C4.78 11.39 6.34 11.55 6.34 8.35C6.34 5.84 8.62 3 12.11 3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M17.97 9.54C18.3 11.56 19.45 11.77 19.45 14C19.23 16.62 16.98 17.27 12.11 17.27" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M10.05 20C10.55 20.61 11.21 21 12.03 21C12.85 21 13.59 20.61 14.08 20" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M4.39 19L19.61 3.75" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
        </svg>
      );
    case 'event':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M3.98 9.66H20.03" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M15.64 3V5.96" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M8.37 3V5.96" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path fillRule="evenodd" clipRule="evenodd" d="M15.81 4.42H8.19C5.55 4.42 3.9 5.89 3.9 8.6V16.75C3.9 19.49 5.55 21 8.19 21H15.81C18.46 21 20.1 19.52 20.1 16.81V8.6C20.11 5.89 18.47 4.42 15.81 4.42Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M14.25 15.08H9.75" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
        </svg>
      );
    case 'news':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M7.06 19.9L6.3 20.27C5.5 20.65 4.58 20.07 4.59 19.18L4.59 6.92C4.59 4.5 5.94 3 8.36 3H15.66C18.08 3 19.4 4.5 19.4 6.92L19.42 19.18C19.42 20.06 18.49 20.65 17.69 20.26L16.94 19.9C16.49 19.69 15.96 19.67 15.5 19.86L13.35 20.74C12.49 21.09 11.52 21.09 10.65 20.74L8.51 19.86C8.04 19.67 7.52 19.69 7.06 19.9Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M14.83 14.2H9.17M14.83 9.8H9.17" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
        </svg>
      );
    case 'snapshot':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M6.78 21H17.22C19.05 21 20.54 19.51 20.54 17.68V10.5C20.54 9.61 20.14 8.77 19.45 8.21L13.87 3.67C12.78 2.78 11.22 2.78 10.13 3.67L4.55 8.21C3.86 8.77 3.46 9.61 3.46 10.5V17.68C3.46 19.51 4.95 21 6.78 21Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M7.62 15.91L10.43 12.26L13.63 14.77L16.38 11.23" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
        </svg>
      );
    case 'darkpool':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M18.47 8.89C18.74 9.69 18.89 10.55 18.89 11.45C18.89 15.84 15.33 19.4 10.95 19.4C6.56 19.4 3 15.84 3 11.45C3 7.06 6.56 3.5 10.95 3.5C12.43 3.5 13.81 3.91 15 4.62" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M20.9 6.33L15.02 11.78L12.49 9.02L8.23 13.04" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M18.05 6.17L21 6.17L21 9.11" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M16.35 17.27L19.59 20.49" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
        </svg>
      );
    default:
      return <span className={c} />;
  }
}

