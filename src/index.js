import BinaryTree from "./BinaryTree/BinaryTree";
import paintTree from "./WorkWithTree";

let tree = new BinaryTree();
let array = [13, 7, 15, 14, 16];

//, 5, 9, 4, 6, 8, 10, 20

//заполнение дерева из массива
array.forEach(element => tree.add(element));
//визуализация дерева


//назначение кнопке "Добавить" обработчика события
let buttonAdd = document.getElementById("btn-add");
if (buttonAdd) buttonAdd.addEventListener("click", () => {
    let inputAdd = Number(document.getElementById("node-add").value);
    tree.add(inputAdd);
    //перерисовка дерева
    document.querySelector("svg").remove();
    paintTree(tree.toD3data());
    //подсчёт векторов и вершин на каждом уровне
    tree.searchVertexAndLeaf();
//вывод информации об этом
    document.querySelector("div.vertex-leafs").innerHTML = "";
    for (let i in tree.vertexInLevel) {
        let vertex = document.createElement('p');
        vertex.textContent = `На ${Number(i) + 1} уровне вершин: ${tree.vertexInLevel[i]}, листьев: ${tree.leafInLevel[i]}`;
        document.querySelector("div.vertex-leafs").append(vertex);
    }
});

//назначение кнопке "Удалить" обработчика события
let buttonRemove = document.getElementById("btn-remove");
if (buttonRemove) buttonRemove.addEventListener("click", e => {
    let removedValue = Number(document.getElementById("node-remove").value);
    tree.remove(removedValue);
    //перерисовка дерева
    document.querySelector("svg").remove();
    paintTree(tree.toD3data());
    //подсчёт векторов и вершин на каждом уровне
    tree.searchVertexAndLeaf();
    document.querySelector("div.vertex-leafs").innerHTML = "";
//вывод информации об этом
    for (let i in tree.vertexInLevel) {
        let vertex = document.createElement('p');
        vertex.textContent = `На ${Number(i) + 1} уровне вершин: ${tree.vertexInLevel[i]}, листьев: ${tree.leafInLevel[i]}`;
        document.querySelector("div.vertex-leafs").append(vertex);
    }
});

//назначение кнопке "Поиск" обработчика события
let buttonSearch = document.getElementById("btn-search");
if (buttonSearch) buttonSearch.addEventListener("click", () => {
    let searchedValue = Number(document.getElementById("node-search").value);
    let element = tree.search(searchedValue);
    //вывод информации о найденом(или нет) узле
    document.querySelector("p.search").textContent = element ? `Узел ${element.value} найден` : "Такого узла нет";


});


paintTree(tree.toD3data());
tree.searchVertexAndLeaf();
document.querySelector("div.vertex-leafs").innerHTML = "";
//вывод информации об этом
for (let i in tree.vertexInLevel) {
    let vertex = document.createElement('p');
    vertex.textContent = `На ${Number(i) + 1} уровне вершин: ${tree.vertexInLevel[i]}, листьев: ${tree.leafInLevel[i]}`;
    document.querySelector("div.vertex-leafs").append(vertex);
}
