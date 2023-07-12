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

  remove(value) {
    if (this.root === null) {
      console.log("沒有數值");
      return 0;
    }
    let deleteNodeDirection = true;
    let counter = 0;
    let deleteLastNode = 0;
    let nowNode = this.root;
    while (counter === 0) {
      if (nowNode.right.value === value) {
        deleteLastNode = nowNode;
        deleteNodeDirection = true;
        counter = 1;
      } else if (nowNode.left.value === value) {
        deleteLastNode = nowNode;
        deleteNodeDirection = false;
        counter = 1;
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

    let deleteNode = deleteNodeDirection
      ? deleteLastNode.right
      : deleteLastNode.left;

    nowNode = deleteNode;

    if (!nowNode.right && !nowNode.left) {
      //刪除的節點沒有 child，直接刪除就好
      deleteNode = null;
      //不太確定這邊 nowNode 是不是也要等於 null
      return 0;
    } else if (nowNode.left && !nowNode.right) {
      if (deleteNodeDirection) {
        deleteLastNode.right = nowNode.left;
      } else if (!deleteNodeDirection) {
        deleteLastNode.left = nowNode.left;
      }
      deleteNode = null;
      return 0;
    } else if (!nowNode.left && nowNode.right) {
      if (deleteNodeDirection) {
        deleteLastNode.right = nowNode.right;
      } else if (!deleteNodeDirection) {
        deleteLastNode.left = nowNode.right;
      }
      deleteNode = null;
      return 0;
    } else if (nowNode.left && nowNode.right) {
      if (!nowNode.right.left && nowNode.right.right) {
        //如果delete的右邊只有右邊
        //接上去取代delete
        nowNode.right.left = deleteNode.left;
        deleteNode = null;
        if (deleteNodeDirection) {
          deleteLastNode.right = nowNode.right;
        } else if (!deleteNodeDirection) {
          deleteLastNode.left = nowNode.right;
        }
        return 0;
      }

      if (!nowNode.right.left && !nowNode.right.right) {
        nowNode.right.left = deleteNode.left;
        deleteNode = null;
        if (deleteNodeDirection) {
          deleteLastNode.right = nowNode.right;
        } else if (!deleteNodeDirection) {
          deleteLastNode.left = nowNode.right;
        }
        return 0;
      }

      if (nowNode.right.left) {
        let changeNode = 0;
        nowNode = nowNode.right;
        counter = 0;
        while (counter === 0) {
          if (!nowNode.left.left) {
            if (nowNode.left.right) {
              changeNode = nowNode.left;
              nowNode.left = changeNode.right;
              changeNode.right = deleteNode.right;
              changeNode.left = deleteNode.left;
            } else {
              changeNode = nowNode.left;
              nowNode.left = null;
              changeNode.left = deleteNode.left;
              changeNode.right = deleteNode.right;
            }

            if (deleteNodeDirection) {
              deleteLastNode.right = changeNode;
            } else if (!deleteNodeDirection) {
              deleteLastNode.left = changeNode;
            }
            return 0;
          } else {
            nowNode = nowNode.left;
          }
        }
      }

      /*
      給右邊下一個node
      迴圈{
      如果下一個node兩邊都沒有，直接取代 delete
      如果下一個node有左邊，給左邊下一個node，自己跟上
      如果有右邊，就取代 delete
      如果有兩邊檢視左邊下一個node，自己跟上
      }
      */
    }
  }
}

const tree = new binarySearchTree();

tree.insert(9);
//console.log(tree.root);
tree.insert(4);
tree.insert(20);
tree.insert(15);
tree.insert(80);
tree.insert(1);
tree.insert(8);
tree.insert(6);
tree.insert(5);
tree.insert(7);
tree.remove(4);
console.log(JSON.stringify(traverse(tree.root)));
//console.log(tree);

function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}
