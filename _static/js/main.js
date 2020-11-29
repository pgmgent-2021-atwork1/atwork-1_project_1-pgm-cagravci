/* 
Ailiv
-------------------------
Naam: Avci Cagri
created: 15/11/2020
*/


(() => {
    
    const app = {
        initialize: function () {
            
            //list items on the homepage
            this.createWebshopItems();
            //show the selected product
            this.createProductPage();
            //create the seasonal page
            this.createSeasonsPage();
            //create examples: container cards
            this.createExamples();

            //create the basket
            this.createBasket();

            //scroll to top button
            this.createScrollTop();

            //chashe html elements
            this.cacheElements();
            //add click events 
            this.registerListeners();

        },
        createWebshopItems:function () {
            //grab webshop element
            let $cardContainer = document.querySelector(".webshop-cards")
           
            let tempStr = "";
            if ($cardContainer === null) {
                
            } else {
            //make a section per product in data.js{products}
                products.forEach(product => {
                    tempStr += `
                    <section class="card">
                        <img src="${product.image.url}" alt="${product.image.alt}">
                        <div class="card-info">
                            <a href="product_boeket_index.html?id=${product.id}">
                                <h4>${product.name} - ${product.type}</h4>
                            </a>
                            <p class="price">${product.price.symbol}${product.price.value}</p>
                        </div>
                    </section>
                    `
                })
                $cardContainer.innerHTML = tempStr;
            }
            //add the created string to the innerHTML om the container
           

        },
        createProductPage: function () {
            //grab product element
            let $product = document.querySelector('.product');

            //create the productinfo and form
            if ($product === null ){

            } else {
                this.populateProductPage($product);
            }
        },
        populateProductPage: function ($product) {
            let url = window.location.search;
            let str = "";
            if (url === null) { //are we in the product page? if not, don't do anything

            } else {
                let params = new URLSearchParams(url);
                let productId = params.get('id')
                products.forEach(product=> {
                    if (product.id == productId){
                        str += `
                        <section class="product-info">
                            <div class="product-info-img">
                                <img src="${product.image.url}" alt="${product.image.alt}">
                            </div>
                            <div class="product-info-description">
                                <h2>${product.name} - ${product.type}</h2>
                                <p>${product.price.symbol}${product.price.value}</p>
                            </div>
                        </section>`

                        str += `
                        <section class="form">
                            <form action="#" method="POST">
                                <label for="color_select">kleur</label>
                                <select name="colors" id="color_select" required="required">
                                    <option value="" disabled selected>Keuze: Kleur</option>
                                    <option value="white">wit</option>
                                    <option value="mixed">gemengd</option>
                                </select>

                                <label for="vase_select">vaas bijbestellen</label>
                                <select name="vases" id="vase_select" required="required">
                                    <option value="" disabled selected>Keuze: Vaas bijbestellen</option>
                                    <option value="yes">Ja</option>
                                    <option value="no">Nee</option>
                                </select>

                                <label for="binding_select">bindwijze</label>
                                <select name="bindings" id="binding_select" required="required">
                                    <option value="" disabled selected>Keuze: Bindwijze</option>
                                    <option value="short">kortgebonden stelen</option>
                                    <option value="long">langgebonden stelen</option>
                                </select>

                                <label for="amount">aantal</label>
                                <input type="number" name="amount" id="amount" required="required" min="1" placeholder="aantal boeketten">

                                <div class="nav__basket basket--form">
                                    <a href="#">
                                        <p>Voeg toe aan winkelmandje</p>
                                    </a>
                                </div>
                            </form>
                        </section>`
                    }
                })
                $product.innerHTML = str;
                
            }
        },
        createScrollTop() {
            let $body = document.querySelector("body")
            let str = "";

            str = `
            <button id="myBtn" title="Go to top">Top</button>`
            $body.innerHTML += str;

        },
        createSeasonsPage: function () {
            let $season = document.querySelector(".season-card-container")

            if ($season === null) {

            }else {
                this.populateSeasonsPage($season);
            }
        },
        populateSeasonsPage: function ($season) {
            let str = "";
            
            seasons.forEach(season => {
                let imgStr = "";
                season.image.forEach(imgUrl => {
                    imgStr+= `
                    <img src="${imgUrl}" alt="${season.season}">`
                })

                str += `
                <section class="season-card">
                <h2>${season.season}</h2>
                ${imgStr}
                <p>${season.description}</p>
            </section>`
            })
            $season.innerHTML = str;
        },
        createExamples: function () {
            let $examples = document.querySelector(".card--container.season-examples")

            if ($examples === null) {

            }else {
                this.populateExamples($examples);
            }
        },
        populateExamples: function ($examples) {
            let str ="";
            let exampleType = "";
            let url = window.location.pathname
            if (url == "/dienst_seizoensdecoratie_index.html"){
                exampleType = "season";
            }else if (url == "/dienst_gepersonaliseerd_bloemwerk_index.html") {
                exampleType = "personalised"
            } else {

            }

            examples.forEach(example => {
                if (example.type == exampleType) {
                    example.images.forEach(img => {
                        str += `
                        <section class="card">
                         
                         <a href="${img}" target="_blank"> 
                             <img src="${img}" alt="${example.type}">
                         </a>
                     </section>`
                    })
               
                }
            })
            $examples.innerHTML = str;

        },
        createBasket(){
            this.$sidePanel = document.querySelector(".darken")
            if (this.$sidePanel != null) {
                this.$sidePanel.remove()
            }
            document.querySelector("header").innerHTML += `
            <article class="darken hidden">
            <div class="shopping-sidePanel">
                <div class="shopping-top">
                    <h2>uw winkelmandje</h2>
                    <a id="close" href="#">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 11.328 11.328" style="enable-background:new 0 0 11.328 11.328;" xml:space="preserve">
                <g>
                    <path style="fill:#030104;" d="M11.145,9.085L7.723,5.664l3.422-3.421c0.243-0.244,0.243-0.64,0-0.883L9.967,0.183
                        c-0.244-0.244-0.64-0.244-0.883,0L5.662,3.604l-3.42-3.421c-0.244-0.244-0.639-0.244-0.883,0L0.183,1.36
                        c-0.243,0.244-0.243,0.639,0,0.883l3.421,3.421L0.183,9.085c-0.243,0.244-0.243,0.639,0,0.883l1.177,1.178
                        c0.244,0.243,0.639,0.243,0.883,0l3.42-3.422l3.422,3.422c0.243,0.243,0.639,0.243,0.883,0l1.178-1.178
                        C11.389,9.724,11.389,9.329,11.145,9.085z"/>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                        </svg>
                    </a>
                </div>
                <section class="shopping-list">
                    
                </section>
                <section class="shopping-bottom">
                    <div class="shopping-bottom-total">
                        <h4>Subtotal</h4>
                        <p>€0</p>
                    </div>
                    <a class="shopping-bottom-action" href="#">Naar betalen</a>
                </section>
            </div>
        </article>`

        let str = "";
        let $shopping = document.querySelector(".shopping-list")

        let subTot = 0;

        basketOrders.forEach(order => {
            let orderedProduct = products[order.findOrder()] 
            subTot = subTot + order.amount*orderedProduct.price.value
            str += `
                    <div class="shopping-product">
                        <div class="shopping-product-image">
                            <img src="${orderedProduct.image.url}" alt="">
                        </div>
                    
                        <div class="shopping-product-info">
                            <h4>${orderedProduct.name} ${orderedProduct.type}</h4>
                            <p>${orderedProduct.price.symbol}${orderedProduct.price.value}</p>
                            <p><span>Kleur</span>${order.color}</p>
                            <p><span>Vaas bijbestellen</span>${order.vase}</p>
                            <p><span>Bindwijze:</span>${order.binding}</p>
                            <a href="#">verwijderen</a>
                        </div>
                        <div class="shopping-product-amount">
                            <input type="text" name="number" id="number" min="0" value="${order.amount}">
                        </div>
                    </div>`
        })

            $shopping.innerHTML = str;
            subTot = "€" + subTot;

            document.querySelector(".shopping-bottom-total p").innerHTML = subTot;
        },
        showBasket() {
            this.$sidePanel.className = "darken";
            
        },
        //subfunctions:
        //show the navItems when the users clicks on the hamburgericon
        goTopFunction() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        showNav(){
            let isHidden = false;

            //find out if the navbar is hidden or not
            let navItemsClass = this.$navItems.classList;
            navItemsClass.forEach(classItem => {
                if (classItem == "hidden") {
                isHidden = true;
                };
            });
            //if the navbar is hidden, the click needs to show the navbar. else it needs to hide it.
            if (isHidden) {
                this.$navItems.className = "nav_items";
            } else{
                this.$navItems.className = "nav_items hidden";

            }
        },
        cacheElements() {
            this.$hamburger = document.querySelector(".hamburger-icon");
            this.$navItems = document.querySelector(".nav_items");
            this.$btn = document.querySelector("#myBtn")
            this.$basket = document.querySelector(".nav__basket")
            this.$close = document.querySelector("#close")
            this.$sidePanel = document.querySelector(".darken")
        },
        registerListeners() {
            this.$hamburger.addEventListener('click', (event) => {
                this.showNav();
            });

            this.$btn.addEventListener('click', (event) => {
                this.goTopFunction();
            })

            this.$basket.addEventListener('click', (event) => {
                this.showBasket();
            })

            this.$close.addEventListener('click', (event) => {
                this.$sidePanel.className = "darken hidden";
            } )

        }
    };
    app.initialize();
})();

