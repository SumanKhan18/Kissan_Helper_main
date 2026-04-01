import { useEffect, useMemo, useState } from 'react';
import { Search, Filter, Download, Eye, RefreshCcw, ChevronLeft, ChevronRight, CreditCard, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import API from '../api.js';

const STATUS_OPTIONS = [
  { label: 'All Status', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Failed', value: 'failed' },
];

const PLAN_OPTIONS = [
  { label: 'All Plans', value: 'all' },
  { label: 'Basic', value: 'Basic' },
  { label: 'Premium', value: 'Premium' },
  { label: 'Enterprise', value: 'Enterprise' },
];

const ITEMS_PER_PAGE = 8;

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ search: '', status: 'all', plan: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const fetchPayments = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await API.get('/transactions', {
        params: {
          ...(filters.search ? { search: filters.search } : {}),
          ...(filters.status !== 'all' ? { status: filters.status } : {}),
          ...(filters.plan !== 'all' ? { plan: filters.plan } : {}),
        },
      });
      setPayments(data?.payments ?? []);
    } catch (err) {
      console.error('Failed to fetch payments:', err);
      setError(err?.response?.data?.message || 'Unable to load payments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, filters.plan]);

  const filteredPayments = useMemo(() => {
    if (!filters.search.trim()) return payments;
    const searchLower = filters.search.toLowerCase();
    return payments.filter((payment) =>
      [payment.userName, payment.userEmail, payment.transactionId]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(searchLower))
    );
  }, [filters.search, payments]);

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / ITEMS_PER_PAGE));
  const paginatedPayments = filteredPayments.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const formatAmount = (amount = 0) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const statusPill = (status) => {
    const map = {
      completed: { bg: 'bg-green-500/20', text: 'text-green-400', icon: <CheckCircle size={14} /> },
      pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: <AlertCircle size={14} /> },
      failed: { bg: 'bg-red-500/20', text: 'text-red-400', icon: <XCircle size={14} /> },
    };
    const config = map[status] ?? { bg: 'bg-gray-500/20', text: 'text-gray-300', icon: null };
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.icon}
        {status}
      </span>
    );
  };

  const handleExport = () => {
    const url = `${API.defaults.baseURL}/transactions/export`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.search]);

  return (
    <div className="text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold ml-[2.5vw] mr-[2.5vw]">Payments</h1>
          <p className="text-gray-400 mt-1 ml-[2.5vw] mr-[2.5vw]">Track registration payments and plan upgrades</p>
        </div>
        <div className="flex gap-3 ml-[2.5vw] mr-[2.5vw]">
          <button
            onClick={fetchPayments}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition disabled:opacity-60"
          >
            <RefreshCcw size={18} />
            Refresh
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-black rounded-lg font-medium hover:bg-blue-600 transition"
          >
            <Download size={18} />
            Export Excel
          </button>
        </div>
      </div>

      {error && (
        <div className="ml-[2.5vw] mr-[2.5vw] mb-4 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg p-3">
          {error}
        </div>
      )}

      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 ml-[2.5vw] mr-[2.5vw] mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, email, or transaction ID"
                value={filters.search}
                onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={filters.status}
              onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))}
              className="w-full sm:w-48 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={filters.plan}
              onChange={(event) => setFilters((prev) => ({ ...prev, plan: event.target.value }))}
              className="w-full sm:w-48 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
            >
              {PLAN_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button className="inline-flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
              <Filter size={18} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden ml-[2.5vw] mr-[2.5vw]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 text-sm text-gray-400">
                <th className="px-4 py-3 text-left">Transaction ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Plan</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                    Loading payments...
                  </td>
                </tr>
              ) : paginatedPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                    No payments found with the current filters.
                  </td>
                </tr>
              ) : (
                paginatedPayments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-800/40">
                    <td className="px-4 py-3 font-mono text-sm text-gray-300">{payment.transactionId}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{payment.userName}</span>
                        <span className="text-sm text-gray-400">{payment.userEmail}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payment.plan === 'Premium'
                            ? 'bg-purple-500/20 text-purple-300'
                            : payment.plan === 'Enterprise'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-gray-500/20 text-gray-300'
                        }`}
                      >
                        {payment.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-100">{formatAmount(payment.amount)}</td>
                    <td className="px-4 py-3">{statusPill(payment.status)}</td>
                    <td className="px-4 py-3 text-gray-300">
                      {payment.date ? new Date(payment.date).toLocaleString() : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 bg-gray-800 border-t border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-gray-400">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredPayments.length)} of {filteredPayments.length} payments
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg text-gray-300 hover:bg-gray-700 transition disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg text-gray-300 hover:bg-gray-700 transition disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {selectedPayment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <div>
                <h3 className="text-lg font-semibold text-white">Payment Details</h3>
                <p className="text-sm text-gray-400">Transaction ID: {selectedPayment.transactionId}</p>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                className="text-gray-400 hover:text-white text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <section className="bg-gray-800/60 border border-gray-700/60 rounded-xl p-4">
                <h4 className="text-sm text-gray-300 mb-2">Customer</h4>
                <p className="text-white font-medium">{selectedPayment.userName}</p>
                <p className="text-gray-400 text-sm">{selectedPayment.userEmail}</p>
              </section>

              <section className="bg-gray-800/60 border border-gray-700/60 rounded-xl p-4">
                <h4 className="text-sm text-gray-300 mb-2">Payment</h4>
                <p className="text-white font-medium">{formatAmount(selectedPayment.amount)}</p>
                <p className="text-gray-400 text-sm">Plan: {selectedPayment.plan}</p>
                <p className="text-gray-500 text-xs mt-1">Date: {selectedPayment.date ? new Date(selectedPayment.date).toLocaleString() : '—'}</p>
              </section>

              <section className="bg-gray-800/60 border border-gray-700/60 rounded-xl p-4">
                <h4 className="text-sm text-gray-300 mb-2">Status</h4>
                {statusPill(selectedPayment.status)}
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}