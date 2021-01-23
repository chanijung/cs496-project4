// eslint-disable
import {useState} from 'react'
import './App.css';
import recomm from './recommendation.png'

//component
function App() {

  let posts = "post!!"; //data from server
  let style1 = {color:'blue', fontSize:'30px'};
  function a(){
    return 100
  }
  function changeTitle(){
    // (state가 array, object 자료형이면 특히) 원본 state 수정하지 말고 복사본 만들어서 수정하기
    // var newTitle2 = title2; //reference data type(Objects: array, function, obejct)는 이렇게 하면 값 공유됨
    var newArray = [...title2]; //deep copy(독립적인 값 복사) / spread operator '...'는 object나 array의 괄호 제거하는 것. 그 다음 다시 괄호로 감싸서 별개의 array 만듦.
    // var newObject = {...title2} //object의 경우 이렇게 중괄호 이용.
    if (title2[0]==='post title2'){
      console.log("case 1");
      // setTitle2(['Chani', 'Jiyoung']);
      // setTitle2('Chani') //자료형 다르데도 변경 되네?
      newArray[0] = 'Chani';
      setTitle2(newArray);

    }
    else{
      console.log("case 2");
      // setTitle2(['post title2', 'post title3']);
      newArray[0] = 'post title2';
      setTitle2(newArray);
    }
  }

  function callAPI(){
    fetch("http://localhost:3002/api")
    .then((res)=>res.text())
    .then((res)=>this.setState({apiResponse:res}));
  }

  function componentDidMount(){
    callAPI();
    console.log(this.state);
  }
  let [title, setTitle] = useState('post title!!');
  //let으로 선언한 변수에 비한 useState 장점: 내용 변경되었을 때 새로고침 없이도 html이 자동으로 재렌더링. 근데 let도 되는디?
  // 자주 바뀌는, 중요한 데이터는 변수 아닌 state로 저장해서 써라. (ex. 사이트 제목 같은 것은 변수나 하드코딩 해도 상관 없음)

  let [title2, setTitle2] = useState(['post title2', 'post title3']);
  let [likes, setLikes] = useState(1);
  //state 변경하려면 setState(변경함수)를 사용하여야 재렌더링이 잘 일어남.

  return (
    // return value should be in one outermost element.
    <div className="App"> 
      <div className="black-nav">
        {/* <div style={{color:'blue', fontSize:'30px'}}> My Site</div> */}
        <div style={style1}> My Site</div>
      </div>
      <div className="list">
        <h3> {posts} <span onClick={()=>{setLikes(likes+1);}}>:)</span> {likes} </h3>
        <p>2021/01/21</p>
        <hr/>
      </div>
      <div className="list">
        <h3> {title}</h3>
        <p>2021/01/21</p>
        <hr/>
      </div>
      <div className="list">
        <h3> {title2[0]}</h3>
        <p>2021/01/21</p>
        <hr/>
      </div>
      <button onClick={changeTitle}>Change Title</button>
      {/* changeTitle() 이렇게 함수에 괄호 넣으면 바로 실행하라는 뜻임. onCLick에 실행시키려면 함수 이름만. */}
      {/* <h4> {posts}</h4> */}
      {/* <h4> {a()}</h4> */}
      {/* <img src="recommendation.png" alt="recommendation" />  */}
      {/* png 왜 안됨? */}
      {/* <img src={recomm} alt="recommendation"/> */}

      <Modal title="post title" date="2021.01.22"></Modal>      <Modal title="post title" date="2021.01.22"></Modal>
      <Modal title="post title2" date="2021.01.23"></Modal>

      {/* <Modal/> */}

    </div>
  );
}


// component
// 1. 반복 출현하는 html 덩어리
// 2. 자주 변경되는 html UI
// 3. 다른 페이지 만들 때
function Modal(props){
  return (    
    // {/* fragment */}
    <>
      <div className="modal">
        <h2>{props.title}</h2>
        <p>{props.date}</p>
        <p>detail</p>
      </div>
      <div></div>
    </>
  )
}

export default App;
