// @TODO: YOUR CODE HERE!

// Step 1 - Create the chart area
var svgWidth = 960;
var svgHeight = 700;
var margin = {
  top: 20,
  right: 40,
  bottom: 150,
  left: 150
};
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Step 2: Create the SVG wrapper
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  


// Step 3: Read in the data and cast the numerical columns
// 
d3.csv("data.csv").then(function(inputData){

    inputData.forEach(function(data) {
        data.age =  +data.age;
        data.ageMoe =  +data.ageMoe;
        data.healthcare =  +data.healthcare;
        data.healthcareHigh =  +data.healthcareHigh;
        data.healthcareLow =  +data.healthcareLow;
        data.id =  +data.id;
        data.income =  +data.income;
        data.incomeMoe =  +data.incomeMoe;
        data.obesity =  +data.obesity;
        data.obesityHigh =  +data.obesityHigh;
        data.obesityLow =  +data.obesityLow;
        data.poverty =  +data.poverty;
        data.povertyMoe =  +data.povertyMoe;
        data.smokes =  +data.smokes;
        data.smokesHigh =  +data.smokesHigh;
        data.smokesLow =  +data.smokesLow;

    });

        // Step 4: Set the variables
        var abbr = inputData.map(data => data.abbr);
        var age = inputData.map(data => data.age);
        var ageMoe = inputData.map(data => data.ageMoe);
        var healthcare = inputData.map(data => data.healthcare);
        var healthcareHigh = inputData.map(data => data.healthcareHigh);
        var healthcareLow = inputData.map(data => data.healthcareLow);
        var id = inputData.map(data => data.id);
        var income = inputData.map(data => data.income);
        var incomeMoe = inputData.map(data => data.incomeMoe);
        var obesity = inputData.map(data => data.obesity);
        var obesityHigh = inputData.map(data => data.obesityHigh);
        var obesityLow = inputData.map(data => data.obesityLow);
        var poverty = inputData.map(data => data.poverty);
        var povertyMoe = inputData.map(data => data.povertyMoe);
        var smokes = inputData.map(data => data.smokes);
        var smokesHigh = inputData.map(data => data.smokesHigh);
        var smokesLow = inputData.map(data => data.smokesLow);
        var st = inputData.map(data => data.state);

        var xval = poverty;
        var xValState = "poverty";
        var yval = healthcare;
        var yValState = "healthcare";
        
    function buildCircles(xValState, yValState, xval, yval){

    
        // Step 5: Create the scales
        var xScale = d3.scaleLinear()
                    .domain(d3.extent(xval))
                    .range([0, chartWidth]);
                    // .classed("entireXaxis", true);

                    
        var yScale = d3.scaleLinear()
                    // .domain([0, d3.max(healthcare)])
                    .domain(d3.extent(yval))
                    .range([chartHeight,0]);

        // Step 6: Create Axes
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);
              
        // Step 7: Append the axes to the chart group
        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
             .classed("entireXaxis", true)
            .call(xAxis);

        chartGroup.append("g")
            .classed("entireYaxis", true)
            .call(yAxis);
        
        // Step 8: Build the circles and append to the chart group
        var circleRadius = 15;
        var circles = chartGroup.selectAll("circle");
        circles.data(inputData)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return xScale(d[xValState]); })
            .attr("cy", function (d) { return yScale(d[yValState]); })
            .attr("r", circleRadius)
            .attr("stroke", "black")
            .attr("stroke_width", "5")
            .attr("fill", "red")
            .classed("circles", true);


            
        // Add text element to the SVG area/bind the data
        var text = chartGroup.selectAll("text").enter();
        
        var textLabels = text.data(inputData)
            .enter()
            .append("text")
        
        // Populate the text in the circles
            .attr("x", function (d) { return xScale(d[xValState]); })
            .attr("y", function (d) { return yScale(d[yValState]); })
            .text(d => (d.abbr))
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .attr("dy", function (d) { return circleRadius - 10 })
            .attr("dx", function (d) { return (circleRadius/2)*-1 })
            .classed("circles", true)
        };   

        //Call circles function to initialize graph
        buildCircles(xValState, yValState, xval, yval);

        // X-Axis In Poverty Label
        chartGroup.append("text")
            .attr("transform", `translate(${chartWidth/2},${chartHeight+ margin.top + 20})`)
            .attr("text-anchor", "middle")
            .attr("font-size","16px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .text("In Poverty (%)")
            .classed("xAxisGroup", true)
            .attr("id", "poverty")
            .classed("selected", true);
        
        // X-Axis Age
        chartGroup.append("text")
            .attr("transform", `translate(${chartWidth/2},${chartHeight+ margin.top + 20})`)
            .attr("text-anchor", "middle")
            .attr("font-size","16px")
            .attr("font-weight", "bold")
            //.attr("fill", "black")
            .text("Age (Median)")
            .classed("xAxisGroup", true)
            .attr("id", "age")
            .attr("dy", "+1.5em")
            .classed("notSelected", true);

         // X-Axis Household income
        chartGroup.append("text")
            .attr("transform", `translate(${chartWidth/2},${chartHeight+ margin.top + 20})`)
            .attr("text-anchor", "middle")
            .attr("font-size","16px")
            .attr("font-weight", "bold")
            //.attr("fill", "black")
            .text("Household Income")
            .classed("xAxisGroup", true)
            .attr("id", "income")
            .attr("dy", "+3em")
            .classed("notSelected", true);
            
        // Y-Axis Label - Lacks Healthcare
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -35)
            .attr("x", 0 - (chartHeight/2))
            .attr("text-anchor", "middle")
            .attr("font-size","16px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .classed("yAxisGroup", true)
            .attr("id", "healthcare")
            .text("Lacks Healthcare (%)")
            .classed("selected", true);   
  
        // Y-Axis Label - Smokes
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -55)
            .attr("x", 0 - (chartHeight/2))
            .attr("text-anchor", "middle")
            .attr("font-size","16px")
            .attr("font-weight", "bold")
            //.attr("fill", "black")
            .classed("yAxisGroup", true)
            .attr("id", "smokes")
            .text("Smokes (%)")
            .classed("notSelected", true);   
        
        // Y-Axis Label - Obese
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -75)
            .attr("x", 0 - (chartHeight/2))
            .attr("text-anchor", "middle")
            .attr("font-size","16px")
            .attr("font-weight", "bold")
            //.attr("fill", "black")
            .classed("yAxisGroup", true)
            .attr("id", "obese")
            .text("Obese (%)")
            .classed("notSelected", true);   
  
