/*
  3.1 문제

  하나의 배열을 사용해 세 개의 스택을 구현하는 방법을 설명하라.
*/

/*
  3.1 해답

  1. 고정 크기 할당
     각 스택에 고정된 크기의 영역을 할당하는 방법이 있다.

     첫 번째 스택에 [ 0 , n/3 ]을 할당.
     두 번째 스택에 [ n/3 , 2n/3 ]을 할당.
     세 번째 스택에 [ 2n/3 , n ]을 할당.

     쉬운 방법이지만 한 스택이 메모리가 고갈되어가는 상황을 해소할 수 없다.

  2. 유연한 공간 할당
     각 스택에 할당되는 공간 크기가 유연하게 변할 수 있도록 할당하는 방법이 있다.
     이 접근법을 적용한 코드는 굉장히 복잡하여 면접 문제로 출제될 수 있는
     난이도 범위를 넘어선다. 가상 코드나 개별 컴포넌트 몇몇은 작성할 수 있겠으나
     전체적으로 작성하는 것은 너무 도전적인 과제다.
*/

'use strict';

let Stack = function()
{
  this.storage = [];
  this.counter1 = 0;
  this.counter2 = 100 / 3;
  this.counter3 = (2 * 100) / 3;
  this.popped;
};

// 1번 방법으로 풀이.
Stack.prototype.push = function( stackNum , value )
{
  if( stackNum == 1 )
  {
    this.storage[ this.counter1 ] = value;
    this.counter1++;
  }
  else if( stackNum == 2 )
  {
    this.storage[ this.counter2 ] = value;
    this.counter2++;
  }
  else if( stackNum == 3 )
  {
    this.storage[ this.counter3 ] = value;
    this.counter3++;
  }
};

Stack.prototype.pop = function( stackNum )
{
  if( stackNum == 1 )
  {
    this.counter1--;
    this.popped = this.storage[ this.counter1 ];
    delete this.storage[ this.counter1 ];

    if( this.counter1 === -1 )
    {
      this.counter1 = 0;
    }
    return this.popped;
  }

  if( stackNum == 2 )
  {
    this.counter2--;
    this.popped = this.storage[ this.counter2 ];
    delete this.storage[ this.counter2 ];

    if( this.counter2 === ( 100 / 3 ) - 1 )
    {
      this.counter2 = 100 / 3;
    }
    return this.popped;
  }

  if( stackNum == 3 )
  {
    this.counter3--;
    this.popped = this.storage[ this.counter3 ];
    delete this.storage[ this.counter3 ];

    if( this.counter3 === ((2 * 100) / 3) - 1 )
    {
      this.counter3 = (2 * 100) / 3;
    }
    return this.popped;
  }
};

let stack = new Stack();
stack.push( 1 , 'a' );
stack.push( 1 , 'b' );
stack.push( 1 , 'c' );
stack.push( 2 , 'd' );
stack.push( 2 , 'e' );
stack.push( 2 , 'f' );
stack.push( 3 , 'g' );
stack.push( 3 , 'h' );
console.log( stack );
console.log( stack.pop( 2 ) );

