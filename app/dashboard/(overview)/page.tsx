import { Suspense } from 'react';
import { Metadata } from 'next';
import { CardsSkeleton, RevenueChartSkeleton, LatestInvoicesSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { fetchLatestInvoices } from '@/app/lib/data';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function OverviewPage() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>

      {/* Cards Row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>

      {/* Revenue + Invoices Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* Revenue Chart */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        {/* Latest Invoices */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices latestInvoices={latestInvoices} />
        </Suspense>
      </div>
    </main>
  );
}
