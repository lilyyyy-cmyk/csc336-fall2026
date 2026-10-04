//root div 
const rootDiv = document.querySelector("#root");

//card objects
const objArray = [
    {
        name: "Bird Nocs",
        price: 200,
        description: "Specialized Binoculars for Birding",
        image: "",
        category: "Recreational"
    },

    {
        name: "Bird Field Guide",
        price: 18,
        description: "Field Guide of Birds in your Area",
        image: "",
        category: "Books"
    },

    {
        name: "Bird Seed",
        price: 11,
        description: "Mix of Grains, Nuts, and Seeds to Feed Wild Birds",
        image: "",
        category: "Nutrition"
    },

    {
        name: "Bird Stickers",
        price: 2,
        description: "A Pack of Various Bird Stickers",
        image: "",
        category: "Crafts"
    },

    {
        name: "Bird Plush",
        price: 15,
        description: "A Various Bird Plush",
        image: "",
        category: "Toys"
    },

    {
        name: "Bird Feeder",
        price: 25,
        description: "A Hanging Perch from Which Birds can Feed",
        image: "",
        category: "Perches"
    }
];

//top header organization
const topHeaderDiv = document.createElement("div");
topHeaderDiv.id = "header";

const topHeader = document.createElement("h1");
topHeader.innerHTML = "All Things Bird";
topHeaderDiv.append(topHeader);
rootDiv.append(topHeaderDiv);

//encapsulation div
const encapsuleDiv = document.createElement("div");
encapsuleDiv.id = "encapsule";
rootDiv.append(encapsuleDiv);

//main shop organization 
const mainShopDiv = document.createElement("div");
mainShopDiv.id = "mainShop";

const mainShopHeader = document.createElement("h1");
mainShopHeader.innerHTML = "Shop";
mainShopDiv.append(mainShopHeader);
encapsuleDiv.append(mainShopDiv)
rootDiv.append(encapsuleDiv);

//cart organization
const cartDiv = document.createElement("div");
cartDiv.id = "cart";

const cartHeader = document.createElement("h1");
cartHeader.innerHTML = "Cart";
cartDiv.append(cartHeader);
encapsuleDiv.append(cartDiv)
rootDiv.append(encapsuleDiv);