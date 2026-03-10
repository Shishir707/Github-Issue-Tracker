
const itemsContainer = document.getElementById("showItems");

// For all items loading and displaying
const loadItems = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
        .then(res => res.json())
        .then(data => {

            const Items = data.data;
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

            Items.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("p-4", "bg-white", "rounded-md", "shadow-md", "gap-4");
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

            const issueCount = document.getElementById("issueCount");

            issueCount.textContent = open.length;

            itemsContainer.innerHTML = "";

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

            open.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("p-4", "bg-white", "rounded-md", "shadow-md", "gap-4");
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
        });
}
