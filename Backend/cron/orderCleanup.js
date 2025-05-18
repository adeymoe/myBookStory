import cron from 'node-cron';
import orderModel from '../models/orderModel.js';

const deleteStalePendingOrders = async () => {
  try {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours

    const result = await orderModel.deleteMany({
      status: 'pending',
      createdAt: { $lt: cutoff },
    });

    if (result.deletedCount > 0) {
      console.log(`[Cron] Deleted ${result.deletedCount} pending orders older than 24 hours`);
    }
  } catch (error) {
    console.error('[Cron] Error deleting stale pending orders:', error.message);
  }
};

// Schedule to run once a day at midnight (server time)
const scheduleOrderCleanup = () => {
  cron.schedule('0 0 * * *', deleteStalePendingOrders); // Every day at 00:00
};

export default scheduleOrderCleanup;
