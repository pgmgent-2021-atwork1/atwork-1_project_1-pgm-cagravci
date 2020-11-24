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
                            <a href="../product_boeket/index.html?id=${product.id}">
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
            if (url === null) {

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
            


            `
          
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
                            <!-- <div class="basket-amount">0</div> -->
                        </a>
                    </div>
                </form>
            </section>`
        },
        //subfunctions:
        //show the navItems when the users clicks on the hamburgericon
        showNav(){
            let isHidden = false;

            //find out if the navbar is hidden or not
            let navItemsClass = this.$navItems.classList;
            navItemsClass.forEach(classItem => {
                if (classItem == "hidden") {
                isHidden = true;
                };
            });
            //if the navbar is hidden, the click needs to show the navbar. else it needs to hide is.
            if (isHidden) {
                this.$navItems.className = "nav_items";
            } else{
                this.$navItems.className = "nav_items hidden";

            }
        },
        cacheElements() {
            this.$hamburger = document.querySelector(".hamburger-icon");
            this.$navItems = document.querySelector(".nav_items");
        },
        registerListeners() {
            this.$hamburger.addEventListener('click', (event) => {
                this.showNav();
            });
        },
    };
    app.initialize();
})();

