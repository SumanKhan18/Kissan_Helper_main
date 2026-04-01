import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Package,
  Truck,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus,
  X
} from 'lucide-react';

export default function AdminShipments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);

  const [shipments, setShipments] = useState([
    {
      id: 'SHIP123456',
      orderNumber: 'ORD987654',
      customer: {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '+91 98765 43210',
        address: 'Delhi, India'
      },
      product: 'Organic Fertilizer Pack',
      quantity: 2,
      status: 'delivered',
      currentLocation: 'Delhi Hub',
      estimatedDelivery: '2024-03-20',
      trackingHistory: [
        {
          status: 'Delivered',
          location: 'Customer Location, Delhi',
          timestamp: '2024-03-20 14:30',
          description: 'Package delivered successfully'
        }
      ]
    },
    {
      id: 'SHIP789012',
      orderNumber: 'ORD345678',
      customer: {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 98765 43211',
        address: 'Mumbai, India'
      },
      product: 'Premium Seeds Collection',
      quantity: 1,
      status: 'in_transit',
      currentLocation: 'Mumbai Hub',
      estimatedDelivery: '2024-03-22',
      trackingHistory: [
        {
          status: 'In Transit',
          location: 'Mumbai Hub',
          timestamp: '2024-03-20 10:00',
          description: 'Package in transit to delivery location'
        }
      ]
    }
  ]);

  const itemsPerPage = 10;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-500/20 text-green-500';
      case 'in_transit': return 'bg-blue-500/20 text-blue-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500';
      case 'delayed': return 'bg-red-500/20 text-red-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return <CheckCircle className="w-5 h-5" />;
      case 'in_transit': return <Truck className="w-5 h-5" />;
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'delayed': return <AlertTriangle className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.product.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || shipment.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);
  const paginatedShipments = filteredShipments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleUpdateStatus = (shipment) => {
    setSelectedShipment(shipment);
    setIsUpdateModalOpen(true);
  };

  const handleStatusUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updatedStatus = formData.get('status');
    const updatedLocation = formData.get('location');
    const updatedDescription = formData.get('description');

    const updatedShipments = shipments.map((shipment) => {
      if (shipment.id === selectedShipment.id) {
        return {
          ...shipment,
          status: updatedStatus,
          currentLocation: updatedLocation,
          trackingHistory: [
            {
              status: updatedStatus.replace('_', ' ').toUpperCase(),
              location: updatedLocation,
              timestamp: new Date().toISOString(),
              description: updatedDescription || 'Status updated',
            },
            ...shipment.trackingHistory,
          ]
        };
      }
      return shipment;
    });

    setShipments(updatedShipments);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="text-white relative ml-[2.5vw] mr-[2.5vw]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shipment Management</h1>
          <p className="text-gray-400 mt-1">Track and manage all shipments</p>
        </div>
        <button
          onClick={() => alert("Create Shipment coming soon!")}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition-colors mt-8"
        >
          <Plus size={18} />
          Create Shipment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by ID, order number, or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-40 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="delayed">Delayed</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700">
              <Filter size={18} />
              <span className="hidden md:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Shipment ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Order Details</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Location</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">ETA</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {paginatedShipments.map((shipment) => (
                <tr key={shipment.id} className="hover:bg-gray-800/50">
                  <td className="px-4 py-3 font-mono text-sm text-gray-300">{shipment.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{shipment.product}</p>
                    <p className="text-sm text-gray-400">Order #{shipment.orderNumber}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{shipment.customer.name}</p>
                    <p className="text-sm text-gray-400">{shipment.customer.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                      {getStatusIcon(shipment.status)}
                      <span className="capitalize">{shipment.status.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{shipment.currentLocation}</td>
                  <td className="px-4 py-3 text-gray-300">{shipment.estimatedDelivery}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleUpdateStatus(shipment)}
                      className="text-gray-400 hover:text-white"
                      aria-label="Edit shipment"
                    >
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 bg-gray-800 border-t border-gray-700 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredShipments.length)} of {filteredShipments.length} shipments
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-700'}`}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg ${currentPage === page ? 'bg-green-500 text-black' : 'text-gray-400 hover:bg-gray-700'}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-700'}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && selectedShipment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Update Shipment Status</h3>
                <p className="text-gray-400 text-sm mt-1">Shipment ID: {selectedShipment.id}</p>
              </div>
              <button onClick={() => setIsUpdateModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleStatusUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <select
                  name="status"
                  defaultValue={selectedShipment.status}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="delayed">Delayed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Current Location</label>
                <input
                  name="location"
                  type="text"
                  defaultValue={selectedShipment.currentLocation}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status Description</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Enter status update details..."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                ></textarea>
              </div>

              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600">
                  Update Status
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
