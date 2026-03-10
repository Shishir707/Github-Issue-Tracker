console.log("Items Loaded");

const loadItems = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            const Items = data.data;
            const itemsContainer = document.getElementById("showItems");
            const issueCount = document.getElementById("issueCount");

            issueCount.textContent = Items.length;

            const colors = {
                high: "bg-red-100 text-red-600",
                medium: "bg-yellow-100 text-yellow-600",
                low: "bg-gray-100 text-gray-600"
            };

            Items.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("p-4", "bg-white", "rounded-md", "shadow-md", "gap-4");
                itemElement.innerHTML =
                    `<div>
                    <div class="flex justify-between">
                        <img src="./assets/Open-Status.png" alt="open status" class="w-4 h-4 rounded-full shadow-green-500" />
                        <p class="${colors[item.priority]} px-4 rounded-md"">${item.priority.toUpperCase()}</p>
                    </div>

                    <h2 class="text-xl font-semibold">${item.title}</h2>
                    <p class="text-gray-600">${item.description}</p>
                    <div class="flex gap-2 mt-4">
                        ${item.labels.map(label =>
                        `<p class="bg-yellow-100 rounded-xl px-3">${label}</p>`
                    ).join("")}
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