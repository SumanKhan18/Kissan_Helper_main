import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FileText, Search, BookOpen, Building2, Users, Calendar, ArrowRight } from "lucide-react";

export default function GovernmentPolicies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [policies, setPolicies] = useState([]);

  const fetchPolicies = () => {
    setLoading(true);
    setTimeout(() => {
      const fetchedPolicies = [
        {
          title: "PM-KISAN Scheme",
          description: "Direct income support to farmers for agricultural expenses",
          eligibility: "Small and marginal farmers with cultivable land",
          benefits: "₹6,000 per year in three equal installments",
          deadline: "Ongoing",
          category: "subsidy",
        },
        {
          title: "Kisan Credit Card",
          description: "Easy access to credit for agricultural needs",
          eligibility: "All farmers, including tenant farmers",
          benefits: "Credit limit based on land holding and crop pattern",
          deadline: "Ongoing",
          category: "loan",
        },
      ];
      setPolicies(fetchedPolicies);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPolicies();
  };

  const categories = [
    { id: "all", label: "All Schemes", icon: <BookOpen className="w-5 h-5" /> },
    { id: "subsidy", label: "Subsidies", icon: <Building2 className="w-5 h-5" /> },
    { id: "loan", label: "Loans", icon: <FileText className="w-5 h-5" /> },
    { id: "insurance", label: "Insurance", icon: <Users className="w-5 h-5" /> },
    { id: "training", label: "Training", icon: <Calendar className="w-5 h-5" /> },
  ];

  return (
    <div className="relative min-h-screen mt-15">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1920"
          alt="Government Policies"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 opacity-90">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 rounded-lg p-8 backdrop-blur-sm bg-opacity-90">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-8 w-8 text-green-500" />
            <h1 className="text-3xl font-bold text-white">Government Policies</h1>
          </div>

          <div className="prose prose-invert mb-8">
            <p className="text-gray-300">
              Stay updated with the latest government schemes, subsidies, and policies designed to support farmers.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                  selectedCategory === category.id ? "bg-green-500 text-black" : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for schemes, policies, or keywords..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          {policies.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {policies.map((policy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{policy.title}</h3>
                      <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-500 mt-2">
                        {policy.category.charAt(0).toUpperCase() + policy.category.slice(1)}
                      </span>
                    </div>
                    <span className="text-gray-400">{policy.deadline}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{policy.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Eligibility</h4>
                      <p className="text-white">{policy.eligibility}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Benefits</h4>
                      <p className="text-white">{policy.benefits}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="text-green-500 hover:text-green-400 flex items-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}