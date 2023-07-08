class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class binarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    //插入一個數值
    const newNode = new Node(value); //插入的值
    if (this.root === null) {
      //如果一個數值都沒有，所以也沒有初始值
      this.root = newNode; //將 value 設定為初始值
    } else {
      let nowNode = this.root;
      while (true) {
        //從 root 開始檢查，符合大小的那側有沒有數值了
        if (newNode.value > nowNode.value) {
          //如果插入值大於比較值
          if (nowNode.right === null) {
            nowNode.right = newNode;
            return 0;
          } else {
            nowNode = nowNode.right;
          }
        } else if (newNode.value < nowNode.value) {
          if (nowNode.left === null) {
            nowNode.left = newNode;
            return 0;
          } else {
            nowNode = nowNode.left;
          }
        } else {
          console.log("輸入值已存在或不是數字");
          return 0;
        }
      }
    }
  }

  lookup(value) {
    if (this.root === null) {
      console.log("沒有數值");
      return 0;
    }
    let nowNode = this.root;

    while (true) {
      if (nowNode.value === value) {
        console.log(nowNode);
        return nowNode;
      } else if (value > nowNode.value) {
        //在右邊
        if (nowNode.right === null) {
          console.log("沒這個數值");
          return 0;
        } else {
          nowNode = nowNode.right;
        }
      } else if (value < nowNode.value) {
        //在左邊
        if (nowNode.left === null) {
          console.log("沒這個數值");
          return 0;
        } else {
          nowNode = nowNode.left;
        }
      }
    }
  }
}

const tree = new binarySearchTree();

tree.insert(9);
//console.log(tree.root);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);
console.log(JSON.stringify(traverse(tree.root)));
//console.log(tree);

function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}
