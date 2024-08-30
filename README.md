# simplePredict

---
## Structure

![Structure](/res/simplepredict.png)

## Description

Kserve의 predictor를 이용한 serverless program. 

Nginx 및 React로 구성된 프론트엔드와 2개의 Kserve inference service crd로 구성된다.

첫 번째 inference service는 네이버 주가 정보를 크롤링하는 기능과 meta의 Prophet 모델을 이용하여 입력된 시계열 데이터의 미래 예측값을 추론하는 기능을 제공한다. (/serving_models/prophet)

두 번째 inference service는 네이버 기사 정보를 크롤링하여 크롤링한 기사의 제목을 hugging-face transformer 중 text classification 모델을 이용하여 얼마나 긍정적인지 평가하는 기능을 제공한다. (/serving_models/text_score)

두 개의 inference service는 kserve가 제공하는 서비스로써 작동하며, 이 프로젝트에서는 nginx 서버에서 istio로 api 호출이 이루어지도록 구성된다.

## Install

```commandline
$ cd helm
$ helm upgrade --install simple-predict simple-predict
```
- kubernetes 환경에 helm chart를 이용하여 배포할 수 있다.
- 배포 전 kserve 및 관련 모듈을 설치해야한다. quick_install.sh script로 설치 가능하다. (kserve github 참고)
- 테스트 버전
  - kubernetes: v1.30.0
  - minikube: v1.33.1
  - kserve: 0.13.0
  - istio: 1.20.4
  - knative serving: v1.13.1
  - cert manager: v1.9.0
- kserve 0.7 이상의 버전에서 작동하지만 관련 모듈 간의 의존성은 확인이 필요하다.
- docker.io registry에 저장된 이미지를 이용한다. 
  - 이미지는 각 폴더의 build_push.sh 혹은 build_docker.sh script를 이용해 저장한다.
- istio, minikube 버전에 따라 helm chart values.yaml 수정이 필요하다
  - 현재 작성된 values는 테스트 버전 기준
- namespace는 default를 사용하도록 구현되어있다. 변경시 /frontend/src/store/apis.ts의 Host 관련 정보를 변경해야한다.

# Example

![Sample](/res/sample.png)

# Future works

- timeseries
  - 주가 예측은 Prophet과 같은 단변량 예측 모델로 다루기에는 너무 복잡한 문제다. 본 프로젝트에서는 구조 연습을 위해 단변량 모델을 사용했지만, 추후에는 다변량 모델을 다양한 입력데이터와 함께 사용해보면 좋을 것 같다.
- text classification
  - 네이버 기사 본문 크롤링이 어려워 현재 기사 제목을 기준으로 점수를 구하도록 되어있다.
  - 본 프로젝트에서는 전체적인 구조를 구현함에 초점을 맞춰 넘어갔지만, 기사 본문을 크롤링한 후 본문을 요약하는 모델을 한번 거친 후 요약 결과에 점수를 메기는 방식이 훨씬 더 유의미할 것이라고 생각한다.