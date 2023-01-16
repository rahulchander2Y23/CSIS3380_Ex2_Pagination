'''
Author: Rahul Chander
Purpose: Simple python script to export a file containing random users.
'''


import datetime as dt
import json
import urllib.request

API_URL =  'https://randomuser.me/api/?results='
TOTAL_CONTACTS = 163

def check_nonenglish_str(some_str):
    try:
        some_str.encode(encoding='utf-8').decode('ascii')
    except UnicodeDecodeError:
        return True
    return False

def parse_name_from_email(some_email):
    user_name, domain = tmp_email.split('@')
    full_name = user_name.split('.')
    full_name = ' '.join(full_name)
    return full_name

fname = 'data.js'

with open(fname, 'w+', encoding="utf-8") as fid:

    fid.write('users = [')

    data = json.loads(urllib.request.urlopen(API_URL+str(TOTAL_CONTACTS)).read().decode())

    for obj in data['results']:

        tmp_date = dt.datetime.strptime(obj['registered']['date'],'%Y-%m-%dT%H:%M:%S.%f%z')
        full_name = obj['name']['first'].lower()+" "+obj['name']['last'].lower()
        if check_nonenglish_str(full_name):
            # do not use name from 'first', 'last' field as it contains foreign characters. Extract from email instead.
            tmp_email = obj['email']
            full_name = parse_name_from_email(tmp_email)

        flat_obj = {"name": full_name,
                    "image": obj['picture']['thumbnail'],
                    "joined": tmp_date.strftime('%m/%d/%y')}
        json_obj = json.dumps(flat_obj, indent=4, ensure_ascii=False)
        fid.write(str(json_obj))
        fid.write(',\n')

    fid.write(']')
