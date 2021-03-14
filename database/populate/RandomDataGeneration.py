## 1024 owners
## 1200 cars
## 200 stations
## 10-15 chargers per station
## 200 * 10-15 * 80-100 sessions

TOTAL_OWNERS = 1024
TOTAL_VEHICLES = 1200
TOTAL_STATIONS = 200

from faker import Faker
import random
import string
import json
from numpy import random as nprandom
import datetime
from math import ceil

fake = Faker()

## Parse EV data from json file

with open('electric_vehicles_data.json', 'r') as f:
  dic = json.load(f)

keys = ["id", "brand", "type", "brand_id", "model", "release_year", "variant", "usable_battery_size"]

with open("vehicletypes.json", 'w') as f: 
    for car in dic["data"]:
        newcar = {}
        for k in keys: newcar.update({k : car[k]})
        json.dump(newcar, f)
        f.write('\n')

## Generate owners
ownerKeys = ["id", "name", "phone"]

with open("randomowners.json", 'w') as f:
    for i in range(TOTAL_OWNERS): 
        json.dump(dict(zip(ownerKeys, [i + 1, fake.name(), str(random.randint(6900000000, 6999999999))])), f)
        f.write('\n')

## Stations
stationKeys = ["id", "location", "working_hours", "phone", "average_rating", "operator", "operational_chargers", "cars_waiting", "average_charging_time", "energy_provider"]
providerList = ["DEDDIE", "ELPEDISON", "WATT&VOLT", "PROTERGEIA", "NRG"]

with open("randomstations.json", 'w') as f:
    for i in range(TOTAL_STATIONS): 
        location = fake.address()
        working_hours = "06:00 - 24:00"
        phone = str(random.randint(2100000000, 2109999999))
        average_rating = 0 # trigger
        operator = fake.name()
        operational_chargers = 0 # trigger
        cars_waiting = random.randint(0, 10)
        average_charging_time = random.randint(30, 40) # minutes
        provider = random.choice(providerList)
        
        l = [i + 1, location, working_hours, phone, average_rating, operator, operational_chargers, cars_waiting, average_charging_time, provider]
        json.dump(dict(zip(stationKeys, l)), f)
        f.write('\n')
        

## Unique vehicles
vehicleKeys = ["license_plate", "owner_id", "vehicle_type_id"]
letters = string.ascii_uppercase
ids_list = []

with open("vehicletypes.json", 'r') as f:
    for line in f:
        ids_list.append(json.loads(line)["id"])

with open("randomvehicles.json", 'w') as v:
    for i in range(TOTAL_VEHICLES):
        license_plate = ''.join(random.choice(letters) for _ in range(3)) + ''.join(str(random.randint(0, 9)) for _ in range(4))
        if(i < TOTAL_OWNERS): owner_id = i + 1
        else: owner_id = random.randint(1, TOTAL_OWNERS)
        vehicle_type_id = random.choice(ids_list)
        json.dump(dict(zip(vehicleKeys, [license_plate, owner_id, vehicle_type_id])), v)
        v.write('\n')
        

## Charger types

powers = [1, 2, 4, 10, 40]
ctkeys = ["id", "title", "power"]

with open("chargertypes.json", 'w') as c:
    for i in range(5):
        json.dump(dict(zip(ctkeys, [i + 1, "charger" + str(i + 1), powers[i]])), c)
        c.write('\n')


## Chargers

chargerKeys = ["id", "operational", "station_id", "charger_type_id"]
chargersPerStation = [random.randint(10, 15) for _ in range(TOTAL_STATIONS)]

with open("randomchargers.json", 'w') as c:
    for station in range(TOTAL_STATIONS):
        for charger in range(chargersPerStation[station]):
            operational = random.choices(population = [1, 0], weights = [0.9, 0.1])[0] # choices function returns a list
            charger_type_id = random.choice(range(1, 6))
            json.dump(dict(zip(chargerKeys, [charger + 1, operational, station + 1, charger_type_id])), c)
            c.write('\n')

## Sessions

sessionKeys = ["id", "rating", "cost_per_kwh", "total_cost", "payment_method", "start_date", "start_time", "end_date", "end_time", "energy_delivered", "protocol", "price_policy", "charger_id", "charger_station_id", "license_plate"]
platesList = []
with open("randomvehicles.json", 'r') as f:
    for line in f:
        platesList.append(json.loads(line)["license_plate"])

with open("randomsessions.json", 'w') as f:
    for station in range(TOTAL_STATIONS):
        for charger in range(chargersPerStation[station]):
            x = random.randint(80, 100)
            for i in range(x):
                sessionID = i + 1
                rating = random.choice([None, ceil(nprandom.triangular(1, 4, 5, size = 1)[0])])
                costPerkWh = round(nprandom.triangular(0.08, 0.11, 0.14, size = 1)[0], 2)
                energyDelivered = round(nprandom.triangular(30, 90, 150, size = 1)[0], 2)
                totalCost = round(costPerkWh * energyDelivered, 2)
                paymentMethod = random.choice(["Cash", "Card"])
                startDate = str(fake.date_between(start_date = '-5y', end_date = 'today'))
                endDate = startDate
                ## peak stupidity
                ## observe
                ## 6 am is 6 * 60 * 60 sec
                ## 22:59:59 is 23 * 60 * 60 - 1
                time1 = random.randint(6 * 60 * 60, 23 * 60 * 60 - 1)
                time2 = time1 + random.randint(10 * 60, 59 * 60 + 59)
                startTime = str(datetime.timedelta(seconds = time1))
                endTime = str(datetime.timedelta(seconds = time2))
                protocol = random.randint(1, 5)
                pricePolicy = random.randint(1, 5)
                licensePlate = random.choice(platesList)
                json.dump(dict(zip(sessionKeys, [sessionID, rating, costPerkWh, totalCost, paymentMethod, startDate, startTime, endDate, endTime, energyDelivered, protocol, pricePolicy, charger + 1, station + 1, licensePlate])), f)
                f.write('\n')
