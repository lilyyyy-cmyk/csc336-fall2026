const roomObject = {};

const roomExits = {
    gateExit: "Exits to the Nexus",
    portalExit1: "Exits to the Marsh",
    waterExit: "Exits to the Backyard",
    portalExit2: "Exits to the Forest",
    forestFloorExit: "Exits to the Marsh",
    portalExit3: "Exits to the Arctic",
    iceCaveExit: "Exits to the Nexus"
};

let room1 = {
    name: "Backyard",
    description: "A habitat that brings forth many recognizable backyard birds",
    room1Exits: [roomExits.gateExit, roomExits.portalExit1]
};

let room2 = {
    name: "Marsh",
    description: "A habitat full of a variety of marsh birds",
    room2Exits: [roomExits.waterExit, roomExits.portalExit2]
};

let room3 = {
    name: "Forest",
    description: "A habitat containing numerous birds of the forest",
    room3Exits: [roomExits.forestFloorExit, roomExits.portalExit3]
};

let room4 = {
    name: "Arctic",
    description: "A habitat where birds of the arctic reside",
    room4Exits: [roomExits.iceCaveExit]
};

function addRoomsToDiv (room) {
    let roomDiv = document.querySelector("#roomObj");

    let room1Div = document.newElement("div");
    let room1Heading = document.newElement("h1");
    room1Heading.innerHTML = room1.name;
    let room1Desc = document.newElement("p");
    room1Desc.innerHTML = room1.description;
    room1Div.append(room1Heading, room1Desc, room1.room1Exits);
    roomDiv.append(room1Div);
};

roomDiv.append(roomObject);