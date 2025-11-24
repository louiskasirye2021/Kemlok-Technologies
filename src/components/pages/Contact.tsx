import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [sentBy, setSentBy] = useState<'server' | 'whatsapp' | null>(null);

  const contactInfo = [
    {
      icon: Mail,
      title: 'WhatsApp',
      detail: '+256 772 661 072',
      link: 'https://wa.me/256772661072',
    },
    {
      icon: Phone,
      title: 'Phone',
      detail: '+256 754 682 325',
      link: 'tel:+256754682325',
    },
    {
      icon: MapPin,
      title: 'Location',
      detail: '4C Kimirante Road, Komamboga, Uganda',
      link: '#',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate minimal required fields
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in your name, email, and message before sending.');
      return;
    }

    // Build message body for WhatsApp or server endpoint
    const to = 'kemloktechnologies@gmail.com';
    const subjectRaw = `Website Contact: ${formData.service || 'General Inquiry'}`;
    const subject = encodeURIComponent(subjectRaw);
    const bodyLines = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.phone ? `Phone: ${formData.phone}` : null,
      `Service: ${formData.service || 'N/A'}`,
      '',
      `Message:\n${formData.message}`,
    ].filter(Boolean);
    const bodyRaw = bodyLines.join('\n');
    const body = encodeURIComponent(bodyRaw);

    // Use mailto previously; now we prefer WhatsApp chat
    const whatsappNumber = '256772661072'; // international format without +
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(bodyRaw)}`;

    // Check for a server endpoint (Vite env var VITE_FORM_ENDPOINT)
    const FORM_ENDPOINT = (import.meta as any).env?.VITE_FORM_ENDPOINT || '';

    if (FORM_ENDPOINT) {
      // Send to server (Formspree or similar) so we can reliably know success
      setSubmitStatus('sending');
      try {
        const resp = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
          }),
        });

        if (resp.ok) {
          setSentBy('server');
          setSubmitStatus('sent');
          // clear form after successful send
          setFormData({ name: '', email: '', phone: '', service: '', message: '' });
          setTimeout(() => setSubmitStatus('idle'), 8000);
          return;
        } else {
          // server returned non-OK
          setSubmitStatus('error');
          setTimeout(() => setSubmitStatus('idle'), 5000);
          return;
        }
      } catch (serverErr) {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
        return;
      }
    }

    try {
      // Attempt to copy a useful fallback to the clipboard BEFORE navigating.
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(`To: ${to}\nSubject: ${subjectRaw}\n\n${bodyRaw}`);
        } catch (copyErr) {
          // ignore clipboard errors
        }
      }

      // Use location.href for WhatsApp. Avoid window.open which can create a blank tab.
      window.location.href = waUrl;

      setSentBy('whatsapp');
      setSubmitStatus('sent');
      setTimeout(() => setSubmitStatus('idle'), 15000);
    } catch (err) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 right-10 w-60 h-60 border border-white/10 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-80 h-80 border border-white/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl mb-6 tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
              Get In Touch
            </h1>
            <div className="w-20 h-1 bg-white mx-auto mb-8" />
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto">
              Ready to start your next project? Let's make something amazing together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                className="border border-white/20 p-8 group hover:bg-white hover:text-black transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className="mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <info.icon size={32} />
                </motion.div>
                <h3 className="text-xl font-black mb-2">{info.title}</h3>
                <p className="text-white/60 group-hover:text-black/60 transition-colors">
                  {info.detail}
                </p>
              </motion.a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl mb-8 tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
                Send Us A Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus === 'sent' && sentBy === 'whatsapp' && (
                  <div className="rounded-md bg-green-800/80 border border-green-600 p-4 text-white text-sm flex items-start justify-between">
                    <div>
                      <strong className="font-black">WhatsApp chat opened.</strong>
                      <div className="mt-1">Please review the message in WhatsApp and press send. If nothing opened, paste the copied message into WhatsApp Web or your phone chat with <code className="font-mono">+256 772 661 072</code>.</div>
                    </div>
                    <button type="button" onClick={() => setSubmitStatus('idle')} className="ml-4 pl-4 text-white/80 hover:text-white">Close</button>
                  </div>
                )}
                {submitStatus === 'sent' && sentBy === 'server' && (
                  <div className="rounded-md bg-green-800/80 border border-green-600 p-4 text-white text-sm flex items-start justify-between">
                    <div>
                      <strong className="font-black">Message sent.</strong>
                      <div className="mt-1">Thanks for your message — we'll reply within 24 hours.</div>
                    </div>
                    <button type="button" onClick={() => setSubmitStatus('idle')} className="ml-4 pl-4 text-white/80 hover:text-white">Close</button>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="rounded-md bg-red-800/80 border border-red-600 p-4 text-white text-sm">
                    <strong className="font-black">Unable to open WhatsApp.</strong>
                    <div className="mt-1">Please copy the phone number and send manually: <code className="font-mono">+256 772 661 072</code>. The message content has been copied to your clipboard if available.</div>
                  </div>
                )}
                <div>
                  <label className="block mb-2 font-black tracking-wide">Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-transparent border-white/20 focus:border-white"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-black tracking-wide">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="bg-transparent border-white/20 focus:border-white"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-black tracking-wide">Phone</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+256 712 345 678"
                    className="bg-transparent border-white/20 focus:border-white"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-black tracking-wide">Service interested in</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange as any}
                    className="w-full px-4 py-3 bg-transparent border border-white/20 focus:border-white focus:outline-none"
                    required
                  >
                    <option value="" className="bg-black">Select a service</option>
                    <option value="web-systems" className="bg-black">Web & Systems</option>
                    <option value="branding" className="bg-black">Branding & Creative</option>
                    <option value="ai-content" className="bg-black">AI Content Production</option>
                    <option value="digital-marketing" className="bg-black">Digital Marketing</option>
                    <option value="it-consultation" className="bg-black">IT Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-black tracking-wide">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    required
                    className="bg-transparent border-white/20 focus:border-white resize-none"
                  />
                </div>

                <div className="flex">
                  <div className="w-full md:w-auto md:ml-auto">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitStatus === 'sending'}
                      className="w-full md:w-auto bg-white text-black hover:bg-white/90 font-black tracking-wide py-4 px-8 flex items-center justify-center"
                      aria-label="Send message to Kemlok Technologies"
                    >
                      <span>{submitStatus === 'sending' ? 'Sending...' : 'Send Message'}</span>
                      <Send className="ml-2" size={20} />
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>

            {/* Info Side */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl mb-6 tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
                  Why Work With Us?
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Fast Response Time',
                      description: 'We typically respond within 24 hours to all inquiries.',
                    },
                    {
                      title: 'Flexible Solutions',
                      description: 'Custom packages tailored to your specific needs and budget.',
                    },
                    {
                      title: 'Expert Team',
                      description: 'Seasoned professionals ready to bring your vision to life.',
                    },
                    {
                      title: 'Proven Track Record',
                      description: '500+ successful projects delivered to satisfied clients.',
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="border-l-2 border-white/20 pl-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="font-black mb-2">{item.title}</h3>
                      <p className="text-white/60">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative Element */}
              <motion.div
                className="border border-white/10 p-8 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 border border-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-2xl font-black mb-4">Contact Us</h3>
                <div className="space-y-3 text-white/70">
                  <p>
                    <span className="font-black text-white">Phone:</span><br />
                    +256 754 682 325<br />
                    +256 772 661 072
                  </p>
                  <p>
                    <span className="font-black text-white">Email:</span><br />
                    kemloktechnologies@gmail.com
                  </p>
                  <p>
                    <span className="font-black text-white">Address:</span><br />
                    4C Kimirante Road<br />
                    Komamboga, Uganda
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
              Visit Our Office
            </h2>
            <p className="text-black/60 text-lg">
              Located in Komamboga, Uganda
            </p>
          </motion.div>

          <motion.div
            className="border-2 border-black/10 h-96 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
              <div className="text-center">
                <MapPin size={48} className="mx-auto mb-4" />
                <p className="font-black">4C Kimirante Road</p>
                <p className="text-black/60">Komamboga, Uganda</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}