/*
  2.5 문제

  연결 리스트로 표현된 두 개의 수가 있다고 하자. 리스트의 각 노드는
  해당 수의 각 자릿수를 표현한다. 이때 자릿수들은 역순으로 배열되는데,
  1의 자릿수가 리스트의 맨 앞에 오도록 배열된다는 뜻이다. 이 두수를
  더하여 그 합을 연결 리스트로 반환하는 함수를 작성하라.

  예)
  입력 : 7>1>6 + 5>9>2 = 617 + 295
  출력 : 2>1>9 = 912
*/

/*
  2.5 해답

  평소의 산수대로 진행하면 된다. 새로운 리스트(result)를 만들고,
  각 자릿수를 더한 값을 result 리스트에 입력하되, 각 자리의 합이 10이 넘어가면
  다음 자릿수 계산 전 result.next.value에 1을 미리 넣어주면 된다.
  만약 두 개의 리스트의 길이가 다르다면, 짧은 리스트의 head부터 길이의 차이만큼
  value에 0을 넣어주고 계산하면 된다.
*/

'use strict';

let LinkedList = function()
{
  this.head = null;
  this.tail = null;
};

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// 실제 구현 부분. 두 개의 리스트 길이가 같다고 가정.
LinkedList.prototype.plusItem = function( list1 , list2 )
{
  let l1 = list1.head;
  let l2 = list2.head;
  let result = new LinkedList();

  result.addToTail( 0 );

  let rst = result.head;

  while( l1 )
  {
    if( l1.value + l2.value + rst.value >= 10 )
    {
      result.addToTail( 1 );
      rst.value = (l1.value + l2.value + rst.value) % 10;
    }
    else
    {
      if( l1.next )
      {
        result.addToTail( 0 );
      }
      rst.value = (l1.value + l2.value + rst.value) % 10;
    }

    l1 = l1.next;
    l2 = l2.next;
    rst = rst.next;
  }
  return result;
};
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

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

let list = new LinkedList();
let list1 = new LinkedList();
let list2 = new LinkedList();

list1.addToTail( 7 );
list1.addToTail( 4 );
list1.addToTail( 6 );

list2.addToTail( 8 );
list2.addToTail( 9 );
list2.addToTail( 2 );

console.log( list.plusItem( list1 , list2 ) );

