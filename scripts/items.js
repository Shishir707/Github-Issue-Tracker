
const itemsContainer = document.getElementById("showItems");


// For all items loading and displaying
const loadItems = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const allData = data.data;
            displayItems(allData);
        });
};

loadItems();


// For Button Selected State
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
    });
});


// For Open Items
function openData() {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const open = data.data.filter(item => item.status === "open");
            displayItems(open);
        });
}


// For Closed Items
function closedData() {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const closed = data.data.filter(item => item.status === "closed");
            displayItems(closed);
        });
}



// Dynamic display Function
const displayItems = (Items) => {
    const itemsContainer = document.getElementById("showItems");
    itemsContainer.innerHTML = "";

    const issueCount = document.getElementById("issueCount");

    issueCount.textContent = Items.length;

    const colors = {
        high: "bg-red-100 text-red-600",
        medium: "bg-yellow-100 text-yellow-600",
        low: "bg-gray-100 text-gray-600"
    };

    const imageLinks = {
        open: "./assets/Open-Status.png",
        closed: "./assets/Closed- Status .png"
    };

    const labelColors = {
        bug: "bg-red-100 text-red-600",
        "help wanted": "bg-yellow-100 text-yellow-600",
        enhancement: "bg-green-100 text-green-600"
    };

    const border = {
        open: "border-indigo-200 border-t-green-500 border-t-4",
        closed: "border-indigo-200 border-t-purple-500 border-t-4"
    }

    Items.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("p-4", "bg-white", "rounded-md", "shadow-md", "gap-4");
        itemElement.classList.add(...border[item.status].split(" "));
        itemElement.innerHTML =
            `<div>
                    <div class="flex justify-between">
                        <img src="${imageLinks[item.status]}" alt="open status" class="w-6 h-6 rounded-full" />
                        <p class="${colors[item.priority]} px-4 rounded-md"">${item.priority.toUpperCase()}</p>
                    </div>

                    <h2 class="text-xl font-semibold">${item.title}</h2>
                    <p class="text-gray-600">${item.description}</p>
                    <div class="flex gap-2 mt-4">
                    ${item.labels.map(label => {
                const color = labelColors[label.toLowerCase()] || "bg-gray-100 text-gray-600";
                return `<p class="${color} px-3 rounded-xl shadow-md">${label.toUpperCase()}</p>`;
            }).join("")}
                    </div>                  
                    <hr class="mt-4 text-gray-400 shadow-md">
                    <p class="text-sm text-gray-500 mt-2">${item.author}</p>
                    <p class="text-sm text-gray-500 mt-2">${item.updatedAt}</p>
                </div>`;
        itemsContainer.appendChild(itemElement);
    });
}


// For Search Functionality
const searchInput = document.getElementById("searchText");
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchTerm}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const searchResults = data.data;
            displayItems(searchResults);
        });
});


// For show Dialog Box
function showDialog(id) {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const item = data.data;
            console.log(item);

            const statusColors = {
                open: "bg-green-400",
                closed: "bg-purple-400"
            };


            const priorityColors = {
                high: "bg-red-100 text-red-600",
                medium: "bg-yellow-100 text-yellow-600",
                low: "bg-gray-100 text-gray-600"
            };

            const labelColors = {
                bug: "bg-red-100 text-red-600",
                "help wanted": "bg-yellow-100 text-yellow-600",
                enhancement: "bg-green-100 text-green-600"
            };

            const dialog = document.createElement("dialog");
            dialog.classList.add("modal");

            dialog.innerHTML = `
                <div class="modal-box">
                    <h3 class="text-lg font-bold mb-2">${item.title}</h3>

                    <div class="flex gap-2 items-center">
                        <p class="px-4 rounded-xl text-sm ${statusColors[item.status]}">
                            ${item.status.toUpperCase()}
                        </p>
                        <p class="text-gray-400 text-sm">- Opened by <span>${item.author}</span></p>
                        <p class="text-gray-400 text-sm">- ${new Date(item.updatedAt).toLocaleDateString()}</p>
                    </div>

                    <div class="label flex gap-2 mt-4 items-center">
                        ${item.labels.map(label => `
                            <p class="px-3 rounded-xl shadow-md text-sm ${labelColors[label.toLowerCase()] || 'bg-gray-100 text-gray-600'}">
                                ${label.toUpperCase()}
                            </p>
                        `).join("")}
                    </div>

                    <p class="py-4 text-gray-500">${item.description}</p>

                    <div>
                        <div class="flex gap-4 justify-evenly">
                            <p class="text-gray-400 text-sm">Assignee:</p>
                            <p class="text-gray-400 text-sm">Priority:</p>
                        </div>
                        <div class="flex gap-4 justify-evenly">
                            <p class="text-sm font-semibold">${item.assignee || "Unassigned"}</p>
                            <p class="text-sm font-semibold ${priorityColors[item.priority]}">${item.priority.toUpperCase()}</p>
                        </div>
                    </div>

                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            `;

            document.body.appendChild(dialog);
            dialog.showModal();

            dialog.addEventListener("close", () => dialog.remove());
        });
}

showDialog(1);