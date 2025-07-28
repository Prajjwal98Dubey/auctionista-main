# Auctionista - Online Auction Platform 🔨🔨🔨 (*still building*)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

## 🎬 Demo
[![Demo1](https://img.shields.io/badge/📹_Demo1-Watch_Now-red?style=for-the-badge&logo=youtube)](https://drive.google.com/file/d/1C1kgSOa8h69PPKxhPu4aanHD1cLxHoxE/view?usp=sharing)
[![Demo2](https://img.shields.io/badge/📹_Demo2-Watch_Now-blue?style=for-the-badge&logo=youtube)](https://drive.google.com/file/d/1DTGDrQc1_EbjqyoMJEAIRizCckz5rjTN/view?usp=sharing)

## 🎯 About

**Auctionista** is a modern, full-featured online auction platform that brings the excitement of bidding to the digital world. Built with cutting-edge web technologies, it provides a seamless, secure, and engaging auction experience for both buyers and sellers.

Whether you're looking to sell collectibles, electronics, art, or any valuable items, or you're a bidder hunting for great deals, Auctionista offers a comprehensive platform with real-time bidding, and intuitive user experience.

## ✨ Features

### 🔥 Core Auction Features
- **Real-time Bidding**: Live bidding with instant updates using WebSocket technology
- **Auction Categories**: Organized categories (Electronics, Art, Collectibles, Automobiles, etc.)
- **Smart Bidding**: Auto-bidding functionality with maximum bid limits
- **Auction Timer**: Real-time countdown with automatic auction closure
- **Reserve Price**: Set minimum selling prices for items

### 👤 User Management
- **User Registration & Authentication**: Secure signup/login with JWT tokens
- **User Profiles**: Detailed profiles with bidding history and ratings
- **Buyer Dashboard**: Track active bids, won items, and favorites
- **Watchlist**: Save interesting auctions for later

### 📱 Additional Features
- **Advanced Search**: Filter by sellers, products etc.
- **Email Notifications**: Bid alerts, auction reminders, and updates (to be implemented)
- **Image Gallery**: Multiple images per auction

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI library with hooks
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.io** - Real-time bidding
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing

### Cloud & Services
- **Firebase Storage** - Image storage
- **Redis** - Caching and session storage
- **BullMQ** - cron jobs
- **Elastic Search** - search functionality

### Project Structure
```
auctionista-main/
├── server/
│   ├── controllers/    # Route controllers
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── aucion-server/  # auction server implementation
│   ├── helpers/        # reusable methods
│   ├── queues/         # bullmq functionality for cron jobs/ producer-consumer concept
│   ├── search/         # elastic search functionality
├── client/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── helpers/    # reusable functions
│   │   ├── custom-hooks/   # custom hooks
│   │   ├── redux/      # Redux functionality
│   │   ├── firebase/   # firebase functions
│   └── public/         # Static assets
```

## 👥 Contact

- **GitHub**: [@Prajjwal98Dubey](https://github.com/Prajjwal98Dubey)
- **Email**: prajjwaldubey1998@gmail.com