// Create Event listener for X-Axis
d3.selectAll(".xAxisGroup").on("click", function () {
    
    //Clear X Axis
    d3.selectAll(".entireXaxis").remove();

    // Clear Circles
    d3.selectAll(".circles").remove();

    // get value of selection
    var xInput = d3.select(this).attr("id")
    // Create the scales
            if(xInput == "poverty"){
                var xScale = d3.scaleLinear()
                .domain(d3.extent(poverty))
                .range([0, chartWidth]);
                xValState = "poverty";
                xval = poverty;
                
            }
            else if (xInput == "age"){
                var xScale = d3.scaleLinear()
                .domain(d3.extent(age))
                .range([0, chartWidth]);
                xValState = "age";
                xval = age;           
            }
            
            else if (xInput == "income"){
                var xScale = d3.scaleLinear()
                .domain(d3.extent(income))
                .range([0, chartWidth]);
                xValState = "income";
                xval = income;
            }       
            
        
    
    //Update axes 
    var bottomAxis = d3.axisBottom(xScale)
    chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .classed("entireXaxis", true)
            .transition()
            .duration(250)           
            .call(bottomAxis)
            
        buildCircles(xValState, yValState, xval, yval);        
        });

// // Create Event listener for Y-Axis
d3.selectAll(".yAxisGroup").on("click", function () {
    
    //Clear Y Axis
    d3.selectAll(".entireYaxis").remove();
    d3.selectAll(".circles").remove();

    // get value of selection
    var yInput = d3.select(this).attr("id")
    // Create the scales
            if(yInput == "healthcare"){
                var yScale = d3.scaleLinear()
                .domain(d3.extent(healthcare))
                .range([chartHeight, 0]);
                yValState = "healthcare";
                yval = healthcare;
            }
            else if (yInput == "smokes"){
                var yScale = d3.scaleLinear()
                .domain(d3.extent(smokes))
                .range([chartHeight, 0]);
                yValState = "smokes";
                yval = smokes;           
            }
            
            else if (yInput == "obese"){
                var yScale = d3.scaleLinear()
                .domain(d3.extent(obesity))
                .range([chartHeight, 0]);
                yValState = "obesity";
                yval = obesity
            }       

            
    //Update axes 
    var verticalAxis = d3.axisLeft(yScale)
    chartGroup.append("g")
            .classed("entireYaxis", true)
            .transition()
            .duration(250)           
            .call(verticalAxis);

        buildCircles(xValState, yValState, xval, yval); 

 
        });
}).catch(function(error) {
    console.log(error);
     });

//python -m http.server