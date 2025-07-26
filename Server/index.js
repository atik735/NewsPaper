require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_SK_KEY);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB client setup
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Collections
    const articlesCollection = client.db("articlesDB").collection("articles");
    const usersCollection = client.db("articlesDB").collection("users");

    // ইউজার সেভ করা
    app.post('/user', async(req, res)=>{
      const userData = req.body
      userData.role = 'customer'
      userData.created_at = new Date().toISOString()
      userData.last_loggedIn = new Date().toISOString()
      const query = {
        email: userData?.email,
      }
      const alreadyExists = await usersCollection.findOne(query)

      if (!!alreadyExists) {
        const result = await usersCollection.updateOne(query,{
          $set: { last_loggedIn: new Date().toISOString() }
        })
        return res.send(result)
      }
      const result = await usersCollection.insertOne(userData)
      res.send(result)
    })

    // ইউজার স্ট্যাটিসটিক্স
    app.get('/users/statistics', async (req, res) => {
      try {
        const totalUsers = await usersCollection.countDocuments();
        const premiumUsers = await usersCollection.countDocuments({ isPremium: true });
        const normalUsers = totalUsers - premiumUsers;
        res.json({ totalUsers, normalUsers, premiumUsers });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to fetch statistics" });
      }
    });

    // আর্টিকেল যোগ করা
    app.post("/articles", async (req, res) => {
      const article = req.body;
      console.log("Incoming article:", article);

      article.status = "pending";
      article.isPremium = false;
      article.views = 0;
      article.createdAt = new Date();

      try {
        const result = await articlesCollection.insertOne(article);
        console.log("Insert result:", result);
        res.send(result);
      } catch (err) {
        console.error("Error adding article:", err);
        res.status(500).send({ message: "Failed to add article" });
      }
    });

    // ট্রেন্ডিং আর্টিকেল
    app.get("/articles/trending", async (req, res) => {
      try {
        const trending = await articlesCollection
          .find({ status: "approved" })
          .sort({ views: -1 })
          .limit(6)
          .toArray();
        res.send(trending);
      } catch (err) {
        console.error("Trending fetch error:", err);
        res.status(500).send({ message: "Failed to fetch trending articles" });
      }
    });

    // একক আর্টিকেল দেখানো + views বাড়ানো
    app.get("/articles/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Received ID:", id);
      try {
        const result = await articlesCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $inc: { views: 1 } },
          { returnDocument: "after" }
        );
        console.log("Query Result:", result);
        res.send(result);
      } catch (err) {
        console.error("Error fetching article:", err);
        res.status(500).send({ message: "Failed to fetch article" });
      }
    });

    // এপ্রুভড + ফিল্টার + সার্চ সহ সব আর্টিকেল
    app.get("/articles", async (req, res) => {
      const { search, publisher, tags } = req.query;

      let filter = { status: "approved" };

      if (search) {
        filter.title = { $regex: search, $options: "i" };
      }
      if (publisher) {
        filter.publisher = publisher;
      }
      if (tags) {
        filter.tags = { $in: tags.split(",") };
      }

      try {
        const articles = await articlesCollection.find(filter).toArray();
        res.send(articles);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to fetch articles" });
      }
    });

    // সব আর্টিকেল (admin panel এর জন্য)
    app.get("/admin/articles", async (req, res) => {
      const articles = await articlesCollection.find().toArray();
      res.send(articles);
    });

    // আর্টিকেলকে প্রিমিয়াম বানানো
    app.patch("/articles/:id/premium", async (req, res) => {
      const id = req.params.id;
      const { isPremium } = req.body;
      const result = await articlesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { isPremium } }
      );
      res.send(result);
    });

    // আর্টিকেল এপ্রুভ করা
    app.patch("/articles/:id/approve", async (req, res) => {
      const id = req.params.id;
      const result = await articlesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "approved" } }
      );
      res.send(result);
    });

    // ================================
    // নিচে My Articles পেজের জন্য রুট যুক্ত করা হয়েছে
    // ================================

    // ইউজারের আর্টিকেল গুলো আনা
    app.get('/myarticles', async (req, res) => {
      const email = req.query.email;
      if (!email) {
        return res.status(400).send({ message: 'Email is required' });
      }
      try {
        const articles = await articlesCollection.find({ authorEmail: email }).toArray();
        res.send(articles);
      } catch (err) {
        console.error('Error fetching user articles:', err);
        res.status(500).send({ message: 'Failed to fetch articles' });
      }
    });

    // একক আর্টিকেল ডিটেইলস
    app.get('/myarticles/:id', async (req, res) => {
      const id = req.params.id;
      try {
        const article = await articlesCollection.findOne({ _id: new ObjectId(id) });
        if (!article) {
          return res.status(404).send({ message: 'Article not found' });
        }
        res.send(article);
      } catch (err) {
        console.error('Error fetching article:', err);
        res.status(500).send({ message: 'Failed to fetch article' });
      }
    });

    // আর্টিকেল আপডেট
    app.put('/myarticles/:id', async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;

      try {
        const result = await articlesCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              title: updateData.title,
              description: updateData.description,
              tags: updateData.tags,
              updatedAt: new Date()
            }
          }
        );
        res.send(result);
      } catch (err) {
        console.error('Error updating article:', err);
        res.status(500).send({ message: 'Failed to update article' });
      }
    });

// ✅ New route to match frontend
app.delete('/articles/:id', async (req, res) => {
  const id = req.params.id;
  console.log("Deleting article with ID:", id);
  try {
    const result = await articlesCollection.deleteOne({ _id: new ObjectId(id) });
    console.log("Delete result:", result);
    res.send(result);
  } catch (err) {
    console.error('Error deleting article:', err);
    res.status(500).send({ message: 'Failed to delete article' });
  }
});


  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run().catch(console.dir);

// Root route
app.get('/', (req, res) => {
  res.send("Newspaper Server is running");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
