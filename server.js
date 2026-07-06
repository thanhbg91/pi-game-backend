const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server Backend Pi Game đang chạy online!');
});

// Các đoạn code xử lý Payment API của Pi Network sẽ viết tiếp ở dưới này...

app.listen(PORT, () => {
    console.log(`Server chạy tại port ${PORT}`);
});
