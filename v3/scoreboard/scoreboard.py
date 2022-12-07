# python requests get the data from the api

from time import sleep
import requests


while True:
    get_data = requests.post(
        'http://timtalctf.com/api/admin/scoreboard/teams', json={
            'key': 'ALARKOKOMBIGERCEKKOMBIGERCEKKONFOOOORRR'
        })
    data = get_data.json()
    iter = 1
    for i in data:
        f = open(f'{iter}.txt', 'w', encoding='utf-8')
        f.write(i["name"])
        print(f"{iter} - {i['name']}")
        f.close()
        iter += 1
    sleep(10)
