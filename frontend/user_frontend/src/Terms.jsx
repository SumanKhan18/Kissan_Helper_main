import { FaLeaf, FaHandsHelping, FaSeedling } from 'react-icons/fa';
const Terms = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-10">
  
      <p className="text-gray-600">
      <h1 className="text-5xl font-extrabold text-center mb-8 text-green-500 animate-pulse">🌿 Terms & Conditions 🌿</h1>
      <p className="text-lg text-center mb-6">Welcome to <span className="font-bold">Kissan Helper</span>! Here’s what you need to know:</p>
      <ul className="list-none space-y-4 text-lg">
        <li className="flex items-center"><FaLeaf className="mr-2 text-yellow-500" /> Keep your farming data accurate and up-to-date. 🌾</li>
        <li className="flex items-center"><FaHandsHelping className="mr-2 text-yellow-500" /> No fraudulent activities – let’s grow together. 🤝</li>
        <li className="flex items-center"><FaSeedling className="mr-2 text-yellow-500" /> Sustainable and eco-friendly practices are encouraged. 🌱</li>
        <li className="flex items-center">📊 Your shared data helps in agricultural research and improvements. 📈</li>
        <li className="flex items-center">⚖ Follow local farming laws and government policies. 🚜</li>
        <li className="flex items-center">💰 We guide, but we can’t guarantee financial success.</li>
        <li className="flex items-center">📌 All disputes are resolved under Indian jurisdiction.</li>
      </ul>
      <p className="mt-8 text-center text-lg">📞 Need help? <span className="font-bold text-red-500">Contact our support team!</span></p>
      </p>
    </div>
  );
};

export default Terms;