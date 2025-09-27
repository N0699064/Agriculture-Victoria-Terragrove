import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_USER || 'noreply@victoriaterragrove.com',
        pass: process.env.SMTP_PASS || 'your-app-password',
      },
    })

    // Email to jeff4conrad@hotmail.com
    const contactMailOptions = {
      from: process.env.SMTP_USER || 'noreply@victoriaterragrove.com',
      to: 'jeff4conrad@hotmail.com',
      subject: `Contact Form: ${subject} - Victoria Terragrove`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb;">
          <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 40px 30px; text-align: center;">
            <div style="background: rgba(255, 255, 255, 0.1); width: 60px; height: 60px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <span style="color: white; font-size: 24px;">📧</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Victoria Terragrove</h1>
            <h2 style="color: #d1fae5; margin: 10px 0 0 0; font-size: 18px; font-weight: 500;">New Contact Form Submission</h2>
          </div>
          
          <div style="background: white; padding: 40px 30px;">
            <h3 style="color: #059669; margin-top: 0; font-size: 20px; font-weight: 600;">Contact Details</h3>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #059669;">
              <p style="margin: 0 0 10px 0; color: #374151; font-size: 16px;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0; color: #374151; font-size: 16px;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 0 0 10px 0; color: #374151; font-size: 16px;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 0; color: #374151; font-size: 16px;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <h4 style="color: #059669; font-size: 18px; font-weight: 600; margin: 20px 0 10px 0;">Message:</h4>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6; margin-top: 20px;">
              <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 500;">
                <strong>Action Required:</strong> Please respond to this inquiry via email at ${email}
              </p>
            </div>
          </div>
        </div>
      `,
    }

    // Auto-reply to the sender
    const autoReplyOptions = {
      from: process.env.SMTP_USER || 'noreply@victoriaterragrove.com',
      to: email,
      subject: 'Thank you for contacting Victoria Terragrove',
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb;">
          <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 40px 30px; text-align: center;">
            <div style="background: rgba(255, 255, 255, 0.1); width: 60px; height: 60px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <span style="color: white; font-size: 24px;">🌱</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Thank you for reaching out!</h1>
            <p style="color: #d1fae5; margin: 15px 0 0 0; font-size: 16px;">We appreciate your interest in Victoria Terragrove</p>
          </div>
          
          <div style="background: white; padding: 40px 30px;">
            <h2 style="color: #059669; margin-top: 0; font-size: 24px; font-weight: 600;">Message Received</h2>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Hello ${name},
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for contacting Victoria Terragrove. We have received your message regarding "${subject}" and will get back to you within 24-48 hours.
            </p>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #059669;">
              <p style="margin: 0; color: #059669; font-size: 16px; font-weight: 600;">Your Message Summary:</p>
              <p style="margin: 10px 0 0 0; color: #374151; font-size: 14px; line-height: 1.5;">${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              In the meantime, feel free to explore our agricultural investment opportunities and stay updated with the latest news from Nigeria's agriculture sector.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://victoriaterragrove.com" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">Visit Our Website</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0; line-height: 1.5;">
              This is an automated response. Please do not reply to this email. For urgent inquiries, please contact us directly.
            </p>
          </div>
        </div>
      `,
    }

    try {
      // Check if email is configured
      if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your-email@gmail.com') {
        // Email not configured, but still log the message
        console.log('Contact form submission received (email not configured):')
        console.log('Name:', name)
        console.log('Email:', email)
        console.log('Subject:', subject)
        console.log('Message:', message)
        
        return NextResponse.json({ 
          message: 'Message received successfully! We will get back to you soon.',
          note: 'Email configuration pending - message logged'
        })
      }

      // Send both emails
      await Promise.all([
        transporter.sendMail(contactMailOptions),
        transporter.sendMail(autoReplyOptions)
      ])
      
      return NextResponse.json({ 
        message: 'Message sent successfully! We will get back to you within 24-48 hours.'
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      
      // Log the message even if email fails
      console.log('Contact form submission logged (email failed):')
      console.log('Name:', name, 'Email:', email, 'Subject:', subject)
      
      return NextResponse.json({ 
        message: 'Message received successfully! We will get back to you soon.',
        note: 'Message recorded - email delivery pending'
      })
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again later.' },
      { status: 500 }
    )
  }
}