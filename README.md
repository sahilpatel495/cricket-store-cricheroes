# CrickEase - Cricket Store

Welcome to CrickEase, a Next.js-based e-commerce application designed for cricket enthusiasts. This application allows users to browse, filter, and purchase cricket equipment seamlessly.

## Table of Contents
- [Getting Started](#getting-started)
- [Features](#features)
- [Functionality](#functionality)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Getting Started
To get started with the project, follow these steps:

Clone the repository:
```bash
git clone https://github.com/yourusername/sahilpatel495-cricket-store-cricheroes.git
cd sahilpatel495-cricket-store-cricheroes

Install the dependencies:
npm install
# or
yarn install
# or
pnpm install

Run the development server:
npm run dev
# or
yarn dev
# or
pnpm dev

Open your browser and navigate to http://localhost:3000 to see the application in action.

Features
User Authentication: Users can register, log in, and manage their accounts.
Product Browsing: Users can view a wide range of cricket products with detailed descriptions.
Search and Filter: Users can search for products and filter them by category, price range, and more.
Shopping Cart: Users can add products to their cart, update quantities, and remove items.
Checkout Process: A multi-step checkout process that includes shipping address and payment method selection.
Order Management: Users can view their past orders and order details.
Functionality
User Registration and Login
Users can create an account and log in to access personalized features.
Passwords are securely handled, and users can log out.
Product Listing
Products are fetched from a JSON file and displayed in a grid format.
Each product has a detailed view with images, descriptions, prices, and ratings.
Filters and Sorting
Users can filter products by category, price, and search queries.
Products can be sorted alphabetically or by price.
Shopping Cart
Users can add products to their cart with selected options (size, color).
The cart displays the total price and allows for quantity adjustments.
Checkout Process
Users can proceed to checkout, enter shipping details, and select a payment method.
Order confirmation is provided upon successful placement.
Responsive Design
The application is designed to be responsive, providing a seamless experience on both desktop and mobile devices.
Technologies Used
Frontend: Next.js, React, Tailwind CSS
State Management: Context API
Routing: Next.js Routing
API Calls: Axios for fetching product data
Styling: Tailwind CSS for utility-first styling
Icons: Lucide React for icons
Deployment
The easiest way to deploy your Next.js app is to use the Vercel Platform. Follow the deployment documentation for detailed steps. ```