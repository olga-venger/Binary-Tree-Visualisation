import * as d3 from "d3";

//визуализация дерева
function paintTree(data) {
    //добавление в DOM элемента svg
    let svg = d3.select("div#svg-tree").append("svg")
        .attr("width", 600).attr("height", 600)
        .append("g").attr("transform", "translate(50,50)");

    //определение структуры данных для визуализации (парсит массив объектов [потомок - родитель])
    let dataStructure = d3.stratify()
        .id(d => d.child)
        .parentId(d => d.parent)(data);

    //определение размеров дерева
    let treeStructure = d3.tree().size([500, 400]);
    let information = treeStructure(dataStructure);

    //визуализация связей
    let connections = svg.append("g").selectAll("path")
        .data(information.links());
    connections.enter().append("path")
        .attr("d", d => "M" + d.source.x + "," + d.source.y + " v 50 H" +
            d.target.x + " V" + d.target.y);

    //визуализация узлов
    let rectangles = svg.append("g").selectAll("rect")
        .data(information.descendants());
    rectangles.enter().append("rect")
        .attr("x", d => d.x - 20)
        .attr("y", d => d.y - 20);

    //визуализация подписей к узлам
    let names = svg.append("g").selectAll("text").data(information.descendants());
    names.enter().append("text")
        .text(d => d.data.child)
        .attr("x", d => d.x)
        .attr("y", d => d.y);
}

export default paintTree;