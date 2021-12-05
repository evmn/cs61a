var editURL = "http://composingprograms.com/tutor.html";

function htmlDecode(value){
  return $('<div/>').html(value).text();
}

// Renders all Online Python Tutor content.
function renderPythonTutor() {
    $(".example").each(function(i, e) {
        var id = e.id;
        var trace = eval(id + "_trace");

        // Reverse HTML escaping from docutils
        trace.code = htmlDecode(trace.code)

        var labels = e.attributes["data-showAllFrameLabels"].value == "True"
        var step = eval(e.attributes["data-step"].value);
        var jumpToEnd = null;
        if (step == -1) {
            step = 0;
            jumpToEnd = true;
        }
        var output = e.attributes["data-output"].value == "True";
        var options = {
            jumpToEnd: jumpToEnd,
            startingInstruction: step,
            compactFuncLabels: true,
            editCodeBaseURL: editURL,
            embeddedMode: true,
            showAllFrameLabels: labels
        }
        e.innerHTML="";
        new ExecutionVisualizer(id, trace, options);
    })
}

// Enables the link in the contents titled "Hide Contents".
function enableHideContents() {
    $("#hide_contents").click(function() {
        $(".nav-docs").hide();
        $(".wrap").width("95%");
        $(".inner-content").width("100%");
        globalRepaintEverything();
    });
}

// Renders an expression tree using d3.
//
// From: http://bl.ocks.org/d3noob/8326869
function renderExpressionTree(id, data) {
    var width = 500, height = 400;
    var tree = d3.layout.tree().size([width - 40, height - 40]);

    console.log(data);
    var nodes = tree.nodes(data);
    var links = tree.links(nodes);

    var svg = d3.select("#" + id).append("svg")
        .attr('width', width).attr('height', height);
    svg.selectAll('.link').data(links).enter()
       .append('line').attr('class', 'link')
       .attr('x1', function(d){return d.source.x})
       .attr('y1', function(d){return d.source.y + 20})
       .attr('x2', function(d){return d.target.x})
       .attr('y2', function(d){return d.target.y + 20})
       .attr('stroke', 'blue');
    svg.selectAll('.node').data(nodes).enter()
       .append('text')
       .attr('x', function(d){return d.x})
       .attr('y', function(d){return d.y + 20})
       .text(function(d){return d.hasOwnProperty('expression') ? d.expression + " -> " + d.value : d.value;});
}

// Renders all expression trees.
function renderExpressionTrees() {
    $(".expression").each(function(i, e) {
        var id = e.id;
        var data = eval(id + "_tree");
        renderExpressionTree(id, data);
    })
}

$(document).ready(renderPythonTutor);
$(document).ready(enableHideContents);
$(document).ready(renderExpressionTrees);
setTimeout(globalRepaintEverything, 2000);
setTimeout(globalRepaintEverything, 5000);
