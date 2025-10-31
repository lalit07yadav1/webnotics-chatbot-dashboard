import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import UserMetaCard from "../../components/UserProfile/UserMetaCard";
import UserInfoCard from "../../components/UserProfile/UserInfoCard";
import UserAddressCard from "../../components/UserProfile/UserAddressCard";
import PageMeta from "../../components/common/PageMeta";

export default function UserProfile() {
    return (
        <>
            <PageMeta
                title="Webnotics Admin Dashboard | User Profile"
                description="Webnotics Admin Dashboard | User Profile"
            />
            <PageBreadcrumb pageTitle="User Profile" />
            <div className="rounded-2xl border border-gray-800 bg-white/[0.03] p-5 lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-white/90  lg:mb-7">
                    Profile
                </h3>
                <div className="space-y-6">
                    <UserMetaCard />
                    <UserInfoCard />
                    <UserAddressCard />
                </div>
            </div>
        </>
    );
}
