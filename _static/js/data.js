let navItems = [
    {
        name:"home",
        path: "index.html"
    },
    {
        name:"gepersonaliseerd bloemwerk",
        path: "dienst_gepersonaliseerd_bloemwerk_index.html"
    },
    {
        name:"trouwboeketten",
        path: "#"
    },
    {
        name:"seizoensdecoratie",
        path: "dienst_seizoensdecoratie_index.html"
    },
    {
        name:"rouwwerk",
        path: "#"
    },
    {
        name:"aankleding",
        path: "#"
    },
    {
        name:"webshop",
        path: "webshop_index.html"
    },

]

const products = [
    {   
        id: "0000",
        name: "boeket",
        type: "small",
        price: {
            value: 20,
            currency: "EUR",
            symbol: "€",
        },
        image: {
            url: "_static/media/images/flowers_webshop_small.png",
            alt: "boeket small"
        },

    },
    {   
        id: "0001",
        name: "boeket",
        type: "medium",
        price: {
            value: 30,
            currency: "EUR",
            symbol: "€",
        },
        image: {
            url: "_static/media/images/flowers_webshop_medium.png",
            alt: "boeket medium"
        },

    },
    {   
        id: "0002",
        name: "boeket",
        type: "large",
        price: {
            value: 50,
            currency: "EUR",
            symbol: "€",
        },
        image: {
            url: "_static/media/images/flowers_webshop_large.png",
            alt: "boeket large"
        },

    },
]

let seasons = [
    {
        season: "lente",
        description:"In de lente komt alles tot bloei",
        image: [
            "_static/media/images/flowers_lente.jpg"
        ]
    },
    {
        season: "Pasen",
        description:"Paasbloemen",
        image: [
            "_static/media/images/flowers_pasen.jpg"
        ]
    },
    {
        season: "Zomer",
        description:"Zomerbloemen",
        image: [
            "_static/media/images/flowers_zomer.jpg"
        ]
    },
    {
        season: "Kerst",
        description:"",
        image: [
            "_static/media/images/flowers_kerst1.jpg",
            "_static/media/images/flowers_kerst2.jpg",
            "_static/media/images/flowers_kerst3.jpg",
            "_static/media/images/flowers_kerst4.jpg",
            "_static/media/images/flowers_kerst5.jpg",
            "_static/media/images/flowers_kerst6.jpg"
        ]
    }
]

let examples = [
    {
        type: "season",
        images: [
            "_static/media/images/flowers_examples1.jpeg",
            "_static/media/images/flowers_examples2.jpeg",
            "_static/media/images/flowers_examples3.jpeg"
        ]
    },
    {
        type: "personalised",
        images: [
            "_static/media/images/flowers_examples4.png",
            "_static/media/images/flowers_examples5.png",
            "_static/media/images/flowers_examples6.png",
            "_static/media/images/flowers_examples7.png",
        ]
    }
]

let basketOrders = [
    {
        productId: "0001",
        amount:2,
        color:"white",
        vase:false,
        binding:"short",
        orderedProduct:1

    },
    {
        productId: "0001",
        amount:2,
        color:"white",
        vase:false,
        binding:"short",
        orderedProduct:0

    }
]