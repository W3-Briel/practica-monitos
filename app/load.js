const App = {
    webpages: {
        welcome: {
            title: "Inicio",
            description: "Explora nuestro mundo de los monitos alegres, donde podr&aacute;s encontrar distintos tipos de monos amigos de diferentes nacionalidades, para compartir y conocer.",
            url: "./views/welcome.html"
        },
        quote: {
            title: "Generador de frase",
            description: "Aqu&iacute; encontrar&aacute; la frase del d&iacute;a",
            url: "./views/quote.html" 
        },
        monkeys: {
            title: "Buscador de especie de monos",
            description: "Busque aqu&iacute; diferentes especies de monos y vea su descripci&oacute;n",
            url: "./views/monkeys.html"
        },
        introducing: {
            title: "Formulario de prueba",
            description: "Presentate con nosotros los monitos",
            url: "./views/introducing.html"
        }
    },
    pageElements: {
        headerTitle: null,
        headerDescription: null
    },
    sendRequest: function(url, method){
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open(method, url, true);
            request.send(null);

            //Asíncrono
            request.onreadystatechange = function(event) {
                if (this.readyState == 4 && this.status == 200)
                    resolve(request.responseText);
                else if(this.readyState == 4 && this.status != 200)
                    reject(request.responseText);
            };
        });
    },
    updatePageHeader: function(title, description) {
        App.pageElements.headerTitle.innerHTML = title;
        App.pageElements.headerDescription.innerHTML = description;
    },
    loadWebpage: function(url){
        return new Promise((resolve, reject) => {
            let pageContent = document.getElementById("page-content");

            App.sendRequest(url, "GET")
            .then((response) => {
                pageContent.innerHTML = response;
                resolve(url);
            })
            .catch((error) => {
                alert(error);
                pageContent.innerHTML = "Ha ocurrido un error al cargar la web solicitada";
                reject("");
            });

        });
    },
    updateActiveLink: function(pageName) {

        //Esto es algo avanzado: Busca los links que contengan el atributo page.
        let pages = document.querySelectorAll("a[page]");

        for (let i = 0; i < pages.length; i++)
        {
            let currentPageName = pages[i].getAttribute("page");
            pages[i].classList.remove(pageName != currentPageName ? "text-white" : "text-gray");
            pages[i].classList.add(pageName != currentPageName ? "text-gray" : "text-white");
        }
    },
    onLinkClick: function (evt) {

        let pageName = evt.currentTarget.getAttribute("page");

        if (pageName == null)
            return;

        let page = App.webpages[pageName];

        if (page == null)
            return;

        //Update current header
        App.updatePageHeader(page.title, page.description);

        //Load webpage
        App.loadWebpage(page.url).then((url) => {
            if (url.includes("introducing"))
                loadTestForm();
        });

        //Set active link
        App.updateActiveLink(pageName);

    },
    load: function(){
        //Load page elements
        App.pageElements.headerTitle = document.getElementById("header_title");
        App.pageElements.headerDescription = document.getElementById("header_description");

        //Load first page here
        let firstPage = App.webpages["welcome"];
        App.updatePageHeader(firstPage.title, firstPage.description);
        App.loadWebpage(firstPage.url)
        
        let navLinks = document.getElementsByClassName("nav-link");
        for (let i = 0; i < navLinks.length; i++){
            navLinks[i].addEventListener("click", (evt) => { App.onLinkClick(evt); });
        }
    }
};

(function(){
    App.load();
})();