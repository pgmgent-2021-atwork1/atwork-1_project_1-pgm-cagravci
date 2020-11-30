/* 
Ailiv
-------------------------
Naam: Avci Cagri
created: 15/11/2020
*/


(() => {
    
    const app = {
        initialize: function () {

            //create navItems
            this.createNav();
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
        createNav: function () {
            this.$navbar = document.querySelector('.nav_items')
            let str = "";
            navItems.forEach(item => {
                str += `<li class="nav_item"><a href="${item.path}">${item.name}</a></li>`
            });

            this.$navbar.innerHTML = str;

            this.findCurrent();
        },
        findCurrent: function () {
            let $navList = this.$navbar.querySelectorAll('li')
            let url = window.location.pathname // "/index.html"

            $navList.forEach(nav => {
                let $a = nav.querySelector('a').pathname //"/index.html"
                let $value = nav.querySelector('a').attributes[0].nodeValue //#
               
                 //if the urlParams match the path of the navItem, give it the class 'current'
                if ($a == url && $value != '#') {
                    nav.classList.add("current")
                } else {
                    nav.classList.remove('current')
                }
            })


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
                            <form action="#" id=${productId}>
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

                                <button type="submit" class="nav__basket basket--form">
                                        <p>Voeg toe aan winkelmandje</p>
                                </button>
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
            <button id="myBtn" class="hidden" title="Go to top">Top</button>`
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
                    <a class="shopping-bottom-action" href="checkout_index.html">Naar betalen</a>
                </section>
            </div>
        </article>`

        this.populateBasket();

        
        },
        populateBasket() {
            console.log('I populate basket')
            let str = "";
            let $shopping = document.querySelector(".shopping-list")

            //get the orders that need to be shown in the basket, from localstorage
            let previous = "";
            if(localStorage.getItem('basketOrders')) {
                previous = JSON.parse(localStorage.getItem('basketOrders'))
            }
            this.basketOrders = [];
            this.basketOrders.push(...previous)

            //prepare the innerHTML per order to be shown in the basket, with data we pulled from localestorage
            let subTot = 0;
            if (this.basketOrders == null) {

            } else if(this.basketOrders != null) {
                this.basketOrders.forEach(order => {
                    let orderedProduct = products[order.orderedProduct] 
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
                                    <a href="#" class="delete" id="${this.basketOrders.indexOf(order)}">verwijderen</a>
                                </div>
                                <div class="shopping-product-amount">
                                    <input type="text" name="number" id="number" min="0" value="${order.amount}">
                                </div>
                            </div>`
                })
            } else {}
    
                $shopping.innerHTML = str;
                this.orderOverview = str; //innerHTML is stored for later use, checkout 'these are the ordered items'
    
                //add the subtotal to the end of the basket AND add the number of orders to the basket icon
                subTot = "€" + subTot;
                document.querySelector(".shopping-bottom-total p").innerHTML = subTot;
                document.querySelector('.basket-amount').innerHTML = this.basketOrders.length

                this.$deleteList = document.querySelectorAll('.delete')
                this.$deleteList.forEach(del => {
    
                    del.addEventListener('click', (event) => {
                        this.deleteFunction(event, del);
                    })
                })

        },
        showBasket() {
            this.$sidePanel.classList.remove('hidden')
            
        },
        formFunction(e,f) {
            e.preventDefault();
            this.formHandling(f);
            return false
        },
        formHandling(f) {
            console.log(f)

            //extract the form data and put it in an object
            let order = {
                productId: f.id,
                amount: parseInt(f[3].value),
                color: f[0].value,
                vase: f[1].value,
                binding: f[2].value
            }

            //find wich product is chosen in our products data
            let id = 0;
            products.forEach(product => {
                if (product.id == f.id) {
                    id = products.indexOf(product);
                } else {
                }
            })
            order.orderedProduct = id;

            //push new order 
            this.basketOrders = [];
            this.basketOrders.push(order)

            //get the old orders from the localestorage and add these to the new order
            let previous = "";
            if(localStorage.getItem('basketOrders')) {
                previous = JSON.parse(localStorage.getItem('basketOrders'))
            }
            this.basketOrders.push(...previous)

            console.log("previous", previous)
            console.log("basketorders", this.basketOrders)
            
            //inject the orders(inc. the new order back to locale storage) this will be used to create the basket
            localStorage.setItem('basketOrders', JSON.stringify(this.basketOrders))

            //now we have stored the orders, we can use them to populate the basket
            this.populateBasket();

        },
        //subfunctions:
        //show the navItems when the users clicks on the hamburgericon
        goTopFunction() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        hideGoTop() {
            this.$btn = document.querySelector("#myBtn")
            let currentPosi = window.scrollY;
            if (currentPosi > 100) {
                this.$btn.classList.remove('hidden')
            } else {
                this.$btn.classList.add('hidden')
            }
        },
        deleteFunction(event, del) {
            console.log(event,del)

            //get the data that would be loaded in the basket
             //get the orders that need to be shown in the basket, from localstorage
             let previous = "";
             if(localStorage.getItem('basketOrders')) {
                 previous = JSON.parse(localStorage.getItem('basketOrders'))
             }
             this.basketOrders = [];
             this.basketOrders.push(...previous)
             console.log('before delete', this.basketOrders)

             if (parseInt(del.id) > -1) {
                 this.basketOrders.splice(parseInt(del.id), 1);
             }

            //inject the orders(inc. the new order back to locale storage) this will be used to create the basket
            localStorage.setItem('basketOrders', JSON.stringify(this.basketOrders))
            console.log('after delete', this.basketOrders)

             //now we have stored the orders, we can use them to populate the basket
            this.populateBasket();
            


        },

        showNav(){

            if (this.$navItems.classList.contains('hidden')){
                this.$navItems.classList.remove('hidden')
            } else {
                this.$navItems.classList.add('hidden')
            }
        },
        cacheElements() {
            this.$hamburger = document.querySelector(".hamburger-icon");
            this.$navItems = document.querySelector(".nav_items");
            this.$btn = document.querySelector("#myBtn")
            this.$basket = document.querySelector(".nav__basket")
            this.$sidePanel = document.querySelector('.darken')
            this.$close = document.querySelector("#close")
            this.$forms = document.querySelectorAll("form")
            this.$deleteList = document.querySelectorAll('.delete')
        },
        registerListeners() {
            
           
            this.$hamburger.addEventListener('click', (event) => {
                this.showNav();
            });

            if (this.$btn != null) {
               
                this.$btn.addEventListener('click', (event) => {
                    this.goTopFunction();
                })
            }

          
            window.addEventListener('scroll', this.hideGoTop);

       
            this.$basket.addEventListener('click', (event) => {
                this.showBasket();
            })
            
            this.$deleteList.forEach(del => {
    
                del.addEventListener('click', (event) => {
                    this.deleteFunction(event, del);
                })
            })

            if (this.$close != null) {

                this.$close.addEventListener('click', (event) => {
                    this.$sidePanel.classList.add('hidden')
                } )
            }

            this.$forms.forEach(form => {
 
                form.addEventListener('submit', (event) => {
                    this.formFunction(event, form);
                })
            })

        }
    };
    app.initialize();
})();

