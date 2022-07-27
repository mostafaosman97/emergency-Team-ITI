/*----------------------- First we should define libraries in require and calling it by function ---------------------------*/


require(["esri/widgets/AreaMeasurement2D", "esri/Map", "esri/views/MapView",
  "esri/widgets/BasemapGallery",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search", "esri/widgets/FeatureTable/Grid/support/ButtonMenu",
  "esri/widgets/FeatureTable/Grid/support/ButtonMenuItem", "esri/config",
  "esri/Graphic", "esri/rest/route", "esri/rest/support/RouteParameters", "esri/rest/support/FeatureSet",
  "esri/rest/networkService",
  "esri/rest/serviceArea",
  "esri/rest/support/ServiceAreaParameters",
  "esri/rest/closestFacility", "esri/rest/support/ClosestFacilityParameters",
  "esri/rest/locator", "esri/layers/GraphicsLayer", "esri/symbols/WebStyleSymbol", "esri/widgets/Locate", "esri/widgets/Track", "esri/widgets/Legend"
  , "esri/widgets/Directions", "esri/layers/RouteLayer",
  "esri/widgets/LayerList", "esri/widgets/Expand", "dojo/domReady!"],

  function (AreaMeasurement, Map, MapView, BasemapGallery, featureLayer, searchw, ButtonMenu, ButtonMenuItem, esriConfig,
    Graphic, route, RouteParameters, FeatureSet,
    networkService,
    serviceArea,
    ServiceAreaParameters,
    closestFacility, ClosestFacilityParameters,
    locator, GraphicsLayer, WebStyleSymbol, Locate, Track, Legend,
    Directions, RouteLayer, LayerList, Expand
  ) {

    esriConfig.apiKey = "AAPK05a3b453364246839955d89db08bc444J9Tiv06Xl9kl127TNWbw4yNROxO8CFrt9lIiZozefVMOxLiQ0Fv_uoit0EuduT8a";




    /*----------------------- Create Symbology to Render Accedents Layer ---------------------------*/



    var availableSymbol = {
      type: "picture-marker",
      url: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
      width: "10px",
      height: "10px"
    };



    var unAvailableSymbol = {
      type: "picture-marker",
      url: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
      width: "10px",
      height: "10px"
    };



    var avaRenderer = {
      type: "unique-value",
      field: "Availability",
      uniqueValueInfos: [{
        label: "Available",
        symbol: availableSymbol,
        value: "YES"

      },

      {
        label: "UnAvailable",
        symbol: unAvailableSymbol,
        value: "NO"

      },
      ]

    };


    /*--------------------------------------------------------------------------------------------------*/



    var policeSymbol = {
      type: "simple-marker",
      style: 'square',
      color: "blue",
      size: "6px"
    };

    var ambulanceSymbol = {
      type: "simple-marker",
      style: 'square',
      color: "green",
      size: "6px"
    };

    var hospitalSymbol = {
      type: "simple-marker",
      style: 'square',
      color: "red",
      size: "6px"
    };

    var fireStationSymbol = {
      type: "simple-marker",
      style: 'square',
      color: "black",
      size: "6px"
    };






    var myRenderer = {
      type: "unique-value",
      field: "Service_tybe",
      uniqueValueInfos: [
        {
          label: "Police Requests",
          symbol: policeSymbol,
          value: "Police_Station"

        },

        {
          label: "Ambulance Requests",
          symbol: ambulanceSymbol,
          value: "Ambulance"

        },

        {
          label: "Hospital Requests",
          symbol: hospitalSymbol,
          value: "Hospital"

        },
        {
          label: "Fire Accedents",
          symbol: fireStationSymbol,
          value: "Fire_Station"

        }

      ],
      defaultSymbol: {

        type: "simple-marker",
        style: 'circle',
        color: "gray",
        size: "8px"

      }

    };

    /*--------------------------------------------------------------------------------------------------------- */


    // var policeSymbol01 = {
    //   type: "simple-marker",
    //   style: 'circle',
    //   color: "blue",
    //   size: "8px",


    // };


    const policeSymbol01 = new WebStyleSymbol({
      name: "tear-pin-1",
      styleName: "Esri2DPointSymbolsStyle",
      size: "8px"

    });


    const ambulanceSymbol01 = new WebStyleSymbol({
      name: "tear-pin-1",
      styleName: "Esri2DPointSymbolsStyle",
      size: "8px"

    });


    // const hospitalSymbol01 = new WebStyleSymbol({
    //   name: "tear-pin-1",
    //   styleName: "Esri2DPointSymbolsStyle",
    //   size: "8px"

    // });


    const fireStationSymbol01 = new WebStyleSymbol({
      name: "tear-pin-1",
      styleName: "Esri2DPointSymbolsStyle",
      size: "8px"

    });


    // var ambulanceSymbol01 = {
    //   type: "simple-marker",
    //   style: 'circle',
    //   color: "green",
    //   size: "8px"
    // };

    // var hospitalSymbol01 = {
    //   type: "simple-marker",
    //   style: 'circle',
    //   color: "red",
    //   size: "8px"
    // };

    // var fireStationSymbol01 = {
    //   type: "simple-marker",
    //   style: 'circle',
    //   color: "black",
    //   size: "8px"
    // };


    var myReportRenderer = {
      type: "unique-value",
      field: "type",
      uniqueValueInfos: [
        {
          label: "Police Request",
          symbol: policeSymbol01,
          value: "Police Station"

        },

        {
          label: "Ambulance Request",
          symbol: ambulanceSymbol01,
          value: "Ambulance Center"

        },

        // {
        //   label: "Hospital Accedents",
        //   symbol: hospitalSymbol01,
        //   value: "Hospital"

        // },
        {
          label: "Fire Accident",
          symbol: fireStationSymbol01,
          value: "Fire Station"

        }

      ],
      defaultSymbol: {

        type: "simple-marker",
        style: 'circle',
        color: "gray",
        size: "8px"

      }

    };

    /************************************************************** Render Heat Map ********************************************************************* */
    const densRenderer = {
      type: "heatmap",
      colorStops: [
        { color: [133, 193, 200, 0], ratio: 0 },
        { color: [133, 193, 200, 0], ratio: 0.01 },
        { color: [133, 193, 200, 255], ratio: 0.01 },
        { color: [133, 193, 200, 255], ratio: 0.01 },
        { color: [144, 161, 190, 255], ratio: 0.0925 },
        { color: [156, 129, 132, 255], ratio: 0.175 },
        { color: [167, 97, 170, 255], ratio: 0.2575 },
        { color: [175, 73, 128, 255], ratio: 0.34 },
        { color: [184, 48, 85, 255], ratio: 0.4225 },
        { color: [192, 24, 42, 255], ratio: 0.505 },
        { color: [200, 0, 0, 255], ratio: 0.5875 },
        { color: [211, 51, 0, 255], ratio: 0.67 },
        { color: [222, 102, 0, 255], ratio: 0.7525 },
        { color: [233, 153, 0, 255], ratio: 0.835 },
        { color: [244, 204, 0, 255], ratio: 0.9175 },
        { color: [255, 255, 0, 255], ratio: 1 }
      ],
      maxDensity: 0.01,
      minDensity: 0,
      // settings for heatmap apply only to this scale
      // so renderer will look consistent without
      // dynamically updating on zoom
      referenceScale: false,
      // radius:false,
      legendOptions: {
        minLabel: "Low Accidents density",
        maxLabel: "High Accidents density"
      }
    };






    /*-------------------------------------- Add PopUp On Map  for requests-----------------------------------------------------*/
    var RequestsPopUp = {
      title: `<h3>{name }</h3>`,
      content:
        `<ul>
          <li><b>Generale Information</b></li>
          <li>- Service Request is        : {type}</li>
          <li>- Date of Request is        : {date_}</li>
          <li>- Phone Nom. is             : {phone_contact }</li>

        </ul>`

    }

    /*--------------------------------------------------Add PopUp On Map  for services--------------------------------------------------------- */

    var servicespopUp = {
      title: `<h3>{EName}</h3>`,
      content: `<ul>

  <li><b>Generale Indicators</b></li>
  <li>- Service Type is        : {Service_tybe}</li>
  <li>- is service Available ? : {availability}</li>
  <li>- Service coverage rate of area in KM : {Coverage_Area} </li>
  <li>- coverage rate of people in District : {Population}</li>

  <li><b>Indicators For Hospitals</b></li>
  <li>- nom. of beds for hospital : {Hospital_beds}</li>
  <li>- nom. of operations theater room : {Surgery_Room}</li>
  <li>- nom. of Intensive Care Beds : {Intensive_Care}</li>

  <li><b>Indicators For Fire Station </b></li>
  <li>- Nom. of Fire Trucks in Station : {Fire_Truck}</li> 
</ul>`

    }



    /*-------------------------------------- Add Layers On Map view -----------------------------------------------------*/
    var cairoBorder = new featureLayer({
      url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/BaseMap_WFL1/FeatureServer/3"
    });

    var cairoDistricts = new featureLayer({
      url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/BaseMap_WFL1/FeatureServer/2",


    });


    var servicesLayer = new featureLayer({
      url: "https://services2.arcgis.com/YPlcCSfbfLssOetB/arcgis/rest/services/BaseMap_WFL1/FeatureServer/4",
      definitionExpression: "",
      renderer: myRenderer,
      popupTemplate: servicespopUp,
    });


    /*----------------------- Show accidents of Reports from survay 123 ---------------------------*/


    var reportAccidents = new featureLayer({
      url: "https://services2.arcgis.com/YPlcCSfbfLssOetB/arcgis/rest/services/survey123_f5f86f2c2ca14669b0a1289a3caba35d_stakeholder/FeatureServer",
      definitionExpression: "",
      renderer: myReportRenderer,
      popupTemplate: RequestsPopUp,
    });



    /*****************************************************************************************************************************/



    /*--------------------------------------------- Find Closist 3 Hospitals Part 1----------------------------------------------------*/

    const routeSymbol1 = {
      type: "simple-line",
      color: [50, 150, 255, 0.75],
      width: "5",
    };

    const facilities = [
      [31.273825, 30.062416],
      [31.317617, 30.094513],
      [31.28542, 30.011238],
      [31.366132, 30.105883],
      [31.226952, 30.031554],
      [31.327014, 30.062687],
      [31.277137, 30.057973],
      [31.243175, 30.020907],
      [31.297591, 30.083447],
      [31.331741, 30.081507],
      [31.348916, 30.091848],
      [31.230981, 30.024063],
      [31.307752, 30.126939],
      [31.313996, 30.133309],
      [31.395557, 30.145972],
      [31.338523, 30.10423],
      [31.422483, 30.003997],
      [31.25383, 30.088695],
      [31.306581, 30.091745],
      [31.346498, 30.064691],
      [31.234947, 30.029291],
      [31.335288, 30.094192],
      [31.330529, 30.055991],
      [31.241201, 29.966658],
      [31.491801, 30.059391],
      [31.318143, 30.114063],
      [31.382614, 30.093056],
      [31.248882, 30.098136],
      [31.333434, 30.104687],
      [31.331177, 30.103598],
      [31.35774, 30.05616],
      [31.264795, 29.967458],
      [31.345396, 30.099134],
      [31.345959, 29.982526],
      [31.307929, 30.090578],
      [31.2773, 29.987624],
      [31.377926, 30.103383],
      [31.379102, 30.053154],
      [31.273118, 30.087472],
      [31.249097, 30.094755],
      [31.281794, 29.973407],
      [31.327453, 30.127331],
      [31.248504, 30.038926],
      [31.238375, 30.051386],
      [31.299048, 30.088396],
      [31.366454, 30.121873],
      [31.228962, 30.012547],
      [31.295247, 30.057411],
      [31.245965, 30.092661],
      [31.313663, 30.054442],
      [31.328417, 30.096561],
      [31.348916, 30.091848],
      [31.388781, 30.118313],
      [31.491801, 30.059391],
      [31.360388, 30.059716],
      [31.254268, 29.966077],
      [31.322976, 29.839944],
      [31.32134, 29.859917],
      [31.360749, 29.816699],
      [31.276998, 30.072613],
      [31.276366, 29.979077],
      [31.273369, 29.985182],
      [31.272698, 29.983838],
      [31.277973, 29.983862],
      [31.436815, 30.009935],
      [31.43427, 30.017511],
      [31.435588, 30.020739],
      [31.445661, 30.059576],
      [31.466596, 30.031769],
      [31.467673, 30.039975],
      [31.468653, 30.060495],
      [31.522104, 30.032594],
      [31.468998, 30.083923],
      [31.466966, 30.06367],
      [31.42809, 30.007648],
      [31.372668, 30.100251],
      [31.384488, 30.132698],
      [31.278657, 30.071471],
      [31.278842, 30.072772],
      [31.280438, 30.07522],
      [31.287761, 30.078302],
      [31.279757, 30.084026],
      [31.253655, 30.09699],
      [31.239821, 30.096526],
      [31.242256, 30.083846],
      [31.237612, 30.083594],
      [31.234796, 30.071593],
      [31.252537, 30.073192],
      [31.25469, 30.077019],
      [31.245689, 30.076845],
      [31.282162, 30.066735],
      [31.280973, 30.066512],
      [31.284639, 30.066244],
      [31.295378, 30.099947],
      [31.302719, 30.103895],
      [31.303098, 30.117533],
      [31.297964, 30.116781],
      [31.293073, 30.117529],
      [31.347669, 30.115313],
      [31.332555, 30.114283],
      // [31.341304, 30.111155],
      // [31.337471, 30.116321],
      // [31.318675, 30.119447],
      // [31.314756, 30.115544],
      // [31.260085, 30.059813],
      // [31.252564, 30.063394],
      // [31.262214, 30.070343],
      // [31.242036, 30.058716],
      // [31.246854, 30.056669],
      // [31.251392, 30.039794],
      // [31.238321, 30.034811],
      // [31.23809, 30.022636],
      // [31.230703, 29.98495],
      // [31.249798, 29.962892],
      // [31.231501, 29.982615],
      // [31.232079, 30.017259],
      // [31.32509, 30.059674],
      // [31.338069, 30.065712],
      // [31.316844, 30.07441],
      // [31.329789, 30.092982],
      // [31.327283, 30.093924],
      // [31.339211, 30.084882],
      // [31.22162, 30.046189],
      // [31.231851, 30.030104],
      // [31.244412, 30.032799],
      // [31.23805, 30.054774],
      // [31.243755, 30.058856],
      // [31.265969, 30.100654],
      // [31.275395, 30.033452],
      // [31.288593, 30.049856],
      // [31.296772, 30.054338],
      // [31.290958, 30.060073],
      // [31.281513, 30.064669],
      // [31.225959, 30.016266],
      // [31.31475, 29.984239],
      // [31.327017, 30.012266],
      // [31.340364, 30.008944],
      // [31.301045, 30.015452],
      // [31.618125, 30.155342],
      // [31.660929, 30.144254],
      // [31.266194, 30.044943],
      // [31.231292, 30.024801],
      // [31.231718, 30.026485],
      // [31.423813, 30.136289],
      // [31.24333, 30.065292],
      // [31.246192, 30.083005],
      // [31.318475, 30.095698],
      // [31.367689, 30.122369],
      // [31.337359, 30.106873],
      // [31.225234, 30.028546],
      // [31.29211, 30.075052],
      // [31.355556, 30.13223],


    ];


    const routesLayer = new GraphicsLayer();
    const facilitiesLayer = new GraphicsLayer();




    /*----------------------- Creat map  and add layer ---------------------------*/


    const myMap = new Map({
      basemap: "topo",
      layers: [cairoBorder, cairoDistricts, servicesLayer, reportAccidents,routesLayer,facilitiesLayer]
    });

    /*----------------------- Creat mapView  ---------------------------*/

    const myview = new MapView({
      map: myMap,
      container: "viewDiv",
      center: [32, 30],
      zoom: 10,
      constraints: {
        snapToZoom: false
      }
    });




    // /*----------------------- Make filter on Layer By DifinitionExpression property on /\ emergency Services  /\ ---------------------------*/

    var selectServices = document.getElementById("filterServices");

    selectServices.addEventListener("change", function () {
      if (selectServices.value != "All") {
        servicesLayer.definitionExpression = "service_tybe = '" + this.value + "'";
        servicesLayer.queryExtent().then(function (layerExtent) {

          myview.goTo(layerExtent.extent, { duration: 3000 })
        }).catch(error)

      } else {
        servicesLayer.definitionExpression = "";

        cairoBorder.queryExtent().then(function (layerExtent) {

          myview.goTo(layerExtent.extent, { duration: 3000 })
        }).catch(error)

      }

    })





    // /*----------------------- Make filter on Layer By DifinitionExpression property on /\ Requests Services /\---------------------------*/

    var selectReqServices = document.getElementById("selectReqServices");

    selectReqServices.addEventListener("change", function () {
      if (selectReqServices.value != "All") {

        reportAccidents.definitionExpression = "type = '" + this.value + "'";
        reportAccidents.queryExtent().then(function (layerExtent) {

          myview.goTo(layerExtent.extent, { duration: 3000 })
        }).catch(error);

      } else {

        reportAccidents.definitionExpression = "";

        cairoBorder.queryExtent().then(function (layerExtent) {

          myview.goTo(layerExtent.extent, { duration: 3000 })
        }).catch(error)
      }

    });







    /*--------------------------------------------- Find Route ----------------------------------------------------*/

    var routeURL = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World"
    var routeParams = new RouteParameters({
      directionsLanguage: "ar-eg",
      returnDirections: true,
      stops: new FeatureSet(),
      findBestSequence: true
    })

    function getroute() {
      route.solve(routeURL, routeParams).then(function (routedata) {
        console.log(routedata)
        var routeLine = routedata.routeResults[0].route
        routeLine.symbol = {
          type: "simple-line",
          width: 6,
          color: "blue",
        }
        myview.graphics.add(routeLine)
      })
    }

    // add stops here by graphic 

    function addStops(point) {
      var mygraphic = new Graphic({
        geometry: point,
        symbol: {
          type: "simple-marker",
          style: "square",
          color: "black",
          size: "8px",
        },
      })
      myview.graphics.add(mygraphic)
      routeParams.stops.features.push(mygraphic)
      if (routeParams.stops.features.length >= 2) {
        getroute();
      }
    }

    // stops by click 

    // myview.on("click", function (event) {
    //   addStops(event.mapPoint);
    // })





    /***************************************************************************************** */

    // var checkRoute = document.getElementById("showRoute");
    // let isRouteChecked = true;

    // checkRoute.onchange = function () {

    //   if (isRouteChecked == true) {
    //     isRouteChecked = false;

    //     myview.on("click", function (event) {
    //       addStops(event.mapPoint);
    //     })


    //   } else {

    //     myview.graphics.removeAll();
    //     routeParams.stops = new FeatureSet();

    //     isRouteChecked = true;



    //   }
    // }









    /*--------------------------------------------- Find Service Area ----------------------------------------------------*/

    const serviceAreaUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/ServiceAreas/NAServer/ServiceArea_World";
    let travelMode = null;



    // myview.on("click", (event) => {
    //   createServiceAreas(event.mapPoint);
    // });

    function createServiceAreas(point) {
      // Remove any existing graphics
      myview.graphics.removeAll();
      const locationGraphic = createGraphic(point);
      findServiceArea(locationGraphic);
    }

    // Create the location graphic
    function createGraphic(geometry) {
      // Create a and add the point
      const graphic = new Graphic({
        geometry,
        symbol: {
          type: "simple-marker",
          color: "white",
          size: 8
        }
      });
      myview.graphics.add(graphic);
      return graphic;
    }

    async function findServiceArea(locationFeature) {
      if (!travelMode) {
        const networkDescription = await networkService.fetchServiceDescription(serviceAreaUrl);
        travelMode = networkDescription.supportedTravelModes.find(
          (travelMode) => travelMode.name === "Driving Time"
        );
      }

      const serviceAreaParameters = new ServiceAreaParameters({
        facilities: new FeatureSet({
          features: [locationFeature]
        }),
        driveTimeCutoffs: [10, 15, 20], // min
        travelMode,
        travelDirection: "to-facility",
        outSpatialReference: myview.spatialReference,
        trimOuterPolygon: true
      });
      const { serviceAreaPolygons } = await serviceArea.solve(serviceAreaUrl, serviceAreaParameters);
      showServiceAreas(serviceAreaPolygons);
    }

    function showServiceAreas(serviceAreaPolygons) {
      for (const graphic of serviceAreaPolygons) {
        graphic.symbol = {
          type: "simple-fill",
          color: "rgba(0, 0, 255, .1)"
        }
      }
      myview.graphics.addMany(serviceAreaPolygons, 0);
    }

    // myview.on("click", (event) => {
    //   createServiceAreas(event.mapPoint);
    // });


    /************************************************************************************************************************/

    // var checkService = document.getElementById("showServiceArea");
    // let isServiceChecked = true;

    // checkService.onchange = function (event) {

    //   if (isServiceChecked == true) {
    //     isServiceChecked = false;

    //     myview.on("click", (event) => {
    //       createServiceAreas(event.mapPoint);

    //     });




    //   } else {

    //     myview.graphics.removeAll();

    //     isServiceChecked = true;

    //     console.log(isServiceChecked)



    //   }
    // }

    /*---------------------------------------------- find Closest Facilities  ---------------------------------------*/
    var hospitalSymbol002 = {
      type: "picture-marker",
      url: "https://cdn-icons-png.flaticon.com/512/619/619172.png",
      width: "1px",
      height: "1px"
    };


myview.popup.actions = [];

myview.when(() => {
addFacilityGraphics();
//   // findClosestFacility(addStartGraphic(myview.center), facilitiesLayer.graphics);
});

// myview.on("click", (event) => {
//   myview.hitTest(event).then((response) => {

//     if (response.results.length >= 0) {
//       findClosestFacility(
//         addStartGraphic(event.mapPoint),
//         facilitiesLayer.graphics
//       );
//     }
//   });

// });


function findClosestFacility(startFeature, facilityFeatures) {

  const params = new ClosestFacilityParameters({
    incidents: new FeatureSet({
      features: [startFeature],
    }),
    facilities: new FeatureSet({
      features: facilityFeatures.toArray(),
    }),
    returnRoutes: true,
    returnFacilities: true,
    defaultTargetFacilityCount: 3,
  });

  const url = "https://route-api.arcgis.com/arcgis/rest/services/World/ClosestFacility/NAServer/ClosestFacility_World";



  closestFacility.solve(url, params).then(
    (results) => {
      showRoutes(results.routes);
    },
    (error) => {
      console.log(error.details);
    }
  );
}



function addStartGraphic(point) {
  myview.graphics.removeAll();
  const graphic = new Graphic({
    symbol: {
      type: "simple-marker",
      color: [255, 255, 255, 1.0],
      size: 8,
      outline: {
        color: [50, 50, 50],
        width: 1,
      },
    },
    geometry: point,
  });
  myview.graphics.add(graphic);
  return graphic;
}


function addFacilityGraphics() {
  facilities.forEach((point) => {
    facilitiesLayer.graphics.add(
      new Graphic({
        symbol: hospitalSymbol002,


        // {
        //   type: "web-style",
        //   name: "grocery-store",
        //   styleName: "Esri2DPointSymbolsStyle",
        // }

        geometry: {
          type: "point",
          longitude: point[0],
          latitude: point[1],
          spatialReference: myview.spatialReference,
        },
      })
    );
  });
}



function showRoutes(routes) {
  // Show the routes to the closest facilities
  routesLayer.removeAll();
  routes.forEach((route, i) => {
    route.symbol = routeSymbol1;
    routesLayer.add(route);
  });
}


    //   /******************************************** tools analysis ****************************************************************** */
    var findTools = document.getElementById("findTools");




    findTools.addEventListener("change", function () {

      routeParams.stops = new FeatureSet();

      routesLayer.removeAll();
      myview.graphics.removeAll();

      myview.on("click", (event) => {

        if (findTools.value == "All Tools") {


          console.log("you should choose tool")

        }
        else if (findTools.value == "showServiceArea") {

          createServiceAreas(event.mapPoint);

          console.log("you used service area tool")

        } else if (findTools.value == "checkFacilities") {


          // addFacilityGraphics();
          myview.hitTest(event).then((response) => {

            if (response.results.length >= 0) {
              findClosestFacility(
                addStartGraphic(event.mapPoint),
                facilitiesLayer.graphics
              );
            }
          });


          console.log("you used Closest Facility to nearst 3 hospitals tool")

        } else if (findTools.value == "showOptimizeRoute") {


          addStops(event.mapPoint);


          console.log("you used Optimized Route it showthe best sequence for Stops you added")

        }




      });


    });




    /*******************************************************  Hot Spot Analysis **************************************************************** */







    /************************************************************** Expand Wedgets ***********************************************************************/

    // /*---------------------------Create Layer List- with legend -------------------------------------------------*/

    const layerList = new LayerList({
      view: myview,
      listItemCreatedFunction: (event) => {
        const item = event.item;
        if (item.layer.type != "group") {
          // don't show legend twice
          item.panel = {
            content: "legend",
            open: true
          };
        }
      }
    });

    // /*----------------------- Create Current Location Wedget -------------------------------------*/

    let locate = new Locate({
      view: myview,
      useHeadingEnabled: false,
      goToOverride: function (myview, options) {
        options.target.scale = 1500;
        return myview.goTo(options.target);
      }
    });

    myview.ui.add(locate, "top-left");




    // /*----------------------- Create Search wedget ---------------------------*/


    var userSearch = new searchw({
      view: myview
    });
    myview.ui.add(userSearch, "top-right");



    /*----------------------- Create Base Map gallary Budgets -------------------------------------*/

    var chooseGalary = new BasemapGallery({
      view: myview,
      // container: document.getElementById("myGalary")
    });



    /***************************************** find direction widget *********************************************** */




    let directions = new Directions({
      view: myview,
      routeServiceUrl: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World"
    });


    directions.routeSymbol.width = "5";
    directions.routeSymbol.color = [50, 150, 255, .75];
    directions.routeSymbol.style = "solid";



    // myview.ui.add(directions, {
    //   position: "bottom-left"
    // });





    /**-------------------------------------------------------------- Layer List ------------------------------------------------------------ */
    const layerListExpand = new Expand({
      label: "Legend Of Map",
      expandIconClass: "esri-icon-layer-list",
      view: myview,
      content: layerList,

    });

    myview.ui.add(layerListExpand, "top-left");

    /**-------------------------------------------------------------- Basemap Galary ------------------------------------------------------------ */


    const baseGalary = new Expand({
      label: "BaseMap Galary",
      expandIconClass: "esri-icon-basemap",
      view: myview,
      content: chooseGalary,



    });
    myview.ui.add(baseGalary, "top-left");


    /**-------------------------------------------------------------- Find Directions ------------------------------------------------------------ */



    const myDirections = new Expand({
      label: "",
      expandIconClass: "esri-icon-directions2",
      view: myview,
      content: directions,



    });

    myview.ui.add(myDirections, "top-left");





    /******************************************* show Availability  **************************************** */


    let checkAvailability = false;

    var showAvailability = document.getElementById("isAvailability").addEventListener("click", () => {

      if (checkAvailability == true) {
        servicesLayer.renderer = myRenderer;
        checkAvailability = false;
        document.getElementById("isAvailability").style.backgroundColor = "LightGray";
        document.getElementById("isAvailability").style.color = "black";


      }
      else {
        checkAvailability = true;
        servicesLayer.renderer = avaRenderer;
        document.getElementById("isAvailability").style.backgroundColor = "DarkSlateGray";
        document.getElementById("isAvailability").style.color = "white";


      }

    })




    /******************************************************* show heat map ************************************************************* */

    let checkDens = false;

    let showDens = document.getElementById("showDens").addEventListener("click", () => {

      if (checkDens == false) {
        reportAccidents.renderer = densRenderer;
        document.getElementById("showDens").style.backgroundColor = "DarkSlateGray";
        document.getElementById("showDens").style.color = "white";


        checkDens = true;
      }
      else {
        reportAccidents.renderer = myReportRenderer;
        document.getElementById("showDens").style.backgroundColor = "LightGray";
        document.getElementById("showDens").style.color = "black";


        checkDens = false;

      }

    })


    /************************************************************* Menu Btn ********************************************************************/


    let isMenuChecked = true;

    var MenuBtn = document.getElementById("menu").addEventListener("click", () => {

      if (isMenuChecked == false) {
        document.getElementById("funcList1").style.display = "none";

        isMenuChecked = true;


      } else {

        document.getElementById("funcList1").style.display = "block";

        isMenuChecked = false;
      }


    })

    /************************************************************* Reset Btn ********************************************************************/



    var clear_botn = document.getElementById("clearGraphic")
    clear_botn.addEventListener("click", function () {

      myview.graphics.removeAll();
      routesLayer.graphics.removeAll();
      routeParams.stops = new FeatureSet();


    })

    /****************************************************************************** */

    var restAll = document.getElementById("resetAll");

    restAll.addEventListener("click", function () {

      myview.graphics.removeAll();
      routesLayer.graphics.removeAll();
      routeParams.stops = new FeatureSet();

      document.getElementById("isAvailability").style.backgroundColor = "LightGray";
      document.getElementById("isAvailability").style.color = "black";
      document.getElementById("showDens").style.backgroundColor = "LightGray";
      document.getElementById("showDens").style.color = "black";


      servicesLayer.renderer = myRenderer;

      reportAccidents.renderer = myReportRenderer;

      
      checkDens = false;

      checkDens = false;

      checkAvailability = false;


      selectServices.value = "All";
      selectReqServices.value = "All";

      servicesLayer.definitionExpression ="";
      reportAccidents.definitionExpression = "";




      cairoBorder.queryExtent().then(function (layerExtent) {

        myview.goTo(layerExtent.extent, { duration: 3000 })
      }).catch(error)





    });






  });
