var myLatLng = { lat: 13.0827, lng: 80.2707 };
var mapOptions = {
    center: myLatLng,
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);
function calcRoute() {
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Estimated Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
            var dist = result.routes[0].legs[0].distance.text.split(" ");
            document.getElementById("start").value = document.getElementById("from").value;
            document.getElementById("end").value = document.getElementById("to").value;
            document.getElementById("distance").value = dist[0].split(",").join("");
            directionsDisplay.setDirections(result);
        } else {
            directionsDisplay.setDirections({ routes: [] });
            map.setCenter(myLatLng);
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}
var options = {
    types: ['(cities)']
}
var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
