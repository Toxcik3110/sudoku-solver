import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

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

		var buf = [[4,0,1,0,0,0,0,3,5],
				   [3,9,0,0,0,4,8,2,0],
				   [0,7,0,0,8,6,0,0,9],
				   [0,4,5,7,0,8,0,0,0],
				   [0,0,9,0,6,0,5,0,0],
				   [0,0,0,5,0,9,7,6,0],
				   [8,0,0,9,2,0,0,1,0],
				   [0,2,3,6,0,0,0,7,8],
				   [9,6,0,0,0,0,2,0,3]];

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
		// console.log('bigGrid',this.state.grid);
		var solveSudoku = () => {
			var arr = [...this.state.grid];
			var checkVertical = (index) => {
				var available = [1,2,3,4,5,6,7,8,9];
				for(var i = 0; i < 9; i++) {
					available.filter((elem) => {
						return elem === arr[i][index].num;
					})
				}
				return available;
			}
			var checkHorizontal = (index) => {
				var available = [1,2,3,4,5,6,7,8,9];
				for(var i = 0; i < 9; i++) {
					available.filter((elem) => {
						return elem === arr[index][j].num;
					})
				}
				return available;
			}
			for(var i = 0; i < 9; i++) {
				var j = 0;
				//todo
			}
		}
		var renderCells = () => {
			return (<div className='cardFlex columnOrder width100'>
					{this.state.grid.map((smallGrid) => {
						// console.log('smallGrid',smallGrid)
						return (
							<div className='cardGap cardFlex border1Black centerFlex'>
								{smallGrid.map((elem, index) => {
									return (<h4 
										className='cardGap border1Black padding20 centerText'
										>
										{elem.num ? elem.num : ' '}
										</h4>)
								})}
							</div>
						)
					})}
				</div>)
		}
		return (
			<div className='cardFlex columnOrder'>
				<h1 className='page-title'>Sudoku solver</h1>
				<div className='cardGap5 cardFlex centerFlex'>
					{renderCells()}
				</div>
				<div className='cardGap cardFlex alignCenter justifyBetween'>
					<div className='cardGap'></div>
					<button className='cardGap button primary'>Randomize</button>
					<div className='cardGap'></div>
					<button className='cardGap button primary'>Solve</button>
					<div className='cardGap'></div>
					<button className='cardGap button primary'>Check</button>
					<div className='cardGap'></div>
				</div>
			</div>
		);
	}
}

export default MainApp;