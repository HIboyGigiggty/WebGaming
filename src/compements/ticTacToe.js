import { useState,useEffect } from "react";
import "../CSS/gamelist.css"
import {UndoOutlined} from'@ant-design/icons';
import { FloatButton } from 'antd';

function Square({value,onSquareClick}){
  return(<button className="square" onClick={onSquareClick}>{value}</button>);
}

const TicGame =() =>{
  let TheW='';
  const AIPlayer ="O";
  const [squareValue,setSquare] =useState([[null,null,null],[null,null,null],[null,null,null]]);//初始化

  function isWinning(board){
    for(let i=0;i<3;i++){//检测是否出现赢家
      if (board[i][0] !== null && board[i][0] === board[i][1] && board[i][0] === board[i][2]) return true;  
      if (board[0][i] !== null && board[0][i] === board[1][i] && board[0][i] === board[2][i]) return true;    
    }
    //判断两对角线
    if (board[0][0] !== null && board[0][0] === board[1][1] && board[0][0] === board[2][2]) return true;  
    if (board[0][2] !== null && board[0][2] === board[1][1] && board[0][2] === board[2][0]) return true; 

    return board.every(row => row.every(cell => cell !== null));
  }

  function isDrawFull(board){//检测棋盘是否填满，判断死局
    for (let i = 0; i < 3; i++) {  
      for (let j = 0; j < 3; j++) {  
          if (board[i][j] === null) return true;  
      }  
  }  
  return false;
  }

  
  function evaluateBoard(board){//对棋盘进行评分
    if(isWinning(board)){
      if (board.some(row => row.includes('X') && row.every(cell => cell === 'X'))) return 10;//玩家胜利返回10  
    if (board.some(row => row.includes('O') && row.every(cell => cell === 'O'))) return -10; //电脑胜利返回-10
    return 0;  
    }
     //默认对局继续进行返回0
    return 0;
  }

  function MiniMax(board,depth,maxPlayer){//MimiMax博弈算法
    
    if(isWinning(board)){//查询对局是否出现胜者
      let win=evaluateBoard(board);
      return win;
    }
    
    let bestScore= -Infinity;//初始化电脑最佳分数为负无穷
    let bestMove =null;//初始化行动坐标为null
    
      for(let i=0;i<3;i++){// 遍历所有可能的移动
        for(let j=0;j<3;j++){
          if(board[i][j] ===null){
            AiMove(i,j)//电脑尝试行动
            const result =MiniMax(board,depth-1,!maxPlayer);//递归调用minimax
            board[i][j] =null;//撤销行动

          if(maxPlayer){
            if(result >bestScore){//更新最佳得分，电脑以更好分数为准
              bestScore =result;
              bestMove ={row:i,col:j};
            }
          }
        }
      }
      
    }return bestMove;
  }

  function JudSituation(board){
    let W_;
    if(isDrawFull(board) ===false){
      W_ ="平局！";
    }
    if(isWinning(board)){
      if (board[0][0] ==="X" && board[0][0] === board[1][1] && board[0][0] === board[2][2]){
         W_="玩家胜利！";
      }else{
        if (board[0][0] === "O" && board[0][0] === board[1][1] && board[0][0] === board[2][2]){
          W_="电脑胜利！";
        }
      }

    }
    return W_;
  }


  function AiMove(row,col){//获取坐标，命令电脑行动
    if(squareValue[row][col] ===null && row !==null && col !==null){
      squareValue[row][col]=AIPlayer;
    }
  }

  function handleClick(i,j){
    const nextSquare =squareValue.slice();

    if(squareValue[i][j]===null && isWinning(squareValue)===false){
       TheW =JudSituation(squareValue);
      nextSquare[i][j]="X"; 
      setSquare(nextSquare);//棋盘下棋
      if (squareValue[i][j]) {
        if( isDrawFull(squareValue) &&  isWinning(squareValue)===false){
          const temp=MiniMax(squareValue,3,true);
          AiMove(temp.row,temp.col)
        }

      return;
    }
    }

  }
  function resetBoard(){//重置棋盘
    const empty =[[null,null,null],[null,null,null],[null,null,null]]    
    setSquare(empty);
  }
    return(
        <>
        <div className="bigBorad">
          <div>{TheW}</div>
          <div className="board-row">
          <Square  value={squareValue[0][0]} onSquareClick={()=>{handleClick(0,0)}}/>
          <Square value={squareValue[0][1]} onSquareClick={()=>{handleClick(0,1)}} />
          <Square value={squareValue[0][2]} onSquareClick={()=>{handleClick(0,2)}} />
          </div>
          <div className="board-row">
          <Square  value={squareValue[1][0]} onSquareClick={()=>{handleClick(1,0)}}/> 
          <Square  value={squareValue[1][1]} onSquareClick={()=>{handleClick(1,1)}}/>
          <Square  value={squareValue[1][2]} onSquareClick={()=>{handleClick(1,2)}}/>
          </div>
          <div className="board-row">
          <Square  value={squareValue[2][0]} onSquareClick={()=>{handleClick(2,0)}}/>  
          <Square  value={squareValue[2][1]} onSquareClick={()=>{handleClick(2,1)}}/>
          <Square  value={squareValue[2][2]} onSquareClick={()=>{handleClick(2,2)}}/>
          </div>
          <FloatButton icon={<UndoOutlined />} type="primary"style={{right: 94 }} onClick={resetBoard}/>
        </div>
        
        </>
    )
};


export default TicGame;