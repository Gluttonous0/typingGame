import "./styles.css"
import { words } from "./words"
import { useState, useRef, useEffect } from "react";


export default function Page() {
  const [isSettingTrue, setIsSettingTrue] = useState(true);
  console.log(words.length);
  function setHideNavigation() {
    setIsSettingTrue(!isSettingTrue);
  }
  return (
    <>
      <SettingBtn onClickBtn={setHideNavigation} />
      <IndexHead isSettingTrue={isSettingTrue} />
      <IndexBody />
    </>
  );
}

//头部导航栏部分
function IndexHead({ isSettingTrue }) {
  return (
    <div className={isSettingTrue ? 'index-head' : 'index-head index-change-hide'}>
      <span className="text_1">Difficulty</span>
      <select name="" id="" className="select-difficulty">
        <option value="Easy">Easy</option>
        <option value="Medium" selected>Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  );
}

//中间主体部分
function IndexBody() {
  const [time, setTime] = useState(10);
  const timeRef = useRef(null);
  const [score, setScore] = useState(0);
  const [contentWords, setContentWords] = useState(words[Math.floor(Math.random() * words.length)]);
  // const newRandom = Math.floor(Math.random() * words.length)
  // const newWords = words[newRandom];


  //创建计时器
  useEffect(() => {
    if (time > 0) {
      function times() {
        setTime(time - 1);
      }
      const newTimes = setInterval(times, 1000);
      return () => {
        clearInterval(newTimes);
      }
    }
  })

  //游戏初始化按钮
  function handleReloadClick() {
    setTime(10);
    setScore(0);
  }

  //更新输入框内容
  function contentChange(e) {
    console.log(e.target.value);
    if (e.target.value == contentWords) {
      setTime(time + 2);
      setScore(score + 1);
      setContentWords(words[Math.floor(Math.random() * words.length)])
      e.target.value = '';
    }
  }
  if (time === 0) {
    return (
      <div className="index-body">
        <div className="index-body_1">
          {/* gameover index */}
          <div className="index-body_3">
            <h1 className="index-body-content_3">Time ran out</h1>
            <p className="index-body-content_3">Your final score is {score}</p>
            <button className="button-content" onClick={handleReloadClick}>Reload</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="index-body">
        <div className="index-body_1">
          <div className="index-body_2">
            <h2>👩‍💻 Speed Typer 👨‍💻</h2>
          </div>

          <div className="index-content">
            <div className="content-text_1">Time left:{time}s</div>
            <div className="content-text_2">Score:{score}</div>
          </div>

          <div className="input-content">
            <p className="following-type">Type the following:</p>
            <h1 className="following-type">{contentWords}</h1>
            <input className="input-text" type="text" placeholder="Type the word here..." onChange={contentChange} />
          </div>
        </div>
      </div>
    );
  }
}

//按钮控制导航栏
function SettingBtn({ onClickBtn }) {
  return (
    <button className="setting-btn" onClick={onClickBtn}>
      Setting
    </button>
  );
}