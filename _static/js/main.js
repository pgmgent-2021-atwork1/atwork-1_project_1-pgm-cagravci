/* 
Ailiv
-------------------------
Naam: Avci Cagri
created: 15/11/2020
*/


(() => {
    
    const app = {
        initialize: function () {

            this.createWebshopItems();
            //chashe html elements
            this.cacheElements();
            //add click events 
            this.registerListeners();

        },
        createWebshopItems:function () {
            //grab webshop element
            let $cardContainer = document.querySelector(".webshop-cards")
            console.log($cardContainer);
           
            let tempStr = "";

            //make a section per product in data.js{products}
            products.forEach(product => {
                tempStr += `
                <section class="card">
                    <img src="${product.image.url}" alt="${product.image.alt}">
                    <div class="card-info">
                        <a href="../product/boeket/index.html">
                            <h4>${product.name} - ${product.type}</h4>
                        </a>
                        <p class="price">${product.price.symbol}${product.price.value}</p>
                    </div>
                </section>
                `
            });
            //add the created string to the innerHTML om the container
            $cardContainer.innerHTML = tempStr;

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

