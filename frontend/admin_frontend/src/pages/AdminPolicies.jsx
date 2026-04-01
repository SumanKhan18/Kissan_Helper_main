import { useEffect, useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';
import { RootAPI } from '../api.js';
import LoadingSpinner from '../components/LoadingSpinner';
import CountdownTimer from '../components/CountdownTimer';

const CATEGORY_OPTIONS = [
  { label: 'All Categories', value: 'all' },
  { label: 'Subsidy', value: 'subsidy' },
  { label: 'Loan', value: 'loan' },
  { label: 'Insurance', value: 'insurance' },
  { label: 'Support', value: 'support' },
];

const STATUS_OPTIONS = [
  { label: 'All Status', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];

const emptyForm = {
  title: '',
  description: '',
  category: 'subsidy',
  status: 'active',
  eligibility: '',
  benefits: '',
  deadline: '',
};

export default function AdminPolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ search: '', category: 'all', status: 'all' });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [formState, setFormState] = useState(emptyForm);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchPolicies = async () => {
    setLoading(true);
    setError('');

    try {
      const params = {};
      if (filters.category !== 'all') params.category = filters.category;
      if (filters.status !== 'all') params.status = filters.status;
      if (filters.search.trim()) params.search = filters.search.trim();

      const { data } = await RootAPI.get('/api/policies', { params });
      setPolicies(data?.policies ?? []);
    } catch (err) {
      console.error('Failed to fetch policies:', err);
      setError(err?.response?.data?.message || 'Unable to load policies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, [filters.category, filters.status, filters.search]);

  const openCreateModal = () => {
    setModalMode('create');
    setFormState(emptyForm);
    setSelectedPolicyId(null);
    setModalOpen(true);
  };

  const openEditModal = (policy) => {
    setModalMode('edit');
    setSelectedPolicyId(policy._id);
    setFormState({
      title: policy.title,
      description: policy.description,
      category: policy.category,
      status: policy.status,
      eligibility: policy.eligibility ?? '',
      benefits: policy.benefits ?? '',
      deadline: policy.deadline ? policy.deadline.split('T')[0] : '',
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormState(emptyForm);
    setSelectedPolicyId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = {
        ...formState,
        category: formState.category,
        status: formState.status,
      };

      if (modalMode === 'create') {
        await RootAPI.post('/api/policies', payload);
      } else if (selectedPolicyId) {
        await RootAPI.put(`/api/policies/${selectedPolicyId}`, payload);
      }

      await fetchPolicies();
      closeModal();
    } catch (err) {
      console.error('Failed to save policy:', err);
      setError(err?.response?.data?.message || 'Unable to save policy.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (policyId) => {
    if (!window.confirm('Delete this policy? This action cannot be undone.')) return;
    try {
      await RootAPI.delete(`/api/policies/${policyId}`);
      setPolicies((prev) => prev.filter((p) => p._id !== policyId));
    } catch (err) {
      console.error('Failed to delete policy:', err);
      setError(err?.response?.data?.message || 'Unable to delete policy.');
    }
  };

  const filteredPolicies = policies;

  return (
    <div className="text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold ml-[2.5vw] mr-[2.5vw]">Government Policies</h1>
          <p className="text-gray-400 mt-1 ml-[2.5vw] mr-[2.5vw]">Curate agricultural policies and schemes</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition-colors ml-[2.5vw] mr-[2.5vw]"
        >
          <Plus size={18} />
          Add Policy
        </button>
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
                placeholder="Search policies..."
                value={filters.search}
                onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={filters.category}
              onChange={(event) => setFilters((prev) => ({ ...prev, category: event.target.value }))}
              className="w-full sm:w-44 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={filters.status}
              onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))}
              className="w-full sm:w-44 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
            >
              {STATUS_OPTIONS.map((option) => (
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
                <th className="px-4 py-3 text-left">Policy</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Deadline</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12">
                    <LoadingSpinner 
                      message="Loading policies..." 
                      subMessage="Fetching policy data from the database"
                      size="md"
                    />
                  </td>
                </tr>
              ) : filteredPolicies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                    No policies found.
                  </td>
                </tr>
              ) : (
                filteredPolicies.map((policy) => (
                  <tr key={policy._id} className="hover:bg-gray-800/40">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-white font-medium">{policy.title}</p>
                        <p className="text-sm text-gray-400 line-clamp-1">{policy.description}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-gray-300">{policy.category}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          policy.status === 'active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-300'
                        }`}
                      >
                        {policy.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {policy.deadline ? (
                        <div className="space-y-2 min-w-[200px]">
                          <div className="text-gray-300 text-xs font-medium">
                            Deadline: {new Date(policy.deadline).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          <div className="pt-1 border-t border-gray-700">
                            <div className="text-xs text-gray-400 font-medium mb-1">Time Remaining:</div>
                            <CountdownTimer deadline={policy.deadline} />
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(policy)}
                          className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(policy._id)}
                          className="p-2 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl">
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  {modalMode === 'create' ? 'Add Policy' : 'Edit Policy'}
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl leading-none"
                >
                  &times;
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-300 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formState.title}
                    onChange={(event) => setFormState((prev) => ({ ...prev, title: event.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-300 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formState.description}
                    onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Category</label>
                  <select
                    value={formState.category}
                    onChange={(event) => setFormState((prev) => ({ ...prev, category: event.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  >
                    {CATEGORY_OPTIONS.filter((option) => option.value !== 'all').map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Status</label>
                  <select
                    value={formState.status}
                    onChange={(event) => setFormState((prev) => ({ ...prev, status: event.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  >
                    {STATUS_OPTIONS.filter((option) => option.value !== 'all').map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Deadline</label>
                  <input
                    type="date"
                    required
                    value={formState.deadline}
                    onChange={(event) => setFormState((prev) => ({ ...prev, deadline: event.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Eligibility</label>
                    <textarea
                      rows={2}
                      value={formState.eligibility}
                      onChange={(event) => setFormState((prev) => ({ ...prev, eligibility: event.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Benefits</label>
                    <textarea
                      rows={2}
                      value={formState.benefits}
                      onChange={(event) => setFormState((prev) => ({ ...prev, benefits: event.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-60"
                >
                  {submitting ? 'Saving…' : modalMode === 'create' ? 'Create Policy' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}