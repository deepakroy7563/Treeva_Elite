import { ArrowRight, Headphones } from 'lucide-react';

export const RecentCustomers: React.FC = () => {
  const customers = [
    {
      name: 'Ravi Sharma',
      email: 'ravi@gmail.com',
      phone: '+91 98765 43210',
      initials: 'RS',
      bookings: '3 bookings',
      status: 'Active',
    },
    {
      name: 'Priya Singh',
      email: 'priya@gmail.com',
      phone: '+91 87654 32109',
      initials: 'PS',
      bookings: '2 bookings',
      status: 'Active',
    },
    {
      name: 'Amit Kumar',
      email: 'amit@gmail.com',
      phone: '+91 76543 21098',
      initials: 'AK',
      bookings: '1 booking',
      status: 'Active',
    },
    {
      name: 'Neha Verma',
      email: 'neha@gmail.com',
      phone: '+91 65432 10987',
      initials: 'NV',
      bookings: '1 booking',
      status: 'Active',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Customers Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Recent Customers</h3>
          <button className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {customers.map((cust, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs">
                  {cust.initials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    {cust.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">{cust.email}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{cust.phone}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-slate-700 block">
                  {cust.bookings}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  {cust.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support & Help Card */}
      <div className="bg-gradient-to-br from-brand-50 to-blue-50/40 rounded-2xl p-5 border border-brand-100/80 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-600/20">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Support & Help Desk</h4>
            <p className="text-[11px] text-slate-600">We are here to assist your travel operations</p>
            <div className="flex items-center gap-3 mt-1.5 text-[11px] font-medium text-brand-700">
              <span className="truncate">support@treevaelite.com</span>
              <span className="font-mono">+91 98765 43210</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
