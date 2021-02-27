import json
import requests

url = 'http://localhost:8080/owners'
file = 'randomowners.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json=json.loads(i))


url = 'http://localhost:8080/vehicle_types'
file = 'vehicletypes.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json=json.loads(i))

url = 'http://localhost:8080/charger_types'
file = 'chargertypes.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json=json.loads(i))


url = 'http://localhost:8080/stations'
file = 'randomstations.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json=json.loads(i))


url = 'http://localhost:8080/chargers'
file = 'randomchargers.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json=json.loads(i))


url = 'http://localhost:8080/vehicles'
file = 'randomvehicles.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json=json.loads(i))

url = 'http://localhost:8080/sessions'
file = 'randomsessions.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json=json.loads(i))
