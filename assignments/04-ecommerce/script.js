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
        description: "A Bird Plush",
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

const buttonDiv = document.createElement("div");
buttonDiv.id = "buttonDiv";
mainShopDiv.append(buttonDiv);

let selectedButton = document.createElement("button");
selectedButton.innerHTML = "Add Selected to Cart";
buttonDiv.append(selectedButton);

let cardCheckBox;

//card organization 
const cardDiv = document.createElement("div");
cardDiv.classList.add("card");

mainShopDiv.append(cardDiv);

//cart organization
const cartDiv = document.createElement("div");
cartDiv.id = "cart";
encapsuleDiv.append(cartDiv);

const cartHeaderDiv = document.createElement("div");
cartHeaderDiv.id = "cartHeader";

const cartHeader = document.createElement("h1");
cartHeader.innerHTML = "Cart";
cartHeaderDiv.append(cartHeader);
cartDiv.append(cartHeaderDiv);

const inCartDiv = document.createElement("div");
inCartDiv.classList = "inCart";
cartDiv.append(inCartDiv);

//more array(s)
let cardArray = [];


//shop functions, etc.
const checkbox = (obj) => {
    let cardCheckBox = document.createElement("input");
    cardCheckBox.setAttribute("type", "checkbox");
    cardCheckBox.classList.add("cardCheckbox");
    obj.checkbox = cardCheckBox;

    cardCheckBox.addEventListener("change", () => {
        if (cardCheckBox.checked) {
            obj.classList.add("selected");
            cardArray.push(obj);
        } else {
            obj.classList.remove("selected");
            cardArray = cardArray.filter((card) => card !== obj);
        }

        if (cardArray.length > 0) {
            selectedButton.innerHTML = "Add " + cardArray.length + " item(s) to Cart";
        } else {
            selectedButton.innerHTML = "Add Selected to Cart";
        }
    })
    obj.append(cardCheckBox);
}

selectedButton.addEventListener("click", () => {
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        card.classList.remove("selected");
        card.checkbox.checked = false;
        inCartDiv.append(card);
    }
    cardArray = [];
    selectedButton.innerHTML = "Add Selected to Cart";
})

const createButton = (obj) => {
    let cardButton = document.createElement("button");
    cardButton.innerHTML = "Add to Cart";
    obj.append(cardButton);

    cardButton.addEventListener("click", () => {
        inCartDiv.append(obj);
    });
}

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

    createButton(innerCardDiv);
    checkbox(innerCardDiv);
}

objArray.forEach(element => addObjToCard(element));