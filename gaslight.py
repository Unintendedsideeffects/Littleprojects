import phue
import discoverhue
from phue import Group


username='your username'
hue = 0
brightness = 255
saturation = 254
blue = 43690
red = 65535
changeHueValue = 12

def hueChange(flag):
    if flag == 'decrease':
        allLights.hue -= changeHueValue
        print(flag)
    if flag == 'increase':
        allLights.hue += changeHueValue
        print(flag)


def gaslightloop():
    allLights.hue = blue
    allLights.saturation = saturation
    allLights.transitiontime = 10
    while True:
        if allLights.hue > red -1 - changeHueValue:
            flag = 'decrease'
        elif allLights.hue < blue +1 :
            flag = 'increase'
        hueChange(flag)



print(discoverhue.find_bridges('YOUR BRIDGE HERE'))
found = found.replace(':80', '')
found = found.replace('http://', '')
found = found.replace('/', '')
# print(found)
# bridge = phue.Bridge('192.168.8.104', username)
bridge.connect()
allLights = phue.Group(bridge, 0)
allLights.on = False
allLights.on = True
gaslightloop()

