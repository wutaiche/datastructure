//一，二叉排序树

function BinarySearchTree(){
        this.root = new Node(null);
    }
function Node(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
BinarySearchTree.prototype = {
  constructor: BinarySearchTree,
  insertNode:function(node,newNode){
     if(node === this.root && node.key === null){
       node.key = newNode.key;
       return;
     }
     if(newNode.key < node.key){
       if(node.left === null){
         node.left = newNode;
       }else {
         this.insertNode(node.left,newNode);
       }
     } else {
       if(node.right === null){
         node.right = newNode;
       }else {
         this.insertNode(node.right,newNode);
       }
     }
  },
  inOrderTraverseNode:function(node){
    if(node !== null && node.key!==null){
      this.inOrderTraverseNode(node.left);
      console.log(node.key);
      this.inOrderTraverseNode(node.right);
    }
  },
  preOrderTraverseNode:function(node){
    if(node !== null && node.key!==null){
      console.log(node.key);
      this.preOrderTraverseNode(node.left);
      this.preOrderTraverseNode(node.right);
    }
  },
  postOrderTraverseNode:function(node){
    if(node !== null && node.key!==null){
      this.postOrderTraverseNode(node.left);
      this.postOrderTraverseNode(node.right);
      console.log(node.key);
    }
  },
  parent:function(parent,node,key){
    if(node === null){
      return false;
    }
    if(node.key === key && node ===this.root ){
      return [this.root,null];
    }
    if(key>node.key){
     return this.parent(node,node.right,key)
    }else if(key<node.key){
     return this.parent(node,node.left,key)
    }else{
      if(parent.right&&node.key === parent.right.key){
        return [parent,'right']
      }else{
        return [parent,'left']
      }
    }

  },
  maxNode:function(node){
    if(node&&node.key!==null){
      while(node&&node.right !== null){
        node = node.right;
      }
    }
    return node;
  },
  minNode:function(node){
    if(node&&node.key!==null){
      while(node&&node.left !== null){
        node = node.left;
      }
    }
    return node;
  },
  searchNode:function(node,key){
    if ((node ===this.root&&node.key === null)||node === null){
        return false;
    }
    if(key <node.key){
      return this.searchNode(node.left,key);
    } else if(key>node.key){
      return this.searchNode(node.right,key);
    }else{
      return true;
    }
  },
  removeNode:function(node,key){
    if((node ===this.root&&node.key === null)||node === null){
      return null;
    }
    if(key<node.key){
      this.removeNode(node.left,key);
    }else if(key>node.key){
      this.removeNode(node.right,key);
    }else{
      let [parent,attr] = this.parent(null,this.root,key);
      if(node.left === null && node.right === null){
      
         if(attr === null){
            this.root.key = null;
         } else {
            parent[attr] = null;
         }
         return true;
      }
      if(node.left === null ){
        if(attr === null){
          this.root = node.right;
        }
        parent[attr] === node.right;
        return node;
      }
      if(node.right === null ){
        if(attr === null){
          this.root = node.right;
        }
        parent[attr] === node.left;
        return node;
      }
      let aux = this.minNode(node.right);
      this.removeNode(node.right,aux.key);
      node.key = aux.key;
      return node;
    }
  },
  init:function(arr){
    arr.forEach(item=>{
      let node = new Node(item);
      this.insertNode(this.root,node);
    })
  }

  

}

let tree = new BinarySearchTree();
tree.init([5,3,4,2,9,8,6,7,12]);
tree.removeNode(tree.root,3);
tree.inOrderTraverseNode(tree.root);
//二 ,AVL树

//因为js只能改变引用的属性，不能整体赋值，所以在插入和删除时必须找到结
//点的父结点。
function AVLTree(){
  this.root = null;
};
function TreeNode(key){
  this.key = key; //结点的值
  this.hgt = 0;   //结点的高度
  this.left = null; //结点的左孩子
  this.right = null; //结点的右孩子
  this.freq = 1;     //结点的频率，表示有几个一样的值。
}
AVLTree.prototype = {
  constructor:AVLTree,
//找结点的父结点
  parent:function(parent,node,key){
    if(node === null){
      return false;
    }
    if(node.key === key && node ===this.root ){
      return [this.root,null];
    }
    if(key>node.key){
     return this.parent(node,node.right,key)
    }else if(key<node.key){
     return this.parent(node,node.left,key)
    }else{
      if(parent.right && node.key === parent.right.key){
        return [parent,'right']
      }else{
        return [parent,'left']
      }
    }

  },
//求结点的高度
  height:function(node){
    if(node !== null){
      return node.hgt;
    }
    return -1;
  },
//找出孩子最大高度
  max:function(node1,node2){
    return Math.max(this.height(node1),this.height(node2));
  },
//左旋转
  rotateLeft:function(node){
     let p = this.parent(null,this.root,node.key);
     let k  = node.right;
     node.right = k.left;
     k.left = node;
     if(p[1] === null){
       this.root = k;
     }else {
       p[0][p[1]] = k;
     }
     node.hgt = this.max(node.left,node.right)+1;
     k.hgt = this.max(k.left,k.right)+1;
   },
//右旋转
   rotateRight:function(node){
     let p = this.parent(null,this.root,node.key);
     let k = node.left;
     node.left = k.right;
     k.right = node;
     if(p[1] === null){
       this.root = k;
     }else {
       p[0][p[1]] = k;
     }
     node.hgt = this.max(node.left,node.right)+1;
     k.hgt = this.max(k.left,k.right)+1;
   },
//先左旋转在右旋转
   doubleRotateLR:function(node){
     this.rotateLeft(node.left);
     this.rotateRight(node);
   },
//先右旋转在左旋转
   doubleRotateRL:function(node){
     this.rotateRight(node.right);
     this.rotateLeft(node);
   },
//插入结点
   insertNode:function(parent,node,key){
     if(node === null){
       if(this.root === null){
         this.root = new TreeNode(key);
       }else{
          node = new TreeNode(key);
          if(parent.key < node.key){
            parent.right = node;
          }else{
            parent.left = node;
          }
       }
       return;
     }
     if(node.key > key){
       this.insertNode(node,node.left,key);
       if(2==this.height(node.left)-this.height(node.right)){
         if(key<node.left.key){
           this.rotateRight(node);
         } else {
           this.doubleRotateLR(node);
         }
       }
     }else if(node.key < key){
       this.insertNode(node,node.right,key);
       if(2==this.height(node.right)-this.height(node.left)){
         if(key>node.right.key){
           this.rotateLeft(node);
         }else {
           this.doubleRotateRL(node);
         }
       }
     }else{
       node.freq += 1;
     }
     node.hgt = this.max(node.left,node.right)+1;
   },

//删除结点

   deleteNode:function(parent,node,key){
       if(node ===null){
         return false;
       }
       if(key<node.key){
         this.deleteNode(node,node.left,key);
         if(2==this.height(node.right)-this.height(node.left)){
         if(key>node.right.key){
           this.rotateLeft(node);
         }else {
           this.doubleRotateRL(node);
         }
       }
      }else if(key > node.key){
        this.deleteNode(node,node.right,key);
        if(2==this.height(node.left)-this.height(node.right)){
         if(key<node.left.key){
           this.rotateRight(node);
         } else {
           this.doubleRotateLR(node);
         }
       }
      }else {
        if(node.left&&node.right){
         let temp = node.right,tempParent;
          while(temp.left!==null){
            tempParent = temp;
            temp = temp.left;
          }
          node.key = temp.key;
          node.freq = temp.freq;
          this.deleteNode(tempParent,temp,temp.key);
          if(2==this.height(tempParent.right)-this.height(tempParent.left)){
            if(temp.key>tempParent.right.key){
              this.rotateLeft(tempParent);
            }else {
              this.doubleRotateRL(tempParent);
            }
          }
        }else{
        
          if(node.left === null && node.right === null ){
            if(parent ===null ){
              this.root === null;
            }else{
             node.key === parent.left.key ? parent.left = null:parent.right = null;
            }
          }else if(node.right === null){
            if(parent ===null ){
              this.root = this.root.left;
            }else{
              node.key === parent.left.key ? parent.left = node.left:parent.right = node.left;
            }
          }else{
            if(parent === null){
              this.root = this.root.right;
            }else{
            node.key === parent.left.key ? parent.left = node.right:parent.right = node.right;
            }
          }
        }
      }
      if(node!==null){
        node.hgt = this.max(node.left,node.right)+1;
      }
   },
//初始化AVL树
   init:function(array){
       array.forEach(item=>{
          this.insertNode(null,this.root,item);
       })
   }
}

let tree1 = new AVLTree();
tree1.init([3,2,1,6,7,8,9,12,32,4,5,6]);
tree1.deleteNode(null,tree1.root,9);
console.log(tree1);



红黑树

function RedBlackTree(){
  this.root = null;
}
function TreeNode(key){
  this.key = key;
  this.color = 1;
  this.left = 'Nil';
  this.right = 'Nil';
  this.parent = null;
}
RedBlackTree.prototype = {
  constructor:RedBlackTree,
  grandparent:function(node){
    if(node.parent === null){
      return null;
    }
     return node.parent.parent;
  },
  uncle:function(node){
    let grandparent = this.grandparent(node);
    if(grandparent===null){
      return null;
    }
    if(node.parent === grandparent.left){
      return grandparent.right;
    }else{
      return grandparent.left;
    }
  },
  sibling:function(node){
    let parent = node.parent;
    if(parent){
      return parent.left === node ? parent.right:parent.left;
    }
    return null;
  },
  rotateLeft:function(node){
    let parent = node.parent;
    let right = node.right;
    node.right = right.left;
    if(right.left!=='Nil'){
      right.left.parent = node;
    }
    right.left = node;
    node.parent = right;
    if(parent===null){
      this.root = right;
      right.parent = null;
    }else{
      
      right.parent = parent;
      if(parent.right.key === node.key){
        parent.right = right;
      }else {
        parent.left = right;
      }
    }

  },
  rotateRight:function(node){
    let parent = node.parent;
    let left = node.left;
    node.left = left.right;
    if(left.right!=='Nil'){
      left.right.parent = node;
    }
    left.right = node;
    node.parent = left;
    if(parent ===null){
      this.root = left;
      left.parent = null;
    }else{
      left.parent = parent;
      if(parent.right.key === node.key){
        parent.right = left;
      } else {
        parent.left = left;
      }
    }
  },
  insertNode:function(p,key){
    if(p===null){
      this.root = new TreeNode(key);
      this.root.color = 0;
      return;
    }
    if(p.key>key){
      if(p.left!=='Nil'){
        this.insertNode(p.left,key);
      } else {
        p.left = new TreeNode(key);
        p.left.parent = p;
        this.insertCase(p.left);
      }
    }else{
      if(p.right!='Nil'){
        this.insertNode(p.right,key);
      } else {
        p.right = new TreeNode(key);
        p.right.parent = p
        this.insertCase(p.right);
      }
    }
  },
  insertCase:function(p){
    let grandparent = this.grandparent(p);
    let uncle = this.uncle(p);
    if(p.parent === null){
      this.root = p;
      p.color = 0;
      return;
    }
    if(p.parent.color === 1){
      if(uncle && uncle.color===1){
        p.parent.color = uncle.color = 0;
        grandparent.color = 1;
        this.insertCase(grandparent);
      } else {
        if(p.parent.right === p && grandparent && grandparent.left === p.parent){
          this.rotateLeft(p.parent);
          this.rotateRight(p.parent);
          p.color = 0;
          p.left.color = p.right.color = 1;
        } else if (p.parent.left ===p && grandparent && grandparent.right === p.parent){
          this.rotateRight(p.parent);
          this.rotateLeft(p.parent);
          p.color = 0;
          p.left.color = p.right.color = 1;
        }else if(p.parent.right === p && grandparent && grandparent.right === p.parent){
          p.parent.color = 0;
          grandparent.color = 1;
          this.rotateLeft(grandparent);
        }else if(p.parent.left ===p && grandparent && grandparent.left === p.parent){
          p.parent.color = 0;
          grandparent.color = 1;
          this.rotateRight(grandparent);
        }
      }
    }
  },
  init:function(array){
   array.forEach(item => {
      this.insertNode(this.root,item);
    });
  },
  deleteNode(p,key){
    if(p.key > key){
      if(p.left === 'Nil'){
        return false;
      }else {
        this.deleteNode(p.left,key);
      }
    } else if (p.key < key){
      if(p.right === 'Nil'){
        return false;
      }else {
        this.deleteNode(p.right,key);
      }
    } else if(p.key ===key){
      let parent = p.parent
      if(p.right==='Nil' && p.left==='Nil'){
        if(parent === null){
          this.root = null;
        }else {
          if(p.color===0){
            this.deleteCase(p)
          }
          parent.left.key === p.key? parent.left ='Nil' : parent.right = 'Nil';
        }
        p = null
      }else if (p.right === 'Nil'||p.left === 'Nil'){
        if(parent ===null ){
          this.root = p.right ==='Nil'? p.left:p.right;
          this.root.color = 0;
          this.root.parent = null;
        } else {
          let newNode = p.right ==='Nil'? p.left:p.right;
          parent.left.key === p.key? parent.left = newNode : parent.right = newNode;
          newNode.parent = parent;
          newNode.color = 0;
        }
        p = null
      }
       else {
        let temp = p.right
        while(temp.left !== 'Nil'){
          temp = temp.left;
        }
        p.key = temp.key;
        this.deleteNode(temp,temp.key);

      }
     
    }
  },
  deleteCase:function(p){
    let sibling = this.sibling(p);
    if(p.parent === null){
      p.color = 0;
      return;
    }
    if(sibling.color === 1){
      sibling.color = 0;
      p.parent.color = 1;
      if(p.parent.left===p){
        this.rotateLeft(p.parent);
      }else{
        this.rotateRight(p.parent);
      }
    }
    if(p.parent.color===0&&sibling.color===0&&sibling.left==='Nil'&&sibling.right==='Nil'){
      sibling.color = 1;
      this.deleteCase(p.parent);
    }else if (p.parent.color===1&&sibling.left==='Nil'&&sibling.right==='Nil'){
      p.parent.color = 0;
      sibling.color = 1;
    } else {
     if(sibling.color === 0 ){
       if(p===p.parent.left&&sibling.left.color===1&&sibling.right==='Nil'){
         sibling.left.color = 0;
         sibling.color = 1;
         this.rotateRight(sibling);
       } else if (p===p.parent.right&&sibling.right.color===1&&sibling.left==='Nil'){
         sibling.right.color = 0;
         sibling.color = 1;
         this.rotateLeft(sibling)
       }
       sibling.color = p.parent.color;
       p.parent.color = 0;
       if(p===p.parent.left){
         sibling.right.color = 0;
         this.rotateLeft(p.parent);
       }else {
         sibling.left.color = 0;
         this.rotateRight(p.parent);
       }
     }

    }
  }

}

let redBlackTree = new RedBlackTree();
redBlackTree.init([2,1,6,7,8,9,12,32,4,3,5])
redBlackTree.deleteNode(redBlackTree.root,1);
console.log(redBlackTree);



//B树

//B树的插入是从根结点从上向下递归向下插入的。

//1，如果根结点满了，则生成一个新的根节点，原根节点作为新根节点的第一个孩子，并对该孩子进行分裂操作。 
//2，若是内部节点，每次向适当孩子传递操作时，都需要检查该子树是否已满，若满则分裂该子树，再将插入操作传递到适当的子树中。 
//3，若是叶子节点，则在适当的位置插入需要插入的key
function BTree(degree){
       if(degree<2||typeof(degree) == "undefined"){
           degree = 2;
       }
       this.t = degree;
       this.minKeyNum = degree - 1;
       this.maxKeyNum = 2*degree -1;
       this.root = new TreeNode(this.t);
   }
   function TreeNode(degree){
       this.n = 0;
       this.keys = [];
       this.children  = [];
       this.isLeaf = true;
       this.minKeyNum = degree - 1;
       this.maxKeyNum = 2*degree -1;
   }
   TreeNode.prototype = {
       constructor:TreeNode,
       insertKey:function(index,key){
           this.keys.splice(index,0,key);
           this.n++;
           if(this.n > this.maxKeyNum){
               this.keys.pop();
           }
       },
       removeKey:function(index){
          let key = this.keys.splice(index,1);
          this.n--;
          return key;
       },
       insertChild:function(index,child){
           this.children.splice(index,0,child);
           if(this.children.length > this.maxKeyNum+1){
               this.children.pop();
           }
       },
       removeChild:function(index){
           let child = this.children.splice(index,1);
           return child;
       }
   }
   BTree.prototype = {
       constructor:BTree,
       sliptChild:function(node,index){
           let z = new TreeNode(this.t);
           let y = node.children[index];
           z.isLeaf = y.isLeaf;
          //  z.keys = new Array(this.minKeyNum).fill(0);
           for (let j = this.maxKeyNum-1; j > this.minKeyNum;j--){
               z.keys.unshift(y.keys[j]);
               z.n ++;
               y.removeKey(j);
           }
           if(!y.isLeaf){
               for(let j = this.maxKeyNum;j>this.minKeyNum;j--){
                   z.children.unshift(y.children[j]);
                   y.removeChild(j);
               }
           }
         
           node.insertChild(index+1,z);
           node.insertKey(index,y.keys[this.minKeyNum]);
           y.removeKey(this.minKeyNum);
       },
       insertNOFull:function(node , key){
          let i = node.n -1;
           if(node.isLeaf){
            
            while(i>=0){
                if (key>node.keys[i]){
                    node.insertKey(i+1,key)
                    return;
                }
                i--;
            }
            if(i<0){
               node.insertKey(0,key);
               return;
             }
           } else {
            while(i>=0){
                   if (key>node.keys[i]){
                      break;
                   }
                   i--;
               }
               i++;
               if(node.children[i].n ===this.maxKeyNum){
                   this.sliptChild(node,i);
                   if(node.keys[i]<key){
                       i++;
                   }
               }
               this.insertNOFull(node.children[i],key);
           }
       },
       insert:function(key){
           let r = this.root;
           if(this.root.n === this.maxKeyNum ){
               let newRoot = new TreeNode(this.t);
               this.root = newRoot;
               newRoot.isLeaf = false;
               newRoot.insertChild(0,r);
               this.sliptChild(newRoot,0);
               this.insertNOFull(newRoot,key);
           } else{
               this.insertNOFull(r,key);
           }
       },
       deleteMinKey:function(node){
         if(node.isLeaf){
           return node.removeKey(0);
         } else {
           let child = node.children[0];
           let isChildLeaf = child.isLeaf;
           let rightBrother = node.children[1];
           let childKeyNum = child.n;
           if(child.n>=this.t){
             return this.deleteMinKey(child);
           } else if(rightBrother.n>=this.t){
             let rightBrotherFirstKey = rightBrother.keys[0];
             child.insertKey(childKeyNum,node.keys[0]);
             node.keys[0] = rightBrotherFirstKey;
             if(!isChildLeaf){
               let rightBrotherFirstChild = rightBrother.children[0];
               child.insertChild(childKeyNum+1,rightBrotherFirstChild);
               rightBrother.removeChild(0);
             }
             rightBrother.removeKey(0);
             return this.deleteMinKey(child);
           } else {
             child.insertKey(childKeyNum,node.keys[0]);
             childKeyNum++;
             for(let j=0;j<rightBrother.n;j++){
               child.insertKey(childKeyNum,rightBrother.keys[j])
               if(!isChildLeaf){
                 child.insertChild(childKeyNum,rightBrother.children[j])
               }
               childKeyNum++;
             }
             if(!isFinite){
               child.insertChild(childKeyNum,rightBrother.children[rightBrother.n]);
             }
             node.removeKey(0);
             node.removeChild(1)
             return this.deleteMinKey(child);
           }
         } 
        },
        deleteMaxKey:function(node){
          let keyNum = node.n;
          if(node.isLeaf){
            return node.removeKey(keyNum-1);
          }else{
            let child = node.children[keyNum];
            let isChildLeaf = child.isLeaf;
            let leftBrother = node.children[keyNum-1];
            let leftBrotherKeyNum = leftBrother.n;
            if(child.n>=this.t){
              return this.deleteMaxKey(child);
            }else if(leftBrother.n>=t){
             let leftBrotherLastKey = leftBrother.keys[leftBrotherKeyNum-1];
             child.insertKey(0,node.keys[keyNum-1]);
             node.keys[keyNum-1] = leftBrotherLastKey;
             if(!isChildLeaf){
               let leftBrotherLastChild = leftBrother.children[leftBrotherKeyNum];
               child.insertChild(0,leftBrotherLastChild);
               leftBrother.removeChild(leftBrotherKeyNum);
             }
             leftBrother.removeKey(leftBrotherKeyNum-1);
             return this.deleteMaxKey(child);
            }else{
              leftBrother.insertKey(leftBrotherKeyNum,node.keys[keyNum-1]);
              leftBrotherKeyNum++;
              for(let j = 0; j < child.n;j++){
                leftBrother.insertKey(leftBrotherKeyNum,child.keys[j])
                if(!isChildLeaf){
                  leftBrother.insertChild(leftBrotherKeyNum,child.children[j])
                }
                leftBrotherKeyNum++;
              }
              if(!isChildLeaf){
                leftBrother.insertChild(leftBrotherKeyNum,child.children[child.n]);
              }
              node.removeChild(keyNum);
              node.removeKey(keyNum-1);
              return this.deleteMaxKey(leftBrother);
            }
          }
        },
        deleteNode:function(node,key){
          let n = node.n;
          let i = 0;
          while(i<n && node.keys[i] < key){
            i++;
          }
          if(i<n&&key===node.keys[i]){
            if(node.isLeaf){
              node.removeKey(i);
            } else {
              let y = node.children[i];
              let z = node.children[i+1];
              if(y.n >= this.t){
                let preKey = this.deleteMaxKey(y);
                node.keys[i] = preKey[0];
              }else if(z.n >= this.t){
                let nextKey = this.deleteMinKey(z);
                node.keys[i] = nextKey[0];
              } else {
                let ySize = y.n;
                let zSize = z.n;
                y.insertKey(ySize,key);
                ySize++;
                let isChildLeaf = y.isLeaf;
                for(let j = 0;j< zSize;j++){
                  y.insertKey(ySize,z.keys[j]);
                  if(!isChildLeaf){
                    y.insertChild(ySize,z.children[j]);
                  }
                  ySize++;
                }
                if(!isChildLeaf){
                  y.insertChild(ySize,z.children[zSize]);
                }
                node.removeKey(i);
                node.removeChild(i+1);
                if(node.n===0){
                  this.root = y;
                }
                this.deleteNode(y,key);
              }
            }
          } else if(node.isLeaf){
            return false;
          } else {
            let child = node.children[i];
            let isChildLeaf = child.isLeaf;
            if(child.n>=this.t){
              this.deleteNode(child,key);
            } else if(i>0 && node.children[i-1].n>=this.t){
              let leftBrother = node.children[i-1];
              let leftBrotherKeyNum = leftBrother.n;
              let leftBrotherLastKey = leftBrother.keys[leftBrotherKeyNum-1];
              child.insertKey(0,node.keys[i-1]);
              node.keys[i-1] = leftBrotherLastKey;
              if(!isChildLeaf){
                let leftBrotherLastChild = leftBrother.children[leftBrotherKeyNum];
                child.insertChild(0,leftBrotherLastChild);
                leftBrother.removeChild(leftBrotherKeyNum);
              }
              leftBrother.removeKey(leftBrotherKeyNum-1);
              this.deleteNode(child,key);
            } else if(i<node.n&&node.children[i+1]>=this.t){
              let rightBrother = node.children[i+1];
              let rightBrotherFirstKey = rightBrother.keys[0];
              let childKeyNum = child.n;
              child.insertKey(childKeyNum,node.keys[i]);
              node.keys[i] = rightBrotherFirstKey;
              if(!isChildLeaf){
                let rightBrotherFirstChild = rightBrother.children[0];
                child.insertChild(childKeyNum+1,rightBrotherFirstChild);
                rightBrother.removeChild(0);
              }
              rightBrother.removeKey(0);
              this.deleteNode(child,key);
            } else if (i>0){
              let leftBrother = node.children[i-1];
              let leftBrotherKeyNum = leftBrother.n;
              leftBrother.insertKey(leftBrotherKeyNum,node.keys[i-1]);
              leftBrotherKeyNum++;
              for(let j = 0; j < child.n;j++){
                leftBrother.insertKey(leftBrotherKeyNum,child.keys[j])
                if(!isChildLeaf){
                  leftBrother.insertChild(leftBrotherKeyNum,child.children[j])
                }
                leftBrotherKeyNum++;
              }
              if(!isChildLeaf){
                leftBrother.insertChild(leftBrotherKeyNum,child.children[child.n]);
              }
              node.removeChild(i);
              node.removeKey(i-1);
              if(node.n===0){
                this.root = leftBrother;
              }
              this.deleteNode(leftBrother,key);
            } else {
              let rightBrother = node.children[i+1];
              let childKeyNum = child.n;
              child.insertKey(childKeyNum,node.keys[i]);
              childKeyNum++;
             for(let j=0;j<rightBrother.n;j++){
               child.insertKey(childKeyNum,rightBrother.keys[j])
               if(!isChildLeaf){
                 child.insertChild(childKeyNum,rightBrother.children[j])
               }
               childKeyNum++;
             }
             if(!isFinite){
               child.insertChild(childKeyNum,rightBrother.children[rightBrother.n]);
             }
             node.removeKey(i);
             node.removeChild(i + 1);
             if(node.n ===0){
               this.root = child;
             }
               this.deleteNode(child,key);
            }
          }
        },
        init:function(array){
          array.forEach(element => {
            this.insert(element);
          });
        }
      }
let bTree = new BTree(2);
bTree.init([2,1,6,7,8,9,12,32,4,3,5]);
bTree.deleteNode(bTree.root,8);
console.log(bTree);
//五，trie树

  function TrieTree(){
    this.root = new TreeNode();
  }
  function TreeNode(){
    this.isStr = flase;
    this.next = [];
  }
  TrieTree.prototype = {
    constructor:TrieTree,
    insertNode: function(str){
      let temp = this.root;
      for(let i =0,len=str.length;i<len;i++){
        if(typeof(temp.next[str[i]-'a']) === 'undefined'){
             let newNode = new TreeNode();
             temp.next[str[i]-'a'] = newNode;
        }
            temp = temp.next[str[i]-'a'];
      }
      temp.isStr = true;
    },
    findNode:function(str){
      let temp = this.root;
      for(let i =0,len=str.length;i<len;i++){
        if(typeof(temp.next[str[i]-'a']) === 'undefined'){
            return false;
        }
            temp = temp.next[str[i]-'a'];
      }
      return typeof(temp.next[str[i]-'a']) !== 'undefined'&&temp.isStr

    }
  }
//六，扩展树，splayTree

function TreeNode(key){
     this.key = key;
     this.left = null;
     this.right = null;
  }
  function SplayTree(){
    this.root = null;
  }
  SplayTree.prototype={
    constructor:SplayTree,
    splay:function(key){
      let n,l,r,c;
      n = new TreeNode(null);
      l = r = n
      if(this.root === null){
        return this.root;
      }
      while(true){
        if(key<this.root.key){
          if(this.root.left ===null){
            break;
          }
          if(key<this.root.left.key){
            c = this.root.left;
            this.root.left = c.right
            c.right = this.root;
            this.root = c;
            if(this.root.left ===null){
               break;
            }
          }
          r.left = this.root;
          r = this.root;
          this.root = this.root.left;
        } else if(key>this.root.key){
          if(this.root.right === null){
            break;
          }
          if(key>this.root.right.key){
            c=this.root.right;
            this.root.right = c.left;
            c.left = this.root;
            this.root = c;
            if(this.root.right===null){
              break;
            }
          }
          l.right = this.root;
          l = this.root;
          this.root = this.root.right;
        } else {
          break;
        }
      }
      l.right = this.root.left;
      r.left = this.root.right;
      this.root.left = n.right;
      this.root.right = n.left;
    },
    insertNode:function(key){
      let y = null;
      let node = this.root;
      while(node!==null){
        y = node;
        if(key<node.key){
          node = node.left;
        } else if(key>node.key){
          node = node.right;
        } else {
          return false;
        }
      }
      if(y===null){
        this.root = new TreeNode(key);
      } else if(key < y.key){
        y.left = new TreeNode(key);
      } else {
        y.right = new TreeNode(key);
      }
      return true;
    },
    insert_splay(key){
      this.insertNode(key);
      this.splay(key);
    },
    init(array){
      array.forEach(element => {
        this.insertNode(element);
      });
    }

  }

  let splayTree = new SplayTree();
  splayTree.init([2,1,6,7,8,9,12,32,4,3,5]);
  splayTree.splay(8);
  console.log(splayTree);
//七，并查集

function DisjSets(){
  this.s = [];
  this.count =0;
}
DisjSets.prototype = {
  constructor:DisjSets,
  init:function(num){
    this.s = new Array(num);
    this.count = num;
    for (let i = 0;i<num;i++){
      this.s[i] = -1;
    }
  },
  union:function(root1,root2){
    s[root2] = root1;
    this.count --;
  },
  find:function(x){
    if(this.s[x]<0){
      return x;
    } else {
      return this.s[x] = this.find(s[x]);
    }
  },
}
