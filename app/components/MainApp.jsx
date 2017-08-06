import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import uuid from 'node-uuid';

var $ = require('jquery'); 

class MainApp extends React.Component {

	constructor(props) {
		super(props);
		var arr = [];
		// for(var i = 0; i < 9; i++) {
		// 	var buf = [];
		// 	for(var j = 0; j < 9; j++) {
		// 		buf.push({
		// 			id:i*10+j, 
		// 			// num:Math.ceil(Math.random()*9)
		// 			num:0,
		// 		});
		// 	}
		// 	arr.push(buf);
		// }
		// for (var i = 0; i < 9; i++) {
		// 	arr[i][i].num = 1;
		// }
		// var buf = [[4,0,1,0,0,0,0,3,5],
		// 		   [3,9,0,0,0,4,8,2,0],
		// 		   [0,7,0,0,8,6,0,0,9],
		// 		   [0,4,5,7,0,8,0,0,0],
		// 		   [0,0,9,0,6,0,5,0,0],
		// 		   [0,0,0,5,0,9,7,6,0],
		// 		   [8,0,0,9,2,0,0,1,0],
		// 		   [0,2,3,6,0,0,0,7,8],
		// 		   [9,6,0,0,0,0,2,0,3]];

		// var buf = [[5,3,0,2,6,0,1,0,7],
		// 		   [6,1,0,0,0,9,0,0,4],
		// 		   [0,0,9,0,0,8,0,3,0],
		// 		   [2,5,0,0,9,0,6,4,0],
		// 		   [0,0,0,0,0,0,0,0,0],
		// 		   [0,9,6,0,2,0,0,8,1],
		// 		   [0,4,0,1,0,0,5,0,0],
		// 		   [8,0,0,3,0,0,0,7,9],
		// 		   [7,0,5,0,4,2,0,1,8]];

		// var buf = [[5,4,0,1,2,0,8,0,6],
		// 		   [7,2,0,0,0,6,0,0,5],
		// 		   [0,0,8,0,0,4,0,2,0],
		// 		   [1,6,0,0,4,0,2,3,0],
		// 		   [0,0,0,0,0,0,0,0,0],
		// 		   [0,3,9,0,5,0,0,6,8],
		// 		   [0,1,0,4,0,0,6,0,0],
		// 		   [9,0,0,2,0,0,0,5,3],
		// 		   [2,0,6,0,8,7,0,1,9]];

		var buf = [[0,0,9,8,0,6,1,0,0],
				   [0,7,0,0,0,9,3,8,0],
				   [6,1,0,0,3,0,0,0,4],
				   [2,5,0,0,8,0,0,0,9],
				   [0,0,6,1,0,4,5,0,0],
				   [8,0,0,0,5,0,0,6,3],
				   [1,0,0,0,6,0,0,4,7],
				   [0,6,3,7,0,0,0,2,0],
				   [0,0,4,5,0,2,6,0,0]];

		// var buf = 
		// 	  [[4,0,1,
		// 	  3,9,0,
		// 	  0,7,0],
		// 	   [0,0,0,
		// 	   0,0,4,
		// 	   0,8,6],
		// 	   [0,3,5,
		// 	   8,2,0,
		// 	   0,0,9],

		// 	   [0,4,5,
		// 	   0,0,9,
		// 	   0,0,0],
		// 	   [7,0,8,
		// 	   0,6,0,
		// 	   5,0,9],
		// 	   [0,0,0,
		// 	   5,0,0,
		// 	   7,6,0],

		// 	   [8,0,0,
		// 	   0,2,3,
		// 	   9,6,0],
		// 	   [9,2,0,
		// 	   6,0,0,
		// 	   0,0,0],
		// 	   [0,1,0,
		// 	   0,7,8,
		// 	   2,0,3]]; //test example
		for(var i = 0; i < 9; i++) {
			var buff = [];
			for(var j = 0; j < 9; j++) {
				buff.push({
					id:i*10+j, 
					// num:Math.ceil(Math.random()*9)
					num:buf[i][j],
				});
			}
			arr.push(buff);
		}
		this.state = {
			grid:arr,
		}
	}
	render() {
		console.log('bigGrid',this.state.grid);
		var solveSudoku = () => {
			var arr = [...this.state.grid];
			console.log('arr', arr)
			var checkVertical = (index) => {
				var available = [1,2,3,4,5,6,7,8,9];
				// console.log(arr)
				for(var i = 0; i < 9; i++) {
					available = available.filter((elem) => {
						return elem !== arr[i][index].num;
					})
				}
				// if(index == 0) console.log(available);
				// console.log('checkVertical ' + index,available);
				return available;
			}
			var checkHorizontal = (index) => {
				var available = [1,2,3,4,5,6,7,8,9];
				for(var i = 0; i < 9; i++) {
					available = available.filter((elem) => {
						return elem !== arr[index][i].num;
					})
				}
				// console.log('checkHorizontal',available);
				return available;
			}
			var checkSquare = (i1, j1) => {
				var available = [1,2,3,4,5,6,7,8,9];
				var iStart = Math.floor(i1/3)*3;
				var jStart = Math.floor(j1/3)*3;
				// console.log('checkSquareInside',`${iStart} - ${iStart+3}:${jStart} - ${jStart+3}`);
				for(var i = iStart; i < iStart+3; i++) {
					for(var j = jStart; j < jStart+3; j++) {
						// console.log('checkSquareInside',`${i}:${j}`);
						available = available.filter((elem) => {
							return elem !== arr[i][j].num;
						})
					}
				}
				// console.log('checkSquare',available);
				return available;
			}
			var arrayIntersect = (arr1, arr2) => {
				var result = [];
				for(var i = 0; i < arr1.length; i++) {
					var find = false;
					var index = 0;
					for(var j = 0; j < arr2.length; j++) {
						if(arr1[i] === arr2[j]) {
							find = true;
							index = i;
						}
					}
					if(find) {
						result.push(arr1[index]);
					}
				}
				// console.log('arrayIntersect',result);
				return result;
			}
			var checkEmpty = (index) => {
				var buf = [];
				for(var i = 0; i < 9; i++) {
					if(arr[index][i].num === 0) {
						var freeH = checkHorizontal(index);
						var freeV = checkVertical(i);
						// if(i == 0)
						// console.log('checkVertical ' + index + ' ' + i,freeV);
						var freeS = checkSquare(index,i);
						var free = arrayIntersect(freeV, arrayIntersect(freeS, freeH));
						// console.log('buf',`${free}`);
						buf.push({
							x:i,
							y:index,
							available:free,
						});
					}
				}
				return buf;
			}
			var composeVariants = (buf) => {
				var result = [''];
				for(var i = 0; i < buf.length; i++) {
					if(buf[i].available.length > 1) {
						var k = 0;
						var n = result.length;
						while(k < n) {
							for(var j = 0; j < buf[i].available.length; j++) {
								result.push(result[k]+buf[i].available[j]);
							}
							k++;
						}
						result.splice(0,n);
					} else {
						for(var k = 0; k < result.length; k++) {
							result[k] += buf[i].available;
						}
					}
				}
				// return result;
				var res = [];
				console.log('result',result)
				for (var i = 0; i < result.length; i++) {
					var available = ['1','2','3','4','5','6','7','8','9'];
					var boo = true;
					for (var j = 0; j < available.length; j++) {
						var regExp = new RegExp(available[j] + '', 'g');
						var find = result[i].match(regExp);
						// console.log(find)
						if(find !== null) {
							if(find.length > 1) boo = false;
						}
					}
					if(boo) {
						console.log(boo)
						res.push(result[i]);
					}
				}
				console.log(res)
				return res[0];
			}

			var iterThis = () => {
				var answer = [];
				for(var i = 0; i < 9; i++) {
					var buf = checkEmpty(i);
					// console.log('row',buf);
					// var res = composeVariants(buf);
					// for(var j = 0; j < buf.length; j++) {
					// 	arr[buf[j].y][buf[j].x].num = +res[j];
					// }
					// console.log('res',res)
					answer = [...answer, [...buf]];
					// console.log('answerW', answer)
					// console.log('res',res);
				}
				return answer;
			}
			var answer = [];
			answer = iterThis();
			// console.log('answer', answer)
			for(var i = 0; i < answer.length; i++) {
				for(var j = 0; j < answer[i].length; j++) {
					var str = '';
					// for (var k = 0; k < answer[i][j].available.length; k++) {
						// str += `${answer[i][j].available[k]}, `;
					// }
					if(answer[i][j].available.length == 1) {
						arr[answer[i][j].y][answer[i][j].x].num = answer[i][j].available[0];
					}
					// console.log(answer[i][j].x + ':' + answer[i][j].y + '=' + str)
					// arr[answer[i][j].y][answer[i][j].x].num = str;
				}
			}

			var boo = 0;

			while(boo < 9) {
				console.log('boo cycle')
				boo = 0;
				answer = iterThis();
				// console.log('answer', answer)
				for(var i = 0; i < answer.length; i++) {
					if(answer[i].length == 0) {
						boo++;
					}
					for(var j = 0; j < answer[i].length; j++) {
						var str = '';
						// for (var k = 0; k < answer[i][j].available.length; k++) {
							// str += `${answer[i][j].available[k]}, `;
						// }
						if(answer[i][j].available.length == 1) {
							arr[answer[i][j].y][answer[i][j].x].num = answer[i][j].available[0];
						}
						// console.log(answer[i][j].x + ':' + answer[i][j].y + '=' + str)
						// arr[answer[i][j].y][answer[i][j].x].num = str;
					}
				}
			}

			console.log('answer', answer)
			for(var i = 0; i < answer.length; i++) {
				for(var j = 0; j < answer[i].length; j++) {
					var str = '';
					for (var k = 0; k < answer[i][j].available.length; k++) {
						str += `${answer[i][j].available[k]}, `;
					}
					// if(answer[i][j].available.length == 1) {
					// 	arr[answer[i][j].y][answer[i][j].x].num = answer[i][j].available[0];
					// }
					// console.log(answer[i][j].x + ':' + answer[i][j].y + '=' + str)
					arr[answer[i][j].y][answer[i][j].x].num = str;
				}
			}

			// console.log('arr', arr)
			// console.log()

			this.setState({
				grid:[...arr],
			})
		}
		var renderCells = () => {
			return (<div className='cardFlex columnOrder width100' key={uuid()}>
					{this.state.grid.map((smallGrid, firstIndex) => {
						// console.log('smallGrid',smallGrid)
						return (
							<div key={uuid()} className='cardGap cardFlex border1Black centerFlex'>
								{smallGrid.map((elem, index) => {
									var cl = 'border' + ((firstIndex%3)*3+index%3+1);
									return (<b key={uuid()} 
										className={'cardGap padding20 centerText border1Black ' + cl}
										>
										{elem.num ? elem.num : ' '}
										</b>)
								})}
							</div>
						)
					})}
				</div>)
		}
				// <h1 className='page-title'>Sudoku solver</h1>
		return (
			<div className='cardFlex columnOrder'>
				<div className='cardGap5 cardFlex centerFlex'>
					{renderCells()}
				</div>
				<div className='cardGap cardFlex alignCenter justifyBetween'>
					<div className='cardGap'></div>
					<button className='cardGap button primary'>Randomize</button>
					<div className='cardGap'></div>
					<button className='cardGap button primary' onClick={solveSudoku}>Solve</button>
					<div className='cardGap'></div>
					<button className='cardGap button primary'>Check</button>
					<div className='cardGap'></div>
				</div>
			</div>
		);
	}
}

export default MainApp;