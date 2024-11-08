
const list = {
    continents:[
        {
            continentName: "Asia",
            countries: [
                {
                    countryName: "India",
                    states: [
                        {
                            stateName: "Tamil Nadu",
                            districts: [
                                {
                                    districtName: "Chennai",
                                }, {
                                    districtName: "Coimbatore",
                                },
                                {
                                    districtName: "Erode",
                                }
                            ]
                        },
                        {
                            stateName: "Kerala",
                            districts: [
                                {
                                    districtName: "Alappuzha",
                                }, {
                                    districtName: "Ernakulam",
                                }, {
                                    districtName: "Idukki",
                                }
                            ]
                        },
                        {
                            stateName: "Rajasthan",
                            districts: [
                                {
                                    districtName: "Ajmer",
                                }, {
                                    districtName: "Baran",
                                }, {
                                    districtName: "Dholpur",
                                }
                            ]
                        }
                    ],
                },
            ]
        },
        {
            continentName: "Europe",
            countries: [
                {
                    countryName: "Germany",
                    states: [
                        {
                            stateName: "Bavaria",
                            districts: [
                                {
                                    districtName: "Munich",
                                }, {
                                    districtName: "Nuremberg",
                                }

                            ]
                        },
                        {
                            stateName: "Berlin",
                            districts: [
                                {
                                    districtName: "Mitte",
                                }, {
                                    districtName: "Charlottenburg",
                                }
                            ]
                        }
                    ],
                },
                {
                    countryName: "France",
                    states: [
                        {
                            stateName: "Ile-de-France",
                            districts: [
                                {
                                    districtName: "Paris",
                                }, {
                                    districtName: "Versailles",
                                }

                            ]
                        },
                        {
                            stateName: "Provence-Alpes-Côte d'Azur",
                            districts: [
                                {
                                    districtName: "Marseille",
                                }, {
                                    districtName: "Nice",
                                }
                            ]
                        }
                    ],
                },
            ]
        },

    ]
}
function generateTree(data, container) {
    const listElement = document.createElement('ul');
    container.appendChild(listElement);
    data.forEach(item => {
        const liElement = document.createElement('li');
        const spanElement = document.createElement('span');
        if (item.children) {
            const arrowIcon = document.createElement('div');
            arrowIcon.classList.add('arrowIcon');
            spanElement.appendChild(arrowIcon);
        }
        spanElement.innerHTML += item.name; 
        liElement.appendChild(spanElement);
        listElement.appendChild(liElement);
        if (item.children) {
            const ulElement = document.createElement('ul');
            ulElement.style.display = 'none';
            liElement.appendChild(ulElement);
            spanElement.addEventListener('click', () => {
                ulElement.style.display = ulElement.style.display === 'none' ? 'block' : 'none';
                spanElement.querySelector('div').classList.toggle('arrow-rotate');
            });
            generateTree(item.children, ulElement);
        }
    });
}
function createTreeStructure() {
    const container = document.querySelector('.treeStructure');
    container.innerHTML = '';
    const treeData = [];
    list.continents.forEach(continent => {
        const continentList = { name: continent.continentName, children: [] };
        continent.countries.forEach(country => {
            const countryList = { name: country.countryName, children: [] };
            continentList.children.push(countryList);
            country.states.forEach(state => {
                const StateList = { name: state.stateName, children: [] };
                countryList.children.push(StateList);
                state.districts.forEach(district => {
                    StateList.children.push({ name: district.districtName });
                });
            });
            
        });
        treeData.push(continentList);
    });
    generateTree(treeData, container);
}
createTreeStructure();
function findPath(name, location = list.continents, path = '') {
    for (const item of location) {
        const itemName = item.continentName || item.countryName || item.stateName || item.districtName;
        if (itemName && itemName.toLowerCase() === name.toLowerCase()) {
            return `${path}${itemName}`;
        }
        const children = item.countries || item.states || item.districts;
        if (children) {
            const result = findPath(name, children, `${path}${itemName} <span class="arrow"></span> `);
            if (result && result !== `<b>Value not found</b>`) {
                return result;
            }
        }
    }
    return `<b>Value not found</b>`;
}


function getPath() {
    var name = document.querySelector("input").value;
    document.querySelector(".path").innerHTML = findPath(name);
}
function search() {
    if (event.keyCode == 13) {
        getPath();
    }
}


