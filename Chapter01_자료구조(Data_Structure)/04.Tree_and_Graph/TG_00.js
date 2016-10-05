// Basic Tree and Graph with BFS, DFS

'use strict';

let Tree = function( value )
{
  this.value = value;
  this.children = [];
};

Tree.prototype.addChild = function( child )
{
  console.log(child);
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
  let first =
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

  recur( first );

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
    //console.log("here!!");
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

console.log( root1.DFSelect( function( value , depth )
{
  return value % 2;
} ) );
// [1, 5, 3, 7]

console.log( root1.DFSelect( function( value , depth )
{
  return depth === 1;
} ) );
// [2, 3]

console.log( root1.BFSelect( function( value , depth )
{
  return value % 2;
} ) );
// [1, 3, 5, 7]

console.log( root1.BFSelect( function( value , depth )
{
  return depth === 1;
} ) );
// [2, 3]

