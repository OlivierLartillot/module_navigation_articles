// --- Events ---
// une liste d'évènements est mise à disposition par JS et le navigateur
// par exemple, l'évènement "click"
// Quand l'évènement arrive/survient, JS exécute toutes les fonctions attachées à cet évènement
// => l'exécution de la fonction attachée est désynchronisée

// On place notre code dans un module
const app = {
    // Propriété "counter"
    currentArticleIndex: 0,   
    articleLength: articles.length-1,

    // Méthode appelée au chargement du DOM
    init: function() {
        // attache la méthode app.handleClickOnDisplayAddFormButton à l'évènement "click" sur le bouton "ajouter une article"
        document.getElementById('btnDisplayAddForm').addEventListener('click', app.handleClickOnDisplayAddFormButton);

        
        console.log('le nombre d articles est de : ' + app.articleLength);
        
        //appeler la methode premiere article du tableau
        app.displayCurrentArticle();

        //ADD EVENT
        let nextStep = document.getElementById('nav-next');
        nextStep.addEventListener('click', app.handleClickOnNextButton);

        let previoustStep = document.getElementById('nav-prev');
        previoustStep.addEventListener('click', app.handleClickOnPrevButton); 
        
        let firstStep = document.getElementById('nav-first');
        firstStep.addEventListener('click', app.handleClickOnFirstButton);   

        let lastStep = document.getElementById('nav-last');
        lastStep.addEventListener('click', app.handleClickOnLastButton);   

        let ajout = document.getElementById('addArticleForm');
        ajout.addEventListener('submit', app.handleSubmit)
   

    },
    // Méthode gérant le click pour afficher le form d'ajout
    handleClickOnDisplayAddFormButton: function(evt) {
        console.log('click to display form');
        document.getElementById('divAddArticle').classList.remove('d-none');
    },
    // Méthode permettant de modifier le DOM pour afficher l article "courant"
    displayCurrentArticle: function() {
        // app.currentArticleIndex pour afficher l article "courant"     
        let currentArticle = articles[this.currentArticleIndex].title;
        console.log(currentArticle); 
        // app.currentArticleIndex pour afficher l'auteur "courant" 
        let currentContent = articles[this.currentArticleIndex].content;
        console.log(currentContent); 


        // l ajouter dans id='article' et id='content'
        document.getElementById('article').innerText = currentArticle;
        document.getElementById('content').innerText = currentContent;
        


    },

    // Je crée une méthode dédiée à la gestion du click sur le bouton "Next-step"
    handleClickOnNextButton: function() {
      console.log('click on next');
      if (app.currentArticleIndex<app.articleLength) {
        app.currentArticleIndex += 1;
        //si apres la mise a jour de l'aricle on est au dernier, on d-none sur les flèches
        if (app.currentArticleIndex>=app.articleLength) {
          document.getElementById('nav-last').classList.add('d-none');
          document.getElementById('nav-next').classList.add('d-none');
        }
        

        console.log(app.currentArticleIndex);
        return app.displayCurrentArticle();
      }

      
    },

    // Je crée une méthode dédiée à la gestion du click sur le bouton "Next-step"
    handleClickOnPrevButton: function() {
        console.log('click on next');
        // si index = 0 on ne peut pas revenir en arriere 
        // ! on pouurait aussi afficher le dernier !!!
        if (app.currentArticleIndex>0) {
            app.currentArticleIndex -= 1; 
            console.log(app.currentArticleIndex);
            if ((document.getElementById('nav-last').classList.contains("d-none") == true) || (document.getElementById('nav-last').classList.remove('d-none'))) {
              document.getElementById('nav-last').classList.remove('d-none');
              document.getElementById('nav-next').classList.remove('d-none');
            }

            return app.displayCurrentArticle();
        }
        
      },
          // Je crée une méthode dédiée à la gestion du click sur le bouton "Next-step"
    handleClickOnFirstButton: function() {
        console.log('click on next');
        app.currentArticleIndex = 0; 
        console.log(app.currentArticleIndex);
        return app.displayCurrentArticle();
      },

      handleClickOnLastButton: function() {
        console.log('click on next');
        console.log(app.articleLength);
        app.currentArticleIndex = app.articleLength; 
        console.log(app.currentArticleIndex);

        // TODO : A faire sur les autres aussi, quand on appuie sur la fléche "derniere entrée" on le d-none car on ne peut pas aller plus loin...
        document.getElementById('nav-last').classList.add('d-none');
        document.getElementById('nav-next').classList.add('d-none');
        return app.displayCurrentArticle();
      },

      handleSubmit: function(event) {

        event.preventDefault();
        console.log('tu es bien soumis ! ');
        // on intercepte les données entrees
        let newArticle = document.getElementById('input-article');
        let newAuteur = document.getElementById('input-content');
        console.log(newArticle.value);
        console.log(newAuteur.value);

        //on push dans le tableau
        articles.push({"article": "" + newArticle.value + "", "content" : "" +  newAuteur.value + ""});   
        console.table(articles);
        // on a la longueur du tableau des articles
        app.articleLength++;
        
        // on cache le formulaire d'ajout de article
        document.getElementById('divAddArticle').classList.add('d-none');

      }
      



  };
  
  // Appel "synchronisé" de la méthode init
  // app.init();
  
  // Permet d'exécuter notre code une fois le DOM chargé
  // => lorsque l'event DOMContentLoaded survient => la méthode app.init est appelée
  // donc app.init n'est pas exécuter lorsque JS lit cette ligne de code
  document.addEventListener('DOMContentLoaded', app.init); // ici, ne jamais mettre les (), sinon, la fonction/méthode sera aussitôt exécutée
  
  // Attention à la syntaxe, on ne doit pas mettre les () après la fonction, sinon elle est appelée aussitôt
  // Explications :
  // envoie de l'eau, au lancement du détecteur
  // document.addEventListener('fuméeDetectée', envoyerDeLeau());
  // Lorsque de la fumée sera détectée, envoie de l'eau
  // document.addEventListener('fuméeDetectée', envoyerDeLeau);
