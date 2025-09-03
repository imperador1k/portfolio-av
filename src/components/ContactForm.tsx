import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Mail, User, MessageSquare, Zap, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import StaggerAnimation from './StaggerAnimation';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Sending contact email with data:', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      // Enviar email para você (contact us) - APENAS UM EMAIL
      const contactResult = await emailjs.send(
        'service_o9j7m4p',
        'template_jxoz491',
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString('pt-PT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        },
        '_CETS980EBGWXuB6G'
      );

      console.log('Contact email sent successfully:', contactResult);

      // Enviar autoreply para quem enviou a mensagem
      console.log('Sending autoreply with data:', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      const autoreplyResult = await emailjs.send(
        'service_o9j7m4p',
        'template_irxvs6a',
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        '_CETS980EBGWXuB6G'
      );

      console.log('Autoreply sent successfully:', autoreplyResult);

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('EmailJS Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-nebulaPink/5 via-cosmicBlue/5 to-violet-500/5 rounded-3xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-nebulaPink/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-cosmicBlue/10 rounded-full blur-3xl"></div>
      
      {/* Main Form Container */}
      <motion.div
        className="relative bg-deepSpace/80 backdrop-blur-2xl border border-starWhite/20 rounded-3xl p-8 lg:p-12 shadow-2xl shadow-nebulaPink/10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-nebulaPink to-cosmicBlue rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-nebulaPink via-cosmicBlue to-violet-500 text-transparent bg-clip-text mb-4">
            {t('contact.subtitle')}
          </h2>
          <p className="text-starWhite/70 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('contact.description')}
          </p>
        </motion.div>

        {/* Form */}
        <StaggerAnimation staggerDelay={0.1} direction="up">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <motion.div
              className="group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-starWhite/90 mb-3 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-nebulaPink" />
                {t('contact.name')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-deepSpace/60 border border-starWhite/20 focus:border-nebulaPink/50 focus:ring-2 focus:ring-nebulaPink/20 outline-none transition-all duration-300 text-white placeholder-starWhite/40 backdrop-blur-sm group-hover:border-nebulaPink/30"
                  placeholder={t('contact.namePlaceholder')}
                  required
                  disabled={isSubmitting}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-nebulaPink/5 to-cosmicBlue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              className="group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-starWhite/90 mb-3 flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-cosmicBlue" />
                {t('contact.email')}
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-deepSpace/60 border border-starWhite/20 focus:border-cosmicBlue/50 focus:ring-2 focus:ring-cosmicBlue/20 outline-none transition-all duration-300 text-white placeholder-starWhite/40 backdrop-blur-sm group-hover:border-cosmicBlue/30"
                  placeholder={t('contact.emailPlaceholder')}
                  required
                  disabled={isSubmitting}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cosmicBlue/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Subject Field */}
            <motion.div
              className="group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label
                htmlFor="subject"
                className="block text-sm font-semibold text-starWhite/90 mb-3 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-violet-400" />
                {t('contact.subject')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-deepSpace/60 border border-starWhite/20 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/20 outline-none transition-all duration-300 text-white placeholder-starWhite/40 backdrop-blur-sm group-hover:border-violet-400/30"
                  placeholder={t('contact.subjectPlaceholder')}
                  required
                  disabled={isSubmitting}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-400/5 to-nebulaPink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Message Field */}
            <motion.div
              className="group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-starWhite/90 mb-3 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-nebulaPink" />
                {t('contact.message')}
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-6 py-4 rounded-2xl bg-deepSpace/60 border border-starWhite/20 focus:border-nebulaPink/50 focus:ring-2 focus:ring-nebulaPink/20 outline-none transition-all duration-300 text-white placeholder-starWhite/40 backdrop-blur-sm resize-none group-hover:border-nebulaPink/30"
                  placeholder={t('contact.messagePlaceholder')}
                  required
                  disabled={isSubmitting}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-nebulaPink/5 to-cosmicBlue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden bg-gradient-to-r from-nebulaPink via-cosmicBlue to-violet-500 text-white py-5 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-nebulaPink via-cosmicBlue to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Button Content */}
                <div className="relative flex items-center justify-center gap-3">
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>{t('contact.sendingMessage')}</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="send"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-3"
                      >
                        <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                        <span>{t('contact.sendMessage')}</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -top-2 -left-2 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </motion.button>
            </motion.div>
          </form>
        </StaggerAnimation>

        {/* Success Message */}
        <AnimatePresence>
          {!isSubmitting && formData.name && formData.email && formData.subject && formData.message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-green-400 text-sm">
                {t('contact.readyToSend')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid #e94560',
            borderRadius: '12px',
          },
        }}
      />
    </div>
  );
};

export default ContactForm;
