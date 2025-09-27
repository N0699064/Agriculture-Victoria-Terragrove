import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_USER || 'noreply@victoriaterragrove.com',
        pass: process.env.SMTP_PASS || 'your-app-password',
      },
    })

    // Email to admin (jeff4conrad@hotmail.com)
    const adminMailOptions = {
      from: process.env.SMTP_USER || 'noreply@victoriaterragrove.com',
      to: 'jeff4conrad@hotmail.com',
      subject: 'New Newsletter Subscription - Victoria Terragrove',
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb;">
          <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 40px 30px; text-align: center;">
            <div style="background: rgba(255, 255, 255, 0.1); width: 60px; height: 60px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <span style="color: white; font-size: 24px;">🌱</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Victoria Terragrove</h1>
            <h2 style="color: #d1fae5; margin: 10px 0 0 0; font-size: 18px; font-weight: 500;">New Newsletter Subscription</h2>
          </div>
          
          <div style="background: white; padding: 40px 30px;">
            <h3 style="color: #059669; margin-top: 0; font-size: 20px; font-weight: 600;">New Subscriber Details</h3>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #059669;">
              <p style="margin: 0; color: #374151; font-size: 16px;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0 0 0; color: #374151; font-size: 16px;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 500;">
                <strong>Action Required:</strong> Consider adding this subscriber to your email marketing platform or CRM system.
              </p>
            </div>
          </div>
        </div>
      `,
    }

    // Welcome email to subscriber
    const welcomeMailOptions = {
      from: process.env.SMTP_USER || 'noreply@victoriaterragrove.com',
      to: email,
      subject: 'Welcome to Victoria Terragrove Newsletter! 🌱',
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb;">
          <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 40px 30px; text-align: center;">
            <div style="background: rgba(255, 255, 255, 0.1); width: 60px; height: 60px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <span style="color: white; font-size: 24px;">🌱</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Welcome to Victoria Terragrove!</h1>
            <p style="color: #d1fae5; margin: 15px 0 0 0; font-size: 16px;">Thank you for joining our agricultural investment community</p>
          </div>
          
          <div style="background: white; padding: 40px 30px;">
            <h2 style="color: #059669; margin-top: 0; font-size: 24px; font-weight: 600;">What to Expect</h2>
            
            <div style="margin: 30px 0;">
              <div style="margin-bottom: 24px; display: flex; align-items: flex-start;">
                <div style="background: #f0fdf4; width: 48px; height: 48px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                  <span style="color: #059669; font-size: 20px;">📊</span>
                </div>
                <div>
                  <h3 style="color: #374151; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Weekly Market Updates</h3>
                  <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">Stay informed with the latest agricultural market trends and insights from across Africa.</p>
                </div>
              </div>
              
              <div style="margin-bottom: 24px; display: flex; align-items: flex-start;">
                <div style="background: #f0fdf4; width: 48px; height: 48px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                  <span style="color: #059669; font-size: 20px;">🎯</span>
                </div>
                <div>
                  <h3 style="color: #374151; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Exclusive Investment Opportunities</h3>
                  <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">Get early access to our premium agricultural investment projects with exceptional returns.</p>
                </div>
              </div>
              
              <div style="display: flex; align-items: flex-start;">
                <div style="background: #f0fdf4; width: 48px; height: 48px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                  <span style="color: #059669; font-size: 20px;">💡</span>
                </div>
                <div>
                  <h3 style="color: #374151; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Expert Industry Insights</h3>
                  <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">Learn from our team's extensive experience in African agriculture and sustainable farming.</p>
                </div>
              </div>
            </div>
            
            <div style="background: #f0fdf4; padding: 24px; border-radius: 12px; text-align: center; margin: 30px 0;">
              <h3 style="color: #059669; margin: 0 0 12px 0; font-size: 20px; font-weight: 600;">Ready to Start Your Journey?</h3>
              <p style="color: #6b7280; margin: 0 0 20px 0; font-size: 16px;">Explore our current investment opportunities and see how you can grow your wealth while making a positive impact.</p>
              <a href="https://victoriaterragrove.com" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">View Opportunities</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0; line-height: 1.5;">
              You're receiving this email because you subscribed to the Victoria Terragrove newsletter. 
              If you no longer wish to receive these emails, you can unsubscribe at any time.
            </p>
          </div>
        </div>
      `,
    }

    try {
      // Send both emails
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(welcomeMailOptions)
      ])
      
      return NextResponse.json({ 
        message: 'Successfully subscribed to newsletter' 
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      
      // Still return success to user even if email fails
      return NextResponse.json({ 
        message: 'Successfully subscribed to newsletter' 
      })
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
}