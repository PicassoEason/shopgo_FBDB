const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const firebase = require('./config');  // 確保從 config.js 中正確導入 Firebase
const admin = require('firebase-admin'); 
const app = express();
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK with your service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shgo-64872-default-rtdb.asia-southeast1.firebasedatabase.app"
});
// 中間件
app.use(cors());
app.use(bodyParser.json());
app.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    res.status(200).json({ message: `Hello ${name}!` });
  } catch (error) {
    console.error("Error adding data to Firestore:", error);
    res.status(500).json({ error: 'Failed to push data to Firestore' });
  }
});

app.get('/api/mes',async (req,res)=>{
  try{
    const db = admin.firestore();
    var ref = db.collection('data');
    const snapshot = await db.collection("data").orderBy('timestamp','desc').limit(10).get();
    const Minlist = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
    // Minlist.reverse()
    res.send(Minlist);
  }catch(error){
    console.error("Error getting data to Firestore:", error);
    res.status(500).json({ error: 'Failed to get data to Firestore' });
  }
})

app.post('/api/data', async (req, res) => {
  try {
    const db = admin.firestore();
    const ref = db.collection('data'); // 可能需要更改集合名稱，根據您的應用情況。

    // 從請求體中提取 user、mes 和 address
    const { user, mes, address } = req.body;

    // 檢查是否提供了所有必要的字段
    if (!user || !mes || !address) {
      return res.status(400).json({ error: 'Missing required fields in form data' });
    }

    // 將提取的字段和伺服器時間戳添加到Firestore文檔中
    await ref.add({
      user: user,
      mes: mes,
      address: address,
      timestamp: admin.firestore.FieldValue.serverTimestamp()  // 添加時間戳
    });

    res.status(200).json({ message: 'Data added successfully to Firestore' });
  } catch (error) {
    console.error("Error adding data to Firestore:", error);
    res.status(500).json({ error: 'Failed to push data to Firestore' });
  }
});

app.listen(5001, function () {
  console.log('Listening on port 5001!');
});
