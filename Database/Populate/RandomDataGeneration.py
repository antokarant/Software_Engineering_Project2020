## 1024 owners
## 1200 cars
## 50 stations
## 20 chargers per station
## 50 * 20 * ~100 sessions

from faker import Faker
import random
import string
import json
from numpy import random as nprandom
import datetime

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
ownerKeys = ["owner_id", "name", "phone"]

with open("randomowners.json", 'w') as f:
    for i in range(1024): 
        json.dump(dict(zip(owner_keys, [i + 1, fake.name(), str(random.randint(6900000000, 6999999999))])), f)
        f.write('\n')

## Stations
stationKeys = ["station_id", "location", "working_hours", "phone", "average_rating", "operator", "operational_chargers", "cars_waiting", "average_charging_time", "wait_time_estimation"]

with open("randomstations.json", 'w') as f:
    for i in range(50): 
        location = fake.address()
        working_hours = "06:00 - 24:00"
        phone = str(random.randint(2100000000, 2109999999))
        average_rating = 0 # trigger
        operator = fake.name()
        operational_chargers = 20 # trigger
        cars_waiting = random.randint(0, 10)
        average_charging_time = random.randint(30, 40) # minutes
        wait_time_estimation = int(cars_waiting * average_charging_time / operational_chargers)
        
        l = [i + 1, location, working_hours, phone, average_rating, operator, operational_chargers, cars_waiting, average_charging_time, wait_time_estimation]
        json.dump(dict(zip(station_keys, l)), f)
        f.write('\n')
        

## Unique vehicles
vehicleKeys = ["license_plate", "owner_id", "vehicle_type_id"]
letters = string.ascii_uppercase
ids_list = []

with open("vehicletypes.json", 'r') as f:
    for line in f:
        ids_list.append(json.loads(line)["id"])

with open("randomvehicles.json", 'w') as v:
    for i in range(1200):
        license_plate = ''.join(random.choice(letters) for _ in range(3)) + ' ' + ''.join(str(random.randint(0, 9)) for _ in range(4))
        if(i < 1024): owner_id = i + 1
        else: owner_id = random.randint(1, 1024)
        vehicle_type_id = random.choice(ids_list)
        json.dump(dict(zip(vehicle_keys, [license_plate, owner_id, vehicle_type_id])), v)
        v.write('\n')
        

## Charger types

powers = [1, 2, 4, 10, 40]
ctkeys = ["charger_type_id", "title", "power"]

with open("chargertypes.json", 'w') as c:
    for i in range(5):
        json.dump(dict(zip(ctkeys, [i + 1, "charger" + str(i + 1), powers[i]])), c)
        c.write('\n')


## Chargers

chargerKeys = ["charger_id", "operational", "station_id", "charger_type_id"]

with open("randomchargers.json", 'w') as c:
    for station in range(50):
        for charger in range(20):
            operational = random.choices(population = [1, 0], weights = [0.9, 0.1])[0] # choices function returns a list
            charger_type_id = random.choice(range(1, 6))
            json.dump(dict(zip(chargerKeys, [charger + 1, operational, station + 1, charger_type_id])), c)
            c.write('\n')

## Sessions

sessionKeys = ["session_id", "rating", "cost_per_kWh", "total_cost", "payment_method", "start_date", "start_time", "end_date", "end_time", "energy_delivered", "protocol", "price_policy", "charger_id", "station_id", "license_plate"]
platesList = []
with open("randomvehicles.json", 'r') as f:
    for line in f:
        platesList.append(json.loads(line)["license_plate"])

with open("randomsessions.json", 'w') as f:
    for station in range(50):
        for charger in range(20):
            x = random.choice(range(80, 120))
            for i in range(x):
                sessionID = i + 1
                rating = random.choice([None, int(nprandom.triangular(1, 4, 5, size = 1)[0])])
                costPerkWh = round(nprandom.triangular(0.08, 0.11, 0.14, size = 1)[0], 1)
                energyDelivered = round(nprandom.triangular(0.5, 15.25, 30, size = 1)[0], 1)
                totalCost = round(costPerkWh * energyDelivered, 2)
                paymentMethod = random.choice(["Cash", "Card"])
                startDate = str(fake.date_between(start_date='-5y', end_date='today'))
                endDate = startDate
                ## peak stupidity
                ## observe
                ## 6 am is 6*60*60 sec
                ## 23:59:59 is 24 * 60 * 60 - 1
                time1 = random.randint(6*60*60, 24 * 60 * 60 - 1)
                time2 = random.randint(6*60*60, 24 * 60 * 60 - 1)
                startTime = str(datetime.timedelta(seconds = min(time1, time2)))
                endTime = str(datetime.timedelta(seconds = max(time1, time2)))
                protocol = random.randint(1, 5)
                pricePolicy = random.randint(1, 5)
                licensePlate = random.choice(platesList)
                json.dump(dict(zip(sessionKeys, [sessionID, rating, costPerkWh, totalCost, paymentMethod, startDate, startTime, endDate, endTime, energyDelivered, protocol, pricePolicy, charger, station, licensePlate])), f)
                f.write('\n')
