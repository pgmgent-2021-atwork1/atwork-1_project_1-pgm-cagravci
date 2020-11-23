/* 
Ailiv
-------------------------
Naam: Avci Cagri
created: 15/11/2020
*/

(() => {
    const app = {
        initialize: function () {


            //chashe html elements
            this.cacheElements();
            //add click events 
            this.registerListeners();

        },
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

