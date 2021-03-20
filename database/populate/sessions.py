# import mysql.connector
import json
'''
mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "root",
    database = "database_name"
)
'''
# datetime.datetime.strptime(s["start_date"], "%Y-%m-%d").date()
# datetime.datetime.strptime(s["start_time"], "%H:%M:%S").time()


# mycursor = mydb.cursor()
keys = "(id, rating, cost_per_kwh, total_cost, payment_method, start_date, start_time, end_date, end_time, energy_delivered, protocol, price_policy, charger_id, charger_station_id, vehicle_license_plate)"

output = open("armageddon.sql", 'w')
output.write("SET GLOBAL max_allowed_packet = 30 * 1024 * 1024;\n\n")
output.write("INSERT INTO database_name.session " + keys + " VALUES\n ")

with open("randomsessions.json", 'r') as f:
    for s in f:
        s = json.loads(s)
        # query = "INSERT INTO database_name.session " + keys + " VALUES ({}, {}, {}, {}, '{}', '{}', '{}', '{}', '{}', {}, {}, {}, {}, {}, '{}');".format(s["id"], s["rating"] if (s["rating"]) else 'null', s["cost_per_kwh"], s["total_cost"], s["payment_method"], s["start_date"], s["start_time"], s["end_date"], s["end_time"], s["energy_delivered"], s["protocol"], s["price_policy"], s["charger_id"], s["charger_station_id"], s["license_plate"])
        # mycursor.execute(query)
        # mydb.commit()
        line = "\t({}, {}, {}, {}, '{}', '{}', '{}', '{}', '{}', {}, {}, {}, {}, {}, '{}'),".format(s["id"], s["rating"] if (s["rating"]) else 'null', s["cost_per_kwh"], s["total_cost"], s["payment_method"], s["start_date"], s["start_time"], s["end_date"], s["end_time"], s["energy_delivered"], s["protocol"], s["price_policy"], s["charger_id"], s["charger_station_id"], s["license_plate"])
        output.write(line + '\n')
    output.write("\t;")
    
output.close()
