import BinaryTreeNode from "./BinaryTreeNode";

class BinaryTree {
    constructor() {
        this.root = null;
        this.leafInLevel = {};
        this.vertexInLevel = {};
    }

    //Добавление узла в дерево
    add(value) {
        const _add = (currentNode, newNode) => {
            if (this.isEmpty()) {
                newNode.parent = null;
                this.root = newNode;
            } else {
                if (!this.search(newNode.value)){
                    currentNode = currentNode === this.root ? this.root : currentNode;
                    newNode.parent = currentNode;

                    return currentNode.value > newNode.value ?
                        currentNode.leftNode == null ? currentNode.leftNode = newNode : _add(currentNode.leftNode, newNode)
                        :
                        currentNode.rightNode == null ? currentNode.rightNode = newNode : _add(currentNode.rightNode, newNode)
                }
            }
        };
        return _add(this.root, new BinaryTreeNode(value))
    }

    //удаление узла из дерева
    remove(value) {
        let currentNode = this.search(value);
        if (currentNode) {
            if (currentNode === this.root) {
                return this.root = null;
            }
            if (this.isLeaf(currentNode)) {
                return currentNode.value < currentNode.parent.value ?
                    currentNode.parent.leftNode = null :
                    currentNode.parent.rightNode = null;
            }
            if (currentNode.leftNode && currentNode.rightNode) {
                let replacementNode = currentNode.leftNode;
                while (replacementNode.rightNode) {
                    replacementNode = replacementNode.rightNode;
                }
                this.remove(replacementNode.value);
                return currentNode.value = replacementNode.value;
            }
            if (currentNode.leftNode || currentNode.rightNode) {
                return currentNode.value < currentNode.parent.value ?
                    currentNode.parent.leftNode = (currentNode.leftNode || currentNode.rightNode) :
                    currentNode.parent.rightNode = (currentNode.leftNode || currentNode.rightNode);
            }
        } else return false;
    }

    //поиск узла возвращает узел или false
    search(value) {
        const search = (currentNode, value) => {
            if (!this.isEmpty() && currentNode !== null ) {
                if (currentNode.value === value) return currentNode;
                return value < currentNode.value ? search(currentNode.leftNode, value) : search(currentNode.rightNode, value);
            } else return false;
        };
        return search(this.root, value);
    }

    //определение количества вершин и листьев на каждом уровне дерева
    searchVertexAndLeaf() {
        this.leafInLevel = {};
        this.vertexInLevel = {};
        const searchLeaf = (currentNode, map, level) => {
            if (!this.vertexInLevel[level]) {
                this.vertexInLevel[level] = 0;
                this.leafInLevel[level] = 0;
            }
            if (this.isLeaf(currentNode)) this.leafInLevel[level]++;
            this.vertexInLevel[level]++;
            if (currentNode.leftNode) searchLeaf(currentNode.leftNode, map, level + 1);
            if (currentNode.rightNode) searchLeaf(currentNode.rightNode, map, level + 1);
        };
        return searchLeaf(this.root, this.vertexInLevel, 0);
    }

    isLeaf(node) {
        return !node.leftNode && !node.rightNode;
    }

    isEmpty() {
        return this.root == null;
    }

    //вывод дерева на консоль
    print() {
        const print = (startNode, indent, side) => {
            if (startNode != null) {
                let nodeSide = !side ? "+" : side === "left" ? "L" : "R";
                console.log(`${indent} [${nodeSide}] - ${startNode.value}`);
                indent += '\t';
                print(startNode.leftNode, indent, "left");
                print(startNode.rightNode, indent, "right");
            }
        };
        return print(this.root, "", null);
    }

    //преобразование дерева в формат для визуализации в виде массива объектов [потомок - родитель]
    toD3data() {
        let obj = [];
        const add = (startNode) => {
            if (startNode != null) {
                obj.push({"child": startNode.value, "parent": startNode.parent == null ? "" : startNode.parent.value});
                add(startNode.leftNode);
                add(startNode.rightNode);
            }
        };
        add(this.root);
        return obj;
    }

}

export default BinaryTree