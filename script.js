// const signInbtn = document.querySelector(".btn-signIN");
// signInbtn.addEventListener("click", function () {
//     const username = document.getElementById("username").value.trim();
//     const password = document.getElementById("password").value.trim();
//     if (username === "admin" && password === "admin123") {
//         alert("Sign In Successful!");
//         window.location.href = "issues.html";
//     } else {
//         alert("Sign In failed");
//     }
// })

let currentStatus = "all";

const container = document.getElementById("issues-container");
const issuesNo = document.getElementById("issuesNo");

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");


const labelObject = {
    "bug": {
        icon: "fa-solid fa-bug",
        bg: "bg-red-100",
        text: "text-red-600",
        border: "border-red-300"
    },
    "help wanted": {
        icon: "fa-solid fa-life-ring",
        bg: "bg-orange-100",
        text: "text-orange-700",
        border: "border-orange-300"
    },
    "enhancement": {
        icon: "fa-solid fa-wand-magic-sparkles",
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-300"
    },
    "documentation": {
        icon: "fa-solid fa-file",
        bg: "bg-pink-100",
        text: "text-pink-700",
        border: "border-pink-300"
    },
    "good first issue": {
        icon: "fa-solid fa-thumbs-up",
        bg: "bg-violet-100",
        text: "text-violet-700",
        border: "border-violet-300"
    }

};

let allIssues = [];

const loadAllIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(json => {
            allIssues = json.data;
            displayAllIssues(allIssues);
        })

};


function toggleStyle(id) {
    allBtn.classList.remove('bg-[#4A00FF]', 'text-white');
    openBtn.classList.remove('bg-[#4A00FF]', 'text-white');
    closedBtn.classList.remove('bg-[#4A00FF]', 'text-white');

    allBtn.classList.add('bg-white', 'text-gray-400');
    openBtn.classList.add('bg-white', 'text-gray-400');
    closedBtn.classList.add('bg-white', 'text-gray-400');

    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-gray-400');
    selected.classList.add('bg-[#4A00FF]', 'text-white');

    currentStatus = id;

    filterIssues();
}


function filterIssues() {
    let filtered = allIssues;
    if (currentStatus === "open-btn") {
        filtered = allIssues.filter(issue => issue.status === "open");
    } else if (currentStatus === "closed-btn") {
        filtered = allIssues.filter(issue => issue.status === "closed");
    }
    displayAllIssues(filtered);
}


function displayAllIssues(issues) {
    container.innerHTML = "";
    issuesNo.textContent = issues.length;

    issues.forEach(issue => {
        const labelsContent = issue.labels.map(label => {
            const data = labelObject[label] || {
                icon: "fa-solid fa-tag",
                bg: "bg-gray-100",
                text: "text-gray-700",
                border: "border-gray-300"
            };

            return `<p class="flex items-center text-[10px] rounded-full border ${data.border} ${data.bg} ${data.text} font-medium py-1.5 px-2 gap-1">
                        <span><i class="${data.icon}"></i></span> ${label.toUpperCase()}
                    </p>`;
        }).join("");

        const borderColor = issue.status === "open" ? "border-t-green-600" : "border-t-purple-600";
        const priorityColor = {};

        if (issue.priority === "high") {
            priorityColor.text = "text-red-600";
            priorityColor.bg = "bg-red-100";
        }
        else if (issue.priority === "medium") {
            priorityColor.text = "text-orange-600";
            priorityColor.bg = "bg-orange-100";
        }
        else if (issue.priority === "low") {
            priorityColor.text = "text-gray-600";
            priorityColor.bg = "bg-gray-100";
        }

        const statusImg = issue.status === "open"
            ? "./assets/Open-Status.png" : "./assets/Closed-Status.png";


        const allIssuesDiv = document.createElement("div");
        allIssuesDiv.classList.add("card");
        allIssuesDiv.innerHTML = `
            <div class="rounded-md border-t-2 ${borderColor} p-4 shadow-md h-full">
                <div class="flex items-center justify-between">
                      <img class="status-img" src="${statusImg}" alt="">
                    <p class="status_text text-[12px] rounded-2xl py-1.5 px-6 ${priorityColor.bg} ${priorityColor.text}">
                        ${issue.priority.toUpperCase()}
                    </p>
                </div>
                <div class="mt-3 mb-4">
                    <h2 class="card-title font-semibold">${issue.title}</h2>
                    <p class="title-text text-[12px] text-gray-400">${issue.description}</p>
                    <div class="flex gap-2 mt-3">
                        ${labelsContent}
                    </div>
                </div>
                <hr class="border border-gray-300">
                <div class="my-4">
                    <p class="text-[12px] text-gray-400">
                        #${issue.id} <span>${issue.author}</span>
                    </p>
                    <p class="text-[12px] text-gray-400">${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        container.appendChild(allIssuesDiv);
    });
}
loadAllIssues();


allBtn.addEventListener("click", () => toggleStyle("all-btn"));
openBtn.addEventListener("click", () => toggleStyle("open-btn"));
closedBtn.addEventListener("click", () => toggleStyle("closed-btn"));