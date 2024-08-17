import { FC, useLayoutEffect } from "react";
import am5index from "@amcharts/amcharts5/index";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
interface ChartProps {
  a: number | undefined;
  i: number | undefined;
  s: number | undefined;
}
const PieCharts = (props: ChartProps) => {
  useLayoutEffect(() => {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let rootPieCharts = am5.Root.new("chartdivr");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    rootPieCharts.setThemes([am5themes_Animated.new(rootPieCharts)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = rootPieCharts.container.children.push(
      am5percent.PieChart.new(rootPieCharts, {
        layout: rootPieCharts.verticalLayout,
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(rootPieCharts, {
        valueField: "value",
        categoryField: "category",
      })
    );

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll([
      { value: props.a, category: "Agriculture" },
      { value: props.i, category: "Industry" },
      { value: props.s, category: "Service" },
    ]);

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);
    return () => {
      rootPieCharts.dispose();
    };
  }, []);

  return <div id="chartdivr" style={{ width: "600px", height: "400px" }}></div>;
};
export default PieCharts;
