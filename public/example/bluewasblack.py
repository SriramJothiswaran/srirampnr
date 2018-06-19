import tkinter as tk

root = tk.Tk()
root.title("City Information")





N = 3
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
  

    for j in range(1):
        if i !=3:
            e = tk.Entry(frame, width = 50)
            e.pack(side='left')
            entryboxes[frame].append(e)
     

entryboxes[frames[0]][0].insert(0, 'Los Angeles County')
entryboxes[frames[1]][0].insert(0, 33.88)
entryboxes[frames[2]][0].insert(0, -118.3)


root.mainloop()
