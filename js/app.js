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
    // this.populateInfoWindow = function() {
    //     for (var i = 0; i < locationsModel.locations.length; i++) {
    //         locationsModel.locations[i].infowindow.close();
    //     }
    //     map.panTo(self.marker.getPosition())
    //
    //     self.infowindow.setContent(self.content);
    //     self.infowindow.open(map, self.marker);
    //     self.marker.setAnimation(google.maps.Animation.BOUNCE);
    //     setTimeout(function() {
    //         self.marker.setAnimation(null);
    //     }, 2200);
    //
    // };

    this.wikiWindow=function(){
              // value entered by the user
              var link = "http://en.wikipedia.org/w/api.php?action=opensearch&search="+ self.title + "&format=json&callback=?"; // url to look for using the search input by the user
              $.ajax({
                  type:"GET",
                  url:link,
                  async:true,
                  dataType: "json",
                  success:function(data){
                    var articleList= data[0];
                      var url = "http://en.wikipedia.org/wiki/"+ articleList;
                      name = ('<a href="' + url + '">' + articleList + '</a>');
                      console.log(name);

                      self.infowindow.setContent(name);

                  },

                   error: function(errorMessage){alert("Error");}
              });

              for (var i = 0; i < locationsModel.locations.length; i++) {
                  locationsModel.locations[i].infowindow.close();
              }
              map.panTo(self.marker.getPosition())


              self.infowindow.open(map, self.marker);
              self.marker.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(function() {
                  self.marker.setAnimation(null);
              }, 2200);
            };



    // this.addListener = google.maps.event.addListener(self.marker, 'click', (this.populateInfoWindow));
    this.addListener = google.maps.event.addListener(self.marker, 'click', (this.wikiWindow));



};

// Contains all the locations and search function.
var locationsModel = {

    locations: [
        new Location('Google', 37.3861, 122.0839),
        new Location('Facebook', 37.4163, -122.153),
        new Location('Yahoo', 37.3688, 122.0363),
        new Location('Microsoft', 47.6740, 122.1215),
        new Location('Redhat', 35.7796, 78.6382),
        new Location('Columbia University', 40.8075, 73.9626)
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
