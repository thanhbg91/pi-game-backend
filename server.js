const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Địa chỉ API của Pi Network (Testnet hoặc Mainnet)
const PI_API_URL = "https://minepi.com"; 
const API_KEY = process.env.PI_API_KEY; // Lấy từ develop.pi

// 1. Endpoint nhận thông báo đơn hàng từ Client (onReadyForServerApproval)
app.post('/api/pi/approve', async (req, res) => {
    const { paymentId } = req.body;
    try {
        // Gọi lên server Pi để chấp thuận đơn hàng
        const response = await axios.post(`${PI_API_URL}/payments/${paymentId}/approve`, {}, {
            headers: { 'Authorization': `Key ${API_KEY}` }
        });
        return res.json({ success: true, data: response.data });
    } catch (error) {
        console.error(error.response?.data || error.message);
        return res.status(500).json({ success: false, error: 'Không thể duyệt đơn hàng' });
    }
});

// 2. Endpoint hoàn thành đơn hàng sau khi blockchain đã chuyển tiền (onReadyForServerCompletion)
app.post('/api/pi/complete', async (req, res) => {
    const { paymentId, txid } = req.body;
    try {
        // Gọi lên server Pi để xác nhận hoàn thành đơn hàng
        const response = await axios.post(`${PI_API_URL}/payments/${paymentId}/complete`, { txid }, {
            headers: { 'Authorization': `Key ${API_KEY}` }
        });

        // TẠI ĐÂY: Bạn viết code cộng vật phẩm/vàng trong game cho người chơi

        return res.json({ success: true, data: response.data });
    } catch (error) {
        console.error(error.response?.data || error.message);
        return res.status(500).json({ success: false, error: 'Không thể hoàn thành đơn hàng' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy tại port ${PORT}`));
