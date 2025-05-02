
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film, Play, Users, Award, Lightbulb, Video } from "lucide-react";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      
      <main className="bg-theme-dark min-h-screen pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Nous donnons vie à vos <span className="text-gradient">idées</span> avec des vidéos professionnelles
              </h1>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Notre studio de production vidéo est spécialisé dans la création de contenu visuel de haute qualité qui aide les entreprises à se démarquer et à communiquer efficacement leur message.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/videos">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Play className="mr-2 h-5 w-5" />
                    Voir nos réalisations
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                    Contactez-nous
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-violet-blue rounded-lg opacity-70 blur"></div>
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800" 
                    alt="Notre équipe au travail" 
                    className="w-full shadow-lg"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-theme-dark glass-card p-4 rounded-lg shadow-lg">
                <div className="flex gap-4 items-center">
                  <div className="h-14 w-14 bg-gradient-violet-blue rounded-full flex items-center justify-center">
                    <Film className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">+200</p>
                    <p className="text-white/60 text-sm">Projets réalisés</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-20 bg-theme-blue-dark relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-theme-violet-light to-transparent opacity-30"></div>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-16">
              Notre <span className="text-gradient">histoire</span>
            </h2>
            <div className="max-w-3xl mx-auto text-white/80 space-y-6 leading-relaxed">
              <p>
                Fondée en 2015, notre studio est né de la passion partagée de trois amis pour la narration visuelle et le cinéma. Ce qui a commencé comme un petit projet s'est rapidement transformé en une agence de production vidéo complète, servant des clients de toutes tailles.
              </p>
              <p>
                Au fil des années, nous avons développé une approche unique qui combine créativité artistique et stratégie marketing. Nous croyons que chaque vidéo doit non seulement être visuellement attrayante, mais aussi atteindre des objectifs commerciaux concrets.
              </p>
              <p>
                Aujourd'hui, avec une équipe talentueuse de réalisateurs, monteurs, animateurs et stratèges, nous créons des contenus qui captivent, informent et inspirent. Notre mission reste la même : aider les entreprises à communiquer efficacement à travers le médium le plus puissant de notre époque - la vidéo.
              </p>
              <blockquote className="pl-4 border-l-4 border-primary italic my-8">
                "Une bonne vidéo ne se contente pas de montrer votre produit ou service - elle raconte une histoire qui résonne avec votre public."
                <footer className="mt-2 font-medium text-white">— Fondateur & Directeur Créatif</footer>
              </blockquote>
            </div>
          </div>
        </section>
        
        {/* Services */}
        <section className="py-20 bg-theme-dark">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-6">
              Nos <span className="text-gradient">services</span>
            </h2>
            <p className="text-white/70 text-center max-w-2xl mx-auto mb-16">
              Nous proposons une gamme complète de services de production vidéo pour répondre à tous vos besoins de communication visuelle.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Video className="h-8 w-8" />,
                  title: "Production Corporate",
                  description: "Vidéos de présentation d'entreprise, interviews, vidéos de recrutement et communication interne."
                },
                {
                  icon: <Film className="h-8 w-8" />,
                  title: "Films Publicitaires",
                  description: "Spots TV, publicités web et campagnes vidéo multicanal impactantes."
                },
                {
                  icon: <Lightbulb className="h-8 w-8" />,
                  title: "Motion Design",
                  description: "Animation 2D/3D, infographies animées et effets visuels créatifs."
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Événementiel",
                  description: "Couverture d'événements professionnels, captations live et aftermovies."
                },
                {
                  icon: <Play className="h-8 w-8" />,
                  title: "Contenu Social Media",
                  description: "Vidéos courtes optimisées pour les réseaux sociaux et stratégies de contenu."
                },
                {
                  icon: <Award className="h-8 w-8" />,
                  title: "Vidéos Produits",
                  description: "Mettez en valeur vos produits avec des vidéos détaillées et attrayantes."
                },
              ].map((service, index) => (
                <div key={index} className="glass-card p-6 rounded-lg hover:border-primary/30 transition-colors">
                  <div className="h-14 w-14 bg-gradient-violet-blue rounded-full flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-white/70">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-theme-blue-dark relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-theme-violet-light to-transparent opacity-30"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Prêt à lancer votre prochain <span className="text-gradient">projet vidéo</span>?
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Contactez-nous dès aujourd'hui pour discuter de vos idées et découvrir comment nous pouvons vous aider à les concrétiser.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Demander un devis
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default AboutPage;
