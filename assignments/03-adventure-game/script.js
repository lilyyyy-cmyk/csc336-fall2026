let roomDiv = document.querySelector("#roomObj");

const roomObject = {
    backyard: {
        name: "Backyard",
        description: "A habitat that brings forth many recognizable backyard birds",
        image: "https://cdn.mos.cms.futurecdn.net/4ijgtjJ8kw6TJHUGmSSeEG.jpg",
        linkedRooms: ["marsh", "arctic"],
        randomItems: ["Bird Whisperer (skill)", "Binoculars (item)", 
                    "Bird Field Guide (item)", "Bird Seed (item)", 
                    "Mimicry (skill)", "One with the Bird (skill)"]
    },
    marsh: {
        name: "Marsh",
        description: "A habitat full of a variety of marsh birds",
        image: "https://visitfairfield.com/wp-content/uploads/birds-in-flight-suisun-marsh.jpg",
        linkedRooms: ["forest", "backyard"],
        randomItems: ["Bird Whisperer (skill)", "Binoculars (item)", 
                    "Bird Field Guide (item)", "Bird Seed (item)", 
                    "Mimicry (skill)", "One with the Bird (skill)"]
    },
    forest: {
        name: "Forest",
        description: "A habitat containing numerous birds of the forest",
        image: "https://cdn.prod.website-files.com/623236d8ac23bb57bd352b40/623239955cdcbe16034cc9eb_Ara_chloropterus_-Peru_-flying-8e.jpeg",
        linkedRooms: ["arctic", "marsh"],
        randomItems: ["Bird Whisperer (skill)", "Binoculars (item)", 
                    "Bird Field Guide (item)", "Bird Seed (item)", 
                    "Mimicry (skill)", "One with the Bird (skill)"]
    },
    arctic: {
        name: "Arctic",
        description: "A habitat where birds of the arctic reside",
        image: "https://images.squarespace-cdn.com/content/v1/5bc75d83e4afe931ade4f0d8/1653594656674-Z7Y5HLLKMDJJJRV32WQG/unsplash-image-lf0_ZqMI0ZA.jpg",
        linkedRooms: ["backyard", "forest"],
        randomItems: ["Bird Whisperer (skill)", "Binoculars (item)", 
                    "Bird Field Guide (item)", "Bird Seed (item)", 
                    "Mimicry (skill)", "One with the Bird (skill)"]
    }
};

let currentRoom = roomObject["backyard"];

let inventory = [];
let inventoryList = document.createElement("ul");
let announcementP = document.createElement("p");

function navButtonClick(e) {
    console.log(e.target.innerHTML);
    currentRoom = roomObject[e.target.innerHTML];
    renderRooms(currentRoom);
}

function addToInventory(e) {
        if (currentRoom.randomItems.length === 0) {
        return;
    }
    
    let index = Math.floor(Math.random() * currentRoom.randomItems.length);
    let item = currentRoom.randomItems[index];
    inventory.push(item);
    console.log(e.target.src);
    console.log(inventory);

        let itemsLeft = [];
    for (let i = 0; i < currentRoom.randomItems.length; i++) {
        if (i != index) {
            itemsLeft.push(currentRoom.randomItems[i]);
        }
    }
    currentRoom.randomItems = itemsLeft;

    let roomDiv3 = document.createElement("div");
    roomDiv3.id = "div3";
    roomDiv.append(roomDiv3);

    announcementP.innerHTML = `You got ${item} Inventory Item/Skill!`;
    roomDiv3.append(announcementP);

    let listItems = document.createElement("li");
    listItems.innerHTML = item;
    inventoryList.append(listItems);
    roomDiv3.append(inventoryList);
}

function renderRooms(room) {
    roomDiv.innerHTML = "";

    let roomDiv2 = document.createElement("div");
    roomDiv2.id = "div2";
    roomDiv.append(roomDiv2);

    let roomHeading = document.createElement("h1");
    roomHeading.innerHTML = room.name;
    roomDiv.append(roomHeading);

    let roomDesc = document.createElement("p");
    roomDesc.innerHTML = room.description;
    roomDiv2.append(roomDesc);

    let roomImage = document.createElement("img");
    roomImage.src = room.image;
    roomImage.addEventListener("click", addToInventory);
    roomDiv.append(roomImage);

    for (let i = 0; i < room.linkedRooms.length; i++) {
        let navButton = document.createElement("button");
        navButton.innerHTML = room.linkedRooms[i];
        navButton.addEventListener("click", navButtonClick);
        roomDiv2.append(navButton);
    }
}

renderRooms(currentRoom);