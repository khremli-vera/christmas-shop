let toys = [
    {
        "title": "Большой шар с рисунком",
        "amount": 2,
        "sale_year": 1960,
        "shape": "шар",
        "color": "желтый",
        "size": "большой",
        "isFavorited": "нет",
        "img_src": "1.png"
    },
    {
        "title": "Зеленый шар с цветами",
        "amount": 5,
        "sale_year": 2000,
        "shape": "шар",
        "color": "зеленый",
        "size": "большой",
        "isFavorited": "нет",
        "img_src": "2.png"
    },
    {
        "title": "Красный матовый шар",
        "amount": 3,
        "sale_year": 1990,
        "shape": "шар",
        "color": "красный",
        "size": "большой",
        "isFavorited": "нет",
        "img_src": "3.png"
    },
    {
        "title": "Сосулька красная",
        "amount": 2,
        "sale_year": 1980,
        "shape": "фигурка",
        "color": "красный",
        "size": "большой",
        "isFavorited": "нет",
        "img_src": "4.png"
    },
    {
        "title": "Красный виноград",
        "amount": 4,
        "sale_year": 1980,
        "shape": "фигурка",
        "color": "красный",
        "size": "средний",
        "isFavorited": "нет",
        "img_src": "5.png"
    },
    {
        "title": "Красный шар с рисунком",
        "amount": 6,
        "sale_year": 2010,
        "shape": "шар",
        "color": "красный",
        "size": "большой",
        "isFavorited": "нет",
        "img_src": "6.png"
    },
    {
        "title": "Молочно-белый шар",
        "amount": 12,
        "sale_year": 1960,
        "shape": "шар",
        "color": "белый",
        "size": "средний",
        "isFavorited": "нет",
        "img_src": "7.png"
    },
    {
        "title": "Красный шар",
        "amount": 10,
        "sale_year": 2010,
        "shape": "шар",
        "color": "красный",
        "size": "малый",
        "isFavorited": "нет",
        "img_src": "8.png"
    },
    {
        "title": "Колокольчик старинный",
        "amount": 2,
        "sale_year": 1950,
        "shape": "колокольчик",
        "color": "белый",
        "size": "большой",
        "isFavorited": "нет",
        "img_src": "9.png"
    },
    {
        "title": "Белый шар ретро",
        "amount": 7,
        "sale_year": 1960,
        "shape": "шар",
        "color": "белый",
        "size": "большой",
        "isFavorited": "нет",
        "img_src": "10.png"
    }
]

let filtersList = {
    "shape": ["шар", "колокольчик", "шишка", "снежинка", "фигурка"],
    "color": ['белый', 'желтый', 'красный', 'синий', 'зеленый'],
    "size": ["большой", "средний", "малый"]
}

let userFilters = {
    "shape": [],
    "color": [],
    "size": [],
    "isFavorited": [],
    "amount": [],
    "sale_year": []
}

let filteredToysList = [];
let favorites = [];
let findToysList;

let cards = document.querySelector(".cards");
let optionsFilters = document.querySelector(".option_filters");
let toyCards;
let favoriteCounter = document.querySelector(".favourites__count");
let selectedFilter;
let notFound = document.querySelector(".not_found_text");
let favoriteCheckbox = document.querySelector(".favorite_filter__checkbox");

const ranges = [];
const numberRange = document.querySelectorAll('.number_filter input[type="range"]');
ranges.push(numberRange);
const yearRange = document.querySelectorAll('.year_filter input[type="range"]');
ranges.push(yearRange);

const resetBtn = document.querySelector(".filters__button");
let sortElement = document.querySelector(".filters__select");
let sortValue = null;

// создание карточки игрушки
function createToy(data) {
    const toy = document.createElement("div");
    toy.classList.add("toy");
    if (data.isFavorited == "да") {
        toy.innerHTML = '<svg class="toy__icon"><polyline class="polyline-favorite" points="0,0 80,0 95,20 80,40 0,40 0,0" /></svg>';
    } else {
        toy.innerHTML = '<svg class="toy__icon"><polyline points="0,0 80,0 95,20 80,40 0,40 0,0" /></svg>';
    }

    const title = document.createElement("h2");
    title.classList.add("toy__title");
    title.innerText = data.title;
    toy.append(title);

    const content = document.createElement("div");
    content.classList.add("toy__content");
    toy.append(content);

    const image = document.createElement("img");
    image.classList.add("toy__image");
    image.src = "assets/toys/" + data.img_src;
    content.append(image);

    const description = document.createElement("div");
    description.classList.add("toy__content");
    content.append(description);

    const features = document.createElement("ul");
    features.classList.add("toy__features");
    description.append(features);

    const amount = document.createElement("li");
    amount.classList.add("toy__feature");
    amount.innerHTML = `<span>Количество: </span> ${data.amount}`;
    features.append(amount);

    const sale_year = document.createElement("li");
    sale_year.classList.add("toy__feature");
    sale_year.innerHTML = `<span>Год покупки: </span> ${data.sale_year}`;
    features.append(sale_year);

    const form = document.createElement("li");
    form.classList.add("toy__feature");
    form.innerHTML = `<span>Форма: </span> ${data.shape}`;
    features.append(form);

    const color = document.createElement("li");
    color.classList.add("toy__feature");
    color.innerHTML = `<span>Цвет: </span> ${data.color}`;
    features.append(color);

    const size = document.createElement("li");
    size.classList.add("toy__feature");
    size.innerHTML = `<span>Размер: </span> ${data.size}`;
    features.append(size);

    const isFavorited = document.createElement("li");
    isFavorited.classList.add("toy__feature");
    isFavorited.innerHTML = `<span>Любимая: </span> ${data.isFavorited}`;
    features.append(isFavorited);

    cards.append(toy);
}

