# main.py

import tkinter as tk
from tkinter import ttk, messagebox
from dao import HarvestLoadDAO
from models import HarvestLoad


def refresh_table():
    records = dao.get_all_harvest_loads()
    for row in tree.get_children():
        tree.delete(row)
    for rec in records:
        tree.insert(
            "",
            "end",
            values=(
                rec.get("uid", ""),
                rec.get("Vintrace_ST", ""),
                rec.get("Block", ""),
                rec.get("Tons", ""),
            ),
        )


def add_sample():
    new_load = HarvestLoad(Vintrace_ST="Z999", Block="BlockTest", Tons=7.5)
    dao.add_load(new_load)
    refresh_table()
    messagebox.showinfo("Info", "Sample record added.")


root = tk.Tk()
root.title("VinTrick New UI")

dao = HarvestLoadDAO()

columns = ("uid", "Vintrace_ST", "Block", "Tons")
tree = ttk.Treeview(root, columns=columns, show="headings")
for col in columns:
    tree.heading(col, text=col)
tree.pack(fill="both", expand=True)

btn_refresh = ttk.Button(root, text="Refresh", command=refresh_table)
btn_refresh.pack(side="left", padx=5, pady=5)

btn_add = ttk.Button(root, text="Add Sample", command=add_sample)
btn_add.pack(side="left", padx=5, pady=5)

refresh_table()
root.mainloop()
