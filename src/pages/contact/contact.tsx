import React, { useState } from 'react';
import './contact.scss';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="contactBox">
      <div className="container_contacts">
        <h2>Contact Us</h2>
        <p>Please fill out the form below to get in touch with us.</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Your Phone:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Your Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="location">
        <div className="info-side">
          <h2>Call to Us</h2>
          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone: +250</p>
        </div>
        <div className="down-side">
          <h2>Write To US</h2>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>Emails: customer@shopSpree.com</p>
          <p>Emails: support@shopSpree.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