// отображение всех карточек заданного массива + addEventListener на клик карточки
function showCards(array) {

    if (sortValue) {
        array = changeSort(array);
    }
    if (array.length === 0) {
        notFound.textContent = "Ola-la-la. There are no results for this query"
    } else {
        for (let i = 0; i < array.length; i++) {
            createToy(array[i]);
        }
        setTimeout(addToysHandlers, 500);
    }

}

//oпределение значения фильтра
function getFilterName() {
    let elem = event.target;
    let elemName = elem.tagName;
    if (elemName == 'BUTTON') {
        elem.classList.toggle('active');
        cards.innerHTML = '';
        return elem.getAttribute('data-filter');

    }
}


//определение типа фильтра
function getFilterType(filter) {
    let filterType;
    for (let value in filtersList) {
        let arr = filtersList[value];
        if (arr.includes(filter)) {
            filterType = value;
        }
    }
    return filterType
}

//добавление и удаление из любимого
function switchFavorite(toy) {
    let polyline = toy.querySelector('polyline');
    polyline.classList.toggle('polyline-favorite');
    let toyTitle = toy.querySelector(".toy__title").innerText;
    let toyIndex;
    

    // search the Toy object
    for (let i = 0; i < toys.length; i++) {
        if (toys[i]["title"] == toyTitle) {
            toyIndex = i;

        }
    }

    if (polyline.classList.contains('polyline-favorite')) {

        if (favorites.length == 5) {
            // проверка на число любимых в массиве
            toy.setAttribute("data-tooltip", "Извините, все слоты заполнены");
            setTimeout(function(){
                toy.removeAttribute("data-tooltip", "Извините, все слоты заполнены");
                },2000)
            polyline.classList.toggle('polyline-favorite');

        } else {

            toy.querySelector(".toy__features .toy__feature:last-child").innerHTML = `<span>Любимая: </span>да`;
            toys[toyIndex]["isFavorited"] = "да";

            favorites.push(toys[toyIndex]);
        }
    } else {

        toy.querySelector(".toy__features .toy__feature:last-child").innerHTML = `<span>Любимая: </span>нет`;
        toys[toyIndex]["isFavorited"] = "нет";
        
        favorites = toys.filter((n) => { return n["isFavorited"] == "да" })
    }
    
    favoriteCounter.textContent = favorites.length;
    saveInLocaleStorage('favorites', favorites);
}

// добавление слушателя на клик карточки
function addToysHandlers() {
    
        toyCards = document.querySelectorAll(".toy");
        for (let i = 0; i < toyCards.length; i++) {
            toyCards[i].addEventListener('click', function () {
                switchFavorite(toyCards[i])
            })

        }
}

function changeSort(array) {

    switch (sortValue) {
        case "sort_title_inc":
            array.sort((a, b) => a.title > b.title ? 1 : -1);
            break;
        case "sort_title_dec":
            array.sort((a, b) => b.title > a.title ? 1 : -1);
            break;
        case "sort_amount_inc":
            array.sort((a, b) => a.amount > b.amount ? 1 : -1);
            break;
        case "sort_amount_dec":
            array.sort((a, b) => b.amount > a.amount ? 1 : -1);

    }

    return array
}

function saveInLocaleStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function setRangeValues () {
    if (userFilters.amount.length > 0) {
        numberRange[0].value = userFilters.amount[0];
        numberRange[1].value = userFilters.amount[1];
    }
    if (userFilters.sale_year.length > 0) {
        yearRange[0].value = userFilters.sale_year[0];
        yearRange[1].value = userFilters.sale_year[1];
    }
}

function findToys(array, text) {
    let findArray = [];
    let titleStr;
    let textStr = text.toLowerCase();
    for (let i = 0; i < array.length; i++) {
        titleStr = array[i]["title"].toLowerCase()
        if (titleStr.includes(textStr)) {
            findArray.push(array[i]);
        }
    }
    return findArray

}


// cards adding when page loads
if (localStorage.getItem('favorites') !== null) {
    favorites = JSON.parse(localStorage.getItem('favorites'));
    let favoritesNames = favorites.map ( x => x.title);
    for (let i =0; i < toys.length; i++) {
        if (favoritesNames.includes(toys[i]["title"])) {
            toys[i]["isFavorited"] = "да";
        }
    }
    favoriteCounter.textContent = favorites.length;
}

