export const registerTemplate = ({ username }) => {
  return `
  <html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              text-align: center;
              padding: 20px;
          }
          .container {
              max-width: 600px;
              background: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              margin: auto;
          }
          .header {
              background: #2c3e50;
              color: white;
              padding: 15px;
              border-radius: 10px 10px 0 0;
              font-size: 24px;
              font-weight: bold;
          }
          .content {
              padding: 20px;
              font-size: 18px;
              color: #333;
          }
          .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #555;
          }
          .button {
              background: #3498db;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              font-size: 18px;
              border-radius: 5px;
              display: inline-block;
              margin-top: 20px;
          }
          .button:hover {
              background: #2980b9;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Welcome to DormEase!</div>
          <div class="content">
              <p>Hi <strong>${username}</strong>,</p>
              <p>Finding a perfect place to stay just got easier! DormEase helps students connect, find PGs, and coordinate with roommates effortlessly.</p>
              <p>Start exploring now and make your college stay stress-free!</p>
              <a class="button" href="https://dormease.onrender.com">Get Started</a>
          </div>
          <div class="footer">For any queries, contact us at dormeaseofficial@gmail.com</div>
      </div>
  </body>
  </html>`;
};
