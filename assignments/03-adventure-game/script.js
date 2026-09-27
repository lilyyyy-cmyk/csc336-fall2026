let roomDiv = document.querySelector("#roomObj");

const roomObject = {
    room1: {
        name: "Backyard",
        description: "A habitat that brings forth many recognizable backyard birds",
        roomExits: ["gateExit"]
    },
    room2: {
        name: "Marsh",
        description: "A habitat full of a variety of marsh birds",
        roomExits: ["waterExit"]
    },
    room3: {
        name: "Forest",
        description: "A habitat containing numerous birds of the forest",
        roomExits: ["forestFloorExit"]
    },
    room4: {
        name: "Arctic",
        description: "A habitat where birds of the arctic reside",
        roomExits: ["iceCaveExit"]
    }
};

let currentRoom = roomObject["room1"];

function navButtonClick(e) {
    console.log(e.target.innerHTML);
    currentRoom = roomObject[e.target.innerHTML];
    renderRooms(currentRoom);
}

function renderRooms (room) {
    roomDiv.innerHTML = "";

    let roomHeading = document.createElement("h1");
    roomHeading.innerHTML = room.name;
    roomDiv.append(roomHeading);

    let roomDesc = document.createElement("p");
    roomDesc.innerHTML = room.description;
    roomDiv.append(roomDesc);

    for (let i = 0; i < room.roomExits.length; i++) {
        let navButton = document.createElement("button");
        navButton.innerHTML = room.roomExits[i];
        navButton.addEventListener("click", navButtonClick);
        roomDiv.append(navButton);
    }
}

renderRooms(currentRoom);