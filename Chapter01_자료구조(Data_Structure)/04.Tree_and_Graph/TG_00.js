// ---------------------------------------------------------------
// Basic Tree with BFS, DFS
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
// Basic Binary Tree
// ---------------------------------------------------------------

let BinaryTreeNode = function( value )
{
  this.value = value;
  this.left  = null;
  this.right = null;
}

BinaryTreeNode.prototype.insertLeft = function( value )
{
  this.left = new BinaryTreeNode( value );
  return this.left;
};

BinaryTreeNode.prototype.insertRight = function( value )
{
  this.right = new BinaryTreeNode( value );
  return this.right;
};


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

let nums = new BinarySearchTree();

nums.insert( 23 );
nums.insert( 45 );
nums.insert( 16 );
nums.insert( 37 );
nums.insert( 3 );
nums.insert( 99 );
nums.insert( 22 );

// console.log( "Inorder : " );
// nums.inOrder( nums.root );
// console.log( "Preorder : " );
// nums.preOrder( nums.root );
// console.log( "Postorder : " );
// nums.postOrder( nums.root );

// let min = nums.getMin();
// console.log( "The minimum value of the BinartSearchTree is: " + min );
// let max = nums.getMax();
// console.log( "The maximum value of the BinartSearchTree is: " + max );

// let value = 99;
// let found = nums.find( value );
// if( found !== null )
// {
//   console.log( "Found " + value + " in the BinartSearchTree." );
// }
// else
// {
//   console.log( value + " was not found in the BinartSearchTree." );
// }

// nums.remove( 99 );
// console.log( nums );


// ---------------------------------------------------------------
// Basic Graph with BFS, DFS
// ---------------------------------------------------------------

'use strict';

let Graph = function()
{
  this.vertices = [];
  this.edges = [];
  this.numberOfEdges = 0;
};

Graph.prototype.addVertex = function( vertex )
{
  this.vertices.push( vertex );
  this.edges[ vertex ] = [];
};

Graph.prototype.removeVertex = function( vertex )
{
  let index = this.vertices.indexOf( vertex );
  if( ~index )
  {
    this.vertices.splice( index , 1 );
  }
  while( this.edges[ vertex ].length )
  {
    let adjacentVertex = this.edges[ vertex ].pop();
    this.removeEdge( adjacentVertex , vertex );
  }
};

Graph.prototype.addEdge = function( vertex1 , vertex2 )
{
  this.edges[ vertex1 ].push( vertex2 );
  this.edges[ vertex2 ].push( vertex1 );
  this.numberOfEdges++;
};

Graph.prototype.removeEdge = function( vertex1 , vertex2 )
{
  let index1 = this.edges[ vertex1 ] ? this.edges[ vertex1 ].indexOf( vertex2 ) : -1;
  let index2 = this.edges[ vertex2 ] ? this.edges[ vertex2 ].indexOf( vertex1 ) : -1;
  if( ~index1 )
  {
    this.edges[ vertex1 ].splice( index1 , 1 );
    this.numberOfEdges--;
  }
  if( ~index2 )
  {
    this.edges[ vertex2 ].splice( index2 , 1 );
  }
};

Graph.prototype.size = function()
{
  return this.vertices.length;
};

Graph.prototype.relations = function()
{
  return this.numberOfEdges;
};

Graph.prototype.traverseDFS = function( vertex , fn )
{
  if( !~this.vertices.indexOf( vertex ) )
  {
    return console.log( 'Vertex not found' );
  }
  let visited = [];
  this._traverseDFS( vertex , visited , fn ); 
};

Graph.prototype._traverseDFS = function( vertex , visited , fn )
{
  visited[ vertex ] = true;
  if( this.edges[ vertex ] !== undefined )
  {
    fn( vertex );
  }
  for( let i = 0; i < this.edges[ vertex ].length; i++ )
  {
    if( !visited[ this.edges[ vertex ][ i ] ] )
    {
      this._traverseDFS( this.edges[ vertex ][ i ] , visited , fn );
    }
  }
};

Graph.prototype.traverseBFS = function( vertex , fn )
{
  if( !~this.vertices.indexOf( vertex ) )
  {
    return console.log( 'Vertex not found' );
  }
  let queue = [];
  queue.push( vertex );
  let visited = [];
  visited[ vertex ] = true;

  while( queue.length )
  {
    vertex = queue.shift();
    fn( vertex );
    for( let i = 0; i < this.edges[ vertex ].length; i++ )
    {
      if( !visited[ this.edges[ vertex ][ i ] ] )
      {
        visited[ this.edges[ vertex ][ i ] ] = true;
        queue.push( this.edges[ vertex ][ i ] );
      }
    }
  }
};

