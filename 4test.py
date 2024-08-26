from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

model = AutoModelForSeq2SeqLM.from_pretrained('eenzeenee/t5-base-korean-summarization')
tokenizer = AutoTokenizer.from_pretrained('eenzeenee/t5-base-korean-summarization')

prefix = "summarize: "
text="민희진 어도어 대표의 사내 성희롱 은폐 의혹을 제기한 어도어 전 직원 B씨가 민 대표를 경찰에 고소한다. 23일 월간조선에 따르면 B씨는 이날 민 대표를 근로기준법·개인정보보호법 위반로 형사 고소하고 허위사실 유포 혐의 등으로 민·형사 고소하며, 또 같은 날 민 대표와 성희롱 사건 당사자인 어도어 A임원을 부당노동행위·노사부조리 혐의로 서울고용노동청에 신고한다. B씨는 이 매체와의 인터뷰를 통해 언론에 민 대표의 대화 내역이 공개되기 전부터 민 대표가 자신에게 욕설을 했다는 것을 알고 있었다고 했다. 퇴사 전 사내 괴롭힘 고발로 하이브 조사관과의 면담을 진행하면서 이를 알게 됐지만, 자신이 믿고 따랐던 민 대표였기에 이 사실을 묻기로 했다는 것이다. 하지만 민 대표가 자신을 변호하기 위해 대화 내용 중 본인에게 유리한 부분만 짜깁기해 올렸고, 자신을 ‘연봉은 많이 받아 가지만 일은 못 하는 무능한’ 직원으로 깎아내려 스스로를 지키기 위해 민 대표에 대한 폭로를 시작했다는 것이 B씨의 입장이다. 또 B씨는 민 대표가 하이브와의 유착 관계를 의심하고 있다는 질문에 “하이브와 어떤 이해관계도 없고, 하이브 측에도 책임소재가있기 때문에 저의 피해를 구제하기 위한 내용증명을 발송할 예정이다”라고 답했다. 아울러 민 대표에 대해서는 “8월 14일, 두 번째 입장문을 올릴 때부터 법적 조치를 예고했다. 그때까지만 해도 진심 어린 사과를 받고, 민 대표가 사실관계 정정을 한다면 멈추려 했다. 하지만 8월 18일, 부대표로부터 사과 취소 내용을 전달받고 고소 협박을 당한 뒤 생각이 바뀌었다. 앞으로 법적 조치를 이어가고자 한다”라고 강경 대응을 시사했다. 앞서 민희진 대표는 사내 성희롱 사건 은폐 의혹에 휩싸이자 이를 반박하는 내용이 담긴 카카오톡 대화를 공개했다. 이후 사건 당사자인 B씨는 자신과의 대화 내용이 민 대표의 거짓 해명에 이용됐다고 주장했고, 민 대표는 A4 18장에 달하는 입장문을 내고 사실이 아니라고 해명했다."

inputs = [prefix + text]


inputs = tokenizer(inputs, max_length=512, truncation=True, return_tensors="pt")
output = model.generate(**inputs, num_beams=3, do_sample=True, min_length=10, max_length=64)
decoded_output = tokenizer.batch_decode(output, skip_special_tokens=True)[0]
result = decoded_output.strip()

print('RESULT >>', result)

classifier = pipeline("text-classification", model="matthewburke/korean_sentiment")
print(classifier([result]))