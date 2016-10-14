/*
  4.1 문제

  주어진 이진 트리가 균형 이진 트리인지 판별하는 함수를 구현하라.
  이 문제에서 이진 트리는 어떤 노드의 두 자식 트리 깊이가 하나 이상
  차이 나지 않는 트리다.
*/

/*
  4.1 해답

  이 문제의 경우 '균형'이라는 말이 주어져 있다. 이 문제에서 균형은
  어떤 노드의 두 하위 트리 높이가 2 이상 차이 나지 않는 상태다.
  이 정의에 따라 해답을 구현할 수 있다. 단순히 전체 트리에 재귀를
  적용하고, 각 노드에 대해 하위 트리의 높이를 계산하면 된다.
*/

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

let BinaryTree = function()
{
  this.root = null;
};

BinaryTree.prototype.insert = function( data )
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

BinaryTree.prototype.minDepth = function( node )
{
  if( node === null )
  {
    return 0;
  }
  return 1 + Math.min( this.minDepth( node.left ) , this.minDepth( node.right ) );
};

BinaryTree.prototype.maxDepth = function( node )
{
  if( node === null )
  {
    return 0;
  }
  return 1 + Math.max( this.maxDepth( node.left ) , this.maxDepth( node.right ) );
};

BinaryTree.prototype.isBinaryTreeBalanced = function( root )
{
  if( root === null )
  {
    return undefined;
  }
  // console.log( this.maxDepth( root ) );
  // console.log( this.minDepth( root ) );
  return this.maxDepth( root ) - this.minDepth( root ) <= 1;
};

let nums = new BinaryTree();

nums.insert( 23 );
nums.insert( 45 );
nums.insert( 16 );
nums.insert( 37 );
nums.insert( 3 );
nums.insert( 99 );
nums.insert( 22 );
console.log( nums.isBinaryTreeBalanced( nums.root ) );

nums.insert( 100 );
nums.insert( 101 );
console.log( nums.isBinaryTreeBalanced( nums.root ) );

