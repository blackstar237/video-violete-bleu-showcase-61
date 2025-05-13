
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      
      <main className="bg-theme-dark min-h-screen pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Page Title */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-gradient">Contactez</span> notre équipe
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Vous avez un projet en tête ou une question sur nos services ? N'hésitez pas à nous contacter. Nous serons ravis de vous aider.
            </p>
          </div>
          
          {/* Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-card p-6 md:p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h2>
              <ContactForm />
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Informations de contact</h2>
              
              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-lg flex">
                  <div className="mr-4">
                    <div className="h-12 w-12 bg-gradient-violet-blue rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Adresse</h3>
                    <p className="text-white/70">
                      Bafoussam, Cameroun
                    </p>
                  </div>
                </div>
                
                <div className="glass-card p-6 rounded-lg flex">
                  <div className="mr-4">
                    <div className="h-12 w-12 bg-gradient-violet-blue rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                    <p className="text-white/70">
                      <a href="mailto:vidéos@digit-service.org" className="hover:text-primary transition-colors">
                        vidéos@digit-service.org
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="glass-card p-6 rounded-lg flex">
                  <div className="mr-4">
                    <div className="h-12 w-12 bg-gradient-violet-blue rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">WhatsApp</h3>
                    <p className="text-white/70">
                      <a href="https://wa.me/237695666275" className="hover:text-primary transition-colors">
                        +237 6 95 66 62 75
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="glass-card p-6 rounded-lg flex">
                  <div className="mr-4">
                    <div className="h-12 w-12 bg-gradient-violet-blue rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Heures d'ouverture</h3>
                    <p className="text-white/70">
                      Lundi - Samedi: 9h00 - 18h00<br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                    <a 
                      key={social}
                      href={`https://${social}.com`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary transition-colors"
                    >
                      <img 
                        src={`https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/${social}.svg`}
                        alt={`${social} icon`} 
                        className="h-5 w-5 text-white invert"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-16">
            <div className="glass-card p-1 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63724.39399577603!2d10.37841985!3d5.47851805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105f981aaab9e2a1%3A0xdd5f5a518a4aeffa!2sBafoussam%2C%20Cameroon!5e0!3m2!1sen!2sus!4v1684566819098!5m2!1sen!2sus"
                width="100%" 
                height="400" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy">
              </iframe>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ContactPage;
