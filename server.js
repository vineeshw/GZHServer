import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import sendEmail from './services/sendMail.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


// CORS middleware configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Allow both origins
    credentials: true, // Allow cookies and credentials if needed
  })
);

  app.use(express.json()); 

  app.post('/send-email', async(req,res, next)=>{
    try{
     // Extract the form data from the request body
     const { name, email, phone, comment } = req.body;
     const date = new Date().toLocaleString();
     // Log the data for debugging
     console.log({ name, email, phone, comment });
    
      const sendto = 'vineeshw1994@gmail.com'
     // appointment mail send to the  provider 
    const  subject = ` Contact Form GenZcodersHub ${
        name + " " + email
      } on  ${phone}  `;
    const  message = `<!DOCTYPE html>
    <html>
    <head>
    <style>
    body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { width: 100%; max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
    .header { background-color: #008080; padding: 20px; text-align: center; color: #fff; border-radius: 8px 8px 0 0; }
    .header img { max-width: 220px; background-color: white; border-radius: 8px; }
    .content { padding: 20px; }
    .footer { text-align: center; padding: 10px; font-size: 12px; color: #888; }
    h2 { color: #008080; }
    .button { display: inline-block; margin-top: 20px; padding: 12px 20px; background-color: #008080; color: #fff; text-decoration: none; border-radius: 5px; }
    .button:hover { background-color: #007373; }
    </style>
    </head>
    <body>
    <div class="container">
    <div class="header">
    <h1>Contact Form</h1>
    </div>
    
    <div class="content">
    <h2>Hello I am   ${name} 
      } ,</h2>
    <p>${comment}</p>
    <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
    <tr>
        <td style="padding: 8px; background-color: #f9f9f9;"><strong>Patient Name:</strong></td>
        <td style="padding: 8px;">${
          name
        }</td>
      </tr>
      <tr>
        <td style="padding: 8px; background-color: #f9f9f9;"><strong>Email</strong></td>
        <td style="padding: 8px;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; background-color: #f9f9f9;"><strong>Mobile</strong></td>
        <td style="padding: 8px;">${phone}</td>
      </tr>
      <tr>
        <td style="padding: 8px; background-color: #f9f9f9;"><strong>Date:</strong></td>
        <td style="padding: 8px;">${date}</td>
      </tr>
       <tr>
        <td style="padding: 8px; background-color: #f9f9f9;"><strong>Message:</strong></td>
        <td style="padding: 8px;">${comment}</td>
      </tr>
      
    </table>
    <p>Contact Form Received Successfully</p>
    </div>
    
    
    </div>
    </body>
    </html>
    `;
      await sendEmail(sendto, subject, message);
    
    return res.status(200).json({status:true, message:'Submitted Successfully'})
    }catch(error){
        console.log(error.message)
        next(new Error('Internal Server Error'))
    }
    })


// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });