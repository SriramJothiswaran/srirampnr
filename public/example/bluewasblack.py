import tkinter as tk
from  tkinter import END
import json
from pprint import pprint

root = tk.Tk()
root.title("City Information")
variable = tk.StringVar(root)
variable.set("Adelanto")
initialName = "Adelanto"
cityList = []
with open('ca.json') as f:
    data = json.load(f)




for nameList in data:
    cityList.append(nameList["name"])
    if nameList["name"] == initialName:
        countyValue = nameList["county_name"]
        latitudeValue = nameList["primary_latitude"]
        longitudeValue = nameList["primary_longitude"]

cityList.sort()

def OptionMenu_SelectionEvent(event):
    for nameList in data:
        cityList.append(nameList["name"])
        if nameList["name"] == event:
            entryboxes[frames[0]][0].delete(0,END)
            entryboxes[frames[1]][0].delete(0,END)
            entryboxes[frames[2]][0].delete(0,END)
            countyValue = nameList["county_name"]
            latitudeValue = nameList["primary_latitude"]
            longitudeValue = nameList["primary_longitude"]
            entryboxes[frames[0]][0].insert(0,countyValue)
            entryboxes[frames[1]][0].insert(0, latitudeValue)
            entryboxes[frames[2]][0].insert(0, longitudeValue)

N = 4
frames = []
for n in range(N):
    frame = tk.Frame(root)
    frame.pack(side='top', anchor='w')
    frames.append(frame)

entryboxes = {frame: [] for frame in frames}
for i, frame in enumerate(frames):
    if i == 0:
        label = tk.Label(frame, text="County", anchor="w",width=10)
        label.pack(side='left')
    elif i == 1:
        label = tk.Label(frame, text="Latitude", anchor="w",width=10)
        label.pack(side='left')
    elif i == 2:
        label = tk.Label(frame, text="Longitude", anchor="w",width=10)
        label.pack(side='left')
    elif i == 3:
        label = tk.Label(frame, text="City", anchor="w",width=10)
        label.pack(side='left')

    for j in range(1):
        if i !=3:
            e = tk.Entry(frame, width = 50)
            e.pack(side='left')
            entryboxes[frame].append(e)
        else:
            w = tk.OptionMenu(root, variable, *cityList, command = OptionMenu_SelectionEvent)
            w.pack()

entryboxes[frames[0]][0].insert(0, countyValue)
entryboxes[frames[1]][0].insert(0, latitudeValue)
entryboxes[frames[2]][0].insert(0, longitudeValue)



root.mainloop()
