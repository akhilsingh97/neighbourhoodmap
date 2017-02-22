var Location = function(title, long, lat) {
    var self = this;
    this.title = title;
    this.long = long;
    this.lat = lat;



    this.getContent = function() {
        self.content = self.title;
    }();

    this.infowindow = new google.maps.InfoWindow();
    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(self.long, self.lat),
        map: map,
        title: self.title,
        animation: google.maps.Animation.DROP
    });




    // Opens the info window for the location marker.
    this.populateInfoWindow = function() {
        for (var i = 0; i < locationsModel.locations.length; i++) {
            locationsModel.locations[i].infowindow.close();
        }
        map.panTo(self.marker.getPosition())

        self.infowindow.setContent(self.content);
        self.infowindow.open(map, self.marker);
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.marker.setAnimation(null);
        }, 2200);

    };


    this.addListener = google.maps.event.addListener(self.marker, 'click', (this.populateInfoWindow));



};

// Contains all the locations and search function.
var locationsModel = {

    locations: [
        new Location('Park Ave Penthouse', 40.7713024, -73.9632393),
        new Location('Chelsea Loft', 40.7444883, -73.9949465),
        new Location('Union Square Open Floor Plan', 40.7347062, -73.9895759),
        new Location('East Village Hip Studio', 40.7281777, -73.984377),
        new Location('TriBeCa Artsy Bachelor Pad', 40.7195264, -74.0089934),
        new Location('Chinatown Homey Space', 40.7180628, -73.9961237)
    ],
    query: ko.observable(''),
};



locationsModel.search = ko.dependentObservable(function() {
    var self = this;
    var search = this.query().toLowerCase();
    return ko.utils.arrayFilter(self.locations, function(location) {
        return location.title.toLowerCase().indexOf(search) >= 0;
    });
}, locationsModel);

ko.applyBindings(locationsModel);
