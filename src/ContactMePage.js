import React, { useState } from 'react';
import axios from 'axios';
import './ContactMe.css'; // Import a specific CSS file for ContactMePage

const ContactMePage = () => {
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const handleSendMessage = async () => {
    try {
      await axios.post('http://localhost:3001/messages', { subject, email, content });
      console.log('Message sent successfully');
      setSubject('');
      setEmail('');
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="contact-me-page"> {/* Add a class to the root element */}
      <h2>Here Is Contact Me Page!</h2>
      <label>Subject: <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} /></label>
      <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label>Content: <textarea value={content} onChange={(e) => setContent(e.target.value)} /></label>
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default ContactMePage;