Graph.prototype.pathFromTo = function( vertexSource , vertexDestination )
{
  if( !~this.vertices.indexOf( vertexSource ) )
  {
    return console.log( 'Vertex not found' );
  }
  let queue = [];
  queue.push( vertexSource );
  let visited = [];
  visited[ vertexSource ] = true;
  let paths = [];

  while( queue.length )
  {
    let vertex = queue.shift();
    for( let i = 0; i < this.edges[ vertex ].length; i++ )
    {
      if( !visited[ this.edges[ vertex ][ i ] ] )
      {
        visited[ this.edges[ vertex ][ i ] ] = true;
        queue.push( this.edges[ vertex ][ i ] );
        // save paths between vertices
        paths[ this.edges[ vertex ][ i ] ] = vertex;
      }
    }
  }

  if( !visited[ vertexDestination ] )
  {
    return undefined;
  }

  let path = [];
  let j;
  for( j = vertexDestination; j != vertexSource; j = paths[ j ] )
  {
    path.push( j );
  }
  path.push( j );
  return path.reverse().join( '-' );
};

Graph.prototype.print = function()
{
  console.log( this.vertices.map( function( vertex )
  {
    return (vertex + ' -> ' + this.edges[ vertex ].join( ', ' )).trim();
  } , this ).join( ' | ' ) );
};

let graph = new Graph();

graph.addVertex( 1 );
graph.addVertex( 2 );
graph.addVertex( 3 );
graph.addVertex( 4 );
graph.addVertex( 5 );
graph.addVertex( 6 );
graph.print(); // 1 -> | 2 -> | 3 -> | 4 -> | 5 -> | 6 ->

graph.addEdge( 1 , 2 );
graph.addEdge( 1 , 5 );
graph.addEdge( 2 , 3 );
graph.addEdge( 2 , 5 );
graph.addEdge( 3 , 4 );
graph.addEdge( 4 , 5 );
graph.addEdge( 4 , 6 );
graph.print(); // 1 -> 2, 5 | 2 -> 1, 3, 5 | 3 -> 2, 4 | 4 -> 3, 5, 6 | 5 -> 1, 2, 4 | 6 -> 4

console.log( 'graph size (number of vertices):' , graph.size() ); // => 6
console.log( 'graph relations (number of edges):' , graph.relations() ); // => 7

graph.traverseDFS( 1 , function( vertex )
{
  console.log( vertex );
} ); // => 1 2 3 4 5 6
console.log( '---' );

graph.traverseBFS( 1 , function( vertex )
{
  console.log( vertex );
} ); // => 1 2 5 3 4 6

graph.traverseDFS( 0 , function( vertex )
{
  console.log( vertex );
} ); // => 'Vertex not found'

graph.traverseBFS( 0 , function( vertex )
{
  console.log( vertex );
} ); // => 'Vertex not found'

console.log( 'path from 1 to 4:' , graph.pathFromTo( 1 , 4 ) ); // => 1-5-4
console.log( 'path from 6 to 1:' , graph.pathFromTo( 6 , 1 ) ); // => 6-4-5-1
console.log( 'path from 3 to 5:' , graph.pathFromTo( 3 , 5 ) ); // => 3-2-5

graph.removeEdge( 1 , 2 );
graph.removeEdge( 4 , 5 );
graph.removeEdge( 10 , 11 );
console.log( 'graph relations (number of edges):' , graph.relations() ); // => 5

console.log( 'path from 6 to 1:' , graph.pathFromTo( 6 , 1 ) ); // => 2-5-1

graph.addEdge( 1 , 2 );
graph.addEdge( 4 , 5 );
console.log( 'graph relations (number of edges):' , graph.relations() ); // => 7
console.log( 'path from 6 to 1:' , graph.pathFromTo( 6 , 1 ) ); // => 6-4-5-1
graph.removeVertex( 5 );
console.log( 'graph size (number of vertices):' , graph.size() ); // => 5
console.log( 'graph relations (number of edges):' , graph.relations() ); // => 4
console.log( 'path from 6 to 1:' , graph.pathFromTo( 6 , 1 ) ); // => 6-4-3-2-1

