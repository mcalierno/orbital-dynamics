import math
import numpy as np
import matplotlib.pyplot as plt
from models.spacecraft import *
from matplotlib.animation import FuncAnimation
from math import floor

index_z = 0
index_phi = 2


class RunSpacecraft(Spacecraft):
    
  def run_model(self, row_values):
    results=[]
    lx_list=[]
    ly_list=[]

    for index in row_values:
        F_r = float(index.get("F_r"))
        F_theta = float(index.get("F_theta"))
        t_thrust = float(index.get("t_thrust"))

        self.set_params(F_r, F_theta, t_thrust, z0=-1000, phi0_m=-2000)
        self.iterate(tmax=4000)
        tmin, dmin = self.min_dist_to_target()
        results.append({"Fr":F_r, "Ftheta":F_theta, "t_thrust":t_thrust, "dmin":dmin, "tmin":tmin, "Fuel":(abs(F_r)+abs(F_theta))*t_thrust})
        
        lx_list.append([v[index_phi] for v in self.V_list])
        ly_list.append([v[index_z] for v in self.V_list])
    
    ani = self.draw_animation(lx_list, ly_list, duration_sec=2)
    return results, ani
  

  def draw_animation(self, list_of_lx, list_of_ly, duration_sec=2):
    fig, ax = plt.subplots()
    fig.patch.set_facecolor('black')
    ax.set_facecolor('black')

    n_lines = len(list_of_lx)

    color_cycle = plt.rcParams['axes.prop_cycle'].by_key()['color']
    styles = [color_cycle[i % len(color_cycle)] + '-' for i in range(n_lines)]
    styles = ['b-', 'g-', 'y-', 'r-', 'c-']
    # Create a Line2D object for each line
    lines = []
    for lx, ly, style in zip(list_of_lx, list_of_ly, styles):
        line, = ax.plot([], [], style)
        lines.append(line)

    # Set axis limits based on all data
    all_x = np.concatenate(list_of_lx)
    all_y = np.concatenate(list_of_ly)
    ax.set_xlim(all_x.min(), all_x.max())
    ax.set_ylim(all_y.min(), all_y.max())
    # ax.set_ylim(-1000, 1000)
    ax.plot(0, 0, 'r+')

    def init():
        for line in lines:
            line.set_data([], [])
        return tuple(lines)

    def update(frame):
        for idx, line in enumerate(lines):
            lx = list_of_lx[idx]
            ly = list_of_ly[idx]
            line.set_data(lx[:frame*300], ly[:frame*300])
        return tuple(lines)

    n_frames = max(len(lx) for lx in list_of_lx)
    interval = (duration_sec * 1000) / n_frames

    ani = FuncAnimation(fig, update, frames=floor(n_frames/300), init_func=init, blit=True, interval=1)
    return ani




