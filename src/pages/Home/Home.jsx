import Hero from "../../assets/images/hero.jpeg";
import "./home.css";
const Home = () => {
  return (
    <>
      <div className="container home">
        <div>
          <h1>
            Marvel Explorer : <br /> Portail d'exploration de l'univers
          </h1>{" "}
          <p>
            Je présente Marvel Explorer, une application web responsive conçue
            pour mon portfolio. <br />
            Ce projet démontre ma capacité à créer une expérience utilisateur
            fluide pour naviguer dans la richesse de l'univers Marvel, grâce à
            une intégration maîtrisée d'API et une interface intuitive.
            <br />
            <br />
            Fonctionnalités clés :<br />
            <br />
            Page Personnages :<br />
            - Page interactive de tous les héros/vilains Marvel
            <br />- Système complet de recherche instantanée et tri dynamique
            <br />- Fiches détaillées avec : bio, visuels HD, apparitions dans
            les comics
            <br />- Pagination optimisée pour une navigation rapide <br />
            Page Comics Catalogue intelligent avec filtres (titre, série, année)
            <br />- Détails complets pour chaque comic : couverture, résumé,
            date, créateurs- Liste des personnages présents avec liens vers
            leurs profils
            <br />- Système Favoris Espace centralisé pour personnages/comics
            favoris
            <br />- Gestion via icônes interactives sur toutes les pages
            <br />- Persistance locale (localStorage) pour conserver les choix
            <br />
            <br />
            Réalisation technique
            <br />
            <br />
            Frontend (React) <br />- Architecture modulaire avec composants
            réutilisables (cartes, modales) Gestion d'état centralisée via
            Context API
            <br />- Appels API optimisés avec gestion des erreurs
            <br />- Design responsive (mobile/desktop) avec CSS moderne <br />
            Backend (Express) <br />- Serveur Node.js/Express <br />- Gestion
            sécurisée des clés API Marvel
            <br />- Système de pagination <br />- Reconstruction des données
            pour une UX optimale
            <br />
            Points forts
            <br />
            <br />
            UX/UI
            <br />- Navigation fluide
            <br />- Temps de chargement optimisés
            <br />
            Design épuré aux couleurs Marvel (palette rouge/bleu/noir)
            <br />
            Animations subtiles pour les interactions utilisateur
          </p>
        </div>
        <img src={Hero} alt="deadpool qui t'aime" className="hero" />
      </div>
    </>
  );
};

export default Home;
