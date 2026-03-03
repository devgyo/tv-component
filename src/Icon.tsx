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
          <path d="M5.29004 15.4803L7.73581 17.7263L12.4016 11.2227" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M16.4135 11.9036H20M16.036 11.9036H19.6225M4 6.21875H19.9996M13.5437 17.7801H19.9997" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
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
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M7.2917 20.0014C5.92604 20.0014 4.81836 18.8937 4.81836 17.528C4.81836 16.1624 5.92604 15.0547 7.2917 15.0547C8.65735 15.0547 9.76503 16.1624 9.76503 17.528C9.76503 18.8937 8.65735 20.0014 7.2917 20.0014Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path fillRule="evenodd" clipRule="evenodd" d="M16.7097 14.4076C15.344 14.4076 14.2363 13.2999 14.2363 11.9343C14.2363 10.5686 15.344 9.46094 16.7097 9.46094C18.0753 9.46094 19.183 10.5686 19.183 11.9343C19.183 13.2999 18.0753 14.4076 16.7097 14.4076Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M16.7284 14.4062V15.5752C16.7284 16.6838 15.8302 17.582 14.7217 17.582H9.76562" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path fillRule="evenodd" clipRule="evenodd" d="M7.2917 8.94667C5.92604 8.94667 4.81836 7.83899 4.81836 6.47334C4.81836 5.10768 5.92604 4 7.2917 4C8.65735 4 9.76503 5.10768 9.76503 6.47334C9.76503 7.83899 8.65735 8.94667 7.2917 8.94667Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M7.29102 8.94531V15.052" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
        </svg>
      );
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
          <path d="M6.07171 3.00781C5.124 3.92926 4.43024 5.04433 4.04492 6.20222" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M19.9555 6.21192C19.5692 5.05306 18.8764 3.9302 17.9199 3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
        </svg>
      );
    case 'bell-minus':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M6.7398 16.6165C5.51582 16.13 4.88535 15.3118 4.77832 13.9983C4.77832 11.3879 6.34381 11.5494 6.34381 8.3464C6.34381 5.84395 8.62053 3 12.1125 3C14.5517 3 16.3876 4.38549 17.2876 6.06871" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M17.9691 9.53711C18.298 11.5609 19.448 11.7662 19.448 13.9981C19.232 16.6173 16.9816 17.2653 12.1129 17.2653C11.4075 17.2653 10.7605 17.2536 10.168 17.2205" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M10.0459 19.9736C10.5499 20.6031 11.3059 21.0001 12.1426 21.0001C12.9891 21.0001 13.7451 20.6031 14.2491 19.9736" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M4.38672 18.9738L19.6145 3.74609" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
        </svg>
      );
    case 'event':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M3.98389 9.66447H20.0253" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M15.6388 3V5.96174" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M8.36832 3V5.96174" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path fillRule="evenodd" clipRule="evenodd" d="M15.8145 4.42139H8.19413C5.55056 4.42139 3.90039 5.8935 3.90039 8.59935V16.7451C3.90039 19.4938 5.55056 20.9999 8.19413 20.9999H15.8067C18.4581 20.9999 20.1004 19.52 20.1004 16.8132V8.59935C20.1082 5.8935 18.4658 4.42139 15.8145 4.42139Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M14.2495 15.0766H9.74951" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
        </svg>
      );
    case 'news':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M7.06405 19.9023L6.30417 20.2661C5.50537 20.6485 4.58106 20.0657 4.58203 19.1793L4.59176 6.92492C4.59176 4.50225 5.93931 3 8.35809 3H15.6572C18.0818 3 19.4002 4.50225 19.4002 6.92492L19.4177 19.1774C19.4187 20.0638 18.4944 20.6475 17.6946 20.2642L16.9406 19.9032C16.4872 19.6853 15.9627 19.6697 15.4967 19.8604L13.3503 20.7351C12.4854 21.0883 11.5153 21.0883 10.6504 20.7351L8.50792 19.8604C8.04188 19.6697 7.51745 19.6853 7.06405 19.9023Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M14.8287 14.1972H9.17188M14.8287 9.80273H9.17188" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
        </svg>
      );
    case 'snapshot':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M6.78418 21.001H17.2156C19.0506 21.001 20.5373 19.5133 20.5373 17.6792V10.5054C20.5373 9.61412 20.1365 8.77054 19.4456 8.20718L13.8714 3.66723C12.7817 2.77889 11.2181 2.77889 10.1283 3.66723L4.55409 8.20718C3.86327 8.77054 3.4624 9.61412 3.4624 10.5054V17.6792C3.4624 19.5133 4.94913 21.001 6.78418 21.001Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M7.62451 15.9072L10.4299 12.2621L13.6299 14.7746L16.3751 11.2313" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
        </svg>
      );
    case 'darkpool':
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M18.4677 8.88589C18.7421 9.69051 18.891 10.5535 18.891 11.4515C18.891 15.8395 15.3339 19.3975 10.946 19.3975C6.55705 19.3975 3 15.8395 3 11.4515C3 7.06358 6.55705 3.50653 10.946 3.50653C12.4258 3.50653 13.8122 3.91127 14.9992 4.61665" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M20.8961 6.3252L15.0245 11.7795L12.4861 9.02217L8.23047 13.0385" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M18.0527 6.17284L20.9959 6.16895L21.0007 9.1111" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
          <path d="M16.3535 17.2705L19.5866 20.4948" strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw} />
        </svg>
      );
    default:
      return <span className={c} />;
  }
}

