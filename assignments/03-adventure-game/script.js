let roomDiv = document.querySelector("#roomObj");

const roomObject = { //an room object that contains each specific room object
    backyard: { //each specific room object contains five properties 
        name: "Backyard",
        description: "A habitat that brings forth many recognizable backyard birds",
        image: "https://cdn.mos.cms.futurecdn.net/4ijgtjJ8kw6TJHUGmSSeEG.jpg",
        linkedRooms: ["marsh", "arctic"],
        randomItems: ["Bird Whisperer (skill)", "Binoculars (item)"]
    },
    marsh: {
        name: "Marsh",
        description: "A habitat full of a variety of marsh birds",
        image: "https://visitfairfield.com/wp-content/uploads/birds-in-flight-suisun-marsh.jpg",
        linkedRooms: ["forest", "backyard"],
        randomItems: ["Bird Field Guide (item)", "Bird Seed (item)"]
    },
    forest: {
        name: "Forest",
        description: "A habitat containing numerous birds of the forest",
        image: "https://cdn.prod.website-files.com/623236d8ac23bb57bd352b40/623239955cdcbe16034cc9eb_Ara_chloropterus_-Peru_-flying-8e.jpeg",
        linkedRooms: ["arctic", "marsh"],
        randomItems: ["Mimicry (skill)", "One with the Bird (skill)"]
    },
    arctic: {
        name: "Arctic",
        description: "A habitat where birds of the arctic reside",
        image: "https://images.squarespace-cdn.com/content/v1/5bc75d83e4afe931ade4f0d8/1653594656674-Z7Y5HLLKMDJJJRV32WQG/unsplash-image-lf0_ZqMI0ZA.jpg",
        linkedRooms: ["backyard", "forest"],
        randomItems: ["Feather (item)", "Bird Perch (skill)"]
    }
};

let currentRoom = roomObject["backyard"]; //the room the game starts on

let inventory = []; //an array that eventually holds all inventory items 
let inventoryList = document.createElement("ul");
let announcementP = document.createElement("p");

function navButtonClick(e) { //function for the buttons, allows for proper navigation
    console.log(e.target.innerHTML);
    currentRoom = roomObject[e.target.innerHTML];
    renderRooms(currentRoom);
}

function addToInventory(e) { //function for clicking and gaining inventory items 
    let roomDiv3 = document.createElement("div");
    roomDiv3.id = "div3";
    roomDiv.append(roomDiv3);
    
    if (currentRoom.randomItems.length === 0) { //when there are no items left in a room
        announcementP.innerHTML = "All items/skills picked up in this room!";
        roomDiv3.append(announcementP);
        roomDiv3.append(inventoryList);
        return;
    }
    
    let index = Math.floor(Math.random() * currentRoom.randomItems.length); //randomizes the index of the randomItems array
    let item = currentRoom.randomItems[index];

    inventory.push(item);
    console.log(e.target.src);
    console.log(inventory);

    let itemsLeft = []; //an array that holds the remaining items not yet shown
    for (let i = 0; i < currentRoom.randomItems.length; i++) { //a for loop that pushes a random item from that room to itemsLeft by index
        if (i != index) {
            itemsLeft.push(currentRoom.randomItems[i]);
        }
    }
    currentRoom.randomItems = itemsLeft;

    announcementP.innerHTML = `You got ${item} Inventory Item/Skill!`; //announcement received when image is clicked
    roomDiv3.append(announcementP);

    let listItems = document.createElement("li"); 
    listItems.innerHTML = item; //puts items in a list
    inventoryList.append(listItems);
    roomDiv3.append(inventoryList); 
}

function renderRooms(room) { //function that renders the rooms
    roomDiv.innerHTML = "";

    let roomDiv2 = document.createElement("div");
    roomDiv2.id = "div2";
    roomDiv.append(roomDiv2);

    let roomHeading = document.createElement("h1"); 
    roomHeading.innerHTML = room.name; //room.name property is the room heading
    roomDiv.append(roomHeading);

    let roomDesc = document.createElement("p");
    roomDesc.innerHTML = room.description; //room.description property is the room description
    roomDiv2.append(roomDesc);

    let roomImage = document.createElement("img");
    roomImage.src = room.image; //room.image is the image source for the room image
    roomImage.addEventListener("click", addToInventory); //allows for the image to be clicked on
    roomDiv.append(roomImage);

    for (let i = 0; i < room.linkedRooms.length; i++) { //allows for the iteration through the linkedRooms array through the room objects
        let navButton = document.createElement("button");
        navButton.innerHTML = room.linkedRooms[i];
        navButton.addEventListener("click", navButtonClick); //allows for the buttons to be clicked
        roomDiv2.append(navButton);
    }
}

renderRooms(currentRoom); //renders current room