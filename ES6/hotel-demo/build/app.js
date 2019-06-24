'use strict';

var properties = void 0;
var propertyArr = [];
// to fetch JSON Data
fetch('././json/data.json').then(function (response) {
    return response.json();
}).then(function (res) {
    properties = res;
    console.log(properties);
    listing.createTemplate(res);
}).catch(function (error) {
    return console.error('Error:', error);
});

var listing = {
    createTemplate: function createTemplate(res) {
        var outputTemplate = '';
        res.map(function (property) {
            outputTemplate += listing.propertyTemplate(property);
        });

        document.getElementById('listing').innerHTML = '\n        <h1 class=\'heading\'>Places to stay in Goa</h1><h3 class=\'sub-heading\'>' + res.length + ' properties found</h3>' + outputTemplate + ('<p class="footer">These ' + res.length + ' properties were added recently. Check back soon for updates.</p>');
    },
    propertyTemplate: function propertyTemplate(data) {
        return '\n                <div class="property">\n                    <img class="property-photo" src="' + data.imageUrl + '">\n                    <h2 class="property-name">' + data.propertyName + '</h2>\n                    <p>' + data.description + '</p>\n                    <h3>' + data.starRating + ' star +</h3>\n                    <h4 class=\'property-type\'>' + data.propertyType + '</h4>\n                </div>\n                ';
    }, filter: function filter(id, divid) {
        document.getElementById(divid).checked ? listing.propertyUpdate(id, true) : listing.propertyUpdate(id, false);

        var filterdproperties = [];
        properties.forEach(function (property) {
            propertyArr.forEach(function (el) {
                if (el === property.starRating) {
                    filterdproperties.push(property);
                }
            });
        });
        filterdproperties.length > 0 ? listing.createTemplate(filterdproperties) : listing.createTemplate(properties);
    }, propertyUpdate: function propertyUpdate(id, status) {
        if (status) {
            propertyArr.push(id);
        } else {
            propertyArr = propertyArr.filter(function (propertyId) {
                return id !== propertyId;
            });
        }
    }
};