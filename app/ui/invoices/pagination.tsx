'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex">
      <Link
        href={createPageURL(currentPage - 1)}
        className={clsx(
          'mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md border text-sm transition-colors',
          {
            'pointer-events-none text-gray-300': currentPage === 1,
            'border-gray-200 bg-white text-gray-900 hover:bg-gray-100':
              currentPage > 1,
          }
        )}
      >
        <span className="sr-only">Previous</span>
        <ArrowLeftIcon className="h-4 w-4" />
      </Link>

      {allPages.map((page, index) => {
        return (
          <Link
            key={index}
            href={createPageURL(page)}
            className={clsx(
              'mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md border text-sm transition-colors',
              {
                'border-gray-200 bg-white text-gray-900 hover:bg-gray-100':
                  page !== currentPage,
                'pointer-events-none border-blue-600 bg-blue-50 text-blue-600':
                  page === currentPage,
              }
            )}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={createPageURL(currentPage + 1)}
        className={clsx(
          'inline-flex h-10 w-10 items-center justify-center rounded-md border text-sm transition-colors',
          {
            'pointer-events-none text-gray-300':
              currentPage === totalPages,
            'border-gray-200 bg-white text-gray-900 hover:bg-gray-100':
              currentPage < totalPages,
          }
        )}
      >
        <span className="sr-only">Next</span>
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
