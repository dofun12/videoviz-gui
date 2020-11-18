# Python 3
import json

def load():
    with open('./package.json', 'r') as read_file:
        return json.load(read_file)['version']

print(load())
