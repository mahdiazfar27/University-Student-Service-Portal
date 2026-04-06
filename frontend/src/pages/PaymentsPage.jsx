import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useCustomHooks';
import { useToast } from '../context/ToastContext';
import { Card } from '../components';
import { DataTable } from '../components';
import { Loading } from '../components';
import { Badge } from '../components';
import { Button } from '../components';
import { transformError } from '../utils/apiErrors';
import { formatCurrency, formatDate } from '../utils/helpers';
import { API_BASE_URL } from '../config/config';
import axios from 'axios';
import './PaymentsPage.css';

const PaymentsPage = () => {
  const { user } = useAuth();
  const { showError } = useToast();

  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [fees, setFees] = useState([]);
  const [summary, setSummary] = useState({
    totalFees: 0,
    totalPaid: 0,
    outstandingBalance: 0,
  });

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      setLoading(true);

      // Fetch payments and fees
      const [paymentsRes, feesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/student/payments`),
        axios.get(`${API_BASE_URL}/student/fees`),
      ]);

      if (paymentsRes.data.success) {
        setPayments(paymentsRes.data.data);
      }

      if (feesRes.data.success) {
        setFees(feesRes.data.data);
        // Calculate summary from fees
        const totalFees = feesRes.data.data.reduce((sum, fee) => sum + parseFloat(fee.amount || 0), 0);
        const totalPaid = feesRes.data.data
          .filter(fee => fee.status === 'paid')
          .reduce((sum, fee) => sum + parseFloat(fee.amount || 0), 0);
        const outstandingBalance = totalFees - totalPaid;

        setSummary({
          totalFees,
          totalPaid,
          outstandingBalance,
        });
      }
    } catch (error) {
      const errorMessage = transformError(error);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'danger';
      case 'cancelled':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const paymentColumns = [
    {
      key: 'transactionId',
      label: 'Transaction ID',
      render: (value) => <code className="transaction-id">{value}</code>,
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => <strong>{formatCurrency(value)}</strong>,
    },
    {
      key: 'paymentDate',
      label: 'Date',
      render: (value) => formatDate(new Date(value)),
    },
    {
      key: 'paymentMethod',
      label: 'Method',
      render: (value) => <span className="method-badge">{value || 'N/A'}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <Badge variant={getStatusColor(value)} label={value} />,
    },
  ];

  const feeColumns = [
    {
      key: 'type',
      label: 'Fee Type',
      render: (value) => <strong>{value}</strong>,
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      render: (value) => formatDate(new Date(value)),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <Badge variant={getStatusColor(value)} label={value} />,
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <Loading fullpage />;
  }

  return (
    <div className="payments-page">
      <div className="page-header">
        <h1>Payments & Fees</h1>
        <p>View your payment history and outstanding fees</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <Card className="summary-card">
          <div className="summary-content">
            <h3>Total Fees</h3>
            <div className="amount total-fees">
              {formatCurrency(summary.totalFees)}
            </div>
          </div>
        </Card>

        <Card className="summary-card">
          <div className="summary-content">
            <h3>Total Paid</h3>
            <div className="amount total-paid">
              {formatCurrency(summary.totalPaid)}
            </div>
          </div>
        </Card>

        <Card className="summary-card">
          <div className="summary-content">
            <h3>Outstanding Balance</h3>
            <div className={`amount ${summary.outstandingBalance > 0 ? 'outstanding' : 'cleared'}`}>
              {formatCurrency(summary.outstandingBalance)}
            </div>
          </div>
        </Card>
      </div>

      {/* Payment Breakdown */}
      <Card title="Payment Breakdown by Category" className="breakdown-card">
        {fees.length > 0 ? (
          <div className="breakdown-list">
            {fees.map((fee) => (
              <div key={fee.id} className="breakdown-item">
                <div className="breakdown-info">
                  <span className="fee-type">{fee.type}</span>
                  <span className="fee-date">Due: {formatDate(new Date(fee.dueDate))}</span>
                </div>
                <div className="breakdown-amount">
                  <strong>{formatCurrency(fee.amount)}</strong>
                  <Badge variant={getStatusColor(fee.status)} label={fee.status} small />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">No fees record found</p>
        )}
      </Card>

      {/* Payments History */}
      <Card title="Payment History" className="payments-card">
        {payments.length > 0 ? (
          <div className="table-wrapper">
            <DataTable
              columns={paymentColumns}
              data={payments}
              striped
              hover
            />
          </div>
        ) : (
          <p className="empty-message">No payment history available</p>
        )}
      </Card>

      {/* Fees Due */}
      <Card title="Fees Due" className="fees-card">
        {fees.filter(f => f.status !== 'paid').length > 0 ? (
          <div className="table-wrapper">
            <DataTable
              columns={feeColumns}
              data={fees.filter(f => f.status !== 'paid')}
              striped
              hover
            />
          </div>
        ) : (
          <div className="all-paid">
            <span className="checkmark">✓</span>
            <p>All fees are paid up!</p>
          </div>
        )}
      </Card>

      {/* Actions */}
      <div className="payment-actions">
        <Button
          label="Print Statement"
          variant="secondary"
          onClick={handlePrint}
        />
        <Button
          label="Refresh"
          variant="outline"
          onClick={fetchPaymentData}
        />
      </div>
    </div>
  );
};

export default PaymentsPage;
