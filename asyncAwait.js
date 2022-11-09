// async function getImages() {
//     try {
//         const response = await fetch('https://picsum.photos/v2/list?page');
//         const data = await response.json();
//         return data;
//     } catch (err) {
//         console.log(err);
//     }
// }
// getImages().then(images => {
//     console.log(images);
// });

const nextButton = document.createElement(`button`);
const prevButton = document.createElement(`button`);
let apiEntries;
let index = 0;
let i = 10;
let newIndex = JSON.parse(localStorage.getItem(`index`));
let getTen;

async function sayHello() {
    try {
        const response = await fetch(`https://api.publicapis.org/entries`);
        const data = await response.json();
        apiEntries = data.entries;
        splicing(apiEntries);

    } catch {
        console.warn(`Fetch Failed`);
    }
    next(apiEntries);
    prev();
};
sayHello();

function splicing(arr) {
    if (newIndex) {
        index = newIndex;
    }
    getTen = arr.splice(index, i);
    console.log(getTen);
    getTen.forEach((entry) => {
        drawDiv(entry.Category, entry.Description, entry.Link, entry.API);
    })
}

function next(arr) {
    nextButton.addEventListener(`click`, () => {
        console.log(`clicked`);
        if (index <= arr.length) {
            newIndex = index += 10;
            console.log(`newIndex`, newIndex);
            JSON.stringify(localStorage.setItem(`index`, newIndex));
            console.log(index, i);
        }
        else {
            index = 0;
        }
        location.reload();
    })
};

function prev() {
    prevButton.addEventListener(`click`, () => {
        console.log(`clicked`);
        newIndex = index - 10;
        console.log(`newIndex`, newIndex);
        JSON.stringify(localStorage.setItem(`index`, newIndex));
        console.log(index, i);
        location.reload();
    })
};

function drawDiv(category, description, link, api) {
    const div = document.createElement(`div`);
    const pCategory = document.createElement(`p`);
    const pDescription = document.createElement(`p`);
    const aLink = document.createElement(`a`);
    div.setAttribute(`id`, `${api}`)

    pCategory.textContent = `Category: ${category}`;
    pDescription.textContent = `Description: ${description}`;
    aLink.textContent = api;
    aLink.href = link;

    div.style.width = `500px`;
    div.style.border = `1px solid black`;
    div.style.padding = `15px`;
    div.style.margin = `10px`;
    div.style.borderRadius = `15px`;

    div.appendChild(pCategory);
    div.appendChild(pDescription);
    div.appendChild(aLink);
    document.body.append(div);
};

nextButton.textContent = `Next`;
prevButton.textContent = `Prev`;

document.body.append(nextButton);
document.body.append(prevButton);

// localStorage.clear();
