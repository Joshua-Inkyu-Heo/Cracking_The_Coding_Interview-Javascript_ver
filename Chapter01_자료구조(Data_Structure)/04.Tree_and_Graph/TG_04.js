/*
  4.4 문제

  주어진 이진 트리에서 깊이별로 연결 리스트를 만들어 내는 알고리즘을 작성하라.
  트리의 깊이가 D라면, 알고리즘 수행 결과로 D개의 연결 리스트가 만들어져야 한다.
*/

/*
  4.4 해답

  DFS를 사용해도 되지만, 현재 탐색 중인 노드의 깊이만 추적할 수 있으면
  BFS를 사용해도 된다. 전순회(pre-order traversal) 알고리즘을 살짝
  변형해 풀이할 수도 있다. 재귀 함수를 호출할 때에는 level + 1을 인자로
  넘기도록 한다.
*/

'use strict';

let LinkedList = function()
{
  this.head = null;
  this.tail = null;
};

LinkedList.prototype.makeNode = function( value )
{
  let node = {};
  node.value = value;
  node.next = null;
  return node;
};

LinkedList.prototype.addToTail = function( value )
{
  let newTail = this.makeNode( value );

  if( !this.head )
  {
    this.head = newTail;
  }
  if( this.tail )
  {
    this.tail.next = newTail;
  }
  this.tail = newTail;
};

let Node = function( data , left , right )
{
  this.data = data;
  this.left = left;
  this.right = right;
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

let createList = function( rootNode , arrayOfLists , level )
{
  if( rootNode === null )
  {
    return;
  }
  if( arrayOfLists.length < level )
  {
    arrayOfLists.push( new LinkedList() );
  }

  if( arrayOfLists.length === 1 )
  {
    arrayOfLists[ level - 1 ].addToTail( rootNode.root.data );
    createList( rootNode.root.left , arrayOfLists , level + 1 );
    createList( rootNode.root.right , arrayOfLists , level + 1 );
  }
  else
  {
    arrayOfLists[ level - 1 ].addToTail( rootNode.data );
    createList( rootNode.left , arrayOfLists , level + 1 );
    createList( rootNode.right , arrayOfLists , level + 1 );
  }
  return arrayOfLists;
};

let nums = new BinartSearchTree();

nums.insert( 23 );
nums.insert( 45 );
nums.insert( 16 );
nums.insert( 37 );
nums.insert( 3 );
nums.insert( 99 );
nums.insert( 22 );

console.log( createList( nums , [] , 1 ) );

