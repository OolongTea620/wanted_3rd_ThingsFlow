<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/pre-on-boarding-5th-teamE/3rd_ThingsFlow_hyelin">
  </a>

<h3 align="center"></h3>

  <p align="center">
    </h4>원티드 온보딩 3번째 과제</h4></br>
    with. ThinngsFlow
    <br />
    <a href="https://documenter.getpostman.com/view/17264763/2s8YYJogg6"><strong> » API Documentation 보러가기</strong></a>
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>목차</summary>
  <ol>
    <li>
      <a href="#about-the-project">이번 레포는...!</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">시작방법</a>
      <ul>
        <li><a href="#prerequisites">기본 셋팅하기</a></li>
        <li><a href="#installation">기본 셋팅하기</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">기능설명</a></li>
    <li><a href="#usage">사용방법</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## 사이드 프로젝트 설명

게시글을 작성하면 그 당시의 대한민국 : 서울의 **날씨를** 
같이 게시글에 **기록**합니다.   

게시글 작성 시, 비밀번호를 설정할 수 있습니다.  

어떤 게시글의 비번을 알고 있으면 해당 게시글을 수정,삭제가 가능합니다.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![Javascript][Javascript]][javascript-url] 
[![Node.js][Node.js]][Node-url] 
[![npm][npm]][npm-url]
[![Express][Express]][Express-url] 
[![MySQL][MySQL]][MySQL-url] 
[![Sequelize][Seqeulize]][Sequezlie-url]


<!--링크 알아올 것-->
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## 시작방법
### 기본 셋팅하기
해당 프로그램을 실행전에 다음과 같이 실행합니다.    

1. 레포지토리 가져오기
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. npm package 설치하기
   ```sh
   npm install
   ```
3. `Database` 생성  
    
    case 1. seqeulize를 이용한 경우,
    ```sh
    cd src // src로 이동
    npx sequelize db:create --env 'development'
    ```
    case 2. 직접 데이터 베이스에서 명령어를 입력하는 경우
 
    ```mysql
    //sql혹은 워크벤치 이용,
     CREATE SCHEMA `databasemame` DEFAULT CHARACTER SET utf8mb4 ;
    ```
4. 레포지토리 진입,  `/.env` 설정 
    
    서버 관련 설정
    ```
    # Server
    MODE_ENV=development // 4. config.json 참고
    PORT=8000 //example
    ```
    JWT관련 설정
    ```
    # JWT
    SALT=8 //Salting 횟수
    ALGORITHM=HS256
    JWT_EXPIRES_IN=1d // 토큰 유효 기간 
    JWT_SECRET="jwt secret"
    ```
    WeatherAPI key 넣기     
    [https://www.weatherapi.com](https://www.weatherapi.com/)으로 가서 회원가입하고,    
    발급받은 APIKey 를 복사 붙여넣기 합니다.
    ```
    # WeatherAPI (그대로 복사)
    WEATHER_KEY= "발급받은 weatherAPI key" 
    WEATHER_URL=http://api.weatherapi.com/v1/current.json
   ```
5. config json 설정 `/src/config/config.json`
   ```json
   {
    "development": { // 개발용
        "username": "databaseAccount",
        "password": "AccountPassword",
        "database": "databasename",
        "host": "x.x.x.x",
        "dialect": "DBMS명"
    },
    "test": { // 테스트용
        "username": "databaseAccount",
        "password": "AccountPassword",
        "database": "databasename",
        "host": "x.x.x.x",
        "dialect": "DBMS명"
    }
    }

   ```
6. 서버 구동
    ```sh
    npm start
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 기능 설명
#### 회원기능    
`회원가입` -  이메일과 비번입력, 유저 이름으로 회원가입을 합니다.    
`로그인` - 이메일과 비번을 입력하고 저장된 회원정보와 일치하면 jwt 토큰을 발급 받습니다.

게시글 기능     
`게시글 작성` - 로그인 뒤 받은 jwt token 같이 사용해서 게시글 작성    
`게시글 조회 ` - 게시글 조회 (기본 최신순)   
`게시글 수정`  - 게시글 수정(비번이 설정되어 있어야 한다)   
`게시글 삭제`  - 게시글 삭제 (비번이 있어야 한다)   

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## 사용방법

Postman documentation에  API 사용방법이 있습니다.

_API 설명서 보러가기 [ApiDocumentation](https://documenter.getpostman.com/view/17264763/2s8YYJogg6)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

*김혜린(OolongTea620)*     
[@velog](https://velog.io/@rlafls9596)     
email   
rlafls9596@gmail.com        
he9596@naver.com

Project Link   
[3rd_ThingsFlow_hyelin](https://github.com/pre-on-boarding-5th-teamE/3rd_ThingsFlow_hyelin)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username

[npm]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white
[npm-url]: https://www.npmjs.com/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
[Node-url]: https://nodejs.org/ko/
[Express]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white
[Express-url]: https://expressjs.com/
[MySQL]: https://img.shields.io/badge/Mysql-2496ED?style=for-the-badge&logo=MySql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[Javascript]: https://img.shields.io/badge/Javascript-ffb13b?style=for-the-badge&logo=javascript&logoColor=white
[javascript-url]: https://www.javascript.com/
[Seqeulize]: https://img.shields.io/badge/Sequelize-2496ED?style=for-the-badge&logo=sequelize&logoColor=white
[Sequezlie-url]: https://sequelize.org/

