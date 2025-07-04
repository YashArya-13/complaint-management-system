import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to Complaint Management System</h1>
      <Link href="/submit-complaint">
        <button>Submit Complaint</button>
      </Link>
      <br /><br />
      <Link href="/admin-dashboard">
        <button>Admin Dashboard</button>
      </Link>
    </div>
  );
}
