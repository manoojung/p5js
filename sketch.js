/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates face tracking on live video through ml5.faceMesh.
 */

let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: true, flipHorizontal: false };

// 1. 변수 이름을 하나로 통일 (대소문자 주의!)
let dotColor; 

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, gotFaces);
  
  // 초기 색상 설정
  dotColor = color(255, 0, 0); 
}

function draw() {
  image(video, 0, 0, width, height);

  if (faces.length > 0) {
    let face = faces[0];

    // 눈꺼풀 위아래 포인트 (159번, 145번)
    let topEye = face.keypoints[159];
    let bottomEye = face.keypoints[145];

    if (topEye && bottomEye) {
      // 거리 계산
      let d = dist(topEye.x, topEye.y, bottomEye.x, bottomEye.y);

      // 2. 거리 기준을 6~7 정도로 넉넉하게 잡으면 인식이 더 잘 됩니다.
      if (d < 6) {
        dotColor = color(0, 255, 0); // 눈 감으면 초록색
      } else {
        dotColor = color(255, 0, 0); // 눈 뜨면 빨간색
      }
    }

    // 3. 모든 포인트 그리기 (반드시 if문 안에서 실행)
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      
      // 여기서 fill(0)을 쓰면 무조건 검은색이 됩니다.
      // 반드시 dotColor 변수를 사용하세요!
      fill(dotColor); 
      noStroke();
      circle(keypoint.x, keypoint.y, 4);
    }
  }
}

function gotFaces(results) {
  faces = results;
}