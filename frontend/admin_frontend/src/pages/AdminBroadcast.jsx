import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api';
import { Send, Users, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AdminBroadcast() {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [priority, setPriority] = useState('normal');
  const [showSuccess, setShowSuccess] = useState(false);
  const [recentBroadcasts, setRecentBroadcasts] = useState([]);
  const [allBroadcasts, setAllBroadcasts] = useState([]);
  const [totalRecipients, setTotalRecipients] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBroadcasts = async () => {
      try {
        setError('');
        setLoading(true);
        const [recentRes, totalRecipientsRes, allRes] = await Promise.all([
          API.get('/broadcasts/recent'),
          API.get('/broadcasts/total-recipients'),
          API.get('/broadcasts'),
        ]);
        setRecentBroadcasts(recentRes.data?.recentBroadcasts ?? []);
        setTotalRecipients(totalRecipientsRes.data?.totalRecipients ?? 0);
        setAllBroadcasts(allRes.data?.broadcasts ?? []);
      } catch (err) {
        console.error('Failed to load broadcasts', err);
        setError(err.response?.data?.message || err.message || 'Failed to load broadcasts');
      } finally {
        setLoading(false);
      }
    };

    fetchBroadcasts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) {
      alert('Please fill in both title and message');
      return;
    }

    try {
      const newBroadcast = {
        title: title.trim(),
        content: message.trim(),
        targetAudience: selectedAudience,
        priority,
      };

      const { data } = await API.post('/broadcasts', newBroadcast);

      if (data.success && data.broadcast) {
        // Refresh the broadcasts list
        const [recentRes, totalRecipientsRes, allRes] = await Promise.all([
          API.get('/broadcasts/recent'),
          API.get('/broadcasts/total-recipients'),
          API.get('/broadcasts'),
        ]);
        
        setRecentBroadcasts(recentRes.data?.recentBroadcasts ?? []);
        setTotalRecipients(totalRecipientsRes.data?.totalRecipients ?? 0);
        setAllBroadcasts(allRes.data?.broadcasts ?? []);

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        // Reset form
        setMessage('');
        setTitle('');
        setSelectedAudience('all');
        setPriority('normal');
      } else {
        throw new Error(data.message || 'Broadcast creation failed');
      }
    } catch (error) {
      console.error('Broadcast failed', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send broadcast';
      alert(errorMessage);
    }
  };

  const failedDeliveries = useMemo(() => {
    if (!allBroadcasts.length) return 0;
    return allBroadcasts.reduce((acc, broadcast) => {
      const intended = broadcast.intendedRecipients?.length ?? 0;
      const delivered = broadcast.deliveredTo?.length ?? 0;
      return acc + Math.max(intended - delivered, 0);
    }, 0);
  }, [allBroadcasts]);

  const totalReads = useMemo(() => {
    if (!allBroadcasts.length) return 0;
    return allBroadcasts.reduce((acc, broadcast) => acc + (broadcast.readBy?.length ?? 0), 0);
  }, [allBroadcasts]);

  return (
    <div className="text-white relative ml-[2.5vw] mr-[2.5vw]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Broadcast Messages</h1>
        <p className="text-gray-400 mt-1">Send announcements to your users</p>
        {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-xl border border-gray-800 p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Message Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Message Content</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Target Audience</label>
                  <select
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  >
                    <option value="all">All Users</option>
                    <option value="premium">Premium Users</option>
                    <option value="inactive">Inactive Users</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Priority Level</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="px-6 py-2 bg-green-500 text-black rounded-lg flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Broadcast
                </button>
              </div>
            </form>
          </motion.div>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-4 right-4 bg-green-500 text-black px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Broadcast sent successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-4">Broadcast Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-300">Total Recipients</span>
                </div>
                <span className="text-white font-medium">{totalRecipients}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="text-gray-300">Total Reads</span>
                </div>
                <span className="text-white font-medium">{totalReads}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-300">Failed Deliveries</span>
                </div>
                <span className="text-white font-medium">{failedDeliveries}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Broadcasts</h3>
            <div className="space-y-4">
              {loading ? (
                <p className="text-sm text-gray-400">Loading broadcasts...</p>
              ) : recentBroadcasts.map((broadcast) => (
                <div key={broadcast._id} className="p-4 bg-gray-800 rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-white">{broadcast.title}</h4>
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 capitalize">
                      {broadcast.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{broadcast.content}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Delivered to {broadcast.deliveredCount ?? broadcast.deliveredTo?.length ?? 0} users</span>
                    <span>{new Date(broadcast.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
              {!loading && recentBroadcasts.length === 0 && (
                <p className="text-sm text-gray-400">No broadcasts sent yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
