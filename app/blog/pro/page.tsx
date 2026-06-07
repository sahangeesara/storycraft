import ProOnly from "@/components/blog/ProOnly";

export default async function AnalyticsPage() {
    return (
        <ProOnly>
            {/* EVERYTHING INSIDE HERE IS INVISIBLE TO FREE USERS.
        It turns into the full Pro experience automatically.
      */}
            <main className="min-h-screen bg-slate-950 text-slate-100 antialiased">
                <div className="max-w-5xl mx-auto px-6 py-16">

                    <header className="mb-12">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">
                            Premium Creator Analytics
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Deep analytics metrics fully unlocked for your account.
                        </p>
                    </header>

                    {/* Grid Layout of Pro UI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Views</p>
                            <p className="text-3xl font-bold text-white mt-2">142,384</p>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Engagement Rate</p>
                            <p className="text-3xl font-bold text-emerald-400 mt-2">64.2%</p>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Estimated Revenue</p>
                            <p className="text-3xl font-bold text-indigo-400 mt-2">$1,240.00</p>
                        </div>
                    </div>

                </div>
            </main>
        </ProOnly>
        );
}
