import React, { useState } from 'react';
import { FloatButton } from 'antd';
import {UndoOutlined} from'@ant-design/icons';

const initialBoard = Array.from({ length: 10 }, () => Array(10).fill(null));//初始化棋盘
function JudWinner(board,player){//判断棋盘黑白子输赢
    const diretions =[
       // 水平方向  
    [0, 1, 0, 1, 0],  
    // 垂直方向  
    [1, 0, 1, 0, 1],  
    // 主对角线方向  
    [1, 1, 1, 1, 1],  
    // 副对角线方向  
    [1, -1, 1, -1, 1]  
    ];
    for (let i = 0; i < 10; i++) {  
      for (let j = 0; j < 10; j++) {  
        if (board[i][j] === player) {  
          for (let dir of diretions ) {  
            let count = 1;  
            let x = i, y = j;  
            // 检查当前位置的连续棋子数  
            while (  
              board[x + dir[0]] !== undefined &&  
              board[x + dir[0]][y + dir[1]] === player  
            ) {  
              count++;  
              x += dir[0];  
              y += dir[1];  
            }  
            // 如果连续五个棋子，则胜利  
            if (count >= 5) return true;  
          }  
        }  
      }  
    }  
    return false;
}

const Gomoku = () => {
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState('●');

  const handleClick = (row, col) => {
    if (board[row][col] === null && JudWinner(board,'●')===false && JudWinner(board,'O')===false) {
      const newBoard = [...board];//浅拷贝棋盘数据
      newBoard[row][col] = player;
      setBoard(newBoard);
      setPlayer(player === '●' ? 'O' : '●');
    }
  };
  function ResetBoard(){//重置棋盘
    const empty =Array.from({ length: 10 }, () => Array(10).fill(null));
    setBoard(empty);
  }
  const renderSquare = (row, col,key) => (//棋盘中格子
    <div className="GMKsquare" onClick={() => handleClick(row, col)} key={key}>
      {board[row][col]}
    </div>
  );

  const renderRow = (row,key) => (//生成棋盘每一行
    <div className="board-row" key={key}>
      {Array.from({ length: 10 }, (_, i) => renderSquare(row, i,`row${row}col${i}`))}
    </div>
  );

  const renderBoard = () => (//生成整个棋盘
    <div className="GMKboard">
      {Array.from({ length: 10 }, (_, i) => renderRow(i,`row${i}`))}
    </div>
  );

  return (
    <div className='GMKBox'>
      {renderBoard()}
      <FloatButton icon={<UndoOutlined />} type="primary"style={{right: 94 }} onClick={ResetBoard}/>
    </div>
  );
};

export default Gomoku;