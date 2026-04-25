import React, { useState } from 'react';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, RefreshCcw, 
  DollarSign, History, Send, CreditCard, Building2, CheckCircle2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Transaction {
  id: string;
  type: 'Deposit' | 'Withdrawal' | 'Transfer' | 'Funding';
  amount: number;
  date: string;
  sender: string;
  receiver: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

const mockTransactions: Transaction[] = [
  { id: '1', type: 'Deposit', amount: 5000, date: '2023-10-25', sender: 'Bank Account ***45', receiver: 'Wallet', status: 'Completed' },
  { id: '2', type: 'Funding', amount: 15000, date: '2023-10-24', sender: 'Wallet', receiver: 'TechNova Startup', status: 'Completed' },
  { id: '3', type: 'Withdrawal', amount: 1000, date: '2023-10-20', sender: 'Wallet', receiver: 'Bank Account ***45', status: 'Completed' },
];

export const PaymentsPage: React.FC = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(24500);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [target, setTarget] = useState('');

  const handleTransaction = (type: string) => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;
    
    const numAmount = Number(amount);
    
    if ((type === 'Withdrawal' || type === 'Transfer' || type === 'Funding') && numAmount > balance) {
      alert("Insufficient funds!");
      return;
    }

    if (type === 'Deposit') setBalance(prev => prev + numAmount);
    else setBalance(prev => prev - numAmount);

    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: type as any,
      amount: numAmount,
      date: new Date().toISOString().split('T')[0],
      sender: type === 'Deposit' ? 'Bank Account' : 'Wallet',
      receiver: type === 'Withdrawal' ? 'Bank Account' : (target || 'Wallet'),
      status: 'Completed'
    };

    setTransactions([newTx, ...transactions]);
    setShowModal(null);
    setAmount('');
    setTarget('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payments & Wallet</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your funds, investments, and transaction history.
        </p>
      </div>

      {/* Top Section - Balance & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl shadow-lg p-6 text-white col-span-1 md:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white/80">Total Balance</h2>
            <Wallet className="text-white/80" size={24} />
          </div>
          <p className="text-4xl font-bold mb-6">${balance.toLocaleString()}</p>
          <div className="text-sm text-white/80 flex items-center">
            <CheckCircle2 size={16} className="mr-1" /> Available for funding
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6 col-span-1 md:col-span-2 flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => setShowModal('Deposit')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <div className="bg-green-100 p-2 rounded-full mb-2">
                <ArrowDownLeft className="text-green-600" size={20} />
              </div>
              <span className="text-sm font-medium text-gray-700">Deposit</span>
            </button>
            
            <button 
              onClick={() => setShowModal('Withdrawal')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <div className="bg-red-100 p-2 rounded-full mb-2">
                <ArrowUpRight className="text-red-600" size={20} />
              </div>
              <span className="text-sm font-medium text-gray-700">Withdraw</span>
            </button>
            
            <button 
              onClick={() => setShowModal('Transfer')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <div className="bg-blue-100 p-2 rounded-full mb-2">
                <RefreshCcw className="text-blue-600" size={20} />
              </div>
              <span className="text-sm font-medium text-gray-700">Transfer</span>
            </button>

            <button 
              onClick={() => setShowModal('Funding')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <div className="bg-purple-100 p-2 rounded-full mb-2">
                <Send className="text-purple-600" size={20} />
              </div>
              <span className="text-sm font-medium text-gray-700">Fund Deal</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transaction History */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <History className="mr-2 text-gray-400" size={20} />
              Transaction History
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`p-1.5 rounded-full mr-2 ${
                          tx.type === 'Deposit' ? 'bg-green-100 text-green-600' :
                          tx.type === 'Withdrawal' ? 'bg-red-100 text-red-600' :
                          tx.type === 'Funding' ? 'bg-purple-100 text-purple-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {tx.type === 'Deposit' && <ArrowDownLeft size={16} />}
                          {tx.type === 'Withdrawal' && <ArrowUpRight size={16} />}
                          {tx.type === 'Transfer' && <RefreshCcw size={16} />}
                          {tx.type === 'Funding' && <Send size={16} />}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{tx.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${
                        tx.type === 'Deposit' ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {tx.type === 'Deposit' ? '+' : '-'}${tx.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {tx.sender} &rarr; {tx.receiver}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tx.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Panel / Promotion or Linked Accounts */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="mr-2 text-gray-400" size={20} />
              Payment Methods
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-6 bg-blue-600 rounded mr-3 flex items-center justify-center text-white text-xs font-bold italic">VISA</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">•••• 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/25</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">Primary</span>
              </div>
              <button className="w-full py-2 text-sm text-primary-600 font-medium border border-dashed border-primary-300 rounded-lg hover:bg-primary-50 transition-colors">
                + Add Payment Method
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setShowModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{showModal} Funds</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              {(showModal === 'Transfer' || showModal === 'Funding') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {showModal === 'Funding' ? 'Startup / Deal Name' : 'Recipient Email/ID'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder={showModal === 'Funding' ? 'e.g. EcoTech Innovations' : 'user@example.com'}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={() => handleTransaction(showModal)}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Confirm {showModal}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
