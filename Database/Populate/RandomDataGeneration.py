from faker import Faker
import random
import string
import json

fake = Faker()
'''
owner_keys = ["owner_id", "name", "phone"]

with open("randomowners.json", 'w') as f:
    for i in range(1024): 
        f.write(str(dict(zip(owner_keys, [i + 1, fake.name(), str(random.randint(6900000000, 6999999999))]))) + '\n')


station_keys = ["station_id", "location", "working_hours", "phone", "average_rating", "operator", "operational_chargers", "cars_waiting", "average_charging_time", "wait_time_estimation"]

with open("randomstations.json", 'w') as f:
    for i in range(50): 
        location = fake.address()
        working_hours = "08:00 - 20:00"
        phone = str(random.randint(2100000000, 2109999999))
        average_rating = 0 # trigger
        operator = fake.name()
        operational_chargers = 20 # trigger
        cars_waiting = random.randint(0, 10)
        average_charging_time = random.randint(30, 40) # minutes
        wait_time_estimation = int(cars_waiting * average_charging_time / operational_chargers)
        
        l = [i + 1, location, working_hours, phone, average_rating, operator, operational_chargers, cars_waiting, average_charging_time, wait_time_estimation]
        f.write(str(dict(zip(station_keys, l))) + '\n')
        
'''

vehicle_keys = ["license_plate", "owner_id", "vehicle_type_id"]
letters = string.ascii_uppercase
ids_list = []

with open("for_db.json", 'r') as f:
    for line in f:
        ids_list.append(json.loads(line)["id"])

with open("randomvehicles.json", 'w') as v:
    for i in range(1200):
        license_plate = ''.join(random.choice(letters) for _ in range(3)) + ' ' + ''.join(str(random.randint(0, 9)) for _ in range(4))
        if(i < 1024): owner_id = i + 1
        else: owner_id = random.randint(1, 1024)
        vehicle_type_id = random.choice(ids_list)
        v.write(str(dict(zip(vehicle_keys, [license_plate, owner_id, vehicle_type_id]))) + '\n')