if (localStorage.getItem('userFilters') !== null) {
  
    userFilters = JSON.parse(localStorage.getItem('userFilters'));
    if (userFilters.amount.length >0 || userFilters.sale_year.length > 0) {
        setRangeValues(userFilters)
    }
    filteredToysList = getFilteredToys();
    
    showCards(filteredToysList);

} else {showCards(toys)}


//filtration

optionsFilters.addEventListener('click', function () {
    selectedFilter = getFilterName(); // get filter name
    let filterType = getFilterType(selectedFilter); //get filter type
    // console.log(selectedFilter, filterType)

    // добавление или удаление фильтра
    if (userFilters[filterType].includes(selectedFilter)) {
        notFound.textContent = '';
        let num = userFilters[filterType].indexOf(selectedFilter); // if selected - remove from the list
        userFilters[filterType].splice(num, num + 1)
        filteredToysList = getFilteredToys();
        showCards(filteredToysList);
    } else {
        notFound.textContent = '';
        userFilters[filterType].push(selectedFilter);
        filteredToysList = getFilteredToys();
        showCards(filteredToysList);
    }


})

//add favorite filter 

favoriteCheckbox.addEventListener('change', function () {
    if (this.checked) {
        userFilters["isFavorited"].push("да")
    } else {
        userFilters["isFavorited"].pop()
    }

    filteredToysList = getFilteredToys();
    cards.innerHTML = '';
    notFound.textContent = '';
    showCards(filteredToysList);

})

// определение отфильтрованного массива
function getFilteredToys() {
    let filteredToys = [];
    saveInLocaleStorage("userFilters", userFilters);

    // console.log(userFilters)

    for (let i = 0; i < toys.length; i++) {
        filteredToys[i] = toys[i]
    }

    let types = Object.keys(userFilters);
    let values = Object.values(userFilters);

    for (let i = 0; i < types.length; i++) {
        if (values[i].length === 0) {
            continue
        } else {

            switch (types[i]) {
                case "shape":
                case "color":
                case "size":
                case "isFavorited":
                    for (let j = 0; j < filteredToys.length; j++) {

                        if (values[i].includes(filteredToys[j][types[i]])) {
                            continue
                        } else {
                            filteredToys[j] = null;
                        }
                    }
                    break;
                case "amount":
                case "sale_year":

                    for (let j = 0; j < filteredToys.length; j++) {

                        if (filteredToys[j][types[i]] >= values[i][0] && filteredToys[j][types[i]] <= values[i][1]) {
                            continue
                        } else {
                            filteredToys[j] = null;
                        }
                    }

            }

        }
        filteredToys = filteredToys.filter((n) => { return n != null });
    }

    return filteredToys

}

// add event on ranges

for (let i = 0; i < ranges.length; i++) {
    ranges[i][0].addEventListener('input', (e) => {
        if (+ranges[i][0].value > +ranges[i][1].value) {
            ranges[i][1].value = +ranges[i][0].value;
        }
    });

    ranges[i][1].addEventListener('input', (e) => {
        if (+ranges[i][1].value < +ranges[i][0].value) {
            ranges[i][0].value = +ranges[i][1].value;
        }
    });

    ranges[i].forEach((range) => {
        range.addEventListener('change', () => {
            if (i === 0) {
                userFilters["amount"] = [ranges[i][0].value, ranges[i][1].value];
            } else if (i === 1) {
                userFilters["sale_year"] = [ranges[i][0].value, ranges[i][1].value];
            }
            filteredToysList = getFilteredToys();
            cards.innerHTML = '';
            notFound.textContent = '';
            showCards(filteredToysList);

        })
    });
}

// reset all filters
resetBtn.addEventListener('click', () => {
    cards.innerHTML = '';
    notFound.textContent = '';
    userFilters = {
        "shape": [],
        "color": [],
        "size": [],
        "isFavorited": [],
        "amount": [],
        "sale_year": []
    };
    showCards(toys);
    filteredToysList=[];
    saveInLocaleStorage("userFilters", userFilters);
    for (let i = 0; i < ranges.length; i++) {
        ranges[i][0].value = ranges[i][0].min;
        ranges[i][1].value = ranges[i][1].max;
    }
})

// обработчик на сортировку

sortElement.addEventListener('change', () => {
    sortValue = sortElement.value;
    filteredToysList = getFilteredToys()
    cards.innerHTML = '';
    showCards(filteredToysList)
})


// search: clear the field

document.querySelector('.search_form__clear').addEventListener('click', function(){
    document.querySelector('.search_form__item').value = '';
    findToysList = [];
    cards.innerHTML = '';
    notFound.textContent = '';
    if (filteredToysList.length == 0) {
        showCards(toys)
    } else {
            showCards(filteredToysList)
        }

})

// search: find items

document.querySelector('.search_form__icon').addEventListener('click', function () {
    
    let searchText = document.querySelector('.search_form__item').value.trim();
    if (filteredToysList.length == 0) {
    findToysList = findToys(toys, searchText);

} else {
        findToysList = findToys(filteredToysList, searchText);
        
    }
    cards.innerHTML = '';

    if (findToysList.length == 0) {
        notFound.textContent = "Ola-la-la. There are no results for this query";
    } else {
    notFound.textContent = '';
    showCards(findToysList);
    }
})

