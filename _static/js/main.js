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
        createWebshopItems: function () {
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
            if ($product === null) {

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
                products.forEach(product => {
                    if (product.id == productId) {
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
            
            <svg id="myBtn" class="hidden" height="512pt" viewBox="-23 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m290.75 185.832031c-48.476562 0-87.917969-39.4375-87.917969-87.917969 0-48.476562 39.4375-87.914062 87.917969-87.914062 48.476562 0 87.914062 39.4375 87.914062 87.914062 0 48.480469-39.4375 87.917969-87.914062 87.917969zm0 0" fill="#ffd36c"/><path d="m339.640625 97.914062c0 27.003907-21.890625 48.894532-48.894531 48.894532-27 0-48.890625-21.890625-48.890625-48.894532 0-27 21.890625-48.890624 48.890625-48.890624 27.003906 0 48.894531 21.890624 48.894531 48.890624zm0 0" fill="#f4b74a"/><path d="m290.746094 156.808594c-32.472656 0-58.890625-26.417969-58.890625-58.894532 0-32.472656 26.417969-58.890624 58.890625-58.890624 32.476562 0 58.894531 26.417968 58.894531 58.890624 0 32.476563-26.417969 58.894532-58.894531 58.894532zm0-97.785156c-21.441406 0-38.890625 17.449218-38.890625 38.894531 0 21.445312 17.449219 38.890625 38.890625 38.890625 21.445312 0 38.894531-17.445313 38.894531-38.890625 0-21.445313-17.445313-38.894531-38.894531-38.894531zm0 0"/><path d="m369.234375 290.742188c-26.324219 26.324218-77.257813 18.070312-77.257813 18.070312s-8.253906-50.933594 18.070313-77.257812c26.324219-26.328126 77.261719-18.074219 77.261719-18.074219s8.253906 50.9375-18.074219 77.261719zm0 0" fill="#38c183"/><path d="m199.179688 287.480469c30.769531 30.765625 90.300781 21.121093 90.300781 21.121093s9.648437-59.535156-21.121094-90.300781c-30.765625-30.769531-90.300781-21.121093-90.300781-21.121093s-9.648438 59.53125 21.121094 90.300781zm0 0" fill="#49e298"/><path d="m111.71875 10-57.617188 93.289062h25.671876v159.585938h63.886718v-159.585938h25.675782zm0 0" fill="#f26a5b"/><path d="m177.84375 98.035156-57.617188-93.289062c-1.820312-2.949219-5.042968-4.746094-8.507812-4.746094-3.46875 0-6.6875 1.796875-8.507812 4.746094l-57.617188 93.289062c-1.90625 3.082032-1.992188 6.957032-.226562 10.125 1.769531 3.164063 5.109374 5.128906 8.734374 5.128906h15.671876v149.589844c0 5.519532 4.480468 10 10 10h63.886718c5.523438 0 10-4.480468 10-10v-149.589844h15.675782c3.625 0 6.964843-1.960937 8.730468-5.128906 1.765625-3.167968 1.679688-7.042968-.222656-10.125zm-34.183594-4.746094c-5.523437 0-10 4.476563-10 10v149.589844h-43.886718v-139.589844h11.996093c5.523438 0 10-4.476562 10-10 0-5.523437-4.476562-10-10-10h-29.738281l39.6875-64.257812 39.6875 64.257812zm0 0"/><path d="m206.5 365.101562h85.542969c17.957031 0 32.660156 13.921876 33.914062 31.558594l76.898438-37.335937c-6.03125-27.367188-30.410157-47.996094-59.566407-49.285157h-121.417968c-20.488282.90625-38.621094 11.363282-49.683594 26.996094 14.472656 5.042969 26.597656 15.089844 34.3125 28.066406zm0 0" fill="#bbb8c7"/><path d="m326.875 396.214844 84.269531-40.914063c14.914063-8.542969 33.867188-3.566406 42.421875 11.332031 8.542969 14.929688 0 31.074219-11.347656 42.421876 0 0-119.828125 92.945312-166.441406 92.945312-46.609375 0-206.445313-31.074219-206.445313-31.074219v-71.324219" fill="#fedbab"/><path d="m178.546875 433.101562h113.496094c18.777343 0 34-15.222656 34-34 0-18.777343-15.222657-34-34-34h-85.542969c-11.265625-18.949218-31.941406-31.652343-55.589844-31.652343-.738281 0-1.472656.011719-2.207031.039062-27.679687.925781-51.003906 21.046875-57.082031 48.070313l-.800782 3.542968h-21.488281v48" fill="#fedbab"/><path d="m141.210938 443.101562c-.652344 0-1.3125-.0625-1.953126-.191406-.640624-.128906-1.269531-.320312-1.867187-.570312-.613281-.25-1.191406-.558594-1.730469-.917969-.550781-.371094-1.0625-.78125-1.519531-1.242187-.460937-.46875-.882813-.980469-1.242187-1.53125-.359376-.539063-.667969-1.117188-.917969-1.71875-.25-.601563-.441407-1.230469-.570313-1.871094-.132812-.648438-.199218-1.296875-.199218-1.957032 0-.652343.066406-1.3125.199218-1.953124.128906-.636719.320313-1.269532.570313-1.867188.25-.601562.558593-1.191406.917969-1.730469.359374-.550781.78125-1.0625 1.242187-1.519531.457031-.460938.96875-.882812 1.519531-1.242188.539063-.359374 1.117188-.667968 1.730469-.917968.597656-.25 1.226563-.441406 1.867187-.570313 1.292969-.261719 2.621094-.261719 3.902344 0 .640625.128907 1.269532.320313 1.878906.570313.601563.25 1.179688.558594 1.71875.917968.550782.359376 1.0625.78125 1.519532 1.242188.460937.457031.882812.96875 1.25 1.519531.363281.550781.671875 1.128907.921875 1.730469.25.597656.441406 1.230469.570312 1.867188.128907.640624.191407 1.300781.191407 1.953124 0 .660157-.0625 1.308594-.191407 1.957032-.128906.640625-.320312 1.269531-.570312 1.871094-.25.601562-.558594 1.179687-.921875 1.71875-.367188.550781-.789063 1.0625-1.25 1.53125-.457032.460937-.96875.871093-1.519532 1.242187-.539062.359375-1.117187.667969-1.71875.917969-.609374.25-1.238281.441406-1.878906.570312s-1.300781.191406-1.949218.191406zm0 0"/><path d="m10 369.042969h59.332031v121.332031h-59.332031zm0 0" fill="#0082a0"/><path d="m462.238281 361.652344c-10.726562-18.679688-34.148437-25.667969-53.378906-16.441406-7.640625-18.46875-22.695313-32.921876-41.289063-40.152344 3.078126-2.117188 6.011719-4.519532 8.734376-7.246094h.003906c29.601562-29.601562 21.242187-83.644531 20.871094-85.929688-.691407-4.25-4.023438-7.582031-8.273438-8.273437-2.285156-.371094-56.328125-8.730469-85.933594 20.871094-.765625.769531-1.507812 1.550781-2.226562 2.351562v-31.503906c49.3125-5.027344 87.917968-46.796875 87.917968-97.410156 0-53.992188-43.925781-97.917969-97.914062-97.917969-53.992188 0-97.917969 43.925781-97.917969 97.917969 0 50.613281 38.605469 92.382812 87.917969 97.410156v21.875c-1.644531-2.070313-3.410156-4.066406-5.316406-5.972656-34-33.996094-96.335938-24.351563-98.972656-23.921875-4.25.6875-7.582032 4.019531-8.269532 8.269531-.429687 2.636719-10.078125 64.976563 23.917969 98.972656 3.316406 3.316407 6.90625 6.21875 10.675781 8.753907-13.222656 4.089843-25.191406 11.808593-34.292968 22.273437-5.699219-1.394531-11.597657-2.128906-17.578126-2.128906-.855468 0-1.703124.015625-2.546874.042969-30.546876 1.027343-56.859376 22.019531-65.410157 51.613281h-3.621093v-6.0625c0-5.523438-4.480469-10-10-10h-59.335938c-5.523438 0-10 4.476562-10 10v121.332031c0 5.523438 4.476562 10 10 10h59.335938c5.519531 0 10-4.476562 10-10v-7.351562c38.277343 7.246093 156.398437 28.976562 196.441406 28.976562 21.59375 0 56.316406-15.726562 106.144531-48.085938 35.722656-23.195312 66.125-46.722656 66.425781-46.957031.332032-.257812.644532-.535156.941406-.828125 17.570313-17.570312 22.414063-37.929687 12.949219-54.476562zm-145.121093-123.027344c16.878906-16.878906 47.167968-17.011719 61.152343-16.035156 1.15625 16.308594-.355469 45.332031-16.105469 61.082031-11.792968 11.792969-30.125 15.410156-44.871093 16.1875l11.496093-11.496094c3.902344-3.90625 3.90625-10.238281 0-14.140625-3.90625-3.90625-10.238281-3.90625-14.144531-.003906l-13.710937 13.714844c.007812-1.277344-.003906-2.59375-.027344-3.941406.722656-14.832032 4.289062-33.445313 16.210938-45.367188zm-104.285157-140.707031c0-42.964844 34.953125-77.917969 77.917969-77.917969 42.960938 0 77.914062 34.953125 77.914062 77.917969 0 42.964843-34.949218 77.914062-77.914062 77.914062s-77.917969-34.953125-77.917969-77.914062zm-25.703125 108.3125c15.894532-1.273438 53.304688-1.714844 74.160156 19.140625 14.472657 14.472656 18.667969 37.058594 19.460938 54.804687v6.003907l-32.925781-32.921876c-3.902344-3.90625-10.234375-3.90625-14.140625 0-3.90625 3.902344-3.90625 10.234376 0 14.140626l32.640625 32.640624h-.464844c-18.265625-.21875-43.730469-3.753906-59.605469-19.628906-20.78125-20.78125-20.375-58.273437-19.125-74.179687zm34.972656 113.808593h120.957032c21.671875 1.039063 40.335937 14.625 47.792968 33.996094l-58.15625 28.238282c-6.621093-15.9375-22.347656-27.171876-40.65625-27.171876h-80.117187c-6.222656-8.800781-14.242187-16.066406-23.378906-21.40625 9.1875-8.117187 21.082031-13.054687 33.558593-13.65625zm-162.769531 160.335938h-39.332031v-101.332031h39.335938v101.332031zm376.242188-78.820312c-33.027344 25.550781-124.554688 90.445312-159.796875 90.445312-39.199219 0-163.464844-23.082031-196.445313-29.339844v-67.558594h11.488281c4.679688 0 8.730469-3.242187 9.757813-7.800781l.796875-3.546875c5.164062-22.941406 24.761719-39.503906 47.667969-40.273437.621093-.019531 1.242187-.03125 1.867187-.03125 19.175782 0 37.183594 10.253906 46.996094 26.765625 1.800781 3.03125 5.066406 4.886718 8.59375 4.886718h85.542969c13.234375 0 24 10.769532 24 24.003907s-10.765625 24-24 24h-113.496094c-5.523437 0-10 4.476562-10 10 0 5.523437 4.476563 10 10 10h113.496094c22.960937 0 41.871093-17.679688 43.832031-40.140625 0 0 80.042969-38.871094 80.238281-38.984375 10.121094-5.796875 23.035157-2.371094 28.777344 7.621093 6.597656 11.535157-3.964844 24.488282-9.316406 29.953126zm0 0"/></svg>`
            $body.innerHTML += str;

        },
        createSeasonsPage: function () {
            let $season = document.querySelector(".season-card-container")

            if ($season === null) {

            } else {
                this.populateSeasonsPage($season);
            }
        },
        populateSeasonsPage: function ($season) {
            let str = "";

            seasons.forEach(season => {
                let imgStr = "";
                season.image.forEach(imgUrl => {
                    imgStr += `
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

            } else {
                this.populateExamples($examples);
            }
        },
        populateExamples: function ($examples) {
            let str = "";
            let exampleType = "";
            let url = window.location.pathname
            if (url == "/dienst_seizoensdecoratie_index.html") {
                exampleType = "season";
            } else if (url == "/dienst_gepersonaliseerd_bloemwerk_index.html") {
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
        createBasket() {
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
                        <p class="subtotal">€0</p>
                    </div>
                    <a class="shopping-bottom-action" href="checkout_index.html">Naar betalen</a>
                </section>
            </div>
        </article>`

            this.populateBasket();


        },
        populateBasket() {
            let str = "";
            let $shopping = document.querySelectorAll(".shopping-list")

            //get the orders that need to be shown in the basket, from localstorage
            let previous = "";
            if (localStorage.getItem('basketOrders')) {
                previous = JSON.parse(localStorage.getItem('basketOrders'))
            }
            this.basketOrders = [];
            this.basketOrders.push(...previous)

            //prepare the innerHTML per order to be shown in the basket, with data we pulled from localestorage
            let subTot = 0;
            if (this.basketOrders == null) {

            } else if (this.basketOrders != null) {
                this.basketOrders.forEach(order => {
                    let orderedProduct = products[order.orderedProduct]
                    subTot = subTot + order.amount * orderedProduct.price.value
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

                $shopping.forEach(list => {
                    list.innerHTML = str
                })
            this.orderOverview = str; //innerHTML is stored for later use, checkout 'these are the ordered items'

            //add the subtotal to the end of the basket AND add the number of orders to the basket icon
            subTot = "€" + subTot;
            document.querySelectorAll(".subtotal").forEach(subtot => {subtot.innerHTML = subTot});
            //document.querySelector('.checkout-overview p').innerHTML = subTot;
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
        formFunction(e, f) {
            e.preventDefault();
            this.formHandling(f);
            return false
        },
        formHandling(f) {


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
                } else {}
            })
            order.orderedProduct = id;

            //push new order 
            this.basketOrders = [];
            this.basketOrders.push(order)

            //get the old orders from the localestorage and add these to the new order
            let previous = "";
            if (localStorage.getItem('basketOrders')) {
                previous = JSON.parse(localStorage.getItem('basketOrders'))
            }
            this.basketOrders.push(...previous)


            //inject the orders(inc. the new order back to locale storage) this will be used to create the basket
            localStorage.setItem('basketOrders', JSON.stringify(this.basketOrders))

            //now we have stored the orders, we can use them to populate the basket
            this.populateBasket();

        },
        //subfunctions:
        //show the navItems when the users clicks on the hamburgericon
        goTopFunction() {

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            })
            // document.body.scrollTop = 0;
            // document.documentElement.scrollTop = 0;
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


            //get the data that would be loaded in the basket
            //get the orders that need to be shown in the basket, from localstorage
            let previous = "";
            if (localStorage.getItem('basketOrders')) {
                previous = JSON.parse(localStorage.getItem('basketOrders'))
            }
            this.basketOrders = [];
            this.basketOrders.push(...previous)


            if (parseInt(del.id) > -1) {
                this.basketOrders.splice(parseInt(del.id), 1);
            }

            //inject the orders(inc. the new order back to locale storage) this will be used to create the basket
            localStorage.setItem('basketOrders', JSON.stringify(this.basketOrders))


            //now we have stored the orders, we can use them to populate the basket
            this.populateBasket();



        },
        shippingAdress(event, x) {

            if (x.checked) {
                document.querySelector('.second-adres').classList.add('hidden')
            } else {
                document.querySelector('.second-adres').classList.remove('hidden')
            }

        },

        showNav() {

            if (this.$navItems.classList.contains('hidden')) {
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
            this.$checkoutCheck = document.querySelector('.checkout-check #sameadres')
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
                })
            }

            this.$forms.forEach(form => {

                form.addEventListener('submit', (event) => {
                    this.formFunction(event, form);
                })
            })

            if (this.$checkoutCheck != null) {
                this.$checkoutCheck.addEventListener('change', (event) => {
                    this.shippingAdress(event, this.$checkoutCheck);
                })
            }


        }
    };
    app.initialize();
})();