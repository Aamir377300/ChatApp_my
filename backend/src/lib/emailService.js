// import nodemailer from 'nodemailer';


// import {Resend} from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

// export const sendOTPEmail = async(email,otp) =>{
//   try{
//     const {data,error} = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: email,
//       subject: 'Your Email Verification Code',
//       html: `
//         <h2>Verify Your Email</h2>
//         <p>Your OTP is: <strong>${otp}</strong></p>
//         <p>This code expires in 10 minutes.</p>
//       `,
//     })
//   }
//   catch(error){
//     console.log(error);
//   }
  
// }

// 




import nodemailer from 'nodemailer';

// --- Transporter Setup ---
// We only create one transporter instance and reuse it.
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    console.log("Creating new email transporter...");
    transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 465, // Using port 465 for a direct SSL connection
      secure: true, // `true` for port 465
      auth: {
        user: process.env.SMTP_USER, // Your Brevo account email
        pass: process.env.SMTP_PASS, // Your Brevo SMTP Key
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
  }
  return transporter;
};

// --- Email Sending Function ---
export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"Chatty" <${process.env.SENDER_EMAIL}>`, // Sender address (must be verified in Brevo)
    to: email, // Recipient
    subject: 'Your Email Verification Code',
    html: `
      <h2>Verify Your Email</h2>
      <p>Your OTP is: <strong>${otp}</strong></p>
      <p>This code expires in 10 minutes.</p>
    `,
  };

  try {
    const transport = getTransporter();
    
    // --- DEBUGGING ---
    console.log("Attempting to send email via SMTP...");
    console.log("From:", process.env.SENDER_EMAIL);
    console.log("To:", email);
    console.log("SMTP User:", process.env.SMTP_USER);
    console.log("SMTP Pass Exists:", !!process.env.SMTP_PASS);
    // --- END DEBUGGING ---

    await transport.sendMail(mailOptions);
    console.log("Email sent successfully via SMTP!");
  } catch (error) {
    // This will log the REAL error to your Render logs
    console.error("Failed to send email via SMTP:", error);
    throw new Error("Email could not be sent.");
  }
};
