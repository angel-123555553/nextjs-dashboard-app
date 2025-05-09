import { fetchFilteredCustomers } from '@/app/lib/data';
import Table from '@/app/ui/customers/table';
import Search from '@/app/ui/search';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Customers</h1>
      <Search placeholder="Search customers..." />
      <Table customers={customers} />
    </main>
  );
}
