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
function findPath(name) {
    for (const continent of list.continents) {
        if(continent.continentName.toLocaleLowerCase() == name.toLocaleLowerCase()){
            return `${continent.continentName}`
        }
        for (const country of continent.countries) {
            if (country.countryName.toLowerCase() == name.toLowerCase()) {
                return `${continent.continentName} - ${country.countryName}`;
            } 
            for (const state of country.states) {
                if (state.stateName.toLowerCase() == name.toLowerCase()) {
                    return `${continent.continentName} - ${country.countryName} - ${state.stateName}`;
                }
                for (const district of state.districts) {
                    if (district.districtName.toLowerCase() == name.toLowerCase()) {
                        return `${continent.continentName} - ${country.countryName} - ${state.stateName} - ${district.districtName}`;
                    }
                }
            }
        }
    }
}
document.querySelector(".pathName").textContent = findPath("Ajmer");
console.log(findPath("Ajmer"))

