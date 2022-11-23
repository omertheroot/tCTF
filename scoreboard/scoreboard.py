# python requests get the data from the api

from time import sleep
import requests
print("""



Error: SEGFAULT at address 0xS3N4771:
	node(_ZN4node7TLSWrap6EncOutEv+0x170)[0xa09010]
	node(_ZN4node7TLSWrap7DoWriteEPNS_9WriteWrapEP8uv_buf_tmP11uv_stream_s+0x2c7)[0xa0a6c7]
	node(_ZN4node5http212Http2Session15SendPendingDataEv+0x4ce)[0x93b5ae]
	node(_ZN4node5http212Http2Session5CloseEjb+0xda)[0x93c4fa]
	node[0xb62a3f]
	node(_ZN2v88internal21Builtin_HandleApiCallEiPPNS0_6ObjectEPNS0_7IsolateE+0xb9)[0xb635a9]
	[0xcec6c2dbe1d]
[CORE DUMPED, SIGNAL 11 RECIEVED]
Error: SEGFAULT at address 0xS4N4771:
	node(_ZN4node7TLSWrap6EncOutEv+0x170)[0xa09020]
	node(_ZN4node7TLSWrap7DoWriteEPNS_9WriteWrapEP8uv_buf_tmP11uv_stream_s+0x2f7)[0xa0a6d7]
	node(_ZN4node5http212Http2Session15SendPendingDataEv+0x4ce)[0x93b5ae]
	node(_ZN4node5http212Http2Session5CloseEjb+0xda)[0x93c4fa]
	node[0xb62a3f]
	node(_ZN2v88internal21Builtin_HandleApiCallEiPPNS0_6ObjectEPNS0_7IsolateE+0xb9)[0xb635b9]
	[0xcec6c2dbe1d]
[CORE DUMPED, SIGNAL 11 RECIEVED]
Error: SEGFAULT at address 0xA51G1M771:
	node(_ZN4node7TLSWrap6EncOutEv+0x170)[0xa09020]
	node(_ZN4node7TLSWrap7DoWriteEPNS_9WriteWrapEP8uv_buf_tmP11uv_stream_s+0x2f7)[0xa0a6d7]
	node(_ZN4node5http212Http2Session15SendPendingDataEv+0x4ce)[0x93b5ae]
	node(_ZN4node5http212Http2Session5CloseEjb+0xda)[0x93c4fa]
	node[0xb62a3f]
	node(_ZN2v88internal21Builtin_HandleApiCallEiPPNS0_6ObjectEPNS0_7IsolateE+0xb9)[0xb635b9]
	[0xcec6c2dbe1d]
[CORE DUMPED, SIGNAL 11 RECIEVED]

""")


while True:
    get_data = requests.post(
        'http://localhost:3000/api/admin/scoreboard/teams', json={
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
