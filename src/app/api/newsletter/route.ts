import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Create transporter (using Gmail as an example - you can configure for your preferred service)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_USER || 'your-email@gmail.com',
        pass: process.env.SMTP_PASS || 'your-app-password',
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@victoriaterragrove.com',
      to: 'jeff4conrad@hotmail.com',
      subject: 'New Newsletter Subscription - Victoria Terragrove',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #059669, #047857); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Victoria Terragrove</h1>
            <h2 style="color: #ecfccb; margin: 10px 0 0 0; font-size: 18px;">New Newsletter Subscription</h2>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h3 style="color: #059669; margin-top: 0;">New Subscriber Details</h3>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #374151;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0 0 0; color: #374151;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background: #ecfccb; padding: 15px; border-radius: 8px; border-left: 4px solid #059669;">
              <p style="margin: 0; color: #365314; font-size: 14px;">
                <strong>Action Required:</strong> Consider adding this subscriber to your email marketing platform or CRM system.
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #6b7280; font-size: 12px; text-align: center; margin: 0;">
              This notification was sent from the Victoria Terragrove website newsletter subscription form.
            </p>
          </div>
        </div>
      `,
      text: `
        Victoria Terragrove - New Newsletter Subscription
        
        New Subscriber Details:
        Email: ${email}
        Date: ${new Date().toLocaleString()}
        
        Action Required: Consider adding this subscriber to your email marketing platform.
      `,
    };

    // Send welcome email to subscriber
    const welcomeMailOptions = {
      from: process.env.SMTP_USER || 'noreply@victoriaterragrove.com',
      to: email,
      subject: 'Welcome to Victoria Terragrove Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #059669, #047857); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
            <div style="background: rgba(255, 255, 255, 0.1); width: 60px; height: 60px; border-radius: 15px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <span style="color: white; font-size: 24px;">🌱</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Victoria Terragrove!</h1>
            <p style="color: #ecfccb; margin: 15px 0 0 0; font-size: 16px;">Thank you for joining our agricultural investment community</p>
          </div>
          
          <div style="background: #ffffff; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #059669; margin-top: 0; font-size: 24px;">What to Expect</h2>
            
            <div style="margin: 30px 0;">
              <div style="display: flex; align-items: start; margin-bottom: 20px;">
                <div style="background: #ecfccb; width: 40px; height: 40px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">
                  <span style="color: #059669; font-size: 18px;">📊</span>
                </div>
                <div>
                  <h3 style="color: #374151; margin: 0 0 5px 0; font-size: 16px;">Weekly Market Updates</h3>
                  <p style="color: #6b7280; margin: 0; font-size: 14px;">Stay informed with the latest agricultural market trends and insights.</p>
                </div>
              </div>
              
              <div style="display: flex; align-items: start; margin-bottom: 20px;">
                <div style="background: #ecfccb; width: 40px; height: 40px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">
                  <span style="color: #059669; font-size: 18px;">🎯</span>
                </div>
                <div>
                  <h3 style="color: #374151; margin: 0 0 5px 0; font-size: 16px;">Exclusive Investment Opportunities</h3>
                  <p style="color: #6b7280; margin: 0; font-size: 14px;">Get early access to our premium agricultural investment projects.</p>
                </div>
              </div>
              
              <div style="display: flex; align-items: start;">
                <div style="background: #ecfccb; width: 40px; height: 40px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">
                  <span style="color: #059669; font-size: 18px;">💡</span>
                </div>
                <div>
                  <h3 style="color: #374151; margin: 0 0 5px 0; font-size: 16px;">Expert Industry Insights</h3>
                  <p style="color: #6b7280; margin: 0; font-size: 14px;">Learn from our team's extensive experience in African agriculture.</p>
                </div>
              </div>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
              <h3 style="color: #059669; margin: 0 0 10px 0;">Ready to Start Your Journey?</h3>
              <p style="color: #6b7280; margin: 0 0 20px 0;">Explore our current investment opportunities and see how you can grow your wealth while making a positive impact.</p>
              <a href="#" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">View Opportunities</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #6b7280; font-size: 12px; text-align: center; margin: 0;">
              You're receiving this email because you subscribed to the Victoria Terragrove newsletter. 
              If you no longer wish to receive these emails, you can unsubscribe at any time.
            </p>
          </div>
        </div>
      `,
    };

    try {
      // Send notification to admin
      await transporter.sendMail(mailOptions);
      
      // Send welcome email to subscriber
      await transporter.sendMail(welcomeMailOptions);
      
      return NextResponse.json({ 
        message: 'Successfully subscribed to newsletter' 
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      
      // Still return success to user, but log the error
      // In production, you might want to save to database even if email fails
      return NextResponse.json({ 
        message: 'Successfully subscribed to newsletter' 
      });
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}