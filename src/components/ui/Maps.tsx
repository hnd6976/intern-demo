import { FC, useLayoutEffect } from "react";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
interface Props {
  cca2: string | undefined;
}
const Maps = (props: Props) => {
  useLayoutEffect(() => {
    console.log(props.cca2);
    let root = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    // https://www.amcharts.com/docs/v5/charts/map-chart/
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
      })
    );

    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
    });
    polygonSeries.data.setAll([
      {
        id: props.cca2?.toString(),
        polygonSettings: {
          fill: am5.color(0xff5733),
        },
      },
    ]);
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: root.interfaceColors.get("primaryButtonHover"),
    });

    polygonSeries.mapPolygons.template.states.create("active", {
      fill: am5.color(0xff5733),
    });

    // Create series for background fill
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    let backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      fillOpacity: 0.1,
      strokeOpacity: 0,
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    let graticuleSeries = chart.series.unshift(
      am5map.GraticuleSeries.new(root, {
        step: 10,
      })
    );

    graticuleSeries.mapLines.template.set("strokeOpacity", 0.1);

    // Set up events
    let previousPolygon: any;
    polygonSeries.mapPolygons.template._entities[0].set("active", true);

    polygonSeries.mapPolygons.template.on(
      "active",
      function (active, target: any) {
        if (previousPolygon && previousPolygon != target) {
          previousPolygon.set("active", false);
        }
        if (target.get("active")) {
          selectCountry(target.dataItem.get("id"));
        }
        previousPolygon = target;
      }
    );

    function selectCountry(id: any) {
      let dataItem: any = polygonSeries.getDataItemById(id);

      let target = dataItem.get("mapPolygon");
      if (target) {
        let centroid = target.geoCentroid();

        if (centroid) {
          chart.animate({
            key: "rotationX",
            to: -centroid.longitude,
            duration: 1500,
            easing: am5.ease.inOut(am5.ease.cubic),
          });
          chart.animate({
            key: "rotationY",
            to: -centroid.latitude,
            duration: 1500,
            easing: am5.ease.inOut(am5.ease.cubic),
          });
        }
      }
    }

    // Uncomment this to pre-center the globe on a country when it loads
    polygonSeries.events.on("datavalidated", function () {
      selectCountry(props.cca2);
    });

    // Make stuff animate on load
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "400px", height: "400px" }}></div>;
};
export default Maps;
