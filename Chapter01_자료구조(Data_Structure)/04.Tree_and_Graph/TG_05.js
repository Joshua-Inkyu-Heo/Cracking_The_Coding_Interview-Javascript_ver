/*
  4.5 문제
  
  어떤 트리가 이진 탐색 트리인지 판별하는 함수를 구현하라.
*/

/*
  4.5 해답

  두 가지 다른 해법을 생각해 볼 수 있다. 첫 번째 해법은 정순회 기법을
  이용하는 것이고, 두 번째는 left <= current < right를 사용하는 것이다.
  정순회(in-order)를 시행하며 원소들을 배열에 복사해 넣은 결과가 정렬된
  상태인지 보는 것이다. 이 방법의 문제점은 트리 안에 중복 값이 있는 경우를
  처리할 수 없다는 것이다. 정순회일 경우 왼쪽, 오른쪽 자식 노드 한쪽만
  존재하는 경우 같은 결과가 나오기 때문이다. 중복된 값이 없다고 가정하면
  올바르게 작동한다. 하지만 실제로 배열은 한 원소를 이전 원소와 비교하는
  용도 의외에는 사용하지 않는다. 그러므로 마지막으로 검사했던 원소만
  기록해 둔 다음, 그다음 원소와 비교하도록 구현하면 될 것이다.
  두 번째 기법은 이진 탐색 트리의 정의를 이용한 것이다. 이진 탐색 트리가
  만족해야 하는 불변식은, "모든 왼쪽 노드의 데이터는 현재 노드의 데이터보다
  같거나 작고, 모든 오른쪽 노드의 데이터는 현재 노드의 데이터보다 크다"가
  되어야 한다. 이에 기반하여, 최솟값과 최댓값을 아래로 전달해 나가도록 하여
  문제를 풀 수 있다. 트리를 순회해 나가면서, 더욱 좁은 범위에 대해 검증 작업을
  반복하는 것이다.
*/

'use strict';

let Node = function( data , left , right )
{
  this.data = data;
  this.left = left;
  this.right = right;
};

let BinarySearchTree = function()
{
  this.root = null;
};

BinarySearchTree.prototype.insert = function( data )
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

let isValidBST = function( rootNode )
{
  let stackOfNodes = [];

  stackOfNodes.push(
    {
      node : rootNode.root ,
      max : Number.MAX_VALUE ,
      min : Number.MIN_VALUE
    } );

  while( stackOfNodes.length )
  {
    let nodeObject = stackOfNodes.pop();
    let currentNode = nodeObject.node;
    let maxValue = nodeObject.max;
    let minValue = nodeObject.min;

    if( currentNode.data > maxValue || currentNode.data <= minValue )
    {
      return false;
    }

    if( currentNode.left )
    {
      stackOfNodes.push(
        {
          node : currentNode.left ,
          max : currentNode.data ,
          min : minValue
        } );
    }
    if( currentNode.right )
    {
      stackOfNodes.push(
        {
          node : currentNode.right ,
          max : maxValue ,
          min : currentNode.data
        } );
    }
  }
  return true;
};

let nums = new BinarySearchTree();

nums.insert( 23 );
nums.insert( 45 );
nums.insert( 16 );
nums.insert( 37 );
nums.insert( 3 );
nums.insert( 99 );
nums.insert( 22 );

console.log( isValidBST( nums ) );

nums.root.left.data = 30;

console.log( isValidBST( nums ) );

