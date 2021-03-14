import json
import requests

url = 'https://localhost:8765/evcharge/api/owners'
file = 'randomowners.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json=json.loads(i), verify=False)


url = 'https://localhost:8765/evcharge/api/vehicle_types'
file = 'vehicletypes.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json=json.loads(i), verify=False)

url = 'https://localhost:8765/evcharge/api/charger_types'
file = 'chargertypes.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json=json.loads(i), verify=False)


url = 'https://localhost:8765/evcharge/api/stations'
file = 'randomstations.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json=json.loads(i), verify=False)


url = 'https://localhost:8765/evcharge/api/chargers'
file = 'randomchargers.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json=json.loads(i), verify=False)


url = 'https://localhost:8765/evcharge/api/vehicles'
file = 'randomvehicles.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json=json.loads(i), verify=False)

url = 'https://localhost:8765/evcharge/api/sessions'
file = 'randomsessions.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json=json.loads(i), verify=False)
