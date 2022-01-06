const imagesFolder = "./assets/images/";
const profile = {
    image: "mitchell.jpg",
    name: "Mitchell Rodriguez",
    location: "Lima, Peru",
    bio: "Developer | Cat lover | Problem Solver\nCreating solutions with Angular, JS, TS, C#, Java, and Kotlin",
    education: [
        {
            name: "Coding Dojo - Full Stack Bootcamp",
            date: "Jan 2022 - Apr 2022",
            description: "Triple black belt in Python, MERN, and Java...",
        },
    ],
    requests: {
        users: [
            {
                id: 5,
                image: "todd-s.jpg",
                name: "Todd E",
            },
            {
                id: 6,
                image: "phil-s.jpg",
                name: "Phil K",
            },
        ],
        total: 2,
    },
    connections: {
        users: [
            {
                id: 1,
                image: "adrien-s.jpg",
                name: "Adrien D",
            },
            {
                id: 2,
                image: "anne-s.jpg",
                name: "Anne J",
            },
            {
                id: 3,
                image: "alayne-s.jpg",
                name: "Alayne T",
            },
            {
                id: 4,
                image: "arry-s.jpg",
                name: "Arry Y",
            },
        ],
        total: 418,
    },
};

// Modal - Base de https://www.w3schools.com/howto/howto_css_modals.asp
const modal = document.querySelector("#editProfileModal");
const editProfile = document.querySelector("#editProfile");
const closeModal = document.querySelector("#closeModal");

// Controles de Formulario
const fullnameInput = document.querySelector("#formFullname");
const locationInput = document.querySelector("#formLocation");
const bioTextarea = document.querySelector("#formBio");
const saveButton = document.querySelector("#saveEditProfile");

// Datos de Perfil
const profileImage = document.querySelector("#profileImageContainer");
const profileName = document.querySelector("#profileNameContainer");
const profileLocation = document.querySelector("#profileLocationContainer");
const profileBio = document.querySelector("#profileBioContainer");

// Requests
const requestsCounter = document.querySelector('#requestsCounter');
const requestsContainer = document.querySelector("#requestsContainer");

// Connections
const connectionsCounter = document.querySelector('#connectionsCounter');

// Generar lista de requests y funcionalidad de botones
function generateRequestsItems() {
    // Limpiar contenedor
    requestsContainer.innerHTML = "";

    profile.requests.users.map(item => {
        const cardListItem = document.createElement('li');
        cardListItem.className = 'card-list-item';

        const dataContainer = document.createElement('div');
        dataContainer.className = 'profile-small';
        const userImage = document.createElement('img');
        userImage.src = `${imagesFolder}${item.image}`;
        userImage.alt = item.name;
        const userName = document.createElement('span');
        userName.textContent = item.name;

        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'card-actions';
        const iconAccept = document.createElement('i');
        iconAccept.className = 'fas fa-check request-action';

        const iconCancel = document.createElement('i');
        iconCancel.className = 'fas fa-times request-action';

        iconCancel.addEventListener('click', () => {
            // Remover usuario del array
            profile.requests.users = profile.requests.users.filter(user => {
                return user.id !== item.id;
            });
            
            // Repintar lista
            generateRequestsItems();
        });

        iconAccept.addEventListener('click', () => {
            // Remover usuario del array
            profile.requests.users = profile.requests.users.filter(user => {
                return user.id !== item.id;
            });

            // Repintar lista
            generateRequestsItems();

            // Actualizar contador de connections
            profile.connections.total += 1;
            connectionsCounter.textContent = profile.connections.total;
        });

        // Jerarquía de elementos
        dataContainer.append(userImage, userName);
        actionsContainer.append(iconAccept, iconCancel);
        cardListItem.append(dataContainer, actionsContainer);
        // Pintar en el DOM
        requestsContainer.appendChild(cardListItem);
    });

    // Actualizar contador de requests según el largo del array
    requestsCounter.innerHTML = profile.requests.users.length;
}

// Precargar datos en formulario
function loadFormData() {
    fullnameInput.value = profile.name;
    locationInput.value = profile.location;
    bioTextarea.value = profile.bio;
}

// Cargar datos de perfil
function loadProfileData() {
    profileImage.src = `${imagesFolder}${profile.image}`;
    profileImage.alt = profile.name;
    profileName.innerText = profile.name;
    profileLocation.innerText = profile.location;
    profileBio.innerText = profile.bio; // Importante innerText para tomar salto de línea
}

saveButton.addEventListener("click", (e) => {
    // Prevenir submit
    e.preventDefault();

    // Actualizar objeto
    profile.name = fullnameInput.value;
    profile.location = locationInput.value;
    profile.bio = bioTextarea.value;

    // Cargar datos de perfi
    loadProfileData();

    // Cerrar Modal
    modal.style.display = "none";
});

// Modal
editProfile.onclick = function (e) {
    // Prevenir redirección de anchor
    e.preventDefault();
    // Cargar datos de Formulario
    loadFormData();
    // Mostrar Modal
    modal.style.display = "block";
};

closeModal.onclick = function () {
    // Ocultar Modal
    modal.style.display = "none";
};

// Ocultar Modal al hacer clic fuera
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Función anónima autoejecutable
(function() {
    loadProfileData();
    generateRequestsItems();
})();