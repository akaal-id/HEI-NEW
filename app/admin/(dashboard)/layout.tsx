import { redirect } from 'next/navigation';
import { getAuthenticatedAdmin } from '../../lib/supabaseServerAuth';
import AdminShell from './AdminShell';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  return <AdminShell email={admin.email ?? ''}>{children}</AdminShell>;
}
