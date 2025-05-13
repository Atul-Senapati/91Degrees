'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Headerhome from '@/components/header-home';

const ContactPage = () => {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, message } = formData;

    const newErrors: typeof errors = {};
    if (!email || !email.includes('@')) newErrors.email = 'Valid email is required';
    if (!message || message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className='min-h-screen justify-center bg-pink-50 dark:bg-pink-900/20'>
        <Headerhome/>
    <div className="max-w-xl  h-fit mx-auto mt-10 px-4 py-10 bg-white dark:bg-black rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      {submitted ? (
        <p className="text-green-600">✅ Thank you! Your message has been submitted.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'border-red-500' : ''}
            />
            {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
          </div>

          <Button type="submit">Send Message</Button>
        </form>
      )}
    </div>
    </div>
  );
};

export default ContactPage;
