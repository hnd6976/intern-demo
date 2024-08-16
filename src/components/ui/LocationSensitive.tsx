import { useLayoutEffect } from "react";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import am5geodata_data_countries2 from "@amcharts/amcharts5-geodata/data/countries2";
import useWindowDimensions from "@/hooks/useWindowDimensions";
function LocationSensitive() {
  const { height, width } = useWindowDimensions();
  useLayoutEffect(() => {
    let rootLocation = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    rootLocation.setThemes([am5themes_Animated.new(rootLocation)]);

    // Create the map chart
    // https://www.amcharts.com/docs/v5/charts/map-chart/
    let chart = rootLocation.container.children.push(
      am5map.MapChart.new(rootLocation, {
        panX: "rotateX",
        projection: am5map.geoMercator(),
        layout: rootLocation.horizontalLayout,
      })
    );

    am5.net
      .load("https://www.amcharts.com/tools/country/?v=xz6Z", chart)
      .then(function (result: any) {
        let geo = am5.JSONParser.parse(result.response);
        loadGeodata(geo.country_code);
      });

    // Create polygon series for continents
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(rootLocation, {
        calculateAggregates: true,
        valueField: "value",
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677935),
    });

    polygonSeries.set("heatRules", [
      {
        target: polygonSeries.mapPolygons.template,
        dataField: "value",
        min: am5.color(0x8ab7ff),
        max: am5.color(0x25529a),
        key: "fill",
      },
    ]);

    polygonSeries.mapPolygons.template.events.on(
      "pointerover",
      function (ev: any) {
        heatLegend.showValue(ev.target.dataItem.get("value"));
      }
    );

    function loadGeodata(country: any) {
      // Default map
      let defaultMap = "usaLow";

      if (country == "US") {
        chart.set("projection", am5map.geoAlbersUsa());
      } else {
        chart.set("projection", am5map.geoMercator());
      }

      // calculate which map to be used
      let currentMap = defaultMap;
      let title = "";
      console.log(am5geodata_data_countries2[0]);
      if (am5geodata_data_countries2[country] !== undefined) {
        currentMap = am5geodata_data_countries2[country]["maps"][0];

        // add country title
        if (am5geodata_data_countries2[country]["country"]) {
          title = am5geodata_data_countries2[country]["country"];
        }
      }

      am5.net
        .load(
          "https://cdn.amcharts.com/lib/5/geodata/json/" + currentMap + ".json",
          chart
        )
        .then(function (result: any) {
          let geodata = am5.JSONParser.parse(result.response);
          let data = [];
          for (var i = 0; i < geodata.features.length; i++) {
            data.push({
              id: geodata.features[i].id,
              value: Math.round(Math.random() * 10000),
            });
          }

          polygonSeries.set("geoJSON", geodata);
          polygonSeries.data.setAll(data);
        });

      chart.seriesContainer.children.push(
        am5.Label.new(rootLocation, {
          x: 5,
          y: 5,
          text: title,
          background: am5.RoundedRectangle.new(rootLocation, {
            fill: am5.color(0xffffff),
            fillOpacity: 0.2,
          }),
        })
      );
    }

    let heatLegend = chart.children.push(
      am5.HeatLegend.new(rootLocation, {
        orientation: "vertical",
        startColor: am5.color(0x8ab7ff),
        endColor: am5.color(0x25529a),
        startText: "Lowest",
        endText: "Highest",
        stepCount: 5,
      })
    );

    heatLegend.startLabel.setAll({
      fontSize: 12,
      fill: heatLegend.get("startColor"),
    });

    heatLegend.endLabel.setAll({
      fontSize: 12,
      fill: heatLegend.get("endColor"),
    });

    // change this to template when possible
    polygonSeries.events.on("datavalidated", function () {
      heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
      heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
    });
    return () => {
      rootLocation.dispose();
    };
  }, []);

  return (
    <div
      id="chartdiv"
      style={{
        width: 600,
        height: 600,
      }}
    ></div>
  );
}
export default LocationSensitive;
