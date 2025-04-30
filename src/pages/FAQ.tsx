
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import FaqSection from '@/components/guides/FaqSection';
import { getFaqItems } from '@/components/guides/FaqData';
import { HelpCircle, BookOpen, FileText, Users, Mail } from 'lucide-react';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  
  useEffect(() => {
    document.title = "Foire Aux Questions | ilodata.com";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Trouvez des réponses à vos questions sur la mise en page, les modèles Word, les services de mise en forme et plus encore.");
  }, []);

  // Catégories de FAQ générées dynamiquement
  const faqCategories = [
    { id: 'general', name: 'Questions générales', icon: <HelpCircle size={20} /> },
    { id: 'models', name: 'Modèles et Templates', icon: <FileText size={20} /> },
    { id: 'services', name: 'Services', icon: <BookOpen size={20} /> },
    { id: 'about', name: 'À propos d\'ILODATA', icon: <Users size={20} /> },
    { id: 'contact', name: 'Nous contacter', icon: <Mail size={20} /> },
  ];

  // Générer des questions spécifiques à chaque catégorie
  const getFaqByCategory = (category: string) => {
    switch (category) {
      case 'general':
        return [
          {
            question: "Qu'est-ce que ilodata.com propose ?",
            answer: "Ilodata.com est une plateforme spécialisée dans la mise en page et le design éditorial. Nous proposons des modèles Word professionnels, des services de mise en page personnalisés, ainsi que des guides et conseils pour optimiser vos documents."
          },
          {
            question: "Les ressources sont-elles gratuites ?",
            answer: "Nous proposons à la fois des ressources gratuites (guides, conseils, certains modèles) et des services payants (mise en page personnalisée, modèles premium, formations). Chaque ressource indique clairement si elle est gratuite ou payante."
          },
          {
            question: "Comment puis-je télécharger un modèle ?",
            answer: "Pour télécharger un modèle, il vous suffit de vous rendre sur la page du modèle souhaité, puis de cliquer sur le bouton de téléchargement. Certains modèles sont accessibles gratuitement, d'autres nécessitent un achat préalable."
          },
          {
            question: "Quels formats de fichiers proposez-vous ?",
            answer: "Nous proposons principalement des fichiers au format Microsoft Word (.docx), mais certains modèles sont également disponibles en formats PDF, InDesign (.indd) ou OpenOffice (.odt)."
          },
          {
            question: "Comment personnaliser un modèle téléchargé ?",
            answer: "Consultez notre guide 'Comment personnaliser un modèle Word' dans la section Conseils et Guides. Vous y trouverez des instructions détaillées sur la modification des styles, l'intégration de votre contenu et l'adaptation du modèle à vos besoins."
          }
        ];
      case 'models':
        return [
          {
            question: "Les modèles sont-ils compatibles avec toutes les versions de Word ?",
            answer: "Nos modèles sont optimisés pour Microsoft Word 2010 et versions ultérieures. Certains modèles plus simples peuvent fonctionner avec des versions antérieures ou des logiciels alternatifs comme OpenOffice, mais toutes les fonctionnalités ne seront pas garanties."
          },
          {
            question: "Puis-je utiliser vos modèles pour un usage commercial ?",
            answer: "Oui, nos modèles peuvent être utilisés pour créer des documents à usage personnel ou professionnel. Cependant, la revente ou la redistribution des modèles eux-mêmes est strictement interdite."
          },
          {
            question: "Comment choisir le bon modèle pour mon projet ?",
            answer: "Nous vous recommandons de déterminer d'abord le type de document dont vous avez besoin (livre, rapport, mémoire, etc.), puis de parcourir notre collection en utilisant les filtres par catégorie. Consultez les aperçus et descriptions détaillées pour trouver celui qui correspond le mieux à vos besoins."
          },
          {
            question: "Un modèle peut-il être adapté pour un format différent ?",
            answer: "Oui, nos modèles peuvent généralement être adaptés à différents formats (A4, A5, etc.). Consultez notre guide 'Comment adapter un modèle Word' pour des instructions détaillées sur la modification des paramètres de page et des marges."
          },
          {
            question: "Je rencontre des problèmes avec un modèle téléchargé, que faire ?",
            answer: "Consultez d'abord notre section FAQ et nos guides de dépannage. Si le problème persiste, contactez notre service support via le formulaire de contact en précisant le modèle concerné et la nature exacte du problème."
          }
        ];
      case 'services':
        return [
          {
            question: "Comment fonctionne votre service de mise en page personnalisée ?",
            answer: "Après avoir pris contact avec nous et discuté de vos besoins, nous vous proposons un devis. Une fois accepté, vous nous envoyez votre manuscrit et vos préférences stylistiques. Nos designers s'occupent alors de la mise en page complète de votre document, avec des allers-retours pour validation."
          },
          {
            question: "Quels sont les délais pour une mise en page personnalisée ?",
            answer: "Les délais varient selon la complexité et la longueur du document, généralement entre 1 et 3 semaines. Pour des projets urgents, nous proposons également un service accéléré moyennant un supplément."
          },
          {
            question: "Proposez-vous des services de correction ou de relecture ?",
            answer: "Non, notre expertise se concentre sur la mise en page et le design éditorial. Nous vous recommandons de faire relire et corriger votre document avant de nous le soumettre pour la mise en page finale."
          },
          {
            question: "Quels types de documents pouvez-vous mettre en page ?",
            answer: "Nous prenons en charge une grande variété de documents : livres, thèses, mémoires, rapports, catalogues, brochures, magazines, etc. N'hésitez pas à nous contacter pour discuter de vos besoins spécifiques."
          },
          {
            question: "Comment se déroule une formation à la mise en page ?",
            answer: "Nos formations peuvent être dispensées en ligne ou en présentiel, individuellement ou en groupe. Nous adaptons le contenu à vos besoins spécifiques, avec un accent sur la pratique. Chaque participant reçoit des supports de formation et un suivi post-formation."
          }
        ];
      case 'about':
        return [
          {
            question: "Qui est ILODATA ?",
            answer: "ILODATA est une entreprise spécialisée dans la mise en page et le design éditorial, fondée en 2018. Notre équipe est composée de designers professionnels passionnés par la typographie et la mise en page, avec une expertise particulière dans l'édition de livres et documents académiques."
          },
          {
            question: "Où êtes-vous basés ?",
            answer: "Notre siège social est situé à Paris, France, mais nous travaillons avec des clients du monde entier grâce à notre plateforme en ligne."
          },
          {
            question: "Proposez-vous des stages ou des emplois ?",
            answer: "Nous publions occasionnellement des offres de stage ou d'emploi sur notre page 'Carrières'. N'hésitez pas à nous envoyer une candidature spontanée si vous êtes passionné par le design éditorial et la mise en page."
          },
          {
            question: "Travaillez-vous avec des maisons d'édition ?",
            answer: "Oui, nous collaborons régulièrement avec des maisons d'édition, des universités, des entreprises et des auteurs indépendants. Nous proposons des tarifs adaptés aux projets de grande envergure."
          },
          {
            question: "Comment sont créés vos modèles ?",
            answer: "Nos modèles sont conçus par notre équipe de designers en suivant les meilleures pratiques typographiques et éditoriales. Chaque modèle est testé rigoureusement pour garantir sa fonctionnalité et sa facilité d'utilisation."
          }
        ];
      case 'contact':
        return [
          {
            question: "Comment vous contacter ?",
            answer: "Vous pouvez nous contacter via notre formulaire en ligne sur la page Contact, par email à contact@ilodata.com, ou par téléphone au 01 23 45 67 89 du lundi au vendredi, de 9h à 18h."
          },
          {
            question: "Quel est le délai de réponse à une demande de devis ?",
            answer: "Nous nous efforçons de répondre à toutes les demandes de devis dans un délai de 24 à 48 heures ouvrées."
          },
          {
            question: "Puis-je prendre rendez-vous pour discuter de mon projet ?",
            answer: "Absolument ! Vous pouvez demander un rendez-vous téléphonique ou en visioconférence via notre formulaire de contact. Nous conviendrons ensemble d'une date et d'un horaire qui vous conviennent."
          },
          {
            question: "Comment envoyer un document volumineux ?",
            answer: "Pour l'envoi de documents volumineux, nous vous communiquerons un lien vers notre plateforme de transfert sécurisée après votre premier contact avec notre équipe."
          },
          {
            question: "Êtes-vous disponibles le week-end ?",
            answer: "Nos bureaux sont fermés le week-end, mais vous pouvez nous contacter via le formulaire en ligne. Nous traiterons votre demande dès le jour ouvré suivant."
          }
        ];
      default:
        return getFaqItems();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Foire Aux Questions</h1>
            <p className="text-slate-600 mb-8 text-lg">
              Trouvez des réponses aux questions fréquemment posées concernant nos services, nos modèles et l'utilisation de notre plateforme.
            </p>
            
            <Separator className="my-6" />
            
            {/* Navigation par catégorie */}
            <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    activeCategory === category.id
                      ? 'bg-ilodata-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.name}</span>
                </button>
              ))}
            </div>
            
            {/* Section FAQ dynamique */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                {faqCategories.find(cat => cat.id === activeCategory)?.name}
              </h2>
              
              <div className="space-y-6">
                {getFaqByCategory(activeCategory).map((item, index) => (
                  <div key={index} className="bg-white shadow-sm border border-slate-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.question}</h3>
                    <p className="text-slate-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contact section */}
            <div className="mt-16 bg-slate-50 p-8 rounded-lg border border-slate-200">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Vous n'avez pas trouvé la réponse à votre question ?</h3>
                <p className="text-slate-600 mb-6">
                  Notre équipe est à votre disposition pour répondre à toutes vos interrogations.
                </p>
                <a href="/contact" className="button-primary">
                  Contactez-nous
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
