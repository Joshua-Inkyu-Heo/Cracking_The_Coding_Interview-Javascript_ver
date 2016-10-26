/*
  4.2 문제

  주어진 유향 그래프(directed graph)에서 특정한 두 노드 간에 경로가
  존재하는지를 판별하는 알고리즘을 구현하라.
*/

/*
  4.2 해답

  이 문제는 간단한 그래프 탐색 기법, 즉 너비 우선 탐색이나 깊이 우선 탐색
  기법을 적용하여 풀 수 있다. 두 노드 가운데 한 노드를 선택하여 탐색 도중에
  다른 노드가 발견되는지 검사하면 된다. 사이클 혹은 특정한 노드를 중복하여
  여러 번 검사하게 되는 일을 피하고자, 탐색 과정에서 이미 방문한 노드는
  flag 등으로 표시해 두어야 한다.
*/

'use strict';

let Graph = function()
{
  this.vertices = [];
  this.edges = [];
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
    this.removeEdges( adjacentVertex , vertex );
  }
};

Graph.prototype.addEdge = function( vertex1 , vertex2 )
{
  this.edges[ vertex1 ].push( vertex2 );
};

Graph.prototype.removeEdge = function( vertex1 , vertex2 )
{
  let index1 = this.edges[ vertex1 ] ? this.edges[ vertex1 ].indexOf( vertex2 ) : -1;
  let index2 = this.edges[ vertex2 ] ? this.edges[ vertex2 ].indexOf( vertex1 ) : -1;
  if( ~index1 )
  {
    this.edges[ vertex1 ].splice( index1 , 1 );
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
    return false;
  }
  else
  {
    // let path = [];
    // let j;
    // for( j = vertexDestination; j != vertexSource; j = paths[ j ] )
    // {
    //   path.push( j );
    // }
    // path.push( j );
    // console.log( path.reverse().join( '-' ) );
    return true;
  }
};

let graph = new Graph();

graph.addVertex( 1 );
graph.addVertex( 2 );
graph.addVertex( 3 );
graph.addVertex( 4 );
graph.addVertex( 5 );
graph.addVertex( 6 );

graph.addEdge( 1 , 2 );
graph.addEdge( 1 , 5 );
graph.addEdge( 2 , 3 );
graph.addEdge( 2 , 5 );
graph.addEdge( 3 , 4 );
graph.addEdge( 4 , 5 );
graph.addEdge( 4 , 6 );

console.log( 'path from 1 to 4:' , graph.pathFromTo( 1 , 4 ) ); // => true
console.log( 'path from 4 to 1:' , graph.pathFromTo( 4 , 1 ) ); // => false

