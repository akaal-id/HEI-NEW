import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '../lib/adminAuth';
import AdminHeroDashboard from './AdminHeroDashboard';

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  return <AdminHeroDashboard />;
}
