exports.contactUsEmail =(email,firstname,lastname,message,phoneNo)=>{
    return `
    <!DOCTYPE html>
    <html>    
    <head>
        <meta charset="UTF-8">
        <title>Contact Form Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
                background-color: #333333;
                color: aliceblue;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
    
            .logo {
                max-width: 200px;
            }
    
            .message {
                font-size: 21px;
                font-weight: bold;
                margin-bottom: 20px;
                color: rgb(31, 227, 87);
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
                color: #ef4444;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="#"><img class="logo"
                    src="StudyNotion Logo Design.png" alt="StudyNotion Logo"></a>
            <div class="message">Contact Form Confirmation</div>
            <div class="body">
                <p>Dear <span class="highlight">${firstname} ${lastname}</span>,</p>
                <p>Thank you for contacting us. We have received your message and will respond to you as soon as possible.
                </p>
                <p>Here are the details you provided:</p>
                <p>Name: <span class="highlight">${firstname} ${lastname}</span></p>
                <p>Email: <span class="highlight">${email}</span></p>
                <p>Phone Number: <span class="highlight">${phoneNo}</span></p>
                <p>Message: <span class="highlight">${message}</span></p>
                <p>We appreciate your interest and will get back to you shortly. </p>
            </div>
            <div class="support">If you have any further questions or need immediate assistance, please feel free to reach
                out to us at <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
        </div>
    </body>
    
    </html>
    `;
}