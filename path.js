const list = {
    continents: [
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
    ]
}

function CreateTreeStructure() {
    const container = document.querySelector('.treeStructure');
    container.innerHTML = '';
    list.continents.forEach(continent => {
        const continentElement = document.createElement('ul');
        continentElement.innerHTML = `<li><span><div class="arrowIcon"></div>${continent.continentName}</span></li>`;
        container.appendChild(continentElement);

        const countriesList = document.createElement('ul');
        countriesList.style.display = 'none';
        continentElement.appendChild(countriesList);

        continentElement.querySelector('span').addEventListener('click', () => {
            countriesList.style.display = countriesList.style.display === 'none' ? 'block' : 'none';
            continentElement.querySelector('span div').classList.toggle("arrow-rotate");
        });

        continent.countries.forEach(country => {
            const countryElement = document.createElement('li');
            countryElement.innerHTML = ` <span><div class="arrowIcon"></div>${country.countryName}</span>`;
            countriesList.appendChild(countryElement);

            const statesList = document.createElement('ul');
            statesList.style.display = 'none';
            countryElement.appendChild(statesList);

            countryElement.querySelector('span').addEventListener('click', () => {
                statesList.style.display = statesList.style.display === 'none' ? 'block' : 'none';
                countryElement.querySelector('span div').classList.toggle("arrow-rotate");
            });

            country.states.forEach(state => {
                const stateElement = document.createElement('li');
                stateElement.innerHTML = ` <span><div class="arrowIcon"></div>${state.stateName}</span>`;
                statesList.appendChild(stateElement);

                const districtsList = document.createElement('ul');
                districtsList.style.display = 'none';
                stateElement.appendChild(districtsList);

                 stateElement.querySelector('span').addEventListener('click', () => {
                    districtsList.style.display = districtsList.style.display === 'none' ? 'block' : 'none';
                    stateElement.querySelector('span div').classList.toggle("arrow-rotate");
                });

                state.districts.forEach(district => {
                    const districtElement = document.createElement('li');
                    districtElement.textContent = district.districtName;
                    districtsList.appendChild(districtElement);
                });
               
            });
            
        });
        
    });
}

CreateTreeStructure();

function findPath(name) {
    for (const continent of list.continents) {
        if (continent.continentName.toLocaleLowerCase() == name.toLocaleLowerCase()) {
            return `${continent.continentName}`
        }
        for (const country of continent.countries) {
            if (country.countryName.toLowerCase() == name.toLowerCase()) {
                return `${continent.continentName}-${country.countryName}`;
            }
            for (const state of country.states) {
                if (state.stateName.toLowerCase() == name.toLowerCase()) {
                    return `${continent.continentName}-${country.countryName}-${state.stateName}`;
                }
                for (const district of state.districts) {
                    if (district.districtName.toLowerCase() == name.toLowerCase()) {
                        return `${continent.continentName}-${country.countryName}-${state.stateName}-${district.districtName}`;
                    }
                }
            }
        }
    }
}
function getPath() {
    var name = document.querySelector("input").value;
    document.querySelector(".pathList").innerHTML = findPath(name);
}


