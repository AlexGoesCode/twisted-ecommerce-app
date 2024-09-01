# **Project Name**

- BOBBLEHEADS - Twisted E-commerce

---

## **Overview**

- BOBBLEHEADS is a _full-stack web application_ developed during the last part of a 5 months long coding bootcamp at CODE ACADEMY BERLIN.
- The project showcase some skills and technologies learned throughout the bootcamp, including frontend, backend, and database management.
- It was built with MERN stack, front-end: TS, back-end: JS.

---

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Tools and Libraries](#tools-and-libraries)
  - [Color Palette](#color-palette)
  - [AI Tools](#ai-tools)
- [Learning Outcomes](#learning-outcomes)
- [Possible Future Enhancements](#possible-future-enhancements)
- [Contact](#contact)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## **Technologies Used**

### **Frontend**

- **React**: A JavaScript library for building user interfaces.
- **JavaScript**: A programming language that adds interactivity to your website.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Vite**: Fast development tool for building modern web applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Router DOM**: Enables dynamic routing in a React application.

### **Backend**

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js to build web applications and APIs.
- **MongoDB**: NoSQL database for storing and managing data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (jsonwebtoken)**: Used for securing routes and managing authentication.
- **Bcrypt**: Library to hash passwords for security.
- **Multer**: Middleware for handling file uploads.
- **Cloudinary**: Cloud service for managing and serving media assets.

### **Tools and Libraries**

- **Nodemon**: Automatically restarts the server on changes.
- **ESLint**: Linting tool to maintain code quality.
- **PostCSS**: Tool to transform CSS with JavaScript plugins.
- **dotenv**: Module to load environment variables from a `.env` file.

### **Color Palette:**

**Rodeo Dust (grey-beige) -** #CCB69D
**Mirage (dark grey) -** #1C2434
**Mexican Red -** #A12529
**Tuscany (orange-beige) -** #CE633B

### **AI Tools:**

- **PIXLR**: For creating product images.

---

## **Learning Outcomes**

- Through this project, I havelearned and demonstrated:

- **Full-Stack Development**: Building a complete application from scratch, involving both front-end and back-end.
- **API Development**: Designing and implementing RESTful APIs using Express and Node.js.
- **Authentication**: Implementing secure authentication mechanisms with JSON Web Tokens.
- **Database Management**: Using MongoDB and Mongoose for data modeling and management.
- **Responsive Design**: Creating a responsive user interface with Tailwind CSS.

---

## **Possible Future Enhancements**

- **Feature 1**: RESPONSIVNESS improvement (for mobile)
- **Feature 1**: LIKES functionality
- **Feature 2**: COMMENTS section
- **Feature 3**: STYLING
- **Feature 4**: DEPLOYMENT

---

## **Contact**

For any questions or feedback, feel free to reach out on GitHub or:

- **Email**: v.kyslik@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/vaclav-kyslik/

---

## **Installation**

### Prerequisites

- Node.js
- npm or yarn

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/AlexGoesCode/twisted-ecommerce-app.git

   ```

2. Navigate to the project directory:

   ```sh
   cd twisted-ecommerce-app

   ```

3. Install all dependencies in the package.json file simply by:

   ```sh
   npm install

   ```

4. Set up environment variables:

   - Create a .env file in the root directory and add the necessary environment variables.

   - Copy the following content into your `.env` file:

   ```sh
   # MongoDB connection string
   MONGO_DB=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority&appName=<app-name>

   # Cloudinary configuration
   CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUD_API_KEY=<your-cloudinary-api-key>
   CLOUD_SECRET=<your-cloudinary-api-secret>

   # JWT Secret for authentication
   JWT_SECRET=<your-jwt-secret>
   ```

5. Replace the placeholder values (
   `<username>`,
   `<password>`,
   `<cluster-url>`,
   `<database>`,
   `<app-name>`,
   `<your-cloudinary-cloud-name>`,
   `<your-cloudinary-api-key>`,
   `<your-cloudinary-api-secret>`,
   `<your-jwt-secret>`)
   with your actual credentials.

### Example:

-      ```sh

  MONGO_DB=mongodb+srv://johndoe:<your-password>@cluster0.5rltoox.mongodb.net/twisted-ecommerce?retryWrites=true&w=majority&appName=cluster0
  CLOUD_NAME=<your-cloud-name> // cloudinary name, usually like 'sdlfhusof'
  CLOUD_API_KEY=<your-api-key> // cloudinary API key, usually like '4235466856534365'
  CLOUD_SECRET=<your-cloud-secret> // cloudinary secret, usually like 'DD5gxHYUdf45fdFdg'
  JWT_SECRET=<your-jwt-secret> // follow the manual below

  ```

  ```

6. ### Generating a Secure `JWT_SECRET`:

- To generate a strong and secure `JWT_SECRET`, follow these steps:
- a. Visit [JWT.io](https://jwt.io/).
- b. Scroll down to the "Debugger" section.
- c. In the "VERIFY SIGNATURE" area, you'll see an option for "Secret."
- d. Click on the "Create your secure key" link or generate a secure key using the following tools:
  - **Using the JWT.io Secret Key Generator:**
    You can use the key generator provided by JWT.io by clicking the "Generate" button,
    which will provide a strong, random key that you can copy and use as your `JWT_SECRET`.

7. Copy the generated secure key and paste it as the value for `JWT_SECRET` in your `.env` file.

---

## **Usage**

## Running the Project

- ```sh
  npm start
  ```

## Detailed Walkthrough:

1. - click on the round user icon in the upper right corner, click register (otherwise it wouldn't let you use products page).
2. - register with email, username and password ( uploading image is optional).
3. - login with email and password.
4. - check the available pages: Home | Items | About US | My Account
5. - in Items page, scroll through the available products, click on their image to see Single Item page with their description. Enjoy! Then hit back button.
   - Add some items into a Cart (click several times if you want more of a certain product).
6. - you can also search products by name or by country in the searchbar.
   - by country: You can try USA or even shorter 'US' to see americans, then try other nationalities.
   - by name: try Joe or partially Jo or J to see Joe Biden, then try others.
7. - click on the cart icon with a badge which is showing number or product types you have added (not how many in total)
8. - In the Cart page, you can increment/decrement or delete each product type you have added there, scroll for total overview
9. - when you're happy, continue and hit 'Go to Checkout'
10. - In Checkout, you see the overview with total price. you can go back to adjust items. If happy, fill in the address, pick payment method and place order.
11. - enjoy the modal telling you successful order.
12. - go to My Account and check your 'Orders History' where you can see your orders and it's details with an ID, time stamp and total price.
13. - click 'Show Details' to see order details.

- Thank you for going through my app, hopefully it was worth it! ^^

---

## **API Documentation**
