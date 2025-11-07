import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://vernanbackend.ezlab.in/api/contact-us/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setErrors({});
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      } else {
        setErrors({ submit: 'Failed to submit form. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-v">V</span>
          <span className="logo-text">Films</span>
        </div>
        <button className="menu-toggle" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Main Content */}
      <main className="main-wrapper">
        <div className="content-grid">
          {/* Left Content Section */}
          <section className="left-content">
            <div className="mandala-decoration top-left"></div>
            
            <div className="text-block">
              <p className="description">
                Whether you have an idea, a question, or simply want to explore how V can work together, V're just a message away.
              </p>
              <p className="description">
                Let's catch up over coffee.
              </p>
              <p className="tagline">
                Great stories always begin with a good conversation
              </p>
            </div>

            <div className="mandala-decoration bottom-left"></div>
          </section>

          {/* Right Form Section */}
          <section className="right-content">
            <div className="mandala-decoration top-right"></div>
            
            <div className="form-wrapper">
              <div className="form-header">
                <h1 className="form-title">Join the Story</h1>
                <p className="form-subtitle">Ready to bring your vision to life? Let's talk.</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {submitSuccess && (
                  <div className="alert alert-success">
                    Form Submitted
                  </div>
                )}

                {errors.submit && (
                  <div className="alert alert-error">
                    {errors.submit}
                  </div>
                )}

                <div className="form-field">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Your name*"
                    aria-label="Your name"
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-field">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Your email*"
                    aria-label="Your email"
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-field">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="Phone"
                    aria-label="Phone number"
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-field">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="Your message*"
                    rows="4"
                    aria-label="Your message"
                  />
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>

              {/* Contact Information */}
              <div className="contact-info">
                <a href="mailto:vernita@varnanfilms.co.in" className="contact-link">
                  vernita@varnanfilms.co.in
                </a>
                <span className="divider">|</span>
                <a href="tel:+919873684567" className="contact-link">
                  +91 98736 84567
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ContactForm;
