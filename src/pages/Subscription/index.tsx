import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/table";
import Alert from "../../components/ui/alert/Alert";

export default function Subscription() {
    const billingHistory = [
        { date: 'Jan 15, 2024', plan: 'Pro Plan', amount: '$29.00', status: 'Paid' },
        { date: 'Dec 15, 2023', plan: 'Pro Plan', amount: '$29.00', status: 'Paid' },
    ];

    return (
        <>
            <PageMeta
                title="Webnotics Admin Dashboard | Subscription"
                description="Webnotics Admin Dashboard | Subscription"
            />
            <PageBreadcrumb pageTitle="Subscription" />
            <div className="space-y-6">
                <div className="rounded-2xl border border-gray-800 bg-white/[0.03] p-5 lg:p-6">
                    <h3 className="mb-5 text-lg font-semibold text-white/90 lg:mb-7">
                        Current Plan
                    </h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-xl font-semibold text-white/90">Pro Plan</h4>
                            <p className="text-gray-400 mb-2">$29/month</p>
                            <Badge variant="solid" color="success">
                                Active
                            </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                            Manage Plan
                        </Button>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-800 bg-white/[0.03] p-5 lg:p-6">
                    <h3 className="mb-5 text-lg font-semibold text-white/90 lg:mb-7">
                        Pricing Tiers
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-6">
                            <h4 className="text-lg font-semibold text-white/90">Basic</h4>
                            <p className="text-2xl font-bold text-white/90 mt-2">$9/month</p>
                            <ul className="mt-4 space-y-2 text-gray-400">
                                <li>• 1 Chatbot</li>
                                <li>• 1000 Messages</li>
                                <li>• Basic Support</li>
                            </ul>
                            <Button variant="outline" size="sm" className="mt-4 w-full">
                                Current Plan
                            </Button>
                        </div>

                        <div className="rounded-lg border border-brand-500 bg-brand-500/10 p-6">
                            <h4 className="text-lg font-semibold text-white/90">Pro</h4>
                            <p className="text-2xl font-bold text-white/90 mt-2">$29/month</p>
                            <ul className="mt-4 space-y-2 text-gray-400 mb-2">
                                <li>• 5 Chatbots</li>
                                <li>• 10000 Messages</li>
                                <li>• Priority Support</li>
                            </ul>
                            <Badge variant="solid" color="primary" >
                                Popular
                            </Badge>
                            <Button variant="primary" size="sm" className="mt-4 w-full">
                                Upgrade
                            </Button>
                        </div>

                        <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-6">
                            <h4 className="text-lg font-semibold text-white/90">Enterprise</h4>
                            <p className="text-2xl font-bold text-white/90 mt-2">$99/month</p>
                            <ul className="mt-4 space-y-2 text-gray-400">
                                <li>• Unlimited Chatbots</li>
                                <li>• Unlimited Messages</li>
                                <li>• 24/7 Support</li>
                            </ul>
                            <Button variant="outline" size="sm" className="mt-4 w-full">
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-800 bg-white/[0.03] p-5 lg:p-6">
                    <h3 className="mb-5 text-lg font-semibold text-white/90 lg:mb-7">
                        Billing History
                    </h3>
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                            <Table className="text-left">
                                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                    <TableRow>
                                        <TableCell isHeader className="px-5 py-3 font-medium text-start text-lg text-white/90">Date</TableCell>
                                        <TableCell isHeader className="px-5 py-3 font-medium text-start text-lg text-white/90">Plan</TableCell>
                                        <TableCell isHeader className="px-5 py-3 font-medium text-start text-lg text-white/90">Amount</TableCell>
                                        <TableCell isHeader className="px-5 py-3 font-medium text-start text-lg text-white/90">Status</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                    {billingHistory.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className=" px-4 py-3 text-white/70 text-start text-theme-sm">{item.date}</TableCell>
                                            <TableCell className=" px-4 py-3 text-white/70 text-start text-theme-sm">{item.plan}</TableCell>
                                            <TableCell className=" px-4 py-3 text-white/70 text-start text-theme-sm ">{item.amount}</TableCell>
                                            <TableCell className=" px-4 py-3 text-white/70 text-start text-theme-sm">
                                                <Badge variant="solid" color="success">{item.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>

                <Alert
                    variant="info"
                    title="Upcoming Billing"
                    message="Your next billing date is February 15, 2024. You will be charged $29.00 for the Pro Plan."
                />
            </div>
        </>
    );
}
