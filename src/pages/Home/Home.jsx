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
            pour mon portfolio. Ce projet démontre ma capacité à créer une
            expérience utilisateur fluide pour naviguer dans la richesse de
            l'univers Marvel, grâce à une intégration maîtrisée d'API et une
            interface intuitive. 🚀 Fonctionnalités clésPage Personnages Grille
            interactive de tous les héros/vilains Marvel- Système complet de
            recherche instantanée et tri dynamique Fiches détaillées avec : bio,
            visuels HD, apparitions dans les comics- Pagination optimisée pour
            une navigation rapide Page Comics Catalogue intelligent avec filtres
            (titre, série, année) Détails complets pour chaque comic :
            couverture, résumé, date, créateurs- Liste des personnages présents
            avec liens vers leurs profils ❤️ Système Favoris Espace centralisé
            pour personnages/comics favoris- Gestion via icônes interactives sur
            toutes les pages- Persistance locale (localStorage) pour conserver
            les choix- Tri personnalisable dans la section dédiée ⚙️ Réalisation
            techniqueFrontend (React) Architecture modulaire avec composants
            réutilisables (cartes, modales) Gestion d'état centralisée via
            Context API- Appels API optimisés avec gestion des erreurs- Design
            responsive (mobile/desktop) avec CSS moderne Backend (Express)
            Serveur Node.js/Express pour proxy des requêtes- Gestion sécurisée
            des clés API Marvel- Optimisation des réponses et mise en cache-
            Gestion robuste du throttling de l'API Intégration API Marvel
            Exploitation complète de l'API officielle Marvel- Système de
            pagination synchronisé avec l'API- Reconstruction des données pour
            une UX optimale- Gestion élégante des limites de requêtes ✨ Points
            forts UX/UI- Navigation fluide avec feedback visuel immédiat- Temps
            de chargement optimisés (lazy loading des images) Design épuré aux
            couleurs Marvel (palette rouge/bleu/noir) Accessibilité : contrastes
            vérifiés, sémantique HTML stricte- Animations subtiles pour les
            interactions utilisateur
          </p>
        </div>
        <img src={Hero} alt="deadpool qui t'aime" className="hero" />
      </div>
    </>
  );
};

export default Home;
