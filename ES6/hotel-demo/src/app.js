let properties;
let propertyArr = [];
// to fetch JSON Data
fetch(`././json/data.json`)
    .then(function (response) {
        return response.json();
    })
    .then(function (res) {
        properties = res;
        console.log(properties);
        listing.createTemplate(res);
    })
    .catch(error => console.error('Error:', error));

let listing = {
    createTemplate: (res) => {
        let outputTemplate = '';
        res.map((property) => {
            outputTemplate += listing.propertyTemplate(property)
        })

        document.getElementById('listing').innerHTML = `
        <h1 class='heading'>Places to stay in Goa</h1><h3 class='sub-heading'>${res.length} properties found</h3>` + outputTemplate +
        `<p class="footer">These ${res.length} properties were added recently. Check back soon for updates.</p>`;
    },
    propertyTemplate: (data) => {
        return `
                <div class="property">
                    <img class="property-photo" src="${data.imageUrl}">
                    <h2 class="property-name">${data.propertyName}</h2>
                    <p>${data.description}</p>
                    <h3>${data.starRating} star +</h3>
                    <h4 class='property-type'>${data.propertyType}</h4>
                </div>
                `
    }, filter: (id, divid) => {
        document.getElementById(divid).checked ? listing.propertyUpdate(id, true) : listing.propertyUpdate(id, false);

        let filterdproperties = []
        properties.forEach((property) => {
            propertyArr.forEach(el => {
                if (el === property.starRating) {
                    filterdproperties.push(property)
                }
            })
        })
        filterdproperties.length > 0 ? listing.createTemplate(filterdproperties) : listing.createTemplate(properties);

    }, propertyUpdate: (id, status) => {
        if (status) {
            propertyArr.push(id)
        } else {
            propertyArr = propertyArr.filter((propertyId) => {
                return id !== propertyId
            })
        }
    }
};