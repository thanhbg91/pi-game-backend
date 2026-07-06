const express = require('express');
const axios = require('axios'); // Cần dùng axios để gọi lại API cho Pi Network
const app = express();
const PORT = process.env.PORT || 10000;

// THAY CỤM "DÁN_API_KEY_CỦA_BẠN_VÀO_ĐÂY" BẰNG API KEY THẬT CỦA BẠN
const PI_API_KEY = "DÁN_API_KEY_CỦA_BẠN_VÀO_ĐÂY"; 

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server Backend Pi Game đang chạy online!');
});

// 1. Endpoint đón nhận tín hiệu tạo thanh toán (onReadyForServerApproval)
app.post('/approve', async (req, res) => {
    const { paymentId } = req.body;
    try {
        // Gọi lên Pi API để phê duyệt khoản thanh toán
        const response = await axios.post(
            `https://minepi.com{paymentId}/approve`,
            {},
            { headers: { Authorization: `Key ${PI_API_KEY}` } }
        );
        console.log(`Đã phê duyệt thanh toán: ${paymentId}`);
        return res.status(200).json({ message: "Approved" });
    } catch (error) {
        console.error("Lỗi phê duyệt:", error.response ? error.response.data : error.message);
        return res.status(500).json({ error: "Approval failed" });
    }
});

// 2. Endpoint xác nhận sau khi người dùng đã chuyển Pi thành công (onAllInteractionsComplete)
app.post('/complete', async (req, res) => {
    const { paymentId, txid } = req.body;
    try {
        // Gọi lên Pi API để hoàn thành giao dịch
        const response = await axios.post(
            `https://minepi.com{paymentId}/complete`,
            { txid: txid },
            { headers: { Authorization: `Key ${PI_API_KEY}` } }
        );
        console.log(`Đã hoàn thành giao dịch: ${paymentId}`);
        // TẠI ĐÂY: Viết thêm code để cộng xu/vàng vào tài khoản người chơi trong game của bạn
        return res.status(200).json({ message: "Completed" });
    } catch (error) {
        console.error("Lỗi hoàn thành:", error.response ? error.response.data : error.message);
        return res.status(500).json({ error: "Completion failed" });
    }
});

app.listen(PORT, () => {
    console.log(`Server chạy tại port ${PORT}`);
});
