# 💬 Discord-Style Messaging App – Socket.IO Chat Tutorial

This guide explains how to implement **private direct messaging** using Socket.IO in a full-stack application built with **Angular**, **Express.js**, **MongoDB**, and **Passport.js**. Follow these steps in order to set up real-time messaging.

---

## 📦 Step 1 – Install Dependencies

1. Open a terminal in your server folder
2. Run `npm install socket.io`
3. Open a terminal in your Angular client folder
4. Run `npm install socket.io-client`

---

## 🛠️ Step 2 – Set Up Socket.IO on the Server

1. In your `app.js` file, import the necessary modules for `http`, `socket.io`, and your Message model
2. Replace your `app.listen(...)` call with code that creates an HTTP server and connects Socket.IO to it
3. Inside your `io.on("connection")` block:
   - Listen for a `register-user` event and store users in memory
   - Listen for `private-message` events and save the message using your message model
   - Emit the message to the correct recipient if they are online
   - Handle `disconnect` events to remove users from memory

---

## 🌐 Step 3 – Create Socket Service in Angular

1. In the `src/app` folder, create a new file called `socket.service.ts`
2. Inside this service:
   - Connect to the server using `io(...)`
   - Emit a `register-user` event after login using the user’s name and ID
   - Add functions to emit and listen to events

---

## 💬 Step 4 – Add Chat UI

1. In your component’s HTML (e.g. `profile.component.html`):
   - Add a loop to display all messages
   - Add a text input for the user to type a message
   - Add a button to send messages

---

## 🧠 Step 5 – Handle Events in Component

1. In your component’s `.ts` file:
   - On initialization, listen for `private-message` events using your socket service
   - Create a function to send private messages, which emits to the server and adds the message to the chat locally

---

## 💾 Step 6 – Set Up Message Model

1. Open or create `server/models/messagesModel.js`
2. Define a schema with fields: `senderId`, `recipientId`, `text`, and `timestamp`
3. Export the model using `mongoose.model(...)`

---

## 👤 Step 7 – Review User Model

1. Open `server/models/usersModel.js`
2. Confirm it includes:
   - A `username` field
   - A `discriminator` field (4-digit number added to username)
   - Arrays for `friendsList` and `friendRequests`
3. Ensure there’s an index making `username + discriminator` unique

---

## 💬 Step 8 – Review Message Model

1. Confirm that `messagesModel.js` references user IDs for sender and recipient
2. Check that it includes fields for `text` and `timestamp`

---

## 🧪 Step 9 – Test Your Messaging

1. Run your server: `npm start`
2. Run your client: `ng serve`
3. Open two browser tabs and log in as two users
4. Start a private chat and send a message
5. Confirm the message:
   - Shows up on the chat screen
   - Logs on the server (optional)
   - Saves in MongoDB

---

## 📚 Bonus Resources

- Socket.IO Docs: https://socket.io/docs/v4/
- Fireship Socket.IO Intro: https://www.youtube.com/watch?v=1BfCnjr_Vjg
- Traversy Media Chat App Tutorial: https://www.youtube.com/watch?v=ZKEqqIO7n-k

---

## ✅ You’re Done!

Your app now supports real-time private messaging using Angular, Express, MongoDB, Passport, Bcrypt.js, Cors and Socket.IO. 🎉
