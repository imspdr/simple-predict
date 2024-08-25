FROM python:3.10

ENV LANGUAGE C.UTF-8
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

ADD requirements.txt /root/requirements.txt
RUN pip install -r /root/requirements.txt

ADD kserve_text_score.py /root/kserve_text_score.py

WORKDIR /root

ENTRYPOINT ["python3", "kserve_text_score.py"]