// ---------------------------------------------------------------
// Basic Tree and Graph with BFS, DFS
// ---------------------------------------------------------------

'use strict';

let Tree = function( value )
{
  this.value = value;
  this.children = [];
};

Tree.prototype.addChild = function( child )
{
  if( !child || !(child instanceof Tree) )
  {
    child = new Tree( child );
  }
  if( !this.isDescendant( child ) )
  {
    this.children.push( child );
  }
  else
  {
    throw new Error( "That child is already a child of this tree" );
  }
  // return the new child node for convenience
  return child;
};

Tree.prototype.isDescendant = function( child )
{
  if( this.children.indexOf( child ) !== -1 )
  {
    // `child` is an immediate child of this tree
    return true;
  }
  else
  {
    for( let i = 0; i < this.children.length; i++ )
    {
      if( this.children[ i ].isDescendant( child ) )
      {
        // `child` is descendant of this tree
        return true;
      }
    }
    return false;
  }
};

Tree.prototype.removeChild = function( child )
{
  let index = this.children.indexOf( child );
  if( index !== -1 )
  {
    // remove the child
    this.children.splice( index , 1 );
  }
  else
  {
    throw new Error( "That node is not an immediate child of this tree" );
  }
};

Tree.prototype.DFSelect = function( filter )
{
  let result = [];
  let val =
      {
        node : this ,
        depth : 0
      };

  let recur = function( item )
  {
    if( filter( item.node.value , item.depth ) )
    {
      result.push( item.node.value );
    }
    if( item.node.children.length === 0 )
    {
      return;
    }
    for( let i = 0; i < item.node.children.length; i++ )
    {
      recur( { node : item.node.children[ i ] , depth : item.depth + 1 } );
    }
  };

  recur( val );

  return result;
};

Tree.prototype.BFSelect = function( filter )
{
  let results = [];
  let val =
        [ {
          node : this ,
          depth : 0
        } ];
  while( val.length > 0 )
  {
    let item = val.shift();
    // console.log( "item = " , item );
    if( filter( item.node.value , item.depth ) )
    {
      results.push( item.node.value );
    }
    for( let i = 0; i < item.node.children.length; i++ )
    {
      val.push( { node : item.node.children[ i ] , depth : item.depth + 1 } );
    }
  }
  return results;
};

let root1 = new Tree( 1 );
let branch2 = root1.addChild( 2 );
let branch3 = root1.addChild( 3 );
let leaf4 = branch2.addChild( 4 );
let leaf5 = branch2.addChild( 5 );
let leaf6 = branch3.addChild( 6 );
let leaf7 = branch3.addChild( 7 );

// console.log( root1.DFSelect( function( value , depth )
// {
//   return value % 2;
// } ) );
// // [1, 5, 3, 7]

// console.log( root1.DFSelect( function( value , depth )
// {
//   return depth === 1;
// } ) );
// // [2, 3]

// console.log( root1.BFSelect( function( value , depth )
// {
//   return value % 2;
// } ) );
// // [1, 3, 5, 7]

// console.log( root1.BFSelect( function( value , depth )
// {
//   return depth === 1;
// } ) );
// // [2, 3]


// ---------------------------------------------------------------
// Basic Binary Search Tree with inorder, preorder, postorder
// ---------------------------------------------------------------

'use strict';

let Node = function( data , left , right )
{
  this.data = data;
  this.left = left;
  this.right = right;
};

Node.prototype.show = function()
{
  return this.data;
};

let BinartSearchTree = function()
{
  this.root = null;
};

BinartSearchTree.prototype.insert = function( data )
{
  let node = new Node( data , null , null );

  if( this.root === null )
  {
    this.root = node;
  }
  else
  {
    let current = this.root;
    let parent;
    while( true )
    {
      parent = current;
      if( data < current.data )
      {
        current = current.left;
        if( current === null )
        {
          parent.left = node;
          break;
        }
      }
      else
      {
        current = current.right;
        if( current === null )
        {
          parent.right = node;
          break;
        }
      }
    }
  }
};

BinartSearchTree.prototype.inOrder = function( node )
{
  if( node !== null )
  {
    this.inOrder( node.left );
    console.log( node.show() + " " );
    this.inOrder( node.right );
  }
};

BinartSearchTree.prototype.preOrder = function( node )
{
  if( node !== null )
  {
    console.log( node.show() + " " );
    this.preOrder( node.left );
    this.preOrder( node.right );
  }
};

BinartSearchTree.prototype.postOrder = function( node )
{
  if( node !== null )
  {
    this.postOrder( node.left );
    this.postOrder( node.right );
    console.log( node.show() + " " );
  }
};

BinartSearchTree.prototype.getMin = function()
{
  let current = this.root;
  while( current.left !== null )
  {
    current = current.left;
  }
  return current.data;
};

BinartSearchTree.prototype.getMax = function()
{
  let current = this.root;
  while( current.right !== null )
  {
    current = current.right;
  }
  return current.data;
};

BinartSearchTree.prototype.find = function( data )
{
  let current = this.root;
  while( current.data !== data )
  {
    if( data < current.data )
    {
      current = current.left;
    }
    else
    {
      current = current.right;
    }
    if( current === null )
    {
      return null;
    }
  }
  return current;
};

BinartSearchTree.prototype.getSmallest = function( node )
{
  if( node.left === null )
  {
    return node;
  }
  else
  {
    return this.getSmallest( node.left );
  }
};

BinartSearchTree.prototype.remove = function( data )
{
  this.root = this.removeNode( this.root , data );
};

BinartSearchTree.prototype.removeNode = function( node , data )
{
  if( node === null )
  {
    return null;
  }
  // root와 data 같을 때
  if( data === node.data )
  {
    // child 없을 시
    if( node.left === null && node.right === null )
    {
      return null;
    }
    // left child 없을 시
    if( node.left === null )
    {
      return node.right;
    }
    // right child 없을 시
    if( node.right === null )
    {
      return node.left;
    }
    // 양쪽 chlid 다 있을 시
    // root가 삭제되고 root자라에 올 값 찾기
    // root보다 큰 값(right)중에서 가장 작은 값이 root가 되어야 함
    let tempNode = this.getSmallest( node.right );
    console.log( "tempNode : " , tempNode );
    node.data = tempNode.data;
    node.right = this.removeNode( node.right , tempNode.data );
    return node;
  }
  else if( data < node.data )
  {
    node.left = this.removeNode( node.left , data );
    return node;
  }
  else
  {
    node.right = this.removeNode( node.right , data );
    return node;
  }
};

let nums = new BinartSearchTree();

nums.insert( 23 );
nums.insert( 45 );
nums.insert( 16 );
nums.insert( 37 );
nums.insert( 3 );
nums.insert( 99 );
nums.insert( 22 );

console.log( "Inorder : " );
nums.inOrder( nums.root );
console.log( "Preorder : " );
nums.preOrder( nums.root );
console.log( "Postorder : " );
nums.postOrder( nums.root );

let min = nums.getMin();
console.log( "The minimum value of the BinartSearchTree is: " + min );
let max = nums.getMax();
console.log( "The maximum value of the BinartSearchTree is: " + max );

let value = 99;
let found = nums.find( value );
if( found !== null )
{
  console.log( "Found " + value + " in the BinartSearchTree." );
}
else
{
  console.log( value + " was not found in the BinartSearchTree." );
}

nums.remove( 99 );
console.log( nums );

