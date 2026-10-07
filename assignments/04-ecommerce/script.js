//root div 
const rootDiv = document.querySelector("#root");

//card objects
const objArray = [
    {
        name: "Bird Nocs",
        price: "$200.99",
        description: "Specialized Binoculars for Birding",
        image: "",
        category: "Recreational"
    },

    {
        name: "Bird Field Guide",
        price: "$18.99",
        description: "Field Guide of Birds in your Area",
        image: "",
        category: "Books"
    },

    {
        name: "Bird Seed",
        price: "$11.99",
        description: "Mix of Grains, Nuts, and Seeds to Feed Wild Birds",
        image: "",
        category: "Nutrition"
    },

    {
        name: "Bird Stickers",
        price: "$2.99",
        description: "A Pack of Various Bird Stickers",
        image: "",
        category: "Crafts"
    },

    {
        name: "Bird Plush",
        price: "$15.99",
        description: "A Various Bird Plush",
        image: "",
        category: "Toys"
    },

    {
        name: "Bird Feeder",
        price: "$25.99",
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

const mainShopHeaderDiv = document.createElement("div");
mainShopHeaderDiv.id = "mainShopHeader";

const mainShopHeader = document.createElement("h1");
mainShopHeader.innerHTML = "Shop";
mainShopHeaderDiv.append(mainShopHeader);
mainShopDiv.append(mainShopHeaderDiv);
encapsuleDiv.append(mainShopDiv);

//card organization 
const cardDiv = document.createElement("div");
cardDiv.classList = "card";

mainShopDiv.append(cardDiv);

//cart organization
const cartDiv = document.createElement("div");
cartDiv.id = "cart";

const cartHeader = document.createElement("h1");
cartHeader.innerHTML = "Cart";
cartDiv.append(cartHeader);
encapsuleDiv.append(cartDiv)
rootDiv.append(encapsuleDiv);

//shop functions, etc.
const addObjToCard = (product) => {
    let innerCardDiv = document.createElement("div");
    innerCardDiv.value = product;
    cardDiv.append(innerCardDiv);

    let cardHeading = document.createElement("h2");
    cardHeading.innerHTML = product.name;
    innerCardDiv.append(cardHeading);

    let cardImg = document.createElement("img");
    cardImg.innerHTML = product.image;
    innerCardDiv.append(cardImg);

    let cardPrice = document.createElement("p");
    cardPrice.innerHTML = product.price;
    innerCardDiv.append(cardPrice);

    let cardDesc = document.createElement("p");
    cardDesc.innerHTML = product.description;
    innerCardDiv.append(cardDesc);
}

for (let obj of objArray) {
    addObjToCard(obj);
}