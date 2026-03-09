
let currentStatus = "all";

const container = document.getElementById("issues-container");
const issuesNo = document.getElementById("issuesNo");

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

const searchIssue = document.getElementById("search");

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("issues-container").classList.add("hidden");

    } else {
        document.getElementById("issues-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}


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
    manageSpinner(true);

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(json => {
            allIssues = json.data;
            displayAllIssues(allIssues);
            manageSpinner(false);
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
    const input = searchIssue.value.toLowerCase();

    let filtered = allIssues;
    if (currentStatus === "open-btn") {
        filtered = allIssues.filter(issue => issue.status === "open");
    } else if (currentStatus === "closed-btn") {
        filtered = allIssues.filter(issue => issue.status === "closed");
    }

    filtered = filtered.filter(issue => {
        return (
            issue.title.toLowerCase().includes(input) ||
            issue.description.toLowerCase().includes(input)
        );
    });

    displayAllIssues(filtered);
}


function displayAllIssues(issues) {
    container.innerHTML = "";
    issuesNo.textContent = issues.length;


    issues.forEach(issue => {
        const labelsContent = issue.labels.map(label => {
            const data = labelObject[label] || {
                icon: " ",
                bg: " ",
                text: " ",
                border: " "
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



        const capTitle = issue.title
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        const allIssuesDiv = document.createElement("div");
        allIssuesDiv.classList.add("card");
        allIssuesDiv.addEventListener("click", () => {
            openModal(issue);
        });
        allIssuesDiv.innerHTML = `
            <div class="rounded-md border-t-2 ${borderColor} p-4 shadow-md h-full">
                <div class="flex items-center justify-between">
                      <img class="status-img" src="${statusImg}" alt="">
                    <p class="status_text text-[12px] rounded-2xl py-1.5 px-6 ${priorityColor.bg} ${priorityColor.text}">
                        ${issue.priority.toUpperCase()}
                    </p>
                </div>
                <div class="mt-3 mb-4">
                    <h2 class="card-title font-semibold">${capTitle}</h2>
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

function openModal(issue) {
    const statusColor = issue.status === "open" ? "bg-green-600" : "bg-purple-600";
    const priorityColor = {};
    const labelsContent = issue.labels.map(label => {
        const data = labelObject[label] || {
            icon: " ",
            bg: " ",
            text: " ",
            border: " "
        };

        return `<p class="flex items-center text-[10px] rounded-full border ${data.border} ${data.bg} ${data.text} font-medium py-1.5 px-2 gap-1">
                        <span><i class="${data.icon}"></i></span> ${label.toUpperCase()}
                    </p>`;
    }).join("");

    const statusText = issue.status === "open"
        ? "Opened" : "Closed";

    if (issue.priority === "high") {
        priorityColor.text = "text-white";
        priorityColor.bg = "bg-red-600";
    } else if (issue.priority === "medium") {
        priorityColor.text = "text-white";
        priorityColor.bg = "bg-orange-600";
    } else if (issue.priority === "low") {
        priorityColor.text = "text-white";
        priorityColor.bg = "bg-gray-600";
    }



    const capTitle = issue.title
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    let name = "";

    if (issue.assignee.length > 0) {
        name = issue.assignee;
    } else {
        name = issue.author
    }

    const capAssignee = name
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    let unAssign = "";
    if (issue.assignee.length > 0) {
        unAssign = issue.assignee;
    } else {
        unAssign = "unassigned";
    }

    const unAssignee = unAssign
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");



    const modal = document.createElement("div");


    modal.innerHTML = `
    <div class="fixed inset-0 flex items-center justify-center bg-black/50 ">
     <div class="card-modal w-[80%] md:w-[44%] p-8 bg-white rounded-lg mx-auto space-y-6">
        <h2 class="modal-title text-[24px] font-bold text-[#1F2937] mb-3">${capTitle}</h2>
        <div class="flex items-center gap-2 mb-7">
            <div>
                <p class="modal-status py-1.5 px-2 ${statusColor} text-white text-[12px] font-medium rounded-full">
                    ${statusText}</p>
            </div>
            <div class="rounded-full bg-gray-400 w-1 h-1"></div>
            <div>
                <p class=" text-gray-400 text-[12px]"><span>${statusText}</span> by <span class="asignee">${capAssignee}</span></p>
            </div>
            <div class="rounded-full bg-gray-400 w-1 h-1"></div>
            <div>
                <p class="update-date text-gray-400 text-[12px]">${new Date(issue.updatedAt).toLocaleDateString()}</span>
                </p>
            </div>
        </div>
        <div class="flex gap-2 mt-3">
                        ${labelsContent}
                    </div>
        <div>
            <p class="text-gray-400 text-[16px]">${issue.description}</p>
        </div>
        <div class="flex p-4 gap-3">
            <div class="flex-1">
                <p class="text-gray-400 text-[16px] mb-1">Assignee:</p>
                <p class="Assignee text-[#1F2937] font-semibold text-[16px]">${unAssignee}</p>
            </div>
            <div class="flex-1">
                <p class="text-gray-400 text-[16px] mb-0">Priority:</p>
                <p class="modal-priority inline-block py-1.5 px-4 text-center ${priorityColor.bg} text-white text-[12px] font-medium rounded-full">
                    ${issue.priority.toUpperCase()}</p>
            </div>
        </div>
<div class="flex justify-end items-end">
            <button
                class="btn-close bg-[#4A00FF] text-white font-semibold text-[16px] rounded-lg  py-3 px-4  hover:bg-blue-400 ">Close</button>

        </div>    </div>
    </div>
  `;

    document.body.appendChild(modal);

    modal.querySelector(".btn-close").addEventListener("click", () => {
        modal.remove();
    });
}

searchIssue.addEventListener("input", filterIssues);



