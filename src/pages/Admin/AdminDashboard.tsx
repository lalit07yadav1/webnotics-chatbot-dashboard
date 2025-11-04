import AllUsersList from "../../components/admin/AllUsersList";

export default function AdminDashboard() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage all users and accounts
        </p>
      </div>

      <div className="space-y-6">
        <AllUsersList />
      </div>
    </div>
  );
}

