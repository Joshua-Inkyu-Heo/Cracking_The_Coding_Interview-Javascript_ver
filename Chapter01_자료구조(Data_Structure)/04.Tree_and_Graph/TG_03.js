/*
  4.3 문제

  오름차순으로 정렬된 배열로부터 그 높이가 가장 낮은 이진 탐색 트리를
  생성하는 알고리즘을 작성하라. 배열 내 모든 원소는 배열 내에서 유일한
  값을 갖는다.
*/

/*
  4.3 해답

  최소 높이 트리를 생성하기 위해서는, 왼쪽과 오른쪽 하위 트리에 포함된
  노드의 개수를 가능한 한 맞추어야 한다. 루트 노드는 배열 가운데에 와야 한다.
  루트의 왼쪽 절반은 왼쪽 하위 트리가 되고, 오른쪽 절반은 오른쪽 하위 트리가
  된다. 메소드가 루트 노드부터 시작하는 재귀적 프로세스를 통해 값을 삽입한다.
  결국, 최소 높이 트리가 만들어지긴 하지만 효율적이진 않다. 원소를 삽입할
  때마다 트리를 순회하게 되어, 트리 전체로 보면 O(N log N)의 비용이 발생한다.
  메소드를 하나 더 만들어 배열 일부를 인자로 받아, 해당 배열로 만든 최소
  높이 트리의 루트를 반환해주면 된다.

  1. 트리에 배열 가운데 원소를 삽입한다.
  2. 왼쪽 하위 트리에 왼쪽 절반 배열 원소들을 삽입한다.
  3. 오른쪽 하위 트리에 오른쪽 절반 배열 원소들을 삽입한다.
  4. 재귀 호출을 시행한다.
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

BinarySearchTree.prototype.createMinimalBST = function( array )
{
  return this._createMinimalBST( array , 0 , array.length - 1 );
};

BinarySearchTree.prototype._createMinimalBST = function( array , start , end )
{
  if( start > end )
  {
    return null;
  }
  // parseInt로 하지 않으면 float값 때문에 undefined 출력
  let mid = parseInt( ( start + end ) / 2 );
  let node = new Node();
  node.data = array[ mid ];
  node.left = this._createMinimalBST( array , start , mid - 1 );
  node.right = this._createMinimalBST( array , mid + 1 , end );
  return node;
};

let arr = [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 ];
let bst = new BinarySearchTree();

console.log( bst.createMinimalBST( arr ) );

